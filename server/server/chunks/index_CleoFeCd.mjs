import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./comment-DPT0WKyd_BkkyuYSh.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { N as commentListQuery } from "./relations-5_avdrN__CvbT7cha.mjs";
import { a as unwrapResult, i as requireDb, r as handleError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { o as handleCommentInbox } from "./comments-Bz6sCbgD_a9Wp7cyE.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/comments/index.mjs
var comments_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* List comments for moderation inbox
*/
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "comments:moderate");
	if (denied) return denied;
	try {
		const query = parseQuery(url, commentListQuery);
		if (isParseError(query)) return query;
		return unwrapResult(await handleCommentInbox(emdash.db, {
			status: query.status,
			collection: query.collection,
			search: query.search,
			limit: query.limit,
			cursor: query.cursor
		}));
	} catch (error) {
		return handleError(error, "Failed to list comments", "COMMENT_INBOX_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/index@_@mjs
var page = () => comments_exports;
//#endregion
export { page };
