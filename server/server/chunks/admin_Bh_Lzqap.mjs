import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as OptionsRepository } from "./options-BlmBHTvX_nqkCch6f.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { h as setupAdminBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { c as generateRegistrationOptions, l as generateToken } from "./passkey_aQ3O1Vf-.mjs";
import "./dist_Cewgrg50.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { n as createChallengeStore } from "./challenge-store-BFzgFRog_DS26Bg5F.mjs";
import { t as createKyselyAdapter } from "./kysely_6BTjyg_S.mjs";
import { n as getPublicOrigin } from "./public-url-DSGTnJFw__NsO_zTH.mjs";
import "./schemas_9zeCee0X.mjs";
import { t as getPasskeyConfig } from "./passkey-config-C-SKpc0-_CDaL7_L8.mjs";
import { n as SETUP_NONCE_MAX_AGE_SECONDS, t as SETUP_NONCE_COOKIE } from "./setup-nonce-DqiIPr-J_C_q_y0dp.mjs";
//#region node_modules/emdash/dist/astro/routes/api/setup/admin.mjs
var admin_exports = /* @__PURE__ */ __exportAll({
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
		if (await createKyselyAdapter(emdash.db).countUsers() > 0) {
			if (isComplete) return apiError("SETUP_COMPLETE", "Setup already complete", 400);
			return apiError("ADMIN_EXISTS", "Admin user already exists", 400);
		}
		const body = await parseBody(request, setupAdminBody);
		if (isParseError(body)) return body;
		const existingState = await options.get("emdash:setup_state");
		const nonce = generateToken();
		const url = new URL(request.url);
		const siteName = await options.get("emdash:site_title") ?? void 0;
		const siteUrl = getPublicOrigin(url, emdash?.config);
		const passkeyConfig = getPasskeyConfig(url, siteName, siteUrl);
		const challengeStore = createChallengeStore(emdash.db);
		const tempUser = {
			id: `setup-${Date.now()}`,
			email: body.email.toLowerCase(),
			name: body.name || null
		};
		const registrationOptions = await generateRegistrationOptions(passkeyConfig, tempUser, [], challengeStore);
		await options.set("emdash:setup_state", {
			...existingState,
			step: "admin",
			email: body.email.toLowerCase(),
			name: body.name || null,
			tempUserId: tempUser.id,
			nonce
		});
		const publicOrigin = new URL(siteUrl);
		cookies.set(SETUP_NONCE_COOKIE, nonce, {
			path: "/_emdash/",
			httpOnly: true,
			sameSite: "strict",
			secure: publicOrigin.protocol === "https:",
			maxAge: SETUP_NONCE_MAX_AGE_SECONDS
		});
		return apiSuccess({
			success: true,
			options: registrationOptions
		});
	} catch (error) {
		return handleError(error, "Failed to create admin", "SETUP_ADMIN_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/admin@_@mjs
var page = () => admin_exports;
//#endregion
export { page };
