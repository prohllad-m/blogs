import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as OptionsRepository } from "./options-BlmBHTvX_nqkCch6f.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { f as passkeyRegisterVerifyBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { _ as verifyRegistrationResponse, h as registerPasskey } from "./passkey_aQ3O1Vf-.mjs";
import { n as apiSuccess, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { n as createChallengeStore } from "./challenge-store-BFzgFRog_DS26Bg5F.mjs";
import { t as createKyselyAdapter } from "./kysely_6BTjyg_S.mjs";
import { n as getPublicOrigin } from "./public-url-DSGTnJFw__NsO_zTH.mjs";
import "./schemas_9zeCee0X.mjs";
import { n as validateAllowedOrigins, t as getConfiguredAllowedOrigins } from "./allowed-origins-CCEi9bPI_gQd8oIqa.mjs";
import { t as getPasskeyConfig } from "./passkey-config-C-SKpc0-_CDaL7_L8.mjs";
//#region node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify.mjs
var verify_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var MAX_PASSKEYS = 10;
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
	try {
		const adapter = createKyselyAdapter(emdash.db);
		if (await adapter.countCredentialsByUserId(user.id) >= MAX_PASSKEYS) return apiError("PASSKEY_LIMIT", `Maximum of ${MAX_PASSKEYS} passkeys allowed`, 400);
		const body = await parseBody(request, passkeyRegisterVerifyBody);
		if (isParseError(body)) return body;
		const url = new URL(request.url);
		const optionsRepo = new OptionsRepository(emdash.db);
		const siteName = await optionsRepo.get("emdash:site_title") ?? void 0;
		const siteUrl = getPublicOrigin(url, emdash?.config);
		const passkeyConfig = getPasskeyConfig(url, siteName, siteUrl, validateAllowedOrigins(siteUrl, getConfiguredAllowedOrigins(emdash?.config)));
		const challengeStore = createChallengeStore(emdash.db);
		const verified = await verifyRegistrationResponse(passkeyConfig, body.credential, challengeStore);
		let passKeyName = body.name ?? void 0;
		if (!passKeyName) {
			const pending = await optionsRepo.get(`emdash:passkey_pending:${user.id}`);
			if (pending?.name) passKeyName = pending.name;
		}
		await optionsRepo.delete(`emdash:passkey_pending:${user.id}`);
		const credential = await registerPasskey(adapter, user.id, verified, passKeyName);
		return apiSuccess({ passkey: {
			id: credential.id,
			name: credential.name,
			deviceType: credential.deviceType,
			backedUp: credential.backedUp,
			createdAt: credential.createdAt.toISOString(),
			lastUsedAt: credential.lastUsedAt.toISOString()
		} });
	} catch (error) {
		console.error("Passkey registration verify error:", error);
		const message = error instanceof Error ? error.message : "";
		if (message.includes("credential_exists") || message.includes("already")) return apiError("CREDENTIAL_EXISTS", "This passkey is already registered", 400);
		if (message.includes("challenge") || message.includes("expired")) return apiError("CHALLENGE_EXPIRED", "Registration expired. Please try again.", 400);
		return apiError("PASSKEY_REGISTER_ERROR", "Registration failed", 500);
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify@_@mjs
var page = () => verify_exports;
//#endregion
export { page };
