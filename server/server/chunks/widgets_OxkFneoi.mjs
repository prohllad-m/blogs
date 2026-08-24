import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./request-cache-BSUptuJR_CCaufTtE.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { nt as createWidgetBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { n as rowToWidget } from "./widgets-DGv1Z04V_BE6MZJhO.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { ulid } from "ulidx";
//#region node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets.mjs
var widgets_exports = /* @__PURE__ */ __exportAll({
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
		const body = await parseBody(request, createWidgetBody);
		if (isParseError(body)) return body;
		const sortOrder = ((await db.selectFrom("_emdash_widgets").select(({ fn }) => fn.max("sort_order").as("maxOrder")).where("area_id", "=", area.id).executeTakeFirst())?.maxOrder ?? -1) + 1;
		const id = ulid();
		await db.insertInto("_emdash_widgets").values({
			id,
			area_id: area.id,
			sort_order: sortOrder,
			type: body.type,
			title: body.title ?? null,
			content: body.content ? JSON.stringify(body.content) : null,
			menu_name: body.menuName ?? null,
			component_id: body.componentId ?? null,
			component_props: body.componentProps ? JSON.stringify(body.componentProps) : null
		}).execute();
		return apiSuccess(rowToWidget(await db.selectFrom("_emdash_widgets").selectAll().$castTo().where("id", "=", id).executeTakeFirstOrThrow()), 201);
	} catch (error) {
		return handleError(error, "Failed to create widget", "WIDGET_CREATE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets@_@mjs
var page = () => widgets_exports;
//#endregion
export { page };
