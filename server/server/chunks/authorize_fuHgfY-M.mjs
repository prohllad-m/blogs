import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./api-tokens-Cvmixds7_yggTcVRS.mjs";
import "./oauth-user-lookup-oUllxvAv_CWxoOzNh.mjs";
import { t as handleDeviceAuthorize } from "./device-flow-BeA6lUS1_-i2bwB7q.mjs";
import { z } from "zod";
//#region node_modules/emdash/dist/astro/routes/api/oauth/device/authorize.mjs
var authorize_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var authorizeSchema = z.object({
	user_code: z.string().min(1),
	action: z.enum(["approve", "deny"]).optional()
});
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	const { user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("NOT_AUTHENTICATED", "Authentication required", 401);
	try {
		const body = await parseBody(request, authorizeSchema);
		if (isParseError(body)) return body;
		return unwrapResult(await handleDeviceAuthorize(emdash.db, user.id, user.role, body));
	} catch (error) {
		return handleError(error, "Failed to authorize device", "AUTHORIZE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/device/authorize@_@mjs
var page = () => authorize_exports;
//#endregion
export { page };
