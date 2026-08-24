import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./byline-registry-BCuOp4UF_EQhUHNLu.mjs";
import { a as unwrapResult, i as requireDb, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { s as handleBylineFieldUsage } from "./byline-fields-CdU_LTF1_ePBT4u1Y.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage.mjs
var usage_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "schema:read");
	if (denied) return denied;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const slug = params.slug;
	if (!slug) return apiError("MISSING_PARAM", "Field slug is required", 400);
	return unwrapResult(await handleBylineFieldUsage(emdash.db, slug));
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage@_@mjs
var page = () => usage_exports;
//#endregion
export { page };
