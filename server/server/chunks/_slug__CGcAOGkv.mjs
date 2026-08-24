import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as createAstro, d as renderTemplate, f as maybeRenderHead, i as renderComponent } from "./server_BcH6IwVj.mjs";
import { t as createComponent } from "./astro-component_DX8lz3oV.mjs";
import { t as $$Base } from "./Base__j1hjMbP.mjs";
import { t as decodeSlug } from "./slugify-C_tqlU4G_BhZDAudD.mjs";
import "./dist_e9pyH8uL.mjs";
import { c as getTerm, l as getTermsForEntries } from "./taxonomies-DjSKBZpq_OMwze2dv.mjs";
import { i as getEmDashCollection } from "./query-DR73ZNfm_EHQZ48QK.mjs";
import "./_astro_assets_D3Jn4_go.mjs";
import { t as $$PostCard } from "./PostCard_CD0J3szr.mjs";
import { t as getReadingTime } from "./reading-time_C2IH5OZr.mjs";
//#region src/pages/category/[slug].astro
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
	const term = slug ? await getTerm("category", slug) : null;
	if (!term) return Astro.redirect("/404");
	const { entries: posts, cacheHint } = await getEmDashCollection("posts", {
		where: { category: term.slug },
		orderBy: { published_at: "desc" }
	});
	if (Astro.cache?.enabled) Astro.cache.set(cacheHint);
	const tagsByEntry = await getTermsForEntries("posts", posts.map((p) => p.data.id), "tag");
	const filteredPosts = posts.map((post) => ({
		post,
		tags: tagsByEntry.get(post.data.id) ?? []
	}));
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": `${term.label} posts`,
		"description": `All posts in ${term.label}`,
		"data-astro-cid-pjwz537a": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="archive-section" data-astro-cid-pjwz537a><header class="archive-header" data-astro-cid-pjwz537a><span class="archive-label" data-astro-cid-pjwz537a>Category</span><h1 class="archive-title" data-astro-cid-pjwz537a>${term.label}</h1><p class="archive-count" data-astro-cid-pjwz537a>${filteredPosts.length}${filteredPosts.length === 1 ? "post" : "posts"}</p></header>${filteredPosts.length === 0 ? renderTemplate`<p class="no-posts" data-astro-cid-pjwz537a>No posts in this category yet.</p>` : renderTemplate`<div class="posts-grid" data-astro-cid-pjwz537a>${filteredPosts.map(({ post, tags }) => renderTemplate`${renderComponent($$result, "PostCard", $$PostCard, {
		"title": post.data.title,
		"excerpt": post.data.excerpt,
		"featuredImage": post.data.featured_image,
		"href": `/posts/${post.id}`,
		"date": post.data.publishedAt ?? void 0,
		"readingTime": getReadingTime(post.data.content),
		"tags": tags.map((t) => ({
			slug: t.slug,
			label: t.label
		})),
		"data-astro-cid-pjwz537a": true
	})}`)}</div>`}</section>` })}`;
}, "C:/Users/prohl/Documents/blog/my-site/src/pages/category/[slug].astro", void 0);
var $$file = "C:/Users/prohl/Documents/blog/my-site/src/pages/category/[slug].astro";
var $$url = "/category/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/category/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
