import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as UserRepository } from "./user-Bh-L1qo6_BTeGs-hv.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { t as authMeActionBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
//#region node_modules/emdash/dist/astro/routes/api/auth/me.mjs
var me_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { user } = locals;
	if (!user) return apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
	const isFirstLogin = !user.data?.welcomeDismissed;
	return apiSuccess({
		id: user.id,
		email: user.email,
		name: user.name,
		role: user.role,
		avatarUrl: user.avatarUrl,
		isFirstLogin
	});
};
/**
* POST /_emdash/api/auth/me
*
* Mark that the user has seen the welcome modal.
*/
var POST = async ({ request, locals }) => {
	const { user, emdash } = locals;
	if (!user) return apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
	if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const body = await parseBody(request, authMeActionBody);
	if (isParseError(body)) return body;
	if (body.action === "dismissWelcome") try {
		await new UserRepository(emdash.db).update(user.id, { data: {
			...user.data,
			welcomeDismissed: true
		} });
		return apiSuccess({ success: true });
	} catch (error) {
		return handleError(error, "Failed to dismiss welcome", "WELCOME_DISMISS_ERROR");
	}
	return apiError("UNKNOWN_ACTION", "Unknown action", 400);
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/me@_@mjs
var page = () => me_exports;
//#endregion
export { page };
