import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as OptionsRepository } from "./options-BlmBHTvX_nqkCch6f.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { c as inviteRegisterOptionsBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { c as generateRegistrationOptions } from "./passkey_aQ3O1Vf-.mjs";
import { _ as validateInvite, t as InviteError } from "./dist_Cewgrg50.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { n as createChallengeStore } from "./challenge-store-BFzgFRog_DS26Bg5F.mjs";
import { t as createKyselyAdapter } from "./kysely_6BTjyg_S.mjs";
import { n as getPublicOrigin } from "./public-url-DSGTnJFw__NsO_zTH.mjs";
import "./schemas_9zeCee0X.mjs";
import { t as getPasskeyConfig } from "./passkey-config-C-SKpc0-_CDaL7_L8.mjs";
import { ulid } from "ulidx";
//#region node_modules/emdash/dist/astro/routes/api/auth/invite/register-options.mjs
var register_options_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, inviteRegisterOptionsBody);
		if (isParseError(body)) return body;
		const invite = await validateInvite(createKyselyAdapter(emdash.db), body.token);
		const url = new URL(request.url);
		const passkeyConfig = getPasskeyConfig(url, await new OptionsRepository(emdash.db).get("emdash:site_title") ?? void 0, getPublicOrigin(url, emdash?.config));
		const challengeStore = createChallengeStore(emdash.db);
		return apiSuccess({ options: await generateRegistrationOptions(passkeyConfig, {
			id: ulid(),
			email: invite.email,
			name: body.name || null
		}, [], challengeStore) });
	} catch (error) {
		if (error instanceof InviteError) return apiError(error.code.toUpperCase(), error.message, {
			invalid_token: 404,
			token_expired: 410,
			user_exists: 409
		}[error.code] ?? 400);
		return handleError(error, "Failed to generate registration options", "INVITE_REGISTER_OPTIONS_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/invite/register-options@_@mjs
var page = () => register_options_exports;
//#endregion
export { page };
