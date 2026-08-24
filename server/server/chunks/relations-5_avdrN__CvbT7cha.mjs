import { a as httpUrl, g as slugPattern$1, h as roleLevel, o as localeCode, r as cursorPaginationQuery } from "./media-kIV1IxFf_BRR3CdsF.mjs";
import { i as RESERVED_BYLINE_FIELD_SLUGS } from "./types-o7xo7VgH_7RqDl1dC.mjs";
import { z } from "zod";
//#region node_modules/emdash/dist/status-COfycGIU.mjs
/**
* Redirect rule status codes.
*
* A redirect rule's `type` is either a *redirect* status (issues a `Location`
* header) or a *terminal* status (serves the status with no target). Terminal
* statuses let editors mark a URL as intentionally gone:
* - `410 Gone` — permanently and intentionally deleted (Google deindexes it
*   faster than a 404).
* - `451 Unavailable For Legal Reasons`.
*/
/** Statuses that issue an HTTP redirect (require a destination). */
var REDIRECT_STATUSES = [
	301,
	302,
	307,
	308
];
/** Terminal statuses that serve a status with no `Location` / no destination. */
var TERMINAL_STATUSES = [410, 451];
/** All values accepted as a redirect rule `type`. */
var REDIRECT_RULE_STATUSES = [...REDIRECT_STATUSES, ...TERMINAL_STATUSES];
/** True for terminal statuses (410/451) — served directly, with no target. */
function isTerminalStatus(type) {
	return TERMINAL_STATUSES.includes(type);
}
//#endregion
//#region node_modules/emdash/dist/redirects-BBq3n2Rj.mjs
/** Slug pattern: lowercase letters, digits, and hyphens; must start with a letter */
var bylineSlugPattern = /^[a-z][a-z0-9-]*$/;
var bylineSummarySchema = z.object({
	id: z.string(),
	slug: z.string(),
	displayName: z.string(),
	bio: z.string().nullable(),
	avatarMediaId: z.string().nullable(),
	avatarStorageKey: z.string().nullish(),
	avatarAlt: z.string().nullish(),
	avatarBlurhash: z.string().nullish(),
	avatarDominantColor: z.string().nullish(),
	websiteUrl: z.string().nullable(),
	userId: z.string().nullable(),
	isGuest: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
	locale: z.string(),
	translationGroup: z.string().nullable(),
	customFields: z.record(z.string(), z.union([
		z.string(),
		z.boolean(),
		z.null()
	])).optional()
}).meta({ id: "BylineSummary" });
var bylineCreditSchema = z.object({
	byline: bylineSummarySchema,
	sortOrder: z.number().int(),
	roleLabel: z.string().nullable(),
	source: z.enum(["explicit", "inferred"]).optional().meta({ description: "Whether this credit was explicitly assigned or inferred from authorId" })
}).meta({ id: "BylineCredit" });
var contentBylineInputSchema = z.object({
	bylineId: z.string().min(1),
	roleLabel: z.string().nullish()
}).meta({ id: "ContentBylineInput" });
var bylinesListQuery = cursorPaginationQuery.extend({
	search: z.string().optional(),
	isGuest: z.coerce.boolean().optional(),
	userId: z.string().optional(),
	locale: z.string().min(1).optional()
}).meta({ id: "BylinesListQuery" });
var bylineCreateBody = z.object({
	slug: z.string().min(1).regex(bylineSlugPattern, "Slug must contain only lowercase letters, digits, and hyphens"),
	displayName: z.string().min(1),
	bio: z.string().nullish(),
	avatarMediaId: z.string().nullish(),
	websiteUrl: httpUrl.nullish(),
	userId: z.string().nullish(),
	isGuest: z.boolean().optional(),
	locale: z.string().min(1).optional(),
	translationOf: z.string().min(1).optional(),
	customFields: z.record(z.string(), z.unknown()).optional()
}).meta({ id: "BylineCreateBody" });
var bylineTranslationCreateBody = z.object({
	locale: z.string().min(1),
	slug: z.string().min(1).regex(bylineSlugPattern, "Slug must contain only lowercase letters, digits, and hyphens").optional(),
	displayName: z.string().min(1).optional(),
	bio: z.string().nullish(),
	avatarMediaId: z.string().nullish(),
	websiteUrl: httpUrl.nullish()
}).meta({ id: "BylineTranslationCreateBody" });
z.object({ items: z.array(bylineSummarySchema) }).meta({ id: "BylineTranslationsResponse" });
var bylineUpdateBody = z.object({
	slug: z.string().min(1).regex(bylineSlugPattern, "Slug must contain only lowercase letters, digits, and hyphens").optional(),
	displayName: z.string().min(1).optional(),
	bio: z.string().nullish(),
	avatarMediaId: z.string().nullish(),
	websiteUrl: httpUrl.nullish(),
	userId: z.string().nullish(),
	isGuest: z.boolean().optional(),
	customFields: z.record(z.string(), z.unknown()).optional()
}).meta({ id: "BylineUpdateBody" });
z.object({
	items: z.array(bylineSummarySchema),
	nextCursor: z.string().optional()
}).meta({ id: "BylineListResponse" });
/** SEO input — per-content meta fields */
var contentSeoInput = z.object({
	title: z.string().max(200).nullish(),
	description: z.string().max(500).nullish(),
	image: z.string().nullish(),
	canonical: httpUrl.nullish(),
	noIndex: z.boolean().optional()
}).meta({ id: "ContentSeoInput" });
/** ISO 8601 date or datetime bound for the content-list date range filter. */
var contentDateBound = z.union([z.iso.datetime({
	offset: true,
	message: "must be an ISO 8601 datetime"
}), z.iso.date({ message: "must be an ISO 8601 date" })]).optional();
var contentListQuery = cursorPaginationQuery.extend({
	status: z.string().optional(),
	orderBy: z.string().optional(),
	order: z.enum(["asc", "desc"]).optional(),
	locale: localeCode.optional(),
	q: z.string().trim().min(1).max(200).optional(),
	authorId: z.string().min(1).max(64).optional(),
	dateField: z.enum([
		"createdAt",
		"updatedAt",
		"publishedAt"
	]).optional(),
	dateFrom: contentDateBound,
	dateTo: contentDateBound
}).meta({ id: "ContentListQuery" });
/** ISO 8601 datetime for `publishedAt` / `createdAt`. Routes gate writes behind `content:publish_any`. */
var contentDateOverride = z.iso.datetime({
	offset: true,
	message: "must be an ISO 8601 datetime"
}).nullish();
var contentCreateBody = z.object({
	data: z.record(z.string(), z.unknown()),
	slug: z.string().nullish(),
	status: z.enum(["draft"]).optional(),
	bylines: z.array(contentBylineInputSchema).optional(),
	locale: localeCode.optional(),
	translationOf: z.string().optional(),
	seo: contentSeoInput.optional(),
	taxonomies: z.record(z.string(), z.array(z.string())).optional().meta({ description: "Taxonomy term assignments as { taxonomyName: [termSlug, ...] }, resolved in the entry's locale." }),
	publishedAt: contentDateOverride,
	createdAt: contentDateOverride
}).meta({ id: "ContentCreateBody" });
var contentUpdateBody = z.object({
	data: z.record(z.string(), z.unknown()).optional(),
	slug: z.string().nullish(),
	status: z.enum(["draft"]).optional(),
	authorId: z.string().nullish(),
	bylines: z.array(contentBylineInputSchema).optional(),
	_rev: z.string().optional().meta({ description: "Opaque revision token for optimistic concurrency" }),
	skipRevision: z.boolean().optional(),
	seo: contentSeoInput.optional(),
	taxonomies: z.record(z.string(), z.array(z.string())).optional().meta({ description: "Replace taxonomy assignments as { taxonomyName: [termSlug, ...] }. Only named taxonomies are touched; pass an empty array to clear a taxonomy." }),
	publishedAt: contentDateOverride
}).meta({ id: "ContentUpdateBody" });
var contentScheduleBody = z.object({ scheduledAt: z.string().min(1, "scheduledAt is required").meta({
	description: "ISO 8601 datetime for scheduled publishing",
	example: "2025-06-15T09:00:00Z"
}) }).meta({ id: "ContentScheduleBody" });
var contentPublishBody = z.object({ publishedAt: z.iso.datetime({
	offset: true,
	message: "must be an ISO 8601 datetime"
}).optional().meta({ description: "Optional ISO 8601 datetime to backdate the publish (e.g. when migrating content). Requires content:publish_any permission. Without this, existing published_at is preserved on re-publish." }) }).meta({ id: "ContentPublishBody" });
var contentPreviewUrlBody = z.object({
	expiresIn: z.union([z.string(), z.number()]).optional(),
	pathPattern: z.string().optional()
}).meta({ id: "ContentPreviewUrlBody" });
var contentTermsBody = z.object({ termIds: z.array(z.string()) }).meta({ id: "ContentTermsBody" });
var contentTrashQuery = cursorPaginationQuery;
/** SEO metadata on a content item */
var contentSeoSchema = z.object({
	title: z.string().nullable(),
	description: z.string().nullable(),
	image: z.string().nullable(),
	canonical: z.string().nullable(),
	noIndex: z.boolean()
}).meta({ id: "ContentSeo" });
/** A single content item as returned by the API */
var contentItemSchema = z.object({
	id: z.string(),
	type: z.string().meta({ description: "Collection slug this item belongs to" }),
	slug: z.string().nullable(),
	status: z.string().meta({ description: "draft, published, or scheduled" }),
	data: z.record(z.string(), z.unknown()).meta({ description: "User-defined field values" }),
	authorId: z.string().nullable(),
	primaryBylineId: z.string().nullable(),
	byline: bylineSummarySchema.nullable().optional(),
	bylines: z.array(bylineCreditSchema).optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
	publishedAt: z.string().nullable(),
	scheduledAt: z.string().nullable(),
	liveRevisionId: z.string().nullable(),
	draftRevisionId: z.string().nullable(),
	version: z.number().int(),
	locale: z.string().nullable(),
	translationGroup: z.string().nullable(),
	seo: contentSeoSchema.optional()
}).meta({ id: "ContentItem" });
z.object({
	item: contentItemSchema,
	_rev: z.string().optional().meta({ description: "Opaque revision token for optimistic concurrency" })
}).meta({ id: "ContentResponse" });
z.object({
	items: z.array(contentItemSchema),
	nextCursor: z.string().optional(),
	total: z.number().int().nonnegative().optional()
}).meta({ id: "ContentListResponse" });
/** A distinct content author for the admin author filter */
var contentAuthorSchema = z.object({
	id: z.string(),
	name: z.string().nullable(),
	email: z.string(),
	avatarUrl: z.string().nullable()
}).meta({ id: "ContentAuthor" });
z.object({ items: z.array(contentAuthorSchema) }).meta({ id: "ContentAuthorsResponse" });
/** Trashed content item */
var trashedContentItemSchema = z.object({
	id: z.string(),
	type: z.string(),
	slug: z.string().nullable(),
	status: z.string(),
	data: z.record(z.string(), z.unknown()),
	authorId: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
	publishedAt: z.string().nullable(),
	deletedAt: z.string()
}).meta({ id: "TrashedContentItem" });
z.object({
	items: z.array(trashedContentItemSchema),
	nextCursor: z.string().optional()
}).meta({ id: "TrashedContentListResponse" });
z.object({
	hasChanges: z.boolean(),
	live: z.record(z.string(), z.unknown()).nullable(),
	draft: z.record(z.string(), z.unknown()).nullable()
}).meta({ id: "ContentCompareResponse" });
/** Translation summary for a content item */
var contentTranslationSchema = z.object({
	id: z.string(),
	locale: z.string().nullable(),
	slug: z.string().nullable(),
	status: z.string(),
	updatedAt: z.string()
});
z.object({
	translationGroup: z.string(),
	translations: z.array(contentTranslationSchema)
}).meta({ id: "ContentTranslationsResponse" });
var collectionSupportValues = z.enum([
	"drafts",
	"revisions",
	"preview",
	"scheduling",
	"search"
]);
var collectionSourcePattern = /^(template:.+|import:.+|manual|discovered|seed)$/;
var fieldTypeValues = z.enum([
	"string",
	"text",
	"url",
	"number",
	"integer",
	"boolean",
	"datetime",
	"select",
	"multiSelect",
	"portableText",
	"image",
	"file",
	"reference",
	"json",
	"slug",
	"repeater"
]);
var repeaterSubFieldSchema = z.object({
	slug: z.string().min(1).max(63).regex(slugPattern$1, "Invalid slug format"),
	type: z.enum([
		"string",
		"text",
		"url",
		"number",
		"integer",
		"boolean",
		"datetime",
		"select",
		"image"
	]),
	label: z.string().min(1),
	required: z.boolean().optional(),
	options: z.array(z.string()).optional()
});
var fieldValidation = z.object({
	required: z.boolean().optional(),
	min: z.number().optional(),
	max: z.number().optional(),
	minLength: z.number().int().min(0).optional(),
	maxLength: z.number().int().min(0).optional(),
	pattern: z.string().optional(),
	options: z.array(z.string()).optional(),
	subFields: z.array(repeaterSubFieldSchema).min(1).optional(),
	minItems: z.number().int().min(0).optional(),
	maxItems: z.number().int().min(1).optional(),
	allowedMimeTypes: z.array(z.string().regex(/^[a-z0-9][a-z0-9!#$&^_+\-.]*\/[a-z0-9!#$&^_+\-.]*$/i, "Invalid MIME type")).min(1, "allowedMimeTypes must not be empty — omit the field to allow all types").max(64, "allowedMimeTypes may contain at most 64 entries").optional()
}).optional();
var fieldWidgetOptions = z.record(z.string(), z.unknown()).optional();
var createCollectionBody = z.object({
	slug: z.string().min(1).max(63).regex(slugPattern$1, "Invalid slug format"),
	label: z.string().min(1),
	labelSingular: z.string().optional(),
	description: z.string().optional(),
	icon: z.string().optional(),
	supports: z.array(collectionSupportValues).optional(),
	source: z.string().regex(collectionSourcePattern).optional(),
	urlPattern: z.string().optional(),
	hasSeo: z.boolean().optional()
}).meta({ id: "CreateCollectionBody" });
var updateCollectionBody = z.object({
	label: z.string().min(1).optional(),
	labelSingular: z.string().optional(),
	description: z.string().optional(),
	icon: z.string().optional(),
	supports: z.array(collectionSupportValues).optional(),
	urlPattern: z.string().nullish(),
	hasSeo: z.boolean().optional(),
	commentsEnabled: z.boolean().optional(),
	commentsModeration: z.enum([
		"all",
		"first_time",
		"none"
	]).optional(),
	commentsClosedAfterDays: z.number().int().min(0).optional(),
	commentsAutoApproveUsers: z.boolean().optional()
}).meta({ id: "UpdateCollectionBody" });
var createFieldBody = z.object({
	slug: z.string().min(1).max(63).regex(slugPattern$1, "Invalid slug format"),
	label: z.string().min(1),
	type: fieldTypeValues,
	required: z.boolean().optional(),
	unique: z.boolean().optional(),
	defaultValue: z.unknown().optional(),
	validation: fieldValidation.nullable(),
	widget: z.string().optional(),
	options: fieldWidgetOptions,
	sortOrder: z.number().int().min(0).optional(),
	searchable: z.boolean().optional(),
	translatable: z.boolean().optional()
}).meta({ id: "CreateFieldBody" });
var updateFieldBody = z.object({
	label: z.string().min(1).optional(),
	type: fieldTypeValues.optional(),
	required: z.boolean().optional(),
	unique: z.boolean().optional(),
	defaultValue: z.unknown().optional(),
	validation: fieldValidation.nullable(),
	widget: z.string().optional(),
	options: fieldWidgetOptions,
	sortOrder: z.number().int().min(0).optional(),
	searchable: z.boolean().optional(),
	translatable: z.boolean().optional()
}).meta({ id: "UpdateFieldBody" });
var fieldReorderBody = z.object({ fieldSlugs: z.array(z.string().min(1)) }).meta({ id: "FieldReorderBody" });
var orphanRegisterBody = z.object({
	label: z.string().optional(),
	labelSingular: z.string().optional(),
	description: z.string().optional()
}).meta({ id: "OrphanRegisterBody" });
z.object({ format: z.string().optional() });
var collectionGetQuery = z.object({ includeFields: z.string().transform((v) => v === "true").optional() });
var collectionSchema = z.object({
	id: z.string(),
	slug: z.string(),
	label: z.string(),
	labelSingular: z.string().nullable(),
	description: z.string().nullable(),
	icon: z.string().nullable(),
	supports: z.array(z.string()),
	source: z.string().nullable(),
	urlPattern: z.string().nullable(),
	hasSeo: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "Collection" });
var fieldSchema = z.object({
	id: z.string(),
	collectionId: z.string(),
	slug: z.string(),
	label: z.string(),
	type: fieldTypeValues,
	required: z.boolean(),
	unique: z.boolean(),
	defaultValue: z.unknown().nullable(),
	validation: z.record(z.string(), z.unknown()).nullable(),
	widget: z.string().nullable(),
	options: z.record(z.string(), z.unknown()).nullable(),
	sortOrder: z.number().int(),
	searchable: z.boolean(),
	translatable: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "Field" });
z.object({ item: collectionSchema }).meta({ id: "CollectionResponse" });
z.object({ item: collectionSchema.extend({ fields: z.array(fieldSchema) }) }).meta({ id: "CollectionWithFieldsResponse" });
z.object({ items: z.array(collectionSchema) }).meta({ id: "CollectionListResponse" });
z.object({ item: fieldSchema }).meta({ id: "FieldResponse" });
z.object({ items: z.array(fieldSchema) }).meta({ id: "FieldListResponse" });
var orphanedTableSchema = z.object({
	slug: z.string(),
	tableName: z.string(),
	rowCount: z.number().int()
}).meta({ id: "OrphanedTable" });
z.object({ items: z.array(orphanedTableSchema) }).meta({ id: "OrphanedTableListResponse" });
var createCommentBody = z.object({
	authorName: z.string().min(1).max(100),
	authorEmail: z.string().email(),
	body: z.string().min(1).max(5e3),
	parentId: z.string().optional(),
	website_url: z.string().optional(),
	turnstileToken: z.string().max(2048).optional()
}).meta({ id: "CreateCommentBody" });
var createReactionBody = z.object({
	commentId: z.string().min(1),
	reaction: z.string().min(1).max(20).default("like"),
	website_url: z.string().optional()
}).meta({ id: "CreateReactionBody" });
var commentStatusBody = z.object({ status: z.enum([
	"approved",
	"pending",
	"spam",
	"trash"
]) }).meta({ id: "CommentStatusBody" });
var commentBulkBody = z.object({
	ids: z.array(z.string().min(1)).min(1).max(100),
	action: z.enum([
		"approve",
		"spam",
		"trash",
		"delete"
	])
}).meta({ id: "CommentBulkBody" });
var commentListQuery = z.object({
	status: z.enum([
		"pending",
		"approved",
		"spam",
		"trash"
	]).optional(),
	collection: z.string().optional(),
	search: z.string().optional(),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50),
	cursor: z.string().max(2048).optional()
}).meta({ id: "CommentListQuery" });
var commentStatusValues = z.enum([
	"pending",
	"approved",
	"spam",
	"trash"
]);
/**
* Public-facing comment (no email/IP).
*
* `replies` is recursive in practice (each reply can have replies), but we
* model it as a single level here to avoid circular type inference issues
* with tsgo. OpenAPI consumers should treat replies as the same shape.
*/
var publicCommentSchema = z.object({
	id: z.string(),
	authorName: z.string(),
	isRegisteredUser: z.boolean(),
	body: z.string(),
	parentId: z.string().nullable(),
	createdAt: z.string(),
	replies: z.array(z.any()).optional()
}).meta({ id: "PublicComment" });
/** Admin comment with full details */
var commentSchema = z.object({
	id: z.string(),
	collection: z.string(),
	contentId: z.string(),
	authorName: z.string(),
	authorEmail: z.string(),
	body: z.string(),
	status: commentStatusValues,
	parentId: z.string().nullable(),
	ipHash: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "Comment" });
z.object({
	items: z.array(publicCommentSchema),
	nextCursor: z.string().optional(),
	total: z.number().int()
}).meta({ id: "PublicCommentListResponse" });
z.object({
	items: z.array(commentSchema),
	nextCursor: z.string().optional()
}).meta({ id: "AdminCommentListResponse" });
z.object({
	pending: z.number().int(),
	approved: z.number().int(),
	spam: z.number().int(),
	trash: z.number().int()
}).meta({ id: "CommentCountsResponse" });
z.object({ affected: z.number().int() }).meta({ id: "CommentBulkResponse" });
/**
* URL scheme validation utilities
*
* Prevents XSS via dangerous URL schemes (javascript:, data:, vbscript:, etc.)
* by allowlisting known-safe schemes before rendering into href attributes.
*/
/**
* Matches URLs that are safe to render in href attributes.
*
* Allowed:
* - http:// and https://
* - mailto: and tel:
* - Relative paths (starting with /)
* - Fragment links (starting with #)
* - Protocol-relative URLs are NOT allowed (starting with //) as they can
*   redirect to attacker-controlled hosts.
*/
var SAFE_URL_SCHEME_RE = /^(https?:|mailto:|tel:|\/(?!\/)|#)/i;
/**
* Returns the URL unchanged if it uses a safe scheme, otherwise returns "#".
*
* Use this at the render layer as the primary defense against XSS via
* dangerous URL schemes like `javascript:`, `data:`, or `vbscript:`.
*
* @example
* ```ts
* sanitizeHref("https://example.com")        // "https://example.com"
* sanitizeHref("/about")                      // "/about"
* sanitizeHref("#section")                    // "#section"
* sanitizeHref("mailto:a@b.com")              // "mailto:a@b.com"
* sanitizeHref("javascript:alert(1)")         // "#"
* sanitizeHref("data:text/html,<script>")     // "#"
* sanitizeHref("")                            // "#"
* ```
*/
function sanitizeHref(url) {
	if (!url) return "#";
	return SAFE_URL_SCHEME_RE.test(url) ? url : "#";
}
/**
* Returns true if the URL uses a safe scheme for rendering in href attributes.
*/
function isSafeHref(url) {
	return SAFE_URL_SCHEME_RE.test(url);
}
/**
* Allowed menu item types. `custom` uses `customUrl`; the others resolve a URL
* from `referenceCollection` + `referenceId` (a translation_group id).
*/
var menuItemTypeEnum = z.enum([
	"custom",
	"page",
	"post",
	"taxonomy",
	"collection"
]);
var safeHref = z.string().trim().refine(isSafeHref, "URL must use http, https, mailto, tel, a relative path, or a fragment identifier");
var createMenuBody = z.object({
	name: z.string().min(1),
	label: z.string().min(1),
	locale: z.string().min(1).optional(),
	translationOf: z.string().min(1).optional()
}).strict().meta({ id: "CreateMenuBody" });
var updateMenuBody = z.object({ label: z.string().min(1).optional() }).strict().meta({ id: "UpdateMenuBody" });
var createMenuItemBody = z.object({
	type: menuItemTypeEnum,
	label: z.string().min(1),
	referenceCollection: z.string().optional(),
	referenceId: z.string().optional(),
	customUrl: safeHref.optional(),
	target: z.string().optional(),
	titleAttr: z.string().optional(),
	cssClasses: z.string().optional(),
	parentId: z.string().optional(),
	sortOrder: z.number().int().min(0).optional()
}).strict().meta({ id: "CreateMenuItemBody" });
var updateMenuItemBody = z.object({
	label: z.string().min(1).optional(),
	customUrl: safeHref.optional(),
	target: z.string().optional(),
	titleAttr: z.string().optional(),
	cssClasses: z.string().optional(),
	parentId: z.string().nullish(),
	sortOrder: z.number().int().min(0).optional()
}).strict().meta({ id: "UpdateMenuItemBody" });
var reorderMenuItemsBody = z.object({ items: z.array(z.object({
	id: z.string().min(1),
	parentId: z.string().nullable(),
	sortOrder: z.number().int().min(0)
})) }).meta({ id: "ReorderMenuItemsBody" });
var menuSchema = z.object({
	id: z.string(),
	name: z.string(),
	label: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	locale: z.string(),
	translationGroup: z.string().nullable()
}).meta({ id: "Menu" });
var menuItemSchema = z.object({
	id: z.string(),
	menuId: z.string(),
	parentId: z.string().nullable(),
	sortOrder: z.number().int(),
	type: z.string(),
	referenceCollection: z.string().nullable(),
	referenceId: z.string().nullable(),
	customUrl: z.string().nullable(),
	label: z.string(),
	titleAttr: z.string().nullable(),
	target: z.string().nullable(),
	cssClasses: z.string().nullable(),
	createdAt: z.string(),
	locale: z.string(),
	translationGroup: z.string().nullable()
}).meta({ id: "MenuItem" });
z.object({
	translationGroup: z.string().nullable(),
	translations: z.array(z.object({
		id: z.string(),
		name: z.string(),
		label: z.string(),
		locale: z.string(),
		updatedAt: z.string()
	}))
}).meta({ id: "MenuTranslations" });
menuSchema.extend({ itemCount: z.number().int() }).meta({ id: "MenuListItem" });
menuSchema.extend({ items: z.array(menuItemSchema) }).meta({ id: "MenuWithItems" });
var createTaxonomyDefBody = z.object({
	name: z.string().min(1).max(63).regex(/^[a-z][a-z0-9_]*$/, "Name must be lowercase alphanumeric with underscores"),
	label: z.string().min(1).max(200),
	labelSingular: z.string().min(1).max(200).optional(),
	hierarchical: z.boolean().optional().default(false),
	collections: z.array(z.string().min(1).max(63).regex(/^[a-z][a-z0-9_]*$/, "Invalid collection slug format")).max(100).optional().default([]),
	locale: z.string().min(1).optional(),
	translationOf: z.string().min(1).optional()
}).meta({ id: "CreateTaxonomyDefBody" });
var createTermBody = z.object({
	slug: z.string().min(1),
	label: z.string().min(1),
	parentId: z.string().nullish(),
	description: z.string().optional(),
	locale: z.string().min(1).optional(),
	translationOf: z.string().min(1).optional()
}).meta({ id: "CreateTermBody" });
var updateTermBody = z.object({
	slug: z.string().min(1).optional(),
	label: z.string().min(1).optional(),
	parentId: z.string().nullish(),
	description: z.string().optional()
}).meta({ id: "UpdateTermBody" });
var taxonomyDefSchema = z.object({
	id: z.string(),
	name: z.string(),
	label: z.string(),
	labelSingular: z.string().optional(),
	hierarchical: z.boolean(),
	collections: z.array(z.string()),
	locale: z.string(),
	translationGroup: z.string().nullable()
}).meta({ id: "TaxonomyDef" });
z.object({
	translationGroup: z.string().nullable(),
	translations: z.array(z.object({
		id: z.string(),
		name: z.string(),
		label: z.string(),
		locale: z.string()
	}))
}).meta({ id: "TaxonomyDefTranslations" });
z.object({ taxonomies: z.array(taxonomyDefSchema) }).meta({ id: "TaxonomyListResponse" });
var termSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	label: z.string(),
	parentId: z.string().nullable(),
	description: z.string().optional(),
	locale: z.string(),
	translationGroup: z.string().nullable()
}).meta({ id: "Term" });
z.object({
	translationGroup: z.string().nullable(),
	translations: z.array(z.object({
		id: z.string(),
		slug: z.string(),
		label: z.string(),
		locale: z.string()
	}))
}).meta({ id: "TermTranslations" });
var termWithCountSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	label: z.string(),
	parentId: z.string().nullable(),
	description: z.string().optional(),
	count: z.number().int(),
	children: z.array(z.lazy(() => termWithCountSchema)),
	locale: z.string(),
	translationGroup: z.string().nullable()
}).meta({ id: "TermWithCount" });
z.object({ terms: z.array(termWithCountSchema) }).meta({ id: "TermListResponse" });
z.object({ term: termSchema }).meta({ id: "TermResponse" });
z.object({ term: termSchema.extend({
	count: z.number().int(),
	children: z.array(z.object({
		id: z.string(),
		slug: z.string(),
		label: z.string()
	}))
}) }).meta({ id: "TermGetResponse" });
var sectionSource = z.enum([
	"theme",
	"user",
	"import"
]);
var sectionsListQuery = z.object({
	source: sectionSource.optional(),
	search: z.string().optional(),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50),
	cursor: z.string().max(2048).optional()
}).meta({ id: "SectionsListQuery" });
var createSectionBody = z.object({
	slug: z.string().min(1),
	title: z.string().min(1),
	description: z.string().optional(),
	keywords: z.array(z.string()).optional(),
	content: z.array(z.record(z.string(), z.unknown())),
	previewMediaId: z.string().optional(),
	source: z.enum(["user", "import"]).optional(),
	themeId: z.string().optional()
}).meta({ id: "CreateSectionBody" });
var updateSectionBody = z.object({
	slug: z.string().min(1).optional(),
	title: z.string().min(1).optional(),
	description: z.string().optional(),
	keywords: z.array(z.string()).optional(),
	content: z.array(z.record(z.string(), z.unknown())).optional(),
	previewMediaId: z.string().nullish()
}).meta({ id: "UpdateSectionBody" });
var sectionSchema = z.object({
	id: z.string(),
	slug: z.string(),
	title: z.string(),
	description: z.string().nullable(),
	keywords: z.array(z.string()).nullable(),
	content: z.array(z.record(z.string(), z.unknown())),
	previewMediaId: z.string().nullable(),
	source: z.string(),
	themeId: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "Section" });
z.object({
	items: z.array(sectionSchema),
	nextCursor: z.string().optional()
}).meta({ id: "SectionListResponse" });
var mediaReferenceInput = z.object({
	mediaId: z.string(),
	alt: z.string().optional()
});
var socialSettings = z.object({
	twitter: z.string().optional(),
	github: z.string().optional(),
	facebook: z.string().optional(),
	instagram: z.string().optional(),
	linkedin: z.string().optional(),
	youtube: z.string().optional()
});
var seoSettingsInput = z.object({
	titleSeparator: z.string().max(10).optional(),
	defaultOgImage: mediaReferenceInput.optional(),
	robotsTxt: z.string().max(5e3).optional(),
	googleVerification: z.string().max(100).optional(),
	bingVerification: z.string().max(100).optional()
});
var settingsUpdateBody = z.object({
	title: z.string().optional(),
	tagline: z.string().optional(),
	logo: mediaReferenceInput.optional(),
	favicon: mediaReferenceInput.optional(),
	url: z.union([httpUrl, z.literal("")]).optional(),
	postsPerPage: z.number().int().min(1).max(100).optional(),
	dateFormat: z.string().optional(),
	timezone: z.string().optional(),
	social: socialSettings.optional(),
	seo: seoSettingsInput.optional()
}).meta({ id: "SettingsUpdateBody" });
var mediaReferenceResponse = z.object({
	mediaId: z.string(),
	alt: z.string().optional(),
	url: z.string().optional(),
	contentType: z.string().optional(),
	width: z.number().int().optional(),
	height: z.number().int().optional()
});
var seoSettingsResponse = z.object({
	titleSeparator: z.string().max(10).optional(),
	defaultOgImage: mediaReferenceResponse.optional(),
	robotsTxt: z.string().max(5e3).optional(),
	googleVerification: z.string().max(100).optional(),
	bingVerification: z.string().max(100).optional()
});
z.object({
	title: z.string().optional(),
	tagline: z.string().optional(),
	logo: mediaReferenceResponse.optional(),
	favicon: mediaReferenceResponse.optional(),
	url: z.string().optional(),
	postsPerPage: z.number().int().optional(),
	dateFormat: z.string().optional(),
	timezone: z.string().optional(),
	social: socialSettings.optional(),
	seo: seoSettingsResponse.optional()
}).meta({ id: "SiteSettings" });
var searchQuery = z.object({
	q: z.string().min(1),
	collections: z.string().optional(),
	status: z.string().optional(),
	locale: localeCode.optional(),
	limit: z.coerce.number().int().min(1).max(100).optional(),
	cursor: z.string().optional()
}).meta({ id: "SearchQuery" });
var searchSuggestQuery = z.object({
	q: z.string().min(1),
	collections: z.string().optional(),
	locale: localeCode.optional(),
	limit: z.coerce.number().int().min(1).max(20).optional()
}).meta({ id: "SearchSuggestQuery" });
var searchRebuildBody = z.object({ collection: z.string().min(1) }).meta({ id: "SearchRebuildBody" });
var searchEnableBody = z.object({
	collection: z.string().min(1),
	enabled: z.boolean(),
	weights: z.record(z.string(), z.number()).optional()
}).meta({ id: "SearchEnableBody" });
var searchResultSchema = z.object({
	collection: z.string(),
	id: z.string(),
	slug: z.string().nullable(),
	locale: z.string(),
	title: z.string().optional(),
	snippet: z.string().optional(),
	score: z.number()
}).meta({ id: "SearchResult" });
z.object({
	items: z.array(searchResultSchema),
	nextCursor: z.string().optional()
}).meta({ id: "SearchResponse" });
var usersListQuery = z.object({
	search: z.string().optional(),
	role: z.string().optional(),
	cursor: z.string().max(2048).optional(),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50)
}).meta({ id: "UsersListQuery" });
var userUpdateBody = z.object({
	name: z.string().optional(),
	email: z.string().email().optional(),
	role: roleLevel.optional()
}).meta({ id: "UserUpdateBody" });
var allowedDomainCreateBody = z.object({
	domain: z.string().min(1),
	defaultRole: roleLevel
}).meta({ id: "AllowedDomainCreateBody" });
var allowedDomainUpdateBody = z.object({
	enabled: z.boolean().optional(),
	defaultRole: roleLevel.optional()
}).meta({ id: "AllowedDomainUpdateBody" });
var userSchema = z.object({
	id: z.string(),
	email: z.string(),
	name: z.string().nullable(),
	avatarUrl: z.string().nullable(),
	role: z.number().int(),
	emailVerified: z.boolean(),
	disabled: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
	lastLogin: z.string().nullable(),
	credentialCount: z.number().int().optional(),
	oauthProviders: z.array(z.string()).optional()
}).meta({ id: "User" });
z.object({
	items: z.array(userSchema),
	nextCursor: z.string().optional()
}).meta({ id: "UserListResponse" });
z.object({
	id: z.string(),
	email: z.string(),
	name: z.string().nullable(),
	avatarUrl: z.string().nullable(),
	role: z.number().int(),
	emailVerified: z.boolean(),
	disabled: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
	lastLogin: z.string().nullable(),
	credentials: z.array(z.object({
		id: z.string(),
		name: z.string().nullable(),
		deviceType: z.string().nullable(),
		createdAt: z.string(),
		lastUsedAt: z.string()
	})),
	oauthAccounts: z.array(z.object({
		provider: z.string(),
		createdAt: z.string()
	}))
}).meta({ id: "UserDetail" });
var widgetType = z.enum([
	"content",
	"menu",
	"component"
]);
var createWidgetAreaBody = z.object({
	name: z.string().min(1),
	label: z.string().min(1),
	description: z.string().optional()
}).meta({ id: "CreateWidgetAreaBody" });
var createWidgetBody = z.object({
	type: widgetType,
	title: z.string().optional(),
	content: z.array(z.record(z.string(), z.unknown())).optional(),
	menuName: z.string().optional(),
	componentId: z.string().optional(),
	componentProps: z.record(z.string(), z.unknown()).optional()
}).meta({ id: "CreateWidgetBody" });
var updateWidgetBody = z.object({
	type: widgetType.optional(),
	title: z.string().optional(),
	content: z.array(z.record(z.string(), z.unknown())).optional(),
	menuName: z.string().optional(),
	componentId: z.string().optional(),
	componentProps: z.record(z.string(), z.unknown()).optional()
}).meta({ id: "UpdateWidgetBody" });
var reorderWidgetsBody = z.object({ widgetIds: z.array(z.string().min(1)) }).meta({ id: "ReorderWidgetsBody" });
var widgetAreaSchema = z.object({
	id: z.string(),
	name: z.string(),
	label: z.string(),
	description: z.string().nullable(),
	created_at: z.string(),
	updated_at: z.string()
}).meta({ id: "WidgetArea" });
var widgetSchema = z.object({
	id: z.string(),
	type: widgetType,
	title: z.string().optional(),
	content: z.array(z.record(z.string(), z.unknown())).optional(),
	menuName: z.string().optional(),
	componentId: z.string().optional(),
	componentProps: z.record(z.string(), z.unknown()).optional()
}).meta({ id: "Widget" });
widgetAreaSchema.extend({ widgets: z.array(widgetSchema) }).meta({ id: "WidgetAreaWithWidgets" }).extend({ widgetCount: z.number().int() }).meta({ id: "WidgetAreaWithWidgetsAndCount" });
var redirectType = z.coerce.number().int().refine((n) => REDIRECT_RULE_STATUSES.includes(n), { message: "Redirect type must be 301, 302, 307, 308, 410, or 451" });
/** Matches CR or LF characters */
var CRLF = /[\r\n]/;
/** Path must start with / and not be protocol-relative, contain no CRLF, and no path traversal */
var urlPath = z.string().min(1).refine((s) => s.startsWith("/") && !s.startsWith("//"), { message: "Must be a path starting with / (no protocol-relative URLs)" }).refine((s) => !CRLF.test(s), { message: "URL must not contain newline characters" }).refine((s) => {
	try {
		return !decodeURIComponent(s).split("/").includes("..");
	} catch {
		return false;
	}
}, { message: "URL must not contain path traversal segments" });
var createRedirectBody = z.object({
	source: urlPath,
	destination: z.union([urlPath, z.literal("")]).optional(),
	type: redirectType.optional().default(301),
	enabled: z.boolean().optional().default(true),
	groupName: z.string().nullish()
}).refine((o) => isTerminalStatus(o.type ?? 301) || !!o.destination, {
	message: "destination is required for redirect types (301, 302, 307, 308)",
	path: ["destination"]
}).meta({ id: "CreateRedirectBody" });
var updateRedirectBody = z.object({
	source: urlPath.optional(),
	destination: z.union([urlPath, z.literal("")]).optional(),
	type: redirectType.optional(),
	enabled: z.boolean().optional(),
	groupName: z.string().nullish()
}).refine((o) => Object.values(o).some((v) => v !== void 0), { message: "At least one field must be provided" }).meta({ id: "UpdateRedirectBody" });
var redirectsListQuery = cursorPaginationQuery.extend({
	search: z.string().optional(),
	group: z.string().optional(),
	enabled: z.enum(["true", "false"]).transform((v) => v === "true").optional(),
	auto: z.enum(["true", "false"]).transform((v) => v === "true").optional()
}).meta({ id: "RedirectsListQuery" });
var notFoundListQuery = cursorPaginationQuery.extend({ search: z.string().optional() }).meta({ id: "NotFoundListQuery" });
var notFoundSummaryQuery = z.object({ limit: z.coerce.number().int().min(1).max(100).optional().default(50) });
var notFoundPruneBody = z.object({ olderThan: z.string().datetime({ message: "olderThan must be an ISO 8601 datetime" }) }).meta({ id: "NotFoundPruneBody" });
var redirectSchema = z.object({
	id: z.string(),
	source: z.string(),
	destination: z.string(),
	type: z.number().int(),
	isPattern: z.boolean(),
	enabled: z.boolean(),
	hits: z.number().int(),
	lastHitAt: z.string().nullable(),
	groupName: z.string().nullable(),
	auto: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "Redirect" });
z.object({
	items: z.array(redirectSchema),
	nextCursor: z.string().optional(),
	loopRedirectIds: z.array(z.string()).optional()
}).meta({ id: "RedirectListResponse" });
var notFoundEntrySchema = z.object({
	id: z.string(),
	path: z.string(),
	referrer: z.string().nullable(),
	userAgent: z.string().nullable(),
	ip: z.string().nullable(),
	createdAt: z.string()
}).meta({ id: "NotFoundEntry" });
z.object({
	items: z.array(notFoundEntrySchema),
	nextCursor: z.string().optional()
}).meta({ id: "NotFoundListResponse" });
var notFoundSummarySchema = z.object({
	path: z.string(),
	count: z.number().int(),
	lastSeen: z.string(),
	topReferrer: z.string().nullable()
}).meta({ id: "NotFoundSummary" });
z.object({ items: z.array(notFoundSummarySchema) }).meta({ id: "NotFoundSummaryResponse" });
//#endregion
//#region node_modules/emdash/dist/relations-5_avdrN_.mjs
var authenticatorTransport$1 = z.enum([
	"usb",
	"nfc",
	"ble",
	"internal",
	"hybrid"
]);
/** RegistrationResponse — sent by the browser after navigator.credentials.create() */
var registrationCredential$1 = z.object({
	id: z.string(),
	rawId: z.string(),
	type: z.literal("public-key"),
	response: z.object({
		clientDataJSON: z.string(),
		attestationObject: z.string(),
		transports: z.array(authenticatorTransport$1).optional()
	}),
	authenticatorAttachment: z.enum(["platform", "cross-platform"]).optional()
});
/** AuthenticationResponse — sent by the browser after navigator.credentials.get() */
var authenticationCredential = z.object({
	id: z.string(),
	rawId: z.string(),
	type: z.literal("public-key"),
	response: z.object({
		clientDataJSON: z.string(),
		authenticatorData: z.string(),
		signature: z.string(),
		userHandle: z.string().optional()
	}),
	authenticatorAttachment: z.enum(["platform", "cross-platform"]).optional()
});
var signupRequestBody = z.object({ email: z.string().email() }).meta({ id: "SignupRequestBody" });
var signupCompleteBody = z.object({
	token: z.string().min(1),
	credential: registrationCredential$1,
	name: z.string().optional()
}).meta({ id: "SignupCompleteBody" });
var inviteCreateBody = z.object({
	email: z.string().email(),
	role: roleLevel.optional()
}).meta({ id: "InviteCreateBody" });
var inviteRegisterOptionsBody = z.object({
	token: z.string().min(1),
	name: z.string().optional()
}).meta({ id: "InviteRegisterOptionsBody" });
var inviteCompleteBody = z.object({
	token: z.string().min(1),
	credential: registrationCredential$1,
	name: z.string().optional()
}).meta({ id: "InviteCompleteBody" });
var magicLinkSendBody = z.object({ email: z.string().email() }).meta({ id: "MagicLinkSendBody" });
var passkeyOptionsBody = z.object({ email: z.string().email().optional() }).meta({ id: "PasskeyOptionsBody" });
var passkeyVerifyBody = z.object({ credential: authenticationCredential }).meta({ id: "PasskeyVerifyBody" });
var passkeyRegisterOptionsBody = z.object({ name: z.string().optional() }).meta({ id: "PasskeyRegisterOptionsBody" });
var passkeyRegisterVerifyBody = z.object({
	credential: registrationCredential$1,
	name: z.string().optional()
}).meta({ id: "PasskeyRegisterVerifyBody" });
var passkeyRenameBody = z.object({ name: z.string().min(1) }).meta({ id: "PasskeyRenameBody" });
var authMeActionBody = z.object({ action: z.string().min(1) }).meta({ id: "AuthMeActionBody" });
var importProbeBody = z.object({ url: httpUrl });
var wpPluginAnalyzeBody = z.object({
	url: httpUrl,
	token: z.string().min(1)
});
var wpPluginExecuteBody = z.object({
	url: httpUrl,
	token: z.string().min(1),
	config: z.record(z.string(), z.unknown()),
	phase: z.enum([
		"content",
		"comments",
		"finalize"
	]).optional(),
	cursor: z.object({
		postTypeIndex: z.number().int().min(0).default(0),
		page: z.number().int().min(1).default(1)
	}).optional(),
	idMap: z.record(z.string(), z.object({
		id: z.string().min(1),
		collection: z.string().min(1)
	})).optional(),
	translationGroups: z.record(z.string(), z.string().min(1)).optional(),
	commentRoots: z.record(z.string(), z.string().min(1)).optional()
});
var wpPrepareBody = z.object({ postTypes: z.array(z.object({
	name: z.string().min(1),
	collection: z.string().min(1),
	fields: z.array(z.object({
		slug: z.string().min(1),
		label: z.string().min(1),
		type: z.string().min(1),
		required: z.boolean(),
		searchable: z.boolean().optional()
	})).optional()
})) });
var wpMediaImportBody = z.object({
	attachments: z.array(z.record(z.string(), z.unknown())),
	stream: z.boolean().optional()
});
var wpRewriteUrlsBody = z.object({
	urlMap: z.record(z.string(), z.string()),
	collections: z.array(z.string()).optional()
});
/** Registration credential — duplicated reference for setup flow.
*  The canonical definition lives in auth.ts but setup needs it independently
*  because setup runs before auth is configured. */
var authenticatorTransport = z.enum([
	"usb",
	"nfc",
	"ble",
	"internal",
	"hybrid"
]);
var registrationCredential = z.object({
	id: z.string(),
	rawId: z.string(),
	type: z.literal("public-key"),
	response: z.object({
		clientDataJSON: z.string(),
		attestationObject: z.string(),
		transports: z.array(authenticatorTransport).optional()
	}),
	authenticatorAttachment: z.enum(["platform", "cross-platform"]).optional()
});
var setupBody = z.object({
	title: z.string().min(1),
	tagline: z.string().optional(),
	includeContent: z.boolean()
});
var setupAdminBody = z.object({
	email: z.string().email(),
	name: z.string().optional()
});
var setupAdminVerifyBody = z.object({ credential: registrationCredential });
z.object({ handle: z.string().trim().min(1) });
z.object({ handle: z.string().trim().min(1) });
/**
* Zod schemas for the byline-fields admin API (Discussion #1174, Phase 4).
*
* Reserved-slug + identifier validation runs at the zod layer so the
* route returns a clean 400 (`VALIDATION_ERROR` from `parseBody`) rather
* than bubbling a registry-level `BylineSchemaError` ("RESERVED_SLUG" /
* "INVALID_SLUG"). The registry repeats the same checks for non-HTTP
* callers (seeds, scripts) — see `BylineSchemaRegistry.validateSlug`.
*
* Field types are constrained to the v1 subset declared in
* `BYLINE_FIELD_TYPES`. Adding a type to the union there will require a
* corresponding update to this enum.
*/
/**
* Slug pattern for byline field definitions — matches the identifier rule
* used by `validateIdentifier` (and `slugPattern` in `common.ts`).
* Lowercase letters, digits, and underscores; must start with a letter.
*/
var bylineFieldSlugPattern = /^[a-z][a-z0-9_]*$/;
/** Hard cap on a slug — mirrors `BylineSchemaRegistry.MAX_SLUG_LENGTH`. */
var MAX_SLUG_LENGTH = 63;
/** Hard cap on a label — mirrors `BylineSchemaRegistry.MAX_LABEL_LENGTH`. */
var MAX_LABEL_LENGTH = 200;
/** Hard cap on a select field's `options` list. */
var MAX_SELECT_OPTIONS = 200;
var RESERVED_SET = new Set(RESERVED_BYLINE_FIELD_SLUGS);
var bylineFieldTypeValues = z.enum([
	"string",
	"text",
	"url",
	"boolean",
	"select"
]);
/**
* Validation payload for a byline custom field. v1 only exposes
* `options` (used by `select`-type fields). Empty/duplicate options are
* rejected at the registry layer; the zod layer only enforces shape and
* caps. Future field types may add keys here.
*/
var bylineFieldValidationSchema = z.object({ options: z.array(z.string().min(1)).min(1, "select options must contain at least one entry").max(MAX_SELECT_OPTIONS, `select options cannot exceed ${MAX_SELECT_OPTIONS} entries`).optional() }).strict().nullable();
/**
* Slug validation chain shared by create + reorder bodies. Centralised so
* the reserved-slug message and pattern are identical everywhere.
*/
var bylineFieldSlug = z.string().min(1, "Byline field slug is required").max(MAX_SLUG_LENGTH, `Byline field slug must be ${MAX_SLUG_LENGTH} characters or less`).regex(bylineFieldSlugPattern, "Byline field slug must contain only lowercase letters, digits, and underscores, and start with a letter").refine((slug) => !RESERVED_SET.has(slug), { message: "Byline field slug is reserved" });
var bylineFieldLabel = z.string().min(1, "Byline field label is required").max(MAX_LABEL_LENGTH, `Byline field label must be ${MAX_LABEL_LENGTH} characters or less`);
var bylineFieldCreateBody = z.object({
	slug: bylineFieldSlug,
	label: bylineFieldLabel,
	type: bylineFieldTypeValues,
	required: z.boolean().optional(),
	translatable: z.boolean().optional(),
	validation: bylineFieldValidationSchema.optional(),
	sortOrder: z.number().int().min(0).optional()
}).strict().meta({ id: "BylineFieldCreateBody" });
/**
* Update body. `slug` and `type` are intentionally absent — both are
* immutable post-create (changing them would invalidate stored values).
* `translatable` flips are gated at the registry layer when value rows
* exist (`TRANSLATABLE_LOCKED`).
*/
var bylineFieldUpdateBody = z.object({
	label: bylineFieldLabel.optional(),
	required: z.boolean().optional(),
	translatable: z.boolean().optional(),
	validation: bylineFieldValidationSchema.optional(),
	sortOrder: z.number().int().min(0).optional()
}).strict().meta({ id: "BylineFieldUpdateBody" });
var bylineFieldReorderBody = z.object({ slugs: z.array(bylineFieldSlug) }).strict().meta({ id: "BylineFieldReorderBody" });
var bylineFieldDefinitionSchema = z.object({
	id: z.string(),
	slug: z.string(),
	label: z.string(),
	type: bylineFieldTypeValues,
	required: z.boolean(),
	translatable: z.boolean(),
	validation: z.object({ options: z.array(z.string()).optional() }).nullable(),
	sortOrder: z.number().int(),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "BylineFieldDefinition" });
z.object({ items: z.array(bylineFieldDefinitionSchema) }).meta({ id: "BylineFieldListResponse" });
z.object({
	translatableValueCount: z.number().int().nonnegative(),
	groupValueCount: z.number().int().nonnegative(),
	totalAffectedRows: z.number().int().nonnegative()
}).meta({ id: "BylineFieldUsageResponse" });
var slugPattern = /^[a-z][a-z0-9_]*$/;
var collectionSlug = z.string().min(1).max(63).regex(slugPattern, "Invalid collection slug format");
z.object({
	name: z.string().min(1).max(63).regex(slugPattern, "Name must be lowercase alphanumeric with underscores"),
	parentCollection: collectionSlug.optional(),
	childCollection: collectionSlug.optional(),
	parentLabel: z.string().min(1).max(200),
	childLabel: z.string().min(1).max(200),
	locale: z.string().min(1).optional(),
	translationOf: z.string().min(1).optional()
}).refine((body) => body.translationOf !== void 0 || body.parentCollection !== void 0 && body.childCollection !== void 0, { message: "parentCollection and childCollection are required unless translationOf is set" }).meta({ id: "CreateRelationBody" });
z.object({
	parentLabel: z.string().min(1).max(200).optional(),
	childLabel: z.string().min(1).max(200).optional()
}).refine((body) => body.parentLabel !== void 0 || body.childLabel !== void 0, { message: "At least one of parentLabel or childLabel is required" }).meta({ id: "UpdateRelationBody" });
z.object({ childIds: z.array(z.string().min(1)).max(1e3) }).meta({ id: "SetReferenceChildrenBody" });
var relationDefSchema = z.object({
	id: z.string(),
	name: z.string(),
	parentCollection: z.string(),
	childCollection: z.string(),
	parentLabel: z.string(),
	childLabel: z.string(),
	locale: z.string(),
	translationGroup: z.string()
}).meta({ id: "RelationDef" });
z.object({ relations: z.array(relationDefSchema) }).meta({ id: "RelationListResponse" });
z.object({ relation: relationDefSchema }).meta({ id: "RelationResponse" });
z.object({
	translationGroup: z.string(),
	translations: z.array(z.object({
		id: z.string(),
		name: z.string(),
		locale: z.string(),
		parentLabel: z.string(),
		childLabel: z.string()
	}))
}).meta({ id: "RelationTranslations" });
var entryRefSchema = z.object({
	id: z.string(),
	slug: z.string().nullable(),
	collection: z.string(),
	locale: z.string().nullable(),
	sortOrder: z.number().int().optional()
}).meta({ id: "ReferenceEntryRef" });
z.object({
	children: z.array(entryRefSchema),
	nextCursor: z.string().optional()
}).meta({ id: "ReferenceChildrenResponse" });
z.object({
	parents: z.array(entryRefSchema),
	nextCursor: z.string().optional()
}).meta({ id: "ReferenceParentsResponse" });
//#endregion
export { createTaxonomyDefBody as $, bylinesListQuery as A, contentScheduleBody as B, wpPrepareBody as C, updateSectionBody as Ct, bylineCreateBody as D, usersListQuery as Dt, allowedDomainUpdateBody as E, userUpdateBody as Et, contentBylineInputSchema as F, createCollectionBody as G, contentTermsBody as H, contentCreateBody as I, createMenuBody as J, createCommentBody as K, contentListQuery as L, commentBulkBody as M, commentListQuery as N, bylineTranslationCreateBody as O, isTerminalStatus as Ot, commentStatusBody as P, createSectionBody as Q, contentPreviewUrlBody as R, wpPluginExecuteBody as S, updateRedirectBody as St, allowedDomainCreateBody as T, updateWidgetBody as Tt, contentTrashQuery as U, contentSeoInput as V, contentUpdateBody as W, createReactionBody as X, createMenuItemBody as Y, createRedirectBody as Z, setupBody as _, settingsUpdateBody as _t, importProbeBody as a, notFoundPruneBody as at, wpMediaImportBody as b, updateMenuBody as bt, inviteRegisterOptionsBody as c, redirectsListQuery as ct, passkeyRegisterOptionsBody as d, sanitizeHref as dt, createTermBody as et, passkeyRegisterVerifyBody as f, searchEnableBody as ft, setupAdminVerifyBody as g, sectionsListQuery as gt, setupAdminBody as h, searchSuggestQuery as ht, bylineFieldUpdateBody as i, notFoundListQuery as it, collectionGetQuery as j, bylineUpdateBody as k, magicLinkSendBody as l, reorderMenuItemsBody as lt, passkeyVerifyBody as m, searchRebuildBody as mt, bylineFieldCreateBody as n, createWidgetBody as nt, inviteCompleteBody as o, notFoundSummaryQuery as ot, passkeyRenameBody as p, searchQuery as pt, createFieldBody as q, bylineFieldReorderBody as r, fieldReorderBody as rt, inviteCreateBody as s, orphanRegisterBody as st, authMeActionBody as t, createWidgetAreaBody as tt, passkeyOptionsBody as u, reorderWidgetsBody as ut, signupCompleteBody as v, updateCollectionBody as vt, wpRewriteUrlsBody as w, updateTermBody as wt, wpPluginAnalyzeBody as x, updateMenuItemBody as xt, signupRequestBody as y, updateFieldBody as yt, contentPublishBody as z };
