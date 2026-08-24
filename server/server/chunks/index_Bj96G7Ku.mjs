import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { Q as createSectionBody, gt as sectionsListQuery } from "./relations-5_avdrN__CvbT7cha.mjs";
import { i as handleSectionList, t as handleSectionCreate } from "./sections-CwW4s1al_qO0B4soT.mjs";
import { a as unwrapResult, i as requireDb, r as handleError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/sections/index.mjs
var sections_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const db = emdash.db;
	const denied = requirePerm(user, "sections:read");
	if (denied) return denied;
	try {
		const query = parseQuery(url, sectionsListQuery);
		if (isParseError(query)) return query;
		return unwrapResult(await handleSectionList(db, query));
	} catch (error) {
		return handleError(error, "Failed to fetch sections", "SECTION_LIST_ERROR");
	}
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const db = emdash.db;
	const denied = requirePerm(user, "sections:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, createSectionBody);
		if (isParseError(body)) return body;
		return unwrapResult(await handleSectionCreate(db, body), 201);
	} catch (error) {
		return handleError(error, "Failed to create section", "SECTION_CREATE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/sections/index@_@mjs
var page = () => sections_exports;
//#endregion
export { page };
