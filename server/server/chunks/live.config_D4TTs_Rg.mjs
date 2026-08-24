import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { i as emdashLoader } from "./loader-Be3ouI5L_CXV56CH4.mjs";
import { t as defineLiveCollection } from "./config_Cb2Anf_E.mjs";
//#endregion
//#region src/live.config.ts
/**
* EmDash Live Content Collections
*
* Defines the _emdash collection that handles all content types from the database.
* Query specific types using getEmDashCollection() and getEmDashEntry().
*/
var collections = { _emdash: defineLiveCollection({ loader: emdashLoader() }) };
//#endregion
export { collections };
