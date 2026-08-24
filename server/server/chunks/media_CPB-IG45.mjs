import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as MediaRepository } from "./media-BjhhENaJ_DtGEF5D8.mjs";
import { i as normalizeMime, r as matchesMimeAllowlist, t as computeContentHash } from "./hash-DFFrkivP_B6GyA9Pb.mjs";
import { t as enrichImageMetadata } from "./enrich-CFJJgxs__DOmAe8vI.mjs";
import "./content-refresh-D4khvC0R_Bxt0RQoB.mjs";
import { i as formatFileSize, u as mediaListQuery } from "./media-kIV1IxFf_BRR3CdsF.mjs";
import "./relations-5_avdrN__CvbT7cha.mjs";
import { r as handleMediaUsageSummaries } from "./media-usage-CljdO1mc_DAoaqekq.mjs";
import { a as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm, t as canReadMediaUsageCount } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { n as resolveFieldAllowlist, t as GLOBAL_UPLOAD_ALLOWLIST } from "./media-allowlist-jUppPWFy_ByrqYOjB.mjs";
import * as path$1 from "node:path";
import { ulid } from "ulidx";
//#region node_modules/emdash/dist/astro/routes/api/media.mjs
var media_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/**
* Add URL to media items
* Uses relative URLs to ensure portability across deployments
*/
function addUrlToMedia(item) {
	return {
		...item,
		url: `/_emdash/api/media/file/${item.storageKey}`
	};
}
/**
* List media items
*/
var GET = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:read");
	if (denied) return denied;
	if (!emdash?.handleMediaList) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const query = parseQuery(new URL(request.url), mediaListQuery);
	if (isParseError(query)) return query;
	const result = await emdash.handleMediaList({
		cursor: query.cursor,
		limit: query.limit,
		mimeType: query.mimeType,
		q: query.q
	});
	if (!result.success) return unwrapResult(result);
	const itemsWithUrl = result.data.items.map((item) => addUrlToMedia(item));
	if (query.includeUsage !== "1") return apiSuccess({
		items: itemsWithUrl,
		nextCursor: result.data.nextCursor
	});
	const includeCount = canReadMediaUsageCount(user, locals.tokenScopes);
	const usageResult = await handleMediaUsageSummaries(emdash.db, itemsWithUrl.map((item) => item.id), { includeCount });
	if (!usageResult.success) return unwrapResult(usageResult);
	const itemsWithUsage = [];
	for (const item of itemsWithUrl) {
		const usage = usageResult.data[item.id];
		if (!usage) return apiError("MEDIA_USAGE_READ_ERROR", "Failed to read media usage", 500);
		itemsWithUsage.push({
			...item,
			usage
		});
	}
	return apiSuccess({
		items: itemsWithUsage,
		nextCursor: result.data.nextCursor
	});
};
/**
* Upload media file
*
* Uses the configured storage adapter to store the file.
*/
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:upload");
	if (denied) return denied;
	if (!emdash?.handleMediaCreate) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!emdash?.storage) return apiError("NO_STORAGE", "Storage not configured", 500);
	try {
		const rawMax = emdash.config.maxUploadSize ?? 52428800;
		if (!Number.isFinite(rawMax) || rawMax <= 0) return apiError("CONFIGURATION_ERROR", "Invalid maxUploadSize configuration", 500);
		const maxUploadSize = rawMax;
		const contentLength = request.headers.get("Content-Length");
		if (contentLength && parseInt(contentLength, 10) > maxUploadSize) return apiError("PAYLOAD_TOO_LARGE", "Upload too large", 413);
		const formData = await request.formData();
		const fileEntry = formData.get("file");
		const file = fileEntry instanceof File ? fileEntry : null;
		if (!file) return apiError("NO_FILE", "No file provided", 400);
		const fieldIdEntry = formData.get("fieldId");
		const fieldId = typeof fieldIdEntry === "string" && fieldIdEntry.length > 0 ? fieldIdEntry : null;
		const allowlist = (fieldId ? await resolveFieldAllowlist(emdash.db, fieldId) : null) ?? [...GLOBAL_UPLOAD_ALLOWLIST];
		if (!matchesMimeAllowlist(file.type, allowlist)) return apiError("INVALID_TYPE", "File type not allowed", 400);
		if (file.size > maxUploadSize) return apiError("PAYLOAD_TOO_LARGE", `File exceeds maximum size of ${formatFileSize(maxUploadSize)}`, 413);
		const buffer = new Uint8Array(await file.arrayBuffer());
		const contentHash = await computeContentHash(buffer);
		const existing = await new MediaRepository(emdash.db).findByContentHash(contentHash);
		if (existing) return apiSuccess({
			item: addUrlToMedia(existing),
			deduplicated: true
		});
		const storageKey = `${ulid()}${path$1.extname(file.name) || ""}`;
		await emdash.storage.upload({
			key: storageKey,
			body: buffer,
			contentType: file.type
		});
		const widthEntry = formData.get("width");
		const widthStr = typeof widthEntry === "string" ? widthEntry : null;
		const heightEntry = formData.get("height");
		const heightStr = typeof heightEntry === "string" ? heightEntry : null;
		const width = widthStr ? parseInt(widthStr, 10) : void 0;
		const height = heightStr ? parseInt(heightStr, 10) : void 0;
		const thumbnailEntry = formData.get("thumbnail");
		const thumbnail = thumbnailEntry instanceof File ? thumbnailEntry : null;
		const enriched = await enrichImageMetadata(buffer, file.type, {
			knownDimensions: width != null && height != null ? {
				width,
				height
			} : void 0,
			placeholder: thumbnail ? {
				bytes: new Uint8Array(await thumbnail.arrayBuffer()),
				contentType: thumbnail.type
			} : void 0
		});
		const result = await emdash.handleMediaCreate({
			filename: file.name,
			mimeType: normalizeMime(file.type),
			size: file.size,
			width: width ?? enriched.width,
			height: height ?? enriched.height,
			storageKey,
			contentHash,
			blurhash: enriched.blurhash,
			dominantColor: enriched.dominantColor,
			authorId: user?.id
		});
		if (!result.success) {
			try {
				await emdash.storage.delete(storageKey);
			} catch {}
			return unwrapResult(result);
		}
		return apiSuccess({ item: addUrlToMedia(result.data.item) }, 201);
	} catch (error) {
		return handleError(error, "Upload failed", "UPLOAD_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media@_@mjs
var page = () => media_exports;
//#endregion
export { page };
