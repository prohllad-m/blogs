import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import "./email-console-C-9Ng8DM_ByaQbxDJ.mjs";
//#region node_modules/emdash/dist/astro/routes/api/dev/emails.mjs
var emails_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	prerender: () => false
});
var GET = async () => {
	return apiError("FORBIDDEN", "Dev emails endpoint is only available in development mode", 403);
};
var DELETE = async () => {
	return apiError("FORBIDDEN", "Dev emails endpoint is only available in development mode", 403);
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/dev/emails@_@mjs
var page = () => emails_exports;
//#endregion
export { page };
