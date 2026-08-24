import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./content-Ci04z2z-_B6s9HI1r.mjs";
import "./media-BjhhENaJ_DtGEF5D8.mjs";
import "./user-Bh-L1qo6_BTeGs-hv.mjs";
import { t as handleDashboardStats } from "./dashboard-C5NkXFbi_Bb2RpPsp.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/dashboard.mjs
var dashboard_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "content:read");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		return unwrapResult(await handleDashboardStats(emdash.db));
	} catch (error) {
		return handleError(error, "Failed to load dashboard", "DASHBOARD_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/dashboard@_@mjs
var page = () => dashboard_exports;
//#endregion
export { page };
