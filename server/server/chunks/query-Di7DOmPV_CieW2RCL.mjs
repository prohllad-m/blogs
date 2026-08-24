import { o as getI18nConfig, p as isSqlite, s as isI18nEnabled, v as validateIdentifier, y as validatePluginIdentifier } from "./runner-DfnZ5eUr_D0TboABR.mjs";
import { o as invalidateCollectionCache } from "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import { i as encodeBase64, t as decodeBase64 } from "./base64-B-PsqheR_BCqhUefc.mjs";
import { n as InvalidCursorError, r as ScheduledNotDueError, t as EmDashValidationError } from "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as CommentRepository } from "./comment-DPT0WKyd_BkkyuYSh.mjs";
import { t as OptionsRepository } from "./options-BlmBHTvX_nqkCch6f.mjs";
import { t as chunks } from "./chunks-BxXyunY-_CO1ujP6w.mjs";
import { n as isMissingTableError, t as isMissingColumnError } from "./db-errors-CcWLaRiR_Cao0JsBD.mjs";
import { n as RevisionRepository, t as ContentRepository } from "./content-Ci04z2z-_B6s9HI1r.mjs";
import { t as MediaRepository } from "./media-BjhhENaJ_DtGEF5D8.mjs";
import { t as UserRepository } from "./user-Bh-L1qo6_BTeGs-hv.mjs";
import { t as TaxonomyRepository } from "./taxonomy-DfVooU4W_BOv42Utk.mjs";
import { t as withTransaction } from "./transaction-D0FOsb3X_CpcQMmNJ.mjs";
import { a as parseAllowedMimeTypes, r as matchesMimeAllowlist } from "./hash-DFFrkivP_B6GyA9Pb.mjs";
import { r as requestCached } from "./request-cache-BSUptuJR_CCaufTtE.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import { n as resolveAndValidateExternalUrl, t as SsrfError } from "./ssrf-CviKqWmq_6hEIMCxY.mjs";
import { a as reconcileManifestAccess, i as pluginManifestSchema, o as declaredAccessToCapabilities$1, r as normalizeManifestRoute, s as normalizeCapabilities } from "./manifest-schema-bCq54i7F_D0gLHu7z.mjs";
import { t as RedirectRepository } from "./redirect-CgLPYflR_CplqVHl6.mjs";
import { t as BylineRepository } from "./byline-XEjchwzZ_MSMp-1jc.mjs";
import { t as FTSManager } from "./fts-manager-DzqIBrrW_C8Ds5uQp.mjs";
import { d as invalidateTermCache } from "./taxonomies-DjSKBZpq_OMwze2dv.mjs";
import { r as invalidateRedirectCache } from "./cache-CGCd6AVM_NiDm1kDt.mjs";
import { t as ErrorCode } from "./errors-DtEXIQQV_BEW37qyr.mjs";
import { n as SchemaRegistry, t as SchemaError } from "./registry-FV15nLge_C-lxn3gO.mjs";
import { t as PluginStateRepository } from "./state-xxv6ZTMv_D5f1Efgc.mjs";
import { sql } from "kysely";
import { createGzipDecoder, unpackTar } from "modern-tar";
import { ClientResponseError, ClientValidationError } from "@atcute/client";
import { checkEnvCompatibility, findSkippedEnvConstraints } from "@emdash-cms/registry-client/env";
//#region node_modules/emdash/dist/seo-2cmFHZns.mjs
/** Default SEO values for content without an explicit SEO row */
var SEO_DEFAULTS$1 = {
	title: null,
	description: null,
	image: null,
	canonical: null,
	noIndex: false
};
/**
* Returns true if the input has at least one explicitly-set SEO field.
* Used to skip no-op upserts when callers pass `{ seo: {} }`.
*/
function hasAnyField(input) {
	return input.title !== void 0 || input.description !== void 0 || input.image !== void 0 || input.canonical !== void 0 || input.noIndex !== void 0;
}
/**
* Repository for SEO metadata stored in `_emdash_seo`.
*
* SEO data lives in a separate table keyed by (collection, content_id).
* Only collections with `has_seo = 1` should use this — callers are
* responsible for checking the flag before reading/writing.
*/
var SeoRepository = class {
	constructor(db) {
		this.db = db;
	}
	/**
	* Check whether a collection has SEO enabled (`has_seo = 1`).
	* Returns `false` if the collection does not exist.
	*/
	async isEnabled(collection) {
		return (await this.db.selectFrom("_emdash_collections").select("has_seo").where("slug", "=", collection).executeTakeFirst())?.has_seo === 1;
	}
	/**
	* Get SEO data for a content item. Returns null defaults if no row exists.
	*/
	async get(collection, contentId) {
		const row = await this.db.selectFrom("_emdash_seo").selectAll().where("collection", "=", collection).where("content_id", "=", contentId).executeTakeFirst();
		if (!row) return { ...SEO_DEFAULTS$1 };
		return {
			title: row.seo_title ?? null,
			description: row.seo_description ?? null,
			image: row.seo_image ?? null,
			canonical: row.seo_canonical ?? null,
			noIndex: row.seo_no_index === 1
		};
	}
	/**
	* Get SEO data for multiple content items.
	* Returns a Map keyed by content_id. Items without SEO rows get defaults.
	*
	* Chunks the `content_id IN (…)` clause so the total bound-parameter count
	* per statement (ids + the `collection = ?` filter) stays within Cloudflare
	* D1's 100-variable limit regardless of how many content items are passed.
	*/
	async getMany(collection, contentIds) {
		const result = /* @__PURE__ */ new Map();
		if (contentIds.length === 0) return result;
		for (const id of contentIds) result.set(id, { ...SEO_DEFAULTS$1 });
		const uniqueContentIds = [...new Set(contentIds)];
		for (const chunk of chunks(uniqueContentIds, 50)) {
			const rows = await this.db.selectFrom("_emdash_seo").selectAll().where("collection", "=", collection).where("content_id", "in", chunk).execute();
			for (const row of rows) result.set(row.content_id, {
				title: row.seo_title ?? null,
				description: row.seo_description ?? null,
				image: row.seo_image ?? null,
				canonical: row.seo_canonical ?? null,
				noIndex: row.seo_no_index === 1
			});
		}
		return result;
	}
	/**
	* Upsert SEO data for a content item using INSERT ON CONFLICT DO UPDATE
	* for atomicity. Skips no-op writes when input has no fields set.
	*/
	async upsert(collection, contentId, input) {
		if (!hasAnyField(input)) return this.get(collection, contentId);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await sql`
			INSERT INTO _emdash_seo (
				collection, content_id,
				seo_title, seo_description, seo_image, seo_canonical, seo_no_index,
				created_at, updated_at
			) VALUES (
				${collection}, ${contentId},
				${input.title ?? null}, ${input.description ?? null},
				${input.image ?? null}, ${input.canonical ?? null},
				${input.noIndex ? 1 : 0},
				${now}, ${now}
			)
			ON CONFLICT (collection, content_id) DO UPDATE SET
				seo_title = ${input.title !== void 0 ? sql`${input.title}` : sql`_emdash_seo.seo_title`},
				seo_description = ${input.description !== void 0 ? sql`${input.description}` : sql`_emdash_seo.seo_description`},
				seo_image = ${input.image !== void 0 ? sql`${input.image}` : sql`_emdash_seo.seo_image`},
				seo_canonical = ${input.canonical !== void 0 ? sql`${input.canonical}` : sql`_emdash_seo.seo_canonical`},
				seo_no_index = ${input.noIndex !== void 0 ? sql`${input.noIndex ? 1 : 0}` : sql`_emdash_seo.seo_no_index`},
				updated_at = ${now}
		`.execute(this.db);
		invalidateCollectionCache(collection);
		return this.get(collection, contentId);
	}
	/**
	* Delete SEO data for a content item.
	*/
	async delete(collection, contentId) {
		await this.db.deleteFrom("_emdash_seo").where("collection", "=", collection).where("content_id", "=", contentId).execute();
		invalidateCollectionCache(collection);
	}
	/**
	* Copy SEO data from one content item to another.
	* Used by duplicate. Clears canonical (it pointed to the original).
	*/
	async copyForDuplicate(collection, sourceId, targetId) {
		const source = await this.get(collection, sourceId);
		if (source.title !== null || source.description !== null || source.image !== null || source.noIndex) await this.upsert(collection, targetId, {
			title: source.title,
			description: source.description,
			image: source.image,
			canonical: null,
			noIndex: source.noIndex
		});
	}
};
//#endregion
//#region node_modules/emdash/dist/types-BD40g7zz.mjs
/**
* Storage error with additional context
*/
var EmDashStorageError = class extends Error {
	constructor(message, code, cause) {
		super(message);
		this.code = code;
		this.cause = cause;
		this.name = "EmDashStorageError";
	}
};
//#endregion
//#region node_modules/emdash/dist/api-b8WIiGU4.mjs
function encodeRev(item) {
	return encodeBase64(`${item.version}:${item.updatedAt}`);
}
function decodeRev(rev) {
	try {
		const decoded = decodeBase64(rev);
		const colonIdx = decoded.indexOf(":");
		if (colonIdx === -1) return null;
		const version = parseInt(decoded.slice(0, colonIdx), 10);
		const updatedAt = decoded.slice(colonIdx + 1);
		if (isNaN(version) || !updatedAt) return null;
		return {
			version,
			updatedAt
		};
	} catch {
		return null;
	}
}
function validateRev(rev, item) {
	if (!rev) return { valid: true };
	const decoded = decodeRev(rev);
	if (!decoded) return {
		valid: false,
		message: "Malformed _rev token"
	};
	if (decoded.version !== item.version || decoded.updatedAt !== item.updatedAt) return {
		valid: false,
		message: "Content has been modified since last read (version conflict)"
	};
	return { valid: true };
}
function asMediaRef(value) {
	if (value === null || value === void 0) return null;
	if (typeof value !== "object" || Array.isArray(value)) return null;
	return value;
}
function fail(message) {
	return {
		success: false,
		error: {
			code: "INVALID_MIME_FOR_FIELD",
			message
		}
	};
}
async function loadMediaFieldsForCollection(db, collectionSlug) {
	const rows = await db.selectFrom("_emdash_fields").innerJoin("_emdash_collections", "_emdash_collections.id", "_emdash_fields.collection_id").select([
		"_emdash_fields.slug",
		"_emdash_fields.type",
		"_emdash_fields.validation"
	]).where("_emdash_collections.slug", "=", collectionSlug).where("_emdash_fields.type", "in", ["file", "image"]).execute();
	const out = [];
	for (const row of rows) {
		const list = parseAllowedMimeTypes(row.validation);
		if (!list) continue;
		out.push({
			slug: row.slug,
			type: row.type,
			allowedMimeTypes: list
		});
	}
	return out;
}
async function validateMediaFields(db, collectionSlug, data) {
	const fields = await requestCached(`mediaFields:${collectionSlug}`, () => loadMediaFieldsForCollection(db, collectionSlug));
	if (fields.length === 0) return {
		success: true,
		data: true
	};
	const localIds = /* @__PURE__ */ new Set();
	for (const field of fields) {
		const ref = asMediaRef(data[field.slug]);
		if (!ref) continue;
		if ((typeof ref.provider === "string" ? ref.provider : "local") === "local" && typeof ref.id === "string") localIds.add(ref.id);
	}
	const idList = [...localIds];
	const mimeById = /* @__PURE__ */ new Map();
	if (idList.length > 0) for (const batch of chunks(idList, 50)) {
		const rows = await db.selectFrom("media").select(["id", "mime_type"]).where("id", "in", batch).execute();
		for (const r of rows) mimeById.set(r.id, r.mime_type);
	}
	for (const field of fields) {
		const value = data[field.slug];
		if (value === null || value === void 0) continue;
		const ref = asMediaRef(value);
		if (!ref) continue;
		const provider = typeof ref.provider === "string" ? ref.provider : "local";
		let mime;
		if (provider === "local") {
			if (typeof ref.id !== "string") return fail(`Field '${field.slug}' references media with an invalid id`);
			mime = mimeById.get(ref.id);
			if (!mime) return fail(`Field '${field.slug}' references media with unknown MIME type`);
		} else {
			if (typeof ref.mimeType !== "string") return fail(`Field '${field.slug}' requires a mimeType declaration for non-local media`);
			mime = ref.mimeType;
		}
		if (!matchesMimeAllowlist(mime, field.allowedMimeTypes)) return fail(`Field '${field.slug}' does not accept ${mime}`);
	}
	return {
		success: true,
		data: true
	};
}
function hasApiError(error) {
	if (!(error instanceof Error) || !("apiError" in error)) return false;
	const { apiError } = error;
	return typeof apiError === "object" && apiError !== null && "code" in apiError && typeof apiError.code === "string";
}
function getSlugSource(data) {
	if (typeof data.title === "string" && data.title.length > 0) return data.title;
	if (typeof data.name === "string" && data.name.length > 0) return data.name;
	return null;
}
var SEO_DEFAULTS = {
	title: null,
	description: null,
	image: null,
	canonical: null,
	noIndex: false
};
async function collectionHasSeo(db, collection) {
	return (await db.selectFrom("_emdash_collections").select("has_seo").where("slug", "=", collection).executeTakeFirst())?.has_seo === 1;
}
async function hydrateSeo(db, collection, item, hasSeo) {
	if (!hasSeo) return;
	item.seo = await new SeoRepository(db).get(collection, item.id);
}
async function hydrateSeoMany(db, collection, items, hasSeo) {
	if (!hasSeo || items.length === 0) return;
	const seoMap = await new SeoRepository(db).getMany(collection, items.map((i) => i.id));
	for (const item of items) item.seo = seoMap.get(item.id) ?? { ...SEO_DEFAULTS };
}
async function hydrateBylines(db, collection, item) {
	const bylineRepo = new BylineRepository(db);
	const localeOpt = item.locale ? { locale: item.locale } : void 0;
	const bylines = await bylineRepo.getContentBylines(collection, item.id, localeOpt);
	if (bylines.length > 0) {
		item.bylines = bylines.map((c) => ({
			...c,
			source: "explicit"
		}));
		item.byline = bylines[0]?.byline ?? null;
		return;
	}
	if (item.primaryBylineId) {
		item.bylines = [];
		item.byline = null;
		return;
	}
	if (item.authorId) {
		const fallback = await bylineRepo.findByUserId(item.authorId, localeOpt);
		if (fallback) {
			item.bylines = [{
				byline: fallback,
				sortOrder: 0,
				roleLabel: null,
				source: "inferred"
			}];
			item.byline = fallback;
			return;
		}
	}
	item.bylines = [];
	item.byline = null;
}
async function hydrateBylinesMany(db, collection, items) {
	if (items.length === 0) return;
	const bylineRepo = new BylineRepository(db);
	const localeBuckets = /* @__PURE__ */ new Map();
	for (const item of items) {
		const key = item.locale ?? null;
		const bucket = localeBuckets.get(key);
		if (bucket) bucket.push(item);
		else localeBuckets.set(key, [item]);
	}
	const bylinesByItem = /* @__PURE__ */ new Map();
	const itemsNeedingAuthorCheck = [];
	for (const [locale, bucket] of localeBuckets) {
		const localeOpt = locale ? { locale } : void 0;
		const ids = bucket.map((i) => i.id);
		const credits = await bylineRepo.getContentBylinesMany(collection, ids, localeOpt);
		for (const [id, list] of credits) bylinesByItem.set(id, list);
		for (const item of bucket) {
			if (credits.has(item.id) && credits.get(item.id).length > 0) continue;
			if (item.authorId) itemsNeedingAuthorCheck.push(item);
		}
	}
	const fallbackByItem = /* @__PURE__ */ new Map();
	if (itemsNeedingAuthorCheck.length > 0) {
		const authorBuckets = /* @__PURE__ */ new Map();
		for (const item of itemsNeedingAuthorCheck) {
			if (item.primaryBylineId) continue;
			const key = item.locale ?? null;
			const bucket = authorBuckets.get(key);
			if (bucket) bucket.push(item);
			else authorBuckets.set(key, [item]);
		}
		for (const [locale, bucket] of authorBuckets) {
			const localeOpt = locale ? { locale } : void 0;
			const authorIds = bucket.map((i) => i.authorId).filter((id) => id !== null);
			const uniqueAuthorIds = [...new Set(authorIds)];
			if (uniqueAuthorIds.length === 0) continue;
			const authorMap = await bylineRepo.findByUserIds(uniqueAuthorIds, localeOpt);
			for (const item of bucket) {
				if (!item.authorId) continue;
				const f = authorMap.get(item.authorId);
				if (f) fallbackByItem.set(item.id, f);
			}
		}
	}
	for (const item of items) {
		const explicit = bylinesByItem.get(item.id);
		if (explicit && explicit.length > 0) {
			item.bylines = explicit.map((c) => ({
				...c,
				source: "explicit"
			}));
			item.byline = explicit[0]?.byline ?? null;
			continue;
		}
		const fallback = fallbackByItem.get(item.id);
		if (fallback) {
			item.bylines = [{
				byline: fallback,
				sortOrder: 0,
				roleLabel: null,
				source: "inferred"
			}];
			item.byline = fallback;
			continue;
		}
		item.bylines = [];
		item.byline = null;
	}
}
async function resolveId(repo, collection, identifier, locale) {
	return (await repo.findByIdOrSlug(collection, identifier, locale))?.id ?? null;
}
async function resolveIdIncludingTrashed(repo, collection, identifier, locale) {
	return (await repo.findByIdOrSlugIncludingTrashed(collection, identifier, locale))?.id ?? null;
}
async function resolveSearchColumns(db, collection) {
	const columns = ["slug"];
	const row = await db.selectFrom("_emdash_collections").select("id").where("slug", "=", collection).executeTakeFirst();
	if (!row) return columns;
	const fields = await db.selectFrom("_emdash_fields").select("slug").where("collection_id", "=", row.id).execute();
	const fieldSlugs = new Set(fields.map((f) => f.slug));
	for (const candidate of ["title", "name"]) if (fieldSlugs.has(candidate)) columns.push(candidate);
	return columns;
}
async function canUseFtsForListFilter(db, collection, searchColumns) {
	if (!isSqlite(db)) return false;
	const ftsManager = new FTSManager(db);
	if (!(await ftsManager.getSearchConfig(collection))?.enabled) return false;
	const searchable = new Set(await ftsManager.getSearchableFields(collection));
	if (!searchColumns.every((col) => col === "slug" || searchable.has(col))) return false;
	return ftsManager.ftsTableExists(collection);
}
async function createSlugChangeRedirect(db, collection, oldSlug, newSlug, contentId) {
	const collectionRow = await db.selectFrom("_emdash_collections").select("url_pattern").where("slug", "=", collection).executeTakeFirst();
	await new RedirectRepository(db).createAutoRedirect(collection, oldSlug, newSlug, contentId, collectionRow?.url_pattern ?? null);
	invalidateRedirectCache();
}
var DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;
function normalizeDateBound(value, edge) {
	if (!value) return void 0;
	if (!DATE_ONLY_RE.test(value)) return value;
	return edge === "start" ? `${value}T00:00:00.000Z` : `${value}T23:59:59.999Z`;
}
async function handleContentList(db, collection, params) {
	try {
		const repo = new ContentRepository(db);
		const where = {};
		if (params.status) where.status = params.status;
		if (params.locale) where.locale = params.locale;
		if (params.authorId) where.authorId = params.authorId;
		if (params.dateField && (params.dateFrom || params.dateTo)) where.dateFilter = {
			field: params.dateField,
			from: normalizeDateBound(params.dateFrom, "start"),
			to: normalizeDateBound(params.dateTo, "end")
		};
		const q = params.q?.trim();
		if (q) {
			where.q = q;
			where.searchColumns = await resolveSearchColumns(db, collection);
			where.useFts = await canUseFtsForListFilter(db, collection, where.searchColumns);
		}
		const result = await repo.findMany(collection, {
			cursor: params.cursor,
			limit: params.limit || 50,
			where: Object.keys(where).length > 0 ? where : void 0,
			orderBy: params.orderBy ? {
				field: params.orderBy,
				direction: params.order || "desc"
			} : void 0
		});
		const hasSeo = await collectionHasSeo(db, collection);
		await hydrateSeoMany(db, collection, result.items, hasSeo);
		await hydrateBylinesMany(db, collection, result.items);
		return {
			success: true,
			data: {
				items: result.items,
				nextCursor: result.nextCursor,
				total: result.total
			}
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: "INVALID_CURSOR",
				message: error.message
			}
		};
		if (isMissingTableError(error)) return {
			success: false,
			error: {
				code: "COLLECTION_NOT_FOUND",
				message: `Collection '${collection}' not found`
			}
		};
		if (isMissingColumnError(error, "deleted_at")) return {
			success: false,
			error: {
				code: "COLLECTION_SCHEMA_MISMATCH",
				message: `Collection '${collection}' backing table is missing the 'deleted_at' column`
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		console.error("Content list error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_LIST_ERROR",
				message: "Failed to list content"
			}
		};
	}
}
async function handleContentAuthors(db, collection) {
	try {
		const authorIds = await new ContentRepository(db).findDistinctAuthorIds(collection);
		if (authorIds.length === 0) return {
			success: true,
			data: { items: [] }
		};
		return {
			success: true,
			data: { items: (await new UserRepository(db).findByIds(authorIds)).map((u) => ({
				id: u.id,
				name: u.name,
				email: u.email,
				avatarUrl: u.avatarUrl
			})).toSorted((a, b) => (a.name ?? a.email).localeCompare(b.name ?? b.email)) }
		};
	} catch (error) {
		if (isMissingTableError(error)) return {
			success: false,
			error: {
				code: "COLLECTION_NOT_FOUND",
				message: `Collection '${collection}' not found`
			}
		};
		console.error("Content authors error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_AUTHORS_ERROR",
				message: "Failed to list content authors"
			}
		};
	}
}
async function handleContentGet(db, collection, id, locale) {
	try {
		const item = await new ContentRepository(db).findByIdOrSlug(collection, id, locale);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		await hydrateBylines(db, collection, item);
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		console.error("Content get error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_GET_ERROR",
				message: "Failed to get content"
			}
		};
	}
}
async function handleContentGetIncludingTrashed(db, collection, id, locale) {
	try {
		const item = await new ContentRepository(db).findByIdOrSlugIncludingTrashed(collection, id, locale);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		await hydrateBylines(db, collection, item);
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		console.error("Content get error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_GET_ERROR",
				message: "Failed to get content"
			}
		};
	}
}
async function handleContentCreate(db, collection, body) {
	try {
		const hasSeo = await collectionHasSeo(db, collection);
		if (body.seo && !hasSeo) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: `Collection "${collection}" does not have SEO enabled. Remove the seo field or enable SEO on this collection.`
			}
		};
		const mimeCheck = await validateMediaFields(db, collection, body.data);
		if (!mimeCheck.success) return mimeCheck;
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const bylineRepo = new BylineRepository(trx);
			const effectiveLocale = body.locale ?? getI18nConfig()?.defaultLocale;
			let slug = body.slug;
			if (!slug) {
				const slugSource = getSlugSource(body.data);
				if (slugSource) slug = await repo.generateUniqueSlug(collection, slugSource, effectiveLocale);
			}
			const created = await repo.create({
				type: collection,
				slug,
				data: body.data,
				status: body.status || "draft",
				authorId: body.authorId,
				locale: effectiveLocale,
				translationOf: body.translationOf,
				createdAt: body.createdAt,
				publishedAt: body.publishedAt
			});
			if (body.bylines !== void 0) created.primaryBylineId = (await bylineRepo.setContentBylines(collection, created.id, body.bylines))[0]?.byline.translationGroup ?? null;
			if (body.translationOf) {
				await new TaxonomyRepository(trx).copyEntryTerms(collection, body.translationOf, created.id);
				if (body.bylines === void 0) {
					await bylineRepo.copyContentBylines(collection, body.translationOf, created.id);
					const source = await repo.findById(collection, body.translationOf);
					if (source) created.primaryBylineId = source.primaryBylineId;
				}
			}
			await hydrateBylines(trx, collection, created);
			if (body.seo && hasSeo) created.seo = await new SeoRepository(trx).upsert(collection, created.id, body.seo);
			else if (hasSeo) created.seo = { ...SEO_DEFAULTS };
			if (body.taxonomies) await assignTaxonomies(trx, collection, created.id, effectiveLocale, body.taxonomies);
			return created;
		});
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (isMissingTableError(error)) return {
			success: false,
			error: {
				code: "COLLECTION_NOT_FOUND",
				message: `Collection '${collection}' not found`
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		const message = error instanceof Error ? error.message.toLowerCase() : "";
		if (message.includes("unique constraint failed") || message.includes("duplicate key")) {
			if (message.includes("slug")) return {
				success: false,
				error: {
					code: "SLUG_CONFLICT",
					message: `Slug '${body.slug ?? "(auto-generated)"}' already exists in collection '${collection}'`
				}
			};
			return {
				success: false,
				error: {
					code: "CONFLICT",
					message: "Unique constraint violation"
				}
			};
		}
		console.error("Content create error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_CREATE_ERROR",
				message: "Failed to create content"
			}
		};
	}
}
async function handleContentUpdate(db, collection, id, body) {
	try {
		const hasSeo = await collectionHasSeo(db, collection);
		if (body.seo && !hasSeo) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: `Collection "${collection}" does not have SEO enabled. Remove the seo field or enable SEO on this collection.`
			}
		};
		if (body.data) {
			const mimeCheck = await validateMediaFields(db, collection, body.data);
			if (!mimeCheck.success) return mimeCheck;
		}
		const resolvedId = await resolveId(new ContentRepository(db), collection, id, body.locale) ?? id;
		const item = await withTransaction(db, async (trx) => {
			const trxRepo = new ContentRepository(trx);
			const bylineRepo = new BylineRepository(trx);
			const existing = body._rev || body.slug ? await trxRepo.findById(collection, resolvedId) : null;
			if (body._rev) {
				if (!existing) throw Object.assign(/* @__PURE__ */ new Error(`Content item not found: ${id}`), { apiError: { code: "NOT_FOUND" } });
				const revCheck = validateRev(body._rev, existing);
				if (!revCheck.valid) throw Object.assign(new Error(revCheck.message), { apiError: { code: "CONFLICT" } });
			}
			let oldSlug;
			if (body.slug && existing?.slug && existing.slug !== body.slug) oldSlug = existing.slug;
			const updated = await trxRepo.update(collection, resolvedId, {
				data: body.data,
				slug: body.slug,
				status: body.status,
				authorId: body.authorId,
				publishedAt: body.publishedAt
			});
			if (body.bylines !== void 0) updated.primaryBylineId = (await bylineRepo.setContentBylines(collection, resolvedId, body.bylines))[0]?.byline.translationGroup ?? null;
			if (oldSlug && body.slug) await createSlugChangeRedirect(trx, collection, oldSlug, body.slug, resolvedId);
			if (isI18nEnabled() && body.data && updated.translationGroup) await syncNonTranslatableFields(trx, collection, updated.id, updated.translationGroup, body.data);
			if (body.seo && hasSeo) updated.seo = await new SeoRepository(trx).upsert(collection, resolvedId, body.seo);
			else if (hasSeo) updated.seo = await new SeoRepository(trx).get(collection, resolvedId);
			await hydrateBylines(trx, collection, updated);
			if (body.taxonomies) await assignTaxonomies(trx, collection, resolvedId, updated.locale ?? body.locale, body.taxonomies);
			return updated;
		});
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (hasApiError(error)) return {
			success: false,
			error: {
				code: error.apiError.code,
				message: error.message
			}
		};
		if (isMissingTableError(error)) return {
			success: false,
			error: {
				code: "COLLECTION_NOT_FOUND",
				message: `Collection '${collection}' not found`
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		const message = error instanceof Error ? error.message.toLowerCase() : "";
		if (message.includes("unique constraint failed") || message.includes("duplicate key")) {
			if (message.includes("slug")) return {
				success: false,
				error: {
					code: "SLUG_CONFLICT",
					message: `Slug '${body.slug ?? id}' already exists in collection '${collection}'`
				}
			};
			return {
				success: false,
				error: {
					code: "CONFLICT",
					message: "Unique constraint violation"
				}
			};
		}
		console.error("Content update error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_UPDATE_ERROR",
				message: "Failed to update content"
			}
		};
	}
}
async function handleContentDuplicate(db, collection, id, authorId) {
	try {
		const hasSeo = await collectionHasSeo(db, collection);
		return {
			success: true,
			data: { item: await withTransaction(db, async (trx) => {
				const repo = new ContentRepository(trx);
				const bylineRepo = new BylineRepository(trx);
				const resolvedId = await resolveId(repo, collection, id) ?? id;
				const dup = await repo.duplicate(collection, resolvedId, authorId);
				const existingBylines = await bylineRepo.getContentBylines(collection, resolvedId);
				if (existingBylines.length > 0) await bylineRepo.setContentBylines(collection, dup.id, existingBylines.map((entry) => ({
					bylineId: entry.byline.id,
					roleLabel: entry.roleLabel
				})));
				if (hasSeo) {
					const seoRepo = new SeoRepository(trx);
					await seoRepo.copyForDuplicate(collection, resolvedId, dup.id);
					dup.seo = await seoRepo.get(collection, dup.id);
				}
				await hydrateBylines(trx, collection, dup);
				return dup;
			}) }
		};
	} catch (err) {
		if (err instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: err.message
			}
		};
		console.error("Content duplicate error:", err);
		return {
			success: false,
			error: {
				code: "CONTENT_DUPLICATE_ERROR",
				message: "Failed to duplicate content"
			}
		};
	}
}
async function handleContentDelete(db, collection, id) {
	try {
		const result = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			return {
				id: resolvedId,
				deleted: await repo.delete(collection, resolvedId)
			};
		});
		if (!result.deleted) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		return {
			success: true,
			data: {
				deleted: true,
				id: result.id
			}
		};
	} catch (error) {
		console.error("Content delete error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_DELETE_ERROR",
				message: "Failed to delete content"
			}
		};
	}
}
async function handleContentRestore(db, collection, id) {
	try {
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveIdIncludingTrashed(repo, collection, id) ?? id;
			return repo.restore(collection, resolvedId);
		});
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Trashed content item not found: ${id}`
			}
		};
		return {
			success: true,
			data: {
				restored: true,
				item
			}
		};
	} catch (error) {
		console.error("Content restore error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_RESTORE_ERROR",
				message: "Failed to restore content"
			}
		};
	}
}
async function handleContentPermanentDelete(db, collection, id) {
	try {
		const resolvedId = await resolveIdIncludingTrashed(new ContentRepository(db), collection, id) ?? id;
		if (!await withTransaction(db, async (trx) => {
			const wasDeleted = await new ContentRepository(trx).permanentDelete(collection, resolvedId);
			if (wasDeleted) {
				await new SeoRepository(trx).delete(collection, resolvedId);
				await new CommentRepository(trx).deleteByContent(collection, resolvedId);
				await new RevisionRepository(trx).deleteByEntry(collection, resolvedId);
			}
			return wasDeleted;
		})) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		return {
			success: true,
			data: {
				deleted: true,
				id: resolvedId
			}
		};
	} catch (error) {
		console.error("Content permanent delete error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_DELETE_ERROR",
				message: "Failed to permanently delete content"
			}
		};
	}
}
async function handleContentListTrashed(db, collection, options = {}) {
	try {
		const result = await new ContentRepository(db).findTrashed(collection, {
			limit: options.limit,
			cursor: options.cursor
		});
		return {
			success: true,
			data: {
				items: result.items.map((item) => ({
					id: item.id,
					type: item.type,
					slug: item.slug,
					status: item.status,
					data: item.data,
					authorId: item.authorId,
					createdAt: item.createdAt,
					updatedAt: item.updatedAt,
					publishedAt: item.publishedAt,
					deletedAt: item.deletedAt
				})),
				nextCursor: result.nextCursor
			}
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: "INVALID_CURSOR",
				message: error.message
			}
		};
		console.error("Content list trashed error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_LIST_ERROR",
				message: "Failed to list trashed content"
			}
		};
	}
}
async function handleContentCountTrashed(db, collection) {
	try {
		return {
			success: true,
			data: { count: await new ContentRepository(db).countTrashed(collection) }
		};
	} catch (error) {
		console.error("Content count trashed error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_COUNT_ERROR",
				message: "Failed to count trashed content"
			}
		};
	}
}
async function handleContentSchedule(db, collection, id, scheduledAt) {
	try {
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			return repo.schedule(collection, resolvedId, scheduledAt);
		});
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		console.error("Content schedule error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_SCHEDULE_ERROR",
				message: "Failed to schedule content"
			}
		};
	}
}
async function handleContentUnschedule(db, collection, id) {
	try {
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			return repo.unschedule(collection, resolvedId);
		});
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		console.error("Content unschedule error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_UNSCHEDULE_ERROR",
				message: "Failed to unschedule content"
			}
		};
	}
}
async function handleContentPublish(db, collection, id, options = {}) {
	try {
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			const existing = await repo.findById(collection, resolvedId);
			const published = await repo.publish(collection, resolvedId, options.publishedAt, options.requireScheduledDue);
			if (existing?.status === "published" && existing.slug && published.slug && existing.slug !== published.slug) await createSlugChangeRedirect(trx, collection, existing.slug, published.slug, resolvedId);
			return published;
		});
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		if (error instanceof ScheduledNotDueError) return {
			success: false,
			error: {
				code: "NOT_DUE",
				message: error.message
			}
		};
		if (error instanceof EmDashValidationError) {
			const details = error.details;
			return {
				success: false,
				error: {
					code: typeof details === "object" && details !== null && "code" in details && details.code === "SLUG_CONFLICT" ? "SLUG_CONFLICT" : "VALIDATION_ERROR",
					message: error.message
				}
			};
		}
		const message = error instanceof Error ? error.message.toLowerCase() : "";
		if ((message.includes("unique constraint failed") || message.includes("duplicate key")) && message.includes("slug")) return {
			success: false,
			error: {
				code: "SLUG_CONFLICT",
				message: `The staged slug is already used by another entry in collection '${collection}'`
			}
		};
		console.error("Content publish error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_PUBLISH_ERROR",
				message: "Failed to publish content"
			}
		};
	}
}
async function handleContentUnpublish(db, collection, id) {
	try {
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			return repo.unpublish(collection, resolvedId);
		});
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		console.error("Content unpublish error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_UNPUBLISH_ERROR",
				message: "Failed to unpublish content"
			}
		};
	}
}
async function handleContentCountScheduled(db, collection) {
	try {
		return {
			success: true,
			data: { count: await new ContentRepository(db).countScheduled(collection) }
		};
	} catch (error) {
		console.error("Content count scheduled error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_COUNT_ERROR",
				message: "Failed to count scheduled content"
			}
		};
	}
}
async function handleContentDiscardDraft(db, collection, id) {
	try {
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			return repo.discardDraft(collection, resolvedId);
		});
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: error.message
			}
		};
		console.error("Content discard draft error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_DISCARD_DRAFT_ERROR",
				message: "Failed to discard draft"
			}
		};
	}
}
async function handleContentCompare(db, collection, id) {
	try {
		const entry = await new ContentRepository(db).findByIdOrSlug(collection, id);
		if (!entry) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		const revisionRepo = new RevisionRepository(db);
		const live = entry.liveRevisionId ? await revisionRepo.findById(entry.liveRevisionId) : null;
		const draft = entry.draftRevisionId ? await revisionRepo.findById(entry.draftRevisionId) : null;
		return {
			success: true,
			data: {
				hasChanges: entry.draftRevisionId !== null && entry.draftRevisionId !== entry.liveRevisionId,
				live: live?.data ?? null,
				draft: draft?.data ?? null
			}
		};
	} catch (error) {
		console.error("Content compare error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_COMPARE_ERROR",
				message: "Failed to compare revisions"
			}
		};
	}
}
async function handleContentTranslations(db, collection, id) {
	try {
		const repo = new ContentRepository(db);
		const item = await repo.findByIdOrSlug(collection, id);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		if (!item.translationGroup) return {
			success: true,
			data: {
				translationGroup: item.id,
				translations: [{
					id: item.id,
					locale: item.locale,
					slug: item.slug,
					status: item.status,
					updatedAt: item.updatedAt
				}]
			}
		};
		const translations = await repo.findTranslations(collection, item.translationGroup);
		return {
			success: true,
			data: {
				translationGroup: item.translationGroup,
				translations: translations.map((t) => ({
					id: t.id,
					locale: t.locale,
					slug: t.slug,
					status: t.status,
					updatedAt: t.updatedAt
				}))
			}
		};
	} catch (error) {
		if (error instanceof Error) console.error("Content translations error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_TRANSLATIONS_ERROR",
				message: "Failed to get translations"
			}
		};
	}
}
async function syncNonTranslatableFields(trx, collectionSlug, updatedItemId, translationGroup, data) {
	const collection = await trx.selectFrom("_emdash_collections").select("id").where("slug", "=", collectionSlug).executeTakeFirst();
	if (!collection) return;
	const nonTranslatableSlugs = (await trx.selectFrom("_emdash_fields").select("slug").where("collection_id", "=", collection.id).where("translatable", "=", 0).execute()).map((f) => f.slug);
	if (nonTranslatableSlugs.length === 0) return;
	const syncData = {};
	for (const slug of nonTranslatableSlugs) if (slug in data) syncData[slug] = data[slug];
	if (Object.keys(syncData).length === 0) return;
	validateIdentifier(collectionSlug, "collection slug");
	const tableName = `ec_${collectionSlug}`;
	const setClauses = Object.entries(syncData).map(([key, value]) => {
		validateIdentifier(key, "field slug");
		const serialized = typeof value === "object" && value !== null ? JSON.stringify(value) : value;
		return sql`${sql.ref(key)} = ${serialized}`;
	});
	await sql`
		UPDATE ${sql.ref(tableName)}
		SET ${sql.join(setClauses, sql`, `)}
		WHERE translation_group = ${translationGroup}
		AND id != ${updatedItemId}
	`.execute(trx);
}
async function assignTaxonomies(trx, collection, entryId, locale, taxonomies) {
	const taxRepo = new TaxonomyRepository(trx);
	let anyChange = false;
	for (const [taxonomyName, slugs] of Object.entries(taxonomies)) {
		if (!Array.isArray(slugs)) throw new EmDashValidationError(`taxonomies.${taxonomyName} must be an array of term slugs`);
		const termIds = [];
		for (const slug of slugs) {
			if (typeof slug !== "string" || slug.length === 0) throw new EmDashValidationError(`taxonomies.${taxonomyName} contains a non-string or empty slug`);
			const term = await taxRepo.findBySlug(taxonomyName, slug, locale);
			if (!term) throw new EmDashValidationError(`Unknown taxonomy term: ${taxonomyName}='${slug}'${locale ? ` (locale '${locale}')` : ""}`);
			termIds.push(term.id);
		}
		await taxRepo.setTermsForEntry(collection, entryId, taxonomyName, termIds);
		anyChange = true;
	}
	if (anyChange) invalidateTermCache();
}
async function handleRevisionList(db, collection, entryId, params = {}) {
	try {
		const repo = new RevisionRepository(db);
		const [items, total] = await Promise.all([repo.findByEntry(collection, entryId, { limit: Math.min(params.limit || 50, 100) }), repo.countByEntry(collection, entryId)]);
		return {
			success: true,
			data: {
				items,
				total
			}
		};
	} catch {
		return {
			success: false,
			error: {
				code: "REVISION_LIST_ERROR",
				message: "Failed to list revisions"
			}
		};
	}
}
async function handleRevisionGet(db, revisionId) {
	try {
		const item = await new RevisionRepository(db).findById(revisionId);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Revision not found: ${revisionId}`
			}
		};
		return {
			success: true,
			data: { item }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "REVISION_GET_ERROR",
				message: "Failed to get revision"
			}
		};
	}
}
async function handleRevisionRestore(db, revisionId, callerUserId) {
	try {
		const revision = await new RevisionRepository(db).findById(revisionId);
		if (!revision) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Revision not found: ${revisionId}`
			}
		};
		const { _slug, ...fieldData } = revision.data;
		const item = await withTransaction(db, async (trx) => {
			const trxContentRepo = new ContentRepository(trx);
			const trxRevisionRepo = new RevisionRepository(trx);
			const updated = await trxContentRepo.update(revision.collection, revision.entryId, {
				data: fieldData,
				slug: typeof _slug === "string" ? _slug : void 0
			});
			await trxRevisionRepo.create({
				collection: revision.collection,
				entryId: revision.entryId,
				data: revision.data,
				authorId: callerUserId
			});
			return updated;
		});
		new RevisionRepository(db).pruneOldRevisions(revision.collection, revision.entryId, 50).catch(() => {});
		return {
			success: true,
			data: { item }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "REVISION_RESTORE_ERROR",
				message: "Failed to restore revision"
			}
		};
	}
}
async function handleMediaList(db, params) {
	try {
		const result = await new MediaRepository(db).findMany({
			cursor: params.cursor,
			limit: Math.min(params.limit || 50, 100),
			mimeType: params.mimeType,
			q: params.q
		});
		return {
			success: true,
			data: {
				items: result.items,
				nextCursor: result.nextCursor
			}
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: "INVALID_CURSOR",
				message: error.message
			}
		};
		return {
			success: false,
			error: {
				code: "MEDIA_LIST_ERROR",
				message: "Failed to list media"
			}
		};
	}
}
async function handleMediaGet(db, id) {
	try {
		const item = await new MediaRepository(db).findById(id);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Media item not found: ${id}`
			}
		};
		return {
			success: true,
			data: { item }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MEDIA_GET_ERROR",
				message: "Failed to get media"
			}
		};
	}
}
async function handleMediaCreate(db, input) {
	try {
		return {
			success: true,
			data: { item: await new MediaRepository(db).create(input) }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MEDIA_CREATE_ERROR",
				message: "Failed to create media"
			}
		};
	}
}
async function handleMediaUpdate(db, id, input) {
	try {
		const item = await new MediaRepository(db).update(id, input);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Media item not found: ${id}`
			}
		};
		return {
			success: true,
			data: { item }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MEDIA_UPDATE_ERROR",
				message: "Failed to update media"
			}
		};
	}
}
async function handleMediaDelete(db, id) {
	try {
		if (!await new MediaRepository(db).delete(id)) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Media item not found: ${id}`
			}
		};
		return {
			success: true,
			data: { deleted: true }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MEDIA_DELETE_ERROR",
				message: "Failed to delete media"
			}
		};
	}
}
async function handleSchemaCollectionList(db) {
	try {
		return {
			success: true,
			data: { items: await new SchemaRegistry(db).listCollections() }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "SCHEMA_LIST_ERROR",
				message: "Failed to list collections"
			}
		};
	}
}
async function handleSchemaCollectionGet(db, slug, options) {
	try {
		const registry = new SchemaRegistry(db);
		if (options?.includeFields) {
			const item2 = await registry.getCollectionWithFields(slug);
			if (!item2) return {
				success: false,
				error: {
					code: "NOT_FOUND",
					message: `Collection not found: ${slug}`
				}
			};
			return {
				success: true,
				data: { item: item2 }
			};
		}
		const item = await registry.getCollection(slug);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Collection not found: ${slug}`
			}
		};
		return {
			success: true,
			data: { item }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "SCHEMA_GET_ERROR",
				message: "Failed to get collection"
			}
		};
	}
}
async function handleSchemaCollectionCreate(db, input) {
	try {
		return {
			success: true,
			data: { item: await new SchemaRegistry(db).createCollection(input) }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		console.error("[emdash] Failed to create collection:", error);
		return {
			success: false,
			error: {
				code: "SCHEMA_CREATE_ERROR",
				message: "Failed to create collection"
			}
		};
	}
}
async function handleSchemaCollectionUpdate(db, slug, input) {
	try {
		return {
			success: true,
			data: { item: await new SchemaRegistry(db).updateCollection(slug, input) }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "SCHEMA_UPDATE_ERROR",
				message: "Failed to update collection"
			}
		};
	}
}
async function handleSchemaCollectionDelete(db, slug, options) {
	try {
		await new SchemaRegistry(db).deleteCollection(slug, options);
		return {
			success: true,
			data: { success: true }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "SCHEMA_DELETE_ERROR",
				message: "Failed to delete collection"
			}
		};
	}
}
async function handleSchemaFieldList(db, collectionSlug) {
	try {
		const registry = new SchemaRegistry(db);
		const collection = await registry.getCollection(collectionSlug);
		if (!collection) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Collection not found: ${collectionSlug}`
			}
		};
		return {
			success: true,
			data: { items: await registry.listFields(collection.id) }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "SCHEMA_FIELD_LIST_ERROR",
				message: "Failed to list fields"
			}
		};
	}
}
async function handleSchemaFieldGet(db, collectionSlug, fieldSlug) {
	try {
		const item = await new SchemaRegistry(db).getField(collectionSlug, fieldSlug);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Field not found: ${fieldSlug} in collection ${collectionSlug}`
			}
		};
		return {
			success: true,
			data: { item }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "SCHEMA_FIELD_GET_ERROR",
				message: "Failed to get field"
			}
		};
	}
}
async function handleSchemaFieldCreate(db, collectionSlug, input) {
	try {
		const item = await new SchemaRegistry(db).createField(collectionSlug, input);
		invalidateCollectionCache(collectionSlug);
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "SCHEMA_FIELD_CREATE_ERROR",
				message: "Failed to create field"
			}
		};
	}
}
async function handleSchemaFieldUpdate(db, collectionSlug, fieldSlug, input) {
	try {
		const item = await new SchemaRegistry(db).updateField(collectionSlug, fieldSlug, input);
		invalidateCollectionCache(collectionSlug);
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "SCHEMA_FIELD_UPDATE_ERROR",
				message: "Failed to update field"
			}
		};
	}
}
async function handleSchemaFieldDelete(db, collectionSlug, fieldSlug) {
	try {
		await new SchemaRegistry(db).deleteField(collectionSlug, fieldSlug);
		invalidateCollectionCache(collectionSlug);
		return {
			success: true,
			data: { success: true }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "SCHEMA_FIELD_DELETE_ERROR",
				message: "Failed to delete field"
			}
		};
	}
}
async function handleSchemaFieldReorder(db, collectionSlug, fieldSlugs) {
	try {
		await new SchemaRegistry(db).reorderFields(collectionSlug, fieldSlugs);
		return {
			success: true,
			data: { success: true }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "SCHEMA_FIELD_REORDER_ERROR",
				message: "Failed to reorder fields"
			}
		};
	}
}
async function handleOrphanedTableList(db) {
	try {
		return {
			success: true,
			data: { items: await new SchemaRegistry(db).discoverOrphanedTables() }
		};
	} catch (error) {
		console.error("[emdash] Failed to list orphaned tables:", error);
		return {
			success: false,
			error: {
				code: "ORPHAN_LIST_ERROR",
				message: "Failed to list orphaned tables"
			}
		};
	}
}
async function handleOrphanedTableRegister(db, slug, options) {
	try {
		return {
			success: true,
			data: { item: await new SchemaRegistry(db).registerOrphanedTable(slug, options) }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "ORPHAN_REGISTER_ERROR",
				message: "Failed to register orphaned table"
			}
		};
	}
}
function marketplaceIconUrl(marketplaceUrl, pluginId) {
	return `${marketplaceUrl}/api/v1/plugins/${encodeURIComponent(pluginId)}/icon`;
}
function buildPluginInfo(plugin, state, marketplaceUrl) {
	const status = state?.status ?? "active";
	const enabled = status === "active";
	const isMarketplace = (state?.source ?? "config") === "marketplace";
	return {
		id: plugin.id,
		name: state?.displayName || plugin.id,
		version: plugin.version,
		package: void 0,
		enabled,
		status,
		source: state?.source ?? "config",
		marketplaceVersion: state?.marketplaceVersion ?? void 0,
		registryPublisherDid: state?.registryPublisherDid ?? void 0,
		registrySlug: state?.registrySlug ?? void 0,
		capabilities: plugin.capabilities,
		hasAdminPages: (plugin.admin.pages?.length ?? 0) > 0,
		hasDashboardWidgets: (plugin.admin.widgets?.length ?? 0) > 0,
		hasHooks: Object.keys(plugin.hooks ?? {}).length > 0,
		hasSettings: Object.keys(plugin.admin.settingsSchema ?? {}).length > 0,
		installedAt: state?.installedAt?.toISOString(),
		activatedAt: state?.activatedAt?.toISOString() ?? void 0,
		deactivatedAt: state?.deactivatedAt?.toISOString() ?? void 0,
		description: state?.description ?? void 0,
		iconUrl: isMarketplace && marketplaceUrl ? marketplaceIconUrl(marketplaceUrl, plugin.id) : void 0,
		mcpToolsEnabled: state?.mcpToolsEnabled ?? false,
		mcpTools: Object.entries(plugin.mcp?.tools ?? {}).flatMap(([name, tool]) => {
			const permission = plugin.routes[tool.route]?.permission;
			return permission ? [{
				name,
				description: tool.description,
				route: tool.route,
				permission,
				destructive: tool.destructive ?? false
			}] : [];
		})
	};
}
function buildSandboxedPluginInfo(entry, state) {
	const status = state?.status ?? "active";
	const enabled = status === "active";
	return {
		id: entry.id,
		name: state?.displayName || entry.id,
		version: entry.version,
		package: void 0,
		enabled,
		status,
		source: "config",
		sandboxed: true,
		capabilities: entry.capabilities,
		hasAdminPages: (entry.adminPages?.length ?? 0) > 0,
		hasDashboardWidgets: (entry.adminWidgets?.length ?? 0) > 0,
		hasHooks: false,
		hasSettings: Object.keys(entry.settingsSchema ?? {}).length > 0,
		installedAt: state?.installedAt?.toISOString(),
		activatedAt: state?.activatedAt?.toISOString() ?? void 0,
		deactivatedAt: state?.deactivatedAt?.toISOString() ?? void 0,
		description: state?.description ?? void 0,
		mcpToolsEnabled: state?.mcpToolsEnabled ?? false,
		mcpTools: entry.mcp?.tools.map(({ inputSchema: _, outputSchema: __, ...tool }) => tool) ?? []
	};
}
async function handlePluginList(db, configuredPlugins, sandboxedPluginEntries, marketplaceUrl, runtimeSettingsSchemaLookup) {
	try {
		const allStates = await new PluginStateRepository(db).getAll();
		const stateMap = new Map(allStates.map((s) => [s.pluginId, s]));
		const configuredIds = new Set(configuredPlugins.map((p) => p.id));
		const items = configuredPlugins.map((plugin) => {
			return buildPluginInfo(plugin, stateMap.get(plugin.id) ?? null, marketplaceUrl);
		});
		for (const entry of sandboxedPluginEntries) {
			if (configuredIds.has(entry.id)) continue;
			configuredIds.add(entry.id);
			items.push(buildSandboxedPluginInfo(entry, stateMap.get(entry.id) ?? null));
		}
		for (const state of allStates) {
			if (state.source !== "marketplace" && state.source !== "registry") continue;
			if (configuredIds.has(state.pluginId)) continue;
			items.push({
				id: state.pluginId,
				name: state.displayName || state.pluginId,
				version: state.marketplaceVersion ?? state.version,
				enabled: state.status === "active",
				status: state.status,
				source: state.source,
				marketplaceVersion: state.marketplaceVersion ?? void 0,
				registryPublisherDid: state.registryPublisherDid ?? void 0,
				registrySlug: state.registrySlug ?? void 0,
				capabilities: [],
				hasAdminPages: false,
				hasDashboardWidgets: false,
				hasHooks: false,
				hasSettings: Object.keys(runtimeSettingsSchemaLookup?.(state.pluginId) ?? {}).length > 0,
				installedAt: state.installedAt?.toISOString(),
				activatedAt: state.activatedAt?.toISOString() ?? void 0,
				deactivatedAt: state.deactivatedAt?.toISOString() ?? void 0,
				description: state.description ?? void 0,
				iconUrl: state.source === "marketplace" && marketplaceUrl ? marketplaceIconUrl(marketplaceUrl, state.pluginId) : void 0,
				mcpToolsEnabled: state.mcpToolsEnabled,
				mcpTools: []
			});
		}
		return {
			success: true,
			data: { items }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "PLUGIN_LIST_ERROR",
				message: "Failed to list plugins"
			}
		};
	}
}
async function handlePluginGet(db, configuredPlugins, sandboxedPluginEntries, pluginId, marketplaceUrl) {
	try {
		const stateRepo = new PluginStateRepository(db);
		const plugin = configuredPlugins.find((p) => p.id === pluginId);
		if (plugin) return {
			success: true,
			data: { item: buildPluginInfo(plugin, await stateRepo.get(pluginId), marketplaceUrl) }
		};
		const sandboxed = sandboxedPluginEntries.find((e) => e.id === pluginId);
		if (sandboxed) return {
			success: true,
			data: { item: buildSandboxedPluginInfo(sandboxed, await stateRepo.get(pluginId)) }
		};
		return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Plugin not found: ${pluginId}`
			}
		};
	} catch {
		return {
			success: false,
			error: {
				code: "PLUGIN_GET_ERROR",
				message: "Failed to get plugin"
			}
		};
	}
}
function buildStateOnlyPluginInfo(state) {
	return {
		id: state.pluginId,
		name: state.displayName || state.pluginId,
		version: state.marketplaceVersion ?? state.version,
		enabled: state.status === "active",
		status: state.status,
		source: state.source,
		marketplaceVersion: state.marketplaceVersion ?? void 0,
		registryPublisherDid: state.registryPublisherDid ?? void 0,
		registrySlug: state.registrySlug ?? void 0,
		capabilities: [],
		hasAdminPages: false,
		hasDashboardWidgets: false,
		hasHooks: false,
		hasSettings: false,
		installedAt: state.installedAt?.toISOString(),
		activatedAt: state.activatedAt?.toISOString() ?? void 0,
		deactivatedAt: state.deactivatedAt?.toISOString() ?? void 0,
		description: state.description ?? void 0,
		mcpToolsEnabled: state.mcpToolsEnabled,
		mcpTools: []
	};
}
async function handlePluginEnable(db, configuredPlugins, sandboxedPluginEntries, pluginId) {
	try {
		const stateRepo = new PluginStateRepository(db);
		const plugin = configuredPlugins.find((p) => p.id === pluginId);
		if (plugin) return {
			success: true,
			data: { item: buildPluginInfo(plugin, await stateRepo.enable(pluginId, plugin.version)) }
		};
		const sandboxed = sandboxedPluginEntries.find((e) => e.id === pluginId);
		if (sandboxed) return {
			success: true,
			data: { item: buildSandboxedPluginInfo(sandboxed, await stateRepo.enable(pluginId, sandboxed.version)) }
		};
		const existing = await stateRepo.get(pluginId);
		if (!existing || existing.source !== "marketplace" && existing.source !== "registry") return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Plugin not found: ${pluginId}`
			}
		};
		return {
			success: true,
			data: { item: buildStateOnlyPluginInfo(await stateRepo.enable(pluginId, existing.version)) }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "PLUGIN_ENABLE_ERROR",
				message: "Failed to enable plugin"
			}
		};
	}
}
async function handlePluginDisable(db, configuredPlugins, sandboxedPluginEntries, pluginId) {
	try {
		const stateRepo = new PluginStateRepository(db);
		const plugin = configuredPlugins.find((p) => p.id === pluginId);
		if (plugin) return {
			success: true,
			data: { item: buildPluginInfo(plugin, await stateRepo.disable(pluginId, plugin.version)) }
		};
		const sandboxed = sandboxedPluginEntries.find((e) => e.id === pluginId);
		if (sandboxed) return {
			success: true,
			data: { item: buildSandboxedPluginInfo(sandboxed, await stateRepo.disable(pluginId, sandboxed.version)) }
		};
		const existing = await stateRepo.get(pluginId);
		if (!existing || existing.source !== "marketplace" && existing.source !== "registry") return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Plugin not found: ${pluginId}`
			}
		};
		return {
			success: true,
			data: { item: buildStateOnlyPluginInfo(await stateRepo.disable(pluginId, existing.version)) }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "PLUGIN_DISABLE_ERROR",
				message: "Failed to disable plugin"
			}
		};
	}
}
function settingsKey(pluginId, key) {
	return `plugin:${pluginId}:settings:${key}`;
}
function getPluginSettingsSchema(configuredPlugins, sandboxedPluginEntries, pluginId) {
	const plugin = configuredPlugins.find((p) => p.id === pluginId);
	if (plugin) return plugin.admin.settingsSchema ?? {};
	const sandboxed = sandboxedPluginEntries.find((e) => e.id === pluginId);
	if (sandboxed) return sandboxed.settingsSchema ?? {};
	return null;
}
function validateValue(key, field, value) {
	switch (field.type) {
		case "string":
		case "secret":
		case "url":
		case "email":
			if (typeof value !== "string") return `Setting "${key}" must be a string`;
			if (field.type === "url" && value !== "" && !URL.canParse(value)) return `Setting "${key}" must be a valid URL`;
			if (field.type === "email" && value !== "" && !value.includes("@")) return `Setting "${key}" must be a valid email address`;
			return null;
		case "number":
			if (typeof value !== "number" || Number.isNaN(value)) return `Setting "${key}" must be a number`;
			if (field.min !== void 0 && value < field.min) return `Setting "${key}" must be at least ${field.min}`;
			if (field.max !== void 0 && value > field.max) return `Setting "${key}" must be at most ${field.max}`;
			return null;
		case "boolean": return typeof value === "boolean" ? null : `Setting "${key}" must be a boolean`;
		case "select":
			if (typeof value !== "string" || !field.options.some((o) => o.value === value)) return `Setting "${key}" must be one of the defined options`;
			return null;
		default: return `Setting "${key}" has an unknown field type`;
	}
}
async function buildSettingsResponse(optionsRepo, pluginId, schema) {
	const keys = Object.keys(schema);
	const stored = await optionsRepo.getMany(keys.map((key) => settingsKey(pluginId, key)));
	const values = {};
	const secretsSet = {};
	for (const key of keys) {
		const field = schema[key];
		if (!field) continue;
		const storedValue = stored.get(settingsKey(pluginId, key));
		if (field.type === "secret") {
			secretsSet[key] = typeof storedValue === "string" && storedValue.length > 0;
			continue;
		}
		if (storedValue !== void 0 && storedValue !== null) values[key] = storedValue;
		else if ("default" in field && field.default !== void 0) values[key] = field.default;
		else values[key] = null;
	}
	return {
		schema,
		values,
		secretsSet
	};
}
async function handlePluginSettingsGet(db, pluginId, schema) {
	try {
		return {
			success: true,
			data: await buildSettingsResponse(new OptionsRepository(db), pluginId, schema)
		};
	} catch {
		return {
			success: false,
			error: {
				code: ErrorCode.PLUGIN_SETTINGS_READ_ERROR,
				message: "Failed to read plugin settings"
			}
		};
	}
}
async function handlePluginSettingsUpdate(db, pluginId, schema, updates) {
	try {
		for (const [key, value] of Object.entries(updates)) {
			const field = schema[key];
			if (!field) return {
				success: false,
				error: {
					code: ErrorCode.VALIDATION_ERROR,
					message: `Unknown setting "${key}" for plugin "${pluginId}"`
				}
			};
			if (value === null) continue;
			const error = validateValue(key, field, value);
			if (error) return {
				success: false,
				error: {
					code: ErrorCode.VALIDATION_ERROR,
					message: error
				}
			};
		}
		return {
			success: true,
			data: await withTransaction(db, async (trx) => {
				const txRepo = new OptionsRepository(trx);
				for (const [key, value] of Object.entries(updates)) if (value === null) await txRepo.delete(settingsKey(pluginId, key));
				else await txRepo.set(settingsKey(pluginId, key), value);
				return buildSettingsResponse(txRepo, pluginId, schema);
			})
		};
	} catch {
		return {
			success: false,
			error: {
				code: ErrorCode.PLUGIN_SETTINGS_UPDATE_ERROR,
				message: "Failed to update plugin settings"
			}
		};
	}
}
var TRAILING_SLASHES$1 = /\/+$/;
var LEADING_DOT_SLASH = /^\.\//;
var MarketplaceError = class extends Error {
	constructor(message, status, code) {
		super(message);
		this.status = status;
		this.code = code;
		this.name = "MarketplaceError";
	}
};
var MarketplaceUnavailableError = class extends MarketplaceError {
	constructor(cause) {
		super("Plugin marketplace is unavailable", void 0, "MARKETPLACE_UNAVAILABLE");
		if (cause) this.cause = cause;
	}
};
var MarketplaceClientImpl = class {
	baseUrl;
	siteOrigin;
	constructor(baseUrl, siteOrigin) {
		this.baseUrl = baseUrl.replace(TRAILING_SLASHES$1, "");
		this.siteOrigin = siteOrigin;
	}
	async search(query, opts) {
		const params = new URLSearchParams();
		if (query) params.set("q", query);
		if (opts?.category) params.set("category", opts.category);
		if (opts?.capability) params.set("capability", opts.capability);
		if (opts?.sort) params.set("sort", opts.sort);
		if (opts?.cursor) params.set("cursor", opts.cursor);
		if (opts?.limit) params.set("limit", String(opts.limit));
		const qs = params.toString();
		const url = `${this.baseUrl}/api/v1/plugins${qs ? `?${qs}` : ""}`;
		return await this.fetchJson(url);
	}
	async getPlugin(id) {
		const url = `${this.baseUrl}/api/v1/plugins/${encodeURIComponent(id)}`;
		return this.fetchJson(url);
	}
	async getVersions(id) {
		const url = `${this.baseUrl}/api/v1/plugins/${encodeURIComponent(id)}/versions`;
		return (await this.fetchJson(url)).items;
	}
	async downloadBundle(id, version) {
		const bundleUrl = `${this.baseUrl}/api/v1/plugins/${encodeURIComponent(id)}/versions/${encodeURIComponent(version)}/bundle`;
		const marketplaceOrigin = new URL(this.baseUrl).origin;
		const MAX_REDIRECTS2 = 5;
		let response;
		try {
			let currentUrl = bundleUrl;
			response = await fetch(currentUrl, { redirect: "manual" });
			for (let i = 0; i < MAX_REDIRECTS2; i++) {
				if (response.status < 300 || response.status >= 400) break;
				const location = response.headers.get("location");
				if (!location) break;
				const target = new URL(location, currentUrl);
				if (target.origin !== marketplaceOrigin) throw new MarketplaceError(`Bundle download redirected to untrusted host: ${target.origin}`, response.status, "BUNDLE_REDIRECT_UNTRUSTED");
				currentUrl = target.href;
				response = await fetch(currentUrl, { redirect: "manual" });
			}
			if (response.status >= 300 && response.status < 400) throw new MarketplaceError(`Bundle download exceeded maximum redirects (${MAX_REDIRECTS2})`, response.status, "BUNDLE_TOO_MANY_REDIRECTS");
		} catch (err) {
			if (err instanceof MarketplaceError) throw err;
			throw new MarketplaceUnavailableError(err);
		}
		if (!response.ok) throw new MarketplaceError(`Failed to download bundle: ${response.status} ${response.statusText}`, response.status, "BUNDLE_DOWNLOAD_FAILED");
		const tarballBytes = new Uint8Array(await response.arrayBuffer());
		try {
			return await extractBundle(tarballBytes);
		} catch (err) {
			if (err instanceof MarketplaceError) throw err;
			throw new MarketplaceError("Failed to extract plugin bundle", void 0, "BUNDLE_EXTRACT_FAILED");
		}
	}
	async reportInstall(id, version) {
		const siteHash = await generateSiteHash(this.siteOrigin);
		const url = `${this.baseUrl}/api/v1/plugins/${encodeURIComponent(id)}/installs`;
		try {
			await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					siteHash,
					version
				})
			});
		} catch {}
	}
	async searchThemes(query, opts) {
		const params = new URLSearchParams();
		if (query) params.set("q", query);
		if (opts?.keyword) params.set("keyword", opts.keyword);
		if (opts?.sort) params.set("sort", opts.sort);
		if (opts?.cursor) params.set("cursor", opts.cursor);
		if (opts?.limit) params.set("limit", String(opts.limit));
		const qs = params.toString();
		const url = `${this.baseUrl}/api/v1/themes${qs ? `?${qs}` : ""}`;
		return this.fetchJson(url);
	}
	async getTheme(id) {
		const url = `${this.baseUrl}/api/v1/themes/${encodeURIComponent(id)}`;
		return this.fetchJson(url);
	}
	async fetchJson(url) {
		let response;
		try {
			response = await fetch(url, { headers: { Accept: "application/json" } });
		} catch (err) {
			throw new MarketplaceUnavailableError(err);
		}
		if (!response.ok) {
			let errorMessage = `Marketplace request failed: ${response.status}`;
			try {
				const body = await response.json();
				if (body.error) errorMessage = body.error;
			} catch {}
			throw new MarketplaceError(errorMessage, response.status);
		}
		return await response.json();
	}
};
var MAX_DECOMPRESSED_BUNDLE_BYTES = 262144;
var MAX_BUNDLE_TAR_ENTRIES = 32;
async function extractBundle(tarballBytes) {
	const reader = new ReadableStream({ start(controller) {
		controller.enqueue(tarballBytes);
		controller.close();
	} }).pipeThrough(createGzipDecoder()).getReader();
	const chunks2 = [];
	let total = 0;
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		if (!value) continue;
		total += value.byteLength;
		if (total > MAX_DECOMPRESSED_BUNDLE_BYTES) {
			try {
				await reader.cancel();
			} catch {}
			throw new MarketplaceError(`Bundle decompressed size exceeds limit (${MAX_DECOMPRESSED_BUNDLE_BYTES} bytes)`, void 0, "INVALID_BUNDLE");
		}
		chunks2.push(value);
	}
	const decompressedBytes = new Uint8Array(total);
	{
		let offset = 0;
		for (const chunk of chunks2) {
			decompressedBytes.set(chunk, offset);
			offset += chunk.byteLength;
		}
	}
	const entries = await unpackTar(new ReadableStream({ start(controller) {
		controller.enqueue(decompressedBytes);
		controller.close();
	} }));
	if (entries.length > MAX_BUNDLE_TAR_ENTRIES) throw new MarketplaceError(`Bundle has too many tar entries (${entries.length} > ${MAX_BUNDLE_TAR_ENTRIES})`, void 0, "INVALID_BUNDLE");
	const decoder = new TextDecoder();
	const files = /* @__PURE__ */ new Map();
	for (const entry of entries) if (entry.data && entry.header.type === "file") {
		const name = entry.header.name.replace(LEADING_DOT_SLASH, "");
		files.set(name, decoder.decode(entry.data));
	}
	const manifestJson = files.get("manifest.json");
	const backendCode = files.get("backend.js");
	if (!manifestJson) throw new MarketplaceError("Invalid bundle: missing manifest.json", void 0, "INVALID_BUNDLE");
	if (!backendCode) throw new MarketplaceError("Invalid bundle: missing backend.js", void 0, "INVALID_BUNDLE");
	let manifest;
	try {
		const parsed = JSON.parse(manifestJson);
		const result = pluginManifestSchema.safeParse(parsed);
		if (!result.success) throw new MarketplaceError("Invalid bundle: manifest.json failed validation", void 0, "INVALID_BUNDLE");
		manifest = reconcileManifestAccess(result.data);
	} catch (err) {
		if (err instanceof MarketplaceError) throw err;
		throw new MarketplaceError("Invalid bundle: malformed manifest.json", void 0, "INVALID_BUNDLE");
	}
	const hashBuffer = await crypto.subtle.digest("SHA-256", tarballBytes);
	const hashArray = new Uint8Array(hashBuffer);
	const checksum = Array.from(hashArray, (b) => b.toString(16).padStart(2, "0")).join("");
	return {
		manifest,
		backendCode,
		adminCode: files.get("admin.js"),
		checksum
	};
}
async function generateSiteHash(siteOrigin) {
	const seed = siteOrigin ? `emdash-site:${siteOrigin}` : `emdash-anonymous`;
	try {
		const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(seed));
		const arr = new Uint8Array(hash);
		return Array.from(arr.slice(0, 8), (b) => b.toString(16).padStart(2, "0")).join("");
	} catch {
		let h = 2166136261;
		for (let i = 0; i < seed.length; i++) {
			h ^= seed.charCodeAt(i);
			h = Math.imul(h, 16777619);
		}
		const h2 = h ^ h >>> 16;
		return (h >>> 0).toString(16).padStart(8, "0") + (h2 >>> 0).toString(16).padStart(8, "0");
	}
}
function createMarketplaceClient(baseUrl, siteOrigin) {
	return new MarketplaceClientImpl(baseUrl, siteOrigin);
}
var VERSION_PATTERN = /^[a-z0-9][a-z0-9._+-]*$/i;
function validateVersion(version) {
	if (version.includes("..")) throw new Error("Invalid version format");
	if (!VERSION_PATTERN.test(version)) throw new Error("Invalid version format");
}
function getClient(marketplaceUrl, siteOrigin) {
	if (!marketplaceUrl) return null;
	return createMarketplaceClient(marketplaceUrl, siteOrigin);
}
function diffCapabilities(oldCaps, newCaps) {
	const oldNorm = normalizeCapabilities(oldCaps);
	const newNorm = normalizeCapabilities(newCaps);
	const oldSet = new Set(oldNorm);
	const newSet = new Set(newNorm);
	return {
		added: newNorm.filter((c) => !oldSet.has(c)),
		removed: oldNorm.filter((c) => !newSet.has(c))
	};
}
function diffRouteVisibility(oldManifest, newManifest) {
	const oldPublicRoutes = /* @__PURE__ */ new Set();
	if (oldManifest) for (const entry of oldManifest.routes) {
		const normalized = normalizeManifestRoute(entry);
		if (normalized.public === true) oldPublicRoutes.add(normalized.name);
	}
	const newlyPublic = [];
	for (const entry of newManifest.routes) {
		const normalized = normalizeManifestRoute(entry);
		if (normalized.public === true && !oldPublicRoutes.has(normalized.name)) newlyPublic.push(normalized.name);
	}
	return { newlyPublic };
}
async function resolveVersionMetadata(client, pluginId, pluginDetail, version) {
	if (pluginDetail.latestVersion?.version === version) return {
		version: pluginDetail.latestVersion.version,
		minEmDashVersion: pluginDetail.latestVersion.minEmDashVersion,
		bundleSize: pluginDetail.latestVersion.bundleSize,
		checksum: pluginDetail.latestVersion.checksum,
		changelog: pluginDetail.latestVersion.changelog,
		capabilities: pluginDetail.latestVersion.capabilities,
		status: pluginDetail.latestVersion.status,
		auditVerdict: pluginDetail.latestVersion.audit?.verdict ?? null,
		imageAuditVerdict: pluginDetail.latestVersion.imageAudit?.verdict ?? null,
		publishedAt: pluginDetail.latestVersion.publishedAt
	};
	return (await client.getVersions(pluginId)).find((v) => v.version === version) ?? null;
}
function validateBundleIdentity(bundle, pluginId, version) {
	if (bundle.manifest.id !== pluginId) return {
		success: false,
		error: {
			code: "MANIFEST_MISMATCH",
			message: `Bundle manifest ID (${bundle.manifest.id}) does not match requested plugin (${pluginId})`
		}
	};
	if (bundle.manifest.version !== version) return {
		success: false,
		error: {
			code: "MANIFEST_VERSION_MISMATCH",
			message: `Bundle manifest version (${bundle.manifest.version}) does not match requested version (${version})`
		}
	};
	return null;
}
function bundlePrefix(source, pluginId, version) {
	return `${source}/${pluginId}/${version}`;
}
async function storeBundleInR2(storage, pluginId, version, bundle, source = "marketplace") {
	validatePluginIdentifier(pluginId, "plugin ID");
	validateVersion(version);
	const prefix = bundlePrefix(source, pluginId, version);
	await storage.upload({
		key: `${prefix}/manifest.json`,
		body: new TextEncoder().encode(JSON.stringify(bundle.manifest)),
		contentType: "application/json"
	});
	await storage.upload({
		key: `${prefix}/backend.js`,
		body: new TextEncoder().encode(bundle.backendCode),
		contentType: "application/javascript"
	});
	if (bundle.adminCode) await storage.upload({
		key: `${prefix}/admin.js`,
		body: new TextEncoder().encode(bundle.adminCode),
		contentType: "application/javascript"
	});
}
async function streamToText(stream) {
	return new Response(stream).text();
}
async function loadBundleFromR2(storage, pluginId, version, source = "marketplace") {
	validatePluginIdentifier(pluginId, "plugin ID");
	validateVersion(version);
	const prefix = bundlePrefix(source, pluginId, version);
	try {
		const manifestResult = await storage.download(`${prefix}/manifest.json`);
		const backendResult = await storage.download(`${prefix}/backend.js`);
		const manifestText = await streamToText(manifestResult.body);
		const backendCode = await streamToText(backendResult.body);
		const parsed = JSON.parse(manifestText);
		const result = pluginManifestSchema.safeParse(parsed);
		if (!result.success) return null;
		const manifest = reconcileManifestAccess(result.data);
		let adminCode;
		try {
			adminCode = await streamToText((await storage.download(`${prefix}/admin.js`)).body);
		} catch {}
		return {
			manifest,
			backendCode,
			adminCode
		};
	} catch {
		return null;
	}
}
async function deleteBundleFromR2(storage, pluginId, version, source = "marketplace") {
	validatePluginIdentifier(pluginId, "plugin ID");
	validateVersion(version);
	const prefix = bundlePrefix(source, pluginId, version);
	for (const file of [
		"manifest.json",
		"backend.js",
		"admin.js"
	]) try {
		await storage.delete(`${prefix}/${file}`);
	} catch {}
}
async function handleMarketplaceInstall(db, storage, sandboxRunner, marketplaceUrl, pluginId, opts) {
	const client = getClient(marketplaceUrl, opts?.siteOrigin);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	if (!storage) return {
		success: false,
		error: {
			code: "STORAGE_NOT_CONFIGURED",
			message: "Storage is required for marketplace plugin installation"
		}
	};
	if (!opts?.sandboxBypassed && (!sandboxRunner || !sandboxRunner.isAvailable())) return {
		success: false,
		error: {
			code: "SANDBOX_NOT_AVAILABLE",
			message: "Sandbox runner is required for marketplace plugins"
		}
	};
	try {
		const stateRepo = new PluginStateRepository(db);
		const existing = await stateRepo.get(pluginId);
		if (existing && existing.source === "marketplace") return {
			success: false,
			error: {
				code: "ALREADY_INSTALLED",
				message: `Plugin ${pluginId} is already installed`
			}
		};
		if (opts?.configuredPluginIds?.has(pluginId)) return {
			success: false,
			error: {
				code: "PLUGIN_ID_CONFLICT",
				message: `Cannot install marketplace plugin "${pluginId}" — a configured plugin with the same ID already exists`
			}
		};
		const pluginDetail = await client.getPlugin(pluginId);
		const version = opts?.version ?? pluginDetail.latestVersion?.version;
		if (!version) return {
			success: false,
			error: {
				code: "NO_VERSION",
				message: `No published versions found for plugin ${pluginId}`
			}
		};
		const versionMetadata = await resolveVersionMetadata(client, pluginId, pluginDetail, version);
		if (!versionMetadata) return {
			success: false,
			error: {
				code: "NO_VERSION",
				message: `Version ${version} was not found for plugin ${pluginId}`
			}
		};
		if (versionMetadata.auditVerdict === "fail" || versionMetadata.auditVerdict === "warn") return {
			success: false,
			error: {
				code: "AUDIT_FAILED",
				message: versionMetadata.auditVerdict === "fail" ? "Plugin failed security audit and cannot be installed" : "Plugin audit was inconclusive and cannot be installed until reviewed"
			}
		};
		const bundle = await client.downloadBundle(pluginId, version);
		if (versionMetadata.checksum && bundle.checksum !== versionMetadata.checksum) return {
			success: false,
			error: {
				code: "CHECKSUM_MISMATCH",
				message: "Bundle checksum does not match marketplace record. Download may be corrupted."
			}
		};
		const bundleIdentityError = validateBundleIdentity(bundle, pluginId, version);
		if (bundleIdentityError) return bundleIdentityError;
		if ((bundle.manifest.mcp?.tools.length ?? 0) > 0 && !opts?.confirmMcpTools) return {
			success: false,
			error: {
				code: "MCP_TOOL_CONSENT_REQUIRED",
				message: "Plugin MCP tools require explicit consent",
				details: { mcpTools: bundle.manifest.mcp?.tools.map(({ inputSchema: _, outputSchema: __, ...tool }) => tool) }
			}
		};
		await storeBundleInR2(storage, pluginId, version, bundle);
		await stateRepo.upsert(pluginId, version, "active", {
			source: "marketplace",
			marketplaceVersion: version,
			displayName: pluginDetail.name,
			description: pluginDetail.description ?? void 0
		});
		client.reportInstall(pluginId, version).catch(() => {});
		return {
			success: true,
			data: {
				pluginId,
				version,
				capabilities: bundle.manifest.capabilities
			}
		};
	} catch (err) {
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Plugin marketplace is currently unavailable"
			}
		};
		if (err instanceof MarketplaceError) return {
			success: false,
			error: {
				code: err.code ?? "MARKETPLACE_ERROR",
				message: err.message
			}
		};
		if (err instanceof EmDashStorageError) return {
			success: false,
			error: {
				code: err.code ?? "STORAGE_ERROR",
				message: "Storage error while installing plugin"
			}
		};
		if (err && typeof err === "object" && "code" in err) {
			const code = err.code;
			if (typeof code === "string" && code.trim()) return {
				success: false,
				error: {
					code,
					message: "Failed to install plugin from marketplace"
				}
			};
		}
		console.error("Failed to install marketplace plugin:", err);
		return {
			success: false,
			error: {
				code: "INSTALL_FAILED",
				message: "Failed to install plugin from marketplace"
			}
		};
	}
}
async function handleMarketplaceUpdate(db, storage, sandboxRunner, marketplaceUrl, pluginId, opts) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	if (!storage) return {
		success: false,
		error: {
			code: "STORAGE_NOT_CONFIGURED",
			message: "Storage is required"
		}
	};
	if (!opts?.sandboxBypassed && (!sandboxRunner || !sandboxRunner.isAvailable())) return {
		success: false,
		error: {
			code: "SANDBOX_NOT_AVAILABLE",
			message: "Sandbox runner is required"
		}
	};
	try {
		const stateRepo = new PluginStateRepository(db);
		const existing = await stateRepo.get(pluginId);
		if (!existing || existing.source !== "marketplace") return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `No marketplace plugin found: ${pluginId}`
			}
		};
		const oldVersion = existing.marketplaceVersion ?? existing.version;
		const pluginDetail = await client.getPlugin(pluginId);
		const newVersion = opts?.version ?? pluginDetail.latestVersion?.version;
		if (!newVersion) return {
			success: false,
			error: {
				code: "NO_VERSION",
				message: "No newer version available"
			}
		};
		if (newVersion === oldVersion) return {
			success: false,
			error: {
				code: "ALREADY_UP_TO_DATE",
				message: "Plugin is already up to date"
			}
		};
		const versionMetadata = await resolveVersionMetadata(client, pluginId, pluginDetail, newVersion);
		if (!versionMetadata) return {
			success: false,
			error: {
				code: "NO_VERSION",
				message: `Version ${newVersion} was not found for plugin ${pluginId}`
			}
		};
		const bundle = await client.downloadBundle(pluginId, newVersion);
		if (versionMetadata.checksum && bundle.checksum !== versionMetadata.checksum) return {
			success: false,
			error: {
				code: "CHECKSUM_MISMATCH",
				message: "Bundle checksum does not match marketplace record. Download may be corrupted."
			}
		};
		const bundleIdentityError = validateBundleIdentity(bundle, pluginId, newVersion);
		if (bundleIdentityError) return bundleIdentityError;
		const oldBundle = await loadBundleFromR2(storage, pluginId, oldVersion);
		const capabilityChanges = diffCapabilities(oldBundle?.manifest.capabilities ?? [], bundle.manifest.capabilities);
		if (capabilityChanges.added.length > 0 && !opts?.confirmCapabilityChanges) return {
			success: false,
			error: {
				code: "CAPABILITY_ESCALATION",
				message: "Plugin update requires new capabilities",
				details: { capabilityChanges }
			}
		};
		const routeVisibilityChanges = diffRouteVisibility(oldBundle?.manifest, bundle.manifest);
		const hasNewPublicRoutes = routeVisibilityChanges.newlyPublic.length > 0;
		if (hasNewPublicRoutes && !opts?.confirmRouteVisibilityChanges) return {
			success: false,
			error: {
				code: "ROUTE_VISIBILITY_ESCALATION",
				message: "Plugin update exposes new public (unauthenticated) routes",
				details: {
					routeVisibilityChanges,
					capabilityChanges
				}
			}
		};
		const oldMcpTools = [...oldBundle?.manifest.mcp?.tools ?? []].toSorted((a, b) => a.name.localeCompare(b.name));
		const newMcpTools = [...bundle.manifest.mcp?.tools ?? []].toSorted((a, b) => a.name.localeCompare(b.name));
		if (JSON.stringify(oldMcpTools) !== JSON.stringify(newMcpTools) && !opts?.confirmMcpTools) return {
			success: false,
			error: {
				code: "MCP_TOOL_CONSENT_REQUIRED",
				message: "Plugin update changes its MCP tools",
				details: { mcpTools: newMcpTools.map(({ inputSchema: _, outputSchema: __, ...tool }) => tool) }
			}
		};
		await storeBundleInR2(storage, pluginId, newVersion, bundle);
		await stateRepo.upsert(pluginId, newVersion, "active", {
			source: "marketplace",
			marketplaceVersion: newVersion,
			displayName: pluginDetail.name,
			description: pluginDetail.description ?? void 0,
			mcpToolsEnabled: false,
			mcpToolsConsent: null
		});
		deleteBundleFromR2(storage, pluginId, oldVersion).catch(() => {});
		return {
			success: true,
			data: {
				pluginId,
				oldVersion,
				newVersion,
				capabilityChanges,
				routeVisibilityChanges: hasNewPublicRoutes ? routeVisibilityChanges : void 0
			}
		};
	} catch (err) {
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		if (err instanceof MarketplaceError) return {
			success: false,
			error: {
				code: err.code ?? "MARKETPLACE_ERROR",
				message: err.message
			}
		};
		console.error("Failed to update marketplace plugin:", err);
		return {
			success: false,
			error: {
				code: "UPDATE_FAILED",
				message: "Failed to update plugin"
			}
		};
	}
}
async function handleMarketplaceUninstall(db, storage, pluginId, opts) {
	try {
		const stateRepo = new PluginStateRepository(db);
		const existing = await stateRepo.get(pluginId);
		if (!existing || existing.source !== "marketplace") return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `No marketplace plugin found: ${pluginId}`
			}
		};
		const version = existing.marketplaceVersion ?? existing.version;
		if (storage) await deleteBundleFromR2(storage, pluginId, version);
		let dataDeleted = false;
		if (opts?.deleteData) try {
			await db.deleteFrom("_plugin_storage").where("plugin_id", "=", pluginId).execute();
			dataDeleted = true;
		} catch {}
		await stateRepo.delete(pluginId);
		return {
			success: true,
			data: {
				pluginId,
				dataDeleted
			}
		};
	} catch (err) {
		console.error("Failed to uninstall marketplace plugin:", err);
		return {
			success: false,
			error: {
				code: "UNINSTALL_FAILED",
				message: "Failed to uninstall plugin"
			}
		};
	}
}
async function handleMarketplaceUpdateCheck(db, marketplaceUrl) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	try {
		const marketplacePlugins = await new PluginStateRepository(db).getMarketplacePlugins();
		const items = [];
		for (const plugin of marketplacePlugins) try {
			const detail = await client.getPlugin(plugin.pluginId);
			const latest = detail.latestVersion?.version;
			const installed = plugin.marketplaceVersion ?? plugin.version;
			if (!latest) continue;
			const hasUpdate = latest !== installed;
			let capabilityChanges;
			let hasCapabilityChanges = false;
			if (hasUpdate && detail.latestVersion) {
				capabilityChanges = diffCapabilities(detail.capabilities ?? [], detail.latestVersion.capabilities ?? []);
				hasCapabilityChanges = capabilityChanges.added.length > 0 || capabilityChanges.removed.length > 0;
			}
			items.push({
				pluginId: plugin.pluginId,
				installed,
				latest: latest ?? installed,
				hasUpdate,
				hasCapabilityChanges,
				capabilityChanges: hasCapabilityChanges ? capabilityChanges : void 0,
				hasRouteVisibilityChanges: false
			});
		} catch (err) {
			console.warn(`Failed to check updates for ${plugin.pluginId}:`, err);
		}
		return {
			success: true,
			data: { items }
		};
	} catch (err) {
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		console.error("Failed to check marketplace updates:", err);
		return {
			success: false,
			error: {
				code: "UPDATE_CHECK_FAILED",
				message: "Failed to check for updates"
			}
		};
	}
}
async function handleMarketplaceSearch(marketplaceUrl, query, opts) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	try {
		return {
			success: true,
			data: await client.search(query, opts)
		};
	} catch (err) {
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		console.error("Failed to search marketplace:", err);
		return {
			success: false,
			error: {
				code: "SEARCH_FAILED",
				message: "Failed to search marketplace"
			}
		};
	}
}
async function handleMarketplaceGetPlugin(marketplaceUrl, pluginId) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	try {
		return {
			success: true,
			data: await client.getPlugin(pluginId)
		};
	} catch (err) {
		if (err instanceof MarketplaceError && err.status === 404) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Plugin not found: ${pluginId}`
			}
		};
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		console.error("Failed to get marketplace plugin:", err);
		return {
			success: false,
			error: {
				code: "GET_PLUGIN_FAILED",
				message: "Failed to get plugin details"
			}
		};
	}
}
async function handleThemeSearch(marketplaceUrl, query, opts) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	try {
		return {
			success: true,
			data: await client.searchThemes(query, opts)
		};
	} catch (err) {
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		console.error("Failed to search themes:", err);
		return {
			success: false,
			error: {
				code: "THEME_SEARCH_FAILED",
				message: "Failed to search themes"
			}
		};
	}
}
async function handleThemeGetDetail(marketplaceUrl, themeId) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	try {
		return {
			success: true,
			data: await client.getTheme(themeId)
		};
	} catch (err) {
		if (err instanceof MarketplaceError && err.status === 404) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Theme not found: ${themeId}`
			}
		};
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		console.error("Failed to get marketplace theme:", err);
		return {
			success: false,
			error: {
				code: "GET_THEME_FAILED",
				message: "Failed to get theme details"
			}
		};
	}
}
function canonicalCapabilitiesForDriftCheck(value) {
	if (!Array.isArray(value)) return [];
	const seen = /* @__PURE__ */ new Set();
	for (const entry of value) if (typeof entry === "string" && entry.length > 0) seen.add(entry);
	return [...seen].toSorted();
}
function releaseExemptFromMinimumAge(exclude, publisherDid, slug) {
	if (!exclude || exclude.length === 0) return false;
	const didLower = publisherDid.toLowerCase();
	const fullDid = `${didLower}/${slug.toLowerCase()}`;
	for (const entry of exclude) {
		if (entry === didLower) return true;
		if (entry === fullDid) return true;
	}
	return false;
}
var DURATION_PATTERN = /^(\d+)(s|m|h|d|w)$/;
var TRAILING_SLASHES = /\/+$/;
var TRAILING_DOT$1 = /\.$/;
function parseDurationSeconds(duration) {
	if (typeof duration === "number") {
		if (!Number.isFinite(duration) || duration < 0) throw new Error(`Invalid duration: ${duration} (must be a non-negative finite number)`);
		return Math.floor(duration);
	}
	const match = duration.match(DURATION_PATTERN);
	if (!match) throw new Error(`Invalid duration format: "${duration}". Use a duration string like "48h", "7d", "30m", or a number of seconds.`);
	const value = parseInt(match[1], 10);
	const unit = match[2];
	switch (unit) {
		case "s": return value;
		case "m": return value * 60;
		case "h": return value * 60 * 60;
		case "d": return value * 24 * 60 * 60;
		case "w": return value * 7 * 24 * 60 * 60;
		default: throw new Error(`Unknown duration unit: ${unit}`);
	}
}
function validateAggregatorUrl(aggregatorUrl) {
	let parsed;
	try {
		parsed = new URL(aggregatorUrl);
	} catch {
		throw new Error(`registry.aggregatorUrl is not a valid URL: ${aggregatorUrl}`);
	}
	if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new Error(`registry.aggregatorUrl must use http or https: ${aggregatorUrl}`);
	if (parsed.username || parsed.password) throw new Error("registry.aggregatorUrl must not contain embedded credentials (user:pass@)");
	const rawHostname = parsed.hostname.toLowerCase().replace(TRAILING_DOT$1, "");
	const hostname = rawHostname.startsWith("[") && rawHostname.endsWith("]") ? rawHostname.slice(1, -1) : rawHostname;
	const isLocalhost = hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "127.0.0.1" || hostname === "::1" || hostname.startsWith("::ffff:127.") || hostname.startsWith("::ffff:7f00:");
	if (parsed.protocol === "http:") throw new Error(`registry.aggregatorUrl must use https in production: ${aggregatorUrl}`);
	if (isLocalhost) throw new Error(`registry.aggregatorUrl points at localhost; allowed only in dev: ${aggregatorUrl}`);
	return parsed;
}
function coerceRegistryConfig(input) {
	if (input === void 0) return void 0;
	if (typeof input === "string") return { aggregatorUrl: input };
	return input;
}
function normalizeRegistryConfig(input) {
	const config = coerceRegistryConfig(input);
	if (!config) return null;
	const aggregatorUrl = config.aggregatorUrl?.trim();
	if (!aggregatorUrl) throw new Error("registry.aggregatorUrl is required when registry is configured");
	validateAggregatorUrl(aggregatorUrl);
	const out = { aggregatorUrl: aggregatorUrl.replace(TRAILING_SLASHES, "") };
	if (config.acceptLabelers) out.acceptLabelers = config.acceptLabelers;
	const policy = {};
	let hasPolicy = false;
	if (config.policy?.minimumReleaseAge !== void 0) {
		policy.minimumReleaseAgeSeconds = parseDurationSeconds(config.policy.minimumReleaseAge);
		hasPolicy = true;
	}
	if (config.policy?.minimumReleaseAgeExclude !== void 0) {
		const list = config.policy.minimumReleaseAgeExclude.map((entry) => {
			const trimmed = entry.trim();
			if (!trimmed) throw new Error("registry.policy.minimumReleaseAgeExclude entries cannot be empty");
			return trimmed.toLowerCase();
		});
		if (list.length > 0) {
			policy.minimumReleaseAgeExclude = list;
			hasPolicy = true;
		}
	}
	if (hasPolicy) out.policy = policy;
	return out;
}
var HASH_LENGTH = 16;
var BASE32_ALPHABET = "abcdefghijklmnopqrstuvwxyz234567";
function base32Encode(bytes) {
	let bits = 0;
	let value = 0;
	let out = "";
	for (const byte of bytes) {
		value = value << 8 | byte;
		bits += 8;
		while (bits >= 5) {
			bits -= 5;
			out += BASE32_ALPHABET[value >>> bits & 31];
		}
	}
	if (bits > 0) out += BASE32_ALPHABET[value << 5 - bits & 31];
	return out;
}
async function makeRegistryPluginId(publisherDid, slug) {
	const did = publisherDid.trim();
	const s = slug.trim();
	if (!did) throw new Error("makeRegistryPluginId: publisherDid is required");
	if (!s) throw new Error("makeRegistryPluginId: slug is required");
	const input = `${did}
${s}`;
	const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
	return `r_${base32Encode(new Uint8Array(hashBuffer)).slice(0, HASH_LENGTH)}`;
}
var RELEASE_EXTENSION_NSID = "com.emdashcms.experimental.package.releaseExtension";
function enforcedAccessEqual(a, b) {
	const aa = declaredAccessToCapabilities$1(a);
	const bb = declaredAccessToCapabilities$1(b);
	return JSON.stringify(aa.capabilities.toSorted()) === JSON.stringify(bb.capabilities.toSorted()) && JSON.stringify(aa.allowedHosts.toSorted()) === JSON.stringify(bb.allowedHosts.toSorted());
}
var SHA256_HEX_PATTERN = /^[a-f0-9]{64}$/i;
async function sha256Hex(bytes) {
	const buf = await crypto.subtle.digest("SHA-256", bytes);
	const arr = new Uint8Array(buf);
	return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}
var MULTIHASH_SHA256_CODE = 18;
var MULTIHASH_SHA256_LENGTH = 32;
async function sha256MultibaseMultihash(bytes) {
	const digestBuf = await crypto.subtle.digest("SHA-256", bytes);
	const digest = new Uint8Array(digestBuf);
	const multihash = new Uint8Array(2 + digest.length);
	multihash[0] = MULTIHASH_SHA256_CODE;
	multihash[1] = MULTIHASH_SHA256_LENGTH;
	multihash.set(digest, 2);
	const { toBase32 } = await import("@atcute/multibase");
	return `b${toBase32(multihash)}`;
}
async function verifyChecksum(bytes, checksum) {
	if (SHA256_HEX_PATTERN.test(checksum)) {
		const actual = await sha256Hex(bytes);
		return checksum.toLowerCase() === actual;
	}
	if (checksum.length === 56 && checksum.startsWith("b")) return (await sha256MultibaseMultihash(bytes)).toLowerCase() === checksum.toLowerCase();
	return false;
}
var MAX_ARTIFACT_BYTES = 524288;
var MAX_REDIRECTS = 5;
var ARTIFACT_FETCH_TIMEOUT_MS = 15e3;
var ARTIFACT_TOTAL_BUDGET_MS = 45e3;
var MAX_MIRRORS = 16;
var AGGREGATOR_REQUEST_TIMEOUT_MS = 15e3;
var AGGREGATOR_TOTAL_BUDGET_MS = 3e4;
function timedFetch(totalDeadline) {
	return (input, init) => {
		const remaining = Math.max(0, totalDeadline - Date.now());
		if (remaining === 0) return Promise.reject(/* @__PURE__ */ new Error("Aggregator request budget exhausted"));
		const timeout = Math.min(AGGREGATOR_REQUEST_TIMEOUT_MS, remaining);
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), timeout);
		const callerSignal = init?.signal;
		if (callerSignal) if (callerSignal.aborted) controller.abort(callerSignal.reason);
		else callerSignal.addEventListener("abort", () => controller.abort(callerSignal.reason));
		return fetch(input, {
			...init,
			signal: controller.signal
		}).finally(() => {
			clearTimeout(timer);
		});
	};
}
var FORBIDDEN_HOSTNAMES = /* @__PURE__ */ new Set([
	"localhost",
	"localhost.localdomain",
	"ip6-localhost",
	"ip6-loopback"
]);
var TRAILING_DOT = /\.$/;
function isLocalhostHostname(hostname) {
	const stripped = hostname.toLowerCase().replace(TRAILING_DOT, "");
	const h = stripped.startsWith("[") && stripped.endsWith("]") ? stripped.slice(1, -1) : stripped;
	if (FORBIDDEN_HOSTNAMES.has(h)) return true;
	if (h === "localhost") return true;
	if (h.endsWith(".localhost")) return true;
	if (h === "127.0.0.1" || h === "::1") return true;
	if (h.startsWith("::ffff:127.") || h.startsWith("::ffff:7f00:")) return true;
	return false;
}
async function assertSafeArtifactUrl(urlString) {
	let url;
	try {
		url = new URL(urlString);
	} catch {
		throw new Error(`Invalid artifact URL: ${urlString}`);
	}
	if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error(`Artifact URL protocol not allowed: ${url.protocol}`);
	if (url.username || url.password) throw new Error("Artifact URL must not contain embedded credentials");
	const rawHostname = url.hostname.toLowerCase().replace(TRAILING_DOT, "");
	const hostname = rawHostname.startsWith("[") && rawHostname.endsWith("]") ? rawHostname.slice(1, -1) : rawHostname;
	const localhost = isLocalhostHostname(hostname);
	if (url.protocol === "http:") throw new Error("Artifact URL must use https");
	if (localhost) throw new Error(`Artifact URL points to localhost: ${hostname}`);
	if (localhost) return url;
	try {
		return await resolveAndValidateExternalUrl(url.href);
	} catch (err) {
		if (err instanceof SsrfError) throw new Error(`Artifact URL rejected: ${err.message}`, { cause: err });
		throw err;
	}
}
async function fetchWithLimits(initialUrl, totalDeadline) {
	const remaining = Math.max(0, totalDeadline - Date.now());
	if (remaining === 0) throw new Error("Artifact download budget exhausted");
	const perUrlTimeout = Math.min(ARTIFACT_FETCH_TIMEOUT_MS, remaining);
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), perUrlTimeout);
	try {
		let current = await assertSafeArtifactUrl(initialUrl);
		let response;
		for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
			response = await fetch(current.href, {
				redirect: "manual",
				signal: controller.signal
			});
			if (response.status < 300 || response.status >= 400) break;
			const location = response.headers.get("location");
			if (!location) break;
			if (hop === MAX_REDIRECTS) throw new Error(`Too many redirects fetching artifact (>${MAX_REDIRECTS})`);
			current = await assertSafeArtifactUrl(new URL(location, current).href);
		}
		const finalResponse = response;
		if (!finalResponse.ok) throw new Error(`HTTP ${finalResponse.status}`);
		const lengthHeader = finalResponse.headers.get("content-length");
		if (lengthHeader) {
			const declared = Number(lengthHeader);
			if (Number.isFinite(declared) && declared > MAX_ARTIFACT_BYTES) throw new Error(`Artifact too large (declared ${declared} bytes, limit ${MAX_ARTIFACT_BYTES})`);
		}
		const body = finalResponse.body;
		if (!body) {
			const buf = new Uint8Array(await finalResponse.arrayBuffer());
			if (buf.byteLength > MAX_ARTIFACT_BYTES) throw new Error(`Artifact too large (limit ${MAX_ARTIFACT_BYTES} bytes)`);
			return buf;
		}
		const reader = body.getReader();
		const chunks2 = [];
		let total = 0;
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			if (!value) continue;
			total += value.byteLength;
			if (total > MAX_ARTIFACT_BYTES) {
				try {
					await reader.cancel();
				} catch {}
				throw new Error(`Artifact too large (limit ${MAX_ARTIFACT_BYTES} bytes)`);
			}
			chunks2.push(value);
		}
		const out = new Uint8Array(total);
		let offset = 0;
		for (const chunk of chunks2) {
			out.set(chunk, offset);
			offset += chunk.byteLength;
		}
		return out;
	} finally {
		clearTimeout(timer);
	}
}
function redactUrlForError(raw) {
	try {
		const u = new URL(raw);
		return `${u.origin}${u.pathname}`;
	} catch {
		return "<malformed url>";
	}
}
async function fetchArtifact(mirrors, declaredUrl) {
	const urls = [...mirrors.slice(0, MAX_MIRRORS), declaredUrl];
	const clientErrors = [];
	const totalDeadline = Date.now() + ARTIFACT_TOTAL_BUDGET_MS;
	for (const url of urls) {
		if (Date.now() >= totalDeadline) {
			clientErrors.push("(total artifact download budget exhausted)");
			break;
		}
		try {
			return await fetchWithLimits(url, totalDeadline);
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			console.warn(`[registry-install] Artifact fetch failed from ${url}:`, message);
			clientErrors.push(`${redactUrlForError(url)}: ${message}`);
		}
	}
	throw new Error(`Failed to download artifact from any source. Tried:
  ${clientErrors.join("\n  ")}`);
}
function assertEnvCompatible(requires, hostEnv) {
	for (const skipped of findSkippedEnvConstraints(requires, hostEnv)) console.warn(`[registry] env compatibility constraint skipped: ${skipped.key} requires ${skipped.required} but host version is ${skipped.reason}`);
	const mismatches = checkEnvCompatibility(requires, hostEnv);
	if (mismatches.length === 0) return null;
	const guarded = {};
	for (const m of mismatches) guarded[m.key] = m.required;
	return {
		code: "ENV_INCOMPATIBLE",
		message: `This release is not compatible with the current environment: ${mismatches.map((m) => `${m.key} requires ${m.required} but host is ${m.host}`).join("; ")}.`,
		details: {
			requires: guarded,
			host: hostEnv
		}
	};
}
async function handleRegistryInstall(db, storage, sandboxRunner, registryConfigInput, input, opts) {
	const registryConfig = coerceRegistryConfig(registryConfigInput);
	if (!registryConfig) return {
		success: false,
		error: {
			code: "REGISTRY_NOT_CONFIGURED",
			message: "Registry is not configured"
		}
	};
	if (!storage) return {
		success: false,
		error: {
			code: "STORAGE_NOT_CONFIGURED",
			message: "Storage is required for registry plugin installation"
		}
	};
	if (!sandboxRunner || !sandboxRunner.isAvailable()) return {
		success: false,
		error: {
			code: "SANDBOX_NOT_AVAILABLE",
			message: "Sandbox runner is required for registry plugins"
		}
	};
	try {
		validateAggregatorUrl(registryConfig.aggregatorUrl);
	} catch (err) {
		return {
			success: false,
			error: {
				code: "REGISTRY_NOT_CONFIGURED",
				message: err instanceof Error ? err.message : "Invalid aggregator URL"
			}
		};
	}
	const { did, slug, version: requestedVersion } = input;
	const { DiscoveryClient } = await import("@emdash-cms/registry-client/discovery");
	const aggregatorDeadline = Date.now() + AGGREGATOR_TOTAL_BUDGET_MS;
	const discovery = new DiscoveryClient({
		aggregatorUrl: registryConfig.aggregatorUrl,
		acceptLabelers: registryConfig.acceptLabelers,
		fetch: timedFetch(aggregatorDeadline)
	});
	if (!did.startsWith("did:") || did.split(":").length < 3) return {
		success: false,
		error: {
			code: "INVALID_DID",
			message: "DID must be a valid atproto DID (e.g. did:plc:abc123)"
		}
	};
	try {
		const publisherDid = did;
		const packageView = await discovery.getPackage({
			did: publisherDid,
			slug
		});
		const MAX_LIST_PAGES = 20;
		const releaseView = await (async () => {
			if (!requestedVersion) return discovery.getLatestRelease({
				did: publisherDid,
				package: slug
			});
			let cursor;
			const seenCursors = /* @__PURE__ */ new Set();
			for (let page = 0; page < MAX_LIST_PAGES; page++) {
				if (cursor !== void 0) {
					if (seenCursors.has(cursor)) break;
					seenCursors.add(cursor);
				}
				const result = await discovery.listReleases({
					did: publisherDid,
					package: slug,
					cursor,
					limit: 50
				});
				for (const r of result.releases) if (r.version === requestedVersion) return r;
				if (!result.cursor) break;
				cursor = result.cursor;
			}
		})();
		if (!releaseView) return {
			success: false,
			error: {
				code: "NO_RELEASE",
				message: requestedVersion ? `Version ${requestedVersion} not found for ${publisherDid}/${slug}` : `No installable release found for ${publisherDid}/${slug}`
			}
		};
		const signedRelease = releaseView.release;
		if (packageView.did !== publisherDid || packageView.slug !== slug) return {
			success: false,
			error: {
				code: "AGGREGATOR_IDENTITY_MISMATCH",
				message: "Aggregator returned a package view for a different publisher or slug."
			}
		};
		if (releaseView.did !== publisherDid || releaseView.package !== slug || signedRelease?.package !== slug || requestedVersion !== void 0 && releaseView.version !== requestedVersion || signedRelease?.version !== releaseView.version) return {
			success: false,
			error: {
				code: "AGGREGATOR_IDENTITY_MISMATCH",
				message: "Aggregator returned a release view that does not match the requested package or version."
			}
		};
		const version = releaseView.version;
		const yanked = (packageView.labels ?? []).some((l) => l.val === "security:yanked");
		const releaseYanked = (releaseView.labels ?? []).some((l) => l.val === "security:yanked");
		if (yanked || releaseYanked) return {
			success: false,
			error: {
				code: "RELEASE_YANKED",
				message: "This release has been withdrawn (security:yanked label)."
			}
		};
		if (opts?.hostEnv) {
			const envError = assertEnvCompatible(releaseView.release?.requires, opts.hostEnv);
			if (envError) return {
				success: false,
				error: envError
			};
		}
		const minimumReleaseAge = registryConfig.policy?.minimumReleaseAge;
		let minimumReleaseAgeSeconds = 0;
		if (minimumReleaseAge !== void 0) try {
			minimumReleaseAgeSeconds = parseDurationSeconds(minimumReleaseAge);
		} catch (err) {
			return {
				success: false,
				error: {
					code: "REGISTRY_POLICY_INVALID",
					message: err instanceof Error ? err.message : "Invalid minimumReleaseAge value in registry config"
				}
			};
		}
		if (minimumReleaseAgeSeconds > 0) {
			const exclude = registryConfig.policy?.minimumReleaseAgeExclude?.map((e) => e.trim().toLowerCase());
			if (!releaseExemptFromMinimumAge(exclude, publisherDid, slug)) {
				const indexedAt = Date.parse(releaseView.indexedAt);
				if (!Number.isFinite(indexedAt)) return {
					success: false,
					error: {
						code: "RELEASE_TIMESTAMP_INVALID",
						message: "Release record is missing a valid indexed-at timestamp; cannot evaluate minimum release age policy."
					}
				};
				const ageSeconds = (Date.now() - indexedAt) / 1e3;
				if (ageSeconds < minimumReleaseAgeSeconds) {
					const remaining = Math.ceil(minimumReleaseAgeSeconds - ageSeconds);
					return {
						success: false,
						error: {
							code: "RELEASE_TOO_NEW",
							message: `This release does not meet the configured minimum release age of ${minimumReleaseAgeSeconds}s. It will be installable in ~${remaining}s.`
						}
					};
				}
			}
		}
		const pluginId = await makeRegistryPluginId(publisherDid, slug);
		if (opts?.configuredPluginIds?.has(pluginId)) return {
			success: false,
			error: {
				code: "PLUGIN_ID_CONFLICT",
				message: "A configured plugin with the same derived id already exists"
			}
		};
		const stateRepo = new PluginStateRepository(db);
		const existing = await stateRepo.get(pluginId);
		if (existing) {
			if (existing.source === "registry") return {
				success: false,
				error: {
					code: "ALREADY_INSTALLED",
					message: `Plugin ${publisherDid}/${slug} is already installed`
				}
			};
			return {
				success: false,
				error: {
					code: "PLUGIN_ID_COLLISION",
					message: `A non-registry plugin already exists at the derived id ${pluginId}. Uninstall it before installing this registry plugin.`
				}
			};
		}
		const release = releaseView.release;
		const declaredUrl = release?.artifacts?.package?.url;
		const declaredChecksum = release?.artifacts?.package?.checksum;
		if (!declaredUrl || !declaredChecksum) return {
			success: false,
			error: {
				code: "INVALID_RELEASE",
				message: "Release record is missing artifact url or checksum"
			}
		};
		const artifactBytes = await fetchArtifact(releaseView.mirrors ?? [], declaredUrl);
		if (!await verifyChecksum(artifactBytes, declaredChecksum)) return {
			success: false,
			error: {
				code: "CHECKSUM_MISMATCH",
				message: "Artifact bytes do not match the release record's checksum, or the checksum encoding is unsupported."
			}
		};
		let bundle;
		try {
			bundle = await extractBundle(artifactBytes);
		} catch (err) {
			return {
				success: false,
				error: {
					code: "INVALID_BUNDLE",
					message: err instanceof Error ? err.message : "Failed to extract plugin bundle"
				}
			};
		}
		if (bundle.manifest.version !== version) return {
			success: false,
			error: {
				code: "MANIFEST_VERSION_MISMATCH",
				message: `Bundle manifest version (${bundle.manifest.version}) does not match release version (${version})`
			}
		};
		if (bundle.manifest.id !== slug) return {
			success: false,
			error: {
				code: "MANIFEST_ID_MISMATCH",
				message: `Bundle manifest id (${bundle.manifest.id}) does not match registry slug (${slug})`
			}
		};
		bundle.manifest = {
			...bundle.manifest,
			id: pluginId
		};
		const recordExt = release?.extensions?.[RELEASE_EXTENSION_NSID];
		if (!enforcedAccessEqual(recordExt?.declaredAccess ?? {}, bundle.manifest.declaredAccess ?? {})) return {
			success: false,
			error: {
				code: "DECLARED_ACCESS_DRIFT",
				message: "The plugin bundle declares different permissions than its published record. Installation refused."
			}
		};
		const actualCapabilities = canonicalCapabilitiesForDriftCheck(bundle.manifest.capabilities);
		if (actualCapabilities.length > 0) {
			if (input.acknowledgedDeclaredAccess === void 0) return {
				success: false,
				error: {
					code: "DECLARED_ACCESS_REQUIRED",
					message: "This plugin declares capabilities that require consent. Re-open the install dialog to review and acknowledge them."
				}
			};
			const acknowledged = canonicalCapabilitiesForDriftCheck(input.acknowledgedDeclaredAccess);
			if (acknowledged.length !== actualCapabilities.length || acknowledged.some((cap, i) => cap !== actualCapabilities[i])) return {
				success: false,
				error: {
					code: "DECLARED_ACCESS_DRIFT",
					message: "Plugin manifest has changed since you consented. Re-open the install dialog to review the new permissions."
				}
			};
		}
		const actualMcpTools = (bundle.manifest.mcp?.tools ?? []).map(({ inputSchema: _, outputSchema: __, ...tool }) => tool);
		if (actualMcpTools.length > 0) {
			if (JSON.stringify(input.acknowledgedMcpTools) !== JSON.stringify(actualMcpTools)) return {
				success: false,
				error: {
					code: "MCP_TOOL_CONSENT_REQUIRED",
					message: "Plugin MCP tools require explicit consent",
					details: { mcpTools: actualMcpTools }
				}
			};
		}
		await storeBundleInR2(storage, pluginId, version, bundle, "registry");
		const profile = packageView.profile;
		try {
			await stateRepo.upsert(pluginId, version, "active", {
				source: "registry",
				displayName: profile?.name ?? slug,
				description: profile?.description ?? void 0,
				registryPublisherDid: publisherDid,
				registrySlug: slug
			});
		} catch (stateErr) {
			let lostRace = false;
			try {
				const winner = await stateRepo.get(pluginId);
				lostRace = winner !== void 0 && winner !== null;
			} catch (probeErr) {
				console.warn(`[registry-install] Failed to probe state row for ${pluginId} after state-write failure; treating as orphan:`, probeErr);
			}
			if (!lostRace) try {
				await deleteBundleFromR2(storage, pluginId, version, "registry");
			} catch (cleanupErr) {
				console.warn(`[registry-install] Failed to clean up R2 bundle for ${pluginId}@${version} after state-row write failure:`, cleanupErr);
			}
			throw stateErr;
		}
		return {
			success: true,
			data: {
				pluginId,
				publisherDid,
				slug,
				version,
				capabilities: bundle.manifest.capabilities
			}
		};
	} catch (err) {
		if (err instanceof ClientValidationError) return {
			success: false,
			error: {
				code: "AGGREGATOR_RESPONSE_INVALID",
				message: `Aggregator returned a response that does not conform to its lexicon (${err.target})`
			}
		};
		if (err instanceof ClientResponseError) return {
			success: false,
			error: {
				code: err.status === 404 ? "AGGREGATOR_NOT_FOUND" : "AGGREGATOR_HTTP_ERROR",
				message: `Aggregator returned ${err.status}: ${err.error}`
			}
		};
		if (err instanceof EmDashStorageError) return {
			success: false,
			error: {
				code: err.code ?? "STORAGE_ERROR",
				message: "Storage error while installing plugin"
			}
		};
		console.error("[registry-install] Failed:", err);
		return {
			success: false,
			error: {
				code: "INSTALL_FAILED",
				message: err instanceof Error ? err.message : "Failed to install plugin from registry"
			}
		};
	}
}
async function handleRegistryUpdateCheck(db, registryConfigInput) {
	const registryConfig = coerceRegistryConfig(registryConfigInput);
	if (!registryConfig) return {
		success: false,
		error: {
			code: "REGISTRY_NOT_CONFIGURED",
			message: "Registry is not configured"
		}
	};
	try {
		const registryPlugins = await new PluginStateRepository(db).getRegistryPlugins();
		if (registryPlugins.length === 0) return {
			success: true,
			data: { items: [] }
		};
		const { DiscoveryClient } = await import("@emdash-cms/registry-client/discovery");
		const aggregatorDeadline = Date.now() + AGGREGATOR_TOTAL_BUDGET_MS;
		const discovery = new DiscoveryClient({
			aggregatorUrl: registryConfig.aggregatorUrl,
			acceptLabelers: registryConfig.acceptLabelers,
			fetch: timedFetch(aggregatorDeadline)
		});
		const items = [];
		for (const plugin of registryPlugins) {
			if (!plugin.registryPublisherDid || !plugin.registrySlug) continue;
			try {
				const latest = (await discovery.getLatestRelease({
					did: plugin.registryPublisherDid,
					package: plugin.registrySlug
				})).version;
				if (!latest) continue;
				const installed = plugin.version;
				items.push({
					pluginId: plugin.pluginId,
					installed,
					latest,
					hasUpdate: latest !== installed,
					hasCapabilityChanges: false,
					hasRouteVisibilityChanges: false
				});
			} catch (err) {
				console.warn(`[registry-update-check] Skipped ${plugin.pluginId}:`, err);
			}
		}
		return {
			success: true,
			data: { items }
		};
	} catch (err) {
		if (err instanceof ClientValidationError) return {
			success: false,
			error: {
				code: "AGGREGATOR_RESPONSE_INVALID",
				message: `Aggregator returned a response that does not conform to its lexicon (${err.target})`
			}
		};
		if (err instanceof ClientResponseError) return {
			success: false,
			error: {
				code: err.status === 404 ? "AGGREGATOR_NOT_FOUND" : "AGGREGATOR_HTTP_ERROR",
				message: `Aggregator returned ${err.status}: ${err.error}`
			}
		};
		console.error("[registry-update-check] Failed:", err);
		return {
			success: false,
			error: {
				code: "UPDATE_CHECK_FAILED",
				message: "Failed to check for registry updates"
			}
		};
	}
}
//#endregion
export { handleSchemaFieldCreate as $, handleMediaCreate as A, handlePluginList as B, handleContentUpdate as C, handleMarketplaceUninstall as D, handleMarketplaceSearch as E, handleOrphanedTableList as F, handleRevisionGet as G, handlePluginSettingsUpdate as H, handleOrphanedTableRegister as I, handleSchemaCollectionCreate as J, handleRevisionList as K, handlePluginDisable as L, handleMediaGet as M, handleMediaList as N, handleMarketplaceUpdate as O, handleMediaUpdate as P, handleSchemaCollectionUpdate as Q, handlePluginEnable as R, handleContentUnschedule as S, handleMarketplaceInstall as T, handleRegistryInstall as U, handlePluginSettingsGet as V, handleRegistryUpdateCheck as W, handleSchemaCollectionGet as X, handleSchemaCollectionDelete as Y, handleSchemaCollectionList as Z, handleContentPublish as _, handleContentCompare as a, handleThemeGetDetail as at, handleContentTranslations as b, handleContentCreate as c, normalizeRegistryConfig as ct, handleContentDuplicate as d, EmDashStorageError as dt, handleSchemaFieldDelete as et, handleContentGet as f, SeoRepository as ft, handleContentPermanentDelete as g, handleContentListTrashed as h, handleContentAuthors as i, handleSchemaFieldUpdate as it, handleMediaDelete as j, handleMarketplaceUpdateCheck as k, handleContentDelete as l, validateAggregatorUrl as lt, handleContentList as m, coerceRegistryConfig as n, handleSchemaFieldList as nt, handleContentCountScheduled as o, handleThemeSearch as ot, handleContentGetIncludingTrashed as p, handleRevisionRestore as q, getPluginSettingsSchema as r, handleSchemaFieldReorder as rt, handleContentCountTrashed as s, loadBundleFromR2 as st, assertSafeArtifactUrl as t, handleSchemaFieldGet as tt, handleContentDiscardDraft as u, validateRev as ut, handleContentRestore as v, handleMarketplaceGetPlugin as w, handleContentUnpublish as x, handleContentSchedule as y, handlePluginGet as z };
