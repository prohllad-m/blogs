import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { Dt as usersListQuery } from "./relations-5_avdrN__CvbT7cha.mjs";
import { t as Role } from "./types-ndj-bYfi_C5ykUs-G.mjs";
import "./dist_Cewgrg50.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { t as createKyselyAdapter } from "./kysely_6BTjyg_S.mjs";
import "./schemas_9zeCee0X.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/users/index.mjs
var users_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const adapter = createKyselyAdapter(emdash.db);
	try {
		const query = parseQuery(url, usersListQuery);
		if (isParseError(query)) return query;
		const result = await adapter.getUsers({
			search: query.search,
			role: query.role ? parseInt(query.role, 10) : void 0,
			cursor: query.cursor,
			limit: query.limit
		});
		return apiSuccess({
			items: result.items.map((u) => ({
				id: u.id,
				email: u.email,
				name: u.name,
				avatarUrl: u.avatarUrl,
				role: u.role,
				emailVerified: u.emailVerified,
				disabled: u.disabled,
				createdAt: u.createdAt.toISOString(),
				updatedAt: u.updatedAt.toISOString(),
				lastLogin: u.lastLogin?.toISOString() ?? null,
				credentialCount: u.credentialCount,
				oauthProviders: u.oauthProviders
			})),
			nextCursor: result.nextCursor
		});
	} catch (error) {
		return handleError(error, "Failed to list users", "USER_LIST_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/index@_@mjs
var page = () => users_exports;
//#endregion
export { page };
