import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as getTrustedProxyHeaders } from "./trusted-proxy-CwjQj0YG_DN-afxUp.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { n as getPublicOrigin } from "./public-url-DSGTnJFw__NsO_zTH.mjs";
import "./api-tokens-Cvmixds7_yggTcVRS.mjs";
import { n as getClientIp, r as rateLimitResponse, t as checkRateLimit } from "./rate-limit-CMj83JNW_CjZCHXzK.mjs";
import "./oauth-user-lookup-oUllxvAv_CWxoOzNh.mjs";
import { n as handleDeviceCodeRequest } from "./device-flow-BeA6lUS1_-i2bwB7q.mjs";
import { z } from "zod";
//#region node_modules/emdash/dist/astro/routes/api/oauth/device/code.mjs
var code_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var deviceCodeSchema = z.object({
	client_id: z.string().optional(),
	scope: z.string().optional()
});
var POST = async ({ request, locals, url }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, deviceCodeSchema);
		if (isParseError(body)) return body;
		const ip = getClientIp(request, getTrustedProxyHeaders(emdash.config));
		if (!(await checkRateLimit(emdash.db, ip, "device/code", 10, 60)).allowed) return rateLimitResponse(60);
		const verificationUri = new URL("/_emdash/admin/device", getPublicOrigin(url, emdash?.config)).toString();
		return unwrapResult(await handleDeviceCodeRequest(emdash.db, body, verificationUri));
	} catch (error) {
		return handleError(error, "Failed to create device code", "DEVICE_CODE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/device/code@_@mjs
var page = () => code_exports;
//#endregion
export { page };
