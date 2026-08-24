import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-BjhhENaJ_DtGEF5D8.mjs";
import "./request-cache-BSUptuJR_CCaufTtE.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./settings-CpA4lQFt_C9lm7kb6.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { _t as settingsUpdateBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { n as handleSettingsUpdate, t as handleSettingsGet } from "./settings-C4s8hFQm_B9SCTO5I.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/settings.mjs
var settings_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/**
* GET /_emdash/api/settings
*
* Returns all site settings as a JSON object.
* Unset values are undefined. Media references include resolved URLs.
*/
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:read");
	if (denied) return denied;
	try {
		return unwrapResult(await handleSettingsGet(emdash.db, emdash.storage));
	} catch (error) {
		return handleError(error, "Failed to get settings", "SETTINGS_READ_ERROR");
	}
};
/**
* POST /_emdash/api/settings
*
* Updates site settings. Accepts a partial settings object.
* Merges with existing settings and returns the updated settings.
*/
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, settingsUpdateBody);
		if (isParseError(body)) return body;
		return unwrapResult(await handleSettingsUpdate(emdash.db, emdash.storage, body));
	} catch (error) {
		return handleError(error, "Failed to update settings", "SETTINGS_UPDATE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings@_@mjs
var page = () => settings_exports;
//#endregion
export { page };
