import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { r as bylineFieldReorderBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import "./byline-registry-BCuOp4UF_EQhUHNLu.mjs";
import { a as unwrapResult, i as requireDb } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { a as handleBylineFieldReorder } from "./byline-fields-CdU_LTF1_ePBT4u1Y.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/byline-fields/reorder.mjs
var reorder_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const body = await parseBody(request, bylineFieldReorderBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleBylineFieldReorder(emdash.db, body.slugs));
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/reorder@_@mjs
var page = () => reorder_exports;
//#endregion
export { page };
