import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as MediaRepository } from "./media-BjhhENaJ_DtGEF5D8.mjs";
import { i as normalizeMime, r as matchesMimeAllowlist } from "./hash-DFFrkivP_B6GyA9Pb.mjs";
import "./dist_e9pyH8uL.mjs";
import { f as mediaUploadUrlBody } from "./media-kIV1IxFf_BRR3CdsF.mjs";
import "./relations-5_avdrN__CvbT7cha.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { n as resolveFieldAllowlist, t as GLOBAL_UPLOAD_ALLOWLIST } from "./media-allowlist-jUppPWFy_ByrqYOjB.mjs";
import * as path$1 from "node:path";
import { ulid } from "ulidx";
//#region node_modules/emdash/dist/astro/routes/api/media/upload-url.mjs
var upload_url_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/**
* Get a signed upload URL for direct-to-storage upload
*/
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:upload");
	if (denied) return denied;
	if (!emdash?.storage) return apiError("NO_STORAGE", "Storage not configured. Signed URL uploads require S3-compatible storage.", 501);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const maxSize = emdash.config.maxUploadSize ?? 52428800;
		if (!Number.isFinite(maxSize) || maxSize <= 0) return apiError("CONFIGURATION_ERROR", "Invalid maxUploadSize configuration. Expected a positive finite number.", 500);
		const body = await parseBody(request, mediaUploadUrlBody(maxSize));
		if (isParseError(body)) return body;
		const allowlist = (body.fieldId ? await resolveFieldAllowlist(emdash.db, body.fieldId) : null) ?? [...GLOBAL_UPLOAD_ALLOWLIST];
		if (!matchesMimeAllowlist(body.contentType, allowlist)) return apiError("INVALID_TYPE", "File type not allowed", 400);
		const repo = new MediaRepository(emdash.db);
		if (body.contentHash) {
			const existing = await repo.findByContentHash(body.contentHash);
			if (existing) return apiSuccess({
				existing: true,
				mediaId: existing.id,
				storageKey: existing.storageKey,
				url: `/_emdash/api/media/file/${existing.storageKey}`
			});
		}
		const storageKey = `${ulid()}${path$1.extname(body.filename) || ""}`;
		const mediaItem = await repo.createPending({
			filename: body.filename,
			mimeType: normalizeMime(body.contentType),
			size: body.size,
			storageKey,
			contentHash: body.contentHash,
			authorId: user?.id
		});
		const signedUrl = await emdash.storage.getSignedUploadUrl({
			key: storageKey,
			contentType: body.contentType,
			size: body.size,
			expiresIn: 3600
		});
		return apiSuccess({
			uploadUrl: signedUrl.url,
			method: signedUrl.method,
			headers: signedUrl.headers,
			mediaId: mediaItem.id,
			storageKey,
			expiresAt: signedUrl.expiresAt
		});
	} catch (error) {
		if (error instanceof Error && "code" in error && error.code === "NOT_SUPPORTED") return apiError("NOT_SUPPORTED", "Storage does not support signed upload URLs. Use direct upload.", 501);
		return handleError(error, "Failed to generate upload URL", "UPLOAD_URL_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/upload-url@_@mjs
var page = () => upload_url_exports;
//#endregion
export { page };
