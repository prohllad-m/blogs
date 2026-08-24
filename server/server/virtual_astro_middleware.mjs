import { t as __exportAll } from "./chunks/rolldown-runtime_D7D4PA-g.mjs";
import { n as defineMiddleware, t as sequence } from "./chunks/sequence_7DdI3OEt.mjs";
import { c as setI18nConfig, i as runMigrations, n as MIGRATION_RACE_WAIT_MS, p as isSqlite, t as ConcurrentMigrationTimeoutError, v as validateIdentifier } from "./chunks/runner-DfnZ5eUr_D0TboABR.mjs";
import { t as after } from "./chunks/after-B1IIdH3Y_B4Q-P28s.mjs";
import { n as getRequestContext, r as runWithContext, t as createRequestMetrics } from "./chunks/request-context_CPPdnJdE.mjs";
import "./chunks/object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./chunks/base64-B-PsqheR_BCqhUefc.mjs";
import "./chunks/types-D1iJ3DpO_B-DMySoc.mjs";
import "./chunks/comment-DPT0WKyd_BkkyuYSh.mjs";
import { t as OptionsRepository } from "./chunks/options-BlmBHTvX_nqkCch6f.mjs";
import { n as isMissingTableError } from "./chunks/db-errors-CcWLaRiR_Cao0JsBD.mjs";
import { n as RevisionRepository, t as ContentRepository } from "./chunks/content-Ci04z2z-_B6s9HI1r.mjs";
import { t as MediaRepository } from "./chunks/media-BjhhENaJ_DtGEF5D8.mjs";
import "./chunks/user-Bh-L1qo6_BTeGs-hv.mjs";
import "./chunks/taxonomy-DfVooU4W_BOv42Utk.mjs";
import { n as hashString } from "./chunks/hash-DFFrkivP_B6GyA9Pb.mjs";
import "./chunks/enrich-CFJJgxs__DOmAe8vI.mjs";
import { A as handleMediaCreate, C as handleContentUpdate, G as handleRevisionGet, K as handleRevisionList, M as handleMediaGet, N as handleMediaList, P as handleMediaUpdate, S as handleContentUnschedule, _ as handleContentPublish, a as handleContentCompare, b as handleContentTranslations, c as handleContentCreate, ct as normalizeRegistryConfig, d as handleContentDuplicate, dt as EmDashStorageError, f as handleContentGet, g as handleContentPermanentDelete, h as handleContentListTrashed, i as handleContentAuthors, j as handleMediaDelete, l as handleContentDelete, m as handleContentList, o as handleContentCountScheduled, p as handleContentGetIncludingTrashed, q as handleRevisionRestore, s as handleContentCountTrashed, st as loadBundleFromR2, u as handleContentDiscardDraft, ut as validateRev, v as handleContentRestore, x as handleContentUnpublish, y as handleContentSchedule } from "./chunks/query-Di7DOmPV_CieW2RCL.mjs";
import { n as normalizeMediaValue } from "./chunks/normalize-C-SHXmra_BUW3AYb_.mjs";
import { f as markContentMediaUsageCollectionStale, l as findNonTranslatableSiblingContentIds, m as refreshContentMediaUsageAfterWrite, s as deleteContentMediaUsage } from "./chunks/content-refresh-D4khvC0R_Bxt0RQoB.mjs";
import { i as setRequestCacheEntry, r as requestCached } from "./chunks/request-cache-BSUptuJR_CCaufTtE.mjs";
import { a as getDb, c as createRecorder, d as kyselyLogOption, l as flushRecorder, u as isInstrumentationEnabled } from "./chunks/loader-Be3ouI5L_CXV56CH4.mjs";
import { n as initWithLock, t as createInitLock } from "./chunks/init-lock-DJkX6Hto_Dl9vw1Zr.mjs";
import { r as singleFlightCached, t as createSingleFlightCache } from "./chunks/single-flight-cache-C2exrGAi_BcVHQM9d.mjs";
import { r as invalidateSiteSettingsCache, t as getSiteSettings } from "./chunks/settings-CpA4lQFt_C9lm7kb6.mjs";
import "./chunks/ssrf-CviKqWmq_6hEIMCxY.mjs";
import { n as CronExecutor } from "./chunks/cron-BlKIMD_e_DS642EIr.mjs";
import { a as PluginRouteRegistry, c as createNoopSandboxRunner, d as resolveExclusiveHooks, i as NodeCronScheduler, l as definePlugin, n as AuditRepository, o as buildRouteMeta, p as createSiteInfo, r as EmailPipeline, s as createHookPipeline, u as getMenu } from "./chunks/dist_e9pyH8uL.mjs";
import "./chunks/resolve-Cd9dzclN_C_W0skoc.mjs";
import { r as normalizeManifestRoute } from "./chunks/manifest-schema-bCq54i7F_D0gLHu7z.mjs";
import "./chunks/media-kIV1IxFf_BRR3CdsF.mjs";
import { Ot as isTerminalStatus } from "./chunks/relations-5_avdrN__CvbT7cha.mjs";
import { t as getTrustedProxyHeaders } from "./chunks/trusted-proxy-CwjQj0YG_DN-afxUp.mjs";
import { n as sanitizeHeadersForSandbox, t as extractRequestMeta } from "./chunks/request-meta-DzXYYI-n_DftRpL7v.mjs";
import "./chunks/comment-reaction-C65MldIB_Cr-efTY3.mjs";
import "./chunks/menus-CZyG6rvx_y54L2Ozg.mjs";
import { t as RedirectRepository } from "./chunks/redirect-CgLPYflR_CplqVHl6.mjs";
import "./chunks/byline-registry-BCuOp4UF_EQhUHNLu.mjs";
import "./chunks/field-defs-cache-DvmlgP-D_bBrZBINr.mjs";
import "./chunks/byline-XEjchwzZ_MSMp-1jc.mjs";
import { t as FTSManager } from "./chunks/fts-manager-DzqIBrrW_C8Ds5uQp.mjs";
import { o as getTaxonomyDefs, s as getTaxonomyTerms } from "./chunks/taxonomies-DjSKBZpq_OMwze2dv.mjs";
import { a as setCachedRedirects, i as matchCachedPatterns, n as getCachedRedirects } from "./chunks/cache-CGCd6AVM_NiDm1kDt.mjs";
import { n as SchemaRegistry } from "./chunks/registry-FV15nLge_C-lxn3gO.mjs";
import { t as PluginStateRepository } from "./chunks/state-xxv6ZTMv_D5f1Efgc.mjs";
import { d as hasScope } from "./chunks/passkey_aQ3O1Vf-.mjs";
import { i as Permissions } from "./chunks/dist_Cewgrg50.mjs";
import "./chunks/dashboard-C5NkXFbi_Bb2RpPsp.mjs";
import "./chunks/media-usage-CljdO1mc_DAoaqekq.mjs";
import "./chunks/zod-generator-B5prQ5M4_D0jJDS58.mjs";
import "./chunks/schema-BXxlHeAf_DhiqKlY6.mjs";
import "./chunks/sections-CwW4s1al_qO0B4soT.mjs";
import "./chunks/settings-C4s8hFQm_B9SCTO5I.mjs";
import "./chunks/taxonomies-Ce49uIzY_W3kbPv94.mjs";
import { t as apiError } from "./chunks/error-CEGF6UZb_BSWyf8Gu.mjs";
import "./chunks/parse-C_-6klII_DXl37F4C.mjs";
import { s as invalidateUrlPatternCache } from "./chunks/query-DR73ZNfm_EHQZ48QK.mjs";
import "./chunks/import-Dmkm8S1W_BkjX2KEB.mjs";
import "./chunks/email-console-C-9Ng8DM_ByaQbxDJ.mjs";
import { n as parseContentId, r as verifyPreviewToken } from "./chunks/preview-D4Jnbfx7_BwRiGWvY.mjs";
import "./chunks/bylines-czseViYo_BLHCxP7O.mjs";
import { t as getWidgetAreas } from "./chunks/widgets-DGv1Z04V_BE6MZJhO.mjs";
import "./chunks/apply-CmIJK9j8_CfEBysf6.mjs";
import "./chunks/load-Cx27ki1l_DsJXBmd0.mjs";
import "./chunks/search-Bff-7jFt_Dr2xnFF5.mjs";
import { n as VERSION, t as COMMIT } from "./chunks/version-907opKac_BV2oeYba.mjs";
import { t as getAuthMode } from "./chunks/mode-fiXRMfeA_Cazv9x_J.mjs";
import { c as maybeRunScheduledBackup } from "./chunks/backup-S8kFWtwD_NI2TJnm3.mjs";
import { t as cleanupExpiredChallenges } from "./chunks/challenge-store-BFzgFRog_DS26Bg5F.mjs";
import { n as validateEncryptionKeyAtStartup, t as resolveSecretsCached } from "./chunks/secrets-CSwQIl4q_CA0X4cuR.mjs";
import { t as resolveSessionUser } from "./chunks/session-user-DbHqKDKe_Cjd5mNt2.mjs";
import { t as config_default } from "./chunks/config_DXAHziw6.mjs";
import { n as createRequestScopedDb, t as createDialect } from "./chunks/dialect_nOuXJYOZ.mjs";
import { t as mediaProviders } from "./chunks/media-providers_DtUD1y6N.mjs";
import { t as createKyselyAdapter } from "./chunks/kysely_6BTjyg_S.mjs";
import { n as getPublicOrigin } from "./chunks/public-url-DSGTnJFw__NsO_zTH.mjs";
import "./chunks/api-tokens-Cvmixds7_yggTcVRS.mjs";
import { a as resolveOAuthToken, i as resolveApiToken } from "./chunks/api-tokens-uPt8UDpx_Dfb85tFQ.mjs";
import { Kysely, sql } from "kysely";
import "ulidx";
import { z } from "zod";
import { DeleteObjectCommand, GetObjectCommand, HeadObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
//#region \0virtual:emdash/plugins
var plugins = [];
//#endregion
//#region \0virtual:emdash/sandbox-runner
var sandbox_runner_exports = /* @__PURE__ */ __exportAll({
	createSandboxRunner: () => createSandboxRunner,
	sandboxEnabled: () => false
});
var createSandboxRunner = createNoopSandboxRunner;
//#endregion
//#region \0virtual:emdash/sandboxed-plugins
var sandboxedPlugins = [];
//#endregion
//#region \0virtual:emdash/scheduler
function createScheduler(executor) {
	return new NodeCronScheduler(executor);
}
//#endregion
//#region node_modules/emdash/dist/storage/s3.mjs
/**
* S3-Compatible Storage Implementation
*
* Uses the AWS SDK v3 for S3 operations.
* Works with AWS S3, Cloudflare R2, Minio, and other S3-compatible services.
*/
var ENV_KEYS = {
	endpoint: "S3_ENDPOINT",
	bucket: "S3_BUCKET",
	accessKeyId: "S3_ACCESS_KEY_ID",
	secretAccessKey: "S3_SECRET_ACCESS_KEY",
	region: "S3_REGION",
	publicUrl: "S3_PUBLIC_URL"
};
function fail(msg) {
	throw new EmDashStorageError(msg, "MISSING_S3_CONFIG");
}
var s3ConfigSchema = z.object({
	endpoint: z.url({
		protocol: /^https?$/,
		error: "is not a valid http/https URL"
	}).optional(),
	bucket: z.string().optional(),
	accessKeyId: z.string().optional(),
	secretAccessKey: z.string().optional(),
	region: z.string().optional(),
	publicUrl: z.string().optional()
});
function isConfigKey(key) {
	return typeof key === "string" && key in ENV_KEYS;
}
/**
* Build the merged config: for each field, use the explicit value if present,
* otherwise fall back to the corresponding S3_* env var.  Validate once on the
* final merged result so a malformed env var never breaks the build when the
* caller provides that field explicitly.
*/
function resolveS3Config(partial) {
	const raw = {};
	for (const [field, envKey] of Object.entries(ENV_KEYS)) {
		const explicit = partial[field];
		if (explicit !== void 0 && explicit !== "") {
			raw[field] = explicit;
			continue;
		}
		const envVal = typeof process !== "undefined" && process.env ? process.env[envKey] : void 0;
		if (envVal !== void 0 && envVal !== "") raw[field] = envVal;
	}
	const result = s3ConfigSchema.safeParse(raw);
	if (!result.success) {
		const issue = result.error.issues[0];
		const pathKey = issue?.path[0];
		if (!issue || !isConfigKey(pathKey)) fail("S3 config validation failed");
		fail(`${partial[pathKey] !== void 0 && partial[pathKey] !== "" ? `s3({ ${pathKey} })` : ENV_KEYS[pathKey]} ${issue.message}`);
	}
	const merged = result.data;
	const endpoint = merged.endpoint;
	const bucket = merged.bucket;
	if (!endpoint || !bucket) {
		const missing = [];
		if (!endpoint) missing.push(`endpoint: set ${ENV_KEYS.endpoint} or pass endpoint to s3({...})`);
		if (!bucket) missing.push(`bucket: set ${ENV_KEYS.bucket} or pass bucket to s3({...})`);
		fail(`missing required S3 config: ${missing.join("; ")}`);
	}
	const accessKeyId = merged.accessKeyId;
	const secretAccessKey = merged.secretAccessKey;
	if (accessKeyId && !secretAccessKey) fail(`S3 credentials incomplete: accessKeyId is set but secretAccessKey is missing (set ${ENV_KEYS.secretAccessKey} or pass secretAccessKey to s3({...}))`);
	if (secretAccessKey && !accessKeyId) fail(`S3 credentials incomplete: secretAccessKey is set but accessKeyId is missing (set ${ENV_KEYS.accessKeyId} or pass accessKeyId to s3({...}))`);
	return {
		...merged,
		endpoint,
		bucket
	};
}
var TRAILING_SLASH_PATTERN = /\/$/;
/** Type guard for AWS SDK errors (have a `name` property) */
function hasErrorName(error) {
	return error instanceof Error && typeof error.name === "string";
}
/**
* S3-compatible storage implementation
*/
var S3Storage = class {
	client;
	bucket;
	publicUrl;
	endpoint;
	constructor(config) {
		this.bucket = config.bucket;
		this.publicUrl = config.publicUrl;
		this.endpoint = config.endpoint;
		this.client = new S3Client({
			endpoint: config.endpoint,
			region: config.region || "auto",
			forcePathStyle: true,
			...config.accessKeyId && config.secretAccessKey ? { credentials: {
				accessKeyId: config.accessKeyId,
				secretAccessKey: config.secretAccessKey
			} } : {}
		});
	}
	async upload(options) {
		try {
			let body;
			if (options.body instanceof ReadableStream) {
				const chunks = [];
				const reader = options.body.getReader();
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					chunks.push(value);
				}
				body = Buffer.concat(chunks);
			} else body = options.body;
			await this.client.send(new PutObjectCommand({
				Bucket: this.bucket,
				Key: options.key,
				Body: body,
				ContentType: options.contentType
			}));
			return {
				key: options.key,
				url: this.getPublicUrl(options.key),
				size: body.length
			};
		} catch (error) {
			throw new EmDashStorageError(`Failed to upload file: ${options.key}`, "UPLOAD_FAILED", error);
		}
	}
	async download(key) {
		try {
			const response = await this.client.send(new GetObjectCommand({
				Bucket: this.bucket,
				Key: key
			}));
			if (!response.Body) throw new EmDashStorageError(`File not found: ${key}`, "NOT_FOUND");
			return {
				body: response.Body.transformToWebStream(),
				contentType: response.ContentType || "application/octet-stream",
				size: response.ContentLength || 0
			};
		} catch (error) {
			if (error instanceof EmDashStorageError || hasErrorName(error) && error.name === "NoSuchKey") throw new EmDashStorageError(`File not found: ${key}`, "NOT_FOUND", error);
			throw new EmDashStorageError(`Failed to download file: ${key}`, "DOWNLOAD_FAILED", error);
		}
	}
	async delete(key) {
		try {
			await this.client.send(new DeleteObjectCommand({
				Bucket: this.bucket,
				Key: key
			}));
		} catch (error) {
			if (!hasErrorName(error) || error.name !== "NoSuchKey") throw new EmDashStorageError(`Failed to delete file: ${key}`, "DELETE_FAILED", error);
		}
	}
	async exists(key) {
		try {
			await this.client.send(new HeadObjectCommand({
				Bucket: this.bucket,
				Key: key
			}));
			return true;
		} catch (error) {
			if (hasErrorName(error) && error.name === "NotFound") return false;
			throw new EmDashStorageError(`Failed to check file existence: ${key}`, "HEAD_FAILED", error);
		}
	}
	async list(options = {}) {
		try {
			const response = await this.client.send(new ListObjectsV2Command({
				Bucket: this.bucket,
				Prefix: options.prefix,
				MaxKeys: options.limit,
				ContinuationToken: options.cursor
			}));
			return {
				files: (response.Contents || []).map((item) => ({
					key: item.Key,
					size: item.Size || 0,
					lastModified: item.LastModified || /* @__PURE__ */ new Date(),
					etag: item.ETag
				})),
				nextCursor: response.NextContinuationToken
			};
		} catch (error) {
			throw new EmDashStorageError("Failed to list files", "LIST_FAILED", error);
		}
	}
	async getSignedUploadUrl(options) {
		try {
			const expiresIn = options.expiresIn || 3600;
			const command = new PutObjectCommand({
				Bucket: this.bucket,
				Key: options.key,
				ContentType: options.contentType,
				ContentLength: options.size
			});
			const url = await getSignedUrl(this.client, command, { expiresIn });
			const expiresAt = new Date(Date.now() + expiresIn * 1e3).toISOString();
			return {
				url,
				method: "PUT",
				headers: {
					"Content-Type": options.contentType,
					...options.size ? { "Content-Length": String(options.size) } : {}
				},
				expiresAt
			};
		} catch (error) {
			throw new EmDashStorageError(`Failed to generate signed URL for: ${options.key}`, "SIGNED_URL_FAILED", error);
		}
	}
	getPublicUrl(key) {
		if (this.publicUrl) return `${this.publicUrl.replace(TRAILING_SLASH_PATTERN, "")}/${key}`;
		return `/_emdash/api/media/file/${key}`;
	}
};
/**
* Create S3 storage adapter
* This is the factory function called at runtime.
* Config fields are merged with S3_* env vars; env vars fill in any missing fields.
*/
function createStorage$1(config) {
	return new S3Storage(resolveS3Config(config));
}
//#endregion
//#region \0virtual:emdash/storage
var createStorage = createStorage$1;
//#endregion
//#region node_modules/emdash/dist/astro/middleware.mjs
function createSandboxRunnerOptions(options, siteInfo) {
	return {
		...options,
		siteInfo: createSiteInfo(siteInfo ?? {})
	};
}
var REVISION_KEEP_COUNT = 50;
var REVISION_PRUNE_THRESHOLD = REVISION_KEEP_COUNT;
async function runSystemCleanup(db, storage) {
	const result = {
		challenges: -1,
		expiredTokens: -1,
		pendingUploads: -1,
		pendingUploadFiles: -1,
		revisionsPruned: -1
	};
	try {
		result.challenges = await cleanupExpiredChallenges(db);
	} catch (error) {
		console.error("[cleanup] Failed to clean expired challenges:", error);
	}
	try {
		await createKyselyAdapter(db).deleteExpiredTokens();
		result.expiredTokens = 0;
	} catch (error) {
		console.error("[cleanup] Failed to clean expired tokens:", error);
	}
	try {
		const orphanedKeys = await new MediaRepository(db).cleanupPendingUploads();
		result.pendingUploads = orphanedKeys.length;
		if (storage && orphanedKeys.length > 0) {
			let filesDeleted = 0;
			for (const key of orphanedKeys) try {
				await storage.delete(key);
				filesDeleted++;
			} catch (error) {
				console.error(`[cleanup] Failed to delete storage file ${key}:`, error);
			}
			result.pendingUploadFiles = filesDeleted;
		} else result.pendingUploadFiles = 0;
	} catch (error) {
		console.error("[cleanup] Failed to clean pending uploads:", error);
	}
	try {
		result.revisionsPruned = await pruneExcessiveRevisions(db);
	} catch (error) {
		console.error("[cleanup] Failed to prune revisions:", error);
	}
	return result;
}
async function pruneExcessiveRevisions(db) {
	const entries = await sql`
		SELECT collection, entry_id
		FROM revisions
		GROUP BY collection, entry_id
		HAVING COUNT(*) > ${REVISION_PRUNE_THRESHOLD}
	`.execute(db);
	if (entries.rows.length === 0) return 0;
	const revisionRepo = new RevisionRepository(db);
	let totalPruned = 0;
	for (const row of entries.rows) try {
		const pruned = await revisionRepo.pruneOldRevisions(row.collection, row.entry_id, REVISION_KEEP_COUNT);
		totalPruned += pruned;
	} catch (error) {
		console.error(`[cleanup] Failed to prune revisions for ${row.collection}/${row.entry_id}:`, error);
	}
	return totalPruned;
}
var DEFAULT_COMMENT_MODERATOR_PLUGIN_ID = "emdash-default-comment-moderator";
async function defaultCommentModerate(event, _ctx) {
	const { comment, collectionSettings, priorApprovedCount } = event;
	if (collectionSettings.commentsAutoApproveUsers && comment.authorUserId) return {
		status: "approved",
		reason: "Authenticated CMS user"
	};
	if (collectionSettings.commentsModeration === "none") return {
		status: "approved",
		reason: "Moderation disabled"
	};
	if (collectionSettings.commentsModeration === "first_time" && priorApprovedCount > 0) return {
		status: "approved",
		reason: "Returning commenter"
	};
	return {
		status: "pending",
		reason: "Held for review"
	};
}
var SCHEDULED_PUBLISH_BATCH_LIMIT = 100;
async function publishDueContent(db, options = {}) {
	const { publish, onPublished, limit = SCHEDULED_PUBLISH_BATCH_LIMIT } = options;
	const published = [];
	let collections;
	try {
		collections = await new SchemaRegistry(db).listCollections();
	} catch (error) {
		console.error("[scheduled-publish] Failed to list collections:", error);
		return published;
	}
	const repo = new ContentRepository(db);
	const doPublish = publish ?? ((collection, id, opts) => handleContentPublish(db, collection, id, opts));
	const batchLimit = limit > 0 ? limit : void 0;
	for (const collection of collections) try {
		const due = await repo.findReadyToPublish(collection.slug, batchLimit);
		const batch = [];
		for (const item of due) {
			const publishedAt = item.publishedAt == null ? item.scheduledAt ?? void 0 : void 0;
			const result = await doPublish(collection.slug, item.id, {
				publishedAt,
				requireScheduledDue: true
			});
			if (result.success) batch.push({
				collection: collection.slug,
				id: item.id
			});
			else if (result.error?.code === "NOT_DUE") {} else console.error(`[scheduled-publish] Failed to publish ${collection.slug}/${item.id}:`, result.error);
		}
		if (batch.length > 0) {
			published.push(...batch);
			if (onPublished) try {
				await onPublished(batch);
			} catch (error) {
				console.error(`[scheduled-publish] onPublished failed after "${collection.slug}" batch:`, error);
			}
		}
	} catch (error) {
		console.error(`[scheduled-publish] Sweep failed for "${collection.slug}":`, error);
	}
	return published;
}
var LEADING_SLASH_PATTERN = /^\//;
function parseStringArray(raw) {
	if (!raw) return [];
	const parsed = JSON.parse(raw);
	if (!Array.isArray(parsed)) return [];
	return parsed.filter((v) => typeof v === "string");
}
var VALID_METADATA_KINDS = /* @__PURE__ */ new Set([
	"meta",
	"property",
	"link",
	"jsonld"
]);
var VALID_LINK_REL = /* @__PURE__ */ new Set([
	"canonical",
	"alternate",
	"author",
	"license",
	"nlweb",
	"site.standard.document"
]);
function isValidMetadataContribution(c) {
	if (!c || typeof c !== "object" || !("kind" in c)) return false;
	const obj = c;
	if (typeof obj.kind !== "string" || !VALID_METADATA_KINDS.has(obj.kind)) return false;
	switch (obj.kind) {
		case "meta": return typeof obj.name === "string" && typeof obj.content === "string";
		case "property": return typeof obj.property === "string" && typeof obj.content === "string";
		case "link": return typeof obj.href === "string" && typeof obj.rel === "string" && VALID_LINK_REL.has(obj.rel);
		case "jsonld": return obj.graph != null && typeof obj.graph === "object";
		default: return false;
	}
}
var FIELD_TYPE_TO_KIND = {
	string: "string",
	slug: "string",
	url: "url",
	text: "richText",
	number: "number",
	integer: "number",
	boolean: "boolean",
	datetime: "datetime",
	select: "select",
	multiSelect: "multiSelect",
	portableText: "portableText",
	image: "image",
	file: "file",
	reference: "reference",
	json: "json",
	repeater: "repeater"
};
function contentItemToRecord(item) {
	return { ...item };
}
var DB_INIT_DEADLINE_MS = MIGRATION_RACE_WAIT_MS + 2e4;
var DB_HOLDER_KEY = /* @__PURE__ */ Symbol.for("emdash:db-cache");
var globalSymbolStore = globalThis;
function getDbHolder() {
	let holder = globalSymbolStore[DB_HOLDER_KEY];
	if (!holder) {
		holder = {
			cache: /* @__PURE__ */ new Map(),
			lock: createInitLock(),
			failures: /* @__PURE__ */ new Map()
		};
		globalSymbolStore[DB_HOLDER_KEY] = holder;
	}
	holder.failures ??= /* @__PURE__ */ new Map();
	return holder;
}
var DB_INIT_FAILURE_BACKOFF_MS = 3e4;
var SEED_HOLDER_KEY = /* @__PURE__ */ Symbol.for("emdash:seed-state");
function getSeedHolder() {
	let holder = globalSymbolStore[SEED_HOLDER_KEY];
	if (!holder) {
		holder = {
			done: /* @__PURE__ */ new Set(),
			lock: createInitLock()
		};
		globalSymbolStore[SEED_HOLDER_KEY] = holder;
	}
	return holder;
}
var storageCache = /* @__PURE__ */ new Map();
var sandboxedPluginCache = /* @__PURE__ */ new Map();
var marketplacePluginKeys = /* @__PURE__ */ new Set();
var registryPluginKeys = /* @__PURE__ */ new Set();
var marketplaceManifestCache = /* @__PURE__ */ new Map();
var sandboxedRouteMetaCache = /* @__PURE__ */ new Map();
var sandboxRunner = null;
var EmDashRuntime = class EmDashRuntime2 {
	/**
	* The singleton database instance (worker-lifetime cached).
	* Use the `db` getter instead — it checks the request context first
	* for per-request overrides (D1 read replica sessions, DO multi-site).
	*/
	_db;
	storage;
	configuredPlugins;
	sandboxedPlugins;
	sandboxedPluginEntries;
	/**
	* Schema registry bound to the current request/event-scoped connection.
	* Built per access (SchemaRegistry just wraps a db) against `this.db`, the
	* ALS-aware getter — never a captured snapshot of the singleton. On a
	* connection-backed adapter (Postgres over Hyperdrive) a captured singleton
	* would query a socket opened by an earlier event and trip workerd's
	* cross-request I/O guard; the catch in handlers like handleContentUpdate
	* would then silently treat a revision-enabled collection as non-revisioned
	* and write draft edits to live columns. Same reasoning as the per-call
	* registry in _buildManifest().
	*/
	get schemaRegistry() {
		return new SchemaRegistry(this.db);
	}
	_hooks;
	config;
	mediaProviders;
	mediaProviderEntries;
	cronExecutor;
	email;
	cronScheduler;
	enabledPlugins;
	pluginStates;
	/**
	* Isolate-lifetime guard so FTS indexes are verified at most once per
	* worker rather than on every admin request. See ensureSearchHealthy().
	* Uses the poison-immune single-flight cache (never a shared awaitable
	* promise) so a cancelled first caller can't wedge later ones.
	*/
	_searchHealthCache = createSingleFlightCache();
	/** Current hook pipeline. Use the `hooks` getter for external access. */
	get hooks() {
		return this._hooks;
	}
	/** All plugins eligible for the hook pipeline (includes built-in plugins).
	*  Stored so we can rebuild the pipeline when plugins are enabled/disabled. */
	allPipelinePlugins;
	/** Factory options for the hook pipeline context factory */
	pipelineFactoryOptions;
	/** Dependencies needed for exclusive hook resolution */
	runtimeDeps;
	/** Mutable ref for the cron invokeCronHook closure to read the current pipeline */
	pipelineRef;
	/**
	* Get the database instance for the current request.
	*
	* Checks the ALS-based request context first — middleware sets a
	* per-request Kysely instance there for D1 read replica sessions
	* or DO preview databases. Falls back to the singleton instance.
	*/
	get db() {
		const ctx = getRequestContext();
		if (ctx?.db) return ctx.db;
		return this._db;
	}
	constructor(parts) {
		this._db = parts.db;
		this.storage = parts.storage;
		this.configuredPlugins = parts.configuredPlugins;
		this.sandboxedPlugins = parts.sandboxedPlugins;
		this.sandboxedPluginEntries = parts.sandboxedPluginEntries;
		this._hooks = parts.hooks;
		this.enabledPlugins = parts.enabledPlugins;
		this.pluginStates = parts.pluginStates;
		this.config = parts.config;
		this.mediaProviders = parts.mediaProviders;
		this.mediaProviderEntries = parts.mediaProviderEntries;
		this.cronExecutor = parts.cronExecutor;
		this.cronScheduler = parts.cronScheduler;
		this.email = parts.emailPipeline;
		this.allPipelinePlugins = parts.allPipelinePlugins;
		this.pipelineFactoryOptions = parts.pipelineFactoryOptions;
		this.runtimeDeps = parts.runtimeDeps;
		this.pipelineRef = parts.pipelineRef;
	}
	/**
	* Get the sandbox runner instance (for marketplace install/update)
	*/
	getSandboxRunner() {
		return sandboxRunner;
	}
	/**
	* Whether the sandbox bypass mode (sandbox: false) is active.
	* Marketplace install/update handlers use this to skip the
	* SANDBOX_NOT_AVAILABLE gate, since the bypass path loads
	* marketplace plugins in-process via syncMarketplacePlugins().
	*/
	isSandboxBypassed() {
		return this.runtimeDeps.sandboxBypassed === true;
	}
	/**
	* Publish any content whose scheduled time has passed.
	* Returns the items promoted so callers can invalidate their cache tags.
	*/
	async publishScheduled() {
		return publishDueContent(this.db, { publish: (collection, id, options) => this.handleContentPublish(collection, id, options) });
	}
	/**
	* Run the full scheduled-maintenance batch: cron tasks, scheduled
	* publishing, and system cleanup. For request-less drivers — the
	* Cloudflare `scheduled()` handler invokes this from a Cron Trigger.
	* (On Node the timer-based scheduler drives the same work itself.)
	*
	* Each step is independent and non-fatal. Returns the content promoted
	* by the publishing sweep so the caller can purge edge-cache tags.
	*
	* `onPublished` (optional) is awaited after each collection's batch so a
	* request-less driver can invalidate edge-cache tags incrementally rather
	* than only after the whole sweep — bounding stale-cache exposure if the
	* runtime is killed mid-sweep.
	*/
	async runScheduledTasks(options = {}) {
		if (this.cronExecutor) {
			try {
				await this.cronExecutor.tick();
			} catch (error) {
				console.error("[cron] Tick failed:", error);
			}
			try {
				await this.cronExecutor.recoverStaleLocks();
			} catch (error) {
				console.error("[cron] Stale lock recovery failed:", error);
			}
		}
		let published = [];
		try {
			published = await publishDueContent(this.db, {
				publish: (collection, id, opts) => this.handleContentPublish(collection, id, opts),
				onPublished: options.onPublished
			});
		} catch (error) {
			console.error("[scheduled-publish] Sweep failed:", error);
		}
		try {
			await runSystemCleanup(this.db, this.storage ?? void 0);
		} catch (error) {
			console.error("[cleanup] System cleanup failed:", error);
		}
		await maybeRunScheduledBackup(this.db, this.storage ?? void 0);
		return { published };
	}
	/**
	* Stop the cron scheduler gracefully.
	* Call during worker shutdown or hot-reload.
	*/
	async stopCron() {
		if (this.cronScheduler) await this.cronScheduler.stop();
	}
	/**
	* Update in-memory plugin status and rebuild the hook pipeline.
	*
	* Rebuilding the pipeline ensures disabled plugins' hooks stop firing
	* and re-enabled plugins' hooks start firing again without a restart.
	* Exclusive hook selections are re-resolved after each rebuild.
	*/
	async setPluginStatus(pluginId, status) {
		this.pluginStates.set(pluginId, status);
		if (status === "active") {
			this.enabledPlugins.add(pluginId);
			await this.rebuildHookPipeline();
			await this._hooks.runPluginActivate(pluginId);
		} else {
			await this._hooks.runPluginDeactivate(pluginId);
			this.enabledPlugins.delete(pluginId);
			await this.rebuildHookPipeline();
		}
	}
	/**
	* Rebuild the hook pipeline from the current set of enabled plugins.
	*
	* Filters `allPipelinePlugins` to only those in `enabledPlugins`,
	* creates a fresh HookPipeline, re-resolves exclusive hook selections,
	* and re-wires the context factory so existing references (cron
	* callbacks, email pipeline) use the new pipeline.
	*/
	async rebuildHookPipeline() {
		const newPipeline = createHookPipeline(this.allPipelinePlugins.filter((p) => this.enabledPlugins.has(p.id)), this.pipelineFactoryOptions);
		await EmDashRuntime2.resolveExclusiveHooks(newPipeline, this.db, this.runtimeDeps);
		if (this.email) newPipeline.setContextFactory({ emailPipeline: this.email });
		newPipeline.setContextFactory({ cronReschedule: () => this.cronScheduler?.reschedule() });
		if (this.email) this.email.setPipeline(newPipeline);
		this.pipelineRef.current = newPipeline;
		this._hooks = newPipeline;
	}
	/**
	* Synchronize marketplace plugin runtime state with DB + storage.
	*
	* Ensures install/update/uninstall changes take effect immediately in the
	* current worker: loads newly active plugins and removes uninstalled ones.
	*/
	async syncMarketplacePlugins() {
		if (!this.config.marketplace) return;
		if (this.runtimeDeps.sandboxBypassed) {
			await this.syncMarketplacePluginsBypassed();
			return;
		}
		await this.syncSandboxedSourcePlugins("marketplace");
	}
	/**
	* Synchronize registry plugin runtime state with DB + storage.
	*
	* Mirrors {@link syncMarketplacePlugins} for plugins installed via the
	* experimental decentralized plugin registry. Called after install,
	* update, and uninstall handlers complete.
	*/
	async syncRegistryPlugins() {
		if (!this.config.experimental?.registry) return;
		await this.syncSandboxedSourcePlugins("registry");
	}
	/**
	* Internal: reconcile in-memory sandboxed-plugin state with the
	* `_plugin_state` table for the given source tier. Shared
	* implementation behind {@link syncMarketplacePlugins} and
	* {@link syncRegistryPlugins}.
	*
	* Each source tier has its own key set in `${source}PluginKeys` so a
	* sync for one tier doesn't invalidate the other.
	*/
	async syncSandboxedSourcePlugins(source) {
		if (!this.storage) return;
		if (!sandboxRunner || !sandboxRunner.isAvailable()) return;
		const keySet = source === "marketplace" ? marketplacePluginKeys : registryPluginKeys;
		try {
			const stateRepo = new PluginStateRepository(this.db);
			const states = source === "marketplace" ? await stateRepo.getMarketplacePlugins() : await stateRepo.getRegistryPlugins();
			const desired = /* @__PURE__ */ new Map();
			for (const state of states) {
				this.pluginStates.set(state.pluginId, state.status);
				if (state.status === "active") this.enabledPlugins.add(state.pluginId);
				else this.enabledPlugins.delete(state.pluginId);
				if (state.status !== "active") continue;
				const desiredVersion = source === "marketplace" ? state.marketplaceVersion ?? state.version : state.version;
				desired.set(state.pluginId, desiredVersion);
			}
			const keysToRemove = [];
			for (const key of keySet) {
				const [pluginId] = key.split(":");
				if (!pluginId) continue;
				const desiredVersion = desired.get(pluginId);
				if (desiredVersion && key === `${pluginId}:${desiredVersion}`) continue;
				keysToRemove.push(key);
			}
			for (const key of keysToRemove) {
				const [pluginId] = key.split(":");
				if (!pluginId) continue;
				if (!desired.get(pluginId)) {
					this.pluginStates.delete(pluginId);
					this.enabledPlugins.delete(pluginId);
				}
				const existing = sandboxedPluginCache.get(key);
				if (existing) try {
					await existing.terminate();
				} catch (error) {
					console.warn(`EmDash: Failed to terminate sandboxed plugin ${key}:`, error);
				}
				sandboxedPluginCache.delete(key);
				this.sandboxedPlugins.delete(key);
				keySet.delete(key);
				if (pluginId) {
					sandboxedRouteMetaCache.delete(pluginId);
					marketplaceManifestCache.delete(pluginId);
				}
			}
			for (const [pluginId, version] of desired) {
				const key = `${pluginId}:${version}`;
				if (sandboxedPluginCache.has(key)) {
					keySet.add(key);
					continue;
				}
				const bundle = await loadBundleFromR2(this.storage, pluginId, version, source);
				if (!bundle) {
					console.warn(`EmDash: ${source} plugin ${pluginId}@${version} not found in R2`);
					continue;
				}
				const loaded = await sandboxRunner.load(bundle.manifest, bundle.backendCode);
				sandboxedPluginCache.set(key, loaded);
				this.sandboxedPlugins.set(key, loaded);
				keySet.add(key);
				marketplaceManifestCache.set(pluginId, {
					id: bundle.manifest.id,
					version: bundle.manifest.version,
					admin: bundle.manifest.admin,
					mcp: bundle.manifest.mcp
				});
				if (bundle.manifest.routes.length > 0) {
					const routeMetaMap = /* @__PURE__ */ new Map();
					for (const entry of bundle.manifest.routes) {
						const normalized = normalizeManifestRoute(entry);
						routeMetaMap.set(normalized.name, buildRouteMeta(normalized));
					}
					sandboxedRouteMetaCache.set(pluginId, routeMetaMap);
				} else sandboxedRouteMetaCache.delete(pluginId);
			}
		} catch (error) {
			console.error(`EmDash: Failed to sync ${source} plugins:`, error);
		}
	}
	/**
	* Remove a plugin from the in-memory pipeline lists by ID.
	* Mutates allPipelinePlugins and configuredPlugins in place.
	*/
	removePluginFromLists(pluginId) {
		const allIdx = this.allPipelinePlugins.findIndex((p) => p.id === pluginId);
		if (allIdx !== -1) this.allPipelinePlugins.splice(allIdx, 1);
		const configIdx = this.configuredPlugins.findIndex((p) => p.id === pluginId);
		if (configIdx !== -1) this.configuredPlugins.splice(configIdx, 1);
	}
	/**
	* Sync marketplace plugin metadata in sandbox: false bypass mode.
	*
	* In bypass mode the noop runner can't load plugins, but admin pages,
	* widgets, and route metadata still need to refresh in-process when an
	* admin installs/updates/uninstalls a marketplace plugin. Otherwise the
	* admin UI shows stale data until the server restarts.
	*
	* Hooks and routes still won't execute under bypass (matches the
	* cold-start bypass behavior in loadMarketplacePluginsBypassed).
	*
	* Known limitation: bypass plugins are loaded via `import(dataUrl)`,
	* which Node's ESM cache keys on the full URL. Updates create fresh
	* module objects, but old ones remain cached for the worker's lifetime.
	* In practice this is a few KB per update — only matters for sites with
	* very frequent marketplace updates running long-lived processes. The
	* fix would be vm.SourceTextModule for explicit lifecycle management.
	*/
	async syncMarketplacePluginsBypassed() {
		if (!this.storage) return;
		try {
			const marketplaceStates = await new PluginStateRepository(this.db).getMarketplacePlugins();
			const desired = /* @__PURE__ */ new Map();
			for (const state of marketplaceStates) {
				this.pluginStates.set(state.pluginId, state.status);
				if (state.status === "active") this.enabledPlugins.add(state.pluginId);
				else this.enabledPlugins.delete(state.pluginId);
				if (state.status !== "active") continue;
				desired.set(state.pluginId, state.marketplaceVersion ?? state.version);
			}
			const toRemove = [];
			for (const pluginId of marketplaceManifestCache.keys()) if (!desired.has(pluginId)) toRemove.push(pluginId);
			for (const pluginId of toRemove) {
				const resolved = this.allPipelinePlugins.find((p) => p.id === pluginId);
				if (resolved) try {
					const deactivateHook = resolved.hooks?.["plugin:deactivate"];
					if (deactivateHook) {
						const handler = typeof deactivateHook === "function" ? deactivateHook : deactivateHook.handler;
						if (typeof handler === "function") await handler({ pluginId }, {});
					}
				} catch (err) {
					console.warn(`[emdash] plugin:deactivate hook failed for ${pluginId}:`, err);
				}
				marketplaceManifestCache.delete(pluginId);
				sandboxedRouteMetaCache.delete(pluginId);
				this.removePluginFromLists(pluginId);
				this.enabledPlugins.delete(pluginId);
			}
			const { adaptSandboxEntry } = await import("./chunks/adapt-sandbox-entry_gWj33pDl.mjs");
			const newPlugins = [];
			for (const [pluginId, version] of desired) {
				const bundle = await loadBundleFromR2(this.storage, pluginId, version);
				if (!bundle) {
					console.warn(`EmDash: Marketplace plugin ${pluginId}@${version} not found in R2`);
					continue;
				}
				marketplaceManifestCache.set(pluginId, {
					id: bundle.manifest.id,
					version: bundle.manifest.version,
					admin: bundle.manifest.admin,
					mcp: bundle.manifest.mcp
				});
				if (bundle.manifest.routes.length > 0) {
					const routeMetaMap = /* @__PURE__ */ new Map();
					for (const entry of bundle.manifest.routes) {
						const normalized = normalizeManifestRoute(entry);
						routeMetaMap.set(normalized.name, buildRouteMeta(normalized));
					}
					sandboxedRouteMetaCache.set(pluginId, routeMetaMap);
				} else sandboxedRouteMetaCache.delete(pluginId);
				const existing = this.allPipelinePlugins.find((p) => p.id === pluginId);
				if (existing && existing.version === bundle.manifest.version) continue;
				if (existing) this.removePluginFromLists(pluginId);
				try {
					const pluginModule = await import(`data:text/javascript;base64,${Buffer.from(bundle.backendCode).toString("base64")}`);
					const adapted = adaptSandboxEntry(pluginModule.default ?? pluginModule, {
						id: bundle.manifest.id,
						version: bundle.manifest.version,
						entrypoint: "",
						capabilities: bundle.manifest.capabilities ?? [],
						allowedHosts: bundle.manifest.allowedHosts ?? [],
						storage: bundle.manifest.storage ?? {},
						adminPages: bundle.manifest.admin?.pages,
						adminWidgets: bundle.manifest.admin?.widgets?.map((w) => ({
							id: w.id,
							title: w.title,
							size: w.size === "full" || w.size === "half" || w.size === "third" ? w.size : void 0
						})),
						settingsSchema: bundle.manifest.admin?.settingsSchema
					});
					newPlugins.push(adapted);
					this.allPipelinePlugins.push(adapted);
					this.configuredPlugins.push(adapted);
					this.enabledPlugins.add(adapted.id);
				} catch (error) {
					console.error(`EmDash: Failed to load marketplace plugin ${pluginId}@${version} in-process:`, error);
				}
			}
			if (toRemove.length > 0 || newPlugins.length > 0) await this.rebuildHookPipeline();
		} catch (error) {
			console.error("EmDash: Failed to sync marketplace plugins (bypass):", error);
		}
	}
	/**
	* Create and initialize the runtime
	*/
	static async create(deps, timings) {
		const phase = async (name, desc, fn) => {
			if (!timings) return fn();
			const t0 = performance.now();
			try {
				return await fn();
			} finally {
				timings.push({
					name,
					dur: performance.now() - t0,
					desc
				});
			}
		};
		const db = await phase("rt.db", "DB init + migrations", () => EmDashRuntime2.getDatabase(deps));
		const resolveDb = () => {
			return getRequestContext()?.db ?? db;
		};
		await phase("rt.secrets", "Validate encryption key", () => validateEncryptionKeyAtStartup());
		const storage = EmDashRuntime2.getStorage(deps);
		let pluginStates = /* @__PURE__ */ new Map();
		let siteInfo;
		let seedGate = {
			collectionCount: 1,
			setupDone: true
		};
		const reqCtx = getRequestContext();
		const ownsConfiguredDb = !!deps.config.database && !(reqCtx?.dbIsIsolated && reqCtx.db);
		let readDb = db;
		let readDbDisposable;
		if (ownsConfiguredDb && deps.createCoalescingDialect && deps.config.database) try {
			const dialect = deps.createCoalescingDialect(deps.config.database.config);
			if (dialect) {
				readDb = new Kysely({
					dialect,
					log: kyselyLogOption()
				});
				readDbDisposable = readDb;
			}
		} catch {
			readDb = db;
		}
		const optionsRepo = new OptionsRepository(readDb);
		const readSiteInfo = async () => {
			const siteOpts = await optionsRepo.getMany([
				"emdash:site_title",
				"emdash:site_url",
				"emdash:locale"
			]);
			return {
				siteName: siteOpts.get("emdash:site_title") ?? void 0,
				siteUrl: siteOpts.get("emdash:site_url") ?? void 0,
				locale: siteOpts.get("emdash:locale") ?? void 0,
				trailingSlash: config_default?.trailingSlash
			};
		};
		const coldStartReads = [phase("rt.plugins", "Plugin states", async () => {
			try {
				const states = await readDb.selectFrom("_plugin_state").select(["plugin_id", "status"]).execute();
				pluginStates = new Map(states.map((s) => [s.plugin_id, s.status]));
			} catch {}
		}), phase("rt.site", "Site info options", async () => {
			try {
				siteInfo = await readSiteInfo();
			} catch {}
		})];
		if (ownsConfiguredDb) coldStartReads.push(phase("rt.seedcheck", "Auto-seed gate", async () => {
			try {
				const [collectionCount, setupOption] = await Promise.all([readDb.selectFrom("_emdash_collections").select((eb) => eb.fn.countAll().as("count")).executeTakeFirstOrThrow(), readDb.selectFrom("options").select("value").where("name", "=", "emdash:setup_complete").executeTakeFirst()]);
				const setupDone = (() => {
					try {
						return !!setupOption && JSON.parse(setupOption.value) === true;
					} catch {
						return false;
					}
				})();
				seedGate = {
					collectionCount: collectionCount.count,
					setupDone
				};
			} catch {}
		}));
		await Promise.all(coldStartReads);
		if (seedGate.collectionCount === 0 && !seedGate.setupDone) {
			const seedKey = deps.config.database?.entrypoint ?? "default";
			const seedHolder = getSeedHolder();
			try {
				await initWithLock(seedHolder.lock, () => seedHolder.done.has(seedKey) ? true : void 0, async () => {
					const { applySeed } = await import("./chunks/apply-CmIJK9j8_BXQDCnpo.mjs").then((n) => n.n);
					const { loadSeed } = await import("./chunks/load-Cx27ki1l_VOVp9SrB.mjs").then((n) => n.r);
					const { validateSeed } = await import("./chunks/validate-V9nCwq_-_vQiZ2KN3.mjs").then((n) => n.n);
					const seed = await loadSeed();
					if (validateSeed(seed).valid) {
						await applySeed(db, seed, { onConflict: "skip" });
						console.log("Auto-seeded default collections");
					}
					seedHolder.done.add(seedKey);
					return true;
				}, {
					deadlineMs: DB_INIT_DEADLINE_MS,
					anchor: (promise) => after(() => promise)
				});
				try {
					siteInfo = await readSiteInfo();
				} catch {}
			} catch {}
		}
		if (readDbDisposable) try {
			await readDbDisposable.destroy();
		} catch {}
		const enabledPlugins = /* @__PURE__ */ new Set();
		for (const plugin of deps.plugins) {
			const status = pluginStates.get(plugin.id);
			if (status === void 0 || status === "active") enabledPlugins.add(plugin.id);
		}
		const allPipelinePlugins = [...deps.plugins];
		const bypassedPluginsList = [];
		try {
			const defaultModeratorPlugin = definePlugin({
				id: DEFAULT_COMMENT_MODERATOR_PLUGIN_ID,
				version: "0.0.0",
				capabilities: ["users:read"],
				hooks: { "comment:moderate": {
					exclusive: true,
					handler: defaultCommentModerate
				} }
			});
			allPipelinePlugins.push(defaultModeratorPlugin);
			enabledPlugins.add(defaultModeratorPlugin.id);
		} catch (error) {
			console.warn("[comments] Failed to register default moderator:", error);
		}
		if (deps.sandboxBypassed && deps.sandboxedPluginEntries.length > 0) {
			if (typeof navigator !== "undefined" && typeof navigator.userAgent === "string" && navigator.userAgent.includes("Cloudflare-Workers")) throw new Error("sandbox: false is not supported in Cloudflare Workers. Remove the sandbox: false option or use the Cloudflare sandbox runner.");
			console.info("EmDash: Sandbox disabled (sandbox: false). Sandboxed plugins will run in-process without isolation.");
			const bypassedPlugins = await EmDashRuntime2.loadBypassedPlugins(deps.sandboxedPluginEntries);
			for (const plugin of bypassedPlugins) {
				allPipelinePlugins.push(plugin);
				bypassedPluginsList.push(plugin);
				const status = pluginStates.get(plugin.id);
				if (status === void 0 || status === "active") enabledPlugins.add(plugin.id);
			}
		}
		if (deps.sandboxBypassed && deps.config.marketplace && storage) {
			const marketplaceBypassed = await EmDashRuntime2.loadMarketplacePluginsBypassed(db, storage);
			for (const plugin of marketplaceBypassed) {
				allPipelinePlugins.push(plugin);
				bypassedPluginsList.push(plugin);
				const status = pluginStates.get(plugin.id);
				if (status === void 0 || status === "active") enabledPlugins.add(plugin.id);
			}
		}
		const enabledPluginList = allPipelinePlugins.filter((p) => enabledPlugins.has(p.id));
		const pipelineFactoryOptions = {
			db,
			getDb: resolveDb,
			storage: storage ?? void 0,
			siteInfo
		};
		const pipeline = createHookPipeline(enabledPluginList, pipelineFactoryOptions);
		const sandboxedPlugins2 = await phase("rt.sandbox", "Sandboxed plugins", () => EmDashRuntime2.loadSandboxedPlugins(deps, db, storage, siteInfo));
		const installedTierPhases = [];
		if (deps.config.marketplace && storage && !deps.sandboxBypassed) installedTierPhases.push(phase("rt.market", "Marketplace plugins", () => EmDashRuntime2.loadInstalledSandboxedPlugins("marketplace", db, storage, deps, sandboxedPlugins2, siteInfo)));
		if (deps.config.experimental?.registry && storage) installedTierPhases.push(phase("rt.registry", "Registry plugins", () => EmDashRuntime2.loadInstalledSandboxedPlugins("registry", db, storage, deps, sandboxedPlugins2, siteInfo)));
		if (installedTierPhases.length > 0) await Promise.all(installedTierPhases);
		const mediaProviders2 = /* @__PURE__ */ new Map();
		const mediaProviderEntries = deps.mediaProviderEntries ?? [];
		const providerContext = {
			db,
			storage,
			getDb: resolveDb
		};
		for (const entry of mediaProviderEntries) try {
			const provider = entry.createProvider(providerContext);
			mediaProviders2.set(entry.id, provider);
		} catch (error) {
			console.warn(`Failed to initialize media provider "${entry.id}":`, error);
		}
		await phase("rt.hooks", "Exclusive hook resolution", () => EmDashRuntime2.resolveExclusiveHooks(pipeline, db, deps));
		const emailPipeline = new EmailPipeline(pipeline);
		if (sandboxRunner) sandboxRunner.setEmailSend((message, pluginId) => emailPipeline.send(message, pluginId));
		const pipelineRef = { current: pipeline };
		const invokeCronHook = async (pluginId, event) => {
			const result = await pipelineRef.current.invokeCronHook(pluginId, event);
			if (!result.success && result.error) throw result.error;
		};
		pipeline.setContextFactory({ emailPipeline });
		let cronExecutor = null;
		let cronScheduler = null;
		const runtimeRef = { current: null };
		await phase("rt.cron", "Cron init (recovery deferred post-response)", async () => {
			try {
				cronExecutor = new CronExecutor(resolveDb, invokeCronHook);
				pipeline.setContextFactory({ cronReschedule: () => cronScheduler?.reschedule() });
				const executorForRecovery = cronExecutor;
				after(async () => {
					try {
						const recovered = await executorForRecovery.recoverStaleLocks();
						if (recovered > 0) console.log(`[cron] Recovered ${recovered} stale task lock(s)`);
					} catch (error) {
						console.error("[cron] Failed to recover stale task locks:", error);
					}
				});
				if (deps.createScheduler) {
					const scheduler = deps.createScheduler(cronExecutor);
					cronScheduler = scheduler;
					scheduler.setSystemCleanup(async () => {
						try {
							const runtime2 = runtimeRef.current;
							await publishDueContent(db, { publish: runtime2 ? (collection, id, options) => runtime2.handleContentPublish(collection, id, options) : void 0 });
						} catch (error) {
							console.error("[scheduled-publish] Sweep failed:", error);
						}
						try {
							await runSystemCleanup(db, storage ?? void 0);
						} catch (error) {
							console.error("[cleanup] System cleanup failed:", error);
						}
						await maybeRunScheduledBackup(db, storage ?? void 0);
					});
					scheduler.start();
				}
			} catch (error) {
				console.warn("[cron] Failed to initialize cron system:", error);
			}
		});
		const runtime = new EmDashRuntime2({
			db,
			storage,
			configuredPlugins: [...deps.plugins, ...bypassedPluginsList],
			sandboxedPlugins: sandboxedPlugins2,
			sandboxedPluginEntries: deps.sandboxedPluginEntries,
			hooks: pipeline,
			enabledPlugins,
			pluginStates,
			config: deps.config,
			mediaProviders: mediaProviders2,
			mediaProviderEntries,
			cronExecutor,
			cronScheduler,
			emailPipeline,
			allPipelinePlugins,
			pipelineFactoryOptions,
			runtimeDeps: deps,
			pipelineRef
		});
		runtimeRef.current = runtime;
		return runtime;
	}
	/**
	* Get a media provider by ID
	*/
	getMediaProvider(providerId) {
		return this.mediaProviders.get(providerId);
	}
	/**
	* Get all media provider entries (for admin UI)
	*/
	getMediaProviderList() {
		return this.mediaProviderEntries.map((e) => ({
			id: e.id,
			name: e.name,
			icon: e.icon,
			capabilities: e.capabilities
		}));
	}
	/**
	* Get or create database instance
	*/
	static async getDatabase(deps) {
		const ctx = getRequestContext();
		if (ctx?.dbIsIsolated && ctx.db) return ctx.db;
		const dbConfig = deps.config.database;
		if (!dbConfig) try {
			return await getDb();
		} catch {
			throw new Error("EmDash database not configured. Either configure database in astro.config.mjs or use emdashLoader in live.config.ts");
		}
		const cacheKey = dbConfig.entrypoint;
		const holder = getDbHolder();
		const throwIfBackingOff = () => {
			const failure = holder.failures.get(cacheKey);
			if (!failure) return;
			if (Date.now() - failure.at < DB_INIT_FAILURE_BACKOFF_MS) throw new Error(`Database initialization is backing off after a recent migration failure: ${failure.message}`);
			holder.failures.delete(cacheKey);
		};
		throwIfBackingOff();
		return initWithLock(holder.lock, () => holder.cache.get(cacheKey), async (isCurrentClaim) => {
			throwIfBackingOff();
			const db = new Kysely({
				dialect: deps.createDialect(dbConfig.config),
				log: kyselyLogOption()
			});
			try {
				await runMigrations(db);
			} catch (error) {
				if (!(error instanceof ConcurrentMigrationTimeoutError)) holder.failures.set(cacheKey, {
					at: Date.now(),
					message: error instanceof Error ? error.message : String(error)
				});
				await db.destroy().catch(() => {});
				throw error;
			}
			holder.failures.delete(cacheKey);
			if (isCurrentClaim()) holder.cache.set(cacheKey, db);
			return db;
		}, {
			deadlineMs: DB_INIT_DEADLINE_MS,
			anchor: (promise) => after(() => promise)
		});
	}
	/**
	* Get or create storage instance
	*/
	static getStorage(deps) {
		const storageConfig = deps.config.storage;
		if (!storageConfig || !deps.createStorage) return null;
		const cacheKey = storageConfig.entrypoint;
		const cached = storageCache.get(cacheKey);
		if (cached) return cached;
		const storage = deps.createStorage(storageConfig.config);
		storageCache.set(cacheKey, storage);
		return storage;
	}
	/**
	* Load sandboxed plugin entries as trusted in-process plugins.
	* Used by the sandbox: false debugging escape hatch.
	*
	* Imports each plugin's bundled ESM code via a data URL, adapts it
	* with adaptSandboxEntry, and returns ResolvedPlugin objects ready
	* to be merged into the pipeline plugin list.
	*/
	static async loadBypassedPlugins(entries) {
		const { adaptSandboxEntry } = await import("./chunks/adapt-sandbox-entry_gWj33pDl.mjs");
		const plugins2 = [];
		for (const entry of entries) try {
			const pluginModule = await import(`data:text/javascript;base64,${Buffer.from(entry.code).toString("base64")}`);
			const pluginDef = pluginModule.default ?? pluginModule;
			const adminPages = entry.adminPages?.map((p) => ({
				path: p.path,
				label: p.label ?? p.path,
				icon: p.icon
			}));
			const adminWidgets = entry.adminWidgets?.map((w) => {
				const size = w.size === "full" || w.size === "half" || w.size === "third" ? w.size : void 0;
				return {
					id: w.id,
					title: w.title,
					size
				};
			});
			const resolved = adaptSandboxEntry(pluginDef, {
				id: entry.id,
				version: entry.version,
				entrypoint: "",
				capabilities: entry.capabilities,
				allowedHosts: entry.allowedHosts,
				storage: entry.storage,
				adminPages,
				adminWidgets,
				settingsSchema: entry.settingsSchema,
				portableTextBlocks: entry.portableTextBlocks,
				fieldWidgets: entry.fieldWidgets
			});
			plugins2.push(resolved);
			console.log(`EmDash: Loaded plugin ${entry.id}:${entry.version} in-process (sandbox bypassed)`);
		} catch (error) {
			console.error(`EmDash: Failed to load sandboxed plugin ${entry.id} in-process:`, error);
		}
		return plugins2;
	}
	/**
	* Load sandboxed plugins using SandboxRunner
	*/
	static async loadSandboxedPlugins(deps, db, mediaStorage, siteInfo) {
		if (sandboxedPluginCache.size > 0) return sandboxedPluginCache;
		if (!deps.sandboxEnabled) return sandboxedPluginCache;
		if (!sandboxRunner && deps.createSandboxRunner) sandboxRunner = deps.createSandboxRunner(createSandboxRunnerOptions({
			db,
			mediaStorage: mediaStorage ? {
				upload: (opts) => mediaStorage.upload({
					key: opts.key,
					body: opts.body,
					contentType: opts.contentType
				}),
				delete: (key) => mediaStorage.delete(key)
			} : void 0
		}, siteInfo));
		if (!sandboxRunner) return sandboxedPluginCache;
		if (!sandboxRunner.isAvailable()) {
			console.warn("EmDash: Plugin sandbox is configured but not available on this platform. Sandboxed plugins will not be loaded. If using @emdash-cms/sandbox-workerd/sandbox, ensure workerd is installed.");
			return sandboxedPluginCache;
		}
		if (deps.sandboxedPluginEntries.length === 0) return sandboxedPluginCache;
		if (deps.sandboxBypassed) return sandboxedPluginCache;
		for (const entry of deps.sandboxedPluginEntries) {
			const pluginKey = `${entry.id}:${entry.version}`;
			if (sandboxedPluginCache.has(pluginKey)) continue;
			try {
				const manifest = {
					id: entry.id,
					version: entry.version,
					capabilities: entry.capabilities ?? [],
					allowedHosts: entry.allowedHosts ?? [],
					storage: entry.storage ?? {},
					hooks: [],
					routes: [],
					admin: {},
					mcp: entry.mcp
				};
				const plugin = await sandboxRunner.load(manifest, entry.code);
				sandboxedPluginCache.set(pluginKey, plugin);
				console.log(`EmDash: Loaded sandboxed plugin ${pluginKey} with capabilities: [${manifest.capabilities.join(", ")}]`);
			} catch (error) {
				console.error(`EmDash: Failed to load sandboxed plugin ${entry.id}:`, error);
			}
		}
		return sandboxedPluginCache;
	}
	/**
	* Cold-start: load marketplace-installed plugins from site-local R2 storage
	*
	* Queries _plugin_state for source='marketplace' rows, fetches each bundle
	* from R2, and loads via SandboxRunner.
	*/
	/**
	* Cold-start load of all active sandboxed plugins for one install
	* tier (marketplace or registry) from site-local R2.
	*
	* Mirrors {@link syncSandboxedSourcePlugins} but runs once at runtime
	* creation, before request traffic arrives; the sync method runs on
	* demand after install / update / uninstall handlers.
	*/
	static async loadInstalledSandboxedPlugins(source, db, storage, deps, cache, siteInfo) {
		if (!sandboxRunner && deps.createSandboxRunner) sandboxRunner = deps.createSandboxRunner(createSandboxRunnerOptions({
			db,
			mediaStorage: {
				upload: (opts) => storage.upload({
					key: opts.key,
					body: opts.body,
					contentType: opts.contentType
				}),
				delete: (key) => storage.delete(key)
			}
		}, siteInfo));
		if (deps.sandboxBypassed) return;
		if (!sandboxRunner || !sandboxRunner.isAvailable()) return;
		const keySet = source === "marketplace" ? marketplacePluginKeys : registryPluginKeys;
		try {
			const stateRepo = new PluginStateRepository(db);
			const plugins2 = source === "marketplace" ? await stateRepo.getMarketplacePlugins() : await stateRepo.getRegistryPlugins();
			for (const plugin of plugins2) {
				if (plugin.status !== "active") continue;
				const version = source === "marketplace" ? plugin.marketplaceVersion ?? plugin.version : plugin.version;
				const pluginKey = `${plugin.pluginId}:${version}`;
				if (cache.has(pluginKey)) continue;
				try {
					const bundle = await loadBundleFromR2(storage, plugin.pluginId, version, source);
					if (!bundle) {
						console.warn(`EmDash: ${source} plugin ${plugin.pluginId}@${version} not found in R2`);
						continue;
					}
					const loaded = await sandboxRunner.load(bundle.manifest, bundle.backendCode);
					cache.set(pluginKey, loaded);
					keySet.add(pluginKey);
					marketplaceManifestCache.set(plugin.pluginId, {
						id: bundle.manifest.id,
						version: bundle.manifest.version,
						admin: bundle.manifest.admin,
						mcp: bundle.manifest.mcp
					});
					if (bundle.manifest.routes.length > 0) {
						const routeMeta = /* @__PURE__ */ new Map();
						for (const entry of bundle.manifest.routes) {
							const normalized = normalizeManifestRoute(entry);
							routeMeta.set(normalized.name, buildRouteMeta(normalized));
						}
						sandboxedRouteMetaCache.set(plugin.pluginId, routeMeta);
					}
					console.log(`EmDash: Loaded ${source} plugin ${pluginKey} with capabilities: [${bundle.manifest.capabilities.join(", ")}]`);
				} catch (error) {
					console.error(`EmDash: Failed to load ${source} plugin ${plugin.pluginId}:`, error);
				}
			}
		} catch {}
	}
	/**
	* Cold-start: load marketplace plugins in bypass mode (sandbox: false).
	*
	* Each active marketplace bundle is read, evaluated via data URL, adapted
	* with adaptSandboxEntry, and returned as a ResolvedPlugin. The caller is
	* responsible for merging these into allPipelinePlugins / configuredPlugins
	* BEFORE the hook pipeline is created, so hooks and routes register in
	* the trusted pipeline.
	*
	* Also caches manifest and route metadata so admin UI / getManifest() work.
	*
	* Returns ResolvedPlugins to be merged into the pipeline.
	*/
	static async loadMarketplacePluginsBypassed(db, storage) {
		const resolved = [];
		try {
			const marketplacePlugins = await new PluginStateRepository(db).getMarketplacePlugins();
			if (marketplacePlugins.length === 0) return resolved;
			console.info("EmDash: Sandbox disabled (sandbox: false). Marketplace plugins will run in-process without isolation.");
			const { adaptSandboxEntry } = await import("./chunks/adapt-sandbox-entry_gWj33pDl.mjs");
			for (const plugin of marketplacePlugins) {
				if (plugin.status !== "active") continue;
				const version = plugin.marketplaceVersion ?? plugin.version;
				try {
					const bundle = await loadBundleFromR2(storage, plugin.pluginId, version);
					if (!bundle) {
						console.warn(`EmDash: Marketplace plugin ${plugin.pluginId}@${version} not found in R2`);
						continue;
					}
					marketplaceManifestCache.set(plugin.pluginId, {
						id: bundle.manifest.id,
						version: bundle.manifest.version,
						admin: bundle.manifest.admin,
						mcp: bundle.manifest.mcp
					});
					if (bundle.manifest.routes.length > 0) {
						const routeMeta = /* @__PURE__ */ new Map();
						for (const entry of bundle.manifest.routes) {
							const normalized = normalizeManifestRoute(entry);
							routeMeta.set(normalized.name, buildRouteMeta(normalized));
						}
						sandboxedRouteMetaCache.set(plugin.pluginId, routeMeta);
					}
					const pluginModule = await import(`data:text/javascript;base64,${Buffer.from(bundle.backendCode).toString("base64")}`);
					const adapted = adaptSandboxEntry(pluginModule.default ?? pluginModule, {
						id: bundle.manifest.id,
						version: bundle.manifest.version,
						entrypoint: "",
						capabilities: bundle.manifest.capabilities ?? [],
						allowedHosts: bundle.manifest.allowedHosts ?? [],
						storage: bundle.manifest.storage ?? {},
						adminPages: bundle.manifest.admin?.pages,
						adminWidgets: bundle.manifest.admin?.widgets?.map((w) => ({
							id: w.id,
							title: w.title,
							size: w.size === "full" || w.size === "half" || w.size === "third" ? w.size : void 0
						})),
						settingsSchema: bundle.manifest.admin?.settingsSchema
					});
					resolved.push(adapted);
					console.log(`EmDash: Loaded marketplace plugin ${plugin.pluginId}@${version} in-process (sandbox bypassed)`);
				} catch (error) {
					console.error(`EmDash: Failed to load marketplace plugin ${plugin.pluginId} in-process:`, error);
				}
			}
		} catch {}
		return resolved;
	}
	/**
	* Resolve exclusive hook selections on startup.
	*
	* Delegates to the shared resolveExclusiveHooks() in hooks.ts.
	* The runtime version considers all pipeline providers as "active" since
	* the pipeline was already built from only active/enabled plugins.
	*/
	static async resolveExclusiveHooks(pipeline, db, deps) {
		if (pipeline.getRegisteredExclusiveHooks().length === 0) return;
		let optionsRepo;
		try {
			optionsRepo = new OptionsRepository(db);
		} catch {
			return;
		}
		const preferredHints = /* @__PURE__ */ new Map();
		for (const entry of deps.sandboxedPluginEntries) if (entry.preferred && entry.preferred.length > 0) preferredHints.set(entry.id, entry.preferred);
		await resolveExclusiveHooks({
			pipeline,
			isActive: () => true,
			getOption: (key) => optionsRepo.get(key),
			getOptions: (keys) => optionsRepo.getMany(keys),
			setOption: (key, value) => optionsRepo.set(key, value),
			deleteOption: async (key) => {
				await optionsRepo.delete(key);
			},
			preferredHints
		});
	}
	/**
	* Build the admin manifest from the live database.
	*
	* Used by the admin UI (sidebar collections, content editor field
	* dispatch, manifest endpoint) and by WordPress import — it's never
	* read on a public request, so this isn't on any anonymous hot path.
	*
	* No cross-request cache. The previous worker-isolate cache produced
	* a class of cross-isolate staleness bugs (#776, #873, #876, #877)
	* because Cloudflare Workers keeps multiple warm isolates per region
	* and there's no fan-out primitive to invalidate them in step. The
	* cache existed to amortize an N+1 schema query pattern; now that
	* `listCollectionsWithFields()` does the same work in two queries,
	* the rebuild is fast enough to pay on every admin request.
	*
	* Within a single request, `requestCached` deduplicates concurrent
	* callers (the manifest endpoint and an admin SSR template, say).
	*/
	getManifest() {
		return requestCached("emdash:manifest", () => this._buildManifest());
	}
	/**
	* Build the manifest from the database.
	*
	* Constant query shapes via `listCollectionsWithFields()` — one query
	* for collections, one batched query for fields (chunked at
	* `SQL_BATCH_SIZE` collection IDs to stay under D1's bound-parameter
	* limit). Typical sites stay well under the chunk threshold, so this
	* is two queries in practice; never N+1.
	*/
	async _buildManifest() {
		const manifestCollections = {};
		try {
			const dbCollections = await new SchemaRegistry(this.db).listCollectionsWithFields();
			for (const collection of dbCollections) {
				const fields = {};
				for (const field of collection.fields) {
					const entry = {
						kind: FIELD_TYPE_TO_KIND[field.type] ?? "string",
						label: field.label,
						required: field.required
					};
					entry.id = field.id;
					if (field.widget) entry.widget = field.widget;
					if (field.options) entry.options = field.options;
					if (field.validation?.options) entry.options = field.validation.options.map((v) => ({
						value: v,
						label: v.charAt(0).toUpperCase() + v.slice(1)
					}));
					if ((field.type === "repeater" || field.type === "file" || field.type === "image") && field.validation) entry.validation = { ...field.validation };
					fields[field.slug] = entry;
				}
				manifestCollections[collection.slug] = {
					label: collection.label,
					labelSingular: collection.labelSingular || collection.label,
					supports: collection.supports || [],
					hasSeo: collection.hasSeo,
					urlPattern: collection.urlPattern,
					fields
				};
			}
		} catch (error) {
			console.debug("EmDash: Could not load database collections:", error);
		}
		const manifestPlugins = {};
		for (const plugin of this.configuredPlugins) {
			const status = this.pluginStates.get(plugin.id);
			const enabled = status === void 0 || status === "active";
			const hasAdminEntry = !!plugin.admin?.entry;
			const hasAdminPages = (plugin.admin?.pages?.length ?? 0) > 0;
			const hasWidgets = (plugin.admin?.widgets?.length ?? 0) > 0;
			let adminMode = "none";
			if (hasAdminEntry) adminMode = "react";
			else if (hasAdminPages || hasWidgets) adminMode = "blocks";
			manifestPlugins[plugin.id] = {
				version: plugin.version,
				enabled,
				adminMode,
				adminPages: plugin.admin?.pages ?? [],
				dashboardWidgets: plugin.admin?.widgets ?? [],
				portableTextBlocks: plugin.admin?.portableTextBlocks,
				fieldWidgets: plugin.admin?.fieldWidgets
			};
		}
		for (const entry of this.sandboxedPluginEntries) {
			const status = this.pluginStates.get(entry.id);
			const enabled = status === void 0 || status === "active";
			const hasAdminPages = (entry.adminPages?.length ?? 0) > 0;
			const hasWidgets = (entry.adminWidgets?.length ?? 0) > 0;
			manifestPlugins[entry.id] = {
				version: entry.version,
				enabled,
				sandboxed: true,
				adminMode: hasAdminPages || hasWidgets ? "blocks" : "none",
				adminPages: entry.adminPages ?? [],
				dashboardWidgets: entry.adminWidgets ?? [],
				portableTextBlocks: entry.portableTextBlocks,
				fieldWidgets: entry.fieldWidgets
			};
		}
		for (const [pluginId, meta] of marketplaceManifestCache) {
			if (manifestPlugins[pluginId]) continue;
			const enabled = this.pluginStates.get(pluginId) === "active";
			const pages = meta.admin?.pages;
			const widgets = meta.admin?.widgets;
			const hasAdminPages = (pages?.length ?? 0) > 0;
			const hasWidgets = (widgets?.length ?? 0) > 0;
			manifestPlugins[pluginId] = {
				version: meta.version,
				enabled,
				sandboxed: true,
				adminMode: hasAdminPages || hasWidgets ? "blocks" : "none",
				adminPages: pages ?? [],
				dashboardWidgets: widgets ?? []
			};
		}
		let manifestTaxonomies = [];
		try {
			manifestTaxonomies = (await this.db.selectFrom("_emdash_taxonomy_defs").selectAll().orderBy("name").execute()).map((row) => ({
				name: row.name,
				label: row.label,
				labelSingular: row.label_singular ?? void 0,
				hierarchical: row.hierarchical === 1,
				collections: parseStringArray(row.collections).toSorted()
			}));
		} catch (error) {
			console.debug("EmDash: Could not load taxonomy definitions:", error);
		}
		const manifestHash = await hashString(JSON.stringify(manifestCollections) + JSON.stringify(manifestPlugins) + JSON.stringify(manifestTaxonomies));
		const authMode = getAuthMode(this.config);
		const authModeValue = authMode.type === "external" ? authMode.providerType : "passkey";
		const i18nConfig = config_default?.i18n;
		const i18n = i18nConfig && i18nConfig.locales && i18nConfig.locales.length > 1 ? {
			defaultLocale: i18nConfig.defaultLocale,
			locales: i18nConfig.locales
		} : void 0;
		const registry = normalizeRegistryConfig(this.config.experimental?.registry) ?? void 0;
		return {
			version: VERSION,
			commit: COMMIT,
			astroVersion: this.config.astroVersion,
			hash: manifestHash,
			collections: manifestCollections,
			plugins: manifestPlugins,
			taxonomies: manifestTaxonomies,
			authMode: authModeValue,
			i18n,
			marketplace: !!this.config.marketplace,
			registry
		};
	}
	/**
	* Verify and repair FTS indexes on demand. Runs at most once per worker
	* lifetime.
	*
	* Originally called from `EmDashRuntime.create()`, but on a busy D1 link
	* (e.g. SIN replica ~80-150ms per query) it added ~1.5s to every cold
	* start for a modest-sized site — more than every other init phase
	* combined. Anonymous public reads never touch the search write path,
	* so the cost isn't paid back for the vast majority of requests.
	*
	* Instead, search endpoints call this lazily: the first request that
	* actually needs the index pays the verify cost (usually fast — no
	* rebuild needed), everyone else runs cold-free.
	*
	* Uses the runtime's singleton database (`this._db`) rather than the
	* request-scoped DB. Verify reads only, but `rebuildIndex` writes, and
	* a GET search request on D1 carries a `first-unconstrained` session
	* that's free to route at a read replica — unsafe for writes. The
	* singleton always goes through the default binding, which the D1
	* adapter will promote to `first-primary` for write statements.
	*
	* Safe to call concurrently: repeated callers share the same in-flight
	* promise. Errors are swallowed internally so callers don't need to
	* defend against FTS not existing yet (pre-setup).
	*/
	async ensureSearchHealthy() {
		if (!isSqlite(this._db)) return;
		try {
			await singleFlightCached(this._searchHealthCache, async () => {
				try {
					const repaired = await new FTSManager(this._db).verifyAndRepairAll();
					if (repaired > 0) console.log(`Repaired ${repaired} corrupted FTS index(es)`);
				} catch {}
			}, {
				anchor: (promise) => after(() => promise),
				ownerTimeoutMs: 3e4
			});
		} catch {}
	}
	async handleContentList(collection, params) {
		return handleContentList(this.db, collection, params);
	}
	async handleContentAuthors(collection) {
		return handleContentAuthors(this.db, collection);
	}
	async handleContentGet(collection, id, locale) {
		const result = await handleContentGet(this.db, collection, id, locale);
		return this.hydrateDraftData(result);
	}
	async handleContentGetIncludingTrashed(collection, id, locale) {
		const result = await handleContentGetIncludingTrashed(this.db, collection, id, locale);
		return this.hydrateDraftData(result);
	}
	/**
	* If the response item has a `draftRevisionId`, replace `item.data` with
	* the draft revision's data and expose the original published values as
	* `liveData`. This makes the content_get / content_update round-trip
	* intuitive — read returns the latest content the caller has saved
	* (their pending draft), with the previously-published values still
	* accessible for compare-style flows.
	*
	* No-op when no draft exists or the response is an error.
	*/
	async hydrateDraftData(result) {
		if (!result || typeof result !== "object") return result;
		const r = result;
		if (!r.success || !r.data?.item) return result;
		const item = r.data.item;
		const draftRevisionId = typeof item.draftRevisionId === "string" ? item.draftRevisionId : null;
		if (!draftRevisionId) return result;
		try {
			const revision = await new RevisionRepository(this.db).findById(draftRevisionId);
			if (!revision) return result;
			const liveData = item.data && typeof item.data === "object" ? item.data : {};
			const revisionData = {};
			for (const [key, value] of Object.entries(revision.data)) if (!key.startsWith("_")) revisionData[key] = value;
			const mergedData = {
				...liveData,
				...revisionData
			};
			return {
				...result,
				data: {
					...r.data,
					item: {
						...item,
						data: mergedData,
						liveData
					}
				}
			};
		} catch (error) {
			console.error("[emdash] draft hydration failed:", error);
			return result;
		}
	}
	async handleContentCreate(collection, body) {
		let processedData = body.data;
		if (this.hooks.hasHooks("content:beforeSave")) processedData = (await this.hooks.runContentBeforeSave(body.data, collection, true)).content;
		processedData = await this.runSandboxedBeforeSave(processedData, collection, true);
		processedData = await this.normalizeMediaFields(collection, processedData);
		const { validateContentData } = await import("./chunks/validation-BsVUJfsP_DjXGy49j.mjs");
		const validation = await validateContentData(this.db, collection, processedData, { partial: false });
		if (!validation.ok) return {
			success: false,
			error: validation.error
		};
		const result = await handleContentCreate(this.db, collection, {
			...body,
			data: processedData,
			authorId: body.authorId,
			bylines: body.bylines
		});
		if (result.success && result.data) await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.item.id]);
		if (result.success && result.data) this.runAfterSaveHooks(contentItemToRecord(result.data.item), collection, true);
		return result;
	}
	async handleContentUpdate(collection, id, body) {
		const { ContentRepository: ContentRepository2 } = await import("./chunks/content-Ci04z2z-_C-m3vh_7.mjs").then((n) => n.n);
		const repo = new ContentRepository2(this.db);
		const resolvedItem = await repo.findByIdOrSlug(collection, id, body.locale);
		const resolvedId = resolvedItem?.id ?? id;
		if (body._rev) {
			if (!resolvedItem) return {
				success: false,
				error: {
					code: "NOT_FOUND",
					message: `Content item not found: ${id}`
				}
			};
			const revCheck = validateRev(body._rev, resolvedItem);
			if (!revCheck.valid) return {
				success: false,
				error: {
					code: "CONFLICT",
					message: revCheck.message
				}
			};
		}
		const { _rev: _discardedRev, ...bodyWithoutRev } = body;
		let processedData = bodyWithoutRev.data;
		if (bodyWithoutRev.data) {
			if (this.hooks.hasHooks("content:beforeSave")) processedData = (await this.hooks.runContentBeforeSave(bodyWithoutRev.data, collection, false)).content;
			processedData = await this.runSandboxedBeforeSave(processedData, collection, false);
			processedData = await this.normalizeMediaFields(collection, processedData);
			const { validateContentData } = await import("./chunks/validation-BsVUJfsP_DjXGy49j.mjs");
			const validation = await validateContentData(this.db, collection, processedData, { partial: true });
			if (!validation.ok) return {
				success: false,
				error: validation.error
			};
		}
		let usesDraftRevisions = false;
		let draftStorageChanged = false;
		if (processedData) try {
			if ((await this.schemaRegistry.getCollectionWithFields(collection))?.supports?.includes("revisions")) {
				usesDraftRevisions = true;
				const revisionRepo = new RevisionRepository(this.db);
				const existing = await repo.findById(collection, resolvedId);
				if (existing) {
					let baseData;
					if (existing.draftRevisionId) baseData = (await revisionRepo.findById(existing.draftRevisionId))?.data ?? existing.data;
					else baseData = existing.data;
					const mergedData = {
						...baseData,
						...processedData
					};
					if (bodyWithoutRev.slug !== void 0) mergedData._slug = bodyWithoutRev.slug;
					if (bodyWithoutRev.skipRevision && existing.draftRevisionId) {
						await revisionRepo.updateData(existing.draftRevisionId, mergedData);
						draftStorageChanged = true;
					} else {
						const revision = await revisionRepo.create({
							collection,
							entryId: resolvedId,
							data: mergedData,
							authorId: bodyWithoutRev.authorId ?? void 0
						});
						validateIdentifier(collection, "collection");
						const tableName = `ec_${collection}`;
						await sql`
								UPDATE ${sql.ref(tableName)}
								SET draft_revision_id = ${revision.id}
								WHERE id = ${resolvedId}
							`.execute(this.db);
						draftStorageChanged = true;
						revisionRepo.pruneOldRevisions(collection, resolvedId, 50).catch(() => {});
					}
				}
			}
		} catch {}
		const result = await handleContentUpdate(this.db, collection, resolvedId, {
			...bodyWithoutRev,
			data: usesDraftRevisions ? void 0 : processedData,
			slug: usesDraftRevisions ? void 0 : bodyWithoutRev.slug,
			authorId: bodyWithoutRev.authorId,
			bylines: bodyWithoutRev.bylines
		});
		const hydrated = await this.hydrateDraftData(result);
		if (hydrated.success && hydrated.data) {
			const contentIdsToRefresh = [resolvedId];
			if (!usesDraftRevisions && processedData) try {
				contentIdsToRefresh.push(...await findNonTranslatableSiblingContentIds(this.db, collection, resolvedId, hydrated.data.item.translationGroup, processedData));
			} catch (error) {
				console.error(`[media-usage] Failed to discover synced i18n siblings for ${collection}/${resolvedId}:`, error);
				try {
					await markContentMediaUsageCollectionStale(this.db, collection, "CONTENT_USAGE_REFRESH_ERROR");
				} catch (staleError) {
					console.error(`[media-usage] Failed to mark ${collection} stale:`, staleError);
				}
			}
			await this.refreshContentUsageAfterSuccessfulWrite(collection, contentIdsToRefresh);
		} else if (draftStorageChanged) try {
			await markContentMediaUsageCollectionStale(this.db, collection, "CONTENT_USAGE_STALE");
		} catch (error) {
			console.error(`[media-usage] Failed to mark ${collection} stale:`, error);
		}
		if (hydrated.success && hydrated.data) this.runAfterSaveHooks(contentItemToRecord(hydrated.data.item), collection, false);
		return hydrated;
	}
	async handleContentDelete(collection, id) {
		if (this.hooks.hasHooks("content:beforeDelete")) {
			const { allowed } = await this.hooks.runContentBeforeDelete(id, collection);
			if (!allowed) return {
				success: false,
				error: {
					code: "DELETE_BLOCKED",
					message: "Delete blocked by plugin hook"
				}
			};
		}
		if (!await this.runSandboxedBeforeDelete(id, collection)) return {
			success: false,
			error: {
				code: "DELETE_BLOCKED",
				message: "Delete blocked by sandboxed plugin hook"
			}
		};
		const result = await handleContentDelete(this.db, collection, id);
		if (result.success) await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.id]);
		if (result.success) this.runAfterDeleteHooks(id, collection, false);
		return result;
	}
	async handleContentListTrashed(collection, params = {}) {
		return handleContentListTrashed(this.db, collection, params);
	}
	async handleContentRestore(collection, id) {
		const result = await handleContentRestore(this.db, collection, id);
		if (result.success && result.data) await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.item.id]);
		if (result.success) this.runAfterRestoreHooks(contentItemToRecord(result.data.item), collection);
		return result;
	}
	async handleContentPermanentDelete(collection, id) {
		const result = await handleContentPermanentDelete(this.db, collection, id);
		if (result.success) await this.deleteContentUsageAfterSuccessfulPermanentDelete(collection, result.data.id);
		if (result.success) this.runAfterDeleteHooks(id, collection, true);
		return result;
	}
	async handleContentCountTrashed(collection) {
		return handleContentCountTrashed(this.db, collection);
	}
	async handleContentDuplicate(collection, id, authorId) {
		const result = await handleContentDuplicate(this.db, collection, id, authorId);
		if (result.success && result.data) await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.item.id]);
		return result;
	}
	async handleContentPublish(collection, id, options = {}) {
		const result = await handleContentPublish(this.db, collection, id, options);
		if (result.success && result.data) await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.item.id]);
		if (result.success && result.data) this.runAfterPublishHooks(contentItemToRecord(result.data.item), collection);
		return result;
	}
	async handleContentUnpublish(collection, id) {
		const result = await handleContentUnpublish(this.db, collection, id);
		if (result.success && result.data) await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.item.id]);
		if (result.success && result.data) this.runAfterUnpublishHooks(contentItemToRecord(result.data.item), collection);
		return result;
	}
	async handleContentSchedule(collection, id, scheduledAt) {
		const result = await handleContentSchedule(this.db, collection, id, scheduledAt);
		if (result.success && result.data) await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.item.id]);
		if (result.success && result.data) this.runAfterScheduleHooks(contentItemToRecord(result.data.item), collection);
		return result;
	}
	async handleContentUnschedule(collection, id) {
		const result = await handleContentUnschedule(this.db, collection, id);
		if (result.success && result.data) await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.item.id]);
		if (result.success && result.data) this.runAfterUnscheduleHooks(contentItemToRecord(result.data.item), collection);
		return result;
	}
	async handleContentCountScheduled(collection) {
		return handleContentCountScheduled(this.db, collection);
	}
	async handleContentDiscardDraft(collection, id) {
		const result = await handleContentDiscardDraft(this.db, collection, id);
		if (result.success && result.data) await this.refreshContentUsageAfterSuccessfulWrite(collection, [result.data.item.id]);
		return result;
	}
	async handleContentCompare(collection, id) {
		return handleContentCompare(this.db, collection, id);
	}
	async handleContentTranslations(collection, id) {
		return handleContentTranslations(this.db, collection, id);
	}
	async handleMediaList(params) {
		return handleMediaList(this.db, params);
	}
	async handleMediaGet(id) {
		return handleMediaGet(this.db, id);
	}
	async handleMediaCreate(input) {
		let processedInput = input;
		if (this.hooks.hasHooks("media:beforeUpload")) {
			const hookResult = await this.hooks.runMediaBeforeUpload({
				name: input.filename,
				type: input.mimeType,
				size: input.size || 0
			});
			processedInput = {
				...input,
				filename: hookResult.file.name,
				mimeType: hookResult.file.type,
				size: hookResult.file.size
			};
		}
		const result = await handleMediaCreate(this.db, processedInput);
		if (result.success && this.hooks.hasHooks("media:afterUpload")) {
			const item = result.data.item;
			const mediaItem = {
				id: item.id,
				filename: item.filename,
				mimeType: item.mimeType,
				size: item.size,
				url: `/media/${item.id}/${item.filename}`,
				createdAt: item.createdAt
			};
			this.hooks.runMediaAfterUpload(mediaItem).catch((err) => console.error("EmDash afterUpload hook error:", err));
		}
		return result;
	}
	async handleMediaUpdate(id, input) {
		const result = await handleMediaUpdate(this.db, id, input);
		if (result.success) invalidateSiteSettingsCache();
		return result;
	}
	async handleMediaDelete(id) {
		const result = await handleMediaDelete(this.db, id);
		if (result.success) invalidateSiteSettingsCache();
		return result;
	}
	async handleRevisionList(collection, entryId, params = {}) {
		return handleRevisionList(this.db, collection, entryId, params);
	}
	async handleRevisionGet(revisionId) {
		return handleRevisionGet(this.db, revisionId);
	}
	async handleRevisionRestore(revisionId, callerUserId) {
		const revisionRepo = new RevisionRepository(this.db);
		const revision = await revisionRepo.findById(revisionId);
		if (!revision) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Revision not found: ${revisionId}`
			}
		};
		if (!((await this.schemaRegistry.getCollectionWithFields(revision.collection))?.supports?.includes("revisions") ?? false)) {
			const result = await handleRevisionRestore(this.db, revisionId, callerUserId);
			if (result.success) await this.refreshContentUsageAfterSuccessfulWrite(revision.collection, [revision.entryId]);
			return this.hydrateDraftData(result);
		}
		try {
			const newDraft = await revisionRepo.create({
				collection: revision.collection,
				entryId: revision.entryId,
				data: revision.data,
				authorId: callerUserId
			});
			validateIdentifier(revision.collection, "collection");
			const tableName = `ec_${revision.collection}`;
			await sql`
				UPDATE ${sql.ref(tableName)}
				SET draft_revision_id = ${newDraft.id}
				WHERE id = ${revision.entryId}
			`.execute(this.db);
			revisionRepo.pruneOldRevisions(revision.collection, revision.entryId, 50).catch(() => {});
			const refetched = await handleContentGet(this.db, revision.collection, revision.entryId);
			const hydrated = await this.hydrateDraftData(refetched);
			if (hydrated.success) await this.refreshContentUsageAfterSuccessfulWrite(revision.collection, [revision.entryId]);
			return hydrated;
		} catch (error) {
			console.error("[emdash] revision restore failed:", error);
			return {
				success: false,
				error: {
					code: "REVISION_RESTORE_ERROR",
					message: "Failed to restore revision"
				}
			};
		}
	}
	async refreshContentUsageAfterSuccessfulWrite(collection, contentIds) {
		for (const contentId of new Set(contentIds)) try {
			await refreshContentMediaUsageAfterWrite(this.db, collection, contentId);
		} catch (error) {
			console.error(`[media-usage] Failed after content write ${collection}/${contentId}:`, error);
		}
	}
	async deleteContentUsageAfterSuccessfulPermanentDelete(collection, contentId) {
		try {
			const result = await deleteContentMediaUsage(this.db, collection, contentId);
			if (!result.success) console.error(`[media-usage] Usage delete for ${collection}/${contentId} finished with ${result.errorCode}`);
		} catch (error) {
			console.error(`[media-usage] Failed after permanent content delete ${collection}/${contentId}:`, error);
		}
	}
	/**
	* Get route metadata for a plugin route without invoking the handler.
	* Used by the catch-all route to decide auth before dispatch.
	* Returns null if the plugin or route doesn't exist.
	*/
	getPluginRouteMeta(pluginId, path) {
		if (!this.isPluginEnabled(pluginId)) return null;
		const routeKey = path.replace(LEADING_SLASH_PATTERN, "");
		const trustedPlugin = this.configuredPlugins.find((p) => p.id === pluginId);
		if (trustedPlugin) {
			const route = trustedPlugin.routes[routeKey];
			if (!route) return null;
			return buildRouteMeta(route);
		}
		const meta = sandboxedRouteMetaCache.get(pluginId);
		if (meta) {
			const routeMeta = meta.get(routeKey);
			if (routeMeta) return routeMeta;
		}
		if (routeKey === "admin") {
			const manifestMeta = marketplaceManifestCache.get(pluginId);
			if (manifestMeta?.admin?.pages?.length || manifestMeta?.admin?.widgets?.length) return { public: false };
			const entry = this.sandboxedPluginEntries.find((e) => e.id === pluginId);
			if (entry?.adminPages?.length || entry?.adminWidgets?.length) return { public: false };
		}
		if (this.findSandboxedPlugin(pluginId)) return { public: false };
		return null;
	}
	/**
	* Resolve the settings schema for a runtime-installed (marketplace or
	* registry) plugin from its cached manifest. Returns `{}` for a known
	* plugin without a schema and `null` for unknown plugins, matching the
	* contract of `getPluginSettingsSchema` for build-time plugins.
	*/
	getRuntimePluginSettingsSchema(pluginId) {
		const meta = marketplaceManifestCache.get(pluginId);
		if (!meta) return null;
		return meta.admin?.settingsSchema ?? {};
	}
	async handlePluginApiRoute(pluginId, _method, path, request) {
		if (!this.isPluginEnabled(pluginId)) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Plugin not enabled: ${pluginId}`
			}
		};
		const trustedPlugin = this.configuredPlugins.find((p) => p.id === pluginId);
		if (trustedPlugin && this.enabledPlugins.has(trustedPlugin.id)) {
			const routeRegistry = new PluginRouteRegistry({
				...this.pipelineFactoryOptions,
				emailPipeline: this.email ?? void 0,
				cronReschedule: () => this.cronScheduler?.reschedule(),
				trustedProxyHeaders: getTrustedProxyHeaders(this.config)
			});
			routeRegistry.register(trustedPlugin);
			const routeKey = path.replace(LEADING_SLASH_PATTERN, "");
			let body = void 0;
			try {
				body = await request.json();
			} catch {}
			return routeRegistry.invoke(pluginId, routeKey, {
				request,
				body
			});
		}
		const sandboxedPlugin = this.findSandboxedPlugin(pluginId);
		if (sandboxedPlugin) return this.handleSandboxedRoute(sandboxedPlugin, path, request);
		return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Plugin not found: ${pluginId}`
			}
		};
	}
	async getPluginMcpTools(pluginId) {
		const tools = [];
		const seen = /* @__PURE__ */ new Set();
		for (const plugin of this.configuredPlugins) {
			if (pluginId && plugin.id !== pluginId) continue;
			for (const [name, tool] of Object.entries(plugin.mcp?.tools ?? {})) {
				const route = plugin.routes[tool.route];
				if (!route || route.public || !route.permission || !(route.permission in Permissions)) continue;
				const key = `${plugin.id}__${name}`;
				if (seen.has(key)) continue;
				seen.add(key);
				tools.push({
					pluginId: plugin.id,
					name,
					description: tool.description,
					route: tool.route,
					permission: route.permission,
					destructive: tool.destructive ?? false,
					inputSchema: tool.input,
					outputSchema: tool.output
				});
			}
		}
		const addManifestTools = (id, mcp) => {
			if (pluginId && id !== pluginId) return;
			for (const tool of mcp?.tools ?? []) {
				const key = `${id}__${tool.name}`;
				const routeMeta = this.getPluginRouteMeta(id, tool.route);
				if (seen.has(key) || !routeMeta || routeMeta.public || routeMeta.permission !== tool.permission || !(tool.permission in Permissions)) continue;
				seen.add(key);
				tools.push({
					pluginId: id,
					name: tool.name,
					description: tool.description,
					route: tool.route,
					permission: tool.permission,
					destructive: tool.destructive,
					inputSchema: z.fromJSONSchema({ ...tool.inputSchema }),
					outputSchema: tool.outputSchema ? z.fromJSONSchema({ ...tool.outputSchema }) : void 0
				});
			}
		};
		for (const entry of this.sandboxedPluginEntries) addManifestTools(entry.id, entry.mcp);
		for (const [id, manifest] of marketplaceManifestCache) addManifestTools(id, manifest.mcp);
		return tools;
	}
	async getEnabledPluginMcpTools() {
		const [tools, states] = await Promise.all([this.getPluginMcpTools(), new PluginStateRepository(this.db).getAll()]);
		const stateByPlugin = new Map(states.map((state) => [state.pluginId, state]));
		return tools.filter((tool) => {
			const state = stateByPlugin.get(tool.pluginId);
			if (!state?.mcpToolsEnabled || state.status !== "active" || !this.isPluginEnabled(tool.pluginId)) return false;
			return state.mcpToolsConsent === this.serializePluginMcpConsent(tools, tool.pluginId);
		});
	}
	serializePluginMcpConsent(tools, pluginId) {
		return JSON.stringify(tools.filter((tool) => tool.pluginId === pluginId).map((tool) => ({
			name: tool.name,
			description: tool.description,
			route: tool.route,
			permission: tool.permission,
			destructive: tool.destructive,
			inputSchema: z.toJSONSchema(tool.inputSchema, { target: "draft-7" }),
			...tool.outputSchema ? { outputSchema: z.toJSONSchema(tool.outputSchema, { target: "draft-7" }) } : {}
		})).toSorted((a, b) => a.name.localeCompare(b.name)));
	}
	async handlePluginMcpTool(pluginId, toolName, route, input, actorId, request) {
		const requestMeta = extractRequestMeta(request, getTrustedProxyHeaders(this.config));
		const audit = new AuditRepository(this.db);
		const headers = new Headers(request.headers);
		headers.delete("content-length");
		headers.delete("content-encoding");
		const internalRequest = new Request(request.url, {
			method: "POST",
			headers,
			body: JSON.stringify(input)
		});
		const result = await this.handlePluginApiRoute(pluginId, "POST", route, internalRequest);
		await audit.log({
			actorId,
			actorIp: requestMeta.ip ?? void 0,
			action: "plugin_tool_invoke",
			resourceType: "plugin_mcp_tool",
			resourceId: `${pluginId}__${toolName}`,
			details: {
				pluginId,
				tool: toolName,
				route
			},
			status: result.success ? "success" : "failure"
		});
		return result;
	}
	async handlePluginMcpDenied(pluginId, toolName, route, actorId, request, reason) {
		const requestMeta = extractRequestMeta(request, getTrustedProxyHeaders(this.config));
		await new AuditRepository(this.db).log({
			actorId,
			actorIp: requestMeta.ip ?? void 0,
			action: "plugin_tool_invoke",
			resourceType: "plugin_mcp_tool",
			resourceId: `${pluginId}__${toolName}`,
			details: {
				pluginId,
				tool: toolName,
				route,
				reason
			},
			status: "denied"
		});
	}
	findSandboxedPlugin(pluginId) {
		for (const [key, plugin] of this.sandboxedPlugins) if (key.startsWith(pluginId + ":")) return plugin;
	}
	/**
	* Normalize image/file fields in content data.
	* Fills missing dimensions, storageKey, mimeType, and filename from providers.
	*/
	async normalizeMediaFields(collection, data) {
		let collectionInfo;
		try {
			collectionInfo = await this.schemaRegistry.getCollectionWithFields(collection);
		} catch {
			return data;
		}
		if (!collectionInfo?.fields) return data;
		const imageFields = collectionInfo.fields.filter((f) => f.type === "image" || f.type === "file");
		if (imageFields.length === 0) return data;
		const getProvider = (id) => this.getMediaProvider(id);
		const result = { ...data };
		for (const field of imageFields) {
			const value = result[field.slug];
			if (value == null) continue;
			try {
				const normalized = await normalizeMediaValue(value, getProvider);
				if (normalized) result[field.slug] = normalized;
			} catch {}
		}
		return result;
	}
	async runSandboxedBeforeSave(content, collection, isNew) {
		let result = content;
		for (const [pluginKey, plugin] of this.sandboxedPlugins) {
			const [id] = pluginKey.split(":");
			if (!id || !this.isPluginEnabled(id)) continue;
			try {
				const hookResult = await plugin.invokeHook("content:beforeSave", {
					content: result,
					collection,
					isNew
				});
				if (hookResult && typeof hookResult === "object" && !Array.isArray(hookResult)) {
					const record = {};
					for (const [k, v] of Object.entries(hookResult)) record[k] = v;
					result = record;
				}
			} catch (error) {
				console.error(`EmDash: Sandboxed plugin ${id} beforeSave hook error:`, error);
			}
		}
		return result;
	}
	async runSandboxedBeforeDelete(id, collection) {
		for (const [pluginKey, plugin] of this.sandboxedPlugins) {
			const [pluginId] = pluginKey.split(":");
			if (!pluginId || !this.isPluginEnabled(pluginId)) continue;
			try {
				if (await plugin.invokeHook("content:beforeDelete", {
					id,
					collection
				}) === false) return false;
			} catch (error) {
				console.error(`EmDash: Sandboxed plugin ${pluginId} beforeDelete hook error:`, error);
			}
		}
		return true;
	}
	runAfterSaveHooks(content, collection, isNew) {
		after(async () => {
			if (this.hooks.hasHooks("content:afterSave")) try {
				await this.hooks.runContentAfterSave(content, collection, isNew);
			} catch (err) {
				console.error("EmDash afterSave hook error:", err);
			}
			const tasks = [];
			for (const [pluginKey, plugin] of this.sandboxedPlugins) {
				const [id] = pluginKey.split(":");
				if (!id || !this.isPluginEnabled(id)) continue;
				tasks.push((async () => {
					try {
						await plugin.invokeHook("content:afterSave", {
							content,
							collection,
							isNew
						});
					} catch (err) {
						console.error(`EmDash: Sandboxed plugin ${id} afterSave error:`, err);
					}
				})());
			}
			await Promise.allSettled(tasks);
		});
	}
	runAfterDeleteHooks(id, collection, permanent) {
		if (this.hooks.hasHooks("content:afterDelete")) this.hooks.runContentAfterDelete(id, collection, permanent).catch((err) => console.error("EmDash afterDelete hook error:", err));
		for (const [pluginKey, plugin] of this.sandboxedPlugins) {
			const [pluginId] = pluginKey.split(":");
			if (!pluginId || !this.isPluginEnabled(pluginId)) continue;
			plugin.invokeHook("content:afterDelete", {
				id,
				collection,
				permanent
			}).catch((err) => console.error(`EmDash: Sandboxed plugin ${pluginId} afterDelete error:`, err));
		}
	}
	runDeferredContentHook(name, content, collection) {
		const label = name.slice(8);
		after(async () => {
			if (this.hooks.hasHooks(name)) try {
				switch (name) {
					case "content:afterPublish":
						await this.hooks.runContentAfterPublish(content, collection);
						break;
					case "content:afterUnpublish":
						await this.hooks.runContentAfterUnpublish(content, collection);
						break;
					case "content:afterRestore":
						await this.hooks.runContentAfterRestore(content, collection);
						break;
					case "content:afterSchedule":
						await this.hooks.runContentAfterSchedule(content, collection);
						break;
					case "content:afterUnschedule": await this.hooks.runContentAfterUnschedule(content, collection);
				}
			} catch (err) {
				console.error(`EmDash ${label} hook error:`, err);
			}
			const tasks = [];
			for (const [pluginKey, plugin] of this.sandboxedPlugins) {
				const [pluginId] = pluginKey.split(":");
				if (!pluginId || !this.isPluginEnabled(pluginId)) continue;
				tasks.push((async () => {
					try {
						await plugin.invokeHook(name, {
							content,
							collection
						});
					} catch (err) {
						console.error(`EmDash: Sandboxed plugin ${pluginId} ${label} error:`, err);
					}
				})());
			}
			await Promise.allSettled(tasks);
		});
	}
	runAfterPublishHooks(content, collection) {
		this.runDeferredContentHook("content:afterPublish", content, collection);
	}
	runAfterUnpublishHooks(content, collection) {
		this.runDeferredContentHook("content:afterUnpublish", content, collection);
	}
	runAfterRestoreHooks(content, collection) {
		this.runDeferredContentHook("content:afterRestore", content, collection);
	}
	runAfterScheduleHooks(content, collection) {
		this.runDeferredContentHook("content:afterSchedule", content, collection);
	}
	runAfterUnscheduleHooks(content, collection) {
		this.runDeferredContentHook("content:afterUnschedule", content, collection);
	}
	async handleSandboxedRoute(plugin, path, request) {
		const routeName = path.replace(LEADING_SLASH_PATTERN, "");
		let body = void 0;
		try {
			body = await request.json();
		} catch {}
		try {
			const headers = sanitizeHeadersForSandbox(request.headers);
			const meta = extractRequestMeta(request, this.config);
			return {
				success: true,
				data: await plugin.invokeRoute(routeName, body, {
					url: request.url,
					method: request.method,
					headers,
					meta
				})
			};
		} catch (error) {
			console.error(`EmDash: Sandboxed plugin route error:`, error);
			return {
				success: false,
				error: {
					code: "ROUTE_ERROR",
					message: error instanceof Error ? error.message : String(error)
				}
			};
		}
	}
	/**
	* Cache for page contributions. Uses a WeakMap keyed on the PublicPageContext
	* object so results are collected once per page context per request, even when
	* multiple render components (EmDashHead, EmDashBodyStart, EmDashBodyEnd)
	* request contributions from the same page.
	*/
	pageContributionCache = /* @__PURE__ */ new WeakMap();
	/**
	* Collect all page contributions (metadata + fragments) in a single pass.
	* Results are cached by page context object identity.
	*/
	async collectPageContributions(page) {
		const cached = this.pageContributionCache.get(page);
		if (cached) return cached;
		const promise = this.doCollectPageContributions(page);
		this.pageContributionCache.set(page, promise);
		return promise;
	}
	async doCollectPageContributions(page) {
		const metadata = [];
		const fragments = [];
		if (this.hooks.hasHooks("page:metadata")) {
			const results = await this.hooks.runPageMetadata({ page });
			for (const r of results) metadata.push(...r.contributions);
		}
		if (this.hooks.hasHooks("page:fragments")) {
			const results = await this.hooks.runPageFragments({ page });
			for (const r of results) fragments.push(...r.contributions);
		}
		for (const [pluginKey, plugin] of this.sandboxedPlugins) {
			const [id] = pluginKey.split(":");
			if (!id || !this.isPluginEnabled(id)) continue;
			try {
				const result = await plugin.invokeHook("page:metadata", { page });
				if (result != null) {
					const items = Array.isArray(result) ? result : [result];
					for (const item of items) if (isValidMetadataContribution(item)) metadata.push(item);
				}
			} catch (error) {
				console.error(`EmDash: Sandboxed plugin ${id} page:metadata error:`, error);
			}
		}
		return {
			metadata,
			fragments
		};
	}
	/**
	* Collect page metadata contributions from trusted and sandboxed plugins.
	* Delegates to the single-pass collector and returns the metadata portion.
	*/
	async collectPageMetadata(page) {
		const { metadata } = await this.collectPageContributions(page);
		return metadata;
	}
	/**
	* Collect page fragment contributions from trusted plugins only.
	* Delegates to the single-pass collector and returns the fragments portion.
	*/
	async collectPageFragments(page) {
		const { fragments } = await this.collectPageContributions(page);
		return fragments;
	}
	isPluginEnabled(pluginId) {
		const status = this.pluginStates.get(pluginId);
		return status === void 0 || status === "active";
	}
};
function resolvePublicMediaUrl(storage, storageKey) {
	if (!storageKey) return "";
	if (storage) return storage.getPublicUrl(storageKey);
	return `/_emdash/api/media/file/${storageKey}`;
}
function createPublicMediaUrlResolver(storage) {
	return (key) => resolvePublicMediaUrl(storage, key);
}
var ASTRO_COOKIES_SYMBOL = /* @__PURE__ */ Symbol.for("astro.cookies");
function wrapResponseForScopedClose(response, close) {
	let closed = false;
	const runClose = () => {
		if (closed) return;
		closed = true;
		try {
			close();
		} catch (error) {
			console.error("[emdash] request-scoped db close failed:", error);
		}
	};
	if (!response.body) {
		runClose();
		return response;
	}
	const transform = new TransformStream({
		flush: runClose,
		cancel: runClose
	});
	const wrapped = new Response(response.body.pipeThrough(transform), response);
	const astroCookies = Reflect.get(response, ASTRO_COOKIES_SYMBOL);
	if (astroCookies !== void 0) Reflect.set(wrapped, ASTRO_COOKIES_SYMBOL, astroCookies);
	wrapped.headers.delete("Content-Length");
	return wrapped;
}
async function finishScoped(scoped, run) {
	let response;
	try {
		response = await run();
	} catch (error) {
		commitSafely(scoped.commit);
		closeSafely(scoped.close);
		throw error;
	}
	try {
		scoped.commit();
	} catch (error) {
		closeSafely(scoped.close);
		throw error;
	}
	return scoped.close ? wrapResponseForScopedClose(response, scoped.close) : response;
}
function commitSafely(commit) {
	try {
		commit();
	} catch (error) {
		console.error("[emdash] request-scoped db commit failed during error handling:", error);
	}
}
function closeSafely(close) {
	if (!close) return;
	try {
		close();
	} catch (error) {
		console.error("[emdash] request-scoped db close failed during error handling:", error);
	}
}
var STREAM_END_PREFIX = "[emdash-stream-end]";
function wrapBodyForStreamMetrics(response) {
	if (!isInstrumentationEnabled()) return response;
	if (!response.body) return response;
	const ctx = getRequestContext();
	const metrics = ctx?.metrics;
	if (!metrics) return response;
	const recorder = ctx?.queryRecorder;
	if (recorder) recorder.deferredFlush = true;
	const transform = new TransformStream({ flush() {
		const snapshot = {
			route: recorder?.route,
			method: recorder?.method,
			phase: recorder?.phase,
			totalMs: performance.now() - metrics.start,
			dbCount: metrics.dbCount,
			dbTotalMs: metrics.dbTotalMs,
			dbFirstOffset: metrics.dbFirstOffset,
			dbLastOffset: metrics.dbLastOffset,
			cacheHits: metrics.cacheHits,
			cacheMisses: metrics.cacheMisses
		};
		console.log(`${STREAM_END_PREFIX} ${JSON.stringify(snapshot)}`);
		if (recorder) flushRecorder(recorder);
	} });
	const wrapped = new Response(response.body.pipeThrough(transform), response);
	const astroCookies = Reflect.get(response, ASTRO_COOKIES_SYMBOL);
	if (astroCookies !== void 0) Reflect.set(wrapped, ASTRO_COOKIES_SYMBOL, astroCookies);
	wrapped.headers.delete("Content-Length");
	return wrapped;
}
async function prefetchWidgetAreas() {
	const areas = await getWidgetAreas();
	for (const area of areas) setRequestCacheEntry(`widget-area:${area.name}`, area);
}
async function prefetchTaxonomyTerms() {
	const defs = await getTaxonomyDefs();
	await Promise.allSettled(defs.map((def) => getTaxonomyTerms(def.name)));
}
async function prefetchMenus() {
	const rows = await (await getDb()).selectFrom("_emdash_menus").select("name").distinct().execute();
	const names = [...new Set(rows.map((r) => r.name))];
	await Promise.allSettled(names.map((name) => getMenu(name)));
}
async function prefetchLayoutData() {
	try {
		await Promise.allSettled([
			getSiteSettings(),
			prefetchMenus(),
			prefetchWidgetAreas(),
			prefetchTaxonomyTerms()
		]);
	} catch (error) {
		console.error("[emdash] layout prefetch failed (non-fatal):", error);
	}
}
function pluginRouteNotFound() {
	return {
		success: false,
		error: {
			code: "NOT_FOUND",
			message: "Plugin route not found"
		}
	};
}
function createPublicPluginApiRouteHandler(runtime) {
	return async (pluginId, method, path, request) => {
		if (runtime.getPluginRouteMeta(pluginId, path)?.public !== true) return pluginRouteNotFound();
		return runtime.handlePluginApiRoute(pluginId, method, path, request);
	};
}
var RUNTIME_INIT_DEADLINE_MS = DB_INIT_DEADLINE_MS + 15e3;
var RUNTIME_INIT_ERROR_LOG_INTERVAL_MS = 3e4;
var lastRuntimeInitErrorLogAt = 0;
var SETUP_VERIFIED_KEY = /* @__PURE__ */ Symbol.for("emdash:setup-verified");
var setupFlagStore = globalThis;
function isSetupVerified() {
	return setupFlagStore[SETUP_VERIFIED_KEY] === true;
}
function markSetupVerified() {
	setupFlagStore[SETUP_VERIFIED_KEY] = true;
}
var RUNTIME_HOLDER_KEY = /* @__PURE__ */ Symbol.for("emdash:runtime-holder");
function getRuntimeHolder() {
	let holder = setupFlagStore[RUNTIME_HOLDER_KEY];
	if (!holder) {
		holder = {
			instance: null,
			lock: createInitLock()
		};
		setupFlagStore[RUNTIME_HOLDER_KEY] = holder;
	}
	return holder;
}
var i18nInitialized = false;
function getConfig() {
	if (config_default && typeof config_default === "object") {
		if (!i18nInitialized) {
			i18nInitialized = true;
			const config = config_default;
			if (config.i18n && typeof config.i18n === "object") setI18nConfig(config.i18n);
			else setI18nConfig(null);
		}
		return config_default;
	}
	return null;
}
function getPlugins() {
	return plugins || [];
}
function buildDependencies(config) {
	const sandboxModule = sandbox_runner_exports;
	return {
		config,
		plugins: getPlugins(),
		createDialect,
		createCoalescingDialect: void 0,
		createStorage,
		createScheduler,
		sandboxEnabled: sandboxModule.sandboxEnabled,
		sandboxBypassed: sandboxModule.sandboxBypassed ?? false,
		sandboxedPluginEntries: sandboxedPlugins || [],
		createSandboxRunner: sandboxModule.createSandboxRunner,
		mediaProviderEntries: mediaProviders || []
	};
}
async function getRuntime(config, initTimings) {
	const holder = getRuntimeHolder();
	return initWithLock(holder.lock, () => holder.instance, async (isCurrentClaim) => {
		const deps = buildDependencies(config);
		const runtime = await EmDashRuntime.create(deps, initTimings);
		if (isCurrentClaim()) holder.instance = runtime;
		else runtime.stopCron().catch((error) => {
			console.error("[emdash] failed to stop superseded runtime's cron:", error);
		});
		return runtime;
	}, {
		deadlineMs: RUNTIME_INIT_DEADLINE_MS,
		anchor: (promise) => after(() => promise)
	});
}
new URL("https://cron.emdash.internal/");
function finalizeResponse(response, serverTimings) {
	const res = new Response(response.body, response);
	const astroCookies = Reflect.get(response, ASTRO_COOKIES_SYMBOL);
	if (astroCookies !== void 0) Reflect.set(res, ASTRO_COOKIES_SYMBOL, astroCookies);
	if (!res.headers.has("X-Content-Type-Options")) res.headers.set("X-Content-Type-Options", "nosniff");
	if (!res.headers.has("Referrer-Policy")) res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
	if (!res.headers.has("Permissions-Policy")) res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
	if (!res.headers.has("Content-Security-Policy")) res.headers.set("X-Frame-Options", "SAMEORIGIN");
	if (serverTimings && serverTimings.length > 0) res.headers.set("Server-Timing", serverTimings.map((t) => {
		const dur = Math.round(t.dur);
		return t.desc ? `${t.name};dur=${dur};desc="${t.desc}"` : `${t.name};dur=${dur}`;
	}).join(", "));
	return res;
}
function pushMetricsTimings(timings, metrics) {
	if (metrics.dbCount > 0) {
		timings.push({
			name: "db.total",
			dur: metrics.dbTotalMs,
			desc: "DB total"
		});
		timings.push({
			name: "db.count",
			dur: metrics.dbCount,
			desc: "Query count"
		});
		if (metrics.dbFirstOffset !== null) timings.push({
			name: "db.first",
			dur: metrics.dbFirstOffset,
			desc: "First query at"
		});
		if (metrics.dbLastOffset !== null) timings.push({
			name: "db.last",
			dur: metrics.dbLastOffset,
			desc: "Last query at"
		});
	}
	if (metrics.rpcCount > 0) timings.push({
		name: "rpc.count",
		dur: metrics.rpcCount,
		desc: "DB round trips"
	});
	if (metrics.cacheHits + metrics.cacheMisses > 0) {
		timings.push({
			name: "cache.hit",
			dur: metrics.cacheHits,
			desc: "Cache hits"
		});
		timings.push({
			name: "cache.miss",
			dur: metrics.cacheMisses,
			desc: "Cache misses"
		});
	}
}
var PUBLIC_RUNTIME_ROUTES = /* @__PURE__ */ new Set(["/sitemap.xml", "/robots.txt"]);
var SITEMAP_COLLECTION_RE = /^\/sitemap-[a-z][a-z0-9_]*\.xml$/;
function createRequestScopedDb$1(opts) {
	if (typeof createRequestScopedDb !== "function") return null;
	return createRequestScopedDb(opts);
}
var onRequest$5 = defineMiddleware(async (context, next) => {
	const { request, locals, cookies } = context;
	const url = context.url;
	if (!url.pathname.startsWith("/_emdash") && config_default?.authProviders) {
		if (config_default.authProviders.some((p) => p.routes?.some((r) => r.pattern && url.pathname === r.pattern))) return finalizeResponse(await next());
	}
	const queryRecorder = isInstrumentationEnabled() ? createRecorder(url.pathname, request.method, request.headers.get("x-perf-phase") ?? "default") : void 0;
	const metrics = createRequestMetrics(performance.now());
	const run = async () => {
		const isEmDashRoute = url.pathname.startsWith("/_emdash");
		const isPublicRuntimeRoute = PUBLIC_RUNTIME_ROUTES.has(url.pathname) || SITEMAP_COLLECTION_RE.test(url.pathname);
		const hasEditCookie = cookies.get("emdash-edit-mode")?.value === "true";
		const hasPreviewToken = url.searchParams.has("_preview");
		const playgroundDb = locals.__playgroundDb;
		const hasSessionCookie = cookies.get("astro-session") !== void 0;
		const sessionUser = context.isPrerendered || !hasSessionCookie ? null : await resolveSessionUser(context.session);
		const hasBearerAuth = (request.headers.get("authorization") ?? "").toLowerCase().startsWith("bearer ");
		if (!isEmDashRoute && !isPublicRuntimeRoute && !hasEditCookie && !hasPreviewToken) {
			if (!sessionUser && !playgroundDb) {
				const timings = [];
				const mwStart = performance.now();
				if (!isSetupVerified() && !context.isPrerendered) {
					const t0 = performance.now();
					try {
						const { getDb: getDb2 } = await import("./chunks/loader-Be3ouI5L_Ci-QkQvc.mjs").then((n) => n.o);
						await (await getDb2()).selectFrom("_emdash_migrations").selectAll().limit(1).execute();
						markSetupVerified();
					} catch (error) {
						if (isMissingTableError(error)) return context.redirect("/_emdash/admin/setup");
						console.error("Setup probe failed (non-fatal):", error);
					}
					timings.push({
						name: "setup",
						dur: performance.now() - t0,
						desc: "Setup probe"
					});
				}
				const config2 = getConfig();
				if (config2) {
					const initSubTimings = [];
					const t0 = performance.now();
					try {
						const runtime = await getRuntime(config2, initSubTimings);
						markSetupVerified();
						locals.emdash = {
							handlePublicPluginApiRoute: createPublicPluginApiRouteHandler(runtime),
							collectPageMetadata: runtime.collectPageMetadata.bind(runtime),
							collectPageFragments: runtime.collectPageFragments.bind(runtime),
							getPublicMediaUrl: createPublicMediaUrlResolver(runtime.storage),
							storage: runtime.storage
						};
					} catch (error) {
						if (Date.now() - lastRuntimeInitErrorLogAt >= RUNTIME_INIT_ERROR_LOG_INTERVAL_MS) {
							lastRuntimeInitErrorLogAt = Date.now();
							console.error("[emdash] runtime init failed (page renders without CMS data):", error);
						}
					}
					timings.push({
						name: "rt",
						dur: performance.now() - t0,
						desc: "Runtime init"
					});
					for (const sub of initSubTimings) timings.push(sub);
				}
				const anonScoped = createRequestScopedDb$1({
					config: config2?.database?.config,
					isAuthenticated: false,
					isWrite: request.method !== "GET" && request.method !== "HEAD",
					cookies,
					url
				});
				const runAnon = async () => {
					const t0 = performance.now();
					const response = await next();
					timings.push({
						name: "render",
						dur: performance.now() - t0,
						desc: "Page render"
					});
					timings.push({
						name: "mw",
						dur: performance.now() - mwStart,
						desc: "Total middleware"
					});
					pushMetricsTimings(timings, metrics);
					return wrapBodyForStreamMetrics(finalizeResponse(response, timings));
				};
				if (anonScoped) {
					const parent = getRequestContext();
					const ctx = parent ? {
						...parent,
						db: anonScoped.db
					} : {
						editMode: false,
						db: anonScoped.db,
						metrics
					};
					const acceptsHtml = (request.headers.get("accept") ?? "").split(",", 1)[0].trim().startsWith("text/html");
					return runWithContext(ctx, async () => {
						if (acceptsHtml) after(() => prefetchLayoutData());
						return finishScoped(anonScoped, runAnon);
					});
				}
				return runAnon();
			}
		}
		const config = getConfig();
		if (!config) {
			console.error("EmDash: No configuration found");
			return finalizeResponse(await next());
		}
		const doInit = async () => {
			const timings = [];
			const mwStart = performance.now();
			try {
				const initSubTimings = [];
				let t0 = performance.now();
				const runtime = await getRuntime(config, initSubTimings);
				timings.push({
					name: "rt",
					dur: performance.now() - t0,
					desc: "Runtime init"
				});
				for (const sub of initSubTimings) timings.push(sub);
				markSetupVerified();
				locals.emdash = {
					handleContentList: runtime.handleContentList.bind(runtime),
					handleContentGet: runtime.handleContentGet.bind(runtime),
					handleContentAuthors: runtime.handleContentAuthors.bind(runtime),
					handleContentCreate: runtime.handleContentCreate.bind(runtime),
					handleContentUpdate: runtime.handleContentUpdate.bind(runtime),
					handleContentDelete: runtime.handleContentDelete.bind(runtime),
					handleContentListTrashed: runtime.handleContentListTrashed.bind(runtime),
					handleContentRestore: runtime.handleContentRestore.bind(runtime),
					handleContentPermanentDelete: runtime.handleContentPermanentDelete.bind(runtime),
					handleContentCountTrashed: runtime.handleContentCountTrashed.bind(runtime),
					handleContentGetIncludingTrashed: runtime.handleContentGetIncludingTrashed.bind(runtime),
					handleContentDuplicate: runtime.handleContentDuplicate.bind(runtime),
					handleContentPublish: runtime.handleContentPublish.bind(runtime),
					handleContentUnpublish: runtime.handleContentUnpublish.bind(runtime),
					handleContentSchedule: runtime.handleContentSchedule.bind(runtime),
					handleContentUnschedule: runtime.handleContentUnschedule.bind(runtime),
					handleContentCountScheduled: runtime.handleContentCountScheduled.bind(runtime),
					handleContentDiscardDraft: runtime.handleContentDiscardDraft.bind(runtime),
					handleContentCompare: runtime.handleContentCompare.bind(runtime),
					handleContentTranslations: runtime.handleContentTranslations.bind(runtime),
					handleMediaList: runtime.handleMediaList.bind(runtime),
					handleMediaGet: runtime.handleMediaGet.bind(runtime),
					handleMediaCreate: runtime.handleMediaCreate.bind(runtime),
					handleMediaUpdate: runtime.handleMediaUpdate.bind(runtime),
					handleMediaDelete: runtime.handleMediaDelete.bind(runtime),
					handleRevisionList: runtime.handleRevisionList.bind(runtime),
					handleRevisionGet: runtime.handleRevisionGet.bind(runtime),
					handleRevisionRestore: runtime.handleRevisionRestore.bind(runtime),
					handlePluginApiRoute: runtime.handlePluginApiRoute.bind(runtime),
					handlePublicPluginApiRoute: createPublicPluginApiRouteHandler(runtime),
					getPluginRouteMeta: runtime.getPluginRouteMeta.bind(runtime),
					getPluginMcpTools: runtime.getPluginMcpTools.bind(runtime),
					getEnabledPluginMcpTools: runtime.getEnabledPluginMcpTools.bind(runtime),
					serializePluginMcpConsent: runtime.serializePluginMcpConsent.bind(runtime),
					handlePluginMcpTool: runtime.handlePluginMcpTool.bind(runtime),
					handlePluginMcpDenied: runtime.handlePluginMcpDenied.bind(runtime),
					getMediaProvider: runtime.getMediaProvider.bind(runtime),
					getMediaProviderList: runtime.getMediaProviderList.bind(runtime),
					collectPageMetadata: runtime.collectPageMetadata.bind(runtime),
					collectPageFragments: runtime.collectPageFragments.bind(runtime),
					ensureSearchHealthy: runtime.ensureSearchHealthy.bind(runtime),
					storage: runtime.storage,
					get db() {
						return runtime.db;
					},
					getPublicMediaUrl: createPublicMediaUrlResolver(runtime.storage),
					hooks: runtime.hooks,
					email: runtime.email,
					configuredPlugins: runtime.configuredPlugins,
					sandboxedPluginEntries: runtime.sandboxedPluginEntries,
					config,
					getManifest: runtime.getManifest.bind(runtime),
					invalidateUrlPatternCache,
					getSandboxRunner: runtime.getSandboxRunner.bind(runtime),
					isSandboxBypassed: runtime.isSandboxBypassed.bind(runtime),
					syncMarketplacePlugins: runtime.syncMarketplacePlugins.bind(runtime),
					syncRegistryPlugins: runtime.syncRegistryPlugins.bind(runtime),
					setPluginStatus: runtime.setPluginStatus.bind(runtime)
				};
			} catch (error) {
				console.error("EmDash middleware error:", error);
			}
			const scoped = createRequestScopedDb$1({
				config: config?.database?.config,
				isAuthenticated: !!sessionUser || hasBearerAuth,
				isWrite: request.method !== "GET" && request.method !== "HEAD",
				cookies: context.cookies,
				url
			});
			const renderAndFinalize = async () => {
				const t0 = performance.now();
				const response = await next();
				timings.push({
					name: "render",
					dur: performance.now() - t0,
					desc: "Page render"
				});
				timings.push({
					name: "mw",
					dur: performance.now() - mwStart,
					desc: "Total middleware"
				});
				pushMetricsTimings(timings, metrics);
				return wrapBodyForStreamMetrics(finalizeResponse(response, timings));
			};
			if (scoped) {
				const parent = getRequestContext();
				return runWithContext(parent ? {
					...parent,
					db: scoped.db
				} : {
					editMode: false,
					db: scoped.db,
					metrics
				}, () => finishScoped(scoped, renderAndFinalize));
			}
			return renderAndFinalize();
		};
		if (playgroundDb) {
			const editMode = context.cookies.get("emdash-edit-mode")?.value === "true";
			const parent = getRequestContext();
			return runWithContext(parent ? {
				...parent,
				editMode,
				db: playgroundDb,
				dbIsIsolated: true
			} : {
				editMode,
				db: playgroundDb,
				dbIsIsolated: true,
				metrics
			}, doInit);
		}
		return doInit();
	};
	try {
		return await runWithContext({
			editMode: false,
			queryRecorder,
			metrics
		}, run);
	} finally {
		if (queryRecorder && !queryRecorder.deferredFlush) flushRecorder(queryRecorder);
	}
});
//#endregion
//#region node_modules/emdash/dist/astro/middleware/redirect.mjs
/**
* Redirect middleware
*
* Intercepts incoming requests and checks for matching redirect rules.
* Runs after runtime init (needs db) but before setup/auth (should handle
* ALL routes, including public ones, and should be fast).
*
* Skip paths:
* - /_emdash/* (admin UI, API routes, auth endpoints)
* - /_image (Astro image optimization)
* - Static assets (files with extensions)
*
* 404 logging happens post-response: if next() returns 404 and the path
* wasn't already matched by a redirect, log it.
*/
/** Paths that should never be intercepted by redirects */
var SKIP_PREFIXES = ["/_emdash", "/_image"];
/** Static asset extensions -- don't redirect file requests */
var ASSET_EXTENSION = /\.\w{1,10}$/;
function isRedirectCode(code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
}
var onRequest$4 = defineMiddleware(async (context, next) => {
	const { pathname } = context.url;
	if (SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return next();
	if (ASSET_EXTENSION.test(pathname)) return next();
	let db = context.locals.emdash?.db;
	if (!db) try {
		db = await getDb();
	} catch {
		return next();
	}
	try {
		const repo = new RedirectRepository(db);
		let cached = getCachedRedirects();
		if (!cached) cached = setCachedRedirects(await repo.findAllEnabled());
		let exact = cached.exact.get(pathname);
		if (!exact && pathname.length > 1) {
			const alt = pathname.endsWith("/") ? pathname.slice(0, -1) : `${pathname}/`;
			exact = cached.exact.get(alt);
		}
		if (exact) {
			if (isTerminalStatus(exact.type)) {
				repo.recordHit(exact.id).catch(() => {});
				return new Response(null, { status: exact.type });
			}
			const dest = exact.destination;
			if (dest.startsWith("//") || dest.startsWith("/\\")) return next();
			repo.recordHit(exact.id).catch(() => {});
			const code = isRedirectCode(exact.type) ? exact.type : 301;
			return context.redirect(dest, code);
		}
		const patternMatch = matchCachedPatterns(cached.patterns, pathname);
		if (patternMatch) {
			const { redirect, destination } = patternMatch;
			if (isTerminalStatus(redirect.type)) {
				repo.recordHit(redirect.id).catch(() => {});
				return new Response(null, { status: redirect.type });
			}
			if (destination.startsWith("//") || destination.startsWith("/\\")) return next();
			repo.recordHit(redirect.id).catch(() => {});
			const code = isRedirectCode(redirect.type) ? redirect.type : 301;
			return context.redirect(destination, code);
		}
		const response = await next();
		if (response.status === 404) {
			const referrer = context.request.headers.get("referer") ?? null;
			const userAgent = context.request.headers.get("user-agent") ?? null;
			repo.log404({
				path: pathname,
				referrer,
				userAgent
			}).catch(() => {});
		}
		return response;
	} catch {
		return next();
	}
});
//#endregion
//#region node_modules/emdash/dist/astro/middleware/setup.mjs
/**
* Setup detection middleware
*
* Redirects to setup wizard if the site hasn't been set up yet.
* Checks both "emdash:setup_complete" option AND user existence.
*
* Detection logic (in order):
* 1. Does options table exist? No → setup needed
* 2. Is setup_complete true? No → setup needed
* 3. In passkey mode: Are there any users? No → setup needed
*    In Access mode: Skip user check (first user created on first login)
* 4. Proceed to admin
*/
var onRequest$3 = defineMiddleware(async (context, next) => {
	const isAdminRoute = context.url.pathname.startsWith("/_emdash/admin");
	const isSetupRoute = context.url.pathname.startsWith("/_emdash/admin/setup");
	if (isAdminRoute && !isSetupRoute) {
		const { emdash } = context.locals;
		if (!emdash?.db) return next();
		try {
			const setupComplete = await emdash.db.selectFrom("options").select("value").where("name", "=", "emdash:setup_complete").executeTakeFirst();
			if (!(setupComplete && (() => {
				try {
					const parsed = JSON.parse(setupComplete.value);
					return parsed === true || parsed === "true";
				} catch {
					return false;
				}
			})())) return context.redirect("/_emdash/admin/setup");
			if (getAuthMode(emdash.config).type === "passkey") {
				if ((await emdash.db.selectFrom("users").select((eb) => eb.fn.countAll().as("count")).executeTakeFirstOrThrow()).count === 0) return context.redirect("/_emdash/admin/setup");
			}
		} catch (error) {
			if (error instanceof Error && error.message.includes("no such table")) return context.redirect("/_emdash/admin/setup");
			console.error("Setup middleware error:", error);
		}
	}
	return next();
});
//#endregion
//#region node_modules/emdash/dist/astro/middleware/auth.mjs
function checkPublicCsrf(request, url, publicOrigin) {
	if (request.headers.get("X-EmDash-Request") === "1") return null;
	const origin = request.headers.get("Origin");
	if (origin) {
		try {
			const originUrl = new URL(origin);
			if (originUrl.origin === url.origin) return null;
			if (publicOrigin && originUrl.origin === publicOrigin) return null;
		} catch {}
		return apiError("CSRF_REJECTED", "Cross-origin request blocked", 403);
	}
	return null;
}
var S3_ADAPTER_ENTRYPOINT = "emdash/storage/s3";
function getConfiguredStorageEndpoint(storage, runtimeStorage) {
	const config = storage?.config;
	if (typeof config === "object" && config !== null && "endpoint" in config) {
		const endpoint = config.endpoint;
		if (typeof endpoint === "string") return endpoint;
	}
	if (storage?.entrypoint === S3_ADAPTER_ENTRYPOINT) {
		const envEndpoint = typeof process !== "undefined" && process.env ? process.env.S3_ENDPOINT : void 0;
		if (envEndpoint) return envEndpoint;
	}
	return runtimeStorage?.getClientUploadOrigin?.();
}
function getRegistryAggregatorOrigin(registry) {
	const aggregatorUrl = typeof registry === "string" ? registry : registry?.aggregatorUrl;
	if (!aggregatorUrl) return void 0;
	try {
		const url = new URL(aggregatorUrl);
		if (url.protocol !== "http:" && url.protocol !== "https:") return void 0;
		return url.origin;
	} catch {
		return;
	}
}
function getHttpOrigin(rawUrl) {
	if (!rawUrl) return void 0;
	try {
		const url = new URL(rawUrl);
		if (url.protocol !== "http:" && url.protocol !== "https:") return void 0;
		return url.origin;
	} catch {
		return;
	}
}
function buildEmDashCsp(registry, storageEndpoint) {
	const connectSrc = ["connect-src 'self'"];
	const origins = /* @__PURE__ */ new Set();
	const registryAggregatorOrigin = getRegistryAggregatorOrigin(registry);
	if (registryAggregatorOrigin) origins.add(registryAggregatorOrigin);
	const storageOrigin = getHttpOrigin(storageEndpoint);
	if (storageOrigin) origins.add(storageOrigin);
	connectSrc.push(...origins);
	return [
		"default-src 'self'",
		"script-src 'self' 'unsafe-inline'",
		"style-src 'self' 'unsafe-inline'",
		connectSrc.join(" "),
		"form-action 'self'",
		"frame-ancestors 'none'",
		"img-src 'self' https: data: blob:",
		"object-src 'none'",
		"base-uri 'self'"
	].join("; ");
}
var MW_CACHE_HEADERS = { "Cache-Control": "private, no-store" };
var MCP_ENDPOINT_PATH = "/_emdash/api/mcp";
function isUnsafeMethod(method) {
	return method !== "GET" && method !== "HEAD" && method !== "OPTIONS";
}
function csrfRejectedResponse() {
	return apiError("CSRF_REJECTED", "Missing required header", 403);
}
function mcpUnauthorizedResponse(url, config) {
	const origin = getPublicOrigin(url, config);
	const response = apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
	response.headers.set("WWW-Authenticate", `Bearer resource_metadata="${origin}/.well-known/oauth-protected-resource"`);
	return response;
}
var PUBLIC_API_PREFIXES = [
	"/_emdash/api/setup",
	"/_emdash/api/auth/login",
	"/_emdash/api/auth/register",
	"/_emdash/api/auth/dev-bypass",
	"/_emdash/api/auth/signup/",
	"/_emdash/api/auth/magic-link/",
	"/_emdash/api/auth/invite/",
	"/_emdash/api/auth/oauth/",
	"/_emdash/api/oauth/device/token",
	"/_emdash/api/oauth/device/code",
	"/_emdash/api/oauth/token",
	"/_emdash/api/oauth/register",
	"/_emdash/api/comments/",
	"/_emdash/api/media/file/",
	"/_emdash/.well-known/"
];
var PUBLIC_API_EXACT = /* @__PURE__ */ new Set([
	"/_emdash/api/auth/passkey/options",
	"/_emdash/api/auth/passkey/verify",
	"/_emdash/api/auth/mode",
	"/_emdash/api/oauth/token",
	"/_emdash/api/snapshot",
	"/_emdash/api/search",
	"/_emdash/api/search/suggest"
]);
var { exact: _providerExactRoutes, prefixes: _providerPrefixRoutes } = (() => {
	const exact = /* @__PURE__ */ new Set();
	const prefixes = [];
	if (!config_default?.authProviders) return {
		exact,
		prefixes
	};
	for (const route of config_default.authProviders.flatMap((p) => p.publicRoutes ?? [])) if (route.endsWith("/")) prefixes.push(route);
	else exact.add(route);
	return {
		exact,
		prefixes
	};
})();
var CSRF_EXEMPT_PUBLIC_ROUTES = /* @__PURE__ */ new Set([
	"/_emdash/api/oauth/token",
	"/_emdash/api/oauth/register",
	"/_emdash/api/oauth/device/code",
	"/_emdash/api/oauth/device/token"
]);
function isPublicEmDashRoute(pathname) {
	if (PUBLIC_API_EXACT.has(pathname)) return true;
	if (PUBLIC_API_PREFIXES.some((p) => pathname.startsWith(p))) return true;
	if (_providerExactRoutes.has(pathname)) return true;
	if (_providerPrefixRoutes.some((p) => pathname.startsWith(p))) return true;
	return false;
}
function isCsrfExemptPublicRoute(pathname) {
	return CSRF_EXEMPT_PUBLIC_ROUTES.has(pathname);
}
var onRequest$2 = defineMiddleware(async (context, next) => {
	const { url } = context;
	const isAdminRoute = url.pathname.startsWith("/_emdash/admin");
	const isSetupRoute = url.pathname.startsWith("/_emdash/admin/setup");
	const isApiRoute = url.pathname.startsWith("/_emdash/api");
	const isPublicApiRoute = isPublicEmDashRoute(url.pathname);
	const isPublicRoute = !isAdminRoute && !isApiRoute;
	if (isPublicApiRoute) {
		if (isUnsafeMethod(context.request.method.toUpperCase()) && !isCsrfExemptPublicRoute(url.pathname)) {
			const publicOrigin = getPublicOrigin(url, context.locals.emdash?.config);
			const csrfError = checkPublicCsrf(context.request, url, publicOrigin);
			if (csrfError) return csrfError;
		}
		return next();
	}
	if (url.pathname.startsWith("/_emdash/api/plugins/")) {
		const method2 = context.request.method.toUpperCase();
		if (method2 !== "GET" && method2 !== "HEAD" && method2 !== "OPTIONS") {
			const publicOrigin = getPublicOrigin(url, context.locals.emdash?.config);
			const csrfError = checkPublicCsrf(context.request, url, publicOrigin);
			if (csrfError) return csrfError;
		}
		return handlePluginRouteAuth(context, next);
	}
	if (isSetupRoute) {
		const method2 = context.request.method.toUpperCase();
		if (method2 !== "GET" && method2 !== "HEAD" && method2 !== "OPTIONS") {
			if (context.request.headers.get("X-EmDash-Request") !== "1") return apiError("CSRF_REJECTED", "Missing required header", 403);
		}
		return next();
	}
	if (isPublicRoute) return handlePublicRouteAuth(context, next);
	const bearerResult = await handleBearerAuth(context);
	if (bearerResult === "invalid") {
		const response2 = apiError("INVALID_TOKEN", "Invalid or expired token", 401);
		if (url.pathname === "/_emdash/api/mcp") {
			const origin = getPublicOrigin(url, context.locals.emdash?.config);
			response2.headers.set("WWW-Authenticate", `Bearer resource_metadata="${origin}/.well-known/oauth-protected-resource"`);
		}
		return response2;
	}
	const isTokenAuth = bearerResult === "authenticated";
	const method = context.request.method.toUpperCase();
	if (url.pathname === MCP_ENDPOINT_PATH && !isTokenAuth) return mcpUnauthorizedResponse(url, context.locals.emdash?.config);
	const isOAuthConsent = url.pathname.startsWith("/_emdash/oauth/authorize");
	if (isApiRoute && !isTokenAuth && !isOAuthConsent && isUnsafeMethod(method) && !isPublicApiRoute) {
		if (context.request.headers.get("X-EmDash-Request") !== "1") return csrfRejectedResponse();
	}
	if (isTokenAuth) {
		const scopeError = enforceTokenScope(url.pathname, method, context.locals.tokenScopes);
		if (scopeError) return scopeError;
		const response2 = await next();
		response2.headers.set("Content-Security-Policy", buildEmDashCsp(context.locals.emdash?.config.experimental?.registry, getConfiguredStorageEndpoint(context.locals.emdash?.config.storage, context.locals.emdash?.storage)));
		return response2;
	}
	const response = await handleEmDashAuth(context, next);
	response.headers.set("Content-Security-Policy", buildEmDashCsp(context.locals.emdash?.config.experimental?.registry, getConfiguredStorageEndpoint(context.locals.emdash?.config.storage, context.locals.emdash?.storage)));
	return response;
});
async function handleEmDashAuth(context, next) {
	const { url, locals } = context;
	const { emdash } = locals;
	const isPublicAdminRoute = url.pathname.startsWith("/_emdash/admin/login") || url.pathname.startsWith("/_emdash/admin/invite/accept");
	const isApiRoute = url.pathname.startsWith("/_emdash/api");
	if (!emdash?.db) return next();
	const authMode = getAuthMode(emdash.config);
	if (authMode.type === "external") return handleExternalAuth(context, next, authMode, isApiRoute);
	if (isPublicAdminRoute) return next();
	return handlePasskeyAuth(context, next, isApiRoute);
}
async function handlePluginRouteAuth(context, next) {
	const { locals, url } = context;
	const { emdash } = locals;
	try {
		const bearerResult = await handleBearerAuth(context);
		if (bearerResult === "authenticated") return next();
		if (bearerResult === "invalid") return apiError("INVALID_TOKEN", "Invalid or expired token", 401);
	} catch (error) {
		console.error("Plugin route bearer auth error:", error);
	}
	const authMode = getAuthMode(emdash?.config);
	if (authMode.type === "external" && !isPublicPluginApiRoute(url.pathname, emdash)) return handleExternalAuth(context, next, authMode, true);
	try {
		const { session } = context;
		const sessionUser = await resolveSessionUser(session);
		if (sessionUser?.id && emdash?.db) {
			const user = await createKyselyAdapter(emdash.db).getUserById(sessionUser.id);
			if (user && !user.disabled) locals.user = user;
		}
	} catch (error) {
		console.error("Plugin route session auth error:", error);
	}
	return next();
}
function isPublicPluginApiRoute(pathname, emdash) {
	const route = pathname.slice(21);
	const slashIndex = route.indexOf("/");
	if (slashIndex <= 0 || !emdash?.getPluginRouteMeta) return false;
	return emdash.getPluginRouteMeta(route.slice(0, slashIndex), route.slice(slashIndex))?.public === true;
}
async function handlePublicRouteAuth(context, next) {
	const { locals, session } = context;
	const { emdash } = locals;
	try {
		const sessionUser = await resolveSessionUser(session);
		if (sessionUser?.id && emdash?.db) {
			const user = await createKyselyAdapter(emdash.db).getUserById(sessionUser.id);
			if (user && !user.disabled) locals.user = user;
		}
	} catch {}
	return next();
}
async function handleExternalAuth(context, next, authMode, _isApiRoute) {
	const { locals, request } = context;
	const { emdash } = locals;
	try {
		throw new Error(`Auth provider ${authMode.entrypoint} does not export an authenticate function`);
	} catch (error) {
		console.error("[external-auth] Auth error:", error);
		return new Response("Authentication failed", {
			status: 401,
			headers: {
				"Content-Type": "text/plain",
				...MW_CACHE_HEADERS
			}
		});
	}
}
async function handleBearerAuth(context) {
	const authHeader = context.request.headers.get("Authorization");
	if (!authHeader?.startsWith("Bearer ")) return "none";
	const token = authHeader.slice(7);
	if (!token) return "none";
	const { locals } = context;
	const { emdash } = locals;
	if (!emdash?.db) return "none";
	let resolved = null;
	if (token.startsWith("ec_pat_")) resolved = await resolveApiToken(emdash.db, token);
	else if (token.startsWith("ec_oat_")) resolved = await resolveOAuthToken(emdash.db, token);
	else return "invalid";
	if (!resolved) return "invalid";
	const user = await createKyselyAdapter(emdash.db).getUserById(resolved.userId);
	if (!user || user.disabled) return "invalid";
	locals.user = user;
	locals.tokenScopes = resolved.scopes;
	return "authenticated";
}
async function handlePasskeyAuth(context, next, isApiRoute) {
	const { url, locals, session } = context;
	const { emdash } = locals;
	try {
		const sessionUser = await resolveSessionUser(session);
		if (!sessionUser?.id) {
			if (isApiRoute) return apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
			const loginUrl = new URL("/_emdash/admin/login", getPublicOrigin(url, emdash?.config));
			loginUrl.searchParams.set("redirect", url.pathname);
			return context.redirect(loginUrl.toString());
		}
		const user = await createKyselyAdapter(emdash.db).getUserById(sessionUser.id);
		if (!user) {
			session?.destroy();
			if (isApiRoute) return apiError("NOT_FOUND", "User not found", 401);
			const loginUrl = new URL("/_emdash/admin/login", getPublicOrigin(url, emdash?.config));
			return context.redirect(loginUrl.toString());
		}
		if (user.disabled) {
			session?.destroy();
			if (isApiRoute) return apiError("ACCOUNT_DISABLED", "Account disabled", 403);
			const loginUrl = new URL("/_emdash/admin/login", getPublicOrigin(url, emdash?.config));
			loginUrl.searchParams.set("error", "account_disabled");
			return context.redirect(loginUrl.toString());
		}
		locals.user = user;
	} catch (error) {
		console.error("Auth middleware error:", error);
		return context.redirect("/_emdash/admin/login");
	}
	return next();
}
var SCOPE_RULES = [
	[
		"/_emdash/api/content",
		"GET",
		"content:read"
	],
	[
		"/_emdash/api/content",
		"WRITE",
		"content:write"
	],
	[
		"/_emdash/api/media/file",
		"*",
		"media:read"
	],
	[
		"/_emdash/api/media",
		"GET",
		"media:read"
	],
	[
		"/_emdash/api/media",
		"WRITE",
		"media:write"
	],
	[
		"/_emdash/api/schema",
		"GET",
		"schema:read"
	],
	[
		"/_emdash/api/schema",
		"WRITE",
		"schema:write"
	],
	[
		"/_emdash/api/taxonomies",
		"GET",
		"content:read"
	],
	[
		"/_emdash/api/taxonomies",
		"WRITE",
		"taxonomies:manage"
	],
	[
		"/_emdash/api/menus",
		"GET",
		"content:read"
	],
	[
		"/_emdash/api/menus",
		"WRITE",
		"menus:manage"
	],
	[
		"/_emdash/api/sections",
		"GET",
		"content:read"
	],
	[
		"/_emdash/api/sections",
		"WRITE",
		"content:write"
	],
	[
		"/_emdash/api/widget-areas",
		"GET",
		"content:read"
	],
	[
		"/_emdash/api/widget-areas",
		"WRITE",
		"content:write"
	],
	[
		"/_emdash/api/revisions",
		"GET",
		"content:read"
	],
	[
		"/_emdash/api/revisions",
		"WRITE",
		"content:write"
	],
	[
		"/_emdash/api/search",
		"GET",
		"content:read"
	],
	[
		"/_emdash/api/search",
		"WRITE",
		"admin"
	],
	[
		"/_emdash/api/import",
		"*",
		"admin"
	],
	[
		"/_emdash/api/admin",
		"*",
		"admin"
	],
	[
		"/_emdash/api/plugins",
		"*",
		"admin"
	],
	[
		"/_emdash/api/settings",
		"GET",
		"settings:read"
	],
	[
		"/_emdash/api/settings",
		"WRITE",
		"settings:manage"
	]
];
var WRITE_METHODS = /* @__PURE__ */ new Set([
	"POST",
	"PUT",
	"PATCH",
	"DELETE"
]);
function enforceTokenScope(pathname, method, tokenScopes) {
	if (!tokenScopes) return null;
	if (pathname === MCP_ENDPOINT_PATH) return null;
	const isWrite = WRITE_METHODS.has(method);
	for (const [prefix, ruleMethod, scope] of SCOPE_RULES) {
		if (pathname !== prefix && !pathname.startsWith(prefix + "/")) continue;
		if (ruleMethod === "*" || ruleMethod === "WRITE" && isWrite || ruleMethod === method) {
			if (hasScope(tokenScopes, scope)) return null;
			return apiError("INSUFFICIENT_SCOPE", `Token lacks required scope: ${scope}`, 403);
		}
	}
	if (hasScope(tokenScopes, "admin")) return null;
	return apiError("INSUFFICIENT_SCOPE", "Token lacks required scope: admin", 403);
}
//#endregion
//#region node_modules/emdash/dist/astro/middleware/request-context.mjs
/**
* EmDash Toolbar Bootstrap (toolbar: "client")
*
* A tiny script injected into every public HTML response when the client
* toolbar mode is enabled. It is identical for every visitor, so the HTML
* stays fully cacheable by shared caches (Workers Cache, Cache Everything,
* Fastly, Varnish, …).
*
* Behavior: if this browser has logged into the admin (non-secret
* localStorage flag set by the admin SPA), render a small "Edit" pill.
* Clicking it verifies the session server-side and reloads the page with the
* `_edit` query param — that URL is always rendered fresh with the full
* server-side toolbar. Logged-out browsers pay one localStorage read and
* nothing else. See Discussion #1742.
*/
/**
* Non-secret localStorage flag set by the admin SPA when an editor session
* exists in this browser. It only means "a session may exist" — the click
* handler verifies the real session before entering edit mode. The literal
* is duplicated in `@emdash-cms/admin` (Shell/Header), which cannot import
* from core.
*/
var EDITOR_FLAG_KEY = "emdash-editor";
/**
* localStorage flag set when the user dismisses the toolbar in this browser.
* Cleared the next time an editor opens the admin. Also duplicated in
* `@emdash-cms/admin`.
*/
var TOOLBAR_DISMISSED_KEY = "emdash-toolbar-dismissed";
/**
* Query param that requests a fresh (never cached) editor render. Presence is
* verified server-side: non-editors are redirected to the canonical URL.
*/
var EDIT_PARAM = "_edit";
function renderToolbarBootstrap() {
	return `
<!-- EmDash Toolbar Bootstrap -->
<script>
(function() {
  var flag, dismissed;
  try {
    flag = localStorage.getItem("${EDITOR_FLAG_KEY}");
    dismissed = localStorage.getItem("${TOOLBAR_DISMISSED_KEY}");
  } catch (e) {
    return;
  }
  if (!flag || dismissed) return;
  // The server toolbar is present on _edit / edit-mode / preview renders.
  if (document.getElementById("emdash-toolbar")) return;

  var root = document.createElement("div");
  root.id = "emdash-toolbar-bootstrap";
  root.style.cssText = "position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:13px;line-height:1;-webkit-font-smoothing:antialiased;";

  var inner = document.createElement("div");
  inner.style.cssText = "display:flex;align-items:center;gap:10px;padding:8px 16px;background:#1a1a1a;color:#e0e0e0;border-radius:999px;box-shadow:0 4px 24px rgba(0,0,0,0.3),0 0 0 1px rgba(255,255,255,0.08);white-space:nowrap;user-select:none;";

  var logo = document.createElement("span");
  logo.textContent = "EmDash";
  logo.style.cssText = "font-weight:600;font-size:12px;letter-spacing:0.02em;color:#fff;opacity:0.7;";

  var divider = document.createElement("span");
  divider.style.cssText = "width:1px;height:16px;background:rgba(255,255,255,0.15);";

  var editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.style.cssText = "padding:4px 12px;background:#3b82f6;color:#fff;border:none;border-radius:999px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;";

  var closeBtn = document.createElement("button");
  closeBtn.textContent = "\\u00d7";
  closeBtn.title = "Hide toolbar";
  closeBtn.setAttribute("aria-label", "Hide toolbar");
  closeBtn.style.cssText = "background:none;border:none;color:#666;cursor:pointer;font-size:16px;padding:0 2px;line-height:1;font-family:inherit;";

  editBtn.addEventListener("click", function() {
    editBtn.disabled = true;
    fetch("/_emdash/api/auth/me", {
      credentials: "same-origin",
      headers: { "X-EmDash-Request": "1" }
    })
    .then(function(r) { return r.ok ? r.json() : null; })
    .then(function(body) {
      var user = body && body.data;
      if (user && user.role >= 30) {
        var u = new URL(location.href);
        u.searchParams.set("${EDIT_PARAM}", "1");
        location.href = u.toString();
      } else if (user) {
        // Logged in but not an editor — the flag is stale for this browser.
        try { localStorage.removeItem("${EDITOR_FLAG_KEY}"); } catch (e) {}
        root.remove();
      } else {
        // No session — go to the admin login page.
        location.href = "/_emdash/admin/login";
      }
    })
    .catch(function() {
      editBtn.disabled = false;
    });
  });

  closeBtn.addEventListener("click", function() {
    try { localStorage.setItem("${TOOLBAR_DISMISSED_KEY}", "1"); } catch (e) {}
    root.remove();
  });

  inner.appendChild(logo);
  inner.appendChild(divider);
  inner.appendChild(editBtn);
  inner.appendChild(closeBtn);
  root.appendChild(inner);
  document.body.appendChild(root);
})();
<\/script>
`;
}
function renderToolbar(config) {
	const { editMode, isPreview } = config;
	return `
<!-- EmDash Visual Editing Toolbar -->
<div id="emdash-toolbar" data-edit-mode="${editMode}" data-preview="${isPreview}">
  <div class="emdash-tb-inner">
    <span class="emdash-tb-logo">EmDash</span>

    <div class="emdash-tb-divider"></div>

    <label class="emdash-tb-toggle" title="Toggle edit mode">
      <input type="checkbox" id="emdash-edit-toggle" ${editMode ? "checked" : ""} />
      <span class="emdash-tb-toggle-track">
        <span class="emdash-tb-toggle-thumb"></span>
      </span>
      <span class="emdash-tb-toggle-label">Edit</span>
    </label>

    <span class="emdash-tb-status" id="emdash-tb-status"></span>

    <span class="emdash-tb-save-status" id="emdash-tb-save-status"></span>

    <a class="emdash-tb-admin" id="emdash-tb-admin" href="#" target="emdash-admin" style="display:none" title="Open in admin">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
    </a>

    <button class="emdash-tb-publish" id="emdash-tb-publish" style="display:none">Publish</button>

    <button class="emdash-tb-dismiss" id="emdash-tb-dismiss" title="Hide toolbar" aria-label="Hide toolbar">&times;</button>
  </div>
</div>

<style>
  #emdash-toolbar {
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 13px;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
  }

  .emdash-tb-inner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    background: #1a1a1a;
    color: #e0e0e0;
    border-radius: 999px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08);
    white-space: nowrap;
    user-select: none;
  }

  .emdash-tb-logo {
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 0.02em;
    color: #fff;
    opacity: 0.7;
  }

  .emdash-tb-divider {
    width: 1px;
    height: 16px;
    background: rgba(255,255,255,0.15);
  }

  /* Toggle switch */
  .emdash-tb-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .emdash-tb-toggle input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .emdash-tb-toggle-track {
    position: relative;
    width: 32px;
    height: 18px;
    background: #444;
    border-radius: 9px;
    transition: background 0.2s;
  }

  .emdash-tb-toggle input:checked + .emdash-tb-toggle-track {
    background: #3b82f6;
  }

  .emdash-tb-toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 14px;
    height: 14px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.2s;
  }

  .emdash-tb-toggle input:checked + .emdash-tb-toggle-track .emdash-tb-toggle-thumb {
    transform: translateX(14px);
  }

  .emdash-tb-toggle-label {
    font-size: 12px;
    color: #aaa;
  }

  .emdash-tb-toggle input:checked ~ .emdash-tb-toggle-label {
    color: #fff;
  }

  /* Status area — flex for multiple badges */
  .emdash-tb-status {
    display: inline-flex;
    gap: 6px;
    align-items: center;
  }

  /* Badges */
  .emdash-tb-badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .emdash-tb-badge--preview {
    background: rgba(139,92,246,0.2);
    color: #a78bfa;
  }

  .emdash-tb-badge--draft {
    background: rgba(245,158,11,0.2);
    color: #fbbf24;
  }

  .emdash-tb-badge--published {
    background: rgba(34,197,94,0.2);
    color: #4ade80;
  }

  .emdash-tb-badge--pending {
    background: rgba(59,130,246,0.2);
    color: #60a5fa;
  }

  .emdash-tb-badge--unsaved {
    background: rgba(245,158,11,0.2);
    color: #fbbf24;
  }

  .emdash-tb-badge--saving {
    background: rgba(148,163,184,0.2);
    color: #94a3b8;
  }

  .emdash-tb-badge--saved {
    background: rgba(34,197,94,0.2);
    color: #4ade80;
    transition: opacity 0.3s;
  }

  .emdash-tb-badge--error {
    background: rgba(239,68,68,0.2);
    color: #f87171;
  }

  /* Admin link */
  .emdash-tb-admin {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #888;
    text-decoration: none;
    padding: 2px;
    border-radius: 4px;
    transition: color 0.15s;
  }

  .emdash-tb-admin:hover {
    color: #fff;
  }

  /* Publish button */
  .emdash-tb-publish {
    padding: 4px 12px;
    background: #3b82f6;
    color: #fff;
    border: none;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
    font-family: inherit;
  }

  .emdash-tb-publish:hover {
    background: #2563eb;
  }

  .emdash-tb-publish:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Dismiss button */
  .emdash-tb-dismiss {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 0 2px;
    font-family: inherit;
    transition: color 0.15s;
  }

  .emdash-tb-dismiss:hover {
    color: #fff;
  }

  /* Edit mode: editable hover styles — uses :has() to check toolbar state */
  body:has(#emdash-toolbar[data-edit-mode="true"]) [data-emdash-ref] {
    transition: box-shadow 0.15s, background-color 0.15s;
  }

  body:has(#emdash-toolbar[data-edit-mode="true"]) [data-emdash-ref]:hover {
    box-shadow: 0 0 0 2px rgba(59,130,246,0.5);
    border-radius: 4px;
    background-color: rgba(59,130,246,0.04);
    cursor: text;
  }

  /* Active editing state — override hover pencil cursor */
  [data-emdash-editing] {
    box-shadow: 0 0 0 2px #3b82f6 !important;
    border-radius: 4px !important;
    background-color: rgba(59,130,246,0.04) !important;
    cursor: text !important;
  }

  /* Suppress browser focus ring on contenteditable and tiptap editor */
  [data-emdash-editing]:focus,
  [data-emdash-ref] .tiptap:focus,
  [data-emdash-ref] .ProseMirror:focus {
    outline: none !important;
  }

  /* Image editor popover */
  .emdash-img-popover {
    position: fixed;
    z-index: 1000000;
    background: #1a1a1a;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08);
    color: #e0e0e0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 13px;
    width: 320px;
    overflow: hidden;
    animation: emdash-img-fadein 0.15s ease-out;
  }

  @keyframes emdash-img-fadein {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .emdash-img-popover-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .emdash-img-popover-title {
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #999;
  }

  .emdash-img-popover-close {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 2px;
    line-height: 1;
    font-size: 16px;
    border-radius: 4px;
    transition: color 0.15s;
  }

  .emdash-img-popover-close:hover {
    color: #fff;
  }

  .emdash-img-popover-body {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .emdash-img-preview {
    width: 100%;
    max-height: 160px;
    object-fit: contain;
    border-radius: 6px;
    background: #111;
  }

  .emdash-img-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    border: 2px dashed rgba(255,255,255,0.15);
    border-radius: 6px;
    color: #666;
    font-size: 12px;
  }

  .emdash-img-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .emdash-img-field label {
    font-size: 11px;
    font-weight: 600;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .emdash-img-field input[type="text"] {
    background: #111;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 6px;
    color: #e0e0e0;
    padding: 6px 8px;
    font-size: 13px;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s;
  }

  .emdash-img-field input[type="text"]:focus {
    border-color: #3b82f6;
  }

  .emdash-img-actions {
    display: flex;
    gap: 6px;
  }

  .emdash-img-btn {
    flex: 1;
    padding: 6px 10px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 6px;
    background: #222;
    color: #e0e0e0;
    font-size: 12px;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    text-align: center;
    white-space: nowrap;
  }

  .emdash-img-btn:hover {
    background: #333;
    border-color: rgba(255,255,255,0.2);
  }

  .emdash-img-btn--primary {
    background: #3b82f6;
    border-color: #3b82f6;
    color: #fff;
  }

  .emdash-img-btn--primary:hover {
    background: #2563eb;
    border-color: #2563eb;
  }

  .emdash-img-btn--danger {
    color: #f87171;
    border-color: rgba(248,113,113,0.3);
  }

  .emdash-img-btn--danger:hover {
    background: rgba(248,113,113,0.1);
    border-color: rgba(248,113,113,0.5);
  }

  /* Media browser within the popover */
  .emdash-img-browser {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 12px;
  }

  .emdash-img-browser-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .emdash-img-browser-title {
    font-size: 12px;
    font-weight: 600;
    color: #999;
  }

  .emdash-img-browser-back {
    background: none;
    border: none;
    color: #3b82f6;
    cursor: pointer;
    font-size: 12px;
    font-family: inherit;
    padding: 2px 4px;
  }

  .emdash-img-browser-back:hover {
    text-decoration: underline;
  }

  .emdash-img-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    max-height: 240px;
    overflow-y: auto;
  }

  .emdash-img-grid-item {
    aspect-ratio: 1;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border-color 0.15s;
    background: #111;
  }

  .emdash-img-grid-item:hover {
    border-color: rgba(59,130,246,0.5);
  }

  .emdash-img-grid-item--selected {
    border-color: #3b82f6;
  }

  .emdash-img-grid-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .emdash-img-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    color: #666;
    font-size: 12px;
  }

  .emdash-img-drop {
    border: 2px dashed #3b82f6;
    background: rgba(59,130,246,0.05);
  }

  .emdash-img-uploading {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    color: #999;
    font-size: 12px;
  }

  .emdash-img-popover-backdrop {
    position: fixed;
    inset: 0;
    z-index: 999999;
  }
</style>

<script>
(function() {
  var toolbar = document.getElementById("emdash-toolbar");
  var toggle = document.getElementById("emdash-edit-toggle");
  var statusEl = document.getElementById("emdash-tb-status");
  var saveStatusEl = document.getElementById("emdash-tb-save-status");
  var publishBtn = document.getElementById("emdash-tb-publish");
  if (!toolbar || !toggle || !statusEl || !publishBtn || !saveStatusEl) return;

  // Dismissed in this browser (localStorage flag, cleared on the next admin
  // visit). Remove the toolbar entirely instead of rendering it.
  try {
    if (localStorage.getItem("emdash-toolbar-dismissed")) {
      toolbar.remove();
      return;
    }
  } catch (e) {
    // localStorage unavailable — render normally
  }

  var isEditMode = toolbar.getAttribute("data-edit-mode") === "true";

  var dismissBtn = document.getElementById("emdash-tb-dismiss");
  if (dismissBtn) {
    dismissBtn.addEventListener("click", function() {
      try { localStorage.setItem("emdash-toolbar-dismissed", "1"); } catch (e) {}
      // Dismissing while edit mode is on would strand the user in edit mode
      // with no UI to leave it — clear the cookie too.
      if (isEditMode) {
        document.cookie = "emdash-edit-mode=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        toolbar.remove();
        location.replace(location.href);
        return;
      }
      toolbar.remove();
    });
  }

  // CSRF-protected fetch — adds X-EmDash-Request header to all API calls
  function ecFetch(url, init) {
    init = init || {};
    init.headers = Object.assign({ "X-EmDash-Request": "1" }, init.headers || {});
    return fetch(url, init);
  }

  // --- Save status tracking ---
  var saveState = "idle"; // idle | unsaved | saving | saved | error
  var saveHideTimer = null;
  var pendingSavePromise = null;

  function setSaveState(state) {
    saveState = state;
    clearTimeout(saveHideTimer);

    switch (state) {
      case "unsaved":
        saveStatusEl.innerHTML = '<span class="emdash-tb-badge emdash-tb-badge--unsaved">Unsaved</span>';
        break;
      case "saving":
        saveStatusEl.innerHTML = '<span class="emdash-tb-badge emdash-tb-badge--saving">Saving\u2026</span>';
        break;
      case "saved":
        saveStatusEl.innerHTML = '<span class="emdash-tb-badge emdash-tb-badge--saved">Saved</span>';
        saveHideTimer = setTimeout(function() {
          saveStatusEl.innerHTML = "";
          saveState = "idle";
        }, 2000);
        break;
      case "error":
        saveStatusEl.innerHTML = '<span class="emdash-tb-badge emdash-tb-badge--error">Save failed</span>';
        saveHideTimer = setTimeout(function() {
          saveStatusEl.innerHTML = "";
          saveState = "idle";
        }, 3000);
        break;
      default:
        saveStatusEl.innerHTML = "";
    }
  }

  // Listen for save events from inline editors (e.g. PT editor)
  document.addEventListener("emdash:save", function(e) {
    var detail = e.detail || {};
    if (detail.state) {
      setSaveState(detail.state);
    }
  });

  document.addEventListener("emdash:content-changed", function(e) {
    var detail = e.detail || {};
    if (detail.collection && detail.id) {
      showUnpublishedChanges(detail.collection, detail.id);
    }
  });

  // --- Entry status ---
  var entryRef = null;

  function updateStatus() {
    if (!isEditMode) {
      statusEl.innerHTML = "";
      publishBtn.style.display = "none";
      return;
    }

    var first = document.querySelector("[data-emdash-ref]");
    if (!first) {
      statusEl.innerHTML = "";
      publishBtn.style.display = "none";
      return;
    }

    try {
      var ref = JSON.parse(first.getAttribute("data-emdash-ref"));
      entryRef = ref;
      if (!ref.status) return;

      // Show admin link
      var adminLink = document.getElementById("emdash-tb-admin");
      if (adminLink) {
        adminLink.href = "/_emdash/admin/content/" + encodeURIComponent(ref.collection) + "/" + encodeURIComponent(ref.id);
        adminLink.style.display = "";
      }

      if (ref.status === "draft") {
        statusEl.innerHTML = '<span class="emdash-tb-badge emdash-tb-badge--draft">Draft</span>';
        publishBtn.style.display = "";
        publishBtn.onclick = function() { publish(ref.collection, ref.id); };
      } else if (ref.status === "published" && ref.hasDraft) {
        statusEl.innerHTML = '<span class="emdash-tb-badge emdash-tb-badge--pending">Unpublished changes</span>';
        publishBtn.style.display = "";
        publishBtn.onclick = function() { publish(ref.collection, ref.id); };
      } else if (ref.status === "published") {
        statusEl.innerHTML = '<span class="emdash-tb-badge emdash-tb-badge--published">Published</span>';
        publishBtn.style.display = "none";
      }
    } catch (e) {
      // ignore parse errors
    }
  }

  // Publish action
  function publish(collection, id) {
    if (pendingSavePromise) {
      pendingSavePromise.then(function() { publish(collection, id); });
      return;
    }

    publishBtn.disabled = true;
    publishBtn.textContent = "Publishing\u2026";

    ecFetch("/_emdash/api/content/" + encodeURIComponent(collection) + "/" + encodeURIComponent(id) + "/publish", {
      method: "POST",
      credentials: "same-origin",
    })
    .then(function(res) {
      if (res.ok) {
        if (document.startViewTransition) {
          document.startViewTransition(function() { location.reload(); });
        } else {
          location.reload();
        }
      } else {
        publishBtn.disabled = false;
        publishBtn.textContent = "Publish";
        console.error("Publish failed:", res.status);
      }
    })
    .catch(function(err) {
      publishBtn.disabled = false;
      publishBtn.textContent = "Publish";
      console.error("Publish failed:", err);
    });
  }

  // Edit mode toggle
  toggle.addEventListener("change", function() {
    if (toggle.checked) {
      document.cookie = "emdash-edit-mode=true;path=/;samesite=lax";
    } else {
      document.cookie = "emdash-edit-mode=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    if (document.startViewTransition) {
      document.startViewTransition(function() { location.replace(location.href); });
    } else {
      location.replace(location.href);
    }
  });

  // --- Inline editing ---

  // Cached manifest (fetched once on first edit click)
  var manifestCache = null;
  var manifestPromise = null;

  function fetchManifest() {
    if (manifestCache) return Promise.resolve(manifestCache);
    if (manifestPromise) return manifestPromise;
    manifestPromise = ecFetch("/_emdash/api/manifest", { credentials: "same-origin" })
      .then(function(r) { return r.json(); })
      .then(function(m) {
        // The manifest endpoint wraps the payload in a { success, data } envelope (ApiResponse shape).
        // Unwrap it so getFieldKind can read manifest.collections directly.
        manifestCache = m && m.data ? m.data : m;
        return manifestCache;
      });
    return manifestPromise;
  }

  function getFieldKind(manifest, collection, field) {
    var col = manifest.collections && manifest.collections[collection];
    if (!col || !col.fields) return null;
    var f = col.fields[field];
    return f ? f.kind : null;
  }

  // Load manifest early so the first click can resolve field kinds without racing the event.
  if (isEditMode) {
    fetchManifest();
  }

  // Save a single field value
  function saveField(collection, id, field, value) {
    setSaveState("saving");
    return ecFetch("/_emdash/api/content/" + encodeURIComponent(collection) + "/" + encodeURIComponent(id), {
      method: "PUT",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { [field]: value } }),
    })
    .then(function(res) {
      if (res.ok) {
        setSaveState("saved");
        // A save creates/updates a draft — show unpublished changes
        showUnpublishedChanges(collection, id);
      } else {
        setSaveState("error");
        console.error("Save failed:", res.status);
      }
    })
    .catch(function(err) {
      setSaveState("error");
      console.error("Save failed:", err);
    });
  }

  function showUnpublishedChanges(collection, id) {
    statusEl.innerHTML = '<span class="emdash-tb-badge emdash-tb-badge--pending">Unpublished changes</span>';
    publishBtn.style.display = "";
    publishBtn.disabled = false;
    publishBtn.textContent = "Publish";
    publishBtn.onclick = function() { publish(collection, id); };
  }

  // Plain text inline editing (contenteditable)
  var currentlyEditing = null;

  function startTextEdit(element, annotation) {
    if (currentlyEditing === element) return;
    if (currentlyEditing) endCurrentEdit();

    currentlyEditing = element;
    var originalText = element.textContent || "";

    element.setAttribute("data-emdash-editing", "");
    element.contentEditable = "plaintext-only";
    element.focus();

    // Select all text
    var range = document.createRange();
    range.selectNodeContents(element);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    // Track dirty state via input events
    function handleInput() {
      var current = (element.textContent || "").trim();
      if (current !== originalText.trim()) {
        setSaveState("unsaved");
      } else {
        setSaveState("idle");
      }
    }

    function handleBlur() {
      element.removeEventListener("blur", handleBlur);
      element.removeEventListener("keydown", handleKeydown);
      element.removeEventListener("input", handleInput);
      element.contentEditable = "false";
      element.removeAttribute("data-emdash-editing");
      currentlyEditing = null;

      var newValue = (element.textContent || "").trim();
      if (newValue !== originalText.trim()) {
        pendingSavePromise = saveField(annotation.collection, annotation.id, annotation.field, newValue).then(function() {
          pendingSavePromise = null;
        }, function() {
          pendingSavePromise = null;
        });
      } else {
        setSaveState("idle");
      }
    }

    function handleKeydown(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        element.blur();
      }
      if (e.key === "Escape") {
        element.textContent = originalText;
        setSaveState("idle");
        element.blur();
      }
    }

    element.addEventListener("input", handleInput);
    element.addEventListener("blur", handleBlur);
    element.addEventListener("keydown", handleKeydown);
  }

  function endCurrentEdit() {
    if (currentlyEditing) {
      currentlyEditing.blur();
    }
  }

  // Fallback: open admin
  function openAdmin(annotation) {
    var url = "/_emdash/admin/content/" + encodeURIComponent(annotation.collection) + "/" + encodeURIComponent(annotation.id);
    if (annotation.field) {
      url += "?field=" + encodeURIComponent(annotation.field);
    }
    window.open(url, "emdash-admin");
  }

  // --- Inline image editing ---
  var activeImagePopover = null;

  function closeImagePopover() {
    if (activeImagePopover) {
      activeImagePopover.backdrop.remove();
      activeImagePopover.popover.remove();
      if (activeImagePopover.escapeHandler) {
        document.removeEventListener("keydown", activeImagePopover.escapeHandler);
      }
      activeImagePopover = null;
    }
  }

  function startImageEdit(element, annotation) {
    closeImagePopover();

    // Find the current image value by fetching the entry
    var collection = annotation.collection;
    var id = annotation.id;
    var field = annotation.field;

    // Find img element inside the annotated container (or the element itself if it's an img)
    var imgEl = element.tagName === "IMG" ? element : element.querySelector("img");

    // Fetch current field value from the content API
    ecFetch("/_emdash/api/content/" + encodeURIComponent(collection) + "/" + encodeURIComponent(id), {
      credentials: "same-origin"
    })
    .then(function(r) { return r.json(); })
    .then(function(entry) {
      var currentValue = entry.data && entry.data[field];
      showImagePopover(element, imgEl, annotation, currentValue);
    })
    .catch(function() {
      // If fetch fails, still show popover with what we can infer from DOM
      showImagePopover(element, imgEl, annotation, null);
    });
  }

  function showImagePopover(element, imgEl, annotation, currentValue) {
    closeImagePopover();

    var collection = annotation.collection;
    var id = annotation.id;
    var field = annotation.field;

    // Position near the element
    var rect = element.getBoundingClientRect();
    var viewportH = window.innerHeight;
    var viewportW = window.innerWidth;

    // Create backdrop for click-outside-to-close
    var backdrop = document.createElement("div");
    backdrop.className = "emdash-img-popover-backdrop";
    backdrop.addEventListener("click", function(e) {
      if (e.target === backdrop) closeImagePopover();
    });

    // Create popover
    var popover = document.createElement("div");
    popover.className = "emdash-img-popover";

    var currentSrc = currentValue ? (currentValue.previewUrl || currentValue.src) : (imgEl ? imgEl.src : null);
    var currentAlt = currentValue ? (currentValue.alt || "") : (imgEl ? (imgEl.alt || "") : "");

    // Build popover HTML
    var html = '';
    html += '<div class="emdash-img-popover-header">';
    html += '  <span class="emdash-img-popover-title">Image</span>';
    html += '  <button class="emdash-img-popover-close" data-action="close">&times;</button>';
    html += '</div>';
    html += '<div class="emdash-img-popover-body" id="emdash-img-main">';

    if (currentSrc) {
      html += '<img class="emdash-img-preview" src="' + escapeAttr(currentSrc) + '" alt="" />';
    } else {
      html += '<div class="emdash-img-empty">No image selected</div>';
    }

    html += '<div class="emdash-img-field">';
    html += '  <label for="emdash-img-alt">Alt text</label>';
    html += '  <input type="text" id="emdash-img-alt" value="' + escapeAttr(currentAlt) + '" placeholder="Describe the image" />';
    html += '</div>';

    html += '<div class="emdash-img-actions">';
    html += '  <button class="emdash-img-btn emdash-img-btn--primary" data-action="browse">Replace</button>';
    html += '  <label class="emdash-img-btn" style="cursor:pointer">';
    html += '    Upload';
    html += '    <input type="file" accept="image/*" id="emdash-img-upload" style="display:none" />';
    html += '  </label>';
    if (currentSrc) {
      html += '  <button class="emdash-img-btn emdash-img-btn--danger" data-action="remove">Remove</button>';
    }
    html += '</div>';
    html += '</div>';

    popover.innerHTML = html;

    backdrop.appendChild(popover);
    document.body.appendChild(backdrop);

    // Position the popover
    positionPopover(popover, rect, viewportW, viewportH);

    // Escape key handler
    function handleEscape(e) {
      if (e.key === "Escape") {
        closeImagePopover();
        document.removeEventListener("keydown", handleEscape);
      }
    }
    document.addEventListener("keydown", handleEscape);

    activeImagePopover = {
      backdrop: backdrop,
      popover: popover,
      annotation: annotation,
      currentValue: currentValue,
      element: element,
      imgEl: imgEl,
      escapeHandler: handleEscape
    };

    // Event handlers
    popover.querySelector('[data-action="close"]').addEventListener("click", closeImagePopover);

    popover.querySelector('[data-action="browse"]').addEventListener("click", function() {
      showMediaBrowser(popover, annotation, currentValue, element, imgEl);
    });

    var uploadInput = popover.querySelector("#emdash-img-upload");
    uploadInput.addEventListener("change", function(e) {
      var file = e.target.files && e.target.files[0];
      if (file) handleImageUpload(file, popover, annotation, element, imgEl);
    });

    var removeBtn = popover.querySelector('[data-action="remove"]');
    if (removeBtn) {
      removeBtn.addEventListener("click", function() {
        saveField(collection, id, field, null).then(function() {
          if (imgEl) {
            imgEl.style.display = "none";
          }
          closeImagePopover();
        });
      });
    }

    // Save alt text on change (debounced)
    var altInput = popover.querySelector("#emdash-img-alt");
    var altTimer = null;
    altInput.addEventListener("input", function() {
      clearTimeout(altTimer);
      altTimer = setTimeout(function() {
        var newAlt = altInput.value;
        if (currentValue) {
          var updated = Object.assign({}, currentValue, { alt: newAlt });
          saveField(collection, id, field, updated);
          if (imgEl) imgEl.alt = newAlt;
        }
      }, 500);
    });

    // Handle drag and drop on the popover body
    var body = popover.querySelector(".emdash-img-popover-body");
    body.addEventListener("dragover", function(e) {
      e.preventDefault();
      body.classList.add("emdash-img-drop");
    });
    body.addEventListener("dragleave", function() {
      body.classList.remove("emdash-img-drop");
    });
    body.addEventListener("drop", function(e) {
      e.preventDefault();
      body.classList.remove("emdash-img-drop");
      var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleImageUpload(file, popover, annotation, element, imgEl);
      }
    });
  }

  function positionPopover(popover, targetRect, viewportW, viewportH) {
    var popoverW = 320;
    var gap = 8;

    // Try to place to the right of the element
    var left = targetRect.right + gap;
    var top = targetRect.top;

    // If it overflows right, place to the left
    if (left + popoverW > viewportW - 16) {
      left = targetRect.left - popoverW - gap;
    }
    // If it still overflows (narrow viewport), center below
    if (left < 16) {
      left = Math.max(16, (viewportW - popoverW) / 2);
      top = targetRect.bottom + gap;
    }
    // Clamp vertically
    if (top + 400 > viewportH - 80) { // 80 for toolbar
      top = Math.max(16, viewportH - 480);
    }
    if (top < 16) top = 16;

    popover.style.left = left + "px";
    popover.style.top = top + "px";
  }

  function escapeAttr(str) {
    return String(str || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function showMediaBrowser(popover, annotation, currentValue, element, imgEl) {
    var mainBody = popover.querySelector("#emdash-img-main");
    if (mainBody) mainBody.style.display = "none";

    // Remove existing browser if any
    var existing = popover.querySelector(".emdash-img-browser");
    if (existing) existing.remove();

    var browser = document.createElement("div");
    browser.className = "emdash-img-browser";

    browser.innerHTML = '<div class="emdash-img-browser-header">' +
      '<span class="emdash-img-browser-title">Media Library</span>' +
      '<button class="emdash-img-browser-back">Back</button>' +
      '</div>' +
      '<div class="emdash-img-loading">Loading\u2026</div>';

    popover.appendChild(browser);

    browser.querySelector(".emdash-img-browser-back").addEventListener("click", function() {
      browser.remove();
      if (mainBody) mainBody.style.display = "";
    });

    // Fetch media
    ecFetch("/_emdash/api/media?mimeType=image/&limit=30", { credentials: "same-origin" })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var items = data.items || [];
      var loadingEl = browser.querySelector(".emdash-img-loading");
      if (loadingEl) loadingEl.remove();

      if (items.length === 0) {
        var empty = document.createElement("div");
        empty.className = "emdash-img-loading";
        empty.textContent = "No images found";
        browser.appendChild(empty);
        return;
      }

      var grid = document.createElement("div");
      grid.className = "emdash-img-grid";

      items.forEach(function(item) {
        var thumb = document.createElement("div");
        thumb.className = "emdash-img-grid-item";
        if (currentValue && currentValue.id === item.id) {
          thumb.classList.add("emdash-img-grid-item--selected");
        }
        var thumbUrl = item.url || item.previewUrl || ("/_emdash/api/media/file/" + item.storageKey);
        thumb.innerHTML = '<img src="' + escapeAttr(thumbUrl) + '" alt="' + escapeAttr(item.alt || item.filename || "") + '" loading="lazy" />';

        thumb.addEventListener("click", function() {
          selectMediaItem(item, annotation, element, imgEl);
        });

        grid.appendChild(thumb);
      });

      browser.appendChild(grid);
    })
    .catch(function(err) {
      var loadingEl = browser.querySelector(".emdash-img-loading");
      if (loadingEl) loadingEl.textContent = "Failed to load media";
      console.error("Media fetch error:", err);
    });
  }

  function selectMediaItem(item, annotation, element, imgEl) {
    var collection = annotation.collection;
    var id = annotation.id;
    var field = annotation.field;

    var isLocal = !item.provider || item.provider === "local";
    var itemUrl = item.url || item.previewUrl || ("/_emdash/api/media/file/" + item.storageKey);

    var newValue = {
      id: item.id,
      provider: item.provider || "local",
      src: isLocal ? itemUrl : undefined,
      previewUrl: isLocal ? undefined : itemUrl,
      alt: item.alt || "",
      width: item.width,
      height: item.height,
      meta: item.meta
    };

    // Clean undefined fields
    Object.keys(newValue).forEach(function(k) {
      if (newValue[k] === undefined) delete newValue[k];
    });

    saveField(collection, id, field, newValue).then(function() {
      // Update the image in the DOM
      if (imgEl) {
        imgEl.src = itemUrl;
        imgEl.alt = item.alt || "";
        imgEl.style.display = "";
      }
      closeImagePopover();
    });
  }

  function handleImageUpload(file, popover, annotation, element, imgEl) {
    var collection = annotation.collection;
    var id = annotation.id;
    var field = annotation.field;

    // Show uploading state
    var mainBody = popover.querySelector("#emdash-img-main");
    var browserEl = popover.querySelector(".emdash-img-browser");
    if (browserEl) browserEl.remove();
    if (mainBody) {
      mainBody.innerHTML = '<div class="emdash-img-uploading">' +
        '<span>Uploading ' + escapeAttr(file.name) + '\u2026</span>' +
        '</div>';
      mainBody.style.display = "";
    }

    // Detect dimensions before upload
    var dimPromise = new Promise(function(resolve) {
      if (!file.type.startsWith("image/")) return resolve({});
      var img = new Image();
      img.onload = function() {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = function() {
        resolve({});
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(file);
    });

    dimPromise.then(function(dims) {
      // Generate a thumbnail for large images to avoid OOM in server-side
      // blurhash generation on memory-constrained runtimes (Workers).
      // Thumbnail fits within a 64x64 box (scale by max dimension) so that
      // extreme aspect ratios don't explode into a huge canvas client-side.
      var thumbPromise;
      if (dims.width && dims.height && dims.width * dims.height * 4 > 32 * 1024 * 1024) {
        thumbPromise = new Promise(function(resolve) {
          try {
            var maxDim = Math.max(dims.width, dims.height);
            var scale = Math.min(1, 64 / maxDim);
            var thumbW = Math.max(1, Math.round(dims.width * scale));
            var thumbH = Math.max(1, Math.round(dims.height * scale));
            var canvas = document.createElement("canvas");
            canvas.width = thumbW;
            canvas.height = thumbH;
            var ctx = canvas.getContext("2d");
            if (ctx) {
              var img = new Image();
              img.onload = function() {
                try {
                  ctx.drawImage(img, 0, 0, thumbW, thumbH);
                  canvas.toBlob(function(blob) {
                    URL.revokeObjectURL(img.src);
                    resolve(blob);
                  }, "image/png");
                } catch (e) {
                  URL.revokeObjectURL(img.src);
                  resolve(null);
                }
              };
              img.onerror = function() {
                URL.revokeObjectURL(img.src);
                resolve(null);
              };
              img.src = URL.createObjectURL(file);
            } else {
              resolve(null);
            }
          } catch (e) {
            resolve(null);
          }
        });
      } else {
        thumbPromise = Promise.resolve(null);
      }

      return thumbPromise.then(function(thumbnail) {
        var formData = new FormData();
        formData.append("file", file);
        if (dims.width) formData.append("width", String(dims.width));
        if (dims.height) formData.append("height", String(dims.height));
        if (thumbnail) formData.append("thumbnail", thumbnail, "thumb.png");

        return ecFetch("/_emdash/api/media", {
          method: "POST",
          credentials: "same-origin",
          body: formData
        });
      });
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (!data.item) throw new Error("Upload failed");
      var item = data.item;
      selectMediaItem(item, annotation, element, imgEl);
    })
    .catch(function(err) {
      console.error("Upload error:", err);
      setSaveState("error");
      closeImagePopover();
    });
  }

  // Click handler for edit mode
  if (isEditMode) {
    document.addEventListener("click", function(e) {
      var target = e.target;

      // Don't intercept clicks on elements currently being edited
      if (target.hasAttribute && target.hasAttribute("data-emdash-editing")) return;

      // Walk up to find annotated element
      while (target && target !== document.body) {
        if (target.hasAttribute && target.hasAttribute("data-emdash-editing")) return;

        var ref = target.getAttribute && target.getAttribute("data-emdash-ref");
        if (ref) {
          try {
            var annotation = JSON.parse(ref);

            // Entry-level annotation (no field) — keep walking for a field-level ancestor
            if (!annotation.field) {
              target = target.parentElement;
              continue;
            }

            function dispatchInline(kind) {
              closeImagePopover();
              // Portable Text is edited in-page by InlinePortableTextEditor — do not open admin
              if (kind === "portableText") {
                return;
              }
              e.preventDefault();
              e.stopPropagation();
              if (kind === "string" || kind === "text") {
                startTextEdit(target, annotation);
              } else if (kind === "image") {
                startImageEdit(target, annotation);
              } else {
                openAdmin(annotation);
              }
            }

            if (manifestCache) {
              dispatchInline(getFieldKind(manifestCache, annotation.collection, annotation.field));
            } else {
              fetchManifest().then(function(manifest) {
                dispatchInline(getFieldKind(manifest, annotation.collection, annotation.field));
              });
            }
          } catch (err) {
            console.error("Failed to parse emdash ref:", err);
          }
          return;
        }
        target = target.parentElement;
      }
    }, true);
  }

  updateStatus();
})();
<\/script>
`;
}
var toolbarMode = config_default?.toolbar ?? "server";
/**
* Opt the current request out of Astro's route cache (e.g. Workers Cache on
* Cloudflare). `Cache-Control` headers do NOT cover this: the adapter derives
* the shared-cache TTL from the route-cache options (on Cloudflare via
* `Cloudflare-CDN-Cache-Control`), so session-specific responses must
* explicitly disable it or they get stored in the shared cache and served to
* anonymous visitors without ever invoking the middleware again. With no cache
* provider configured this is a no-op (`NoopAstroCache`/`DisabledAstroCache`).
*/
function optOutOfRouteCache(cache) {
	cache.set(false);
}
/**
* Inject HTML before `</body>` if the response is an HTML page with a body
* end tag. Does not touch cache headers — callers decide whether the result
* is still shareable. `injected` tells the caller whether anything changed.
*/
async function injectBeforeBodyEnd(response, htmlToInject) {
	if (!response.headers.get("content-type")?.includes("text/html")) return {
		response,
		injected: false
	};
	const html = await response.text();
	if (!html.includes("</body>")) return {
		response: new Response(html, response),
		injected: false
	};
	const injected = html.replace("</body>", `${htmlToInject}</body>`);
	return {
		response: new Response(injected, {
			status: response.status,
			headers: response.headers
		}),
		injected: true
	};
}
/**
* Inject toolbar HTML into a response if it's an HTML page.
* Returns the original response if not HTML.
*/
async function injectToolbar(response, toolbarHtml, routeCache) {
	const result = await injectBeforeBodyEnd(response, toolbarHtml);
	if (result.injected) {
		result.response.headers.set("Cache-Control", "private, no-store");
		optOutOfRouteCache(routeCache);
	}
	return result.response;
}
/**
* Inject the client-toolbar bootstrap script. Identical for every visitor, so
* cache headers and route-cache options are left untouched and the response
* stays fully shareable.
*/
async function injectBootstrap(response) {
	return (await injectBeforeBodyEnd(response, renderToolbarBootstrap())).response;
}
/**
* Redirect an `_edit` URL to its canonical form (same URL without the param).
* Applied when the requester is not an authenticated editor, so a shared
* `?_edit` link degrades gracefully for everyone else (Discussion #1742).
*/
function redirectToCanonical(url) {
	const canonical = new URL(url);
	canonical.searchParams.delete(EDIT_PARAM);
	return new Response(null, {
		status: 302,
		headers: {
			Location: canonical.pathname + canonical.search + canonical.hash,
			"Cache-Control": "private, no-store"
		}
	});
}
var onRequest$1 = defineMiddleware(async (context, next) => {
	const { cookies, url } = context;
	if (url.pathname.startsWith("/_emdash")) return next();
	const { user } = context.locals;
	const isEditor = !!user && user.role >= 30;
	const playgroundDb = context.locals.__playgroundDb;
	if (playgroundDb) return runWithContext({
		editMode: cookies.get("emdash-edit-mode")?.value === "true",
		db: playgroundDb,
		dbIsIsolated: true
	}, () => next());
	const hasEditCookie = cookies.get("emdash-edit-mode")?.value === "true";
	const hasPreviewToken = url.searchParams.has("_preview");
	const hasEditParam = toolbarMode === "client" && url.searchParams.has(EDIT_PARAM);
	if (hasEditParam) {
		optOutOfRouteCache(context.cache);
		if (!isEditor) return redirectToCanonical(url);
	}
	if (!hasEditCookie && !hasPreviewToken && !isEditor) {
		if (toolbarMode === "client") return injectBootstrap(await next());
		return next();
	}
	const editMode = hasEditCookie && isEditor;
	const locale = context.currentLocale;
	const routeCache = context.cache;
	let preview;
	if (hasPreviewToken) {
		const db = context.locals.emdash?.db;
		if (db) {
			const { previewSecret } = await resolveSecretsCached(db);
			const result = await verifyPreviewToken({
				url,
				secret: previewSecret
			});
			if (result.valid) {
				const { collection, id } = parseContentId(result.payload.cid);
				preview = {
					collection,
					id
				};
			}
		} else console.warn("[emdash] Preview token present but EmDash runtime not initialized; preview disabled.");
	}
	if (hasEditCookie || hasPreviewToken) return runWithContext({
		...getRequestContext(),
		editMode,
		preview,
		locale
	}, async () => {
		let response = await next();
		if (hasPreviewToken) optOutOfRouteCache(routeCache);
		if (preview) {
			response = new Response(response.body, response);
			response.headers.set("Cache-Control", "private, no-store");
		}
		if (isEditor && toolbarMode !== false) {
			const toolbarHtml = renderToolbar({
				editMode,
				isPreview: !!preview
			});
			return injectToolbar(response, toolbarHtml, routeCache);
		}
		if (toolbarMode === "client" && !isEditor && !preview) return injectBootstrap(response);
		return response;
	});
	if (isEditor) {
		if (toolbarMode === false) return next();
		if (toolbarMode === "client" && !hasEditParam) return injectBootstrap(await next());
		return injectToolbar(await next(), renderToolbar({
			editMode: false,
			isPreview: false
		}), routeCache);
	}
	return next();
});
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(onRequest$5, onRequest$4, onRequest$3, onRequest$2, onRequest$1);
//#endregion
export { onRequest };
