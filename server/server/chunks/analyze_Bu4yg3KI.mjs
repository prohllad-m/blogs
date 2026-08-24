import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-BjhhENaJ_DtGEF5D8.mjs";
import "./request-cache-BSUptuJR_CCaufTtE.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./settings-CpA4lQFt_C9lm7kb6.mjs";
import { n as resolveAndValidateExternalUrl, t as SsrfError } from "./ssrf-CviKqWmq_6hEIMCxY.mjs";
import "./dist_e9pyH8uL.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { x as wpPluginAnalyzeBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { n as SchemaRegistry } from "./registry-FV15nLge_C-lxn3gO.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { s as getSource } from "./import-Dmkm8S1W_BkjX2KEB.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze.mjs
var analyze_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "import:execute");
	if (denied) return denied;
	try {
		const body = await parseBody(request, wpPluginAnalyzeBody);
		if (isParseError(body)) return body;
		try {
			await resolveAndValidateExternalUrl(body.url);
		} catch (e) {
			return apiError("SSRF_BLOCKED", e instanceof SsrfError ? e.message : "Invalid URL", 400);
		}
		const source = getSource("wordpress-plugin");
		if (!source) return apiError("NOT_CONFIGURED", "WordPress plugin source not available", 500);
		const existingCollections = await fetchExistingCollections(emdash?.db);
		return apiSuccess({
			success: true,
			analysis: await source.analyze({
				type: "url",
				url: body.url,
				token: body.token
			}, {
				db: emdash?.db,
				getExistingCollections: async () => existingCollections
			})
		});
	} catch (error) {
		return handleError(error, "Failed to analyze WordPress site", "WP_PLUGIN_ANALYZE_ERROR");
	}
};
/** Fetch collections and their fields from schema registry */
async function fetchExistingCollections(db) {
	const result = /* @__PURE__ */ new Map();
	if (!db) return result;
	try {
		const registry = new SchemaRegistry(db);
		const collections = await registry.listCollections();
		for (const collection of collections) {
			const fields = await registry.listFields(collection.id);
			const fieldMap = /* @__PURE__ */ new Map();
			for (const field of fields) fieldMap.set(field.slug, { type: field.type });
			result.set(collection.slug, {
				slug: collection.slug,
				fields: fieldMap
			});
		}
	} catch (error) {
		console.warn("Could not fetch schema registry:", error);
	}
	return result;
}
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze@_@mjs
var page = () => analyze_exports;
//#endregion
export { page };
