import { d as hasScope } from "./passkey_aQ3O1Vf-.mjs";
import { t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import "./api-tokens-Cvmixds7_yggTcVRS.mjs";
//#region node_modules/emdash/dist/scopes-Bl4IwHA-.mjs
/**
* Scope enforcement for API token authentication.
*
* Routes call `requireScope(locals, "content:write")` alongside role checks.
* Session-authenticated requests have no scope restrictions (implicit full access).
* Token-authenticated requests must have the required scope (or "admin").
*/
/**
* Check if the request has a required scope.
* Returns a 403 Response if the scope is missing, or null if OK.
*
* For session-authenticated users (no tokenScopes), always returns null
* since session auth has implicit full scope.
*/
function requireScope(locals, scope) {
	if (!locals.tokenScopes) return null;
	if (hasScope(locals.tokenScopes, scope)) return null;
	return apiError("INSUFFICIENT_SCOPE", `Token lacks required scope: ${scope}`, 403);
}
//#endregion
export { requireScope as t };
