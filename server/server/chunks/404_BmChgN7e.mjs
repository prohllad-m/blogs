import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_BcH6IwVj.mjs";
import { t as createComponent } from "./astro-component_DX8lz3oV.mjs";
import { t as $$Base } from "./Base__j1hjMbP.mjs";
import "./_astro_assets_D3Jn4_go.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Page not found",
		"data-astro-cid-ibpinaeu": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="not-found" data-astro-cid-ibpinaeu><h1 data-astro-cid-ibpinaeu>404</h1><p data-astro-cid-ibpinaeu>The page you're looking for doesn't exist.</p><a href="/" data-astro-cid-ibpinaeu>Go back home</a></div>` })}`;
}, "C:/Users/prohl/Documents/blog/my-site/src/pages/404.astro", void 0);
var $$file = "C:/Users/prohl/Documents/blog/my-site/src/pages/404.astro";
var $$url = "/404";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
