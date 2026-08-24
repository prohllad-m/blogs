import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as ErrorCode } from "./errors-DtEXIQQV_BEW37qyr.mjs";
import { r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as generateBackupJson, n as archiveNameForDate } from "./backup-S8kFWtwD_NI2TJnm3.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/settings/backups/export.mjs
var export_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "backups:manage");
	if (denied) return denied;
	try {
		const json = await generateBackupJson(emdash.db);
		return new Response(json, {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Content-Disposition": `attachment; filename="${archiveNameForDate(/* @__PURE__ */ new Date())}"`,
				"Cache-Control": "private, no-store",
				"X-Content-Type-Options": "nosniff"
			}
		});
	} catch (error) {
		return handleError(error, "Failed to generate backup", ErrorCode.BACKUP_EXPORT_ERROR);
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/export@_@mjs
var page = () => export_exports;
//#endregion
export { page };
