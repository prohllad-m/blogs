import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-BjhhENaJ_DtGEF5D8.mjs";
import "./request-cache-BSUptuJR_CCaufTtE.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./settings-CpA4lQFt_C9lm7kb6.mjs";
import { t as SsrfError } from "./ssrf-CviKqWmq_6hEIMCxY.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { a as importProbeBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { h as probeUrl } from "./import-Dmkm8S1W_BkjX2KEB.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/import/probe.mjs
var probe_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { user } = locals;
	const denied = requirePerm(user, "import:execute");
	if (denied) return denied;
	try {
		const body = await parseBody(request, importProbeBody);
		if (isParseError(body)) return body;
		return apiSuccess({
			success: true,
			result: await probeUrl(body.url)
		});
	} catch (error) {
		if (error instanceof SsrfError) return apiError("SSRF_BLOCKED", error.message, 400);
		return handleError(error, "Failed to probe URL", "PROBE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/probe@_@mjs
var page = () => probe_exports;
//#endregion
export { page };
