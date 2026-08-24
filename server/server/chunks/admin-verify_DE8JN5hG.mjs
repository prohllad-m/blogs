import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as OptionsRepository } from "./options-BlmBHTvX_nqkCch6f.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { g as setupAdminVerifyBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { t as Role } from "./types-ndj-bYfi_C5ykUs-G.mjs";
import { _ as verifyRegistrationResponse, g as secureCompare, h as registerPasskey } from "./passkey_aQ3O1Vf-.mjs";
import "./dist_Cewgrg50.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { n as createChallengeStore } from "./challenge-store-BFzgFRog_DS26Bg5F.mjs";
import { t as createKyselyAdapter } from "./kysely_6BTjyg_S.mjs";
import { n as getPublicOrigin } from "./public-url-DSGTnJFw__NsO_zTH.mjs";
import "./schemas_9zeCee0X.mjs";
import { n as validateAllowedOrigins, t as getConfiguredAllowedOrigins } from "./allowed-origins-CCEi9bPI_gQd8oIqa.mjs";
import { t as getPasskeyConfig } from "./passkey-config-C-SKpc0-_CDaL7_L8.mjs";
import { t as SETUP_NONCE_COOKIE } from "./setup-nonce-DqiIPr-J_C_q_y0dp.mjs";
//#region node_modules/emdash/dist/astro/routes/api/setup/admin-verify.mjs
var admin_verify_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ cookies, request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const options = new OptionsRepository(emdash.db);
		const setupComplete = await options.get("emdash:setup_complete");
		const isComplete = setupComplete === true || setupComplete === "true";
		const adapter = createKyselyAdapter(emdash.db);
		if (await adapter.countUsers() > 0) {
			if (isComplete) return apiError("SETUP_COMPLETE", "Setup already complete", 400);
			return apiError("ADMIN_EXISTS", "Admin user already exists", 400);
		}
		const setupState = await options.get("emdash:setup_state");
		if (!setupState || setupState.step !== "admin") return apiError("INVALID_STATE", "Invalid setup state. Please restart setup.", 400);
		const cookieNonce = cookies.get(SETUP_NONCE_COOKIE)?.value;
		if (!setupState.nonce || !cookieNonce || !secureCompare(cookieNonce, setupState.nonce)) return apiError("INVALID_STATE", "Setup session expired or tampered with. Please restart the admin step.", 400);
		if (!setupState.email) return apiError("INVALID_STATE", "Invalid setup state. Please restart setup.", 400);
		const body = await parseBody(request, setupAdminVerifyBody);
		if (isParseError(body)) return body;
		const url = new URL(request.url);
		const siteName = await options.get("emdash:site_title") ?? void 0;
		const siteUrl = getPublicOrigin(url, emdash?.config);
		const passkeyConfig = getPasskeyConfig(url, siteName, siteUrl, validateAllowedOrigins(siteUrl, getConfiguredAllowedOrigins(emdash?.config)));
		const challengeStore = createChallengeStore(emdash.db);
		const verified = await verifyRegistrationResponse(passkeyConfig, body.credential, challengeStore);
		const user = await adapter.createUser({
			email: setupState.email,
			name: setupState.name ?? null,
			role: Role.ADMIN,
			emailVerified: false
		});
		await registerPasskey(adapter, user.id, verified, "Setup passkey");
		await options.set("emdash:setup_complete", true);
		await options.delete("emdash:setup_state");
		cookies.delete(SETUP_NONCE_COOKIE, { path: "/_emdash/" });
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
		return handleError(error, "Failed to verify admin setup", "SETUP_VERIFY_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/admin-verify@_@mjs
var page = () => admin_verify_exports;
//#endregion
export { page };
