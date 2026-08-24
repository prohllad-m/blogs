import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as OptionsRepository } from "./options-BlmBHTvX_nqkCch6f.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { m as passkeyVerifyBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { i as authenticateWithPasskey, t as PasskeyAuthenticationError } from "./passkey_aQ3O1Vf-.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { n as createChallengeStore } from "./challenge-store-BFzgFRog_DS26Bg5F.mjs";
import { t as createKyselyAdapter } from "./kysely_6BTjyg_S.mjs";
import { n as getPublicOrigin } from "./public-url-DSGTnJFw__NsO_zTH.mjs";
import "./schemas_9zeCee0X.mjs";
import { n as validateAllowedOrigins, t as getConfiguredAllowedOrigins } from "./allowed-origins-CCEi9bPI_gQd8oIqa.mjs";
import { t as getPasskeyConfig } from "./passkey-config-C-SKpc0-_CDaL7_L8.mjs";
//#region node_modules/emdash/dist/astro/routes/api/auth/passkey/verify.mjs
var verify_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals, session }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, passkeyVerifyBody);
		if (isParseError(body)) return body;
		const url = new URL(request.url);
		const siteName = await new OptionsRepository(emdash.db).get("emdash:site_title") ?? void 0;
		const siteUrl = getPublicOrigin(url, emdash?.config);
		const passkeyConfig = getPasskeyConfig(url, siteName, siteUrl, validateAllowedOrigins(siteUrl, getConfiguredAllowedOrigins(emdash?.config)));
		const adapter = createKyselyAdapter(emdash.db);
		const challengeStore = createChallengeStore(emdash.db);
		const user = await authenticateWithPasskey(passkeyConfig, adapter, body.credential, challengeStore);
		if (session) session.set("user", { id: user.id });
		return apiSuccess({
			success: true,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role
			}
		});
	} catch (error) {
		if (error instanceof PasskeyAuthenticationError) return apiError("UNAUTHORIZED", "Authentication failed", 401);
		return handleError(error, "Authentication failed", "PASSKEY_VERIFY_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/verify@_@mjs
var page = () => verify_exports;
//#endregion
export { page };
