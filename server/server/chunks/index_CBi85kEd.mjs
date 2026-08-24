import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { a as unwrapResult, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { a as getBackupSettings, l as runBackupToStorage } from "./backup-S8kFWtwD_NI2TJnm3.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index.mjs
var archives_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "backups:manage");
	if (denied) return denied;
	if (!emdash.storage) return apiError("STORAGE_NOT_CONFIGURED", "No storage backend is configured", 503);
	const settings = await getBackupSettings(emdash.db);
	return unwrapResult(await runBackupToStorage(emdash.db, emdash.storage, settings.retention), 201);
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index@_@mjs
var page = () => archives_exports;
//#endregion
export { page };
