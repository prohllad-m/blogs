import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as OptionsRepository } from "./options-BlmBHTvX_nqkCch6f.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { y as signupRequestBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { t as getTrustedProxyHeaders } from "./trusted-proxy-CwjQj0YG_DN-afxUp.mjs";
import { h as requestSignup } from "./dist_Cewgrg50.mjs";
import { n as apiSuccess, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { t as createKyselyAdapter } from "./kysely_6BTjyg_S.mjs";
import "./schemas_9zeCee0X.mjs";
import { t as getSiteBaseUrl } from "./site-url-NGJT6NTU_BPGA4DzO.mjs";
import { n as getClientIp, t as checkRateLimit } from "./rate-limit-CMj83JNW_CjZCHXzK.mjs";
//#region node_modules/emdash/dist/astro/routes/api/auth/signup/request.mjs
var request_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var GENERIC_SUCCESS = {
	success: true,
	message: "If your email domain is allowed, you'll receive a verification email."
};
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!emdash.email?.isAvailable()) return apiError("EMAIL_NOT_CONFIGURED", "Email not configured. Self-signup is unavailable.", 503);
	try {
		const body = await parseBody(request, signupRequestBody);
		if (isParseError(body)) return body;
		const ip = getClientIp(request, getTrustedProxyHeaders(emdash.config));
		if (!(await checkRateLimit(emdash.db, ip, "signup/request", 3, 300)).allowed) return apiSuccess(GENERIC_SUCCESS);
		const adapter = createKyselyAdapter(emdash.db);
		const siteName = await new OptionsRepository(emdash.db).get("emdash:site_title") || "EmDash";
		await requestSignup({
			baseUrl: await getSiteBaseUrl(emdash.db, request),
			siteName,
			email: (message) => emdash.email.send(message, "system")
		}, adapter, body.email.toLowerCase().trim());
		return apiSuccess(GENERIC_SUCCESS);
	} catch (error) {
		console.error("Signup request error:", error);
		return apiSuccess(GENERIC_SUCCESS);
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/signup/request@_@mjs
var page = () => request_exports;
//#endregion
export { page };
