import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./runner-DfnZ5eUr_D0TboABR.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import "ulidx";
//#region node_modules/emdash/dist/astro/routes/api/auth/dev-bypass.mjs
var dev_bypass_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
async function handleDevBypass(context) {
	return apiError("FORBIDDEN", "Dev bypass is only available in development mode", 403);
}
var GET = handleDevBypass;
var POST = handleDevBypass;
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/dev-bypass@_@mjs
var page = () => dev_bypass_exports;
//#endregion
export { page };
