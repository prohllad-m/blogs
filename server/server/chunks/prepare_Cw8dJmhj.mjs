import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { C as wpPrepareBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { n as FIELD_TYPES } from "./types-o7xo7VgH_7RqDl1dC.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { i as singularize, n as capitalize, r as sanitizeSlug } from "./analyze_C6Tpc8Nk.mjs";
//#region node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare.mjs
var prepare_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/** Validate that a string is a known FieldType, returning undefined if not */
function asFieldType(value) {
	return FIELD_TYPES.includes(value) ? value : void 0;
}
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const denied = requirePerm(user, "import:execute");
	if (denied) return denied;
	try {
		const body = await parseBody(request, wpPrepareBody);
		if (isParseError(body)) return body;
		const result = await prepareImport(emdash.db, body);
		if (result.collectionsCreated.length > 0) emdash.invalidateUrlPatternCache();
		return apiSuccess(result, result.success ? 200 : 400);
	} catch (error) {
		return handleError(error, "Failed to prepare import", "WXR_PREPARE_ERROR");
	}
};
async function prepareImport(db, request) {
	const { SchemaRegistry } = await import("./registry-FV15nLge_CLV8XNUm.mjs").then((n) => n.r);
	const registry = new SchemaRegistry(db);
	const result = {
		success: true,
		collectionsCreated: [],
		fieldsCreated: [],
		errors: []
	};
	for (const postType of request.postTypes) {
		const collectionSlug = sanitizeSlug(postType.collection);
		try {
			let collection = await registry.getCollection(collectionSlug);
			if (!collection) {
				const label = capitalize(collectionSlug);
				const labelSingular = capitalize(singularize(collectionSlug));
				const isSearchable = [
					"posts",
					"pages",
					"post",
					"page"
				].includes(collectionSlug);
				const supports = ["revisions", "drafts"];
				if (isSearchable) supports.push("search");
				const urlPattern = collectionSlug === "pages" ? "/{slug}" : collectionSlug === "posts" ? "/blog/{slug}" : void 0;
				collection = await registry.createCollection({
					slug: collectionSlug,
					label,
					labelSingular,
					description: `Imported from WordPress post type: ${postType.name}`,
					supports,
					urlPattern
				});
				result.collectionsCreated.push(collectionSlug);
			}
			const existingFields = await registry.listFields(collection.id);
			const existingFieldSlugs = new Set(existingFields.map((f) => f.slug));
			for (const field of postType.fields) {
				if (existingFieldSlugs.has(field.slug)) continue;
				const fieldType = asFieldType(field.type);
				if (!fieldType) {
					result.errors.push({
						collection: collectionSlug,
						error: `Unknown field type "${field.type}" for field "${field.slug}"`
					});
					continue;
				}
				await registry.createField(collectionSlug, {
					slug: field.slug,
					label: field.label,
					type: fieldType,
					required: field.required,
					unique: false,
					searchable: field.searchable ?? false,
					sortOrder: existingFields.length + result.fieldsCreated.length
				});
				result.fieldsCreated.push({
					collection: collectionSlug,
					field: field.slug
				});
			}
			if ([
				"posts",
				"pages",
				"post",
				"page"
			].includes(collectionSlug)) {
				const { FTSManager } = await import("./fts-manager-DzqIBrrW_DYoq1tH7.mjs").then((n) => n.n);
				const ftsManager = new FTSManager(db);
				if ((await ftsManager.getSearchableFields(collectionSlug)).length > 0) try {
					await ftsManager.enableSearch(collectionSlug);
				} catch {}
			}
		} catch (error) {
			console.error(`Prepare error for collection "${collectionSlug}":`, error);
			result.success = false;
			result.errors.push({
				collection: collectionSlug,
				error: "Failed to prepare collection"
			});
		}
	}
	return result;
}
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare@_@mjs
var page = () => prepare_exports;
//#endregion
export { page };
