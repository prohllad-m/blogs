import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as getTrustedProxyHeaders } from "./trusted-proxy-CwjQj0YG_DN-afxUp.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./api-tokens-Cvmixds7_yggTcVRS.mjs";
import { n as getClientIp, r as rateLimitResponse, t as checkRateLimit } from "./rate-limit-CMj83JNW_CjZCHXzK.mjs";
import "./oauth-user-lookup-oUllxvAv_CWxoOzNh.mjs";
import { r as handleDeviceTokenExchange } from "./device-flow-BeA6lUS1_-i2bwB7q.mjs";
import { z } from "zod";
//#region node_modules/emdash/dist/astro/routes/api/oauth/device/token.mjs
var token_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var deviceTokenSchema = z.object({
	device_code: z.string().min(1),
	grant_type: z.string().min(1)
});
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, deviceTokenSchema);
		if (isParseError(body)) return body;
		const ip = getClientIp(request, getTrustedProxyHeaders(emdash.config));
		if (!(await checkRateLimit(emdash.db, ip, "device/token", 12, 60)).allowed) return rateLimitResponse(60);
		const result = await handleDeviceTokenExchange(emdash.db, body);
		if (!result.success && result.deviceFlowError) {
			const errorBody = { error: result.deviceFlowError };
			if (result.deviceFlowInterval !== void 0) errorBody.interval = result.deviceFlowInterval;
			return Response.json(errorBody, {
				status: 400,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-store",
					Pragma: "no-cache"
				}
			});
		}
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to exchange device code", "TOKEN_EXCHANGE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/device/token@_@mjs
var page = () => token_exports;
//#endregion
export { page };
