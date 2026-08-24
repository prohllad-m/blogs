import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { i as runMigrations } from "./runner-DfnZ5eUr_D0TboABR.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as OptionsRepository } from "./options-BlmBHTvX_nqkCch6f.mjs";
import "./content-Ci04z2z-_B6s9HI1r.mjs";
import "./media-BjhhENaJ_DtGEF5D8.mjs";
import "./taxonomy-DfVooU4W_BOv42Utk.mjs";
import "./content-refresh-D4khvC0R_Bxt0RQoB.mjs";
import "./request-cache-BSUptuJR_CCaufTtE.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./settings-CpA4lQFt_C9lm7kb6.mjs";
import "./ssrf-CviKqWmq_6hEIMCxY.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { _ as setupBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import "./redirect-CgLPYflR_CplqVHl6.mjs";
import "./byline-registry-BCuOp4UF_EQhUHNLu.mjs";
import "./field-defs-cache-DvmlgP-D_bBrZBINr.mjs";
import "./byline-XEjchwzZ_MSMp-1jc.mjs";
import "./fts-manager-DzqIBrrW_C8Ds5uQp.mjs";
import "./registry-FV15nLge_C-lxn3gO.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { t as validateSeed } from "./validate-V9nCwq_-_CIDKwgcr.mjs";
import { t as applySeed } from "./apply-CmIJK9j8_CfEBysf6.mjs";
import { t as loadSeed } from "./load-Cx27ki1l_DsJXBmd0.mjs";
import { t as getAuthMode } from "./mode-fiXRMfeA_Cazv9x_J.mjs";
import { n as getPublicOrigin } from "./public-url-DSGTnJFw__NsO_zTH.mjs";
import "./schemas_9zeCee0X.mjs";
//#region node_modules/emdash/dist/astro/routes/api/setup/index.mjs
var setup_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, url, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		try {
			const setupComplete = await new OptionsRepository(emdash.db).get("emdash:setup_complete");
			if (setupComplete === true || setupComplete === "true") return apiError("ALREADY_CONFIGURED", "Setup has already been completed", 409);
		} catch {}
		const body = await parseBody(request, setupBody);
		if (isParseError(body)) return body;
		try {
			await runMigrations(emdash.db);
		} catch (error) {
			return handleError(error, "Failed to run database migrations", "MIGRATION_ERROR");
		}
		const seed = await loadSeed();
		seed.settings = {
			...seed.settings,
			title: body.title,
			tagline: body.tagline
		};
		const validation = validateSeed(seed);
		if (!validation.valid) return apiError("INVALID_SEED", `Invalid seed file: ${validation.errors.join(", ")}`, 400);
		let result;
		try {
			result = await applySeed(emdash.db, seed, {
				includeContent: body.includeContent,
				onConflict: "skip",
				storage: emdash.storage ?? void 0
			});
		} catch (error) {
			return handleError(error, "Failed to apply seed", "SEED_ERROR");
		}
		const useExternalAuth = getAuthMode(emdash.config).type === "external";
		try {
			const options = new OptionsRepository(emdash.db);
			const siteUrl = getPublicOrigin(url, emdash.config);
			await options.setIfAbsent("emdash:site_url", siteUrl);
			if (useExternalAuth) {
				await options.set("emdash:setup_complete", true);
				await options.set("emdash:site_title", body.title);
				if (body.tagline) await options.set("emdash:site_tagline", body.tagline);
			} else await options.set("emdash:setup_state", {
				step: "site_complete",
				title: body.title,
				tagline: body.tagline
			});
		} catch (error) {
			console.error("Failed to save setup state:", error);
		}
		return apiSuccess({
			success: true,
			setupComplete: useExternalAuth,
			result
		});
	} catch (error) {
		return handleError(error, "Setup failed", "SETUP_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/index@_@mjs
var page = () => setup_exports;
//#endregion
export { page };
