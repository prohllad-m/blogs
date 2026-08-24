//#region node_modules/emdash/dist/mime-DfIVjNkr.mjs
function normalizeMime(mime) {
	return mime.split(";")[0].trim().toLowerCase();
}
function matchesMimeAllowlist(mime, allowList) {
	const normalized = normalizeMime(mime);
	for (const entry of allowList) {
		if (!entry || !entry.includes("/")) continue;
		const normalizedEntry = normalizeMime(entry);
		if (normalizedEntry.endsWith("/")) {
			if (normalized.startsWith(normalizedEntry)) return true;
		} else if (normalized === normalizedEntry) return true;
	}
	return false;
}
/**
* Extract the `allowedMimeTypes` list from a `_emdash_fields.validation` row
* (raw JSON string). Returns null when the value is missing, malformed, or the
* list is empty — callers treat that as "no field-specific constraint".
*/
function parseAllowedMimeTypes(rawValidation) {
	if (!rawValidation) return null;
	try {
		const parsed = JSON.parse(rawValidation);
		if (typeof parsed !== "object" || parsed === null) return null;
		const list = parsed.allowedMimeTypes;
		if (!Array.isArray(list) || list.length === 0) return null;
		return list.filter((entry) => typeof entry === "string");
	} catch {
		return null;
	}
}
//#endregion
//#region node_modules/emdash/dist/hash-DFFrkivP.mjs
/**
* SHA-256 hash of a string, truncated to 16 hex chars (64 bits).
* For cache invalidation / ETags — not for security.
*/
async function hashString(content) {
	const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(content));
	return Array.from(new Uint8Array(buf).slice(0, 8), (b) => b.toString(16).padStart(2, "0")).join("");
}
/**
* Compute content hash using Web Crypto API
*
* Uses SHA-1 which is the fastest option in SubtleCrypto.
* SHA-1 is cryptographically weak but fine for content deduplication
* where we only need to detect identical files, not resist attacks.
*
* Returns hex string prefixed with "sha1:" for future-proofing
*/
async function computeContentHash(content) {
	let buf;
	if (content instanceof ArrayBuffer) buf = content;
	else {
		buf = new ArrayBuffer(content.byteLength);
		new Uint8Array(buf).set(content);
	}
	const hashBuffer = await crypto.subtle.digest("SHA-1", buf);
	const hashArray = new Uint8Array(hashBuffer);
	return `sha1:${Array.from(hashArray, (b) => b.toString(16).padStart(2, "0")).join("")}`;
}
//#endregion
export { parseAllowedMimeTypes as a, normalizeMime as i, hashString as n, matchesMimeAllowlist as r, computeContentHash as t };
