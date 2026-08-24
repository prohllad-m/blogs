import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as OptionsRepository } from "./options-BlmBHTvX_nqkCch6f.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { d as passkeyRegisterOptionsBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { c as generateRegistrationOptions } from "./passkey_aQ3O1Vf-.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { n as createChallengeStore } from "./challenge-store-BFzgFRog_DS26Bg5F.mjs";
import { t as createKyselyAdapter } from "./kysely_6BTjyg_S.mjs";
import { n as getPublicOrigin } from "./public-url-DSGTnJFw__NsO_zTH.mjs";
import "./schemas_9zeCee0X.mjs";
import { t as getPasskeyConfig } from "./passkey-config-C-SKpc0-_CDaL7_L8.mjs";
//#region node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options.mjs
var options_exports = /* @__PURE__ */ __exportAll({
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
		const body = await parseOptionalBody(request, passkeyRegisterOptionsBody, {});
		if (isParseError(body)) return body;
		const existingCredentials = await adapter.getCredentialsByUserId(user.id);
		const url = new URL(request.url);
		const optionsRepo = new OptionsRepository(emdash.db);
		const passkeyConfig = getPasskeyConfig(url, await optionsRepo.get("emdash:site_title") ?? void 0, getPublicOrigin(url, emdash?.config));
		const challengeStore = createChallengeStore(emdash.db);
		const registrationOptions = await generateRegistrationOptions(passkeyConfig, {
			id: user.id,
			email: user.email,
			name: user.name
		}, existingCredentials, challengeStore);
		if (body.name) await optionsRepo.set(`emdash:passkey_pending:${user.id}`, { name: body.name });
		return apiSuccess({ options: registrationOptions });
	} catch (error) {
		return handleError(error, "Failed to generate registration options", "PASSKEY_REGISTER_OPTIONS_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options@_@mjs
var page = () => options_exports;
//#endregion
export { page };
