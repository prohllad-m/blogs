import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./comment-DPT0WKyd_BkkyuYSh.mjs";
import "./content-Ci04z2z-_B6s9HI1r.mjs";
import "./media-BjhhENaJ_DtGEF5D8.mjs";
import "./user-Bh-L1qo6_BTeGs-hv.mjs";
import "./taxonomy-DfVooU4W_BOv42Utk.mjs";
import { T as handleMarketplaceInstall } from "./query-Di7DOmPV_CieW2RCL.mjs";
import "./content-refresh-D4khvC0R_Bxt0RQoB.mjs";
import "./request-cache-BSUptuJR_CCaufTtE.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./settings-CpA4lQFt_C9lm7kb6.mjs";
import "./ssrf-CviKqWmq_6hEIMCxY.mjs";
import "./resolve-Cd9dzclN_C_W0skoc.mjs";
import "./manifest-schema-bCq54i7F_D0gLHu7z.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import "./relations-5_avdrN__CvbT7cha.mjs";
import "./menus-CZyG6rvx_y54L2Ozg.mjs";
import "./redirect-CgLPYflR_CplqVHl6.mjs";
import "./byline-registry-BCuOp4UF_EQhUHNLu.mjs";
import "./field-defs-cache-DvmlgP-D_bBrZBINr.mjs";
import "./byline-XEjchwzZ_MSMp-1jc.mjs";
import "./fts-manager-DzqIBrrW_C8Ds5uQp.mjs";
import "./taxonomies-DjSKBZpq_OMwze2dv.mjs";
import "./registry-FV15nLge_C-lxn3gO.mjs";
import "./dashboard-C5NkXFbi_Bb2RpPsp.mjs";
import "./media-usage-CljdO1mc_DAoaqekq.mjs";
import "./zod-generator-B5prQ5M4_D0jJDS58.mjs";
import "./schema-BXxlHeAf_DhiqKlY6.mjs";
import "./sections-CwW4s1al_qO0B4soT.mjs";
import "./settings-C4s8hFQm_B9SCTO5I.mjs";
import "./taxonomies-Ce49uIzY_W3kbPv94.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { z } from "zod";
//#region node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install.mjs
var install_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var installBodySchema = z.object({
	version: z.string().min(1).optional(),
	confirmMcpTools: z.boolean().optional()
});
var POST = async ({ params, request, locals }) => {
	try {
		const { emdash, user } = locals;
		const { id } = params;
		if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
		const denied = requirePerm(user, "plugins:manage");
		if (denied) return denied;
		if (!id) return apiError("INVALID_REQUEST", "Plugin ID required", 400);
		const body = await parseOptionalBody(request, installBodySchema, {});
		if (isParseError(body)) return body;
		const configuredPluginIds = new Set(emdash.configuredPlugins.map((p) => p.id));
		const siteOrigin = new URL(request.url).origin;
		const result = await handleMarketplaceInstall(emdash.db, emdash.storage, emdash.getSandboxRunner(), emdash.config.marketplace, id, {
			version: body.version,
			configuredPluginIds,
			siteOrigin,
			sandboxBypassed: emdash.isSandboxBypassed(),
			confirmMcpTools: body.confirmMcpTools
		});
		if (!result.success) return unwrapResult(result);
		await emdash.syncMarketplacePlugins();
		return unwrapResult(result, 201);
	} catch (error) {
		console.error("[marketplace-install] Unhandled error:", error);
		return handleError(error, "Failed to install plugin from marketplace", "INSTALL_FAILED");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install@_@mjs
var page = () => install_exports;
//#endregion
export { page };
