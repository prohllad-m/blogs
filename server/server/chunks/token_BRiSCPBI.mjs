import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import "./api-tokens-Cvmixds7_yggTcVRS.mjs";
import "./oauth-user-lookup-oUllxvAv_CWxoOzNh.mjs";
import { r as handleAuthorizationCodeExchange } from "./oauth-authorization-oqfbBuMH_CcEn1Ofz.mjs";
import { i as handleTokenRefresh, r as handleDeviceTokenExchange } from "./device-flow-BeA6lUS1_-i2bwB7q.mjs";
import { z } from "zod";
//#region node_modules/emdash/dist/astro/routes/api/oauth/token.mjs
var token_exports = /* @__PURE__ */ __exportAll({
	OPTIONS: () => OPTIONS,
	POST: () => POST,
	prerender: () => false
});
/**
* Parse the request body from either form-encoded or JSON.
* OAuth 2.1 mandates form-encoded, but we accept both.
*/
async function parseTokenBody(request) {
	if ((request.headers.get("content-type") ?? "").includes("application/x-www-form-urlencoded")) {
		const text = await request.text();
		const params = new URLSearchParams(text);
		const result = {};
		for (const [key, value] of params) result[key] = value;
		return result;
	}
	try {
		const json = Object(await request.json());
		const result = {};
		for (const [key, value] of Object.entries(json)) if (typeof value === "string") result[key] = value;
		else if (typeof value === "number") result[key] = String(value);
		return result;
	} catch {
		return {};
	}
}
var authCodeSchema = z.object({
	grant_type: z.literal("authorization_code"),
	code: z.string().min(1),
	redirect_uri: z.string().min(1),
	client_id: z.string().min(1),
	code_verifier: z.string().min(43).max(128),
	resource: z.string().optional()
});
var deviceCodeSchema = z.object({
	grant_type: z.literal("urn:ietf:params:oauth:grant-type:device_code"),
	device_code: z.string().min(1)
});
var refreshSchema = z.object({
	grant_type: z.literal("refresh_token"),
	refresh_token: z.string().min(1)
});
var OPTIONS = () => {
	return new Response(null, {
		status: 204,
		headers: OAUTH_PREFLIGHT_HEADERS
	});
};
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseTokenBody(request);
		const grantType = body.grant_type;
		if (!grantType) return oauthError("invalid_request", "grant_type is required", 400);
		switch (grantType) {
			case "authorization_code": {
				const parsed = authCodeSchema.safeParse(body);
				if (!parsed.success) return oauthError("invalid_request", formatZodError(parsed.error), 400);
				const result = await handleAuthorizationCodeExchange(emdash.db, parsed.data);
				if (!result.success) {
					const err = result.error ?? {
						code: "unknown",
						message: "Unknown error"
					};
					return oauthError(err.code, err.message, 400);
				}
				return oauthSuccess(result.data);
			}
			case "urn:ietf:params:oauth:grant-type:device_code": {
				const parsed = deviceCodeSchema.safeParse(body);
				if (!parsed.success) return oauthError("invalid_request", formatZodError(parsed.error), 400);
				const result = await handleDeviceTokenExchange(emdash.db, parsed.data);
				if (!result.success) {
					const err = result.error ?? {
						code: "unknown",
						message: "Unknown error"
					};
					if (result.deviceFlowError) return oauthError(result.deviceFlowError, err.message, 400);
					return oauthError(err.code, err.message, 400);
				}
				return oauthSuccess(result.data);
			}
			case "refresh_token": {
				const parsed = refreshSchema.safeParse(body);
				if (!parsed.success) return oauthError("invalid_request", formatZodError(parsed.error), 400);
				const result = await handleTokenRefresh(emdash.db, parsed.data);
				if (!result.success) {
					const err = result.error ?? {
						code: "unknown",
						message: "Unknown error"
					};
					return oauthError(err.code, err.message, 400);
				}
				return oauthSuccess(result.data);
			}
			default: return oauthError("unsupported_grant_type", `Unsupported grant_type: ${grantType}`, 400);
		}
	} catch (error) {
		return handleError(error, "Failed to process token request", "TOKEN_ERROR");
	}
};
/** RFC 6749 §5.1 requires Cache-Control: no-store and Pragma: no-cache on token responses */
var OAUTH_TOKEN_HEADERS = {
	"Content-Type": "application/json",
	"Cache-Control": "no-store",
	Pragma: "no-cache",
	"Access-Control-Allow-Origin": "*"
};
var OAUTH_PREFLIGHT_HEADERS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
	"Access-Control-Max-Age": "86400"
};
function oauthSuccess(data) {
	return Response.json(data, { headers: OAUTH_TOKEN_HEADERS });
}
function oauthError(error, description, status) {
	return Response.json({
		error,
		error_description: description
	}, {
		status,
		headers: OAUTH_TOKEN_HEADERS
	});
}
function formatZodError(error) {
	return error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
}
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token@_@mjs
var page = () => token_exports;
//#endregion
export { page };
