import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-BjhhENaJ_DtGEF5D8.mjs";
import "./content-refresh-D4khvC0R_Bxt0RQoB.mjs";
import { d as mediaUpdateBody, l as mediaGetQuery } from "./media-kIV1IxFf_BRR3CdsF.mjs";
import "./relations-5_avdrN__CvbT7cha.mjs";
import { r as handleMediaUsageSummaries } from "./media-usage-CljdO1mc_DAoaqekq.mjs";
import { a as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { n as requireOwnerPerm, r as requirePerm, t as canReadMediaUsageCount } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/media/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
/**
* Get media item
*/
var GET = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const readDenied = requirePerm(user, "media:read");
	if (readDenied) return readDenied;
	if (!id) return apiError("INVALID_REQUEST", "Media ID required", 400);
	if (!emdash?.handleMediaGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const query = parseQuery(new URL(request.url), mediaGetQuery);
	if (isParseError(query)) return query;
	const result = await emdash.handleMediaGet(id);
	if (!result.success || query.includeUsage !== "1") return unwrapResult(result);
	const includeCount = canReadMediaUsageCount(user, locals.tokenScopes);
	const usageResult = await handleMediaUsageSummaries(emdash.db, [id], { includeCount });
	if (!usageResult.success) return unwrapResult(usageResult);
	const usage = usageResult.data[id];
	if (!usage) return apiError("MEDIA_USAGE_READ_ERROR", "Failed to read media usage", 500);
	return apiSuccess({ item: {
		...result.data.item,
		usage
	} });
};
/**
* Update media metadata
*
* Authors can edit their own media; editors+ can edit any.
*/
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const editDenied = requirePerm(user, "media:edit_own");
	if (editDenied) return editDenied;
	if (!id) return apiError("INVALID_REQUEST", "Media ID required", 400);
	if (!emdash?.handleMediaGet || !emdash?.handleMediaUpdate) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const getResult = await emdash.handleMediaGet(id);
		if (!getResult.success || !getResult.data?.item) return apiError("NOT_FOUND", "Media item not found", 404);
		const media = getResult.data.item;
		const ownerDenied = requireOwnerPerm(user, media.authorId, "media:edit_own", "media:edit_any");
		if (ownerDenied) return ownerDenied;
		const body = await parseBody(request, mediaUpdateBody);
		if (isParseError(body)) return body;
		return unwrapResult(await emdash.handleMediaUpdate(id, {
			alt: body.alt,
			caption: body.caption,
			width: body.width,
			height: body.height
		}));
	} catch (error) {
		return handleError(error, "Failed to update media", "MEDIA_UPDATE_ERROR");
	}
};
/**
* Delete media item
*
* Authors can delete their own media; editors+ can delete any.
*/
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const deleteDenied = requirePerm(user, "media:delete_own");
	if (deleteDenied) return deleteDenied;
	if (!id) return apiError("INVALID_REQUEST", "Media ID required", 400);
	if (!emdash?.handleMediaGet || !emdash?.handleMediaDelete) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const getResult = await emdash.handleMediaGet(id);
		if (!getResult.success || !getResult.data?.item) return apiError("NOT_FOUND", "Media item not found", 404);
		const media = getResult.data.item;
		const ownerDenied = requireOwnerPerm(user, media.authorId, "media:delete_own", "media:delete_any");
		if (ownerDenied) return ownerDenied;
		if (emdash.storage) try {
			await emdash.storage.delete(media.storageKey);
		} catch {}
		return unwrapResult(await emdash.handleMediaDelete(id));
	} catch (error) {
		return handleError(error, "Failed to delete media", "MEDIA_DELETE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_@_@mjs
var page = () => _id__exports;
//#endregion
export { page };
