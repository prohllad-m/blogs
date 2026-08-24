import "./request-cache-BSUptuJR_CCaufTtE.mjs";
import { a as getDb } from "./loader-Be3ouI5L_CXV56CH4.mjs";
//#region node_modules/emdash/dist/widgets-DGv1Z04V.mjs
/**
* Get all widget areas with their widgets
*/
async function getWidgetAreas() {
	const db = await getDb();
	const areaRows = await db.selectFrom("_emdash_widget_areas").selectAll().execute();
	const widgetRows = await db.selectFrom("_emdash_widgets").selectAll().$castTo().orderBy("sort_order", "asc").execute();
	const widgetsByArea = /* @__PURE__ */ new Map();
	for (const row of widgetRows) {
		if (!widgetsByArea.has(row.area_id)) widgetsByArea.set(row.area_id, []);
		widgetsByArea.get(row.area_id).push(rowToWidget(row));
	}
	return areaRows.map((areaRow) => ({
		id: areaRow.id,
		name: areaRow.name,
		label: areaRow.label,
		description: areaRow.description ?? void 0,
		widgets: widgetsByArea.get(areaRow.id) || []
	}));
}
/**
* Convert a widget row to the API type
*/
function rowToWidget(row) {
	const widget = {
		id: row.id,
		type: row.type,
		title: row.title ?? void 0
	};
	if (row.type === "content" && row.content) try {
		widget.content = JSON.parse(row.content);
	} catch {}
	if (row.type === "menu" && row.menu_name) widget.menuName = row.menu_name;
	if (row.type === "component" && row.component_id) {
		widget.componentId = row.component_id;
		if (row.component_props) try {
			widget.componentProps = JSON.parse(row.component_props);
		} catch {}
	}
	return widget;
}
//#endregion
export { rowToWidget as n, getWidgetAreas as t };
