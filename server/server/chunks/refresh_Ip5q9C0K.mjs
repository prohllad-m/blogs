import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./api-tokens-Cvmixds7_yggTcVRS.mjs";
import "./oauth-user-lookup-oUllxvAv_CWxoOzNh.mjs";
import { i as handleTokenRefresh } from "./device-flow-BeA6lUS1_-i2bwB7q.mjs";
import { z } from "zod";
//#region node_modules/emdash/dist/astro/routes/api/oauth/token/refresh.mjs
var refresh_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var refreshSchema = z.object({
	refresh_token: z.string().min(1),
	grant_type: z.string().min(1)
});
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, refreshSchema);
		if (isParseError(body)) return body;
		return unwrapResult(await handleTokenRefresh(emdash.db, body));
	} catch (error) {
		return handleError(error, "Failed to refresh token", "TOKEN_REFRESH_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token/refresh@_@mjs
var page = () => refresh_exports;
//#endregion
export { page };
