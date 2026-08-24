import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./request-cache-BSUptuJR_CCaufTtE.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { tt as createWidgetAreaBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { n as rowToWidget } from "./widgets-DGv1Z04V_BE6MZJhO.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { ulid } from "ulidx";
//#region node_modules/emdash/dist/astro/routes/api/widget-areas/index.mjs
var widget_areas_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	const db = emdash.db;
	const denied = requirePerm(user, "widgets:read");
	if (denied) return denied;
	try {
		const areas = await db.selectFrom("_emdash_widget_areas").selectAll().orderBy("name", "asc").execute();
		return apiSuccess({ items: await Promise.all(areas.map(async (area) => {
			const widgets = await db.selectFrom("_emdash_widgets").selectAll().$castTo().where("area_id", "=", area.id).orderBy("sort_order", "asc").execute();
			return {
				...area,
				widgets: widgets.map((row) => rowToWidget(row)),
				widgetCount: widgets.length
			};
		})) });
	} catch (error) {
		return handleError(error, "Failed to fetch widget areas", "WIDGET_AREA_LIST_ERROR");
	}
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const db = emdash.db;
	const denied = requirePerm(user, "widgets:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, createWidgetAreaBody);
		if (isParseError(body)) return body;
		if (await db.selectFrom("_emdash_widget_areas").select("id").where("name", "=", body.name).executeTakeFirst()) return apiError("CONFLICT", `Widget area with name "${body.name}" already exists`, 409);
		const id = ulid();
		await db.insertInto("_emdash_widget_areas").values({
			id,
			name: body.name,
			label: body.label,
			description: body.description ?? null
		}).execute();
		return apiSuccess(await db.selectFrom("_emdash_widget_areas").selectAll().where("id", "=", id).executeTakeFirstOrThrow(), 201);
	} catch (error) {
		return handleError(error, "Failed to create widget area", "WIDGET_AREA_CREATE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/index@_@mjs
var page = () => widget_areas_exports;
//#endregion
export { page };
