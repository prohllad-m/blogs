import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as ErrorCode } from "./errors-DtEXIQQV_BEW37qyr.mjs";
import { a as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { a as getBackupSettings, s as listBackupArchives, u as updateBackupSettings } from "./backup-S8kFWtwD_NI2TJnm3.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { z } from "zod";
//#region node_modules/emdash/dist/astro/routes/api/settings/backups/index.mjs
var backups_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "backups:manage");
	if (denied) return denied;
	try {
		const settings = await getBackupSettings(emdash.db);
		let archives = [];
		const storageAvailable = !!emdash.storage;
		if (emdash.storage) {
			const listed = await listBackupArchives(emdash.storage);
			if (listed.success) archives = listed.data;
		}
		return apiSuccess({
			settings,
			archives,
			storageAvailable
		});
	} catch (error) {
		return handleError(error, "Failed to load backup settings", ErrorCode.BACKUP_SETTINGS_READ_ERROR);
	}
};
var settingsBody = z.object({
	enabled: z.boolean(),
	retention: z.number().int().min(1).max(30)
});
var PUT = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "backups:manage");
	if (denied) return denied;
	const body = await parseBody(request, settingsBody);
	if (isParseError(body)) return body;
	return unwrapResult(await updateBackupSettings(emdash.db, body));
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/index@_@mjs
var page = () => backups_exports;
//#endregion
export { page };
