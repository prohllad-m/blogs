import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./runner-DfnZ5eUr_D0TboABR.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./content-Ci04z2z-_B6s9HI1r.mjs";
import "./media-BjhhENaJ_DtGEF5D8.mjs";
import "./taxonomy-DfVooU4W_BOv42Utk.mjs";
import "./content-refresh-D4khvC0R_Bxt0RQoB.mjs";
import "./request-cache-BSUptuJR_CCaufTtE.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./settings-CpA4lQFt_C9lm7kb6.mjs";
import "./ssrf-CviKqWmq_6hEIMCxY.mjs";
import "./redirect-CgLPYflR_CplqVHl6.mjs";
import "./byline-registry-BCuOp4UF_EQhUHNLu.mjs";
import "./field-defs-cache-DvmlgP-D_bBrZBINr.mjs";
import "./byline-XEjchwzZ_MSMp-1jc.mjs";
import "./fts-manager-DzqIBrrW_C8Ds5uQp.mjs";
import "./registry-FV15nLge_C-lxn3gO.mjs";
import { t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import "./validate-V9nCwq_-_CIDKwgcr.mjs";
import "./apply-CmIJK9j8_CfEBysf6.mjs";
import "./load-Cx27ki1l_DsJXBmd0.mjs";
import "./api-tokens-Cvmixds7_yggTcVRS.mjs";
import "./api-tokens-uPt8UDpx_Dfb85tFQ.mjs";
import "ulidx";
//#region node_modules/emdash/dist/astro/routes/api/setup/dev-bypass.mjs
var dev_bypass_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
async function handleDevBypass(context) {
	return apiError("FORBIDDEN", "Dev bypass is only available in development mode", 403);
}
var GET = handleDevBypass;
var POST = handleDevBypass;
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/dev-bypass@_@mjs
var page = () => dev_bypass_exports;
//#endregion
export { page };
