import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as createAstro, b as unescapeHTML, d as renderTemplate, f as maybeRenderHead, i as renderComponent, m as addAttribute } from "./server_BcH6IwVj.mjs";
import { t as createComponent } from "./astro-component_DX8lz3oV.mjs";
import { t as $$Base } from "./Base__j1hjMbP.mjs";
import "./dist_e9pyH8uL.mjs";
import { r as search } from "./search-Bff-7jFt_Dr2xnFF5.mjs";
import "./_astro_assets_D3Jn4_go.mjs";
//#region src/pages/search.astro
var search_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Search,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Search = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Search;
	const query = Astro.url.searchParams.get("q")?.trim() || "";
	const { items: results } = query ? await search(query, {
		collections: ["posts"],
		limit: 30
	}) : { items: [] };
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": query ? `Search: ${query}` : "Search",
		"description": "Search blog posts",
		"data-astro-cid-wp2l4cmv": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="search-page" data-astro-cid-wp2l4cmv><h1 class="search-title" data-astro-cid-wp2l4cmv>Search</h1><form method="get" action="/search" class="search-form" data-astro-cid-wp2l4cmv><input type="search" name="q"${addAttribute(query, "value")} placeholder="Search posts..." class="search-input" autofocus data-astro-cid-wp2l4cmv><button type="submit" class="search-button" data-astro-cid-wp2l4cmv>Search</button></form>${query && renderTemplate`<p class="search-summary" data-astro-cid-wp2l4cmv>${results.length === 0 ? `No results for "${query}"` : `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`}</p>`}${results.length > 0 && renderTemplate`<ol class="search-results" data-astro-cid-wp2l4cmv>${results.map((result) => renderTemplate`<li class="search-result" data-astro-cid-wp2l4cmv><a${addAttribute(`/posts/${result.slug ?? result.id}`, "href")} class="result-link" data-astro-cid-wp2l4cmv><h2 class="result-title" data-astro-cid-wp2l4cmv>${result.title ?? "Untitled"}</h2>${result.snippet && renderTemplate`<p class="result-snippet" data-astro-cid-wp2l4cmv>${unescapeHTML(result.snippet)}</p>`}</a></li>`)}</ol>`}${!query && renderTemplate`<p class="search-hint" data-astro-cid-wp2l4cmv>Enter a search term to find posts.</p>`}</section>` })}`;
}, "C:/Users/prohl/Documents/blog/my-site/src/pages/search.astro", void 0);
var $$file = "C:/Users/prohl/Documents/blog/my-site/src/pages/search.astro";
var $$url = "/search";
//#endregion
//#region \0virtual:astro:page:src/pages/search@_@astro
var page = () => search_exports;
//#endregion
export { page };
