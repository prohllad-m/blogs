//#region node_modules/emdash/dist/escape-CFedIB1C.mjs
/** HTML-escape a string to prevent XSS when interpolated into HTML/JS */
function escapeHtml(str) {
	return str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#x27;");
}
//#endregion
export { escapeHtml as t };
