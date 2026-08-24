import { z } from "zod";
//#region node_modules/emdash/dist/media-kIV1IxFf.mjs
/** Valid role level values */
var VALID_ROLE_LEVELS = /* @__PURE__ */ new Set([
	10,
	20,
	30,
	40,
	50
]);
/** Role level — coerces string/number to valid RoleLevel (10|20|30|40|50) */
var roleLevel = z.coerce.number().int().refine((n) => VALID_ROLE_LEVELS.has(n), { message: "Invalid role level. Must be 10, 20, 30, 40, or 50" });
/** Pagination query params — cursor-based */
var cursorPaginationQuery = z.object({
	cursor: z.string().max(2048).optional().meta({ description: "Opaque cursor for pagination" }),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50).meta({ description: "Maximum number of items to return (1-100, default 50)" })
}).meta({ id: "CursorPaginationQuery" });
z.object({
	limit: z.coerce.number().int().min(1).max(100).optional().default(50),
	offset: z.coerce.number().int().min(0).optional().default(0)
}).meta({ id: "OffsetPaginationQuery" });
/** Slug pattern: lowercase letters, digits, underscores; starts with letter */
var slugPattern = /^[a-z][a-z0-9_]*$/;
/** Matches http(s) scheme at start of URL */
var HTTP_SCHEME_RE = /^https?:\/\//i;
/** Validates that a URL string uses http or https scheme. Rejects javascript:/data: URI XSS vectors. */
var httpUrl = z.string().url().refine((url) => HTTP_SCHEME_RE.test(url), "URL must use http or https");
/** BCP 47 locale code — language with optional script/region subtags (e.g. en, en-US, pt-BR, es-419, zh-Hant) */
var localeCode = z.string().regex(/^[a-z]{2,3}(-[a-z0-9]{2,8})*$/i, "Invalid locale code").transform((v) => v.toLowerCase());
/** Shared `?locale=xx` query shape for endpoints that filter by locale. */
var localeFilterQuery = z.object({ locale: z.string().min(1).optional() }).meta({ id: "LocaleFilterQuery" });
z.object({
	success: z.literal(false).meta({ description: "Discriminant: always false for errors" }),
	error: z.object({
		code: z.string().meta({
			description: "Machine-readable error code",
			example: "NOT_FOUND"
		}),
		message: z.string().meta({ description: "Human-readable error message" })
	})
}).meta({ id: "ApiError" });
z.object({ deleted: z.literal(true) }).meta({ id: "DeleteResponse" });
z.object({ count: z.number().int().min(0) }).meta({ id: "CountResponse" });
var mediaUsageCoverageStatusSchema = z.enum([
	"complete",
	"never",
	"running",
	"partial",
	"failed",
	"stale",
	"unknown"
]).meta({ id: "MediaUsageCoverageStatus" });
var mediaUsageCoverageSchema = z.object({
	scope: z.literal("all_content_collections"),
	status: mediaUsageCoverageStatusSchema
}).meta({ id: "MediaUsageCoverage" });
var mediaUsageSummarySchema = z.object({
	count: z.number().int().min(0).nullable(),
	coverage: mediaUsageCoverageSchema
}).meta({ id: "MediaUsageSummary" });
var mediaUsageDetailsQuery = z.object({
	cursor: z.string().min(1).max(2048).optional().meta({ description: "Opaque content-entry-group cursor" }),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50).meta({ description: "Maximum number of content entry groups to return (1-100, default 50)" })
});
var mediaUsageOccurrenceDetailSchema = z.object({
	fieldSlug: z.string(),
	fieldPath: z.string(),
	occurrenceIndex: z.number().int().min(0),
	referenceType: z.enum([
		"image_field",
		"file_field",
		"portable_text_image",
		"unknown"
	])
}).meta({ id: "MediaUsageOccurrenceDetail" });
var mediaUsageSourceDetailSchema = z.object({
	variant: z.enum(["columns", "draft_overlay"]),
	occurrences: z.array(mediaUsageOccurrenceDetailSchema)
}).meta({ id: "MediaUsageSourceDetail" });
var mediaUsageEntryDetailSchema = z.object({
	collection: z.string(),
	contentId: z.string(),
	title: z.string().nullable(),
	slug: z.string().nullable(),
	locale: z.string().nullable(),
	status: z.string().nullable(),
	scheduledAt: z.string().nullable(),
	deletedAt: z.string().nullable(),
	sources: z.array(mediaUsageSourceDetailSchema)
}).meta({ id: "MediaUsageEntryDetail" });
z.object({
	items: z.array(mediaUsageEntryDetailSchema),
	nextCursor: z.string().optional(),
	coverage: mediaUsageCoverageSchema
}).meta({ id: "MediaUsageDetailsResponse" });
var mediaUsageRepairStatusSchema = z.enum([
	"complete",
	"partial",
	"failed",
	"stale"
]).meta({ id: "MediaUsageRepairStatus" });
var mediaUsageRepairCollectionBody = z.object({
	scope: z.literal("collection"),
	collection: z.string().min(1).max(63).regex(slugPattern, "Invalid collection slug")
}).strict();
var mediaUsageRepairAllBody = z.object({ scope: z.literal("all") }).strict();
var mediaUsageRepairBody = z.discriminatedUnion("scope", [mediaUsageRepairCollectionBody, mediaUsageRepairAllBody]).meta({ id: "MediaUsageRepairBody" });
var mediaUsageRepairCollectionSummarySchema = z.object({
	collection: z.string(),
	status: mediaUsageRepairStatusSchema,
	indexedSourceCount: z.number().int().min(0),
	failedSourceCount: z.number().int().min(0),
	skippedSourceCount: z.number().int().min(0),
	deletedSourceCount: z.number().int().min(0),
	lastErrorCode: z.string().nullable(),
	startedAt: z.string(),
	completedAt: z.string().nullable()
}).meta({ id: "MediaUsageRepairCollectionSummary" });
z.object({
	status: mediaUsageRepairStatusSchema,
	indexedSourceCount: z.number().int().min(0),
	failedSourceCount: z.number().int().min(0),
	skippedSourceCount: z.number().int().min(0),
	deletedSourceCount: z.number().int().min(0),
	collections: z.array(mediaUsageRepairCollectionSummarySchema)
}).meta({ id: "MediaUsageRepairResponse" });
/**
* Accepts a comma-separated string (from URL query params) or an array of
* strings (from JSON body or programmatic use) and normalises to string[].
*/
var mimeTypeFilter = z.union([z.string(), z.array(z.string())]).transform((v) => {
	return (Array.isArray(v) ? v : v.split(",")).map((s) => s.trim()).filter((s) => s.length > 0);
}).optional();
var mediaListQuery = cursorPaginationQuery.extend({
	mimeType: mimeTypeFilter,
	q: z.string().trim().min(1).max(200).optional(),
	includeUsage: z.literal("1").optional().meta({ description: "Include a coverage-aware usage summary on each media item" })
}).meta({ id: "MediaListQuery" });
var mediaGetQuery = z.object({ includeUsage: z.literal("1").optional().meta({ description: "Include a coverage-aware usage summary on the media item" }) }).meta({ id: "MediaGetQuery" });
var mediaUpdateBody = z.object({
	alt: z.string().optional(),
	caption: z.string().optional(),
	width: z.number().int().positive().optional(),
	height: z.number().int().positive().optional()
}).meta({ id: "MediaUpdateBody" });
/** Default maximum allowed file upload size (50 MB). */
var DEFAULT_MAX_UPLOAD_SIZE = 52428800;
function formatFileSize(bytes) {
	if (bytes < 1024) return `${bytes}B`;
	if (bytes < 1048576) return `${Math.floor(bytes / 1024)}KB`;
	return `${Math.floor(bytes / 1024 / 1024)}MB`;
}
var CONTENT_TYPE_RE = /^[a-z0-9][a-z0-9!#$&^_+\-.]*\/[a-z0-9!#$&^_+\-.]+(\s*;[^\r\n]*)?$/i;
function mediaUploadUrlBody(maxSize) {
	if (!Number.isFinite(maxSize) || maxSize <= 0) throw new Error(`EmDash: maxUploadSize must be a positive finite number, got ${maxSize}`);
	return z.object({
		filename: z.string().min(1, "filename is required"),
		contentType: z.string().min(1, "contentType is required").regex(CONTENT_TYPE_RE, "Invalid content type"),
		size: z.number().int().positive().max(maxSize, `File size must not exceed ${formatFileSize(maxSize)}`),
		contentHash: z.string().optional(),
		fieldId: z.string().optional()
	}).meta({ id: "MediaUploadUrlBody" });
}
var mediaConfirmBody = z.object({
	size: z.number().int().positive().optional(),
	width: z.number().int().positive().optional(),
	height: z.number().int().positive().optional()
}).meta({ id: "MediaConfirmBody" });
cursorPaginationQuery.extend({
	query: z.string().optional(),
	mimeType: mimeTypeFilter
}).meta({ id: "MediaProviderListQuery" });
var mediaStatusSchema = z.enum([
	"pending",
	"ready",
	"failed"
]);
var mediaItemSchema = z.object({
	id: z.string(),
	filename: z.string(),
	mimeType: z.string(),
	size: z.number().nullable(),
	width: z.number().nullable(),
	height: z.number().nullable(),
	alt: z.string().nullable(),
	caption: z.string().nullable(),
	storageKey: z.string(),
	status: mediaStatusSchema,
	contentHash: z.string().nullable(),
	blurhash: z.string().nullable(),
	dominantColor: z.string().nullable(),
	createdAt: z.string(),
	authorId: z.string().nullable()
}).meta({ id: "MediaItem" });
z.object({ item: mediaItemSchema }).meta({ id: "MediaResponse" });
var mediaReadItemSchema = mediaItemSchema.extend({ usage: mediaUsageSummarySchema.optional() }).meta({ id: "MediaReadItem" });
z.object({ item: mediaReadItemSchema }).meta({ id: "MediaReadResponse" });
var mediaListReadItemSchema = mediaReadItemSchema.extend({ url: z.string() }).meta({ id: "MediaListReadItem" });
z.object({
	items: z.array(mediaListReadItemSchema),
	nextCursor: z.string().optional()
}).meta({ id: "MediaListReadResponse" });
z.object({
	items: z.array(mediaItemSchema),
	nextCursor: z.string().optional()
}).meta({ id: "MediaListResponse" });
z.object({
	uploadUrl: z.string(),
	method: z.literal("PUT"),
	headers: z.record(z.string(), z.string()),
	mediaId: z.string(),
	storageKey: z.string(),
	expiresAt: z.string()
}).meta({ id: "MediaUploadUrlResponse" });
z.object({
	existing: z.literal(true),
	mediaId: z.string(),
	storageKey: z.string(),
	url: z.string()
}).meta({ id: "MediaExistingResponse" });
z.object({ item: mediaItemSchema.extend({ url: z.string() }) }).meta({ id: "MediaConfirmResponse" });
//#endregion
export { httpUrl as a, mediaConfirmBody as c, mediaUpdateBody as d, mediaUploadUrlBody as f, slugPattern as g, roleLevel as h, formatFileSize as i, mediaGetQuery as l, mediaUsageRepairBody as m, DEFAULT_MAX_UPLOAD_SIZE as n, localeCode as o, mediaUsageDetailsQuery as p, cursorPaginationQuery as r, localeFilterQuery as s, CONTENT_TYPE_RE as t, mediaListQuery as u };
