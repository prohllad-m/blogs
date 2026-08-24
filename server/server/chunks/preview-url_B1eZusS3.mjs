import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { o as getI18nConfig } from "./runner-DfnZ5eUr_D0TboABR.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { R as contentPreviewUrlBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { a as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { t as getPreviewUrl } from "./preview-D4Jnbfx7_BwRiGWvY.mjs";
import { t as resolveSecretsCached } from "./secrets-CSwQIl4q_CA0X4cuR.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url.mjs
var preview_url_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var DURATION_PATTERN = /^(\d+)([smhdw])$/;
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:read_drafts");
	if (denied) return denied;
	const collection = params.collection;
	const id = params.id;
	const { previewSecret } = await resolveSecretsCached(emdash.db);
	let entryLocale = null;
	if (emdash?.handleContentGet) {
		const result = await emdash.handleContentGet(collection, id);
		if (!result.success) return unwrapResult(result);
		entryLocale = result.data?.item?.locale ?? null;
	}
	const body = await parseOptionalBody(request, contentPreviewUrlBody, {});
	if (isParseError(body)) return body;
	const expiresIn = body.expiresIn || "1h";
	const pathPattern = body.pathPattern || "/{collection}/{id}";
	const i18n = getI18nConfig();
	let localeSegment = "";
	if (entryLocale && i18n) localeSegment = entryLocale === i18n.defaultLocale && !i18n.prefixDefaultLocale ? "" : entryLocale;
	else if (entryLocale) localeSegment = entryLocale;
	const expiresInSeconds = typeof expiresIn === "number" ? expiresIn : parseExpiresIn(expiresIn);
	const expiresAt = Math.floor(Date.now() / 1e3) + expiresInSeconds;
	try {
		return apiSuccess({
			url: await getPreviewUrl({
				collection,
				id,
				secret: previewSecret,
				expiresIn,
				pathPattern,
				locale: localeSegment
			}),
			expiresAt
		});
	} catch (error) {
		return handleError(error, "Failed to generate preview URL", "TOKEN_ERROR");
	}
};
function parseExpiresIn(duration) {
	const match = duration.match(DURATION_PATTERN);
	if (!match) return 3600;
	const value = parseInt(match[1], 10);
	switch (match[2]) {
		case "s": return value;
		case "m": return value * 60;
		case "h": return value * 60 * 60;
		case "d": return value * 60 * 60 * 24;
		case "w": return value * 60 * 60 * 24 * 7;
		default: return 3600;
	}
}
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url@_@mjs
var page = () => preview_url_exports;
//#endregion
export { page };
