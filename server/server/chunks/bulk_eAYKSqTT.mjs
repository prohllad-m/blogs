import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./comment-DPT0WKyd_BkkyuYSh.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { M as commentBulkBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { a as unwrapResult, i as requireDb, r as handleError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { n as handleCommentBulk } from "./comments-Bz6sCbgD_a9Wp7cyE.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/comments/bulk.mjs
var bulk_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	try {
		const body = await parseBody(request, commentBulkBody);
		if (isParseError(body)) return body;
		if (body.action === "delete") {
			const denied = requirePerm(user, "comments:delete");
			if (denied) return denied;
		} else {
			const denied = requirePerm(user, "comments:moderate");
			if (denied) return denied;
		}
		return unwrapResult(await handleCommentBulk(emdash.db, body.ids, body.action));
	} catch (error) {
		return handleError(error, "Failed to perform bulk operation", "COMMENT_BULK_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/bulk@_@mjs
var page = () => bulk_exports;
//#endregion
export { page };
