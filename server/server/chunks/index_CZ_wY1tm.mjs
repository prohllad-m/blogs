import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as OptionsRepository } from "./options-BlmBHTvX_nqkCch6f.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/index.mjs
var exclusive_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:manage");
	if (denied) return denied;
	try {
		const pipeline = emdash.hooks;
		const exclusiveHookNames = pipeline.getRegisteredExclusiveHooks();
		const optionsRepo = new OptionsRepository(emdash.db);
		const hooks = [];
		for (const hookName of exclusiveHookNames) {
			const providers = pipeline.getExclusiveHookProviders(hookName);
			const selection = await optionsRepo.get(`emdash:exclusive_hook:${hookName}`);
			hooks.push({
				hookName,
				providers: providers.map((provider) => ({ pluginId: provider.pluginId })),
				selectedPluginId: selection
			});
		}
		return apiSuccess({ items: hooks });
	} catch (error) {
		return handleError(error, "Failed to list exclusive hooks", "EXCLUSIVE_HOOKS_LIST_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/index@_@mjs
var page = () => exclusive_exports;
//#endregion
export { page };
