import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { n as apiSuccess } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { t as getAuthMode } from "./mode-fiXRMfeA_Cazv9x_J.mjs";
//#region node_modules/emdash/dist/astro/routes/api/auth/mode.mjs
var mode_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash } = locals;
	const authMode = getAuthMode(emdash?.config);
	let signupEnabled = false;
	if (emdash?.db && authMode.type === "passkey") try {
		const { sql } = await import("kysely");
		const result = await sql`
				SELECT COUNT(*) as cnt FROM allowed_domains WHERE enabled = 1
			`.execute(emdash.db);
		signupEnabled = Number(result.rows[0]?.cnt ?? 0) > 0;
	} catch {}
	const providers = (emdash?.config?.authProviders ?? []).map((p) => ({
		id: p.id,
		label: p.label
	}));
	return apiSuccess({
		authMode: authMode.type === "external" ? authMode.providerType : "passkey",
		signupEnabled,
		providers
	});
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/mode@_@mjs
var page = () => mode_exports;
//#endregion
export { page };
