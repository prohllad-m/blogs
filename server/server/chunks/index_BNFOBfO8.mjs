import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { T as allowedDomainCreateBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { n as roleFromLevel, t as Role } from "./types-ndj-bYfi_C5ykUs-G.mjs";
import "./dist_Cewgrg50.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { t as createKyselyAdapter } from "./kysely_6BTjyg_S.mjs";
import "./schemas_9zeCee0X.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/index.mjs
var allowed_domains_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var DOMAIN_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9-]*(\.[a-zA-Z0-9-]+)+$/;
/**
* GET - List all allowed domains
*/
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "Database not configured", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const adapter = createKyselyAdapter(emdash.db);
	try {
		return apiSuccess({ domains: (await adapter.getAllowedDomains()).map((d) => ({
			domain: d.domain,
			defaultRole: d.defaultRole,
			roleName: roleFromLevel(d.defaultRole),
			enabled: d.enabled,
			createdAt: d.createdAt.toISOString()
		})) });
	} catch (error) {
		return handleError(error, "Failed to list allowed domains", "DOMAIN_LIST_ERROR");
	}
};
/**
* POST - Add a new allowed domain
*/
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "Database not configured", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const adapter = createKyselyAdapter(emdash.db);
	try {
		const body = await parseBody(request, allowedDomainCreateBody);
		if (isParseError(body)) return body;
		const defaultRole = body.defaultRole;
		const cleanDomain = body.domain.toLowerCase().trim();
		if (!DOMAIN_REGEX.test(cleanDomain)) return apiError("VALIDATION_ERROR", "Invalid domain format", 400);
		if (await adapter.getAllowedDomain(cleanDomain)) return apiError("CONFLICT", "Domain already exists", 409);
		const domain = await adapter.createAllowedDomain(cleanDomain, defaultRole);
		return apiSuccess({
			success: true,
			domain: {
				domain: domain.domain,
				defaultRole: domain.defaultRole,
				roleName: roleFromLevel(domain.defaultRole),
				enabled: domain.enabled,
				createdAt: domain.createdAt.toISOString()
			}
		}, 201);
	} catch (error) {
		return handleError(error, "Failed to create allowed domain", "DOMAIN_CREATE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/index@_@mjs
var page = () => allowed_domains_exports;
//#endregion
export { page };
