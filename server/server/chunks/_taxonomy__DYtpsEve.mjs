import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as ContentRepository } from "./content-Ci04z2z-_B6s9HI1r.mjs";
import { t as TaxonomyRepository } from "./taxonomy-DfVooU4W_BOv42Utk.mjs";
import "./request-cache-BSUptuJR_CCaufTtE.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./resolve-Cd9dzclN_C_W0skoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { H as contentTermsBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { d as invalidateTermCache } from "./taxonomies-DjSKBZpq_OMwze2dv.mjs";
import { i as requireDb, n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { n as requireOwnerPerm, r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_.mjs
var _taxonomy__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/**
* Get terms assigned to an entry
*/
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { collection, id, taxonomy } = params;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "content:read");
	if (denied) return denied;
	if (!collection || !id || !taxonomy) return apiError("VALIDATION_ERROR", "Collection, id, and taxonomy required", 400);
	try {
		const entry = await new ContentRepository(emdash.db).findByIdOrSlug(collection, id);
		if (!entry) return apiError("NOT_FOUND", "Content not found", 404);
		const locale = entry.locale ?? void 0;
		return apiSuccess({ terms: (await new TaxonomyRepository(emdash.db).getTermsForEntry(collection, entry.id, taxonomy, locale)).map((t) => ({
			id: t.id,
			name: t.name,
			slug: t.slug,
			label: t.label,
			parentId: t.parentId
		})) });
	} catch (error) {
		return handleError(error, "Failed to get entry terms", "TERMS_GET_ERROR");
	}
};
/**
* Set terms for an entry (replaces existing)
*/
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { collection, id, taxonomy } = params;
	if (!collection || !id || !taxonomy) return apiError("VALIDATION_ERROR", "Collection, id, and taxonomy required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "content:edit_own");
	if (denied) return denied;
	if (!emdash.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const existing = await emdash.handleContentGet(collection, id);
	if (!existing.success) return apiError(existing.error?.code ?? "NOT_FOUND", existing.error?.message ?? "Content not found", existing.error?.code === "NOT_FOUND" ? 404 : 500);
	const existingData = existing.data && typeof existing.data === "object" ? existing.data : void 0;
	const existingItem = existingData?.item && typeof existingData.item === "object" ? existingData.item : existingData;
	const editDenied = requireOwnerPerm(user, typeof existingItem?.authorId === "string" ? existingItem.authorId : "", "content:edit_own", "content:edit_any");
	if (editDenied) return editDenied;
	const canonicalId = typeof existingItem?.id === "string" ? existingItem.id : id;
	const entryLocale = typeof existingItem?.locale === "string" ? existingItem.locale : void 0;
	try {
		const body = await parseBody(request, contentTermsBody);
		if (isParseError(body)) return body;
		const { termIds } = body;
		const repo = new TaxonomyRepository(emdash.db);
		for (const termId of termIds) {
			const term = await repo.findById(termId);
			if (!term) return apiError("NOT_FOUND", `Term ID '${termId}' not found`, 404);
			if (term.name !== taxonomy) return apiError("VALIDATION_ERROR", `Term ID '${termId}' does not belong to taxonomy '${taxonomy}'`, 400);
		}
		await repo.setTermsForEntry(collection, canonicalId, taxonomy, termIds);
		invalidateTermCache();
		return apiSuccess({ terms: (await repo.getTermsForEntry(collection, canonicalId, taxonomy, entryLocale)).map((t) => ({
			id: t.id,
			name: t.name,
			slug: t.slug,
			label: t.label,
			parentId: t.parentId
		})) });
	} catch (error) {
		return handleError(error, "Failed to set entry terms", "TERMS_SET_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_@_@mjs
var page = () => _taxonomy__exports;
//#endregion
export { page };
