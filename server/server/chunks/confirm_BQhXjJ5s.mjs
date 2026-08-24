import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as MediaRepository } from "./media-BjhhENaJ_DtGEF5D8.mjs";
import { t as enrichImageMetadata } from "./enrich-CFJJgxs__DOmAe8vI.mjs";
import "./dist_e9pyH8uL.mjs";
import { c as mediaConfirmBody } from "./media-kIV1IxFf_BRR3CdsF.mjs";
import "./relations-5_avdrN__CvbT7cha.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { n as requireOwnerPerm, r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/media/_id_/confirm.mjs
var confirm_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/**
* Max raw bytes to buffer for server-side LQIP generation at confirm time. The
* signed-URL upload flow exists so large files bypass server buffering — re-reading
* the whole object into a Worker's 128 MB heap to compute a blurhash would OOM
* on the very uploads that flow was designed for. LQIP is progressive
* enhancement: large images simply ship without a server-generated placeholder.
*/
var MAX_PLACEHOLDER_DOWNLOAD_BYTES = 8388608;
/**
* Add URL to media item (relative URL for portability)
*/
function addUrlToMedia(item) {
	return {
		...item,
		url: `/_emdash/api/media/file/${item.storageKey}`
	};
}
/**
* Confirm upload completion
*/
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const denied = requirePerm(user, "media:upload");
	if (denied) return denied;
	if (!id) return apiError("INVALID_REQUEST", "Media ID is required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseOptionalBody(request, mediaConfirmBody, {});
		if (isParseError(body)) return body;
		const repo = new MediaRepository(emdash.db);
		const existing = await repo.findById(id);
		if (!existing) return apiError("NOT_FOUND", `Media item not found: ${id}`, 404);
		if (existing.status !== "pending") return apiError("INVALID_STATE", `Media item is not pending: ${existing.status}`, 400);
		const ownerDenied = requireOwnerPerm(user, existing.authorId ?? "", "media:edit_own", "media:edit_any");
		if (ownerDenied) return ownerDenied;
		if (emdash.storage) {
			if (!await emdash.storage.exists(existing.storageKey)) {
				await repo.markFailed(id);
				return apiError("FILE_NOT_FOUND", "File was not uploaded to storage", 400);
			}
		}
		let blurhash;
		let dominantColor;
		let width = body.width;
		let height = body.height;
		if (emdash.storage && existing.mimeType.startsWith("image/")) {
			const knownSize = body.size ?? existing.size ?? void 0;
			if (!(knownSize != null && knownSize > MAX_PLACEHOLDER_DOWNLOAD_BYTES)) try {
				const { body: stream } = await emdash.storage.download(existing.storageKey);
				const bytes = new Uint8Array(await new Response(stream).arrayBuffer());
				if (bytes.byteLength > MAX_PLACEHOLDER_DOWNLOAD_BYTES) console.warn(`[media] confirm skipping placeholder: object ${existing.storageKey} is ${bytes.byteLength} bytes (> ${MAX_PLACEHOLDER_DOWNLOAD_BYTES})`);
				else {
					const enriched = await enrichImageMetadata(bytes, existing.mimeType, { knownDimensions: body.width != null && body.height != null ? {
						width: body.width,
						height: body.height
					} : void 0 });
					blurhash = enriched.blurhash;
					dominantColor = enriched.dominantColor;
					width = width ?? enriched.width;
					height = height ?? enriched.height;
				}
			} catch (error) {
				console.error("[media] confirm placeholder generation failed:", error);
			}
			else console.warn(`[media] confirm skipping placeholder: object ${existing.storageKey} reported size ${knownSize} bytes (> ${MAX_PLACEHOLDER_DOWNLOAD_BYTES})`);
		}
		const item = await repo.confirmUpload(id, {
			size: body.size,
			width,
			height,
			blurhash,
			dominantColor
		});
		if (!item) return apiError("CONFIRM_FAILED", "Failed to confirm upload", 500);
		return apiSuccess({ item: addUrlToMedia(item) });
	} catch (error) {
		return handleError(error, "Failed to confirm upload", "CONFIRM_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/confirm@_@mjs
var page = () => confirm_exports;
//#endregion
export { page };
