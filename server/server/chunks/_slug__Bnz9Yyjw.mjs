import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { Ct as updateSectionBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { a as handleSectionUpdate, n as handleSectionDelete, r as handleSectionGet } from "./sections-CwW4s1al_qO0B4soT.mjs";
import { a as unwrapResult, i as requireDb, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/sections/_slug_.mjs
var _slug__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const db = emdash.db;
	const { slug } = params;
	const denied = requirePerm(user, "sections:read");
	if (denied) return denied;
	if (!slug) return apiError("VALIDATION_ERROR", "slug is required", 400);
	try {
		return unwrapResult(await handleSectionGet(db, slug));
	} catch (error) {
		return handleError(error, "Failed to fetch section", "SECTION_GET_ERROR");
	}
};
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const db = emdash.db;
	const { slug } = params;
	const denied = requirePerm(user, "sections:manage");
	if (denied) return denied;
	if (!slug) return apiError("VALIDATION_ERROR", "slug is required", 400);
	try {
		const body = await parseBody(request, updateSectionBody);
		if (isParseError(body)) return body;
		return unwrapResult(await handleSectionUpdate(db, slug, body));
	} catch (error) {
		return handleError(error, "Failed to update section", "SECTION_UPDATE_ERROR");
	}
};
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const db = emdash.db;
	const { slug } = params;
	const denied = requirePerm(user, "sections:manage");
	if (denied) return denied;
	if (!slug) return apiError("VALIDATION_ERROR", "slug is required", 400);
	try {
		return unwrapResult(await handleSectionDelete(db, slug));
	} catch (error) {
		return handleError(error, "Failed to delete section", "SECTION_DELETE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/sections/_slug_@_@mjs
var page = () => _slug__exports;
//#endregion
export { page };
