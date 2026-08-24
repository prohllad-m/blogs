import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./request-cache-BSUptuJR_CCaufTtE.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { Tt as updateWidgetBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { n as rowToWidget } from "./widgets-DGv1Z04V_BE6MZJhO.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	PUT: () => PUT,
	prerender: () => false
});
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const db = emdash.db;
	const { name, id } = params;
	const denied = requirePerm(user, "widgets:manage");
	if (denied) return denied;
	if (!name || !id) return apiError("VALIDATION_ERROR", "name and id are required", 400);
	try {
		const area = await db.selectFrom("_emdash_widget_areas").select("id").where("name", "=", name).executeTakeFirst();
		if (!area) return apiError("NOT_FOUND", `Widget area "${name}" not found`, 404);
		if (!await db.selectFrom("_emdash_widgets").select("id").where("id", "=", id).where("area_id", "=", area.id).executeTakeFirst()) return apiError("NOT_FOUND", `Widget "${id}" not found in area "${name}"`, 404);
		const body = await parseBody(request, updateWidgetBody);
		if (isParseError(body)) return body;
		const updates = {};
		if (body.title !== void 0) updates.title = body.title || null;
		if (body.type !== void 0) updates.type = body.type;
		if (body.content !== void 0) updates.content = body.content ? JSON.stringify(body.content) : null;
		if (body.menuName !== void 0) updates.menu_name = body.menuName || null;
		if (body.componentId !== void 0) updates.component_id = body.componentId || null;
		if (body.componentProps !== void 0) updates.component_props = body.componentProps ? JSON.stringify(body.componentProps) : null;
		if (Object.keys(updates).length === 0) return apiError("VALIDATION_ERROR", "No fields to update", 400);
		await db.updateTable("_emdash_widgets").set(updates).where("id", "=", id).execute();
		return apiSuccess(rowToWidget(await db.selectFrom("_emdash_widgets").selectAll().$castTo().where("id", "=", id).executeTakeFirstOrThrow()));
	} catch (error) {
		return handleError(error, "Failed to update widget", "WIDGET_UPDATE_ERROR");
	}
};
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const db = emdash.db;
	const { name, id } = params;
	const denied = requirePerm(user, "widgets:manage");
	if (denied) return denied;
	if (!name || !id) return apiError("VALIDATION_ERROR", "name and id are required", 400);
	try {
		const area = await db.selectFrom("_emdash_widget_areas").select("id").where("name", "=", name).executeTakeFirst();
		if (!area) return apiError("NOT_FOUND", `Widget area "${name}" not found`, 404);
		if (!await db.selectFrom("_emdash_widgets").select("id").where("id", "=", id).where("area_id", "=", area.id).executeTakeFirst()) return apiError("NOT_FOUND", `Widget "${id}" not found in area "${name}"`, 404);
		await db.deleteFrom("_emdash_widgets").where("id", "=", id).execute();
		return apiSuccess({ deleted: true });
	} catch (error) {
		return handleError(error, "Failed to delete widget", "WIDGET_DELETE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_@_@mjs
var page = () => _id__exports;
//#endregion
export { page };
