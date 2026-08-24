import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { n as apiSuccess, r as handleError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { t as isSafeRedirect } from "./redirect-Botom7X6_C_U1WUzU.mjs";
//#region node_modules/emdash/dist/astro/routes/api/auth/logout.mjs
var logout_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ session, url }) => {
	try {
		if (session) session.destroy();
		const redirect = url.searchParams.get("redirect");
		if (isSafeRedirect(redirect)) return new Response(null, {
			status: 302,
			headers: { Location: redirect }
		});
		return apiSuccess({
			success: true,
			message: "Logged out successfully"
		});
	} catch (error) {
		return handleError(error, "Logout failed", "LOGOUT_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/logout@_@mjs
var page = () => logout_exports;
//#endregion
export { page };
