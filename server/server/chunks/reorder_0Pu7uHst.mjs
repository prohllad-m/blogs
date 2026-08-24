import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { ut as reorderWidgetsBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/reorder.mjs
var reorder_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const db = emdash.db;
	const { name } = params;
	const denied = requirePerm(user, "widgets:manage");
	if (denied) return denied;
	if (!name) return apiError("VALIDATION_ERROR", "name is required", 400);
	try {
		const area = await db.selectFrom("_emdash_widget_areas").select("id").where("name", "=", name).executeTakeFirst();
		if (!area) return apiError("NOT_FOUND", `Widget area "${name}" not found`, 404);
		const body = await parseBody(request, reorderWidgetsBody);
		if (isParseError(body)) return body;
		const existingWidgets = await db.selectFrom("_emdash_widgets").select("id").where("area_id", "=", area.id).execute();
		const existingIds = new Set(existingWidgets.map((w) => w.id));
		for (const id of body.widgetIds) if (!existingIds.has(id)) return apiError("VALIDATION_ERROR", `Widget "${id}" not found in area "${name}"`, 400);
		await Promise.all(body.widgetIds.map((id, index) => db.updateTable("_emdash_widgets").set({ sort_order: index }).where("id", "=", id).execute()));
		return apiSuccess({ success: true });
	} catch (error) {
		return handleError(error, "Failed to reorder widgets", "WIDGET_REORDER_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/reorder@_@mjs
var page = () => reorder_exports;
//#endregion
export { page };
