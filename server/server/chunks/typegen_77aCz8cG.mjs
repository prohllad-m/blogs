import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/typegen.mjs
var typegen_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ locals }) => {
	return apiError("FORBIDDEN", "Typegen is only available in development", 403);
};
var POST = async ({ locals }) => {
	return apiError("FORBIDDEN", "Typegen is only available in development", 403);
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/typegen@_@mjs
var page = () => typegen_exports;
//#endregion
export { page };
