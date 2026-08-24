import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as createAstro, d as renderTemplate, f as maybeRenderHead, i as renderComponent, t as spreadAttributes } from "./server_BcH6IwVj.mjs";
import { t as createComponent } from "./astro-component_DX8lz3oV.mjs";
import { o as $$PortableText, t as $$Base } from "./Base__j1hjMbP.mjs";
import { t as decodeSlug } from "./slugify-C_tqlU4G_BhZDAudD.mjs";
import "./dist_e9pyH8uL.mjs";
import { a as getEmDashEntry } from "./query-DR73ZNfm_EHQZ48QK.mjs";
import "./_astro_assets_D3Jn4_go.mjs";
//#region src/pages/pages/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const slug = decodeSlug(Astro.params.slug);
	if (!slug) return Astro.redirect("/404");
	const { entry: page, cacheHint } = await getEmDashEntry("pages", slug);
	if (!page) return Astro.redirect("/404");
	if (Astro.cache?.enabled) Astro.cache.set(cacheHint);
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": page.data.title,
		"content": {
			collection: "pages",
			id: page.data.id,
			slug
		},
		"data-astro-cid-h25gr2g4": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<article class="page-article" data-astro-cid-h25gr2g4><header class="page-header" data-astro-cid-h25gr2g4><h1 class="page-title"${spreadAttributes(page.edit.title)} data-astro-cid-h25gr2g4>${page.data.title}</h1></header><div class="page-content" data-astro-cid-h25gr2g4>${renderComponent($$result, "PortableText", $$PortableText, {
		"value": page.data.content,
		"data-astro-cid-h25gr2g4": true
	})}</div></article>` })}`;
}, "C:/Users/prohl/Documents/blog/my-site/src/pages/pages/[slug].astro", void 0);
var $$file = "C:/Users/prohl/Documents/blog/my-site/src/pages/pages/[slug].astro";
var $$url = "/pages/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/pages/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
