import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as OptionsRepository } from "./options-BlmBHTvX_nqkCch6f.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { u as passkeyOptionsBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { t as getTrustedProxyHeaders } from "./trusted-proxy-CwjQj0YG_DN-afxUp.mjs";
import { o as generateAuthenticationOptions } from "./passkey_aQ3O1Vf-.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { n as createChallengeStore, t as cleanupExpiredChallenges } from "./challenge-store-BFzgFRog_DS26Bg5F.mjs";
import { t as createKyselyAdapter } from "./kysely_6BTjyg_S.mjs";
import { n as getPublicOrigin } from "./public-url-DSGTnJFw__NsO_zTH.mjs";
import "./schemas_9zeCee0X.mjs";
import { t as getPasskeyConfig } from "./passkey-config-C-SKpc0-_CDaL7_L8.mjs";
import { n as getClientIp, r as rateLimitResponse, t as checkRateLimit } from "./rate-limit-CMj83JNW_CjZCHXzK.mjs";
//#region node_modules/emdash/dist/astro/routes/api/auth/passkey/options.mjs
var options_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		cleanupExpiredChallenges(emdash.db).catch(() => {});
		const body = await parseOptionalBody(request, passkeyOptionsBody, {});
		if (isParseError(body)) return body;
		const ip = getClientIp(request, getTrustedProxyHeaders(emdash.config));
		if (!(await checkRateLimit(emdash.db, ip, "passkey/options", 10, 60)).allowed) return rateLimitResponse(60);
		const adapter = createKyselyAdapter(emdash.db);
		let credentials = [];
		if (body.email) {
			const user = await adapter.getUserByEmail(body.email);
			if (user) credentials = await adapter.getCredentialsByUserId(user.id);
		}
		const url = new URL(request.url);
		const passkeyConfig = getPasskeyConfig(url, await new OptionsRepository(emdash.db).get("emdash:site_title") ?? void 0, getPublicOrigin(url, emdash?.config));
		const challengeStore = createChallengeStore(emdash.db);
		return apiSuccess({
			success: true,
			options: await generateAuthenticationOptions(passkeyConfig, credentials, challengeStore)
		});
	} catch (error) {
		return handleError(error, "Failed to generate passkey options", "PASSKEY_OPTIONS_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/options@_@mjs
var page = () => options_exports;
//#endregion
export { page };
