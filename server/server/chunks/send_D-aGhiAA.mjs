import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as OptionsRepository } from "./options-BlmBHTvX_nqkCch6f.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { l as magicLinkSendBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { t as getTrustedProxyHeaders } from "./trusted-proxy-CwjQj0YG_DN-afxUp.mjs";
import { g as sendMagicLink } from "./dist_Cewgrg50.mjs";
import { n as apiSuccess, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { t as createKyselyAdapter } from "./kysely_6BTjyg_S.mjs";
import "./schemas_9zeCee0X.mjs";
import { t as getSiteBaseUrl } from "./site-url-NGJT6NTU_BPGA4DzO.mjs";
import { n as getClientIp, t as checkRateLimit } from "./rate-limit-CMj83JNW_CjZCHXzK.mjs";
//#region node_modules/emdash/dist/astro/routes/api/auth/magic-link/send.mjs
var send_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, magicLinkSendBody);
		if (isParseError(body)) return body;
		const ip = getClientIp(request, getTrustedProxyHeaders(emdash.config));
		if (!(await checkRateLimit(emdash.db, ip, "magic-link/send", 3, 300)).allowed) return apiSuccess({
			success: true,
			message: "If an account exists for this email, a magic link has been sent."
		});
		if (!emdash.email?.isAvailable()) return apiError("EMAIL_NOT_CONFIGURED", "Email is not configured. Magic link authentication requires an email provider.", 503);
		const options = new OptionsRepository(emdash.db);
		await sendMagicLink({
			baseUrl: await getSiteBaseUrl(emdash.db, request),
			siteName: await options.get("emdash:site_title") ?? "EmDash",
			email: (message) => emdash.email.send(message, "system")
		}, createKyselyAdapter(emdash.db), body.email.toLowerCase());
		return apiSuccess({
			success: true,
			message: "If an account exists for this email, a magic link has been sent."
		});
	} catch (error) {
		console.error("Magic link send error:", error);
		return apiSuccess({
			success: true,
			message: "If an account exists for this email, a magic link has been sent."
		});
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/magic-link/send@_@mjs
var page = () => send_exports;
//#endregion
export { page };
