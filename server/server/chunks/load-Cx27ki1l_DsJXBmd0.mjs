import { r as __exportAll } from "./runner-DfnZ5eUr_D0TboABR.mjs";
//#region node_modules/emdash/dist/load-Cx27ki1l.mjs
var load_exports = /* @__PURE__ */ __exportAll({
	loadSeed: () => loadSeed,
	loadUserSeed: () => loadUserSeed
});
async function getSeedModule() {
	return import("./seed_0tdY2fwo.mjs");
}
/**
* Load the seed file (user seed or default).
*/
async function loadSeed() {
	const { seed } = await getSeedModule();
	return seed;
}
/**
* Load the user's seed file, or null if none exists.
*/
async function loadUserSeed() {
	const { userSeed } = await getSeedModule();
	return userSeed ?? null;
}
//#endregion
export { loadUserSeed as n, load_exports as r, loadSeed as t };
