import { r as __exportAll } from "./runner-DfnZ5eUr_D0TboABR.mjs";
import { i as setSiteSettings, n as getSiteSettingsWithDb } from "./settings-CpA4lQFt_C9lm7kb6.mjs";
//#region node_modules/emdash/dist/settings-C4s8hFQm.mjs
var settings_exports = /* @__PURE__ */ __exportAll({
	handleSettingsGet: () => handleSettingsGet,
	handleSettingsUpdate: () => handleSettingsUpdate
});
/**
* Get all site settings
*/
async function handleSettingsGet(db, storage) {
	try {
		return {
			success: true,
			data: await getSiteSettingsWithDb(db, storage)
		};
	} catch {
		return {
			success: false,
			error: {
				code: "SETTINGS_READ_ERROR",
				message: "Failed to get settings"
			}
		};
	}
}
/**
* Update site settings
*/
async function handleSettingsUpdate(db, storage, input) {
	try {
		await setSiteSettings(input, db);
		return {
			success: true,
			data: await getSiteSettingsWithDb(db, storage)
		};
	} catch {
		return {
			success: false,
			error: {
				code: "SETTINGS_UPDATE_ERROR",
				message: "Failed to update settings"
			}
		};
	}
}
//#endregion
export { handleSettingsUpdate as n, settings_exports as r, handleSettingsGet as t };
