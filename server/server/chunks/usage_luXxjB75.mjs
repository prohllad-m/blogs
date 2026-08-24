import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-BjhhENaJ_DtGEF5D8.mjs";
import "./content-refresh-D4khvC0R_Bxt0RQoB.mjs";
import { p as mediaUsageDetailsQuery } from "./media-kIV1IxFf_BRR3CdsF.mjs";
import "./relations-5_avdrN__CvbT7cha.mjs";
import { t as handleMediaUsageDetails } from "./media-usage-CljdO1mc_DAoaqekq.mjs";
import { a as unwrapResult, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./api-tokens-Cvmixds7_yggTcVRS.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { t as requireScope } from "./scopes-Bl4IwHA-_DEAHIm1T.mjs";
//#region node_modules/emdash/dist/astro/routes/api/media/_id_/usage.mjs
var usage_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const mediaDenied = requirePerm(user, "media:read");
	if (mediaDenied) return mediaDenied;
	const contentDenied = requirePerm(user, "content:read_drafts");
	if (contentDenied) return contentDenied;
	const scopeDenied = requireScope(locals, "admin");
	if (scopeDenied) return scopeDenied;
	const { id } = params;
	if (!id) return apiError("INVALID_REQUEST", "Media ID required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const query = parseQuery(new URL(request.url), mediaUsageDetailsQuery);
	if (isParseError(query)) return query;
	return unwrapResult(await handleMediaUsageDetails(emdash.db, id, query));
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/usage@_@mjs
var page = () => usage_exports;
//#endregion
export { page };
