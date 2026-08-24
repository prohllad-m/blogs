import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as OptionsRepository } from "./options-BlmBHTvX_nqkCch6f.mjs";
import { f as escapeHtml } from "./dist_Cewgrg50.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { z } from "zod";
//#region node_modules/emdash/dist/astro/routes/api/settings/email.mjs
var email_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var EMAIL_DELIVER_HOOK = "email:deliver";
var EMAIL_BEFORE_SEND_HOOK = "email:beforeSend";
var EMAIL_AFTER_SEND_HOOK = "email:afterSend";
/**
* GET /_emdash/api/settings/email
*
* Returns the email configuration state:
* - Current provider selection
* - Available providers (plugins with email:deliver)
* - Active middleware (email:beforeSend / email:afterSend plugins)
* - Whether email is available
*/
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:manage");
	if (denied) return denied;
	try {
		const pipeline = emdash.hooks;
		const optionsRepo = new OptionsRepository(emdash.db);
		const providers = pipeline.getExclusiveHookProviders(EMAIL_DELIVER_HOOK);
		const selectedProviderId = await optionsRepo.get(`emdash:exclusive_hook:${EMAIL_DELIVER_HOOK}`);
		const beforeSendPlugins = pipeline.getHookProviders(EMAIL_BEFORE_SEND_HOOK).map((p) => p.pluginId);
		const afterSendPlugins = pipeline.getHookProviders(EMAIL_AFTER_SEND_HOOK).map((p) => p.pluginId);
		return apiSuccess({
			available: emdash.email?.isAvailable() ?? false,
			providers: providers.map((p) => ({ pluginId: p.pluginId })),
			selectedProviderId: selectedProviderId ?? null,
			middleware: {
				beforeSend: beforeSendPlugins,
				afterSend: afterSendPlugins
			}
		});
	} catch (error) {
		return handleError(error, "Failed to get email settings", "EMAIL_SETTINGS_READ_ERROR");
	}
};
/**
* POST /_emdash/api/settings/email/test
*
* Send a test email through the full pipeline.
* Validates the pipeline is configured and the provider works.
*/
var testEmailBody = z.object({ to: z.string().email() });
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:manage");
	if (denied) return denied;
	if (!emdash.email?.isAvailable()) return apiError("EMAIL_NOT_CONFIGURED", "No email provider is configured. Install and activate an email provider plugin.", 503);
	try {
		const body = await parseBody(request, testEmailBody);
		if (isParseError(body)) return body;
		const siteName = await new OptionsRepository(emdash.db).get("emdash:site_title") ?? "EmDash";
		const safeName = escapeHtml(siteName);
		await emdash.email.send({
			to: body.to,
			subject: `Test email from ${siteName}`,
			text: `This is a test email from ${siteName}.\n\nIf you received this, your email provider is working correctly.`,
			html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="font-size: 24px; margin-bottom: 20px;">Test Email</h1>
  <p>This is a test email from <strong>${safeName}</strong>.</p>
  <p>If you received this, your email provider is working correctly.</p>
  <p style="color: #666; font-size: 14px; margin-top: 30px;">
    Sent via the EmDash email pipeline.
  </p>
</body>
</html>`
		}, "admin");
		return apiSuccess({
			success: true,
			message: `Test email sent to ${body.to}`
		});
	} catch (error) {
		return handleError(error, "Failed to send test email", "EMAIL_TEST_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/email@_@mjs
var page = () => email_exports;
//#endregion
export { page };
