import { t as OptionsRepository } from "./options-BlmBHTvX_nqkCch6f.mjs";
//#region node_modules/emdash/dist/site-url-NGJT6NTU.mjs
async function getSiteBaseUrl(db, request) {
	const storedUrl = await new OptionsRepository(db).get("emdash:site_url");
	if (storedUrl) return `${storedUrl}/_emdash`;
	const url = new URL(request.url);
	return `${url.protocol}//${url.host}/_emdash`;
}
//#endregion
export { getSiteBaseUrl as t };
