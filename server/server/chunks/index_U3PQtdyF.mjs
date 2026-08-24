import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as createAstro, a as Fragment, d as renderTemplate, f as maybeRenderHead, i as renderComponent, m as addAttribute } from "./server_BcH6IwVj.mjs";
import { t as createComponent } from "./astro-component_DX8lz3oV.mjs";
import { t as $$Base } from "./Base__j1hjMbP.mjs";
import "./dist_e9pyH8uL.mjs";
import { l as getTermsForEntries } from "./taxonomies-DjSKBZpq_OMwze2dv.mjs";
import { i as getEmDashCollection } from "./query-DR73ZNfm_EHQZ48QK.mjs";
import "./_astro_assets_D3Jn4_go.mjs";
import { t as getReadingTime } from "./reading-time_C2IH5OZr.mjs";
//#region src/pages/posts/index.astro
var posts_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const { entries: posts, cacheHint } = await getEmDashCollection("posts", { orderBy: { published_at: "desc" } });
	if (Astro.cache?.enabled) Astro.cache.set(cacheHint);
	const tagsByEntry = await getTermsForEntries("posts", posts.map((p) => p.data.id), "tag");
	const postsWithTags = posts.map((post) => ({
		post,
		tags: tagsByEntry.get(post.data.id) ?? [],
		bylines: post.data.bylines ?? []
	}));
	const formatDate = (date) => date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "All Posts",
		"description": "Browse all blog posts",
		"data-astro-cid-bxdp5n4l": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="posts-page" data-astro-cid-bxdp5n4l><header class="page-header" data-astro-cid-bxdp5n4l><h1 class="page-title" data-astro-cid-bxdp5n4l>All Posts</h1><p class="page-description" data-astro-cid-bxdp5n4l>${posts.length}${posts.length === 1 ? "article" : "articles"}</p></header>${posts.length === 0 ? renderTemplate`<p class="empty" data-astro-cid-bxdp5n4l>No posts yet.</p>` : renderTemplate`<div class="posts-list" data-astro-cid-bxdp5n4l>${postsWithTags.map(({ post, tags, bylines }) => renderTemplate`<article class="post-item" data-astro-cid-bxdp5n4l><a${addAttribute(`/posts/${post.id}`, "href")} class="post-link" data-astro-cid-bxdp5n4l><div class="post-meta" data-astro-cid-bxdp5n4l>${bylines.length > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<div class="post-bylines" data-astro-cid-bxdp5n4l>${bylines.slice(0, 2).map((credit, index) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${index > 0 && renderTemplate`<span class="byline-sep" data-astro-cid-bxdp5n4l>,</span>`}<span class="post-byline" data-astro-cid-bxdp5n4l>${credit.byline.avatarMediaId && renderTemplate`<img${addAttribute(`/_emdash/api/media/file/${credit.byline.avatarMediaId}`, "src")}${addAttribute(credit.byline.displayName, "alt")} class="post-byline-avatar" data-astro-cid-bxdp5n4l>`}<span class="post-byline-name" data-astro-cid-bxdp5n4l>${credit.byline.displayName}</span></span>` })}`)}${bylines.length > 2 && renderTemplate`<span class="byline-more" data-astro-cid-bxdp5n4l>+${bylines.length - 2}</span>`}</div><span class="meta-dot" data-astro-cid-bxdp5n4l></span>` })}`}${post.data.publishedAt && renderTemplate`<time data-astro-cid-bxdp5n4l>${formatDate(post.data.publishedAt)}</time>`}${post.data.publishedAt && renderTemplate`<span class="meta-dot" data-astro-cid-bxdp5n4l></span>`}<span data-astro-cid-bxdp5n4l>${getReadingTime(post.data.content)} min read</span></div><h2 class="post-title" data-astro-cid-bxdp5n4l>${post.data.title}</h2>${post.data.excerpt && renderTemplate`<p class="post-excerpt" data-astro-cid-bxdp5n4l>${post.data.excerpt}</p>`}</a>${tags.length > 0 && renderTemplate`<div class="post-tags" data-astro-cid-bxdp5n4l>${tags.slice(0, 3).map((t) => renderTemplate`<a${addAttribute(`/tag/${t.slug}`, "href")} class="post-tag" data-astro-cid-bxdp5n4l>${t.label}</a>`)}</div>`}</article>`)}</div>`}</div>` })}`;
}, "C:/Users/prohl/Documents/blog/my-site/src/pages/posts/index.astro", void 0);
var $$file = "C:/Users/prohl/Documents/blog/my-site/src/pages/posts/index.astro";
var $$url = "/posts";
//#endregion
//#region \0virtual:astro:page:src/pages/posts/index@_@astro
var page = () => posts_exports;
//#endregion
export { page };
