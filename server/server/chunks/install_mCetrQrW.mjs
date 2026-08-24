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
import { U as handleRegistryInstall } from "./query-Di7DOmPV_CieW2RCL.mjs";
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
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { n as VERSION } from "./version-907opKac_BV2oeYba.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { z } from "zod";
import { hostEnvFromVersions } from "@emdash-cms/registry-client/env";
//#region node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install.mjs
var install_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var installBodySchema = z.object({
	did: z.string().min(1).max(2048).regex(/^did:[a-z]+:/, "Invalid DID"),
	slug: z.string().min(1).max(64).regex(/^[a-zA-Z][a-zA-Z0-9_-]*$/, "Invalid slug"),
	version: z.string().min(1).max(64).optional(),
	acknowledgedDeclaredAccess: z.unknown().optional(),
	acknowledgedMcpTools: z.unknown().optional()
});
var POST = async ({ request, locals }) => {
	try {
		const { emdash, user } = locals;
		if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
		const denied = requirePerm(user, "plugins:manage");
		if (denied) return denied;
		const body = await parseBody(request, installBodySchema);
		if (isParseError(body)) return body;
		const reservedPluginIds = /* @__PURE__ */ new Set([...emdash.configuredPlugins.map((p) => p.id), ...(emdash.config.sandboxed ?? []).map((p) => p.id)]);
		const result = await handleRegistryInstall(emdash.db, emdash.storage, emdash.getSandboxRunner(), emdash.config.experimental?.registry, {
			did: body.did,
			slug: body.slug,
			version: body.version,
			acknowledgedDeclaredAccess: body.acknowledgedDeclaredAccess,
			acknowledgedMcpTools: body.acknowledgedMcpTools
		}, {
			configuredPluginIds: reservedPluginIds,
			hostEnv: hostEnvFromVersions(VERSION, emdash.config.astroVersion)
		});
		if (!result.success) return unwrapResult(result);
		await emdash.syncRegistryPlugins();
		return unwrapResult(result, 201);
	} catch (error) {
		console.error("[registry-install] Unhandled error:", error);
		return handleError(error, "Failed to install plugin from registry", "INSTALL_FAILED");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install@_@mjs
var page = () => install_exports;
//#endregion
export { page };
