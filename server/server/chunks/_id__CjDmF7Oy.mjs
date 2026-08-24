import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as Role } from "./types-ndj-bYfi_C5ykUs-G.mjs";
import "./dist_Cewgrg50.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import "./api-tokens-Cvmixds7_yggTcVRS.mjs";
import { r as handleApiTokenRevoke } from "./api-tokens-uPt8UDpx_Dfb85tFQ.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	prerender: () => false
});
/**
* Revoke (delete) an API token.
*/
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const tokenId = params.id;
	if (!tokenId) return apiError("VALIDATION_ERROR", "Token ID is required", 400);
	try {
		return unwrapResult(await handleApiTokenRevoke(emdash.db, tokenId, user.id));
	} catch (error) {
		return handleError(error, "Failed to revoke API token", "TOKEN_REVOKE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_@_@mjs
var page = () => _id__exports;
//#endregion
export { page };
