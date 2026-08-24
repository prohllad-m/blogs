import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./api-tokens-Cvmixds7_yggTcVRS.mjs";
import "./oauth-user-lookup-oUllxvAv_CWxoOzNh.mjs";
import { a as handleTokenRevoke } from "./device-flow-BeA6lUS1_-i2bwB7q.mjs";
import { z } from "zod";
//#region node_modules/emdash/dist/astro/routes/api/oauth/token/revoke.mjs
var revoke_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var revokeSchema = z.object({ token: z.string().min(1) });
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, revokeSchema);
		if (isParseError(body)) return body;
		return unwrapResult(await handleTokenRevoke(emdash.db, body));
	} catch (error) {
		return handleError(error, "Failed to revoke token", "TOKEN_REVOKE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token/revoke@_@mjs
var page = () => revoke_exports;
//#endregion
export { page };
