import { S as createAstro, a as Fragment, b as unescapeHTML, c as renderSlot, d as renderTemplate, f as maybeRenderHead, h as createRenderInstruction, i as renderComponent, m as addAttribute, p as renderHead, t as spreadAttributes } from "./server_BcH6IwVj.mjs";
import { t as createComponent } from "./astro-component_DX8lz3oV.mjs";
import { t as getSiteSettings } from "./settings-CpA4lQFt_C9lm7kb6.mjs";
import { u as getMenu$1 } from "./dist_e9pyH8uL.mjs";
import { i as getEmDashCollection } from "./query-DR73ZNfm_EHQZ48QK.mjs";
import { t as config_default } from "./config_DXAHziw6.mjs";
import { a as $$ResponsiveImage, i as $$Font, n as getImage } from "./_astro_assets_D3Jn4_go.mjs";
import { r as requestCached } from "./request-cache_CwLBsNi5.mjs";
import { a as EmDashValidationError, c as decodeCursor, i as getDb, l as encodeCursor, o as InvalidCursorError, s as ScheduledNotDueError } from "./loader_H3QLxJZA.mjs";
import { n as getSiteSettingsWithDb, t as getSiteSettings$1 } from "./settings_BV37Ih_D.mjs";
import { t as validateIdentifier } from "./validate_DjLzGa7z.mjs";
import { a as chunks, c as isSqlite, i as resolveLocaleChain, l as listTablesLike, n as localizePath, r as resolveLocale, s as currentTimestamp, t as interpolateUrlPattern$1, u as tableExists } from "./resolve_tHc8MOuV.mjs";
import { i as isMissingTableError, n as getI18nConfig, r as isI18nEnabled } from "./config_xGs4R7N0.mjs";
import { n as cachedQuery, o as invalidateCollectionCache, s as invalidateCommentObjectCache, t as CacheNamespace } from "./object-cache_BOlPl5ud.mjs";
import { n as getEditMeta, r as getEmDashCollection$1 } from "./query_BTsOyes1.mjs";
import { a as RESERVED_FIELD_SLUGS, i as RESERVED_COLLECTION_SLUGS, n as FIELD_TYPE_TO_COLUMN, o as withTransaction } from "./types_BeH4aj60.mjs";
import { i as getTaxonomyTerms } from "./taxonomies_D0z3wlgk.mjs";
import { t as resolveBlogSiteIdentity } from "./site-identity_CAY1GlF8.mjs";
import { sql } from "kysely";
import { monotonicFactory, ulid } from "ulidx";
import { LIST_NEST_MODE_HTML, buildMarksTree, isPortableTextBlock, isPortableTextListItemBlock, isPortableTextToolkitList, isPortableTextToolkitSpan, isPortableTextToolkitTextNode, nestLists } from "@portabletext/toolkit";
import sanitizeHtml from "sanitize-html";
//#region node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region node_modules/astro/dist/runtime/server/render/template-depth.js
function templateEnter(_result) {
	return createRenderInstruction({ type: "template-enter" });
}
function templateExit(_result) {
	return createRenderInstruction({ type: "template-exit" });
}
//#endregion
//#region node_modules/astro-portabletext/lib/internal.ts
/**
* Returns true if `it` is component
*/
function isComponent(it) {
	return typeof it === "function";
}
/**
* Merges two {@link SomePortableTextComponents} objects, giving priority to overrides.
*
* This function combines two component objects used in Portable Text rendering.
* If both objects have the same key, the value from `overrides` takes precedence.
* This is useful for customizing the rendering of specific components while keeping
* the default behavior for others.
*
* @typeParam Components - The type of the base components object.
* @typeParam Overrides - The type of the overrides components object.
* @typeParam MergedComponents - The type of the resulting merged components object.
*
* @param components - The base components object.
* @param overrides - The overrides components object.
*
* @returns A new object with the merged components.
*/
function mergeComponents(components, overrides) {
	const cmps = { ...components };
	for (const [key, override] of Object.entries(overrides)) {
		const current = components[key];
		cmps[key] = !current || isComponent(override) || isComponent(current) ? override : {
			...current,
			...override
		};
	}
	return cmps;
}
//#endregion
//#region node_modules/astro-portabletext/lib/warnings.ts
var getTemplate = (prop, type) => `PortableText [components.${prop}] is missing "${type}"`;
var unknownTypeWarning = (type) => getTemplate("type", type);
var unknownMarkWarning = (markType) => getTemplate("mark", markType);
var unknownBlockWarning = (style) => getTemplate("block", style);
var unknownListWarning = (listItem) => getTemplate("list", listItem);
var unknownListItemWarning = (listStyle) => getTemplate("listItem", listStyle);
var getWarningMessage = (nodeType, type) => {
	return {
		block: unknownBlockWarning,
		list: unknownListWarning,
		listItem: unknownListItemWarning,
		mark: unknownMarkWarning,
		type: unknownTypeWarning
	}[nodeType](type);
};
function printWarning(message) {
	console.warn(message);
}
//#endregion
//#region node_modules/astro-portabletext/lib/context.ts
var key = Symbol("astro-portabletext");
/**
* This function returns rendering utility functions within a Portable Text tree. It should
* only be used within an Astro component that has been passed into the PortableText `components` prop.
* It follows a naming convention similar to React hooks, though it is not a hook as such.
*
* @param node - The Portable Text node that was passed into the Astro component
* @returns Rendering utility functions
*/
function usePortableText(node) {
	if (!(key in globalThis)) throw new Error(`PortableText "context" has not been initialised`);
	return globalThis[key](node);
}
//#endregion
//#region node_modules/astro-portabletext/components/Block.astro
createAstro("https://astro.build");
var $$Block$1 = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Block$1;
	const props = Astro.props;
	const { node, index, isInline, ...attrs } = props;
	const styleIs = (style) => style === node.style;
	const { getUnknownComponent } = usePortableText(node);
	const UnknownStyle = getUnknownComponent();
	return renderTemplate`${styleIs("h1") ? renderTemplate`${maybeRenderHead($$result)}<h1${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h1>` : styleIs("h2") ? renderTemplate`<h2${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h2>` : styleIs("h3") ? renderTemplate`<h3${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h3>` : styleIs("h4") ? renderTemplate`<h4${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h4>` : styleIs("h5") ? renderTemplate`<h5${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h5>` : styleIs("h6") ? renderTemplate`<h6${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h6>` : styleIs("blockquote") ? renderTemplate`<blockquote${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</blockquote>` : styleIs("normal") ? renderTemplate`<p${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</p>` : renderTemplate`${renderComponent($$result, "UnknownStyle", UnknownStyle, { ...props }, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/astro-portabletext/components/Block.astro", void 0);
//#endregion
//#region node_modules/astro-portabletext/components/HardBreak.astro
var $$HardBreak = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<br>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/astro-portabletext/components/HardBreak.astro", void 0);
//#endregion
//#region node_modules/astro-portabletext/components/List.astro
createAstro("https://astro.build");
var $$List = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$List;
	const { node, index, isInline, ...attrs } = Astro.props;
	const listItemIs = (listItem) => listItem === node.listItem;
	return renderTemplate`${listItemIs("menu") ? renderTemplate`${maybeRenderHead($$result)}<menu${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</menu>` : listItemIs("number") ? renderTemplate`<ol${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</ol>` : renderTemplate`<ul${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</ul>`}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/astro-portabletext/components/List.astro", void 0);
//#endregion
//#region node_modules/astro-portabletext/components/ListItem.astro
createAstro("https://astro.build");
var $$ListItem = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ListItem;
	const { node, index, isInline, ...attrs } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<li${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</li>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/astro-portabletext/components/ListItem.astro", void 0);
//#endregion
//#region node_modules/astro-portabletext/components/Mark.astro
createAstro("https://astro.build");
var $$Mark = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Mark;
	const props = Astro.props;
	const { node, index, isInline, ...attrs } = props;
	const markTypeIs = (markType) => markType === node.markType;
	const { getUnknownComponent } = usePortableText(node);
	const UnknownMarkType = getUnknownComponent();
	return renderTemplate`${markTypeIs("code") ? renderTemplate`${maybeRenderHead($$result)}<code${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</code>` : markTypeIs("em") ? renderTemplate`<em${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</em>` : markTypeIs("link") ? renderTemplate`<a${addAttribute(node.markDef.href, "href")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</a>` : markTypeIs("strike-through") ? renderTemplate`<del${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</del>` : markTypeIs("strong") ? renderTemplate`<strong${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</strong>` : markTypeIs("underline") ? renderTemplate`<span style="text-decoration: underline;"${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</span>` : renderTemplate`${renderComponent($$result, "UnknownMarkType", UnknownMarkType, { ...props }, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/astro-portabletext/components/Mark.astro", void 0);
//#endregion
//#region node_modules/astro-portabletext/components/Text.astro
createAstro("https://astro.build");
var $$Text = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Text;
	const { node } = Astro.props;
	return renderTemplate`${node.text}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/astro-portabletext/components/Text.astro", void 0);
//#endregion
//#region node_modules/astro-portabletext/components/UnknownBlock.astro
var $$UnknownBlock = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<p data-portabletext-unknown="block">${renderSlot($$result, $$slots["default"])}</p>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/astro-portabletext/components/UnknownBlock.astro", void 0);
//#endregion
//#region node_modules/astro-portabletext/components/UnknownList.astro
var $$UnknownList = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<ul data-portabletext-unknown="list">${renderSlot($$result, $$slots["default"])}</ul>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/astro-portabletext/components/UnknownList.astro", void 0);
//#endregion
//#region node_modules/astro-portabletext/components/UnknownListItem.astro
var $$UnknownListItem = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<li data-portabletext-unknown="listitem">${renderSlot($$result, $$slots["default"])}</li>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/astro-portabletext/components/UnknownListItem.astro", void 0);
//#endregion
//#region node_modules/astro-portabletext/components/UnknownMark.astro
var $$UnknownMark = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<span data-portabletext-unknown="mark">${renderSlot($$result, $$slots["default"])}</span>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/astro-portabletext/components/UnknownMark.astro", void 0);
//#endregion
//#region node_modules/astro-portabletext/components/UnknownType.astro
createAstro("https://astro.build");
var $$UnknownType = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$UnknownType;
	const { node, isInline } = Astro.props;
	const warning = getWarningMessage("type", node._type);
	return renderTemplate`${isInline ? renderTemplate`${maybeRenderHead($$result)}<span style="display:none" data-portabletext-unknown="type">${warning}</span>` : renderTemplate`<div style="display:none" data-portabletext-unknown="type">${warning}</div>`}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/astro-portabletext/components/UnknownType.astro", void 0);
//#endregion
//#region node_modules/astro-portabletext/components/PortableText.astro
createAstro("https://astro.build");
var $$PortableText$1 = createComponent(($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$PortableText$1;
	const { value, components: componentOverrides = {}, listNestingMode = LIST_NEST_MODE_HTML, onMissingComponent = true } = Astro2.props;
	const components = mergeComponents({
		type: {},
		unknownType: $$UnknownType,
		block: {
			h1: $$Block$1,
			h2: $$Block$1,
			h3: $$Block$1,
			h4: $$Block$1,
			h5: $$Block$1,
			h6: $$Block$1,
			blockquote: $$Block$1,
			normal: $$Block$1
		},
		unknownBlock: $$UnknownBlock,
		list: {
			bullet: $$List,
			number: $$List,
			menu: $$List
		},
		unknownList: $$UnknownList,
		listItem: {
			bullet: $$ListItem,
			number: $$ListItem,
			menu: $$ListItem
		},
		unknownListItem: $$UnknownListItem,
		mark: {
			code: $$Mark,
			em: $$Mark,
			link: $$Mark,
			"strike-through": $$Mark,
			strong: $$Mark,
			underline: $$Mark
		},
		unknownMark: $$UnknownMark,
		text: $$Text,
		hardBreak: $$HardBreak
	}, componentOverrides);
	const noop = () => {};
	const missingComponentHandler = ((handler) => {
		if (typeof handler === "function") return handler;
		return !handler ? noop : printWarning;
	})(onMissingComponent);
	const asComponentProps = (node, index, isInline) => ({
		node,
		index,
		isInline
	});
	const provideComponent = (nodeType, type, fallbackComponent) => {
		const component = ((component2) => {
			return component2[type] || component2;
		})(components[nodeType]);
		if (isComponent(component)) return component;
		missingComponentHandler(getWarningMessage(nodeType, type), {
			nodeType,
			type
		});
		return fallbackComponent;
	};
	const cachedNodes = /* @__PURE__ */ new WeakMap();
	function cacheNode(node, Default, Unknown) {
		cachedNodes.set(node, {
			Default,
			Unknown
		});
	}
	let fallbackRenderOptions;
	const portableTextRender = (options, isInline) => {
		if (!fallbackRenderOptions) throw new Error("[PortableText portableTextRender] fallbackRenderOptions is undefined");
		const renderChildren = (children, inline = false) => {
			return children?.map(portableTextRender(options, inline)) ?? [];
		};
		const renderOptions = {
			...fallbackRenderOptions,
			...options ?? {}
		};
		return function renderNode(node, index) {
			function run(handler, props) {
				if (!isComponent(handler)) throw new Error(`[PortableText render] No handler found for node type ${node._type}.`);
				return handler(props);
			}
			if (isPortableTextToolkitList(node)) {
				const UnknownComponent2 = components.unknownList ?? $$UnknownList;
				cacheNode(node, $$List, UnknownComponent2);
				return run(renderOptions.list, {
					Component: provideComponent("list", node.listItem, UnknownComponent2),
					props: asComponentProps(node, index, false),
					children: renderChildren(node.children, false)
				});
			}
			if (isPortableTextListItemBlock(node)) {
				const { listItem, ...blockNode } = node;
				const isStyled = node.style && node.style !== "normal";
				node.children = isStyled ? renderNode(blockNode, index) : buildMarksTree(node);
				const UnknownComponent2 = components.unknownListItem ?? $$UnknownListItem;
				cacheNode(node, $$ListItem, UnknownComponent2);
				return run(renderOptions.listItem, {
					Component: provideComponent("listItem", node.listItem, UnknownComponent2),
					props: asComponentProps(node, index, false),
					children: isStyled ? node.children : renderChildren(node.children, true)
				});
			}
			if (isPortableTextToolkitSpan(node)) {
				const UnknownComponent2 = components.unknownMark ?? $$UnknownMark;
				cacheNode(node, $$Mark, UnknownComponent2);
				return run(renderOptions.mark, {
					Component: provideComponent("mark", node.markType, UnknownComponent2),
					props: asComponentProps(node, index, true),
					children: renderChildren(node.children, true)
				});
			}
			if (isPortableTextBlock(node)) {
				node.style ??= "normal";
				node.children = buildMarksTree(node);
				const UnknownComponent2 = components.unknownBlock ?? $$UnknownBlock;
				cacheNode(node, $$Block$1, UnknownComponent2);
				return run(renderOptions.block, {
					Component: provideComponent("block", node.style, UnknownComponent2),
					props: asComponentProps(node, index, false),
					children: renderChildren(node.children, true)
				});
			}
			if (isPortableTextToolkitTextNode(node)) {
				const isHardBreak = "\n" === node.text;
				const props = asComponentProps(node, index, true);
				if (isHardBreak) return run(renderOptions.hardBreak, {
					Component: isComponent(components.hardBreak) ? components.hardBreak : $$HardBreak,
					props
				});
				return run(renderOptions.text, {
					Component: isComponent(components.text) ? components.text : $$Text,
					props
				});
			}
			const UnknownComponent = components.unknownType ?? $$UnknownType;
			return run(renderOptions.type, {
				Component: provideComponent("type", node._type, UnknownComponent),
				props: asComponentProps(node, index, isInline ?? false)
			});
		};
	};
	globalThis[key] = (node) => ({
		getDefaultComponent: provideDefaultComponent.bind(null, node),
		getUnknownComponent: provideUnknownComponent.bind(null, node),
		render: (options) => node.children?.map(portableTextRender(options))
	});
	const provideDefaultComponent = (node) => {
		const DefaultComponent = cachedNodes.get(node)?.Default;
		if (DefaultComponent) return DefaultComponent;
		if (isPortableTextToolkitList(node)) return $$List;
		if (isPortableTextListItemBlock(node)) return $$ListItem;
		if (isPortableTextToolkitSpan(node)) return $$Mark;
		if (isPortableTextBlock(node)) return $$Block$1;
		if (isPortableTextToolkitTextNode(node)) return "\n" === node.text ? $$HardBreak : $$Text;
		return $$UnknownType;
	};
	const provideUnknownComponent = (node) => {
		const UnknownComponent = cachedNodes.get(node)?.Unknown;
		if (UnknownComponent) return UnknownComponent;
		if (isPortableTextToolkitList(node)) return components.unknownList ?? $$UnknownList;
		if (isPortableTextListItemBlock(node)) return components.unknownListItem ?? $$UnknownListItem;
		if (isPortableTextToolkitSpan(node)) return components.unknownMark ?? $$UnknownMark;
		if (isPortableTextBlock(node)) return components.unknownBlock ?? $$UnknownBlock;
		if (!isPortableTextToolkitTextNode(node)) return components.unknownType ?? $$UnknownType;
		throw new Error(`[PortableText getUnknownComponent] Unable to provide component with node type ${node._type}`);
	};
	const nodes = nestLists(Array.isArray(value) ? value : value ? [value] : [], listNestingMode);
	const render = (options) => {
		fallbackRenderOptions = options;
		return portableTextRender(options);
	};
	const createSlotRenderer = (slotName) => Astro2.slots.render.bind(Astro2.slots, slotName);
	const slots = [
		"type",
		"block",
		"list",
		"listItem",
		"mark",
		"text",
		"hardBreak"
	].reduce((obj, name) => {
		obj[name] = Astro2.slots.has(name) ? createSlotRenderer(name) : void 0;
		return obj;
	}, {});
	return renderTemplate`${(() => {
		const renderNode = (slotRenderer) => {
			return ({ Component, props, children }) => slotRenderer?.([{
				Component,
				props,
				children
			}]) ?? renderTemplate`${renderComponent($$result, "Component", Component, { ...props }, { "default": ($$result2) => renderTemplate`${children}` })}`;
		};
		return nodes.map(render({
			type: renderNode(slots.type),
			block: renderNode(slots.block),
			list: renderNode(slots.list),
			listItem: renderNode(slots.listItem),
			mark: renderNode(slots.mark),
			text: renderNode(slots.text),
			hardBreak: renderNode(slots.hardBreak)
		}));
	})()}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/astro-portabletext/components/PortableText.astro", void 0);
//#endregion
//#region \0virtual:emdash/block-components
var pluginBlockComponents = {};
//#endregion
//#region node_modules/emdash/src/components/InlineEditor.astro
createAstro("https://astro.build");
var $$InlineEditor = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$InlineEditor;
	const { value, collection, entryId, field } = Astro.props;
	return renderTemplate`${renderComponent($$result, "InlinePortableTextEditor", null, {
		"client:only": "react",
		"value": value,
		"collection": collection,
		"entryId": entryId,
		"field": field,
		"client:component-hydration": "only",
		"client:component-path": "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/InlinePortableTextEditor.tsx",
		"client:component-export": "InlinePortableTextEditor"
	})}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/InlineEditor.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/portable-text-blockquote-group.ts
function isBlockquoteBlock(block) {
	if (typeof block !== "object" || block === null) return false;
	const b = block;
	return b._type === "block" && b.style === "blockquote" && b.listItem === void 0;
}
function groupBlockquoteRuns(blocks) {
	const result = [];
	let i = 0;
	while (i < blocks.length) {
		const current = blocks[i];
		if (!isBlockquoteBlock(current)) {
			result.push(current);
			i++;
			continue;
		}
		const run = [];
		let next = current;
		while (i < blocks.length && isBlockquoteBlock(next)) {
			run.push(next);
			i++;
			next = blocks[i];
		}
		if (run.length === 1) result.push(run[0]);
		else {
			const group = {
				_type: "blockquoteGroup",
				_key: `${run[0]?._key ?? "quote"}-group`,
				blocks: run
			};
			result.push(group);
		}
	}
	return result;
}
//#endregion
//#region node_modules/emdash/src/components/PortableText.astro
createAstro("https://astro.build");
var $$PortableText = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PortableText;
	const { value, components: userComponents, ...rest } = Astro.props;
	const editMeta = getEditMeta(value);
	const withPlugins = mergeComponents(emdashComponents, { type: pluginBlockComponents });
	const mergedComponents = userComponents ? mergeComponents(withPlugins, userComponents) : withPlugins;
	const renderValue = Array.isArray(value) ? groupBlockquoteRuns(value) : value;
	return renderTemplate`${editMeta ? renderTemplate`${renderComponent($$result, "InlineEditor", $$InlineEditor, {
		"value": value,
		"collection": editMeta.collection,
		"entryId": editMeta.id,
		"field": editMeta.field
	})}` : renderTemplate`${renderComponent($$result, "BasePortableText", $$PortableText$1, {
		"value": renderValue,
		"components": mergedComponents,
		...rest
	})}`}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/PortableText.astro", void 0);
//#endregion
//#region node_modules/emdash/src/database/repositories/comment-reaction.ts
/**
* Repository for comment reactions (likes / emoji).
*
* Reactions are deduped per (comment, voter, reaction) by a unique index, so
* a second toggle of the same reaction by the same voter removes it.
*/
var CommentReactionRepository = class {
	db;
	constructor(db) {
		this.db = db;
	}
	/**
	* Toggle a reaction for a voter on a comment.
	*
	* @returns `{ reacted: true }` if the reaction was added, `{ reacted: false }`
	*   if an existing reaction was removed.
	*/
	async toggle(input) {
		if (((await this.db.insertInto("_emdash_comment_reactions").values({
			id: ulid(),
			comment_id: input.commentId,
			reaction: input.reaction,
			voter_hash: input.voterHash,
			created_at: (/* @__PURE__ */ new Date()).toISOString()
		}).onConflict((oc) => oc.columns([
			"comment_id",
			"voter_hash",
			"reaction"
		]).doNothing()).executeTakeFirst()).numInsertedOrUpdatedRows ?? 0n) > 0n) return { reacted: true };
		await this.db.deleteFrom("_emdash_comment_reactions").where("comment_id", "=", input.commentId).where("voter_hash", "=", input.voterHash).where("reaction", "=", input.reaction).execute();
		return { reacted: false };
	}
	/**
	* Aggregate reaction counts for a set of comments.
	*
	* @returns a Map keyed by comment id; comments with no reactions are absent.
	*/
	async countsForComments(commentIds) {
		const result = /* @__PURE__ */ new Map();
		if (commentIds.length === 0) return result;
		for (const batch of chunks(commentIds, 50)) {
			const rows = await this.db.selectFrom("_emdash_comment_reactions").select(["comment_id", "reaction"]).select((eb) => eb.fn.count("id").as("count")).where("comment_id", "in", batch).groupBy(["comment_id", "reaction"]).execute();
			for (const row of rows) {
				const counts = result.get(row.comment_id) ?? {};
				counts[row.reaction] = Number(row.count);
				result.set(row.comment_id, counts);
			}
		}
		return result;
	}
	/**
	* Which reactions a given voter has set, per comment.
	*
	* @returns a Map keyed by comment id whose values are the reaction names the
	*   voter has active on that comment.
	*/
	async viewerReactions(commentIds, voterHash) {
		const result = /* @__PURE__ */ new Map();
		if (commentIds.length === 0) return result;
		for (const batch of chunks(commentIds, 50)) {
			const rows = await this.db.selectFrom("_emdash_comment_reactions").select(["comment_id", "reaction"]).where("comment_id", "in", batch).where("voter_hash", "=", voterHash).execute();
			for (const row of rows) {
				const list = result.get(row.comment_id) ?? [];
				list.push(row.reaction);
				result.set(row.comment_id, list);
			}
		}
		return result;
	}
	/**
	* Count a voter's reactions within a recent time window (for rate limiting).
	*/
	async countRecentByVoter(voterHash, windowMinutes = 10) {
		const cutoff = (/* @__PURE__ */ new Date(Date.now() - windowMinutes * 60 * 1e3)).toISOString();
		const result = await this.db.selectFrom("_emdash_comment_reactions").select((eb) => eb.fn.count("id").as("count")).where("voter_hash", "=", voterHash).where("created_at", ">", cutoff).executeTakeFirst();
		return Number(result?.count ?? 0);
	}
};
//#endregion
//#region node_modules/emdash/src/database/repositories/comment.ts
/** Matches LIKE wildcard characters and the escape character itself */
var LIKE_ESCAPE_RE = /[%_\\]/g;
var CommentRepository = class CommentRepository {
	db;
	constructor(db) {
		this.db = db;
	}
	/**
	* Create a new comment
	*/
	async create(input) {
		const id = ulid();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await this.db.insertInto("_emdash_comments").values({
			id,
			collection: input.collection,
			content_id: input.contentId,
			parent_id: input.parentId ?? null,
			author_name: input.authorName,
			author_email: input.authorEmail,
			author_user_id: input.authorUserId ?? null,
			body: input.body,
			status: input.status ?? "pending",
			ip_hash: input.ipHash ?? null,
			user_agent: input.userAgent ?? null,
			moderation_metadata: input.moderationMetadata ? JSON.stringify(input.moderationMetadata) : null,
			created_at: now,
			updated_at: now
		}).execute();
		invalidateCommentObjectCache();
		const comment = await this.findById(id);
		if (!comment) throw new Error("Failed to create comment");
		return comment;
	}
	/**
	* Find comment by ID
	*/
	async findById(id) {
		const row = await this.db.selectFrom("_emdash_comments").selectAll().where("id", "=", id).executeTakeFirst();
		return row ? this.rowToComment(row) : null;
	}
	/**
	* Find comments for a content item with optional status filter.
	* Results are ordered by created_at ASC (oldest first) for display.
	*/
	async findByContent(collection, contentId, options = {}) {
		const limit = Math.min(options.limit || 50, 100);
		let query = this.db.selectFrom("_emdash_comments").selectAll().where("collection", "=", collection).where("content_id", "=", contentId);
		if (options.status) query = query.where("status", "=", options.status);
		if (options.cursor) {
			const decoded = decodeCursor(options.cursor);
			query = query.where((eb) => eb.or([eb("created_at", ">", decoded.orderValue), eb.and([eb("created_at", "=", decoded.orderValue), eb("id", ">", decoded.id)])]));
		}
		query = query.orderBy("created_at", "asc").orderBy("id", "asc").limit(limit + 1);
		const rows = await query.execute();
		const hasMore = rows.length > limit;
		const items = rows.slice(0, limit).map((r) => this.rowToComment(r));
		const result = { items };
		if (hasMore && items.length > 0) {
			const last = items.at(-1);
			result.nextCursor = encodeCursor(last.createdAt, last.id);
		}
		return result;
	}
	/**
	* Find comments by status (moderation inbox).
	* Results are ordered by created_at DESC (newest first).
	*/
	async findByStatus(status, options = {}) {
		const limit = Math.min(options.limit || 50, 100);
		let query = this.db.selectFrom("_emdash_comments").selectAll().where("status", "=", status);
		if (options.collection) query = query.where("collection", "=", options.collection);
		if (options.search) {
			const term = `%${options.search.replace(LIKE_ESCAPE_RE, (ch) => `\\${ch}`)}%`;
			query = query.where((eb) => eb.or([
				sql`author_name LIKE ${term} ESCAPE '\\'`,
				sql`author_email LIKE ${term} ESCAPE '\\'`,
				sql`body LIKE ${term} ESCAPE '\\'`
			]));
		}
		if (options.cursor) {
			const decoded = decodeCursor(options.cursor);
			query = query.where((eb) => eb.or([eb("created_at", "<", decoded.orderValue), eb.and([eb("created_at", "=", decoded.orderValue), eb("id", "<", decoded.id)])]));
		}
		query = query.orderBy("created_at", "desc").orderBy("id", "desc").limit(limit + 1);
		const rows = await query.execute();
		const hasMore = rows.length > limit;
		const items = rows.slice(0, limit).map((r) => this.rowToComment(r));
		const result = { items };
		if (hasMore && items.length > 0) {
			const last = items.at(-1);
			result.nextCursor = encodeCursor(last.createdAt, last.id);
		}
		return result;
	}
	/**
	* Update comment status
	*/
	async updateStatus(id, status) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await this.db.updateTable("_emdash_comments").set({
			status,
			updated_at: now
		}).where("id", "=", id).execute();
		invalidateCommentObjectCache();
		return this.findById(id);
	}
	/**
	* Bulk update comment statuses
	*/
	async bulkUpdateStatus(ids, status) {
		if (ids.length === 0) return 0;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const result = await this.db.updateTable("_emdash_comments").set({
			status,
			updated_at: now
		}).where("id", "in", ids).executeTakeFirst();
		invalidateCommentObjectCache();
		return Number(result.numUpdatedRows ?? 0);
	}
	/**
	* Hard-delete a single comment. Replies cascade via FK.
	*/
	async delete(id) {
		const result = await this.db.deleteFrom("_emdash_comments").where("id", "=", id).executeTakeFirst();
		invalidateCommentObjectCache();
		return (result.numDeletedRows ?? 0) > 0;
	}
	/**
	* Bulk hard-delete comments
	*/
	async bulkDelete(ids) {
		if (ids.length === 0) return 0;
		const result = await this.db.deleteFrom("_emdash_comments").where("id", "in", ids).executeTakeFirst();
		invalidateCommentObjectCache();
		return Number(result.numDeletedRows ?? 0);
	}
	/**
	* Delete all comments for a content item (cascade on content deletion)
	*/
	async deleteByContent(collection, contentId) {
		const result = await this.db.deleteFrom("_emdash_comments").where("collection", "=", collection).where("content_id", "=", contentId).executeTakeFirst();
		invalidateCommentObjectCache();
		return Number(result.numDeletedRows ?? 0);
	}
	/**
	* Count comments for a content item, optionally filtered by status
	*/
	async countByContent(collection, contentId, status) {
		let query = this.db.selectFrom("_emdash_comments").select((eb) => eb.fn.count("id").as("count")).where("collection", "=", collection).where("content_id", "=", contentId);
		if (status) query = query.where("status", "=", status);
		const result = await query.executeTakeFirst();
		return Number(result?.count ?? 0);
	}
	/**
	* Count comments grouped by status (for inbox badges)
	*
	* Uses four parallel COUNT queries with WHERE filters to leverage partial indexes
	* (idx_comments_pending, idx_comments_approved, idx_comments_spam, idx_comments_trash)
	* instead of a full table GROUP BY scan.
	*/
	async countByStatus() {
		const [pending, approved, spam, trash] = await Promise.all([
			this.db.selectFrom("_emdash_comments").select((eb) => eb.fn.count("id").as("count")).where("status", "=", "pending").executeTakeFirst(),
			this.db.selectFrom("_emdash_comments").select((eb) => eb.fn.count("id").as("count")).where("status", "=", "approved").executeTakeFirst(),
			this.db.selectFrom("_emdash_comments").select((eb) => eb.fn.count("id").as("count")).where("status", "=", "spam").executeTakeFirst(),
			this.db.selectFrom("_emdash_comments").select((eb) => eb.fn.count("id").as("count")).where("status", "=", "trash").executeTakeFirst()
		]);
		return {
			pending: Number(pending?.count ?? 0),
			approved: Number(approved?.count ?? 0),
			spam: Number(spam?.count ?? 0),
			trash: Number(trash?.count ?? 0)
		};
	}
	/**
	* Count approved comments from a given email address.
	* Used for "first time commenter" moderation logic.
	*/
	async countApprovedByEmail(email) {
		const result = await this.db.selectFrom("_emdash_comments").select((eb) => eb.fn.count("id").as("count")).where("author_email", "=", email).where("status", "=", "approved").executeTakeFirst();
		return Number(result?.count ?? 0);
	}
	/**
	* Update the moderation metadata JSON on a comment
	*/
	async updateModerationMetadata(id, metadata) {
		await this.db.updateTable("_emdash_comments").set({ moderation_metadata: JSON.stringify(metadata) }).where("id", "=", id).execute();
	}
	/**
	* Assemble a flat list of comments into a threaded structure (1-level nesting)
	*/
	static assembleThreads(comments) {
		const roots = [];
		const childrenMap = /* @__PURE__ */ new Map();
		for (const comment of comments) if (comment.parentId) {
			const siblings = childrenMap.get(comment.parentId) ?? [];
			siblings.push(comment);
			childrenMap.set(comment.parentId, siblings);
		} else roots.push(comment);
		return roots.map((root) => ({
			...root,
			_replies: childrenMap.get(root.id) ?? []
		}));
	}
	/**
	* Convert a Comment to its public-facing shape
	*/
	static toPublicComment(comment) {
		const pub = {
			id: comment.id,
			parentId: comment.parentId,
			authorName: comment.authorName,
			isRegisteredUser: comment.authorUserId !== null,
			body: comment.body,
			createdAt: comment.createdAt
		};
		if (comment._replies && comment._replies.length > 0) pub.replies = comment._replies.map((r) => CommentRepository.toPublicComment(r));
		return pub;
	}
	rowToComment(row) {
		return {
			id: row.id,
			collection: row.collection,
			contentId: row.content_id,
			parentId: row.parent_id,
			authorName: row.author_name,
			authorEmail: row.author_email,
			authorUserId: row.author_user_id,
			body: row.body,
			status: row.status,
			ipHash: row.ip_hash,
			userAgent: row.user_agent,
			moderationMetadata: row.moderation_metadata ? safeJsonParse(row.moderation_metadata) : null,
			createdAt: row.created_at,
			updatedAt: row.updated_at
		};
	}
};
function safeJsonParse(value) {
	try {
		return JSON.parse(value);
	} catch {
		return null;
	}
}
//#endregion
//#region node_modules/emdash/src/comments/ranking.ts
/**
* Comment ranking utilities (Tier 1 of the best-in-class comments RFC).
*
* Wilson score lower-bound (95% confidence) — the same primitive Reddit uses
* for its "Best" comment sort. Ranks by the statistical lower bound of the
* positive-reaction proportion rather than the raw count, so a comment with a
* couple of reactions can't outrank a heavily-reacted one until it earns
* confidence, and a late-but-popular comment still rises (submission time is
* irrelevant).
*
* Positive-only reactions (the recommended default) degrade gracefully: with
* `down = 0` the score still increases monotonically with `up` while penalising
* low-sample comments — wilson(1,0) ≈ 0.21, wilson(10,0) ≈ 0.73,
* wilson(200,0) ≈ 0.98.
*/
/** z for a 95% two-sided confidence interval. */
var DEFAULT_Z = 1.96;
/** Reactions that count against a comment when both signals are in use. */
var NEGATIVE_REACTIONS = /* @__PURE__ */ new Set(["dislike", "down"]);
/**
* Wilson score lower bound of the positive proportion.
*
* @param up   count of positive reactions
* @param down count of negative reactions
* @returns a score in [0, 1]; 0 when there are no reactions
*/
function wilsonLowerBound(up, down, z = DEFAULT_Z) {
	const n = up + down;
	if (n <= 0) return 0;
	const phat = up / n;
	const z2 = z * z;
	const denom = 1 + z2 / n;
	return (phat + z2 / (2 * n) - z * Math.sqrt((phat * (1 - phat) + z2 / (4 * n)) / n)) / denom;
}
/**
* Reduce a per-reaction count map to a single rank score via the Wilson
* lower bound. Any reaction not in {@link NEGATIVE_REACTIONS} is treated as
* positive, so the positive-only default (just `like`) works without special
* casing.
*/
function reactionScore(counts) {
	let up = 0;
	let down = 0;
	for (const [reaction, count] of Object.entries(counts)) if (NEGATIVE_REACTIONS.has(reaction)) down += count;
	else up += count;
	return wilsonLowerBound(up, down);
}
//#endregion
//#region node_modules/emdash/src/comments/query.ts
/**
* Get approved comments for a content item.
*
* @example
* ```ts
* import { getComments } from "emdash";
*
* const { items, total } = await getComments({
*   collection: "posts",
*   contentId: post.id,
*   threaded: true,
* });
* ```
*/
async function getComments(options) {
	const sort = options.sort ?? "oldest";
	const withReactions = options.reactions || sort === "best";
	const threaded = options.threaded ? "t" : "f";
	return cachedQuery({
		namespace: CacheNamespace.COMMENTS,
		key: `comments:${options.collection}:${options.contentId}:${threaded}:${withReactions ? "r" : "n"}:${sort}`,
		load: async () => {
			return getCommentsWithDb(await getDb(), options);
		}
	});
}
/**
* Get approved comments with an explicit db handle.
*
* @internal Use `getComments()` in templates. This variant is for routes
* that already have a database handle.
*/
async function getCommentsWithDb(db, options) {
	const repo = new CommentRepository(db);
	const total = await repo.countByContent(options.collection, options.contentId, "approved");
	const result = await repo.findByContent(options.collection, options.contentId, {
		status: "approved",
		limit: 500
	});
	const items = options.threaded ? CommentRepository.assembleThreads(result.items).map((c) => CommentRepository.toPublicComment(c)) : result.items.map((c) => CommentRepository.toPublicComment(c));
	if (options.reactions || options.sort === "best") {
		await attachReactions(db, items);
		if (options.sort === "best") sortByBest(items);
	}
	return {
		items,
		total
	};
}
/**
* Attach aggregate reaction counts to a list of public comments (and their
* replies), in a single batched query.
*/
async function attachReactions(db, items) {
	const ids = [];
	for (const comment of items) {
		ids.push(comment.id);
		if (comment.replies) for (const reply of comment.replies) ids.push(reply.id);
	}
	if (ids.length === 0) return;
	const counts = await new CommentReactionRepository(db).countsForComments(ids);
	const assign = (comment) => {
		const reactions = counts.get(comment.id);
		if (reactions) comment.reactions = reactions;
	};
	for (const comment of items) {
		assign(comment);
		comment.replies?.forEach(assign);
	}
}
/**
* Sort top-level comments by Wilson-scored reactions (descending), tie-broken
* by oldest-first to keep ordering stable.
*/
function sortByBest(items) {
	items.sort((a, b) => {
		const scoreDelta = reactionScore(b.reactions ?? {}) - reactionScore(a.reactions ?? {});
		if (scoreDelta !== 0) return scoreDelta;
		if (a.createdAt < b.createdAt) return -1;
		if (a.createdAt > b.createdAt) return 1;
		return 0;
	});
}
//#endregion
//#region node_modules/emdash/src/database/repositories/media-usage.ts
var OCCURRENCE_INSERT_BATCH_SIZE = Math.max(1, Math.floor(50 / 13));
var CONTENT_SOURCE_ELIGIBILITY = sql`(
	s.source_variant = 'draft_overlay'
	OR (
		s.source_variant = 'columns'
		AND (
			s.content_status = 'published'
			OR NOT EXISTS (
				SELECT 1
				FROM _emdash_media_usage_sources AS overlay
				WHERE overlay.source_type = 'content'
					AND overlay.collection_slug = s.collection_slug
					AND overlay.content_id = s.content_id
					AND overlay.source_variant = 'draft_overlay'
			)
		)
	)
)`;
/** Persistence-only repository for the internal media usage projection tables. */
var MediaUsageRepository = class {
	db;
	constructor(db) {
		this.db = db;
	}
	async replaceSource(source, occurrences) {
		const generation = ulid();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await withTransaction(this.db, async (trx) => {
			await this.insertOccurrences(trx, source.sourceKey, generation, occurrences, now);
			await this.upsertSource(trx, source, generation, now);
		});
		const replaced = await this.findSource(source.sourceKey);
		if (!replaced) throw new Error(`Media usage source ${source.sourceKey} was not persisted`);
		return replaced;
	}
	async replaceSourceIfCurrent(source, occurrences, expectedCurrentGeneration) {
		const generation = ulid();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const row = this.buildSourceRow(source, generation, now);
		let replaced = false;
		await withTransaction(this.db, async (trx) => {
			await this.insertOccurrences(trx, source.sourceKey, generation, occurrences, now);
			if (expectedCurrentGeneration === null) {
				replaced = await this.insertSourceIfAbsent(trx, row);
				return;
			}
			replaced = await this.updateSourceIfGeneration(trx, row, expectedCurrentGeneration);
		});
		return {
			replaced,
			source: replaced ? null : await this.findSource(source.sourceKey)
		};
	}
	async findSource(sourceKey) {
		const row = await this.db.selectFrom("_emdash_media_usage_sources").selectAll().where("source_key", "=", sourceKey).executeTakeFirst();
		return row ? rowToSource(row) : null;
	}
	async findSources(sourceKeys) {
		const uniqueSourceKeys = [...new Set(sourceKeys)];
		const sources = /* @__PURE__ */ new Map();
		if (uniqueSourceKeys.length === 0) return sources;
		for (const sourceKeyBatch of chunks(uniqueSourceKeys, 50)) {
			const rows = await this.db.selectFrom("_emdash_media_usage_sources").selectAll().where("source_key", "in", sourceKeyBatch).execute();
			for (const row of rows) {
				const source = rowToSource(row);
				sources.set(source.sourceKey, source);
			}
		}
		return sources;
	}
	async replaceSourceIfMatching(source, occurrences, expectedSource) {
		const generation = ulid();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const row = this.buildSourceRow(source, generation, now);
		let replaced = false;
		await withTransaction(this.db, async (trx) => {
			await this.insertOccurrences(trx, source.sourceKey, generation, occurrences, now);
			if (expectedSource === null) {
				replaced = await this.insertSourceIfAbsent(trx, row);
				return;
			}
			replaced = await this.updateSourceIfMatching(trx, row, expectedSource);
		});
		return {
			replaced,
			source: replaced ? null : await this.findSource(source.sourceKey)
		};
	}
	async markSourceAttempted(source) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const row = this.buildAttemptedSourceRow(source, now);
		const updates = this.attemptedSourceUpdateSet(source, row);
		await this.db.insertInto("_emdash_media_usage_sources").values(row).onConflict((oc) => oc.column("source_key").doUpdateSet(updates)).execute();
		const attempted = await this.findSource(source.sourceKey);
		if (!attempted) throw new Error(`Media usage source ${source.sourceKey} was not persisted`);
		return attempted;
	}
	async markSourceAttemptedIfMatching(source, expectedSource) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const row = this.buildAttemptedSourceRow(source, now);
		let attempted = false;
		if (expectedSource === null) attempted = await this.insertSourceIfAbsent(this.db, row);
		else attempted = await this.updateAttemptedSourceIfMatching(this.db, source, row, expectedSource);
		return {
			attempted,
			source: attempted ? null : await this.findSource(source.sourceKey)
		};
	}
	async findActiveEntryCountsByMediaIds(mediaIds) {
		const uniqueMediaIds = [...new Set(mediaIds)];
		const counts = new Map(uniqueMediaIds.map((mediaId) => [mediaId, 0]));
		for (const mediaIdBatch of chunks(uniqueMediaIds, 50)) {
			const visibleEntries = this.currentContentMediaUsageBaseQuery().select([
				"u.media_id as media_id",
				"s.collection_slug as collection_slug",
				"s.content_id as content_id"
			]).where("u.media_id", "in", mediaIdBatch).where((eb) => eb.not(eb.exists(eb.selectFrom("_emdash_media_usage_sources as deleted_source").select("deleted_source.source_key").where("deleted_source.source_type", "=", "content").whereRef("deleted_source.collection_slug", "=", "s.collection_slug").whereRef("deleted_source.content_id", "=", "s.content_id").where("deleted_source.source_variant", "in", ["columns", "draft_overlay"]).where("deleted_source.content_deleted_at", "is not", null)))).distinct().as("visible_entries");
			const rows = await this.db.selectFrom(visibleEntries).select("media_id").select((eb) => eb.fn.countAll().as("usage_count")).groupBy("media_id").execute();
			for (const row of rows) if (row.media_id !== null) counts.set(row.media_id, Number(row.usage_count));
		}
		return counts;
	}
	async findCollectionIndexStatusScopes(identity) {
		return (await this.db.selectFrom("_emdash_collections as collection").leftJoin("_emdash_media_usage_index_status as status", (join) => join.on("status.adapter_id", "=", identity.adapterId).on("status.scope_type", "=", identity.scopeType).onRef("status.scope_key", "=", "collection.slug")).select([
			"collection.slug as collection_slug",
			"status.status as status",
			"status.schema_version as schema_version"
		]).orderBy("collection.slug", "asc").execute()).map((row) => ({
			collectionSlug: row.collection_slug,
			status: row.status,
			schemaVersion: row.schema_version === null ? null : Number(row.schema_version)
		}));
	}
	async findCurrentEntryUsagePageByMediaId(mediaId, options = {}) {
		const requestedLimit = Math.floor(options.limit ?? 50);
		const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(1, requestedLimit), 100) : 50;
		const cursor = options.cursor ? decodeCursor(options.cursor) : null;
		if (cursor && (cursor.orderValue.length === 0 || cursor.id.length === 0)) throw new InvalidCursorError(options.cursor ?? "");
		let matchedGroups = this.currentContentMediaUsageBaseQuery().select(["s.collection_slug as collection_slug", "s.content_id as content_id"]).where("u.media_id", "=", mediaId).distinct();
		if (cursor) matchedGroups = matchedGroups.where((eb) => eb.or([eb("s.collection_slug", ">", cursor.orderValue), eb.and([eb("s.collection_slug", "=", cursor.orderValue), eb("s.content_id", ">", cursor.id)])]));
		matchedGroups = matchedGroups.orderBy("s.collection_slug", "asc").orderBy("s.content_id", "asc").limit(limit + 1);
		const rows = await this.db.with("matched_groups", () => matchedGroups).with("page_groups", (db) => db.selectFrom("matched_groups").selectAll().orderBy("collection_slug", "asc").orderBy("content_id", "asc").limit(limit)).with("entry_state", (db) => db.selectFrom("page_groups as page").crossJoin("_emdash_media_usage_sources as state").select(["page.collection_slug", "page.content_id"]).select((eb) => eb.fn.max("state.content_deleted_at").as("entry_deleted_at")).whereRef("page.collection_slug", "=", "state.collection_slug").whereRef("page.content_id", "=", "state.content_id").where("state.source_type", "=", "content").where("state.source_variant", "in", ["columns", "draft_overlay"]).groupBy(["page.collection_slug", "page.content_id"])).selectFrom("entry_state as page").crossJoin("_emdash_media_usage_sources as s").crossJoin("_emdash_media_usage as u").whereRef("page.collection_slug", "=", "s.collection_slug").whereRef("page.content_id", "=", "s.content_id").whereRef("s.source_key", "=", "u.source_key").whereRef("s.current_generation", "=", "u.generation").select(currentUsageSelect).select("page.entry_deleted_at").select(sql`CASE
					WHEN (SELECT COUNT(*) FROM matched_groups) > ${limit} THEN 1
					ELSE 0
				END`.as("has_more")).where("u.media_id", "=", mediaId).where("s.source_type", "=", "content").where("s.collection_slug", "is not", null).where("s.content_id", "is not", null).where("s.source_variant", "in", ["columns", "draft_overlay"]).where(CONTENT_SOURCE_ELIGIBILITY).orderBy("s.collection_slug", "asc").orderBy("s.content_id", "asc").orderBy("s.source_variant", "asc").orderBy("s.source_key", "asc").orderBy("u.field_path", "asc").orderBy("u.occurrence_index", "asc").orderBy("u.id", "asc").execute();
		const items = groupUsageRows(rows);
		const result = { items };
		if (Number(rows[0]?.has_more ?? 0) === 1 && items.length > 0) {
			const last = items.at(-1);
			result.nextCursor = encodeCursor(last.collectionSlug, last.contentId);
		}
		return result;
	}
	async findCurrentUsageByMediaId(mediaId) {
		return (await this.db.selectFrom("_emdash_media_usage_sources as s").innerJoin("_emdash_media_usage as u", (join) => join.onRef("u.source_key", "=", "s.source_key").onRef("u.generation", "=", "s.current_generation")).select(currentUsageSelect).where("u.media_id", "=", mediaId).orderBy("s.source_key", "asc").orderBy("u.field_path", "asc").orderBy("u.occurrence_index", "asc").execute()).map(rowToUsageRecord);
	}
	async findCurrentUsageByProviderAsset(provider, providerAssetId) {
		return (await this.db.selectFrom("_emdash_media_usage_sources as s").innerJoin("_emdash_media_usage as u", (join) => join.onRef("u.source_key", "=", "s.source_key").onRef("u.generation", "=", "s.current_generation")).select(currentUsageSelect).where("u.provider", "=", provider).where("u.provider_asset_id", "=", providerAssetId).orderBy("s.source_key", "asc").orderBy("u.field_path", "asc").orderBy("u.occurrence_index", "asc").execute()).map(rowToUsageRecord);
	}
	async findCurrentUsagePageByMediaId(mediaId, options = {}) {
		return this.findCurrentUsagePage((query) => query.where("u.media_id", "=", mediaId), options);
	}
	async findCurrentUsagePageByProviderAsset(provider, providerAssetId, options = {}) {
		return this.findCurrentUsagePage((query) => query.where("u.provider", "=", provider).where("u.provider_asset_id", "=", providerAssetId), options);
	}
	async deleteSource(sourceKey) {
		return this.deleteSources([sourceKey]);
	}
	async deleteSourceIfCurrent(sourceKey, expectedCurrentGeneration) {
		let deleted = false;
		await withTransaction(this.db, async (trx) => {
			const result = await trx.deleteFrom("_emdash_media_usage_sources").where("source_key", "=", sourceKey).where("current_generation", "=", expectedCurrentGeneration).executeTakeFirst();
			deleted = Number(result.numDeletedRows ?? 0) > 0;
			if (!deleted) return;
			await this.deleteSourceGenerationOccurrences(trx, sourceKey, expectedCurrentGeneration);
		});
		return {
			deleted,
			source: await this.findSource(sourceKey)
		};
	}
	async deleteSourceIfMatching(sourceKey, expectedSource) {
		let deleted = false;
		await withTransaction(this.db, async (trx) => {
			const result = await trx.deleteFrom("_emdash_media_usage_sources").where("source_key", "=", sourceKey).where(this.sourceMatchExpression(expectedSource)).executeTakeFirst();
			deleted = Number(result.numDeletedRows ?? 0) > 0;
			if (!deleted) return;
			await this.deleteSourceGenerationOccurrences(trx, sourceKey, expectedSource.currentGeneration);
		});
		return {
			deleted,
			source: await this.findSource(sourceKey)
		};
	}
	async deleteSourceIfMatchingContentAbsent(sourceKey, expectedSource, collectionSlug, contentId) {
		validateIdentifier(collectionSlug, "collection slug");
		const tableName = `ec_${collectionSlug}`;
		let deleted = false;
		await withTransaction(this.db, async (trx) => {
			const result = await trx.deleteFrom("_emdash_media_usage_sources").where("source_key", "=", sourceKey).where(this.sourceMatchExpression(expectedSource)).where(sql`NOT EXISTS (SELECT 1 FROM ${sql.ref(tableName)} WHERE id = ${contentId})`).executeTakeFirst();
			deleted = Number(result.numDeletedRows ?? 0) > 0;
			if (!deleted) return;
			await this.deleteSourceGenerationOccurrences(trx, sourceKey, expectedSource.currentGeneration);
		});
		const contentPresent = deleted ? false : await this.contentRowExists(tableName, contentId);
		return {
			deleted,
			contentPresent,
			source: deleted || contentPresent ? null : await this.findSource(sourceKey)
		};
	}
	async deleteSources(sourceKeys) {
		return this.deleteSourceKeys(sourceKeys);
	}
	async deleteContentSources(collectionSlug, contentId) {
		const sourceKeys = (await this.db.selectFrom("_emdash_media_usage_sources").select("source_key").where("source_type", "=", "content").where("collection_slug", "=", collectionSlug).where("content_id", "=", contentId).execute()).map((row) => row.source_key);
		return this.deleteSourceKeys(sourceKeys);
	}
	async deleteCollectionSources(collectionSlug) {
		let deleted = 0;
		while (true) {
			const sourceRows = await this.db.selectFrom("_emdash_media_usage_sources").select("source_key").where("source_type", "=", "content").where("collection_slug", "=", collectionSlug).orderBy("source_key", "asc").limit(50).execute();
			if (sourceRows.length === 0) break;
			deleted += await this.deleteSourceKeys(sourceRows.map((row) => row.source_key));
		}
		return deleted;
	}
	async findCollectionContentSources(collectionSlug) {
		return (await this.db.selectFrom("_emdash_media_usage_sources").selectAll().where("source_type", "=", "content").where("collection_slug", "=", collectionSlug).orderBy("source_key", "asc").execute()).map((row) => rowToSource(row));
	}
	async deleteOrphanOccurrencesOlderThan(cutoff, limit) {
		const batchLimit = Math.floor(limit);
		if (batchLimit <= 0) return 0;
		const rows = await this.db.selectFrom("_emdash_media_usage as u").leftJoin("_emdash_media_usage_sources as s", (join) => join.onRef("s.source_key", "=", "u.source_key")).select("u.id").where("s.source_key", "is", null).where("u.created_at", "<", cutoff).orderBy("u.created_at", "asc").orderBy("u.id", "asc").limit(batchLimit).execute();
		let deleted = 0;
		for (const idBatch of chunks(rows.map((row) => row.id), 50)) {
			const result = await this.db.deleteFrom("_emdash_media_usage").where("id", "in", idBatch).where("created_at", "<", cutoff).where(sql`NOT EXISTS (SELECT 1 FROM _emdash_media_usage_sources s WHERE s.source_key = _emdash_media_usage.source_key)`).executeTakeFirst();
			deleted += Number(result.numDeletedRows ?? 0);
		}
		return deleted;
	}
	async deleteStaleGenerationsOlderThan(cutoff, limit) {
		const batchLimit = Math.floor(limit);
		if (batchLimit <= 0) return 0;
		const ids = (await this.db.selectFrom("_emdash_media_usage as u").innerJoin("_emdash_media_usage_sources as s", (join) => join.onRef("s.source_key", "=", "u.source_key")).select("u.id").where("u.created_at", "<", cutoff).whereRef("u.generation", "!=", "s.current_generation").whereRef("u.created_at", "<", "s.indexed_at").orderBy("u.created_at", "asc").orderBy("u.id", "asc").limit(batchLimit).execute()).map((row) => row.id);
		if (ids.length === 0) return 0;
		let deleted = 0;
		for (const idBatch of chunks(ids, 50)) {
			const result = await this.db.deleteFrom("_emdash_media_usage").where("id", "in", idBatch).where("created_at", "<", cutoff).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_sources as s").select("s.source_key").whereRef("s.source_key", "=", "_emdash_media_usage.source_key").whereRef("s.current_generation", "!=", "_emdash_media_usage.generation").whereRef("_emdash_media_usage.created_at", "<", "s.indexed_at"))).executeTakeFirst();
			deleted += Number(result.numDeletedRows ?? 0);
		}
		return deleted;
	}
	async deleteAbandonedGenerationsOlderThan(cutoff, limit) {
		const batchLimit = Math.floor(limit);
		if (batchLimit <= 0) return 0;
		const rows = await this.db.selectFrom("_emdash_media_usage as u").innerJoin("_emdash_media_usage_sources as s", (join) => join.onRef("s.source_key", "=", "u.source_key")).select("u.id").where("u.created_at", "<", cutoff).whereRef("u.generation", "!=", "s.current_generation").whereRef("u.created_at", ">=", "s.indexed_at").orderBy("u.created_at", "asc").orderBy("u.id", "asc").limit(batchLimit).execute();
		let deleted = 0;
		for (const idBatch of chunks(rows.map((row) => row.id), 50)) {
			const result = await this.db.deleteFrom("_emdash_media_usage").where("id", "in", idBatch).where("created_at", "<", cutoff).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_sources as s").select("s.source_key").whereRef("s.source_key", "=", "_emdash_media_usage.source_key").whereRef("s.current_generation", "!=", "_emdash_media_usage.generation").whereRef("_emdash_media_usage.created_at", ">=", "s.indexed_at"))).executeTakeFirst();
			deleted += Number(result.numDeletedRows ?? 0);
		}
		return deleted;
	}
	async upsertIndexStatus(input) {
		const now = input.updatedAt ?? (/* @__PURE__ */ new Date()).toISOString();
		const row = {
			adapter_id: input.adapterId,
			scope_type: input.scopeType,
			scope_key: input.scopeKey,
			status: input.status,
			schema_version: input.schemaVersion ?? 1,
			started_at: input.startedAt ?? null,
			completed_at: input.completedAt ?? null,
			cursor: input.cursor ?? null,
			indexed_source_count: input.indexedSourceCount ?? 0,
			failed_source_count: input.failedSourceCount ?? 0,
			last_error_code: input.lastErrorCode ?? null,
			updated_at: now
		};
		await this.db.insertInto("_emdash_media_usage_index_status").values(row).onConflict((oc) => oc.columns([
			"adapter_id",
			"scope_type",
			"scope_key"
		]).doUpdateSet({
			status: row.status,
			schema_version: row.schema_version,
			started_at: row.started_at,
			completed_at: row.completed_at,
			cursor: row.cursor,
			indexed_source_count: row.indexed_source_count,
			failed_source_count: row.failed_source_count,
			last_error_code: row.last_error_code,
			updated_at: row.updated_at
		})).execute();
		const status = await this.findIndexStatus(input);
		if (!status) throw new Error(`Media usage index status ${input.adapterId}:${input.scopeType}:${input.scopeKey} was not persisted`);
		return status;
	}
	async beginIndexStatusRepair(input) {
		return this.upsertIndexStatus({
			adapterId: input.adapterId,
			scopeType: input.scopeType,
			scopeKey: input.scopeKey,
			status: "running",
			schemaVersion: input.schemaVersion,
			startedAt: input.startedAt,
			completedAt: null,
			cursor: input.runToken,
			indexedSourceCount: 0,
			failedSourceCount: 0,
			lastErrorCode: null,
			updatedAt: input.updatedAt
		});
	}
	async finalizeIndexStatusRepairIfRunning(input) {
		const updates = {
			status: input.status,
			completed_at: input.completedAt,
			cursor: null,
			indexed_source_count: input.indexedSourceCount ?? 0,
			failed_source_count: input.failedSourceCount ?? 0,
			last_error_code: input.lastErrorCode ?? null,
			updated_at: input.updatedAt ?? (/* @__PURE__ */ new Date()).toISOString()
		};
		if (input.schemaVersion !== void 0) updates.schema_version = input.schemaVersion;
		const result = await this.db.updateTable("_emdash_media_usage_index_status").set(updates).where("adapter_id", "=", input.adapterId).where("scope_type", "=", input.scopeType).where("scope_key", "=", input.scopeKey).where("status", "=", "running").where("cursor", "=", input.runToken).executeTakeFirst();
		return {
			finalized: Number(result.numUpdatedRows ?? 0) > 0,
			status: await this.findIndexStatus(input)
		};
	}
	async findIndexStatus(identity) {
		const row = await this.db.selectFrom("_emdash_media_usage_index_status").selectAll().where("adapter_id", "=", identity.adapterId).where("scope_type", "=", identity.scopeType).where("scope_key", "=", identity.scopeKey).executeTakeFirst();
		return row ? rowToIndexStatus(row) : null;
	}
	async deleteIndexStatus(identity) {
		const result = await this.db.deleteFrom("_emdash_media_usage_index_status").where("adapter_id", "=", identity.adapterId).where("scope_type", "=", identity.scopeType).where("scope_key", "=", identity.scopeKey).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
	async findCurrentUsagePage(applyFilter, options) {
		const limit = Math.min(Math.max(1, options.limit ?? 50), 100);
		let query = applyFilter(this.currentUsageBaseQuery()).orderBy("u.id", "asc").limit(limit + 1);
		if (options.cursor) {
			const { id } = decodeCursor(options.cursor);
			query = query.where("u.id", ">", id);
		}
		const rows = await query.execute();
		const items = rows.slice(0, limit).map(rowToUsageRecord);
		const result = { items };
		if (rows.length > limit && items.length > 0) {
			const last = items.at(-1);
			result.nextCursor = encodeCursor(last.occurrence.id, last.occurrence.id);
		}
		return result;
	}
	currentUsageBaseQuery() {
		return this.db.selectFrom("_emdash_media_usage_sources as s").innerJoin("_emdash_media_usage as u", (join) => join.onRef("u.source_key", "=", "s.source_key").onRef("u.generation", "=", "s.current_generation")).select(currentUsageSelect);
	}
	currentContentMediaUsageBaseQuery() {
		return this.db.selectFrom("_emdash_media_usage as u").crossJoin("_emdash_media_usage_sources as s").innerJoin("_emdash_collections as collection", "collection.slug", "s.collection_slug").whereRef("s.source_key", "=", "u.source_key").whereRef("s.current_generation", "=", "u.generation").where("s.source_type", "=", "content").where("s.collection_slug", "is not", null).where("s.content_id", "is not", null).where("s.source_variant", "in", ["columns", "draft_overlay"]).where(CONTENT_SOURCE_ELIGIBILITY);
	}
	async deleteSourceKeys(sourceKeys) {
		const uniqueSourceKeys = [...new Set(sourceKeys)];
		if (uniqueSourceKeys.length === 0) return 0;
		return withTransaction(this.db, async (trx) => {
			let deleted = 0;
			for (const sourceKeyBatch of chunks(uniqueSourceKeys, 50)) {
				const result = await trx.deleteFrom("_emdash_media_usage_sources").where("source_key", "in", sourceKeyBatch).executeTakeFirst();
				deleted += Number(result.numDeletedRows ?? 0);
				await trx.deleteFrom("_emdash_media_usage").where("source_key", "in", sourceKeyBatch).execute();
			}
			return deleted;
		});
	}
	async deleteSourceGenerationOccurrences(db, sourceKey, generation) {
		await db.deleteFrom("_emdash_media_usage").where("source_key", "=", sourceKey).where("generation", "=", generation).execute();
	}
	async insertOccurrences(db, sourceKey, generation, occurrences, now) {
		if (occurrences.length === 0) return;
		const rows = occurrences.map((occurrence) => ({
			id: ulid(),
			source_key: sourceKey,
			generation,
			field_slug: occurrence.fieldSlug,
			field_path: occurrence.fieldPath,
			occurrence_index: occurrence.occurrenceIndex ?? 0,
			reference_type: occurrence.referenceType,
			media_id: occurrence.mediaId,
			provider: occurrence.provider,
			provider_asset_id: occurrence.providerAssetId,
			media_kind: occurrence.mediaKind ?? null,
			mime_type: occurrence.mimeType ?? null,
			created_at: now
		}));
		for (const rowBatch of chunks(rows, OCCURRENCE_INSERT_BATCH_SIZE)) await db.insertInto("_emdash_media_usage").values(rowBatch).execute();
	}
	async upsertSource(db, source, generation, now) {
		const row = this.buildSourceRow(source, generation, now);
		await db.insertInto("_emdash_media_usage_sources").values(row).onConflict((oc) => oc.column("source_key").doUpdateSet(this.sourceUpdateSet(row))).execute();
	}
	async insertSourceIfAbsent(db, row) {
		return ((await db.insertInto("_emdash_media_usage_sources").values(row).onConflict((oc) => oc.column("source_key").doNothing()).executeTakeFirst()).numInsertedOrUpdatedRows ?? 0n) > 0n;
	}
	async updateSourceIfGeneration(db, row, expectedCurrentGeneration) {
		const result = await db.updateTable("_emdash_media_usage_sources").set(this.sourceUpdateSet(row)).where("source_key", "=", row.source_key).where("current_generation", "=", expectedCurrentGeneration).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	async updateSourceIfMatching(db, row, expectedSource) {
		const result = await db.updateTable("_emdash_media_usage_sources").set(this.sourceUpdateSet(row)).where("source_key", "=", row.source_key).where(this.sourceMatchExpression(expectedSource)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	async updateAttemptedSourceIfMatching(db, source, row, expectedSource) {
		const result = await db.updateTable("_emdash_media_usage_sources").set(this.attemptedSourceUpdateSet(source, row)).where("source_key", "=", row.source_key).where(this.sourceMatchExpression(expectedSource)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	sourceMatchExpression(expectedSource) {
		return (eb) => eb.and([
			eb("current_generation", "=", expectedSource.currentGeneration),
			eb("source_completeness", "=", expectedSource.sourceCompleteness),
			this.nullableStringExpression(eb, "updated_at", expectedSource.updatedAt),
			this.nullableStringExpression(eb, "source_fingerprint", expectedSource.sourceFingerprint),
			this.nullableStringExpression(eb, "source_updated_at", expectedSource.sourceUpdatedAt),
			this.nullableNumberExpression(eb, "source_version", expectedSource.sourceVersion),
			this.nullableStringExpression(eb, "revision_id", expectedSource.revisionId),
			this.nullableStringExpression(eb, "last_attempted_at", expectedSource.lastAttemptedAt),
			this.nullableStringExpression(eb, "last_error_code", expectedSource.lastErrorCode)
		]);
	}
	nullableStringExpression(eb, column, value) {
		return value === null ? eb(column, "is", null) : eb(column, "=", value);
	}
	nullableNumberExpression(eb, column, value) {
		return value === null ? eb(column, "is", null) : eb(column, "=", value);
	}
	async contentRowExists(tableName, contentId) {
		return (await sql`
			SELECT id
			FROM ${sql.ref(tableName)}
			WHERE id = ${contentId}
			LIMIT 1
		`.execute(this.db)).rows.length > 0;
	}
	buildSourceRow(source, generation, now) {
		return {
			source_key: source.sourceKey,
			source_type: source.sourceType,
			collection_slug: source.collectionSlug ?? null,
			content_id: source.contentId ?? null,
			source_variant: source.sourceVariant,
			locale: source.locale ?? null,
			translation_group: source.translationGroup ?? null,
			content_slug: source.contentSlug ?? null,
			content_title: source.contentTitle ?? null,
			content_status: source.contentStatus ?? null,
			content_scheduled_at: source.contentScheduledAt ?? null,
			content_deleted_at: source.contentDeletedAt ?? null,
			revision_id: source.revisionId ?? null,
			current_generation: generation,
			schema_version: source.schemaVersion ?? 1,
			source_updated_at: source.sourceUpdatedAt ?? null,
			source_version: source.sourceVersion ?? null,
			source_fingerprint: source.sourceFingerprint ?? null,
			source_completeness: source.sourceCompleteness ?? "complete",
			last_attempted_at: source.lastAttemptedAt ?? now,
			last_error_code: null,
			indexed_at: now,
			updated_at: now
		};
	}
	buildAttemptedSourceRow(source, now) {
		return {
			source_key: source.sourceKey,
			source_type: source.sourceType,
			collection_slug: source.collectionSlug ?? null,
			content_id: source.contentId ?? null,
			source_variant: source.sourceVariant,
			locale: source.locale ?? null,
			translation_group: source.translationGroup ?? null,
			content_slug: source.contentSlug ?? null,
			content_title: source.contentTitle ?? null,
			content_status: source.contentStatus ?? null,
			content_scheduled_at: source.contentScheduledAt ?? null,
			content_deleted_at: source.contentDeletedAt ?? null,
			revision_id: source.revisionId ?? null,
			current_generation: ulid(),
			schema_version: source.schemaVersion ?? 1,
			source_updated_at: source.sourceUpdatedAt ?? null,
			source_version: source.sourceVersion ?? null,
			source_fingerprint: source.sourceFingerprint ?? null,
			source_completeness: source.sourceCompleteness ?? (source.lastErrorCode ? "failed" : "unknown"),
			last_attempted_at: source.lastAttemptedAt ?? now,
			last_error_code: source.lastErrorCode ?? null,
			indexed_at: now,
			updated_at: now
		};
	}
	attemptedSourceUpdateSet(source, row) {
		const updates = {
			source_type: row.source_type,
			source_variant: row.source_variant,
			source_completeness: row.source_completeness,
			last_attempted_at: row.last_attempted_at,
			last_error_code: row.last_error_code,
			updated_at: row.updated_at
		};
		if (source.collectionSlug !== void 0) updates.collection_slug = row.collection_slug;
		if (source.contentId !== void 0) updates.content_id = row.content_id;
		if (source.locale !== void 0) updates.locale = row.locale;
		if (source.translationGroup !== void 0) updates.translation_group = row.translation_group;
		if (source.contentSlug !== void 0) updates.content_slug = row.content_slug;
		if (source.contentTitle !== void 0) updates.content_title = row.content_title;
		if (source.contentStatus !== void 0) updates.content_status = row.content_status;
		if (source.contentScheduledAt !== void 0) updates.content_scheduled_at = row.content_scheduled_at;
		if (source.contentDeletedAt !== void 0) updates.content_deleted_at = row.content_deleted_at;
		if (source.revisionId !== void 0) updates.revision_id = row.revision_id;
		if (source.schemaVersion !== void 0) updates.schema_version = row.schema_version;
		if (source.sourceUpdatedAt !== void 0) updates.source_updated_at = row.source_updated_at;
		if (source.sourceVersion !== void 0) updates.source_version = row.source_version;
		if (source.sourceFingerprint !== void 0) updates.source_fingerprint = row.source_fingerprint;
		return updates;
	}
	sourceUpdateSet(row) {
		return {
			source_type: row.source_type,
			collection_slug: row.collection_slug,
			content_id: row.content_id,
			source_variant: row.source_variant,
			locale: row.locale,
			translation_group: row.translation_group,
			content_slug: row.content_slug,
			content_title: row.content_title,
			content_status: row.content_status,
			content_scheduled_at: row.content_scheduled_at,
			content_deleted_at: row.content_deleted_at,
			revision_id: row.revision_id,
			current_generation: row.current_generation,
			schema_version: row.schema_version,
			source_updated_at: row.source_updated_at,
			source_version: row.source_version,
			source_fingerprint: row.source_fingerprint,
			source_completeness: row.source_completeness,
			last_attempted_at: row.last_attempted_at,
			last_error_code: row.last_error_code,
			indexed_at: row.indexed_at,
			updated_at: row.updated_at
		};
	}
};
var currentUsageSelect = [
	"s.source_key as source_key",
	"s.source_type as source_type",
	"s.collection_slug as collection_slug",
	"s.content_id as content_id",
	"s.source_variant as source_variant",
	"s.locale as locale",
	"s.translation_group as translation_group",
	"s.content_slug as content_slug",
	"s.content_title as content_title",
	"s.content_status as content_status",
	"s.content_scheduled_at as content_scheduled_at",
	"s.content_deleted_at as content_deleted_at",
	"s.revision_id as revision_id",
	"s.current_generation as current_generation",
	"s.schema_version as schema_version",
	"s.source_updated_at as source_updated_at",
	"s.source_version as source_version",
	"s.source_fingerprint as source_fingerprint",
	"s.source_completeness as source_completeness",
	"s.last_attempted_at as last_attempted_at",
	"s.last_error_code as last_error_code",
	"s.indexed_at as indexed_at",
	"s.created_at as source_created_at",
	"s.updated_at as source_row_updated_at",
	"u.id as occurrence_id",
	"u.generation as generation",
	"u.field_slug as field_slug",
	"u.field_path as field_path",
	"u.occurrence_index as occurrence_index",
	"u.reference_type as reference_type",
	"u.media_id as media_id",
	"u.provider as provider",
	"u.provider_asset_id as provider_asset_id",
	"u.media_kind as media_kind",
	"u.mime_type as mime_type",
	"u.created_at as occurrence_created_at"
];
function groupUsageRows(rows) {
	const groups = [];
	for (const row of rows) {
		if (row.collection_slug === null || row.content_id === null) continue;
		const record = rowToUsageRecord(row);
		let group = groups.at(-1);
		if (!group || group.collectionSlug !== row.collection_slug || group.contentId !== row.content_id) {
			group = {
				collectionSlug: row.collection_slug,
				contentId: row.content_id,
				contentDeletedAt: row.entry_deleted_at,
				sources: []
			};
			groups.push(group);
		}
		let source = group.sources.at(-1);
		if (!source || source.source.sourceKey !== record.source.sourceKey) {
			source = {
				source: record.source,
				occurrences: []
			};
			group.sources.push(source);
		}
		source.occurrences.push(record.occurrence);
	}
	return groups;
}
function rowToSource(row) {
	return {
		sourceKey: row.source_key,
		sourceType: row.source_type,
		collectionSlug: row.collection_slug,
		contentId: row.content_id,
		sourceVariant: row.source_variant,
		locale: row.locale,
		translationGroup: row.translation_group,
		contentSlug: row.content_slug,
		contentTitle: row.content_title,
		contentStatus: row.content_status,
		contentScheduledAt: row.content_scheduled_at,
		contentDeletedAt: row.content_deleted_at,
		revisionId: row.revision_id,
		currentGeneration: row.current_generation,
		schemaVersion: Number(row.schema_version),
		sourceUpdatedAt: row.source_updated_at,
		sourceVersion: row.source_version === null ? null : Number(row.source_version),
		sourceFingerprint: row.source_fingerprint,
		sourceCompleteness: row.source_completeness,
		lastAttemptedAt: row.last_attempted_at,
		lastErrorCode: row.last_error_code,
		indexedAt: row.indexed_at,
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
function rowToOccurrence(row) {
	return {
		id: row.id,
		sourceKey: row.source_key,
		generation: row.generation,
		fieldSlug: row.field_slug,
		fieldPath: row.field_path,
		occurrenceIndex: Number(row.occurrence_index),
		referenceType: row.reference_type,
		mediaId: row.media_id,
		provider: row.provider,
		providerAssetId: row.provider_asset_id,
		mediaKind: row.media_kind,
		mimeType: row.mime_type,
		createdAt: row.created_at
	};
}
function rowToUsageRecord(row) {
	return {
		source: rowToSource({
			source_key: row.source_key,
			source_type: row.source_type,
			collection_slug: row.collection_slug,
			content_id: row.content_id,
			source_variant: row.source_variant,
			locale: row.locale,
			translation_group: row.translation_group,
			content_slug: row.content_slug,
			content_title: row.content_title,
			content_status: row.content_status,
			content_scheduled_at: row.content_scheduled_at,
			content_deleted_at: row.content_deleted_at,
			revision_id: row.revision_id,
			current_generation: row.current_generation,
			schema_version: row.schema_version,
			source_updated_at: row.source_updated_at,
			source_version: row.source_version,
			source_fingerprint: row.source_fingerprint,
			source_completeness: row.source_completeness,
			last_attempted_at: row.last_attempted_at,
			last_error_code: row.last_error_code,
			indexed_at: row.indexed_at,
			created_at: row.source_created_at,
			updated_at: row.source_row_updated_at
		}),
		occurrence: rowToOccurrence({
			id: row.occurrence_id,
			source_key: row.source_key,
			generation: row.generation,
			field_slug: row.field_slug,
			field_path: row.field_path,
			occurrence_index: row.occurrence_index,
			reference_type: row.reference_type,
			media_id: row.media_id,
			provider: row.provider,
			provider_asset_id: row.provider_asset_id,
			media_kind: row.media_kind,
			mime_type: row.mime_type,
			created_at: row.occurrence_created_at
		})
	};
}
function rowToIndexStatus(row) {
	return {
		adapterId: row.adapter_id,
		scopeType: row.scope_type,
		scopeKey: row.scope_key,
		status: row.status,
		schemaVersion: Number(row.schema_version),
		startedAt: row.started_at,
		completedAt: row.completed_at,
		cursor: row.cursor,
		indexedSourceCount: Number(row.indexed_source_count),
		failedSourceCount: Number(row.failed_source_count),
		lastErrorCode: row.last_error_code,
		updatedAt: row.updated_at
	};
}
//#endregion
//#region node_modules/emdash/src/media/normalize.ts
var INTERNAL_MEDIA_PREFIX = "/_emdash/api/media/file/";
//#endregion
//#region node_modules/emdash/src/media/usage/content-refresh.ts
var CONTENT_MEDIA_USAGE_ADAPTER_ID = "content-media";
var CONTENT_MEDIA_USAGE_COLLECTION_SCOPE = "collection";
var CONTENT_USAGE_COLLECTION_LOCKS_KEY = Symbol.for("emdash.mediaUsage.collectionLocks");
var ZERO_RESULT = {
	success: true,
	refreshedSourceCount: 0,
	deletedSourceCount: 0,
	failedSourceCount: 0
};
async function deleteContentMediaUsageCollection(db, collectionSlug) {
	validateIdentifier(collectionSlug, "collection slug");
	return withContentUsageCollectionLock(collectionSlug, () => deleteContentMediaUsageCollectionUnlocked(db, collectionSlug));
}
async function deleteContentMediaUsageCollectionUnlocked(db, collectionSlug) {
	try {
		const repo = new MediaUsageRepository(db);
		const deletedSourceCount = await repo.deleteCollectionSources(collectionSlug);
		await repo.deleteIndexStatus({
			adapterId: CONTENT_MEDIA_USAGE_ADAPTER_ID,
			scopeType: CONTENT_MEDIA_USAGE_COLLECTION_SCOPE,
			scopeKey: collectionSlug
		});
		return {
			...ZERO_RESULT,
			deletedSourceCount
		};
	} catch (error) {
		console.error(`[media-usage] Failed to delete usage for collection ${collectionSlug}:`, error);
		try {
			await new MediaUsageRepository(db).deleteIndexStatus({
				adapterId: CONTENT_MEDIA_USAGE_ADAPTER_ID,
				scopeType: CONTENT_MEDIA_USAGE_COLLECTION_SCOPE,
				scopeKey: collectionSlug
			});
		} catch (statusError) {
			console.error(`[media-usage] Failed to clear usage status for deleted collection ${collectionSlug}:`, statusError);
		}
		return {
			success: false,
			refreshedSourceCount: 0,
			deletedSourceCount: 0,
			failedSourceCount: 0,
			errorCode: "CONTENT_USAGE_DELETE_ERROR"
		};
	}
}
async function markContentMediaUsageCollectionStale(db, collectionSlug, lastErrorCode) {
	validateIdentifier(collectionSlug, "collection slug");
	const repo = new MediaUsageRepository(db);
	const identity = {
		adapterId: CONTENT_MEDIA_USAGE_ADAPTER_ID,
		scopeType: CONTENT_MEDIA_USAGE_COLLECTION_SCOPE,
		scopeKey: collectionSlug
	};
	const existing = await repo.findIndexStatus(identity);
	await repo.upsertIndexStatus({
		...identity,
		status: "stale",
		schemaVersion: existing?.schemaVersion ?? 1,
		startedAt: existing?.startedAt ?? null,
		completedAt: existing?.completedAt ?? null,
		cursor: existing?.cursor ?? null,
		indexedSourceCount: existing?.indexedSourceCount ?? 0,
		failedSourceCount: existing?.failedSourceCount ?? 0,
		lastErrorCode
	});
}
async function markContentMediaUsageCollectionStaleSafely(db, collectionSlug, lastErrorCode) {
	try {
		await markContentMediaUsageCollectionStale(db, collectionSlug, lastErrorCode);
		return true;
	} catch (error) {
		console.error(`[media-usage] Failed to mark ${collectionSlug} stale:`, error);
		return false;
	}
}
async function withContentUsageCollectionLock(collectionSlug, fn) {
	const locks = getContentUsageCollectionLocks();
	const previous = locks.get(collectionSlug) ?? Promise.resolve();
	let releaseCurrent;
	const current = new Promise((resolve) => {
		releaseCurrent = resolve;
	});
	const next = previous.catch(() => {}).then(() => current);
	locks.set(collectionSlug, next);
	try {
		await previous.catch(() => {});
		return await fn();
	} finally {
		releaseCurrent();
		if (locks.get(collectionSlug) === next) locks.delete(collectionSlug);
	}
}
function getContentUsageCollectionLocks() {
	const global = globalThis;
	const existing = global[CONTENT_USAGE_COLLECTION_LOCKS_KEY];
	if (existing instanceof Map) return existing;
	const locks = /* @__PURE__ */ new Map();
	global[CONTENT_USAGE_COLLECTION_LOCKS_KEY] = locks;
	return locks;
}
//#endregion
//#region node_modules/emdash/src/search/fts-manager.ts
/**
* FTS5 Manager
*
* Handles creation, deletion, and management of FTS5 virtual tables
* for full-text search on content collections.
*/
var FTSManager = class {
	db;
	constructor(db) {
		this.db = db;
	}
	/**
	* Validate a collection slug and its searchable field names.
	* Must be called before any raw SQL interpolation.
	*/
	validateInputs(collectionSlug, searchableFields) {
		validateIdentifier(collectionSlug, "collection slug");
		if (searchableFields) for (const field of searchableFields) validateIdentifier(field, "searchable field name");
	}
	/**
	* Get the FTS table name for a collection
	* Uses _emdash_ prefix to clearly mark as internal/system table
	*/
	getFtsTableName(collectionSlug) {
		validateIdentifier(collectionSlug, "collection slug");
		return `_emdash_fts_${collectionSlug}`;
	}
	/**
	* Get the content table name for a collection
	*/
	getContentTableName(collectionSlug) {
		validateIdentifier(collectionSlug, "collection slug");
		return `ec_${collectionSlug}`;
	}
	/**
	* Check if an FTS table exists for a collection
	*/
	async ftsTableExists(collectionSlug) {
		const ftsTable = this.getFtsTableName(collectionSlug);
		return tableExists(this.db, ftsTable);
	}
	/**
	* Create an FTS5 virtual table for a collection.
	* FTS5 is SQLite-only; on other dialects this is a no-op.
	*
	* @param collectionSlug - The collection slug
	* @param searchableFields - Array of field names to index
	* @param weights - Optional field weights for ranking
	*/
	async createFtsTable(collectionSlug, searchableFields, _weights) {
		if (!isSqlite(this.db)) return;
		this.validateInputs(collectionSlug, searchableFields);
		const ftsTable = this.getFtsTableName(collectionSlug);
		const contentTable = this.getContentTableName(collectionSlug);
		const columns = [
			"id UNINDEXED",
			"locale UNINDEXED",
			...searchableFields
		].join(", ");
		await sql.raw(`
			CREATE VIRTUAL TABLE IF NOT EXISTS "${ftsTable}" USING fts5(
				${columns},
				content='${contentTable}',
				content_rowid='rowid',
				tokenize='porter unicode61'
			)
		`).execute(this.db);
		await this.createTriggers(collectionSlug, searchableFields);
	}
	/**
	* Create triggers to keep FTS table in sync with content table.
	*
	* The insert and update triggers only add rows to the FTS index when
	* `deleted_at IS NULL`. This keeps soft-deleted content out of the
	* search index and ensures the FTS row count matches the non-deleted
	* content count (which `verifyAndRepairIndex` relies on).
	*
	* IMPORTANT: The FTS5 virtual table is created with `content='ec_<slug>'`
	* which makes it an *external content* FTS5 table. For external-content
	* tables, removing a row must use the documented `'delete'` command and
	* supply the OLD column values explicitly, e.g.:
	*
	*     INSERT INTO fts(fts, rowid, col1, col2)
	*     VALUES('delete', OLD.rowid, OLD.col1, OLD.col2);
	*
	* Using `DELETE FROM fts WHERE rowid = OLD.rowid` is the correct form
	* for *contentless* tables but is unsafe for external-content tables:
	* FTS5 then reads column values from the backing content table, which
	* in an AFTER UPDATE trigger already holds the NEW values. The wrong
	* tokens get removed and the inverted index drifts out of sync until
	* SQLite raises `SQLITE_CORRUPT_VTAB` on the next mutation. See
	* https://www.sqlite.org/fts5.html#external_content_tables.
	*
	* The UPDATE and DELETE triggers gate the `'delete'` on
	* `OLD.deleted_at IS NULL` because the INSERT trigger never indexed
	* rows that were already soft-deleted. Issuing `'delete'` for a rowid
	* that was never inserted into the FTS index is itself a corruption
	* trigger -- FTS5's `'delete'` is not a no-op on missing rowids and
	* raises `SQLITE_CORRUPT_VTAB`. Affected paths include restore-from-
	* trash (UPDATE where `OLD.deleted_at IS NOT NULL`), permanent-delete
	* from trash (DELETE on a soft-deleted row), and any edit on a row
	* that's currently in the trash.
	*/
	async createTriggers(collectionSlug, searchableFields) {
		this.validateInputs(collectionSlug, searchableFields);
		if (searchableFields.length === 0) throw new Error(`Cannot create FTS triggers for collection "${collectionSlug}": no searchable fields. Mark at least one field as searchable before enabling search.`);
		const ftsTable = this.getFtsTableName(collectionSlug);
		const contentTable = this.getContentTableName(collectionSlug);
		const fieldList = searchableFields.join(", ");
		const newFieldList = searchableFields.map((f) => `NEW.${f}`).join(", ");
		const oldFieldList = searchableFields.map((f) => `OLD.${f}`).join(", ");
		await sql.raw(`
			CREATE TRIGGER IF NOT EXISTS "${ftsTable}_insert" 
			AFTER INSERT ON "${contentTable}" 
			WHEN NEW.deleted_at IS NULL
			BEGIN
				INSERT INTO "${ftsTable}"(rowid, id, locale, ${fieldList})
				VALUES (NEW.rowid, NEW.id, NEW.locale, ${newFieldList});
			END
		`).execute(this.db);
		await sql.raw(`
			CREATE TRIGGER IF NOT EXISTS "${ftsTable}_update" 
			AFTER UPDATE ON "${contentTable}" 
			BEGIN
				INSERT INTO "${ftsTable}"("${ftsTable}", rowid, id, locale, ${fieldList})
				SELECT 'delete', OLD.rowid, OLD.id, OLD.locale, ${oldFieldList}
				WHERE OLD.deleted_at IS NULL;
				INSERT INTO "${ftsTable}"(rowid, id, locale, ${fieldList})
				SELECT NEW.rowid, NEW.id, NEW.locale, ${newFieldList}
				WHERE NEW.deleted_at IS NULL;
			END
		`).execute(this.db);
		await sql.raw(`
			CREATE TRIGGER IF NOT EXISTS "${ftsTable}_delete" 
			AFTER DELETE ON "${contentTable}" 
			BEGIN
				INSERT INTO "${ftsTable}"("${ftsTable}", rowid, id, locale, ${fieldList})
				SELECT 'delete', OLD.rowid, OLD.id, OLD.locale, ${oldFieldList}
				WHERE OLD.deleted_at IS NULL;
			END
		`).execute(this.db);
	}
	/**
	* Drop triggers for a collection
	*/
	async dropTriggers(collectionSlug) {
		this.validateInputs(collectionSlug);
		const ftsTable = this.getFtsTableName(collectionSlug);
		await sql.raw(`DROP TRIGGER IF EXISTS "${ftsTable}_insert"`).execute(this.db);
		await sql.raw(`DROP TRIGGER IF EXISTS "${ftsTable}_update"`).execute(this.db);
		await sql.raw(`DROP TRIGGER IF EXISTS "${ftsTable}_delete"`).execute(this.db);
	}
	/**
	* Drop the FTS table and triggers for a collection
	*/
	async dropFtsTable(collectionSlug) {
		if (!isSqlite(this.db)) return;
		this.validateInputs(collectionSlug);
		const ftsTable = this.getFtsTableName(collectionSlug);
		await this.dropTriggers(collectionSlug);
		await sql.raw(`DROP TABLE IF EXISTS "${ftsTable}"`).execute(this.db);
	}
	/**
	* Rebuild the FTS index for a collection
	*
	* This is useful after bulk imports or if the index gets out of sync.
	*/
	async rebuildIndex(collectionSlug, searchableFields, weights) {
		if (!isSqlite(this.db)) return;
		await this.dropFtsTable(collectionSlug);
		await this.createFtsTable(collectionSlug, searchableFields, weights);
		await this.populateFromContent(collectionSlug, searchableFields);
	}
	/**
	* Populate the FTS table from existing content
	*/
	async populateFromContent(collectionSlug, searchableFields) {
		if (!isSqlite(this.db)) return;
		this.validateInputs(collectionSlug, searchableFields);
		const ftsTable = this.getFtsTableName(collectionSlug);
		const contentTable = this.getContentTableName(collectionSlug);
		const fieldList = searchableFields.join(", ");
		await sql.raw(`
			INSERT INTO "${ftsTable}"(rowid, id, locale, ${fieldList})
			SELECT rowid, id, locale, ${fieldList} FROM "${contentTable}"
			WHERE deleted_at IS NULL
		`).execute(this.db);
	}
	/**
	* Get the search configuration for a collection
	*/
	async getSearchConfig(collectionSlug) {
		const result = await this.db.selectFrom("_emdash_collections").select("search_config").where("slug", "=", collectionSlug).executeTakeFirst();
		if (!result?.search_config) return null;
		try {
			const parsed = JSON.parse(result.search_config);
			if (typeof parsed !== "object" || parsed === null || !("enabled" in parsed) || typeof parsed.enabled !== "boolean") return null;
			const config = { enabled: parsed.enabled };
			if ("weights" in parsed && typeof parsed.weights === "object" && parsed.weights !== null) {
				const weights = {};
				for (const [k, v] of Object.entries(parsed.weights)) if (typeof v === "number") weights[k] = v;
				config.weights = weights;
			}
			return config;
		} catch {
			return null;
		}
	}
	/**
	* Update the search configuration for a collection
	*/
	async setSearchConfig(collectionSlug, config) {
		await this.db.updateTable("_emdash_collections").set({ search_config: JSON.stringify(config) }).where("slug", "=", collectionSlug).execute();
	}
	/**
	* Get searchable fields for a collection
	*/
	async getSearchableFields(collectionSlug) {
		const collection = await this.db.selectFrom("_emdash_collections").select("id").where("slug", "=", collectionSlug).executeTakeFirst();
		if (!collection) return [];
		return (await this.db.selectFrom("_emdash_fields").select("slug").where("collection_id", "=", collection.id).where("searchable", "=", 1).execute()).map((f) => f.slug);
	}
	/**
	* Whether a collection has a user-defined `title` field.
	*
	* `title` is not a system column on `ec_*` tables -- it exists only when a
	* collection defines a field with slug `title`. Search and suggestion SQL
	* that selects `c.title` must check this first; otherwise collections
	* without a title field raise "no such column: c.title" (#1178).
	*/
	async hasTitleColumn(collectionSlug) {
		return (await this.getCollectionsWithTitleColumn([collectionSlug])).has(collectionSlug);
	}
	/**
	* Bulk variant of `hasTitleColumn()`: which of the given collections have
	* a user-defined `title` field. One query instead of one `hasTitleColumn`
	* round-trip pair per collection -- callers that check this once per
	* collection in a loop (multi-collection search, suggestions) should use
	* this instead (AGENTS.md: "one query beats two").
	*/
	async getCollectionsWithTitleColumn(collectionSlugs) {
		if (collectionSlugs.length === 0) return /* @__PURE__ */ new Set();
		const rows = await this.db.selectFrom("_emdash_fields as f").innerJoin("_emdash_collections as c", "c.id", "f.collection_id").select(["c.slug as collection_slug"]).where("f.slug", "=", "title").execute();
		const withTitle = new Set(rows.map((r) => r.collection_slug));
		return new Set(collectionSlugs.filter((slug) => withTitle.has(slug)));
	}
	/**
	* Enable search for a collection.
	*
	* Uses rebuildIndex to ensure a clean state -- drop any existing FTS
	* table/triggers, recreate them, and populate from content. This avoids
	* duplicate rows when triggers have already populated the index (e.g.
	* during seeding where content is inserted before search is enabled).
	*/
	async enableSearch(collectionSlug, options) {
		if (!isSqlite(this.db)) throw new Error("Full-text search is only available with SQLite databases");
		const searchableFields = await this.getSearchableFields(collectionSlug);
		if (searchableFields.length === 0) throw new Error(`No searchable fields defined for collection "${collectionSlug}". Mark at least one field as searchable before enabling search.`);
		await this.rebuildIndex(collectionSlug, searchableFields, options?.weights);
		await this.setSearchConfig(collectionSlug, {
			enabled: true,
			weights: options?.weights
		});
	}
	/**
	* Disable search for a collection
	*
	* Drops the FTS table and triggers.
	*/
	async disableSearch(collectionSlug) {
		if (!isSqlite(this.db)) return;
		await this.dropFtsTable(collectionSlug);
		const existing = await this.getSearchConfig(collectionSlug);
		await this.setSearchConfig(collectionSlug, {
			enabled: false,
			weights: existing?.weights
		});
	}
	/**
	* Get index statistics for a collection
	*/
	async getIndexStats(collectionSlug) {
		if (!isSqlite(this.db)) return null;
		this.validateInputs(collectionSlug);
		const ftsDocsizeTable = `${this.getFtsTableName(collectionSlug)}_docsize`;
		if (!await this.ftsTableExists(collectionSlug)) return null;
		return { indexed: (await sql`
			SELECT COUNT(*) as count FROM "${sql.raw(ftsDocsizeTable)}"
		`.execute(this.db)).rows[0]?.count ?? 0 };
	}
	/**
	* Verify FTS index integrity and rebuild if drift is detected.
	*
	* Cheap belt-and-braces check, run lazily on the first search request
	* per isolate. The expensive cases (corrupted indexes from pre-fix
	* EmDash versions, broken legacy triggers) are handled at boot time by
	* migration `039_fix_fts5_triggers`, not here. This routine sticks to:
	*
	*   1. FTS table missing while config says search is enabled -> rebuild.
	*   2. Row count mismatch between content table and FTS docsize -> rebuild.
	*
	* Returns true if the index was rebuilt, false if it was healthy.
	*/
	async verifyAndRepairIndex(collectionSlug) {
		if (!isSqlite(this.db)) return false;
		this.validateInputs(collectionSlug);
		const ftsDocsizeTable = `${this.getFtsTableName(collectionSlug)}_docsize`;
		const contentTable = this.getContentTableName(collectionSlug);
		const fields = await this.getSearchableFields(collectionSlug);
		const config = await this.getSearchConfig(collectionSlug);
		if (!await this.ftsTableExists(collectionSlug)) {
			if (!config?.enabled || fields.length === 0) return false;
			console.warn(`FTS index for "${collectionSlug}" is missing. Rebuilding.`);
			await this.rebuildIndex(collectionSlug, fields, config.weights);
			return true;
		}
		const contentCount = await sql`
			SELECT COUNT(*) as count FROM ${sql.ref(contentTable)}
			WHERE deleted_at IS NULL
		`.execute(this.db);
		const ftsCount = await sql`
			SELECT COUNT(*) as count FROM "${sql.raw(ftsDocsizeTable)}"
		`.execute(this.db);
		const contentRows = contentCount.rows[0]?.count ?? 0;
		const ftsRows = ftsCount.rows[0]?.count ?? 0;
		if (contentRows !== ftsRows) {
			console.warn(`FTS index for "${collectionSlug}" has ${ftsRows} rows but content table has ${contentRows}. Rebuilding.`);
			if (fields.length > 0) await this.rebuildIndex(collectionSlug, fields, config?.weights);
			return true;
		}
		return false;
	}
	/**
	* Verify and repair FTS indexes for all search-enabled collections.
	*
	* Intended to run at startup to auto-heal any corruption from
	* previous process crashes.
	*/
	async verifyAndRepairAll() {
		if (!isSqlite(this.db)) return 0;
		const collections = await this.db.selectFrom("_emdash_collections").select("slug").where("search_config", "is not", null).execute();
		let repaired = 0;
		for (const { slug } of collections) {
			if (!(await this.getSearchConfig(slug))?.enabled) continue;
			try {
				if (await this.verifyAndRepairIndex(slug)) repaired++;
			} catch (error) {
				console.error(`Failed to verify/repair FTS index for "${slug}":`, error);
			}
		}
		return repaired;
	}
};
//#endregion
//#region node_modules/emdash/src/schema/registry.ts
var SLUG_VALIDATION_PATTERN = /^[a-z][a-z0-9_]*$/;
var EC_PREFIX_PATTERN = /^ec_/;
var SINGLE_QUOTE_PATTERN = /'/g;
var UNDERSCORE_PATTERN = /_/g;
var WORD_BOUNDARY_PATTERN = /\b\w/g;
/** Valid column types for runtime validation */
var COLUMN_TYPES = /* @__PURE__ */ new Set([
	"TEXT",
	"REAL",
	"INTEGER",
	"JSON"
]);
var COLUMN_TYPE_TO_DATA_TYPE = {
	TEXT: "text",
	REAL: "real",
	INTEGER: "integer",
	JSON: "json"
};
/** Valid collection source prefixes/values */
var VALID_SOURCES = /* @__PURE__ */ new Set([
	"manual",
	"discovered",
	"seed"
]);
function isCollectionSource(value) {
	return VALID_SOURCES.has(value) || value.startsWith("template:") || value.startsWith("import:");
}
function isFieldType(value) {
	return value in FIELD_TYPE_TO_COLUMN;
}
function isColumnType(value) {
	return COLUMN_TYPES.has(value);
}
var VALID_COLLECTION_SUPPORTS = /* @__PURE__ */ new Set([
	"drafts",
	"revisions",
	"preview",
	"scheduling",
	"search",
	"seo"
]);
var SEED_FIELD_INSERT_BATCH_SIZE = 6;
function isCollectionSupport(value) {
	return typeof value === "string" && VALID_COLLECTION_SUPPORTS.has(value);
}
/**
* Parse a collection's `supports` column (stored as a JSON array of
* CollectionSupport keys). Unknown/invalid entries are filtered out so the
* runtime value matches the declared `CollectionSupport[]` type.
*
* Throws on malformed JSON so corruption surfaces loudly; returns an empty
* array only for explicitly null/empty values or non-array JSON.
*/
function parseSupports(raw) {
	if (!raw) return [];
	const parsed = JSON.parse(raw);
	if (!Array.isArray(parsed)) return [];
	return parsed.filter(isCollectionSupport);
}
/**
* Error thrown when a schema operation fails
*/
var SchemaError = class extends Error {
	code;
	details;
	constructor(message, code, details) {
		super(message);
		this.code = code;
		this.details = details;
		this.name = "SchemaError";
	}
};
/**
* Schema Registry
*
* Manages collection and field definitions stored in D1.
* Handles runtime DDL operations (CREATE TABLE, ALTER TABLE).
*/
var SchemaRegistry = class {
	db;
	constructor(db) {
		this.db = db;
	}
	/**
	* List all collections
	*/
	async listCollections() {
		return (await this.db.selectFrom("_emdash_collections").selectAll().orderBy("slug", "asc").execute()).map(this.mapCollectionRow);
	}
	/**
	* Get a collection by slug
	*/
	async getCollection(slug) {
		const row = await this.db.selectFrom("_emdash_collections").where("slug", "=", slug).selectAll().executeTakeFirst();
		return row ? this.mapCollectionRow(row) : null;
	}
	/**
	* Get a collection with all its fields
	*/
	async getCollectionWithFields(slug) {
		const collection = await this.getCollection(slug);
		if (!collection) return null;
		const fields = await this.listFields(collection.id);
		return {
			...collection,
			fields
		};
	}
	/**
	* List every collection together with its fields in O(1) query shapes
	* — one for collections, then one batched query for the fields of every
	* returned collection — instead of the N+1 pattern of `listCollections`
	* + per-collection `listFields`. The fields query is chunked at
	* `SQL_BATCH_SIZE` to stay under D1's bound-parameter limit, so on
	* sites with more than `SQL_BATCH_SIZE` collections the field fetch
	* becomes `ceil(collectionCount / SQL_BATCH_SIZE)` queries — still
	* a constant factor, not N+1. Typical sites have well under
	* `SQL_BATCH_SIZE` collections, so this is two queries in practice.
	*
	* Used by the manifest build, which previously paid N+1 round-trips on
	* every admin request. Each round-trip costs ~80–150ms against the D1
	* primary on a busy link, so a 10-collection site spent ~1 s rebuilding
	* a manifest that is now built fresh per admin request (no cache).
	*/
	async listCollectionsWithFields() {
		const collectionRows = await this.db.selectFrom("_emdash_collections").selectAll().orderBy("slug", "asc").execute();
		if (collectionRows.length === 0) return [];
		const fieldsByCollection = /* @__PURE__ */ new Map();
		for (const idChunk of chunks(collectionRows.map((c) => c.id), 50)) {
			const fieldRows = await this.db.selectFrom("_emdash_fields").where("collection_id", "in", idChunk).selectAll().orderBy("collection_id", "asc").orderBy("sort_order", "asc").orderBy("created_at", "asc").execute();
			for (const row of fieldRows) {
				const list = fieldsByCollection.get(row.collection_id) ?? [];
				list.push(this.mapFieldRow(row));
				fieldsByCollection.set(row.collection_id, list);
			}
		}
		return collectionRows.map((c) => ({
			...this.mapCollectionRow(c),
			fields: fieldsByCollection.get(c.id) ?? []
		}));
	}
	/**
	* Create a new collection
	*/
	async createCollection(input) {
		this.validateSlug(input.slug, "collection");
		if (RESERVED_COLLECTION_SLUGS.includes(input.slug)) throw new SchemaError(`Collection slug "${input.slug}" is reserved`, "RESERVED_SLUG");
		if (await this.getCollection(input.slug)) throw new SchemaError(`Collection "${input.slug}" already exists`, "COLLECTION_EXISTS");
		const id = ulid();
		const supports = input.supports ?? ["drafts", "revisions"];
		const hasSeo = input.hasSeo ?? supports.includes("seo") ?? false;
		await withTransaction(this.db, async (trx) => {
			await trx.insertInto("_emdash_collections").values({
				id,
				slug: input.slug,
				label: input.label,
				label_singular: input.labelSingular ?? null,
				description: input.description ?? null,
				icon: input.icon ?? null,
				supports: JSON.stringify(supports),
				source: input.source ?? "manual",
				has_seo: hasSeo ? 1 : 0,
				comments_enabled: input.commentsEnabled ? 1 : 0,
				url_pattern: input.urlPattern ?? null
			}).execute();
			await this.createContentTable(input.slug, trx);
		});
		const collection = await this.getCollection(input.slug);
		if (!collection) throw new SchemaError("Failed to create collection", "CREATE_FAILED");
		return collection;
	}
	/**
	* Create a seed-owned collection and all of its fields in bulk.
	*
	* Fresh seeds can define dozens of fields. Creating them through
	* `createField` performs multiple reads, one ALTER TABLE, and one media
	* usage invalidation per field, which can exhaust D1's per-request query
	* budget. This path validates the full schema before mutating it, creates
	* the complete content table in one statement, and inserts field metadata
	* in parameter-safe batches.
	*/
	async createSeedCollection(input, fields) {
		this.validateSlug(input.slug, "collection");
		if (RESERVED_COLLECTION_SLUGS.includes(input.slug)) throw new SchemaError(`Collection slug "${input.slug}" is reserved`, "RESERVED_SLUG");
		if (await this.getCollection(input.slug)) throw new SchemaError(`Collection "${input.slug}" already exists`, "COLLECTION_EXISTS");
		const fieldSlugs = /* @__PURE__ */ new Set();
		for (const field of fields) {
			this.validateSlug(field.slug, "field");
			if (RESERVED_FIELD_SLUGS.includes(field.slug)) throw new SchemaError(`Field slug "${field.slug}" is reserved`, "RESERVED_SLUG");
			if (fieldSlugs.has(field.slug)) throw new SchemaError(`Field "${field.slug}" already exists in collection "${input.slug}"`, "FIELD_EXISTS");
			fieldSlugs.add(field.slug);
		}
		const collectionId = ulid();
		const supports = input.supports ?? ["drafts", "revisions"];
		const hasSeo = input.hasSeo ?? supports.includes("seo") ?? false;
		let maxSortOrder = -1;
		const fieldRows = fields.map((field) => {
			const sortOrder = field.sortOrder ?? maxSortOrder + 1;
			maxSortOrder = Math.max(maxSortOrder, sortOrder);
			return {
				id: ulid(),
				collection_id: collectionId,
				slug: field.slug,
				label: field.label,
				type: field.type,
				column_type: FIELD_TYPE_TO_COLUMN[field.type],
				required: field.required ? 1 : 0,
				unique: field.unique ? 1 : 0,
				default_value: field.defaultValue !== void 0 ? JSON.stringify(field.defaultValue) : null,
				validation: field.validation ? JSON.stringify(field.validation) : null,
				widget: field.widget ?? null,
				options: field.options ? JSON.stringify(field.options) : null,
				sort_order: sortOrder,
				searchable: field.searchable ? 1 : 0,
				translatable: field.translatable === false ? 0 : 1
			};
		});
		let schemaMutated = false;
		try {
			await withTransaction(this.db, async (trx) => {
				await trx.insertInto("_emdash_collections").values({
					id: collectionId,
					slug: input.slug,
					label: input.label,
					label_singular: input.labelSingular ?? null,
					description: input.description ?? null,
					icon: input.icon ?? null,
					supports: JSON.stringify(supports),
					source: "seed",
					has_seo: hasSeo ? 1 : 0,
					comments_enabled: input.commentsEnabled ? 1 : 0,
					url_pattern: input.urlPattern ?? null
				}).execute();
				schemaMutated = true;
				await this.createContentTable(input.slug, trx, fields);
				for (const fieldBatch of chunks(fieldRows, SEED_FIELD_INSERT_BATCH_SIZE)) await trx.insertInto("_emdash_fields").values(fieldBatch).execute();
			});
			await markContentMediaUsageCollectionStaleSafely(this.db, input.slug, "CONTENT_USAGE_STALE");
		} catch (error) {
			if (schemaMutated) await markContentMediaUsageCollectionStaleSafely(this.db, input.slug, "CONTENT_USAGE_STALE");
			throw error;
		}
	}
	/**
	* Update a collection
	*/
	async updateCollection(slug, input) {
		const existing = await this.getCollection(slug);
		if (!existing) throw new SchemaError(`Collection "${slug}" not found`, "COLLECTION_NOT_FOUND");
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const supportsArray = input.supports ?? existing.supports;
		const hasSeo = input.hasSeo !== void 0 ? input.hasSeo : input.supports !== void 0 ? supportsArray.includes("seo") : existing.hasSeo;
		return withTransaction(this.db, async (trx) => {
			await trx.updateTable("_emdash_collections").set({
				label: input.label ?? existing.label,
				label_singular: input.labelSingular ?? existing.labelSingular ?? null,
				description: input.description ?? existing.description ?? null,
				icon: input.icon ?? existing.icon ?? null,
				supports: input.supports ? JSON.stringify(input.supports) : JSON.stringify(existing.supports),
				url_pattern: input.urlPattern !== void 0 ? input.urlPattern ?? null : existing.urlPattern ?? null,
				has_seo: hasSeo ? 1 : 0,
				comments_enabled: input.commentsEnabled !== void 0 ? input.commentsEnabled ? 1 : 0 : existing.commentsEnabled ? 1 : 0,
				comments_moderation: input.commentsModeration ?? existing.commentsModeration,
				comments_closed_after_days: input.commentsClosedAfterDays !== void 0 ? input.commentsClosedAfterDays : existing.commentsClosedAfterDays,
				comments_auto_approve_users: input.commentsAutoApproveUsers !== void 0 ? input.commentsAutoApproveUsers ? 1 : 0 : existing.commentsAutoApproveUsers ? 1 : 0,
				updated_at: now
			}).where("slug", "=", slug).execute();
			const row = await trx.selectFrom("_emdash_collections").where("slug", "=", slug).selectAll().executeTakeFirst();
			if (!row) throw new SchemaError("Failed to update collection", "UPDATE_FAILED");
			if (input.supports !== void 0) {
				if (existing.supports.includes("search") !== parseSupports(row.supports).includes("search")) await this.syncSearchState(slug, trx);
			}
			return this.mapCollectionRow(row);
		});
	}
	/**
	* Delete a collection
	*/
	async deleteCollection(slug, options) {
		const existing = await this.getCollection(slug);
		if (!existing) throw new SchemaError(`Collection "${slug}" not found`, "COLLECTION_NOT_FOUND");
		if (!options?.force) {
			if (await this.collectionHasContent(slug)) throw new SchemaError(`Collection "${slug}" has content. Use force: true to delete.`, "COLLECTION_HAS_CONTENT");
		}
		let contentTableDropped = false;
		try {
			await withTransaction(this.db, async (trx) => {
				await new FTSManager(trx).dropFtsTable(slug);
				const tableName = this.getTableName(slug);
				await sql`DROP TABLE IF EXISTS ${sql.ref(tableName)}`.execute(trx);
				contentTableDropped = true;
				await trx.deleteFrom("_emdash_collections").where("id", "=", existing.id).execute();
			});
			await deleteContentMediaUsageCollection(this.db, slug);
		} catch (error) {
			if (contentTableDropped && !await tableExists(this.db, this.getTableName(slug))) await deleteContentMediaUsageCollection(this.db, slug);
			throw error;
		}
	}
	/**
	* List fields for a collection
	*/
	async listFields(collectionId) {
		return (await this.db.selectFrom("_emdash_fields").where("collection_id", "=", collectionId).selectAll().orderBy("sort_order", "asc").orderBy("created_at", "asc").execute()).map(this.mapFieldRow);
	}
	/**
	* Get a field by slug within a collection
	*/
	async getField(collectionSlug, fieldSlug) {
		const collection = await this.getCollection(collectionSlug);
		if (!collection) return null;
		const row = await this.db.selectFrom("_emdash_fields").where("collection_id", "=", collection.id).where("slug", "=", fieldSlug).selectAll().executeTakeFirst();
		return row ? this.mapFieldRow(row) : null;
	}
	/**
	* Create a new field
	*/
	async createField(collectionSlug, input) {
		const collection = await this.getCollection(collectionSlug);
		if (!collection) throw new SchemaError(`Collection "${collectionSlug}" not found`, "COLLECTION_NOT_FOUND");
		this.validateSlug(input.slug, "field");
		if (RESERVED_FIELD_SLUGS.includes(input.slug)) throw new SchemaError(`Field slug "${input.slug}" is reserved`, "RESERVED_SLUG");
		if (await this.getField(collectionSlug, input.slug)) throw new SchemaError(`Field "${input.slug}" already exists in collection "${collectionSlug}"`, "FIELD_EXISTS");
		const id = ulid();
		const columnType = FIELD_TYPE_TO_COLUMN[input.type];
		const maxSort = await this.db.selectFrom("_emdash_fields").where("collection_id", "=", collection.id).select((eb) => eb.fn.max("sort_order").as("max")).executeTakeFirst();
		const sortOrder = input.sortOrder ?? (maxSort?.max ?? -1) + 1;
		let schemaMutated = false;
		try {
			const created = await withTransaction(this.db, async (trx) => {
				await trx.insertInto("_emdash_fields").values({
					id,
					collection_id: collection.id,
					slug: input.slug,
					label: input.label,
					type: input.type,
					column_type: columnType,
					required: input.required ? 1 : 0,
					unique: input.unique ? 1 : 0,
					default_value: input.defaultValue !== void 0 ? JSON.stringify(input.defaultValue) : null,
					validation: input.validation ? JSON.stringify(input.validation) : null,
					widget: input.widget ?? null,
					options: input.options ? JSON.stringify(input.options) : null,
					sort_order: sortOrder,
					searchable: input.searchable ? 1 : 0,
					translatable: input.translatable === false ? 0 : 1
				}).execute();
				schemaMutated = true;
				await this.addColumn(collectionSlug, input.slug, input.type, {
					required: input.required,
					defaultValue: input.defaultValue
				}, trx);
				const fieldRow = await trx.selectFrom("_emdash_fields").where("collection_id", "=", collection.id).where("slug", "=", input.slug).selectAll().executeTakeFirst();
				if (!fieldRow) throw new SchemaError("Failed to create field", "CREATE_FAILED");
				const field = this.mapFieldRow(fieldRow);
				if (input.searchable) await this.syncSearchState(collectionSlug, trx);
				return field;
			});
			await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
			return created;
		} catch (error) {
			if (schemaMutated) await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
			throw error;
		}
	}
	/**
	* Update a field
	*/
	async updateField(collectionSlug, fieldSlug, input) {
		const field = await this.getField(collectionSlug, fieldSlug);
		if (!field) throw new SchemaError(`Field "${fieldSlug}" not found in collection "${collectionSlug}"`, "FIELD_NOT_FOUND");
		const nextValidation = input.validation === void 0 ? field.validation : input.validation;
		let nextType = field.type;
		let nextColumnType = field.columnType;
		if (input.type !== void 0 && input.type !== field.type) {
			const newColumnType = FIELD_TYPE_TO_COLUMN[input.type];
			if (newColumnType !== field.columnType) throw new SchemaError(`Cannot change field "${fieldSlug}" in collection "${collectionSlug}" from type "${field.type}" to "${input.type}": the underlying column type would change from ${field.columnType} to ${newColumnType}, which requires a manual content migration. Drop and re-create the field, or migrate the column data, before changing its type.`, "FIELD_TYPE_COLUMN_CHANGE");
			nextType = input.type;
			nextColumnType = newColumnType;
		}
		let schemaMutated = false;
		try {
			const updatedField = await withTransaction(this.db, async (trx) => {
				await trx.updateTable("_emdash_fields").set({
					type: nextType,
					column_type: nextColumnType,
					label: input.label ?? field.label,
					required: input.required !== void 0 ? input.required ? 1 : 0 : field.required ? 1 : 0,
					unique: input.unique !== void 0 ? input.unique ? 1 : 0 : field.unique ? 1 : 0,
					searchable: input.searchable !== void 0 ? input.searchable ? 1 : 0 : field.searchable ? 1 : 0,
					translatable: input.translatable !== void 0 ? input.translatable ? 1 : 0 : field.translatable ? 1 : 0,
					default_value: input.defaultValue !== void 0 ? JSON.stringify(input.defaultValue) : field.defaultValue !== void 0 ? JSON.stringify(field.defaultValue) : null,
					validation: nextValidation ? JSON.stringify(nextValidation) : null,
					widget: input.widget ?? field.widget ?? null,
					options: input.options ? JSON.stringify(input.options) : field.options ? JSON.stringify(field.options) : null,
					sort_order: input.sortOrder ?? field.sortOrder
				}).where("id", "=", field.id).execute();
				schemaMutated = true;
				const updatedRow = await trx.selectFrom("_emdash_fields").where("collection_id", "=", field.collectionId).where("slug", "=", fieldSlug).selectAll().executeTakeFirst();
				if (!updatedRow) throw new SchemaError("Failed to update field", "UPDATE_FAILED");
				const updated = this.mapFieldRow(updatedRow);
				if (input.searchable !== void 0 && input.searchable !== field.searchable) await this.syncSearchState(collectionSlug, trx);
				return updated;
			});
			await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
			return updatedField;
		} catch (error) {
			if (schemaMutated) await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
			throw error;
		}
	}
	/**
	* Synchronize an existing FTS index with the collection's current state.
	*
	* Only rebuilds or disables — never first-time enables. First-time FTS
	* enablement is handled by the seed's explicit enableSearch call (which
	* is try-caught) or the admin UI toggle.
	*
	* - FTS active + still has search support and searchable fields → rebuild
	* - FTS active + lost search support or no searchable fields    → disable
	* - FTS not active                                              → no-op
	*
	* Pass `db` when calling from within a transaction so FTS operations
	* participate in the same transaction and are rolled back on failure.
	*/
	async syncSearchState(collectionSlug, db) {
		const conn = db ?? this.db;
		const ftsManager = new FTSManager(conn);
		const row = await conn.selectFrom("_emdash_collections").where("slug", "=", collectionSlug).select("supports").executeTakeFirst();
		if (!row) return;
		const wantsSearch = parseSupports(row.supports).includes("search");
		const searchableFields = await ftsManager.getSearchableFields(collectionSlug);
		const config = await ftsManager.getSearchConfig(collectionSlug);
		const ftsActive = config?.enabled === true;
		if (wantsSearch && searchableFields.length > 0 && ftsActive) await ftsManager.rebuildIndex(collectionSlug, searchableFields, config?.weights);
		else if (ftsActive && (!wantsSearch || searchableFields.length === 0)) await ftsManager.disableSearch(collectionSlug);
	}
	/**
	* Delete a field
	*/
	async deleteField(collectionSlug, fieldSlug) {
		const field = await this.getField(collectionSlug, fieldSlug);
		if (!field) throw new SchemaError(`Field "${fieldSlug}" not found in collection "${collectionSlug}"`, "FIELD_NOT_FOUND");
		let schemaMutated = false;
		try {
			await withTransaction(this.db, async (trx) => {
				await trx.deleteFrom("_emdash_fields").where("id", "=", field.id).execute();
				schemaMutated = true;
				if (field.searchable) await this.syncSearchState(collectionSlug, trx);
				await this.dropColumn(collectionSlug, fieldSlug, trx);
			});
			await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
		} catch (error) {
			if (schemaMutated) await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
			throw error;
		}
	}
	/**
	* Reorder fields
	*/
	async reorderFields(collectionSlug, fieldSlugs) {
		const collection = await this.getCollection(collectionSlug);
		if (!collection) throw new SchemaError(`Collection "${collectionSlug}" not found`, "COLLECTION_NOT_FOUND");
		for (let i = 0; i < fieldSlugs.length; i++) await this.db.updateTable("_emdash_fields").set({ sort_order: i }).where("collection_id", "=", collection.id).where("slug", "=", fieldSlugs[i]).execute();
	}
	/**
	* Create a content table for a collection
	*/
	async createContentTable(slug, db, fields = []) {
		const conn = db ?? this.db;
		const tableName = this.getTableName(slug);
		let table = conn.schema.createTable(tableName).addColumn("id", "text", (col) => col.primaryKey()).addColumn("slug", "text").addColumn("status", "text", (col) => col.defaultTo("draft")).addColumn("author_id", "text").addColumn("primary_byline_id", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(conn))).addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(conn))).addColumn("published_at", "text").addColumn("scheduled_at", "text").addColumn("deleted_at", "text").addColumn("version", "integer", (col) => col.defaultTo(1)).addColumn("live_revision_id", "text", (col) => col.references("revisions.id")).addColumn("draft_revision_id", "text", (col) => col.references("revisions.id")).addColumn("locale", "text", (col) => col.notNull().defaultTo("en")).addColumn("translation_group", "text");
		for (const field of fields) {
			const columnName = this.getColumnName(field.slug);
			const columnType = COLUMN_TYPE_TO_DATA_TYPE[FIELD_TYPE_TO_COLUMN[field.type]];
			table = table.addColumn(columnName, columnType, (column) => {
				if (!field.required) return column;
				const defaultValue = field.defaultValue !== void 0 ? this.formatDefaultValue(field.defaultValue, field.type) : this.getEmptyDefault(field.type);
				return column.notNull().defaultTo(sql.raw(defaultValue));
			});
		}
		await table.addUniqueConstraint(`${tableName}_slug_locale_unique`, ["slug", "locale"]).execute();
		await sql`
			CREATE INDEX ${sql.ref(`idx_${tableName}_slug`)}
			ON ${sql.ref(tableName)} (slug)
		`.execute(conn);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${tableName}_scheduled`)}
			ON ${sql.ref(tableName)} (scheduled_at)
			WHERE scheduled_at IS NOT NULL
		`.execute(conn);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${tableName}_live_revision`)}
			ON ${sql.ref(tableName)} (live_revision_id)
		`.execute(conn);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${tableName}_draft_revision`)}
			ON ${sql.ref(tableName)} (draft_revision_id)
		`.execute(conn);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${tableName}_author`)}
			ON ${sql.ref(tableName)} (author_id)
		`.execute(conn);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${tableName}_primary_byline`)}
			ON ${sql.ref(tableName)} (primary_byline_id)
		`.execute(conn);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${tableName}_locale`)}
			ON ${sql.ref(tableName)} (locale)
		`.execute(conn);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${tableName}_translation_group`)}
			ON ${sql.ref(tableName)} (translation_group)
		`.execute(conn);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${tableName}_deleted_updated_id`)}
			ON ${sql.ref(tableName)} (deleted_at, updated_at DESC, id DESC)
		`.execute(conn);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${tableName}_deleted_status`)}
			ON ${sql.ref(tableName)} (deleted_at, status)
		`.execute(conn);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${tableName}_deleted_created_id`)}
			ON ${sql.ref(tableName)} (deleted_at, created_at DESC, id DESC)
		`.execute(conn);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${tableName}_deleted_published_id`)}
			ON ${sql.ref(tableName)} (deleted_at, published_at DESC, id DESC)
		`.execute(conn);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${tableName}_loc_upd`)}
			ON ${sql.ref(tableName)} (deleted_at, locale, updated_at DESC, id DESC)
		`.execute(conn);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${tableName}_loc_crt`)}
			ON ${sql.ref(tableName)} (deleted_at, locale, created_at DESC, id DESC)
		`.execute(conn);
	}
	/**
	* Add a column to a content table
	*/
	async addColumn(collectionSlug, fieldSlug, fieldType, options, db) {
		const conn = db ?? this.db;
		const tableName = this.getTableName(collectionSlug);
		const columnType = FIELD_TYPE_TO_COLUMN[fieldType];
		const columnName = this.getColumnName(fieldSlug);
		if (options?.required && options?.defaultValue !== void 0) {
			const defaultVal = this.formatDefaultValue(options.defaultValue, fieldType);
			await sql`
				ALTER TABLE ${sql.ref(tableName)}
				ADD COLUMN ${sql.ref(columnName)} ${sql.raw(columnType)} NOT NULL DEFAULT ${sql.raw(defaultVal)}
			`.execute(conn);
		} else if (options?.required) {
			const defaultVal = this.getEmptyDefault(fieldType);
			await sql`
				ALTER TABLE ${sql.ref(tableName)}
				ADD COLUMN ${sql.ref(columnName)} ${sql.raw(columnType)} NOT NULL DEFAULT ${sql.raw(defaultVal)}
			`.execute(conn);
		} else await sql`
				ALTER TABLE ${sql.ref(tableName)}
				ADD COLUMN ${sql.ref(columnName)} ${sql.raw(columnType)}
			`.execute(conn);
	}
	/**
	* Drop a column from a content table
	*/
	async dropColumn(collectionSlug, fieldSlug, db) {
		const tableName = this.getTableName(collectionSlug);
		const columnName = this.getColumnName(fieldSlug);
		await sql`
			ALTER TABLE ${sql.ref(tableName)}
			DROP COLUMN ${sql.ref(columnName)}
		`.execute(db ?? this.db);
	}
	/**
	* Check if a collection has any content
	*/
	async collectionHasContent(slug) {
		const tableName = this.getTableName(slug);
		try {
			return ((await sql`
				SELECT COUNT(*) as count FROM ${sql.ref(tableName)}
				WHERE deleted_at IS NULL
			`.execute(this.db)).rows[0]?.count ?? 0) > 0;
		} catch {
			return false;
		}
	}
	/**
	* Get table name for a collection
	*/
	getTableName(slug) {
		validateIdentifier(slug, "collection slug");
		return `ec_${slug}`;
	}
	/**
	* Get column name for a field
	*/
	getColumnName(slug) {
		validateIdentifier(slug, "field slug");
		return slug;
	}
	/**
	* Validate a slug
	*/
	validateSlug(slug, type) {
		if (!slug || typeof slug !== "string") throw new SchemaError(`${type} slug is required`, "INVALID_SLUG");
		if (!SLUG_VALIDATION_PATTERN.test(slug)) throw new SchemaError(`${type} slug must start with a letter and contain only lowercase letters, numbers, and underscores`, "INVALID_SLUG");
		if (slug.length > 63) throw new SchemaError(`${type} slug must be 63 characters or less`, "INVALID_SLUG");
	}
	/**
	* Format a default value for SQL.
	*
	* SQLite `ALTER TABLE ADD COLUMN ... DEFAULT` requires a literal constant
	* expression — parameterized values cannot be used here. We manually escape
	* single quotes and coerce types to ensure the output is safe.
	*
	* INTEGER/REAL values are coerced through `Number()` which can only produce
	* digits, `.`, `-`, `e`, `Infinity`, or `NaN` — all safe in SQL.
	* TEXT/JSON values have single quotes escaped via SQL standard doubling (`''`).
	*/
	formatDefaultValue(value, fieldType) {
		if (value === null || value === void 0) return "NULL";
		const columnType = FIELD_TYPE_TO_COLUMN[fieldType];
		if (columnType === "JSON") return `'${JSON.stringify(value).replace(SINGLE_QUOTE_PATTERN, "''")}'`;
		if (columnType === "INTEGER") {
			if (typeof value === "boolean") return value ? "1" : "0";
			const num = Number(value);
			if (!Number.isFinite(num)) return "0";
			return String(Math.trunc(num));
		}
		if (columnType === "REAL") {
			const num = Number(value);
			if (!Number.isFinite(num)) return "0";
			return String(num);
		}
		let text;
		if (typeof value === "string") text = value;
		else if (typeof value === "number" || typeof value === "boolean") text = String(value);
		else if (typeof value === "object" && value !== null) text = JSON.stringify(value);
		else text = "";
		return `'${text.replace(SINGLE_QUOTE_PATTERN, "''")}'`;
	}
	/**
	* Get empty default for a field type
	*/
	getEmptyDefault(fieldType) {
		switch (FIELD_TYPE_TO_COLUMN[fieldType]) {
			case "INTEGER": return "0";
			case "REAL": return "0.0";
			case "JSON": return "'null'";
			default: return "''";
		}
	}
	/**
	* Map a collection row to a Collection object
	*/
	mapCollectionRow = (row) => {
		const moderation = row.comments_moderation;
		return {
			id: row.id,
			slug: row.slug,
			label: row.label,
			labelSingular: row.label_singular ?? void 0,
			description: row.description ?? void 0,
			icon: row.icon ?? void 0,
			supports: parseSupports(row.supports),
			source: row.source && isCollectionSource(row.source) ? row.source : void 0,
			hasSeo: row.has_seo === 1,
			urlPattern: row.url_pattern ?? void 0,
			commentsEnabled: row.comments_enabled === 1,
			commentsModeration: moderation === "all" || moderation === "first_time" || moderation === "none" ? moderation : "first_time",
			commentsClosedAfterDays: row.comments_closed_after_days ?? 90,
			commentsAutoApproveUsers: row.comments_auto_approve_users === 1,
			createdAt: row.created_at,
			updatedAt: row.updated_at
		};
	};
	/**
	* Map a field row to a Field object
	*/
	mapFieldRow = (row) => {
		return {
			id: row.id,
			collectionId: row.collection_id,
			slug: row.slug,
			label: row.label,
			type: isFieldType(row.type) ? row.type : "string",
			columnType: isColumnType(row.column_type) ? row.column_type : "TEXT",
			required: row.required === 1,
			unique: row.unique === 1,
			defaultValue: row.default_value ? JSON.parse(row.default_value) : void 0,
			validation: row.validation ? JSON.parse(row.validation) : void 0,
			widget: row.widget ?? void 0,
			options: row.options ? JSON.parse(row.options) : void 0,
			sortOrder: row.sort_order,
			searchable: row.searchable === 1,
			translatable: row.translatable !== 0,
			createdAt: row.created_at
		};
	};
	/**
	* Discover orphaned content tables
	*
	* Finds ec_* tables that exist in the database but don't have a
	* corresponding entry in _emdash_collections.
	*/
	async discoverOrphanedTables() {
		const allTables = await listTablesLike(this.db, "ec_%");
		const registered = await this.listCollections();
		const registeredSlugs = new Set(registered.map((c) => c.slug));
		const orphans = [];
		for (const tableName of allTables) {
			const slug = tableName.replace(EC_PREFIX_PATTERN, "");
			if (!registeredSlugs.has(slug)) try {
				const countResult = await sql`
						SELECT COUNT(*) as count FROM ${sql.ref(tableName)}
						WHERE deleted_at IS NULL
					`.execute(this.db);
				orphans.push({
					slug,
					tableName,
					rowCount: countResult.rows[0]?.count ?? 0
				});
			} catch {
				orphans.push({
					slug,
					tableName,
					rowCount: 0
				});
			}
		}
		return orphans;
	}
	/**
	* Register an orphaned table as a collection
	*
	* Creates a _emdash_collections entry for an existing ec_* table.
	*/
	async registerOrphanedTable(slug, options) {
		const tableName = this.getTableName(slug);
		if (!await tableExists(this.db, tableName)) throw new SchemaError(`Table "${tableName}" does not exist`, "TABLE_NOT_FOUND");
		if (await this.getCollection(slug)) throw new SchemaError(`Collection "${slug}" is already registered`, "COLLECTION_EXISTS");
		const id = ulid();
		const label = options?.label || this.slugToLabel(slug);
		let collectionRegistered = false;
		try {
			await this.db.insertInto("_emdash_collections").values({
				id,
				slug,
				label,
				label_singular: options?.labelSingular ?? null,
				description: options?.description ?? null,
				icon: null,
				supports: JSON.stringify([]),
				source: "discovered",
				has_seo: 0,
				url_pattern: null
			}).execute();
			collectionRegistered = true;
			const collection = await this.getCollection(slug);
			if (!collection) throw new SchemaError("Failed to register orphaned table", "REGISTER_FAILED");
			await markContentMediaUsageCollectionStaleSafely(this.db, slug, "CONTENT_USAGE_STALE");
			return collection;
		} catch (error) {
			if (collectionRegistered) await markContentMediaUsageCollectionStaleSafely(this.db, slug, "CONTENT_USAGE_STALE");
			throw error;
		}
	}
	/**
	* Convert slug to human-readable label
	*/
	slugToLabel(slug) {
		return slug.replace(UNDERSCORE_PATTERN, " ").replace(WORD_BOUNDARY_PATTERN, (c) => c.toUpperCase());
	}
};
//#endregion
//#region node_modules/emdash/src/schema/query.ts
/**
* Get collection metadata by slug.
*
* @example
* ```ts
* import { getCollectionInfo } from "emdash";
*
* const info = await getCollectionInfo("posts");
* if (info?.commentsEnabled) {
*   // render comment UI
* }
* ```
*/
async function getCollectionInfo(slug) {
	return requestCached(`collection-info:${slug}`, () => cachedQuery({
		namespace: CacheNamespace.SCHEMA,
		key: `collection-info:${slug}`,
		load: async () => {
			return getCollectionInfoWithDb(await getDb(), slug);
		}
	}));
}
/**
* Get collection metadata with an explicit db handle.
*
* @internal Use `getCollectionInfo()` in templates. This variant is for
* routes that already have a database handle.
*/
async function getCollectionInfoWithDb(db, slug) {
	return new SchemaRegistry(db).getCollection(slug);
}
//#endregion
//#region node_modules/emdash/src/components/Comments.astro
createAstro("https://astro.build");
var $$Comments = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Comments;
	const { collection, contentId, threaded = false, reactions = false, sort = "oldest", class: className } = Astro.props;
	const enabled = (await getCollectionInfo(collection))?.commentsEnabled ?? false;
	const { items, total } = enabled ? await getComments({
		collection,
		contentId,
		threaded,
		reactions,
		sort
	}) : {
		items: [],
		total: 0
	};
	const URL_RE = /https?:\/\/[^\s<>"')\]]+/g;
	const AMP_RE = /&/g;
	const LT_RE = /</g;
	const GT_RE = />/g;
	const QUOT_RE = /"/g;
	function autoLinkUrls(text) {
		return text.replace(URL_RE, (url) => `<a href="${url}" rel="nofollow ugc noopener" target="_blank">${url}</a>`);
	}
	function escapeHtml(text) {
		return text.replace(AMP_RE, "&amp;").replace(LT_RE, "&lt;").replace(GT_RE, "&gt;").replace(QUOT_RE, "&quot;");
	}
	function formatBody(text) {
		return autoLinkUrls(escapeHtml(text));
	}
	const REACTION_SCRIPT = `
(() => {
  const sections = document.querySelectorAll('[data-ec-comments][data-ec-reactions]');
  sections.forEach((section) => {
    const collection = section.getAttribute('data-collection');
    const contentId = section.getAttribute('data-content-id');
    if (!collection || !contentId) return;
    const base = '/_emdash/api/comments/' + encodeURIComponent(collection) + '/' + encodeURIComponent(contentId) + '/reactions';
    const headers = { 'X-EmDash-Request': '1' };

    fetch(base, { headers: headers })
      .then((r) => (r.ok ? r.json() : null))
      .then((payload) => {
        const viewer = payload && payload.data && payload.data.viewer;
        if (!viewer) return;
        Object.keys(viewer).forEach((commentId) => {
          (viewer[commentId] || []).forEach((reaction) => {
            const sel = '.ec-reaction[data-comment-id="' + commentId + '"][data-ec-reaction="' + reaction + '"]';
            const btn = section.querySelector(sel);
            if (btn) btn.setAttribute('aria-pressed', 'true');
          });
        });
      })
      .catch(() => {});

    section.addEventListener('click', (event) => {
      const btn = event.target.closest('.ec-reaction');
      if (!btn || !section.contains(btn)) return;
      const commentId = btn.getAttribute('data-comment-id');
      const reaction = btn.getAttribute('data-ec-reaction');
      if (!commentId || !reaction) return;
      btn.disabled = true;
      fetch(base, {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
        body: JSON.stringify({ commentId: commentId, reaction: reaction }),
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((payload) => {
          const data = payload && payload.data;
          if (!data) return;
          btn.setAttribute('aria-pressed', data.reacted ? 'true' : 'false');
          const countEl = btn.querySelector('[data-ec-reaction-count]');
          if (countEl) countEl.textContent = String((data.counts && data.counts[reaction]) || 0);
        })
        .catch(() => {})
        .finally(() => { btn.disabled = false; });
    });
  });
})();
`;
	return renderTemplate`${enabled && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(["ec-comments", className], "class:list")} data-ec-comments${addAttribute(collection, "data-collection")}${addAttribute(contentId, "data-content-id")}${spreadAttributes(reactions ? { "data-ec-reactions": "" } : {})} data-astro-cid-godm52ds><h3 class="ec-comments-heading" data-astro-cid-godm52ds>${total === 0 ? "No comments yet" : total === 1 ? "1 Comment" : `${total} Comments`}</h3>${items.length > 0 && renderTemplate`<ol class="ec-comments-list" data-astro-cid-godm52ds>${items.map((comment) => renderTemplate`<li data-astro-cid-godm52ds><article class="ec-comment"${addAttribute(`comment-${comment.id}`, "id")}${addAttribute(comment.id, "data-comment-id")} data-astro-cid-godm52ds><header class="ec-comment-header" data-astro-cid-godm52ds><span class="ec-comment-author" data-astro-cid-godm52ds>${comment.authorName}${comment.isRegisteredUser && renderTemplate`<span class="ec-comment-badge" aria-label="Site member" data-astro-cid-godm52ds>&#x2713;</span>`}</span><time class="ec-comment-date"${addAttribute(comment.createdAt, "datetime")} data-astro-cid-godm52ds>${new Date(comment.createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	})}</time></header><div class="ec-comment-body" data-astro-cid-godm52ds>${unescapeHTML(formatBody(comment.body))}</div>${reactions && renderTemplate`<div class="ec-comment-actions" data-astro-cid-godm52ds><button type="button" class="ec-reaction" data-ec-reaction="like"${addAttribute(comment.id, "data-comment-id")} aria-pressed="false" data-astro-cid-godm52ds><span class="ec-reaction-icon" aria-hidden="true" data-astro-cid-godm52ds>&#x2661;</span><span class="ec-reaction-label" data-astro-cid-godm52ds>Like</span><span class="ec-reaction-count" data-ec-reaction-count data-astro-cid-godm52ds>${comment.reactions?.like ?? 0}</span></button></div>`}${threaded && comment.replies && comment.replies.length > 0 && renderTemplate`<ol class="ec-comment-replies" data-astro-cid-godm52ds>${comment.replies.map((reply) => renderTemplate`<li data-astro-cid-godm52ds><article class="ec-comment ec-comment-reply"${addAttribute(`comment-${reply.id}`, "id")}${addAttribute(reply.id, "data-comment-id")} data-astro-cid-godm52ds><header class="ec-comment-header" data-astro-cid-godm52ds><span class="ec-comment-author" data-astro-cid-godm52ds>${reply.authorName}${reply.isRegisteredUser && renderTemplate`<span class="ec-comment-badge" aria-label="Site member" data-astro-cid-godm52ds>&#x2713;</span>`}</span><time class="ec-comment-date"${addAttribute(reply.createdAt, "datetime")} data-astro-cid-godm52ds>${new Date(reply.createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	})}</time></header><div class="ec-comment-body" data-astro-cid-godm52ds>${unescapeHTML(formatBody(reply.body))}</div>${reactions && renderTemplate`<div class="ec-comment-actions" data-astro-cid-godm52ds><button type="button" class="ec-reaction" data-ec-reaction="like"${addAttribute(reply.id, "data-comment-id")} aria-pressed="false" data-astro-cid-godm52ds><span class="ec-reaction-icon" aria-hidden="true" data-astro-cid-godm52ds>&#x2661;</span><span class="ec-reaction-label" data-astro-cid-godm52ds>Like</span><span class="ec-reaction-count" data-ec-reaction-count data-astro-cid-godm52ds>${reply.reactions?.like ?? 0}</span></button></div>`}</article></li>`)}</ol>`}</article></li>`)}</ol>`}</section>${reactions && renderTemplate`<script>${unescapeHTML(REACTION_SCRIPT)}<\/script>`}` })}`}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/Comments.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/CommentForm.astro
createAstro("https://astro.build");
var $$CommentForm = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CommentForm;
	const { collection, contentId, parentId = null, class: className, turnstileSiteKey } = Astro.props;
	const enabled = (await getCollectionInfo(collection))?.commentsEnabled ?? false;
	const { user } = Astro.locals;
	const formId = `ec-comment-form-${parentId ?? "root"}`;
	const endpoint = `/_emdash/api/comments/${encodeURIComponent(collection)}/${encodeURIComponent(contentId)}`;
	return renderTemplate`${enabled && renderTemplate`${maybeRenderHead($$result)}<form${addAttribute(formId, "id")}${addAttribute(["ec-comment-form", className], "class:list")} data-ec-comment-form${addAttribute(endpoint, "data-endpoint")}${addAttribute(user?.name ?? "", "data-user-name")}${addAttribute(user?.email ?? "", "data-user-email")} data-astro-cid-myimadtb>${user ? renderTemplate`<div class="ec-comment-user-info" data-astro-cid-myimadtb><span class="ec-comment-user-name" data-astro-cid-myimadtb>${user.name}</span><span class="ec-comment-user-email" data-astro-cid-myimadtb>${user.email}</span></div>` : renderTemplate`<div class="ec-comment-form-fields" data-astro-cid-myimadtb><label class="ec-comment-form-field" data-astro-cid-myimadtb><span data-astro-cid-myimadtb>Name</span><input type="text" name="authorName" required maxlength="100" data-astro-cid-myimadtb></label><label class="ec-comment-form-field" data-astro-cid-myimadtb><span data-astro-cid-myimadtb>Email</span><input type="email" name="authorEmail" required data-astro-cid-myimadtb></label></div>`}<div aria-hidden="true" style="position:absolute;left:-9999px;top:-9999px;" data-astro-cid-myimadtb><label data-astro-cid-myimadtb>Don't fill this out<input type="text" name="website_url" tabindex="-1" autocomplete="off" data-astro-cid-myimadtb></label></div><label class="ec-comment-form-field" data-astro-cid-myimadtb><span data-astro-cid-myimadtb>Comment</span><textarea name="body" required maxlength="5000" rows="4" data-astro-cid-myimadtb></textarea></label>${parentId && renderTemplate`<input type="hidden" name="parentId"${addAttribute(parentId, "value")} data-astro-cid-myimadtb>`}${turnstileSiteKey && renderTemplate`<div class="cf-turnstile"${addAttribute(turnstileSiteKey, "data-sitekey")} data-theme="auto" data-astro-cid-myimadtb></div>`}<button type="submit" class="ec-comment-form-submit" data-astro-cid-myimadtb>Post Comment</button><div class="ec-comment-form-status" role="status" aria-live="polite" data-astro-cid-myimadtb></div></form>`}${enabled && turnstileSiteKey && renderTemplate`<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer><\/script>`}${renderScript($$result, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/CommentForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/CommentForm.astro", void 0);
//#endregion
//#region node_modules/emdash/src/widgets/index.ts
/**
* Get a widget area by name, with all its widgets.
*
* Single query with a left join rather than area-then-widgets so the
* common case costs one round-trip. An area with no widgets yields one
* row with null widget columns, which we skip when mapping.
*/
async function getWidgetArea(name) {
	return requestCached(`widget-area:${name}`, async () => {
		const rows = await (await getDb()).selectFrom("_emdash_widget_areas as a").leftJoin("_emdash_widgets as w", "w.area_id", "a.id").select([
			"a.id as a_id",
			"a.name as a_name",
			"a.label as a_label",
			"a.description as a_description",
			"w.id as w_id",
			"w.type as w_type",
			"w.title as w_title",
			"w.content as w_content",
			"w.menu_name as w_menu_name",
			"w.component_id as w_component_id",
			"w.component_props as w_component_props",
			"w.area_id as w_area_id",
			"w.sort_order as w_sort_order",
			"w.created_at as w_created_at"
		]).where("a.name", "=", name).orderBy("w.sort_order", "asc").execute();
		const first = rows[0];
		if (!first) return null;
		const widgets = [];
		for (const row of rows) {
			if (row.w_id === null) continue;
			const widgetRow = {
				id: row.w_id,
				type: row.w_type,
				title: row.w_title,
				content: row.w_content,
				menu_name: row.w_menu_name,
				component_id: row.w_component_id,
				component_props: row.w_component_props,
				area_id: row.w_area_id,
				sort_order: row.w_sort_order,
				created_at: row.w_created_at
			};
			widgets.push(rowToWidget(widgetRow));
		}
		return {
			id: first.a_id,
			name: first.a_name,
			label: first.a_label,
			description: first.a_description ?? void 0,
			widgets
		};
	});
}
/**
* Convert a widget row to the API type
*/
function rowToWidget(row) {
	const widget = {
		id: row.id,
		type: row.type,
		title: row.title ?? void 0
	};
	if (row.type === "content" && row.content) try {
		widget.content = JSON.parse(row.content);
	} catch {}
	if (row.type === "menu" && row.menu_name) widget.menuName = row.menu_name;
	if (row.type === "component" && row.component_id) {
		widget.componentId = row.component_id;
		if (row.component_props) try {
			widget.componentProps = JSON.parse(row.component_props);
		} catch {}
	}
	return widget;
}
//#endregion
//#region node_modules/emdash/src/utils/url.ts
/**
* URL scheme validation utilities
*
* Prevents XSS via dangerous URL schemes (javascript:, data:, vbscript:, etc.)
* by allowlisting known-safe schemes before rendering into href attributes.
*/
/**
* Matches URLs that are safe to render in href attributes.
*
* Allowed:
* - http:// and https://
* - mailto: and tel:
* - Relative paths (starting with /)
* - Fragment links (starting with #)
* - Protocol-relative URLs are NOT allowed (starting with //) as they can
*   redirect to attacker-controlled hosts.
*/
var SAFE_URL_SCHEME_RE = /^(https?:|mailto:|tel:|\/(?!\/)|#)/i;
/**
* Returns the URL unchanged if it uses a safe scheme, otherwise returns "#".
*
* Use this at the render layer as the primary defense against XSS via
* dangerous URL schemes like `javascript:`, `data:`, or `vbscript:`.
*
* @example
* ```ts
* sanitizeHref("https://example.com")        // "https://example.com"
* sanitizeHref("/about")                      // "/about"
* sanitizeHref("#section")                    // "#section"
* sanitizeHref("mailto:a@b.com")              // "mailto:a@b.com"
* sanitizeHref("javascript:alert(1)")         // "#"
* sanitizeHref("data:text/html,<script>")     // "#"
* sanitizeHref("")                            // "#"
* ```
*/
function sanitizeHref(url) {
	if (!url) return "#";
	return SAFE_URL_SCHEME_RE.test(url) ? url : "#";
}
//#endregion
//#region node_modules/emdash/src/menus/index.ts
/**
* Get a menu by name with resolved URLs.
*
* @example
* ```ts
* const menu = await getMenu("primary");
* const menuEs = await getMenu("primary", { locale: "es" });
* ```
*/
function getMenu(name, options = {}) {
	const locale = resolveLocale(options.locale);
	return requestCached(`menu:${name}:${locale ?? "*"}`, () => cachedQuery({
		namespace: CacheNamespace.MENUS,
		key: `${name}:${locale ?? "*"}`,
		load: async () => {
			return getMenuWithDb(name, await getDb(), { locale });
		}
	}));
}
/**
* Get menu by name with resolved URLs (with explicit db). Internal helper for
* admin routes that already have a database handle.
*/
async function getMenuWithDb(name, db, options = {}) {
	const chain = resolveLocaleChain(options.locale);
	const selectMenu = () => db.selectFrom("_emdash_menus").selectAll().where("name", "=", name);
	let menuRow;
	if (chain.length === 0) menuRow = await selectMenu().orderBy("locale", "asc").executeTakeFirst();
	else {
		menuRow = void 0;
		for (const locale of chain) {
			menuRow = await selectMenu().where("locale", "=", locale).executeTakeFirst();
			if (menuRow) break;
		}
	}
	if (!menuRow) return null;
	const items = await buildMenuTree(await db.selectFrom("_emdash_menu_items").selectAll().$castTo().where("menu_id", "=", menuRow.id).orderBy("sort_order", "asc").execute(), db, menuRow.locale);
	return {
		id: menuRow.id,
		name: menuRow.name,
		label: menuRow.label,
		items,
		locale: menuRow.locale,
		translationGroup: menuRow.translation_group
	};
}
/**
* Build a hierarchical menu tree from a flat list of items. Items are
* resolved against the given `locale` so references land on the right
* per-locale content rows.
*/
async function buildMenuTree(items, db, locale) {
	const collectionSlugs = /* @__PURE__ */ new Set();
	for (const item of items) {
		if (item.reference_collection) collectionSlugs.add(item.reference_collection);
		if (item.type === "page" || item.type === "post") collectionSlugs.add(item.reference_collection || `${item.type}s`);
	}
	const urlPatterns = collectionSlugs.size > 0 ? await getCollectionUrlPatterns(db, collectionSlugs) : /* @__PURE__ */ new Map();
	const validItems = (await Promise.all(items.map((item) => resolveMenuItem(item, db, urlPatterns, locale)))).filter((item) => item !== null);
	const itemMap = /* @__PURE__ */ new Map();
	const rootItems = [];
	for (const item of validItems) itemMap.set(item.id, {
		...item,
		children: []
	});
	for (const item of items) {
		const menuItem = itemMap.get(item.id);
		if (!menuItem) continue;
		if (item.parent_id) {
			const parent = itemMap.get(item.parent_id);
			if (parent) parent.children.push(menuItem);
			else rootItems.push(menuItem);
		} else rootItems.push(menuItem);
	}
	return rootItems;
}
/**
* Look up the `url_pattern` for a set of collection slugs, request-cached so
* a page rendering several menus (header, footer, ...) only pays for the
* lookup once per distinct slug set. Callers must treat the returned map as
* read-only — it is shared across cache hits within the request.
*/
function getCollectionUrlPatterns(db, collectionSlugs) {
	const key = `menu-collection-patterns:${[...collectionSlugs].toSorted().join(",")}`;
	return requestCached(key, async () => {
		const rows = await db.selectFrom("_emdash_collections").select(["slug", "url_pattern"]).where("slug", "in", [...collectionSlugs]).execute();
		const urlPatterns = /* @__PURE__ */ new Map();
		for (const row of rows) urlPatterns.set(row.slug, row.url_pattern);
		return urlPatterns;
	});
}
/**
* Resolve a single menu item's URL. `reference_id` is a translation_group
* (migration 036 remapped all existing references); we join it against
* the per-locale ec_* row or per-locale taxonomy row.
*/
async function resolveMenuItem(item, db, urlPatterns, locale) {
	let url;
	try {
		switch (item.type) {
			case "custom":
				url = item.custom_url || "#";
				break;
			case "page":
			case "post":
				url = await resolveContentUrl(item.reference_collection || `${item.type}s`, item.reference_id, db, urlPatterns, locale);
				if (url === null) return null;
				break;
			case "taxonomy":
				url = await resolveTaxonomyUrl(item.reference_id, db, locale);
				if (url === null) return null;
				break;
			case "collection":
				if (!item.reference_collection) return null;
				if (item.reference_id) {
					url = await resolveContentUrl(item.reference_collection, item.reference_id, db, urlPatterns, locale);
					if (url === null) return null;
				} else url = `/${item.reference_collection}/`;
				break;
			default: if (item.reference_collection && item.reference_id) {
				url = await resolveContentUrl(item.reference_collection, item.reference_id, db, urlPatterns, locale);
				if (url === null) return null;
			} else url = "#";
		}
	} catch (error) {
		console.error(`Failed to resolve menu item ${item.id}:`, error);
		return null;
	}
	return {
		id: item.id,
		label: item.label,
		url: sanitizeHref(url),
		target: item.target || void 0,
		titleAttr: item.title_attr || void 0,
		cssClasses: item.css_classes || void 0,
		children: []
	};
}
var SLUG_PLACEHOLDER = /\{slug\}/g;
var ID_PLACEHOLDER = /\{id\}/g;
/**
* Interpolate a URL pattern with entry data
*
* Replaces `{slug}` and `{id}` placeholders.
*/
function interpolateUrlPattern(pattern, slug, id) {
	return pattern.replace(SLUG_PLACEHOLDER, slug).replace(ID_PLACEHOLDER, id);
}
/**
* Resolve the URL for a content reference. `referenceGroup` is the content
* row's translation_group; we look up the row in the requested locale
* (falling back to the source if no translation exists so the menu link is
* still clickable).
*/
async function resolveContentUrl(collection, referenceGroup, db, urlPatterns, locale) {
	if (!referenceGroup) return null;
	try {
		validateIdentifier(collection, "menu item collection");
		let result = await sql`
			SELECT id, slug FROM ${sql.ref(`ec_${collection}`)}
			WHERE translation_group = ${referenceGroup} AND locale = ${locale}
			LIMIT 1
		`.execute(db);
		let row = result.rows[0];
		if (!row) {
			result = await sql`
				SELECT id, slug FROM ${sql.ref(`ec_${collection}`)}
				WHERE translation_group = ${referenceGroup}
				ORDER BY locale ASC LIMIT 1
			`.execute(db);
			row = result.rows[0];
		}
		if (!row) row = (await sql`
				SELECT id, slug FROM ${sql.ref(`ec_${collection}`)}
				WHERE id = ${referenceGroup} LIMIT 1
			`.execute(db)).rows[0];
		if (!row) return null;
		const pattern = urlPatterns.get(collection);
		if (pattern) return interpolateUrlPattern(pattern, row.slug, row.id);
		return `/${collection}/${row.slug}`;
	} catch (error) {
		console.error(`Failed to resolve content URL for ${collection}/${referenceGroup}:`, error);
		return null;
	}
}
/**
* Resolve URL for a taxonomy term reference. `referenceGroup` is the term's
* translation_group; we pick the row in the active locale (or fall back).
*/
async function resolveTaxonomyUrl(referenceGroup, db, locale) {
	if (!referenceGroup) return null;
	let taxonomy = await db.selectFrom("taxonomies").select(["name", "slug"]).where("translation_group", "=", referenceGroup).where("locale", "=", locale).executeTakeFirst();
	if (!taxonomy) taxonomy = await db.selectFrom("taxonomies").select(["name", "slug"]).where("translation_group", "=", referenceGroup).orderBy("locale", "asc").executeTakeFirst();
	if (!taxonomy) taxonomy = await db.selectFrom("taxonomies").select(["name", "slug"]).where("id", "=", referenceGroup).executeTakeFirst();
	if (!taxonomy) return null;
	return `/${taxonomy.name}/${taxonomy.slug}`;
}
//#endregion
//#region node_modules/emdash/src/components/widgets/RecentPosts.astro
createAstro("https://astro.build");
var $$RecentPosts = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecentPosts;
	const { count = 5, showThumbnails = false, showDate = true } = Astro.props;
	const { entries: posts } = await getEmDashCollection$1("posts", {
		limit: count,
		orderBy: { published_at: "desc" }
	});
	function getString(data, key) {
		const val = data[key];
		return typeof val === "string" ? val : void 0;
	}
	return renderTemplate`${maybeRenderHead($$result)}<ul class="widget-recent-posts">${posts.map((post) => {
		const publishedAt = getString(post.data, "publishedAt");
		const featuredImage = getString(post.data, "featured_image");
		const title = getString(post.data, "title");
		return renderTemplate`<li>${showThumbnails && featuredImage && renderTemplate`<img${addAttribute(featuredImage, "src")} alt="" class="widget-recent-posts__thumbnail">`}<a${addAttribute(`/posts/${post.id}`, "href")} class="widget-recent-posts__link">${title}</a>${showDate && publishedAt && renderTemplate`<time${addAttribute(publishedAt, "datetime")} class="widget-recent-posts__date">${new Date(publishedAt).toLocaleDateString()}</time>`}</li>`;
	})}</ul>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/widgets/RecentPosts.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/widgets/Categories.astro
createAstro("https://astro.build");
var $$Categories = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Categories;
	const { showCount = true, hierarchical = true } = Astro.props;
	const categories = await getTaxonomyTerms("category");
	return renderTemplate`${maybeRenderHead($$result)}<ul class="widget-categories">${categories.length > 0 ? categories.map((category) => renderTemplate`<li><a${addAttribute(`/category/${category.slug}`, "href")} class="widget-categories__link">${category.label}</a>${showCount && category.count !== void 0 && renderTemplate`<span class="widget-categories__count">(${category.count})</span>`}</li>`) : renderTemplate`<li class="widget-categories__empty">No categories yet</li>`}</ul>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/widgets/Categories.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/widgets/Tags.astro
createAstro("https://astro.build");
var $$Tags = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Tags;
	const { showCount = false, limit = 20 } = Astro.props;
	const tags = (await getTaxonomyTerms("tag")).slice(0, limit);
	return renderTemplate`${maybeRenderHead($$result)}<div class="widget-tags">${tags.length > 0 ? renderTemplate`<ul class="widget-tags__cloud">${tags.map((tag) => renderTemplate`<li><a${addAttribute(`/tag/${tag.slug}`, "href")} class="widget-tags__link">${tag.label}</a>${showCount && tag.count !== void 0 && renderTemplate`<span class="widget-tags__count">(${tag.count})</span>`}</li>`)}</ul>` : renderTemplate`<p class="widget-tags__empty">No tags yet</p>`}</div>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/widgets/Tags.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/widgets/Search.astro
createAstro("https://astro.build");
var $$Search = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Search;
	const { placeholder = "Search..." } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<form method="get" action="/search" class="widget-search"><input type="search" name="q"${addAttribute(placeholder, "placeholder")} aria-label="Search" class="widget-search__input"><button type="submit" class="widget-search__button">Search</button></form>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/widgets/Search.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/widgets/Archives.astro
createAstro("https://astro.build");
var $$Archives = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Archives;
	const { type = "monthly", limit = 12 } = Astro.props;
	const { entries: posts } = await getEmDashCollection$1("posts", { orderBy: { published_at: "desc" } });
	const archives = /* @__PURE__ */ new Map();
	for (const post of posts) {
		const publishedAt = post.data.publishedAt;
		if (typeof publishedAt !== "string") continue;
		const date = new Date(publishedAt);
		let key;
		let label;
		let url;
		if (type === "yearly") {
			const year = date.getFullYear();
			key = `${year}`;
			label = `${year}`;
			url = `/archives/${year}`;
		} else {
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			key = `${year}-${month.toString().padStart(2, "0")}`;
			label = date.toLocaleDateString("en-US", {
				year: "numeric",
				month: "long"
			});
			url = `/archives/${year}/${month.toString().padStart(2, "0")}`;
		}
		if (!archives.has(key)) archives.set(key, {
			label,
			count: 0,
			url
		});
		archives.get(key).count++;
	}
	const archiveList = [...archives.values()].slice(0, limit);
	return renderTemplate`${maybeRenderHead($$result)}<ul class="widget-archives">${archiveList.map((archive) => renderTemplate`<li><a${addAttribute(archive.url, "href")} class="widget-archives__link">${archive.label}</a><span class="widget-archives__count">(${archive.count})</span></li>`)}</ul>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/widgets/Archives.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/WidgetRenderer.astro
createAstro("https://astro.build");
var $$WidgetRenderer = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$WidgetRenderer;
	const { widget } = Astro.props;
	const componentMap = {
		"core:recent-posts": $$RecentPosts,
		"core:categories": $$Categories,
		"core:tags": $$Tags,
		"core:search": $$Search,
		"core:archives": $$Archives
	};
	let menuData = null;
	if (widget.type === "menu" && widget.menuName) menuData = await getMenu(widget.menuName);
	let WidgetComponent = null;
	if (widget.type === "component" && widget.componentId) WidgetComponent = componentMap[widget.componentId];
	return renderTemplate`${maybeRenderHead($$result)}<div class="widget"${addAttribute(widget.id, "data-widget-id")}${addAttribute(widget.type, "data-widget-type")}>${widget.title && renderTemplate`<h3 class="widget__title">${widget.title}</h3>`}<div class="widget__content">${widget.type === "content" && widget.content && renderTemplate`${renderComponent($$result, "PortableText", $$PortableText, { "value": widget.content })}`}${widget.type === "menu" && menuData && renderTemplate`<nav class="widget__menu"><ul>${menuData.items.map((item) => renderTemplate`<li><a${addAttribute(sanitizeHref(item.url), "href")}${addAttribute(item.titleAttr || void 0, "title")}>${item.label}</a></li>`)}</ul></nav>`}${widget.type === "component" && WidgetComponent && renderTemplate`${renderComponent($$result, "WidgetComponent", WidgetComponent, { ...widget.componentProps || {} })}`}</div></div>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/WidgetRenderer.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/WidgetArea.astro
createAstro("https://astro.build");
var $$WidgetArea = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$WidgetArea;
	const { name, class: className } = Astro.props;
	const area = await getWidgetArea(name);
	return renderTemplate`${area && area.widgets.length > 0 && renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["widget-area", className], "class:list")}${addAttribute(name, "data-widget-area")}>${area.widgets.map((widget) => renderTemplate`${renderComponent($$result, "WidgetRenderer", $$WidgetRenderer, { "widget": widget })}`)}</div>`}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/WidgetArea.astro", void 0);
//#endregion
//#region node_modules/emdash/src/media/provider-loader.ts
var virtualMediaProviders;
var mediaProviderInstances = /* @__PURE__ */ new Map();
/**
* Load media providers from virtual module
*/
async function loadMediaProviders() {
	if (virtualMediaProviders === void 0) virtualMediaProviders = (await import("./media-providers_DOdgzUGc.mjs")).mediaProviders || [];
}
/**
* Get a media provider by ID.
*
* Used by EmDashMedia component for frontend rendering.
* Providers are lazy-loaded from virtual module and cached.
*
* @example
* ```ts
* const provider = await getMediaProvider("cloudflare-images");
* if (provider) {
*   const embed = provider.getEmbed(mediaValue, { width: 800 });
* }
* ```
*/
async function getMediaProvider(providerId) {
	const cached = mediaProviderInstances.get(providerId);
	if (cached) return cached;
	await loadMediaProviders();
	const entry = virtualMediaProviders?.find((p) => p.id === providerId);
	if (!entry) return;
	const provider = entry.createProvider({});
	mediaProviderInstances.set(providerId, provider);
	return provider;
}
//#endregion
//#region node_modules/emdash/src/media/url.ts
var SAFE_STORAGE_KEY = /^[A-Za-z0-9._-]+$/;
/**
* Build a render-time media URL. Prefers `storageKey`, then rewrites an
* internal `url` via `resolve`, then falls back to the internal proxy for a
* bare `id`. External URLs and non-matching internal-looking URLs pass
* through untouched. Returns `""` when nothing usable is present.
*
* @internal
*/
function buildRenderMediaUrl(resolve, ref) {
	const { storageKey, url, id } = ref;
	if (storageKey) return resolve ? resolve(storageKey) : `${INTERNAL_MEDIA_PREFIX}${storageKey}`;
	if (url) {
		if (resolve && url.startsWith("/_emdash/api/media/file/")) {
			const key = url.slice(INTERNAL_MEDIA_PREFIX.length);
			if (SAFE_STORAGE_KEY.test(key)) return resolve(key);
		}
		return url;
	}
	if (id) return `${INTERNAL_MEDIA_PREFIX}${id}`;
	return "";
}
//#endregion
//#region node_modules/emdash/src/media/responsive.ts
/**
* Responsive image helpers shared by the public Image components.
*
* These build a `srcset` for locally-stored / R2-stored media by delegating to
* Astro's configured image service (`astro:assets`). On Cloudflare that is the
* Images binding; on Node it is sharp; if neither is available it is a no-op
* passthrough. The calling `.astro` component passes Astro's `getImage` in so
* this module stays free of the `astro:assets` virtual import (which only
* resolves inside an Astro project, not in this precompiled package).
*/
/** Standard responsive breakpoints. Matches CDN-provider srcset generation. */
var RESPONSIVE_BREAKPOINTS = [
	640,
	750,
	828,
	960,
	1080,
	1280,
	1600,
	1920
];
/** Matches absolute http(s) URLs — the only shape Astro's image services optimize. */
var ABSOLUTE_HTTP_URL = /^https?:\/\//i;
/**
* Pick the srcset widths to generate for an image rendered at `maxWidth`.
* Includes breakpoints up to 2x (retina) plus the rendered width itself, so the
* browser always has an exact-fit candidate.
*/
function responsiveWidths(maxWidth) {
	const cap = maxWidth * 2;
	const widths = new Set(RESPONSIVE_BREAKPOINTS.filter((w) => w <= cap));
	widths.add(maxWidth);
	return [...widths].toSorted((a, b) => a - b);
}
/** Build the `sizes` attribute for an image with a known display width. */
function responsiveSizes(width) {
	return width ? `(min-width: ${width}px) ${width}px, 100vw` : "100vw";
}
/**
* Make a same-origin media URL absolute so Astro's image service can optimize it.
*
* Astro only optimizes absolute http(s) URLs; a same-origin proxy path like
* `/_emdash/api/media/file/x.jpg` is otherwise treated as an unoptimizable
* public asset. Resolving it against the site's public origin (and authorizing
* that origin via `image.remotePatterns`) lets the service transform it.
*
* Only **same-origin** root-relative paths are resolved. Protocol-relative
* URLs (`//evil.com/x`) and backslash tricks (`/\evil.com`) also start with `/`
* but resolve to a different origin -- a classic SSRF vector once a
* remotePattern authorizes the media path -- so anything that escapes the
* origin is returned unchanged (and then skipped by `buildResponsiveImage`,
* which only accepts absolute http(s) URLs). Already-absolute URLs (CDN/public
* bucket) and non-path values (`data:`, `blob:`) are returned unchanged too.
*/
function toAbsoluteMediaUrl(src, origin) {
	if (!src || !origin || !src.startsWith("/")) return src;
	try {
		const resolved = new URL(src, origin);
		if (resolved.origin !== new URL(origin).origin) return src;
		return resolved.href;
	} catch {
		return src;
	}
}
/**
* Generate a responsive `src`/`srcset`/`sizes` for a media URL via Astro's
* configured image service.
*
* Astro's image services (sharp, Cloudflare `/cdn-cgi/image`, and the default
* Cloudflare `cloudflare-binding` service) only optimize **absolute** URLs whose
* host is authorized via `image.domains` / `image.remotePatterns`. Anything else
* is passed through unchanged, which would yield a useless srcset (the same URL
* at every width descriptor). We therefore only attempt optimization for
* absolute http(s) URLs and verify the service actually rewrote the URL.
*
* Returns `null` so callers fall back to a plain `<img>` when:
*  - dimensions are unknown (avoids an inferSize fetch on every render),
*  - the URL is relative (a same-origin proxy/public asset Astro won't optimize),
*  - the host isn't authorized (the service passed the URL through unchanged),
*  - no image service is configured / `getImage` throws.
*/
async function buildResponsiveImage(getImage, opts) {
	const { src, width, height } = opts;
	if (!src || !width || !height) return null;
	if (!ABSOLUTE_HTTP_URL.test(src)) return null;
	try {
		const sizes = responsiveSizes(width);
		const result = await getImage({
			src,
			width,
			height,
			widths: responsiveWidths(width),
			sizes
		});
		if (!result.src || result.src === src) return null;
		return {
			src: result.src,
			srcset: result.srcSet?.attribute || void 0,
			sizes
		};
	} catch {
		return null;
	}
}
//#endregion
//#region node_modules/emdash/src/api/public-url.ts
var _envSiteUrl = null;
function getEnvSiteUrl() {
	if (_envSiteUrl !== null) return _envSiteUrl || void 0;
	try {
		const value = typeof process !== "undefined" && process.env?.EMDASH_SITE_URL || typeof process !== "undefined" && process.env?.SITE_URL || "";
		if (value) {
			const parsed = new URL(value);
			if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
				_envSiteUrl = "";
				return;
			}
			_envSiteUrl = parsed.origin;
		} else _envSiteUrl = "";
	} catch {
		_envSiteUrl = "";
	}
	return _envSiteUrl || void 0;
}
function getPublicOrigin(url, config) {
	return config?.siteUrl || getEnvSiteUrl() || url.origin;
}
//#endregion
//#region node_modules/emdash/src/components/EmDashImage.astro
createAstro("https://astro.build");
var $$EmDashImage = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EmDashImage;
	const { image, alt, width, height, priority, placeholder = true, class: className, ...attrs } = Astro.props;
	function normalizeImage(img) {
		if (!img) return null;
		if (typeof img === "string") return {
			id: "",
			src: img
		};
		return img;
	}
	function buildLocalImageUrl(img) {
		return buildRenderMediaUrl(Astro.locals.emdash?.getPublicMediaUrl, {
			storageKey: img.meta?.storageKey,
			id: img.id
		});
	}
	function generateSrcset(getSrc, maxWidth, aspectRatio) {
		return RESPONSIVE_BREAKPOINTS.filter((w) => w <= maxWidth * 2).map((w) => {
			return `${getSrc({
				width: w,
				height: aspectRatio ? Math.round(w / aspectRatio) : void 0
			})} ${w}w`;
		}).join(", ");
	}
	const img = normalizeImage(image);
	const finalWidth = width ?? img?.width;
	const finalHeight = height ?? img?.height;
	const finalAlt = alt ?? img?.alt ?? "";
	const aspectRatio = finalWidth && finalHeight ? finalWidth / finalHeight : void 0;
	let src = "";
	let srcset;
	let sizes;
	let astroImageSrc = "";
	if (img) {
		const providerId = img.provider ?? "local";
		if (providerId === "local" || img.src) {
			src = img.src || buildLocalImageUrl(img);
			const publicOrigin = getPublicOrigin(Astro.url, Astro.locals.emdash?.config);
			const absoluteSrc = toAbsoluteMediaUrl(src, publicOrigin);
			if (finalWidth && finalHeight && absoluteSrc.startsWith(`${publicOrigin}/`)) astroImageSrc = absoluteSrc;
			else {
				const optimized = await buildResponsiveImage(getImage, {
					src: absoluteSrc,
					width: finalWidth,
					height: finalHeight
				});
				if (optimized) {
					src = optimized.src;
					srcset = optimized.srcset;
					sizes = optimized.sizes;
				}
			}
		} else {
			try {
				const provider = await getMediaProvider(providerId);
				if (provider) {
					const result = provider.getEmbed(img, {
						width: finalWidth,
						height: finalHeight
					});
					const embed = result instanceof Promise ? await result : result;
					if (embed.type === "image") {
						src = embed.src;
						if (embed.getSrc) {
							const maxWidth = finalWidth || 1200;
							srcset = generateSrcset(embed.getSrc, maxWidth, aspectRatio);
							sizes = finalWidth ? `(min-width: ${finalWidth}px) ${finalWidth}px, 100vw` : "100vw";
						}
					}
				} else console.warn(`[EmDashImage] Provider not found: ${providerId}`);
			} catch (error) {
				console.error(`[EmDashImage] Failed to get embed for image ${img.id}:`, error);
			}
			if (!src) src = buildLocalImageUrl(img);
		}
	}
	const blurhash = img?.blurhash ?? img?.meta?.blurhash;
	const dominantColor = img?.dominantColor ?? img?.meta?.dominantColor;
	let placeholderStyle = "";
	if (placeholder && blurhash) {
		const { blurhashToImageCssString } = await import("@unpic/placeholder");
		placeholderStyle = blurhashToImageCssString(blurhash);
	} else if (placeholder && dominantColor) placeholderStyle = `background-color: ${dominantColor};`;
	const imgProps = {
		src,
		srcset,
		sizes,
		width: finalWidth,
		height: finalHeight,
		alt: finalAlt,
		loading: priority ? "eager" : "lazy",
		fetchpriority: priority ? "high" : void 0,
		decoding: "async",
		style: placeholderStyle || void 0,
		class: ["emdash-image-media", className].filter(Boolean).join(" "),
		...attrs
	};
	return renderTemplate`${img && astroImageSrc ? renderTemplate`${renderComponent($$result, "AstroImage", $$ResponsiveImage, {
		"src": astroImageSrc,
		"alt": finalAlt,
		"width": finalWidth,
		"height": finalHeight,
		"priority": priority,
		"layout": "constrained",
		"loading": priority ? "eager" : "lazy",
		"decoding": "async",
		"class": className,
		"style": placeholderStyle || void 0,
		...attrs,
		"data-astro-cid-6depetnu": true
	})}` : img && src ? renderTemplate`${maybeRenderHead($$result)}<img${spreadAttributes(imgProps, void 0, { "class": "astro-6depetnu" })} data-astro-cid-6depetnu>` : null}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/EmDashImage.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/EmDashMedia.astro
createAstro("https://astro.build");
var $$EmDashMedia = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EmDashMedia;
	const { value, alt, width, height, format, ...attrs } = Astro.props;
	function normalizeValue(val) {
		if (!val) return null;
		if (typeof val === "string") return {
			id: "",
			src: val,
			provider: "local"
		};
		return val;
	}
	const media = normalizeValue(value);
	let embed = null;
	if (media) {
		const providerId = media.provider ?? "local";
		const provider = await getMediaProvider(providerId);
		if (provider) {
			const embedOptions = {
				width,
				height,
				format
			};
			try {
				const result = provider.getEmbed(media, embedOptions);
				embed = result instanceof Promise ? await result : result;
			} catch (error) {
				console.warn(`Failed to get embed for media ${media.id}:`, error);
			}
		} else if (media.src) embed = {
			type: "image",
			src: media.src,
			width: media.width,
			height: media.height,
			alt: media.alt
		};
		else if (providerId === "local") {
			const storageKey = media.meta?.storageKey || media.id;
			if (storageKey) {
				const mimeType = media.mimeType || "";
				if (mimeType.startsWith("video/")) embed = {
					type: "video",
					src: `/_emdash/api/media/file/${storageKey}`,
					width: media.width,
					height: media.height,
					controls: true,
					preload: "metadata"
				};
				else if (mimeType.startsWith("audio/")) embed = {
					type: "audio",
					src: `/_emdash/api/media/file/${storageKey}`,
					controls: true,
					preload: "metadata"
				};
				else embed = {
					type: "image",
					src: `/_emdash/api/media/file/${storageKey}`,
					width: media.width,
					height: media.height,
					alt: media.alt
				};
			}
		}
	}
	const finalAlt = alt ?? (embed?.type === "image" ? embed.alt : void 0) ?? media?.alt ?? "";
	return renderTemplate`${embed?.type === "image" && renderTemplate`${maybeRenderHead($$result)}<img${addAttribute(embed.src, "src")}${addAttribute(embed.srcset, "srcset")}${addAttribute(embed.sizes, "sizes")}${addAttribute(embed.width, "width")}${addAttribute(embed.height, "height")}${addAttribute(finalAlt, "alt")} loading="lazy" decoding="async"${spreadAttributes(attrs)}>`}${embed?.type === "video" && renderTemplate`<video${addAttribute(embed.width, "width")}${addAttribute(embed.height, "height")}${addAttribute(embed.controls ?? true, "controls")}${addAttribute(embed.autoplay, "autoplay")}${addAttribute(embed.muted, "muted")}${addAttribute(embed.loop, "loop")}${addAttribute(embed.playsinline, "playsinline")}${addAttribute(embed.preload ?? "metadata", "preload")}${addAttribute(embed.crossorigin, "crossorigin")}${addAttribute(embed.poster, "poster")}${spreadAttributes(attrs)}>${embed.src && renderTemplate`<source${addAttribute(embed.src, "src")}>`}${embed.sources?.map((s) => renderTemplate`<source${addAttribute(s.src, "src")}${addAttribute(s.type, "type")}>`)}</video>`}${embed?.type === "audio" && renderTemplate`<audio${addAttribute(embed.controls ?? true, "controls")}${addAttribute(embed.autoplay, "autoplay")}${addAttribute(embed.muted, "muted")}${addAttribute(embed.loop, "loop")}${addAttribute(embed.preload ?? "metadata", "preload")}${spreadAttributes(attrs)}>${embed.src && renderTemplate`<source${addAttribute(embed.src, "src")}>`}${embed.sources?.map((s) => renderTemplate`<source${addAttribute(s.src, "src")}${addAttribute(s.type, "type")}>`)}</audio>`}${embed?.type === "component" && renderTemplate`<div class="emdash-media-component"${addAttribute(embed.package, "data-package")}${addAttribute(embed.export, "data-export")}><p>Custom media component: ${embed.package}</p></div>`}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/EmDashMedia.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/portable-text-text-align.ts
var ALIGN_CLASS_MAP = {
	center: "has-text-align-center",
	right: "has-text-align-right",
	justify: "has-text-align-justify"
};
/**
* Returns the CSS class for a textAlign value, or `undefined` when no class
* should be emitted (default left, missing, or unknown values).
*
* Allowlist-only by design: arbitrary strings are rejected so a hand-edited
* or imported Portable Text block cannot inject attacker-controlled class
* names into the rendered HTML.
*/
function textAlignClassName(value) {
	if (value === void 0) return void 0;
	if (Object.hasOwn(ALIGN_CLASS_MAP, value)) return ALIGN_CLASS_MAP[value];
}
//#endregion
//#region node_modules/emdash/src/components/Block.astro
createAstro("https://astro.build");
var $$Block = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Block;
	const { node, index: _index, isInline: _isInline, ...attrs } = Astro.props;
	const styleIs = (style) => style === node.style;
	const alignClass = textAlignClassName(node.textAlign);
	return renderTemplate`${styleIs("h1") ? renderTemplate`${maybeRenderHead($$result)}<h1${addAttribute(alignClass, "class")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h1>` : styleIs("h2") ? renderTemplate`<h2${addAttribute(alignClass, "class")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h2>` : styleIs("h3") ? renderTemplate`<h3${addAttribute(alignClass, "class")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h3>` : styleIs("h4") ? renderTemplate`<h4${addAttribute(alignClass, "class")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h4>` : styleIs("h5") ? renderTemplate`<h5${addAttribute(alignClass, "class")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h5>` : styleIs("h6") ? renderTemplate`<h6${addAttribute(alignClass, "class")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h6>` : styleIs("blockquote") ? renderTemplate`<blockquote${addAttribute(alignClass, "class")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</blockquote>` : styleIs("normal") ? renderTemplate`<p${addAttribute(alignClass, "class")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</p>` : renderTemplate`<p${addAttribute(alignClass, "class")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</p>`}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/Block.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/Image.astro
createAstro("https://astro.build");
var $$Image = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Image;
	function generateSrcset(getSrc, maxWidth, aspectRatio) {
		return RESPONSIVE_BREAKPOINTS.filter((w) => w <= maxWidth * 2).map((w) => {
			return `${getSrc({
				width: w,
				height: aspectRatio ? Math.round(w / aspectRatio) : void 0
			})} ${w}w`;
		}).join(", ");
	}
	const { node, placeholder = true } = Astro.props;
	if (!node?.asset) return null;
	const { asset, alt = "", caption, width, height, displayWidth, displayHeight, alignment } = node;
	const aspectRatio = width && height ? width / height : void 0;
	let renderWidth;
	let renderHeight;
	if (displayWidth && displayHeight) {
		renderWidth = displayWidth;
		renderHeight = displayHeight;
	} else if (displayWidth && aspectRatio) {
		renderWidth = displayWidth;
		renderHeight = Math.round(displayWidth / aspectRatio);
	} else if (displayHeight && aspectRatio) {
		renderWidth = Math.round(displayHeight * aspectRatio);
		renderHeight = displayHeight;
	} else {
		renderWidth = width;
		renderHeight = height;
	}
	let src = "";
	let srcset;
	let sizes;
	let astroImageSrc = "";
	const providerId = asset.provider;
	if (providerId && providerId !== "local") {
		const provider = await getMediaProvider(providerId);
		if (provider) try {
			const mediaValue = {
				provider: providerId,
				id: asset._ref,
				width: renderWidth,
				height: renderHeight,
				alt
			};
			const result = provider.getEmbed(mediaValue, {
				width: renderWidth,
				height: renderHeight
			});
			const embed = result instanceof Promise ? await result : result;
			if (embed.type === "image") {
				src = embed.src;
				if (embed.getSrc) {
					const maxWidth = renderWidth || 1200;
					const ar = renderWidth && renderHeight ? renderWidth / renderHeight : aspectRatio;
					srcset = generateSrcset(embed.getSrc, maxWidth, ar);
					sizes = renderWidth ? `(min-width: ${renderWidth}px) ${renderWidth}px, 100vw` : "100vw";
				}
			}
		} catch (error) {
			console.warn(`Failed to get embed for image ${asset._ref}:`, error);
		}
	}
	if (!src) {
		src = buildRenderMediaUrl(Astro.locals.emdash?.getPublicMediaUrl, {
			url: asset.url,
			id: asset._ref
		});
		if (renderWidth && renderHeight) astroImageSrc = toAbsoluteMediaUrl(src, getPublicOrigin(Astro.url, Astro.locals.emdash?.config));
	}
	const blurhash = node.blurhash ?? asset.meta?.blurhash;
	const dominantColor = node.dominantColor ?? asset.meta?.dominantColor;
	let placeholderStyle = "";
	if (placeholder && blurhash) {
		const { blurhashToImageCssString } = await import("@unpic/placeholder");
		placeholderStyle = blurhashToImageCssString(blurhash);
	} else if (placeholder && dominantColor) placeholderStyle = `background-color: ${dominantColor};`;
	return renderTemplate`${maybeRenderHead($$result)}<figure${addAttribute(["emdash-image", alignment && `emdash-image--align-${alignment}`], "class:list")} data-astro-cid-nzlefzml>${astroImageSrc ? renderTemplate`${renderComponent($$result, "AstroImage", $$ResponsiveImage, {
		"src": astroImageSrc,
		"alt": alt,
		"width": renderWidth,
		"height": renderHeight,
		"layout": "constrained",
		"loading": "lazy",
		"decoding": "async",
		"style": placeholderStyle || void 0,
		"data-astro-cid-nzlefzml": true
	})}` : renderTemplate`<img${addAttribute(src, "src")}${addAttribute(srcset, "srcset")}${addAttribute(sizes, "sizes")}${addAttribute(alt, "alt")}${addAttribute(renderWidth, "width")}${addAttribute(renderHeight, "height")} loading="lazy" decoding="async"${addAttribute(placeholderStyle || void 0, "style")} data-astro-cid-nzlefzml>`}${caption && renderTemplate`<figcaption data-astro-cid-nzlefzml>${caption}</figcaption>`}</figure>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/Image.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/Code.astro
createAstro("https://astro.build");
var $$Code = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Code;
	const { node } = Astro.props;
	if (!node?.code) return null;
	const { code, language, filename } = node;
	const languageClass = language ? `language-${language}` : "";
	return renderTemplate`${maybeRenderHead($$result)}<div class="emdash-code" data-astro-cid-dgremz56>${filename && renderTemplate`<div class="emdash-code-filename" data-astro-cid-dgremz56>${filename}</div>`}<pre${addAttribute(languageClass, "class")} data-astro-cid-dgremz56><code${addAttribute(languageClass, "class")} data-astro-cid-dgremz56>${code}</code></pre></div>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/Code.astro", void 0);
//#endregion
//#region node_modules/emdash/src/utils/sanitize.ts
/**
* Sanitize HTML content to prevent XSS attacks.
*
* Allows standard formatting tags, images, iframes (from specific providers),
* and basic attributes.
*/
function sanitizeContent(html) {
	return sanitizeHtml(html, {
		allowedTags: [
			...sanitizeHtml.defaults.allowedTags,
			"img",
			"span",
			"iframe"
		],
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			"*": [
				"class",
				"id",
				"data-*"
			],
			iframe: [
				"src",
				"width",
				"height",
				"frameborder",
				"allow",
				"allowfullscreen"
			],
			img: [
				"src",
				"srcset",
				"alt",
				"title",
				"width",
				"height",
				"loading"
			]
		},
		allowedIframeHostnames: ["www.youtube.com", "player.vimeo.com"]
	});
}
//#endregion
//#region node_modules/emdash/src/components/Embed.astro
createAstro("https://astro.build");
var $$Embed = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Embed;
	const { node } = Astro.props;
	if (!node?.url) return null;
	const { url: rawUrl, provider, html, caption } = node;
	const url = sanitizeHref(rawUrl);
	const YOUTUBE_ID_PATTERN = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
	const VIMEO_ID_PATTERN = /vimeo\.com\/(\d+)/;
	function getYouTubeId(input) {
		return input.match(YOUTUBE_ID_PATTERN)?.[1] || null;
	}
	function getVimeoId(input) {
		return input.match(VIMEO_ID_PATTERN)?.[1] || null;
	}
	const youtubeId = getYouTubeId(url);
	const vimeoId = getVimeoId(url);
	const isSelfHostedVideo = provider === "video";
	const isSelfHostedAudio = provider === "audio";
	return renderTemplate`${maybeRenderHead($$result)}<figure class="emdash-embed" data-astro-cid-n4v2ghzc>${isSelfHostedVideo ? renderTemplate`<div class="emdash-embed-video" data-astro-cid-n4v2ghzc><video controls preload="metadata" data-astro-cid-n4v2ghzc><source${addAttribute(url, "src")} data-astro-cid-n4v2ghzc>Your browser does not support the video element.</video></div>` : isSelfHostedAudio ? renderTemplate`<div class="emdash-embed-audio" data-astro-cid-n4v2ghzc><audio controls preload="metadata" data-astro-cid-n4v2ghzc><source${addAttribute(url, "src")} data-astro-cid-n4v2ghzc>Your browser does not support the audio element.</audio></div>` : youtubeId ? renderTemplate`<div class="emdash-embed-video" data-astro-cid-n4v2ghzc><iframe${addAttribute(`https://www.youtube.com/embed/${youtubeId}`, "src")} title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-astro-cid-n4v2ghzc></iframe></div>` : vimeoId ? renderTemplate`<div class="emdash-embed-video" data-astro-cid-n4v2ghzc><iframe${addAttribute(`https://player.vimeo.com/video/${vimeoId}`, "src")} title="Vimeo video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen data-astro-cid-n4v2ghzc></iframe></div>` : html ? renderTemplate`<div class="emdash-embed-html" data-astro-cid-n4v2ghzc>${unescapeHTML(sanitizeContent(html))}</div>` : renderTemplate`<a${addAttribute(url, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-n4v2ghzc>${url}</a>`}${caption && renderTemplate`<figcaption data-astro-cid-n4v2ghzc>${caption}</figcaption>`}</figure>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/Embed.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/Gallery.astro
createAstro("https://astro.build");
var $$Gallery = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Gallery;
	const { node } = Astro.props;
	const images = node?.images ?? [];
	const columns = node?.columns ?? 3;
	if (!images.length) return null;
	return renderTemplate`${maybeRenderHead($$result)}<div class="emdash-gallery"${addAttribute(`--columns: ${columns}`, "style")} data-astro-cid-d6nmylgu>${images.map((image) => {
		const src = buildRenderMediaUrl(Astro.locals.emdash?.getPublicMediaUrl, {
			url: image.asset.url,
			id: image.asset._ref
		});
		const hasSize = image.width && image.height;
		return renderTemplate`<figure class="emdash-gallery-item" data-astro-cid-d6nmylgu>${hasSize ? renderTemplate`${renderComponent($$result, "AstroImage", $$ResponsiveImage, {
			"src": src,
			"alt": image.alt || "",
			"width": image.width,
			"height": image.height,
			"layout": "constrained",
			"data-astro-cid-d6nmylgu": true
		})}` : renderTemplate`<img${addAttribute(src, "src")}${addAttribute(image.alt || "", "alt")} loading="lazy" decoding="async" data-astro-cid-d6nmylgu>`}${image.caption && renderTemplate`<figcaption data-astro-cid-d6nmylgu>${image.caption}</figcaption>`}</figure>`;
	})}</div>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/Gallery.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/Columns.astro
createAstro("https://astro.build");
var $$Columns = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Columns;
	const { node } = Astro.props;
	const columns = node?.columns ?? [];
	if (!columns.length) return null;
	return renderTemplate`${maybeRenderHead($$result)}<div class="emdash-columns"${addAttribute(`--column-count: ${columns.length}`, "style")} data-astro-cid-sjaxkm7w>${columns.map((column) => renderTemplate`<div class="emdash-column"${addAttribute(column.width ? `flex-basis: ${column.width}` : void 0, "style")} data-astro-cid-sjaxkm7w>${renderComponent($$result, "PortableText", $$PortableText$1, {
		"value": column.content,
		"data-astro-cid-sjaxkm7w": true
	})}</div>`)}</div>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/Columns.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/Break.astro
createAstro("https://astro.build");
var $$Break = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Break;
	const { node } = Astro.props;
	const style = node?.style || "line";
	return renderTemplate`${style === "dots" ? renderTemplate`${maybeRenderHead($$result)}<div class="emdash-break emdash-break-dots" data-astro-cid-gvovdxls>• • •</div>` : style === "space" ? renderTemplate`<div class="emdash-break emdash-break-space" data-astro-cid-gvovdxls></div>` : renderTemplate`<hr class="emdash-break emdash-break-line" data-astro-cid-gvovdxls>`}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/Break.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/HtmlBlock.astro
createAstro("https://astro.build");
var $$HtmlBlock = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HtmlBlock;
	const { node } = Astro.props;
	if (!node?.html) return null;
	const sanitized = sanitizeContent(node.html);
	return renderTemplate`${maybeRenderHead($$result)}<div class="emdash-html-block" data-astro-cid-7hlqo6bn>${unescapeHTML(sanitized)}</div>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/HtmlBlock.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/marks/Link.astro
createAstro("https://astro.build");
var $$Link = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Link;
	const { node } = Astro.props;
	const href = sanitizeHref(node?.markDef?.href);
	const blank = !href.startsWith("#") && node?.markDef?.blank;
	return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")}${addAttribute(blank ? "_blank" : void 0, "target")}${addAttribute(blank ? "noopener noreferrer" : void 0, "rel")}>${renderSlot($$result, $$slots["default"])}</a>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/marks/Link.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/marks/StrikeThrough.astro
var $$StrikeThrough = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<s>${renderSlot($$result, $$slots["default"])}</s>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/marks/StrikeThrough.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/marks/Subscript.astro
var $$Subscript = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<sub>${renderSlot($$result, $$slots["default"])}</sub>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/marks/Subscript.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/marks.ts
/**
* Shared mark component map for Portable Text rendering.
*
* Used by both the top-level `emdashComponents` config and individual block
* components (e.g. Table) that render nested inline content through the PT
* pipeline.
*/
var emdashMarkComponents = {
	superscript: createComponent(($$result, $$props, $$slots) => {
		return renderTemplate`${maybeRenderHead($$result)}<sup>${renderSlot($$result, $$slots["default"])}</sup>`;
	}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/marks/Superscript.astro", void 0),
	subscript: $$Subscript,
	underline: createComponent(($$result, $$props, $$slots) => {
		return renderTemplate`${maybeRenderHead($$result)}<u>${renderSlot($$result, $$slots["default"])}</u>`;
	}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/marks/Underline.astro", void 0),
	"strike-through": $$StrikeThrough,
	link: $$Link
};
//#endregion
//#region node_modules/emdash/src/components/Table.astro
createAstro("https://astro.build");
var $$Table = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Table;
	const markComponents = { mark: emdashMarkComponents };
	const { node } = Astro.props;
	const rows = node?.rows ?? [];
	if (!rows.length) return null;
	function cellToBlock(cell) {
		return [{
			_type: "block",
			_key: cell._key,
			children: cell.content,
			markDefs: cell.markDefs ?? []
		}];
	}
	const hasHeader = node?.hasHeaderRow;
	const headerRow = hasHeader ? rows[0] : null;
	const bodyRows = hasHeader ? rows.slice(1) : rows;
	return renderTemplate`${maybeRenderHead($$result)}<div class="emdash-table-wrapper" data-astro-cid-7uypp5bz><table class="emdash-table" data-astro-cid-7uypp5bz>${headerRow && renderTemplate`<thead data-astro-cid-7uypp5bz><tr data-astro-cid-7uypp5bz>${headerRow.cells.map((cell) => renderTemplate`<th data-astro-cid-7uypp5bz>${renderComponent($$result, "PortableText", $$PortableText$1, {
		"value": cellToBlock(cell),
		"components": markComponents,
		"data-astro-cid-7uypp5bz": true
	})}</th>`)}</tr></thead>`}<tbody data-astro-cid-7uypp5bz>${bodyRows.map((row) => renderTemplate`<tr data-astro-cid-7uypp5bz>${row.cells.map((cell) => {
		const CellTag = cell.isHeader ? "th" : "td";
		return renderTemplate`${renderComponent($$result, "CellTag", CellTag, { "data-astro-cid-7uypp5bz": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PortableText", $$PortableText$1, {
			"value": cellToBlock(cell),
			"components": markComponents,
			"data-astro-cid-7uypp5bz": true
		})}` })}`;
	})}</tr>`)}</tbody></table></div>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/Table.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/Button.astro
createAstro("https://astro.build");
var $$Button = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Button;
	const { node } = Astro.props;
	const { text, url: rawUrl, style = "default" } = node ?? {};
	const url = rawUrl ? sanitizeHref(rawUrl) : void 0;
	return renderTemplate`${url ? renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(url, "href")}${addAttribute(["emdash-button", `emdash-button--${style}`], "class:list")} data-astro-cid-i644adhy>${text}</a>` : renderTemplate`<span${addAttribute(["emdash-button", `emdash-button--${style}`], "class:list")} data-astro-cid-i644adhy>${text}</span>`}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/Button.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/Buttons.astro
createAstro("https://astro.build");
var $$Buttons = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Buttons;
	const { node } = Astro.props;
	const { buttons = [], layout = "horizontal" } = node ?? {};
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["emdash-buttons", `emdash-buttons--${layout}`], "class:list")} data-astro-cid-pxkpowas>${buttons.map((button) => renderTemplate`${renderComponent($$result, "Button", $$Button, {
		"node": button,
		"data-astro-cid-pxkpowas": true
	})}`)}</div>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/Buttons.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/Cover.astro
createAstro("https://astro.build");
var $$Cover = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Cover;
	const { node } = Astro.props;
	const { backgroundImage, backgroundVideo, overlayColor, overlayOpacity = .5, content = [], minHeight = "300px", alignment = "center" } = node ?? {};
	const hasBackground = backgroundImage || backgroundVideo;
	const overlayStyle = overlayColor ? `background-color: ${overlayColor}; opacity: ${overlayOpacity};` : `background-color: rgba(0, 0, 0, ${overlayOpacity});`;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["emdash-cover", `emdash-cover--align-${alignment}`], "class:list")}${addAttribute(`min-height: ${minHeight};`, "style")} data-astro-cid-g6rigryn>${backgroundImage && !backgroundVideo && renderTemplate`<img${addAttribute(backgroundImage, "src")} alt="" class="emdash-cover__background" loading="lazy" data-astro-cid-g6rigryn>`}${backgroundVideo && renderTemplate`<video class="emdash-cover__background emdash-cover__video" autoplay muted loop playsinline data-astro-cid-g6rigryn><source${addAttribute(backgroundVideo, "src")} data-astro-cid-g6rigryn></video>`}${hasBackground && renderTemplate`<div class="emdash-cover__overlay"${addAttribute(overlayStyle, "style")} data-astro-cid-g6rigryn></div>`}<div class="emdash-cover__content" data-astro-cid-g6rigryn>${renderComponent($$result, "PortableText", $$PortableText$1, {
		"value": content,
		"data-astro-cid-g6rigryn": true
	})}</div></div>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/Cover.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/File.astro
createAstro("https://astro.build");
var $$File = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$File;
	const { node } = Astro.props;
	const { url: rawUrl, filename, showDownloadButton = true } = node ?? {};
	const url = sanitizeHref(rawUrl);
	const displayName = filename || url?.split("/").pop()?.split("?")[0] || "Download";
	return renderTemplate`${maybeRenderHead($$result)}<div class="emdash-file" data-astro-cid-dsnn5jk3><a${addAttribute(url, "href")} class="emdash-file__link"${addAttribute(filename, "download")} data-astro-cid-dsnn5jk3><svg class="emdash-file__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-dsnn5jk3><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-dsnn5jk3></path><polyline points="14 2 14 8 20 8" data-astro-cid-dsnn5jk3></polyline></svg><span class="emdash-file__name" data-astro-cid-dsnn5jk3>${displayName}</span></a>${showDownloadButton && renderTemplate`<a${addAttribute(url, "href")} class="emdash-file__download"${addAttribute(filename, "download")} aria-label="Download file" data-astro-cid-dsnn5jk3><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-dsnn5jk3><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-astro-cid-dsnn5jk3></path><polyline points="7 10 12 15 17 10" data-astro-cid-dsnn5jk3></polyline><line x1="12" y1="15" x2="12" y2="3" data-astro-cid-dsnn5jk3></line></svg></a>`}</div>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/File.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/Pullquote.astro
createAstro("https://astro.build");
var $$Pullquote = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Pullquote;
	const { node } = Astro.props;
	const { text, citation } = node ?? {};
	return renderTemplate`${maybeRenderHead($$result)}<figure class="emdash-pullquote" data-astro-cid-mtrxdgkr><blockquote class="emdash-pullquote__text" data-astro-cid-mtrxdgkr>${text}</blockquote>${citation && renderTemplate`<figcaption class="emdash-pullquote__citation" data-astro-cid-mtrxdgkr>&mdash; ${citation}</figcaption>`}</figure>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/Pullquote.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/BlockquoteGroup.astro
createAstro("https://astro.build");
var $$BlockquoteGroup = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BlockquoteGroup;
	const { node } = Astro.props;
	const paragraphs = (node?.blocks ?? []).map((block) => ({
		...block,
		style: "normal"
	}));
	return renderTemplate`${maybeRenderHead($$result)}<blockquote>${renderComponent($$result, "PortableText", $$PortableText$1, {
		"value": paragraphs,
		"components": {
			block: $$Block,
			mark: emdashMarkComponents
		}
	})}</blockquote>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/BlockquoteGroup.astro", void 0);
//#endregion
//#region node_modules/emdash/src/page/metadata.ts
var SAFE_HREF_RE = /^(https?|at):\/\//i;
var HTML_ESCAPE_MAP = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
};
var HTML_ESCAPE_RE = /[&<>"']/g;
function escapeHtmlAttr(value) {
	return value.replace(HTML_ESCAPE_RE, (ch) => HTML_ESCAPE_MAP[ch] ?? ch);
}
function isSafeHref(url) {
	return SAFE_HREF_RE.test(url);
}
var JSONLD_LT_RE = /</g;
var JSONLD_GT_RE = />/g;
var JSONLD_U2028_RE = /\u2028/g;
var JSONLD_U2029_RE = /\u2029/g;
function safeJsonLdSerialize(value) {
	return JSON.stringify(value).replace(JSONLD_LT_RE, "\\u003c").replace(JSONLD_GT_RE, "\\u003e").replace(JSONLD_U2028_RE, "\\u2028").replace(JSONLD_U2029_RE, "\\u2029");
}
async function createSha256CspHash(value) {
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
	const bytes = new Uint8Array(digest);
	let binary = "";
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return `sha256-${btoa(binary)}`;
}
async function registerJsonLdCspHashes(enabled, getCsp, scripts) {
	if (!enabled || scripts.length === 0) return;
	const csp = getCsp();
	if (!csp) return;
	await Promise.all(scripts.map(async ({ json }) => {
		csp.insertScriptHash(await createSha256CspHash(json));
	}));
}
function resolvePageMetadata(contributions) {
	const result = {
		meta: [],
		properties: [],
		links: [],
		jsonld: []
	};
	const seenMeta = /* @__PURE__ */ new Set();
	const seenProperties = /* @__PURE__ */ new Set();
	const seenLinks = /* @__PURE__ */ new Set();
	const seenJsonLd = /* @__PURE__ */ new Set();
	for (const c of contributions) switch (c.kind) {
		case "meta": {
			const dedupeKey = c.key ?? c.name;
			if (seenMeta.has(dedupeKey)) continue;
			seenMeta.add(dedupeKey);
			result.meta.push({
				name: c.name,
				content: c.content
			});
			break;
		}
		case "property": {
			const dedupeKey = c.key ?? c.property;
			if (seenProperties.has(dedupeKey)) continue;
			seenProperties.add(dedupeKey);
			result.properties.push({
				property: c.property,
				content: c.content
			});
			break;
		}
		case "link":
			if (!isSafeHref(c.href)) {
				if (Object.assign({
					"ASSETS_PREFIX": void 0,
					"BASE_URL": "/",
					"DEV": false,
					"MODE": "production",
					"PROD": true,
					"SITE": void 0,
					"SSR": true
				}, {})?.DEV) console.warn(`[page:metadata] Rejected link contribution with unsafe href scheme: ${c.href}`);
				continue;
			}
			if (c.rel === "canonical") {
				if (seenLinks.has("canonical")) continue;
				seenLinks.add("canonical");
			} else {
				const dedupeKey = c.key ?? c.hreflang ?? c.href;
				if (seenLinks.has(dedupeKey)) continue;
				seenLinks.add(dedupeKey);
			}
			result.links.push({
				rel: c.rel,
				href: c.href,
				...c.hreflang && { hreflang: c.hreflang }
			});
			break;
		case "jsonld":
			if (c.id) {
				if (seenJsonLd.has(c.id)) continue;
				seenJsonLd.add(c.id);
			}
			result.jsonld.push({
				id: c.id,
				json: safeJsonLdSerialize(c.graph)
			});
	}
	return result;
}
function renderPageMetadata(metadata, options = {}) {
	const parts = [];
	const includeJsonLd = options.includeJsonLd ?? true;
	for (const m of metadata.meta) parts.push(`<meta name="${escapeHtmlAttr(m.name)}" content="${escapeHtmlAttr(m.content)}">`);
	for (const p of metadata.properties) parts.push(`<meta property="${escapeHtmlAttr(p.property)}" content="${escapeHtmlAttr(p.content)}">`);
	for (const l of metadata.links) {
		let tag = `<link rel="${escapeHtmlAttr(l.rel)}" href="${escapeHtmlAttr(l.href)}"`;
		if (l.hreflang) tag += ` hreflang="${escapeHtmlAttr(l.hreflang)}"`;
		tag += ">";
		parts.push(tag);
	}
	if (includeJsonLd) for (const j of metadata.jsonld) parts.push(`<script type="application/ld+json">${j.json}<\/script>`);
	return parts.join("\n");
}
//#endregion
//#region node_modules/emdash/src/page/fragments.ts
/** Escape sequences that would break out of a script tag */
var SCRIPT_CLOSE_RE = /<\//g;
/**
* Filter contributions to a specific placement and deduplicate.
* - Contributions with the same `key + placement` are deduped (first wins).
* - External scripts with the same `src + placement` are deduped.
*/
function resolveFragments(contributions, placement) {
	const filtered = contributions.filter((c) => c.placement === placement);
	const seen = /* @__PURE__ */ new Set();
	const result = [];
	for (const c of filtered) {
		if (c.key) {
			const dedupeKey = `key:${c.key}`;
			if (seen.has(dedupeKey)) continue;
			seen.add(dedupeKey);
		} else if (c.kind === "external-script") {
			const dedupeKey = `src:${c.src}`;
			if (seen.has(dedupeKey)) continue;
			seen.add(dedupeKey);
		}
		result.push(c);
	}
	return result;
}
var EVENT_HANDLER_RE = /^on/i;
function renderAttributes(attrs) {
	return Object.entries(attrs).filter(([k]) => !EVENT_HANDLER_RE.test(k)).map(([k, v]) => ` ${escapeHtmlAttr(k)}="${escapeHtmlAttr(v)}"`).join("");
}
/** Render a single fragment contribution to HTML */
function renderFragment(c) {
	switch (c.kind) {
		case "external-script": {
			let tag = `<script src="${escapeHtmlAttr(c.src)}"`;
			if (c.async) tag += " async";
			if (c.defer) tag += " defer";
			if (c.attributes) tag += renderAttributes(c.attributes);
			tag += "><\/script>";
			return tag;
		}
		case "inline-script": {
			let tag = "<script";
			if (c.attributes) tag += renderAttributes(c.attributes);
			tag += `>${c.code.replace(SCRIPT_CLOSE_RE, "<\\/")}<\/script>`;
			return tag;
		}
		case "html": return c.html;
	}
}
/** Render a list of fragment contributions to an HTML string */
function renderFragments(contributions, placement) {
	return resolveFragments(contributions, placement).map(renderFragment).join("\n");
}
//#endregion
//#region node_modules/emdash/src/components/JsonLdScript.astro
createAstro("https://astro.build");
var $$JsonLdScript = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$JsonLdScript;
	const { json } = Astro.props;
	return renderTemplate`<script type="application/ld+json">${unescapeHTML(json)}<\/script>`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/JsonLdScript.astro", void 0);
//#endregion
//#region node_modules/emdash/src/page/jsonld.ts
/**
* Remove null/undefined values from a JSON-LD object recursively.
* JSON-LD validators prefer absent keys over null values.
*/
function cleanJsonLd(obj) {
	const cleaned = {};
	for (const [key, value] of Object.entries(obj)) if (value !== void 0 && value !== null) {
		if (typeof value === "object" && !Array.isArray(value)) cleaned[key] = cleanJsonLd(value);
		else cleaned[key] = value;
	}
	return cleaned;
}
/**
* Build a BlogPosting JSON-LD graph from page context.
* Used for article-type content pages.
*
* @param page - Page context for the current request.
* @param defaultOgImage - Optional site-wide fallback image URL, used when
*   the page has no own OG image. Matches the fallback applied to `og:image`
*   in `generateBaseSeoContributions`.
*/
function buildBlogPostingJsonLd(page, defaultOgImage) {
	if (page.pageType !== "article" || !page.canonical) return null;
	const ogTitle = page.seo?.ogTitle ?? page.pageTitle ?? page.title;
	const description = page.seo?.ogDescription || page.description;
	const ogImage = page.seo?.ogImage || page.image || defaultOgImage || null;
	const publishedTime = page.articleMeta?.publishedTime;
	const modifiedTime = page.articleMeta?.modifiedTime;
	const author = page.articleMeta?.author;
	const siteName = page.siteName;
	return cleanJsonLd({
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: ogTitle,
		description,
		image: ogImage || void 0,
		url: page.canonical,
		datePublished: publishedTime || void 0,
		dateModified: modifiedTime || publishedTime || void 0,
		author: author ? {
			"@type": "Person",
			name: author
		} : void 0,
		publisher: siteName ? {
			"@type": "Organization",
			name: siteName
		} : void 0,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": page.canonical
		}
	});
}
/**
* Build a WebSite JSON-LD graph from page context.
* Used for non-article pages (homepage, listing pages, etc.)
*/
function buildWebSiteJsonLd(page) {
	const siteName = page.siteName;
	if (!siteName) return null;
	let siteUrl;
	if (page.siteUrl) siteUrl = page.siteUrl;
	else try {
		siteUrl = new URL(page.url).origin;
	} catch {
		siteUrl = page.canonical || page.url;
	}
	return cleanJsonLd({
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteName,
		url: siteUrl
	});
}
//#endregion
//#region node_modules/emdash/src/page/seo-contributions.ts
/**
* Generate base metadata contributions from a page context's SEO data.
*
* @param page - Page context produced by the runtime for the current request.
* @param defaultOgImage - Optional site-wide fallback OG image URL, used when
*   the page has no own OG image (i.e., neither `seo.ogImage` nor `image`).
*   Sourced from `SiteSettings.seo.defaultOgImage` by `EmDashHead`.
*
* Returns an empty array if no SEO-relevant data is present.
*/
function generateBaseSeoContributions(page, defaultOgImage) {
	const contributions = [];
	const description = page.description;
	const ogTitle = page.seo?.ogTitle ?? page.pageTitle ?? page.title;
	const ogDescription = page.seo?.ogDescription || description;
	const ogImage = page.seo?.ogImage || page.image || defaultOgImage || null;
	const robots = page.seo?.robots;
	const canonical = page.canonical;
	const siteName = page.siteName;
	if (description) contributions.push({
		kind: "meta",
		name: "description",
		content: description
	});
	if (robots) contributions.push({
		kind: "meta",
		name: "robots",
		content: robots
	});
	if (canonical) contributions.push({
		kind: "link",
		rel: "canonical",
		href: canonical
	});
	contributions.push({
		kind: "property",
		property: "og:type",
		content: page.pageType === "article" ? "article" : "website"
	});
	if (ogTitle) contributions.push({
		kind: "property",
		property: "og:title",
		content: ogTitle
	});
	if (ogDescription) contributions.push({
		kind: "property",
		property: "og:description",
		content: ogDescription
	});
	if (ogImage) contributions.push({
		kind: "property",
		property: "og:image",
		content: ogImage
	});
	if (canonical) contributions.push({
		kind: "property",
		property: "og:url",
		content: canonical
	});
	if (siteName) contributions.push({
		kind: "property",
		property: "og:site_name",
		content: siteName
	});
	contributions.push({
		kind: "meta",
		name: "twitter:card",
		content: ogImage ? "summary_large_image" : "summary"
	});
	if (ogTitle) contributions.push({
		kind: "meta",
		name: "twitter:title",
		content: ogTitle
	});
	if (ogDescription) contributions.push({
		kind: "meta",
		name: "twitter:description",
		content: ogDescription
	});
	if (ogImage) contributions.push({
		kind: "meta",
		name: "twitter:image",
		content: ogImage
	});
	if (page.pageType === "article" && page.articleMeta) {
		const { publishedTime, modifiedTime, author } = page.articleMeta;
		if (publishedTime) contributions.push({
			kind: "property",
			property: "article:published_time",
			content: publishedTime
		});
		if (modifiedTime) contributions.push({
			kind: "property",
			property: "article:modified_time",
			content: modifiedTime
		});
		if (author) contributions.push({
			kind: "property",
			property: "article:author",
			content: author
		});
	}
	if (page.pageType === "article") {
		const blogPosting = buildBlogPostingJsonLd(page, defaultOgImage ?? null);
		if (blogPosting) contributions.push({
			kind: "jsonld",
			id: "primary",
			graph: blogPosting
		});
	} else if (siteName) {
		const webSite = buildWebSiteJsonLd(page);
		if (webSite) contributions.push({
			kind: "jsonld",
			id: "primary",
			graph: webSite
		});
	}
	return contributions;
}
/**
* Generate site-level SEO metadata contributions from SiteSettings.seo.
*
* These tags apply to every page (search engine ownership verification),
* so they're sourced from site settings rather than per-page context.
* Returns an empty array when no relevant settings are configured.
*/
function generateSiteSeoContributions(seoSettings) {
	const contributions = [];
	if (!seoSettings) return contributions;
	if (seoSettings.googleVerification) contributions.push({
		kind: "meta",
		name: "google-site-verification",
		content: seoSettings.googleVerification
	});
	if (seoSettings.bingVerification) contributions.push({
		kind: "meta",
		name: "msvalidate.01",
		content: seoSettings.bingVerification
	});
	return contributions;
}
//#endregion
//#region node_modules/emdash/src/page/site-identity.ts
/**
* Build the `<head>` HTML for site identity tags. Returns an empty string
* when no identity fields are configured.
*/
function renderSiteIdentity(input) {
	if (!input) return "";
	const parts = [];
	const favicon = input.favicon;
	if (favicon?.url) {
		let tag = `<link rel="icon" href="${escapeHtmlAttr(favicon.url)}"`;
		if (favicon.contentType) tag += ` type="${escapeHtmlAttr(favicon.contentType)}"`;
		tag += ">";
		parts.push(tag);
	}
	return parts.join("\n");
}
//#endregion
//#region node_modules/emdash/src/page/index.ts
/**
* Get the page runtime from Astro locals. Returns undefined when
* EmDash is not initialized (components render nothing in that case).
*/
function getPageRuntime(locals) {
	const emdash = locals.emdash;
	if (emdash && typeof emdash === "object" && "collectPageMetadata" in emdash && "collectPageFragments" in emdash) return emdash;
}
//#endregion
//#region node_modules/emdash/src/page/absolute-url.ts
var HTTP_URL_RE = /^https?:\/\//i;
/**
* Protocol-relative URLs (`//cdn.example.com/x.png`) are dropped outright.
* They have no legitimate use in `og:image` (scrapers want a full URL) and
* are a well-known SSRF vector when reflected through server-side
* fetchers. Anything starting with `//` returns `null`.
*/
var PROTOCOL_RELATIVE_RE = /^\/\//;
/**
* URL schemes we pass through unchanged because they are legitimately
* useful as OG image values. `data:image/*` is sometimes used for inline
* social cards (rare, but legal). Everything else with a scheme
* (`mailto:`, `tel:`, `file:`, `blob:`, custom protocols) would be garbage
* in an `og:image`; we return `null` so the caller can decide whether to
* fall back or drop the tag.
*/
var PASSTHROUGH_SCHEME_RE = /^data:image\//i;
/**
* Detects URLs that have a scheme other than http/https (and other than
* the data:image/ form we pass through). Used to short-circuit garbage
* input rather than treating it as a relative path.
*/
var OTHER_SCHEME_RE = /^[a-z][a-z0-9+.-]*:/i;
/**
* Any ASCII whitespace or C0/C1 control character anywhere in the URL is
* an injection signal — legitimate media URLs never contain them. Without
* this guard, an input like `"  https://attacker/x"` would slip past the
* scheme regexes (which are anchored at offset 0) and get joined as a
* relative path with the site origin, producing
* `https://site.example/  https://attacker/x` — confusing but not
* exploitable, plus more pathological shapes like leading newlines that
* could inject across header boundaries downstream.
*/
var WHITESPACE_OR_CONTROL_RE = /[\s\u0000-\u001f\u007f-\u009f]/;
var TRAILING_SLASH_RE$1 = /\/$/;
/**
* `URL.origin` returns the literal string `"null"` (not the `null` value)
* for opaque origins like `data:`, `blob:`, and `about:blank`. Treating
* that as a valid origin would produce `null/og.png` in the output.
*/
function isUsableOrigin(origin) {
	return origin !== "null" && origin !== "";
}
/**
* Resolve the public origin to use when absolutizing a media URL.
*
* Precedence:
*  1. The configured `SiteSettings.url` (admin-controlled, canonical).
*  2. `PublicPageContext.siteUrl` (set by themes that override the origin,
*     e.g. when running behind a reverse proxy).
*  3. The origin parsed from `page.url`, which is the live request URL.
*
* Only `http:` and `https:` candidates count — anything else (e.g. `file:`,
* `data:`, `blob:`) would yield an unusable origin and is skipped. Returns
* `null` if no candidate parses to a usable HTTP(S) origin; callers should
* treat that as "leave the URL relative" rather than throw.
*/
function resolveSiteOrigin(configuredSiteUrl, page) {
	const candidates = [
		configuredSiteUrl,
		page.siteUrl,
		page.url
	];
	for (const candidate of candidates) {
		if (!candidate || typeof candidate !== "string") continue;
		try {
			const parsed = new URL(candidate);
			if (parsed.protocol !== "http:" && parsed.protocol !== "https:") continue;
			if (!isUsableOrigin(parsed.origin)) continue;
			return parsed.origin;
		} catch {}
	}
	return null;
}
/**
* Absolutize a media URL using the best available site origin.
*
* - Returns `null` for missing/empty input.
* - Passes through already-absolute `http(s):` URLs unchanged.
* - Passes through `data:image/*` URLs unchanged (rare but legal as OG
*   image content).
* - Returns `null` for protocol-relative URLs (`//cdn.com/x`): no
*   legitimate `og:image` use case, and a known SSRF vector when reflected
*   through server-side fetchers.
* - Returns `null` for any other scheme (`mailto:`, `blob:`, `file:`,
*   custom protocols): emitting those into `og:image` is worse than
*   omitting the tag.
* - Returns the original (relative) URL when no origin can be resolved —
*   preferable to dropping `og:image` outright because scrapers that follow
*   relative URLs are better off than ones that get nothing.
*
* @param url - The (possibly relative) media URL, e.g. `/_emdash/api/media/file/abc.jpg`.
* @param configuredSiteUrl - `SiteSettings.url` value (admin-controlled).
* @param page - The page context providing `siteUrl` and `url` fallbacks.
*/
function absolutizeMediaUrl(url, configuredSiteUrl, page) {
	if (!url) return null;
	if (WHITESPACE_OR_CONTROL_RE.test(url)) return null;
	if (HTTP_URL_RE.test(url)) return url;
	if (PASSTHROUGH_SCHEME_RE.test(url)) return url;
	if (PROTOCOL_RELATIVE_RE.test(url)) return null;
	if (OTHER_SCHEME_RE.test(url)) return null;
	const origin = resolveSiteOrigin(configuredSiteUrl, page);
	if (!origin) return url;
	const safePath = url.startsWith("/") ? url : `/${url}`;
	return `${origin.replace(TRAILING_SLASH_RE$1, "")}${safePath}`;
}
//#endregion
//#region node_modules/emdash/src/search/match.ts
/**
* FTS5 match-expression builder for structured (non-user-syntax) queries.
*
* Unlike `escapeQuery` in `query.ts` (which powers the public search API and
* deliberately passes through FTS5 operators like AND/OR/NOT), this builder
* treats the input as plain words: every term is double-quoted with interior
* quotes escaped, so the result can never produce an FTS5 syntax error. Used
* by the admin content-list filter, where the input is a filter box, not a
* search-syntax field.
*/
var WHITESPACE_RE = /\s+/;
var DOUBLE_QUOTE_RE = /"/g;
var GLOB_SPECIAL_RE = /[[\]*?]/g;
/**
* Build a prefix-matching FTS5 MATCH expression from free-form input.
*
* `hello wor` becomes `"hello"* "wor"*` — implicit AND with per-term prefix
* matching. Returns `""` when the input contains no usable terms; callers
* must fall back to their non-FTS path in that case.
*/
function buildFtsPrefixMatch(input) {
	const terms = input.trim().split(WHITESPACE_RE).map((term) => term.replace(DOUBLE_QUOTE_RE, "\"\"")).filter((term) => term.length > 0);
	if (terms.length === 0) return "";
	return terms.map((term) => `"${term}"*`).join(" ");
}
/**
* Build a GLOB prefix pattern from free-form input, treating GLOB
* metacharacters (`* ? [ ]`) literally by wrapping each in a character
* class (GLOB has no ESCAPE clause).
*
* GLOB (unlike default LIKE) is case-sensitive, so with a lowercased
* pattern it matches slugs (lowercase by construction) while staying
* servable by the ordinary BINARY-collated slug index — SQLite's GLOB
* optimization turns a `prefix*` pattern into an index range scan.
*/
function buildSlugGlobPrefix(input) {
	return `${input.trim().toLowerCase().replace(GLOB_SPECIAL_RE, (c) => `[${c}]`)}*`;
}
//#endregion
//#region node_modules/emdash/src/utils/slugify.ts
var DIACRITICS_PATTERN = /[\u0300-\u036f]/g;
var WHITESPACE_UNDERSCORE_PATTERN = /[\s_]+/g;
var NON_ALPHANUMERIC_HYPHEN_PATTERN = /[^a-z0-9-]/g;
var MULTIPLE_HYPHENS_PATTERN = /-+/g;
var LEADING_TRAILING_HYPHEN_PATTERN = /^-|-$/g;
var TRAILING_HYPHEN_PATTERN = /-$/;
function slugify(text, maxLength = 80) {
	return text.toLowerCase().normalize("NFD").replace(DIACRITICS_PATTERN, "").replace(WHITESPACE_UNDERSCORE_PATTERN, "-").replace(NON_ALPHANUMERIC_HYPHEN_PATTERN, "").replace(MULTIPLE_HYPHENS_PATTERN, "-").replace(LEADING_TRAILING_HYPHEN_PATTERN, "").slice(0, maxLength).replace(TRAILING_HYPHEN_PATTERN, "");
}
//#endregion
//#region node_modules/emdash/src/database/repositories/revision.ts
var monotonic = monotonicFactory();
/**
* Revision repository for version history
*
* Each revision stores a JSON snapshot of the content at a point in time.
* Used when collection has `supports: ["revisions"]` enabled.
*/
var RevisionRepository = class {
	db;
	constructor(db) {
		this.db = db;
	}
	/**
	* Create a new revision
	*/
	async create(input) {
		const id = monotonic();
		const row = {
			id,
			collection: input.collection,
			entry_id: input.entryId,
			data: JSON.stringify(input.data),
			author_id: input.authorId ?? null
		};
		await this.db.insertInto("revisions").values(row).execute();
		const revision = await this.findById(id);
		if (!revision) throw new Error("Failed to create revision");
		return revision;
	}
	/**
	* Find revision by ID
	*/
	async findById(id) {
		const row = await this.db.selectFrom("revisions").selectAll().where("id", "=", id).executeTakeFirst();
		return row ? this.rowToRevision(row) : null;
	}
	/**
	* Get all revisions for an entry (newest first)
	*
	* Orders by monotonic ULID (descending). The monotonic factory
	* guarantees strictly increasing IDs even within the same millisecond.
	*/
	async findByEntry(collection, entryId, options = {}) {
		let query = this.db.selectFrom("revisions").selectAll().where("collection", "=", collection).where("entry_id", "=", entryId).orderBy("id", "desc");
		if (options.limit) query = query.limit(options.limit);
		return (await query.execute()).map((row) => this.rowToRevision(row));
	}
	/**
	* Get the most recent revision for an entry
	*/
	async findLatest(collection, entryId) {
		const row = await this.db.selectFrom("revisions").selectAll().where("collection", "=", collection).where("entry_id", "=", entryId).orderBy("id", "desc").limit(1).executeTakeFirst();
		return row ? this.rowToRevision(row) : null;
	}
	/**
	* Count revisions for an entry
	*/
	async countByEntry(collection, entryId) {
		const result = await this.db.selectFrom("revisions").select((eb) => eb.fn.count("id").as("count")).where("collection", "=", collection).where("entry_id", "=", entryId).executeTakeFirst();
		return Number(result?.count || 0);
	}
	/**
	* Delete all revisions for an entry (use when entry is deleted)
	*/
	async deleteByEntry(collection, entryId) {
		const result = await this.db.deleteFrom("revisions").where("collection", "=", collection).where("entry_id", "=", entryId).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
	/**
	* Delete old revisions, keeping the most recent N
	*/
	async pruneOldRevisions(collection, entryId, keepCount) {
		const keepIds = (await this.db.selectFrom("revisions").select("id").where("collection", "=", collection).where("entry_id", "=", entryId).orderBy("created_at", "desc").orderBy("id", "desc").limit(keepCount).execute()).map((r) => r.id);
		if (keepIds.length === 0) return 0;
		const result = await this.db.deleteFrom("revisions").where("collection", "=", collection).where("entry_id", "=", entryId).where("id", "not in", keepIds).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
	/**
	* Update revision data in place
	* Used for autosave to avoid creating many small revisions.
	*/
	async updateData(id, data) {
		await this.db.updateTable("revisions").set({ data: JSON.stringify(data) }).where("id", "=", id).execute();
	}
	/**
	* Convert database row to Revision object
	*/
	rowToRevision(row) {
		return {
			id: row.id,
			collection: row.collection,
			entryId: row.entry_id,
			data: JSON.parse(row.data),
			authorId: row.author_id,
			createdAt: row.created_at
		};
	}
};
//#endregion
//#region node_modules/emdash/src/database/repositories/content.ts
var ULID_PATTERN = /^[0-9A-Z]{26}$/;
var LIKE_WILDCARD_RE = /[\\%_]/g;
/**
* Whitelist mapping a public date-filter field to its physical column. Keeping
* this separate from `mapOrderField` makes the filterable set explicit and
* prevents filtering on arbitrary columns.
*/
var DATE_FILTER_COLUMNS = {
	createdAt: "created_at",
	updatedAt: "updated_at",
	publishedAt: "published_at"
};
/**
* System columns that exist in every ec_* table
*/
var SYSTEM_COLUMNS = /* @__PURE__ */ new Set([
	"id",
	"slug",
	"status",
	"author_id",
	"primary_byline_id",
	"created_at",
	"updated_at",
	"published_at",
	"scheduled_at",
	"deleted_at",
	"version",
	"live_revision_id",
	"draft_revision_id",
	"locale",
	"translation_group"
]);
/**
* Get the table name for a collection type
*/
function getTableName(type) {
	validateIdentifier(type, "collection type");
	return `ec_${type}`;
}
/**
* Serialize a value for database storage
* Objects/arrays are JSON-stringified
* Booleans are converted to 0/1 for SQLite
*/
function serializeValue(value) {
	if (value === null || value === void 0) return null;
	if (typeof value === "boolean") return value ? 1 : 0;
	if (typeof value === "object") return JSON.stringify(value);
	return value;
}
/**
* Deserialize a value from database storage
* Attempts to parse JSON strings that look like objects/arrays
*/
function deserializeValue(value) {
	if (typeof value === "string") {
		if (value.startsWith("{") || value.startsWith("[")) try {
			return JSON.parse(value);
		} catch {
			return value;
		}
	}
	return value;
}
/** Pattern for escaping special regex characters */
var REGEX_ESCAPE_PATTERN = /[.*+?^${}()|[\]\\]/g;
/**
* Escape special regex characters in a string for use in `new RegExp()`
*/
function escapeRegExp(s) {
	return s.replace(REGEX_ESCAPE_PATTERN, "\\$&");
}
/**
* Repository for content CRUD operations
*
* Content is stored in per-collection tables (ec_posts, ec_pages, etc.)
* Each field becomes a real column in the table.
*/
var ContentRepository = class {
	db;
	constructor(db) {
		this.db = db;
	}
	/**
	* Create a new content item
	*/
	async create(input) {
		const id = ulid();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const { type, slug, data, status = "draft", authorId, primaryBylineId, locale, translationOf, publishedAt, createdAt } = input;
		if (!type) throw new EmDashValidationError("Content type is required");
		const tableName = getTableName(type);
		let translationGroup = id;
		if (translationOf) {
			const source = await this.findById(type, translationOf);
			if (!source) throw new EmDashValidationError("Translation source content not found");
			translationGroup = source.translationGroup || source.id;
		}
		const columns = [
			"id",
			"slug",
			"status",
			"author_id",
			"primary_byline_id",
			"created_at",
			"updated_at",
			"published_at",
			"version",
			"locale",
			"translation_group"
		];
		const values = [
			id,
			slug || null,
			status,
			authorId || null,
			primaryBylineId ?? null,
			createdAt || now,
			now,
			publishedAt || null,
			1,
			locale || "en",
			translationGroup
		];
		if (data && typeof data === "object") {
			for (const [key, value] of Object.entries(data)) if (!SYSTEM_COLUMNS.has(key)) {
				validateIdentifier(key, "content field name");
				columns.push(key);
				values.push(serializeValue(value));
			}
		}
		const columnRefs = columns.map((c) => sql.ref(c));
		const valuePlaceholders = values.map((v) => v === null ? sql`NULL` : sql`${v}`);
		await sql`
			INSERT INTO ${sql.ref(tableName)} (${sql.join(columnRefs, sql`, `)})
			VALUES (${sql.join(valuePlaceholders, sql`, `)})
		`.execute(this.db);
		invalidateCollectionCache(type);
		const item = await this.findById(type, id);
		if (!item) throw new Error("Failed to create content");
		return item;
	}
	/**
	* Generate a unique slug for a content item within a collection.
	*
	* Checks the collection table for existing slugs that match `baseSlug`
	* (optionally scoped to a locale) and appends a numeric suffix (`-1`,
	* `-2`, etc.) on collision to guarantee uniqueness.
	*
	* Returns `null` if `baseSlug` is empty after slugification.
	*/
	async generateUniqueSlug(type, text, locale) {
		const baseSlug = slugify(text);
		if (!baseSlug) return null;
		const tableName = getTableName(type);
		if ((locale ? await sql`
					SELECT slug FROM ${sql.ref(tableName)}
					WHERE slug = ${baseSlug}
					AND locale = ${locale}
					LIMIT 1
				`.execute(this.db) : await sql`
					SELECT slug FROM ${sql.ref(tableName)}
					WHERE slug = ${baseSlug}
					LIMIT 1
				`.execute(this.db)).rows.length === 0) return baseSlug;
		const pattern = `${baseSlug}-%`;
		const candidates = locale ? await sql`
					SELECT slug FROM ${sql.ref(tableName)}
					WHERE (slug = ${baseSlug} OR slug LIKE ${pattern})
					AND locale = ${locale}
				`.execute(this.db) : await sql`
					SELECT slug FROM ${sql.ref(tableName)}
					WHERE slug = ${baseSlug} OR slug LIKE ${pattern}
				`.execute(this.db);
		let maxSuffix = 0;
		const suffixPattern = new RegExp(`^${escapeRegExp(baseSlug)}-(\\d+)$`);
		for (const row of candidates.rows) {
			const match = suffixPattern.exec(row.slug);
			if (match) {
				const n = parseInt(match[1], 10);
				if (n > maxSuffix) maxSuffix = n;
			}
		}
		return `${baseSlug}-${maxSuffix + 1}`;
	}
	/**
	* Duplicate a content item
	* Creates a new draft copy with "(Copy)" appended to the title.
	* A slug is auto-generated from the new title by the handler layer.
	*/
	async duplicate(type, id, authorId) {
		const original = await this.findById(type, id);
		if (!original) throw new EmDashValidationError("Content item not found");
		const newData = { ...original.data };
		if (typeof newData.title === "string") newData.title = `${newData.title} (Copy)`;
		else if (typeof newData.name === "string") newData.name = `${newData.name} (Copy)`;
		const slugSource = typeof newData.title === "string" ? newData.title : typeof newData.name === "string" ? newData.name : null;
		const slug = slugSource ? await this.generateUniqueSlug(type, slugSource, original.locale ?? void 0) : null;
		return this.create({
			type,
			slug,
			data: newData,
			status: "draft",
			authorId: authorId || original.authorId || void 0
		});
	}
	/**
	* Find content by ID
	*/
	async findById(type, id) {
		const tableName = getTableName(type);
		const row = (await sql`
			SELECT * FROM ${sql.ref(tableName)}
			WHERE id = ${id}
			AND deleted_at IS NULL
		`.execute(this.db)).rows[0];
		if (!row) return null;
		return this.mapRow(type, row);
	}
	/**
	* Find content by id, including trashed (soft-deleted) items.
	* Used by restore endpoint for ownership checks.
	*/
	async findByIdIncludingTrashed(type, id) {
		const tableName = getTableName(type);
		const row = (await sql`
			SELECT * FROM ${sql.ref(tableName)}
			WHERE id = ${id}
		`.execute(this.db)).rows[0];
		if (!row) return null;
		return this.mapRow(type, row);
	}
	/**
	* Find content by ID or slug. Tries ID first if it looks like a ULID,
	* otherwise tries slug. Falls back to the other if the first lookup misses.
	*/
	async findByIdOrSlug(type, identifier, locale) {
		return this._findByIdOrSlug(type, identifier, false, locale);
	}
	/**
	* Find content by ID or slug, including trashed (soft-deleted) items.
	* Used by restore/permanent-delete endpoints.
	*/
	async findByIdOrSlugIncludingTrashed(type, identifier, locale) {
		return this._findByIdOrSlug(type, identifier, true, locale);
	}
	async _findByIdOrSlug(type, identifier, includeTrashed, locale) {
		const looksLikeUlid = ULID_PATTERN.test(identifier);
		const findById = includeTrashed ? (t, id) => this.findByIdIncludingTrashed(t, id) : (t, id) => this.findById(t, id);
		const findBySlug = includeTrashed ? (t, s) => this.findBySlugIncludingTrashed(t, s, locale) : (t, s) => this.findBySlug(t, s, locale);
		try {
			if (looksLikeUlid) {
				const byId = await findById(type, identifier);
				if (byId) return byId;
				return await findBySlug(type, identifier);
			}
			const bySlug = await findBySlug(type, identifier);
			if (bySlug) return bySlug;
			return await findById(type, identifier);
		} catch (error) {
			if (isMissingTableError(error)) return null;
			throw error;
		}
	}
	/**
	* Find content by slug
	*/
	async findBySlug(type, slug, locale) {
		const tableName = getTableName(type);
		const row = (locale ? await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE slug = ${slug}
					AND locale = ${locale}
					AND deleted_at IS NULL
				`.execute(this.db) : await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE slug = ${slug}
					AND deleted_at IS NULL
					ORDER BY locale ASC
					LIMIT 1
				`.execute(this.db)).rows[0];
		if (!row) return null;
		return this.mapRow(type, row);
	}
	/**
	* Find content by slug, including trashed (soft-deleted) items.
	* Used by restore/permanent-delete endpoints.
	*/
	async findBySlugIncludingTrashed(type, slug, locale) {
		const tableName = getTableName(type);
		const row = (locale ? await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE slug = ${slug}
					AND locale = ${locale}
				`.execute(this.db) : await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE slug = ${slug}
					ORDER BY locale ASC
					LIMIT 1
				`.execute(this.db)).rows[0];
		if (!row) return null;
		return this.mapRow(type, row);
	}
	/**
	* Find many content items with filtering and pagination
	*/
	async findMany(type, options = {}) {
		const tableName = getTableName(type);
		const limit = Math.min(options.limit || 50, 100);
		const orderField = options.orderBy?.field || "createdAt";
		const orderDirection = options.orderBy?.direction || "desc";
		const dbField = this.mapOrderField(orderField);
		const safeOrderDirection = orderDirection.toLowerCase() === "asc" ? "ASC" : "DESC";
		let query = this.db.selectFrom(tableName).selectAll().where("deleted_at", "is", null);
		if (options.where?.status) query = query.where("status", "=", options.where.status);
		if (options.where?.authorId) query = query.where("author_id", "=", options.where.authorId);
		if (options.where?.locale) query = query.where("locale", "=", options.where.locale);
		query = this.applySearchFilter(query, options.where, type);
		query = this.applyDateFilter(query, options.where);
		if (options.cursor) {
			const { orderValue, id: cursorId } = decodeCursor(options.cursor);
			if (safeOrderDirection === "DESC") query = query.where((eb) => eb.or([eb(dbField, "<", orderValue), eb.and([eb(dbField, "=", orderValue), eb("id", "<", cursorId)])]));
			else query = query.where((eb) => eb.or([eb(dbField, ">", orderValue), eb.and([eb(dbField, "=", orderValue), eb("id", ">", cursorId)])]));
		}
		query = query.orderBy(dbField, safeOrderDirection === "ASC" ? "asc" : "desc").orderBy("id", safeOrderDirection === "ASC" ? "asc" : "desc").limit(limit + 1);
		const [rows, total] = await Promise.all([query.execute(), this.count(type, options.where)]);
		const hasMore = rows.length > limit;
		const items = rows.slice(0, limit);
		const mappedResult = {
			items: items.map((row) => this.mapRow(type, row)),
			total
		};
		if (hasMore && items.length > 0) {
			const lastRow = items.at(-1);
			const lastOrderValue = lastRow[dbField];
			mappedResult.nextCursor = encodeCursor(typeof lastOrderValue === "string" || typeof lastOrderValue === "number" ? String(lastOrderValue) : "", String(lastRow.id));
		}
		return mappedResult;
	}
	/**
	* Update content
	*/
	async update(type, id, input) {
		const tableName = getTableName(type);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const updates = {};
		if (input.status !== void 0) updates.status = input.status;
		if (input.slug !== void 0) updates.slug = input.slug;
		if (input.publishedAt !== void 0) updates.published_at = input.publishedAt;
		if (input.scheduledAt !== void 0) updates.scheduled_at = input.scheduledAt;
		if (input.authorId !== void 0) updates.author_id = input.authorId;
		if (input.primaryBylineId !== void 0) updates.primary_byline_id = input.primaryBylineId;
		if (input.data !== void 0 && typeof input.data === "object") {
			for (const [key, value] of Object.entries(input.data)) if (!SYSTEM_COLUMNS.has(key)) {
				validateIdentifier(key, "content field name");
				updates[key] = serializeValue(value);
			}
		}
		if (Object.keys(updates).length > 0) updates.updated_at = now;
		updates.version = sql`version + 1`;
		await this.db.updateTable(tableName).set(updates).where("id", "=", id).where("deleted_at", "is", null).execute();
		if (input.status !== void 0 || input.publishedAt !== void 0 || input.scheduledAt !== void 0) await this.restampEntryPivot(type, id);
		invalidateCollectionCache(type);
		const updated = await this.findById(type, id);
		if (!updated) throw new Error("Content not found");
		return updated;
	}
	/**
	* Delete content (soft delete - moves to trash)
	*/
	async delete(type, id) {
		const tableName = getTableName(type);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const changed = ((await sql`
			UPDATE ${sql.ref(tableName)}
			SET deleted_at = ${now}
			WHERE id = ${id}
			AND deleted_at IS NULL
		`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
		if (changed) {
			await this.restampEntryPivot(type, id);
			invalidateCollectionCache(type);
		}
		return changed;
	}
	/**
	* Restore content from trash
	*/
	async restore(type, id) {
		const tableName = getTableName(type);
		const restored = (await sql`
			UPDATE ${sql.ref(tableName)}
			SET deleted_at = NULL
			WHERE id = ${id}
			AND deleted_at IS NOT NULL
			RETURNING *
		`.execute(this.db)).rows[0];
		if (!restored) return null;
		await this.restampEntryPivot(type, id);
		invalidateCollectionCache(type);
		return this.mapRow(type, restored);
	}
	/**
	* Re-stamp the denormalized filter + sort columns on every
	* `content_taxonomies` pivot row for an entry from its authoritative `ec_*`
	* row (migration 051). Called after any mutation that moves one of those
	* columns so a taxonomy-filtered listing can seek the entry directly.
	*
	* A single correlated `UPDATE` reads the post-mutation values from `ec_*`, so
	* the pivot converges to the authoritative row. This is NOT atomic with the
	* `ec_*` mutation on D1 (no transactions), which is why the read path
	* re-checks the real predicates on the joined `ec_*` row. Untagged entries
	* have no pivot rows, so the statement is a cheap no-op for them.
	*/
	async restampEntryPivot(type, id) {
		const tableName = getTableName(type);
		await sql`
			UPDATE content_taxonomies
			SET (status, scheduled_at, deleted_at, locale, published_at, created_at) = (
				SELECT status, scheduled_at, deleted_at, locale, published_at, created_at
				FROM ${sql.ref(tableName)}
				WHERE ${sql.ref(tableName)}.id = ${id}
			)
			WHERE collection = ${type} AND entry_id = ${id}
		`.execute(this.db);
	}
	/**
	* Permanently delete content (cannot be undone)
	*/
	/**
	* Permanently delete a soft-deleted content row.
	*
	* Returns `true` only when a soft-deleted (trashed) row was removed.
	* Returns `false` when no row exists OR when the row exists but is live —
	* the caller is responsible for distinguishing these cases (typically via
	* a follow-up `findByIdOrSlugIncludingTrashed` to surface NOT_FOUND vs
	* NOT_TRASHED). The `AND deleted_at IS NOT NULL` clause is the safety net
	* that prevents permanent delete from bypassing the trash workflow.
	*/
	async permanentDelete(type, id) {
		const tableName = getTableName(type);
		const changed = ((await sql`
			DELETE FROM ${sql.ref(tableName)}
			WHERE id = ${id}
			AND deleted_at IS NOT NULL
		`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
		if (changed) invalidateCollectionCache(type);
		return changed;
	}
	/**
	* Find trashed content items
	*/
	async findTrashed(type, options = {}) {
		const tableName = getTableName(type);
		const limit = Math.min(options.limit || 50, 100);
		const orderField = options.orderBy?.field || "deletedAt";
		const orderDirection = options.orderBy?.direction || "desc";
		const dbField = this.mapOrderField(orderField);
		const safeOrderDirection = orderDirection.toLowerCase() === "asc" ? "ASC" : "DESC";
		let query = this.db.selectFrom(tableName).selectAll().where("deleted_at", "is not", null);
		if (options.cursor) {
			const { orderValue, id: cursorId } = decodeCursor(options.cursor);
			if (safeOrderDirection === "DESC") query = query.where((eb) => eb.or([eb(dbField, "<", orderValue), eb.and([eb(dbField, "=", orderValue), eb("id", "<", cursorId)])]));
			else query = query.where((eb) => eb.or([eb(dbField, ">", orderValue), eb.and([eb(dbField, "=", orderValue), eb("id", ">", cursorId)])]));
		}
		query = query.orderBy(dbField, safeOrderDirection === "ASC" ? "asc" : "desc").orderBy("id", safeOrderDirection === "ASC" ? "asc" : "desc").limit(limit + 1);
		const rows = await query.execute();
		const hasMore = rows.length > limit;
		const items = rows.slice(0, limit);
		const mappedResult = { items: items.map((row) => {
			const record = row;
			return {
				...this.mapRow(type, record),
				deletedAt: typeof record.deleted_at === "string" ? record.deleted_at : ""
			};
		}) };
		if (hasMore && items.length > 0) {
			const lastRow = items.at(-1);
			const lastOrderValue = lastRow[dbField];
			mappedResult.nextCursor = encodeCursor(typeof lastOrderValue === "string" || typeof lastOrderValue === "number" ? String(lastOrderValue) : "", String(lastRow.id));
		}
		return mappedResult;
	}
	/**
	* Count trashed content items
	*/
	async countTrashed(type) {
		const tableName = getTableName(type);
		const result = await this.db.selectFrom(tableName).select((eb) => eb.fn.count("id").as("count")).where("deleted_at", "is not", null).executeTakeFirst();
		return Number(result?.count || 0);
	}
	/**
	* Apply the optional `q` filter.
	*
	* When the handler sets `useFts` (collection has a healthy FTS5 index
	* covering the display columns; SQLite only), the filter is served from
	* the index: a token-prefix MATCH against `_emdash_fts_<slug>` OR'd with
	* an index-served `slug GLOB 'term*'` prefix (the slug is not in the FTS
	* index). Both sides are index-backed, so SQLite's OR optimization avoids
	* the full-table scan the LIKE fallback needs (#1517). The trade-off is
	* search semantics: token-prefix matching instead of arbitrary substring.
	*
	* Fallback (Postgres, search disabled, or no usable terms): case-
	* insensitive substring LIKE across the handler-resolved `searchColumns`
	* (OR'd). User input is treated literally (LIKE wildcards escaped) and
	* `lower()` is applied on both sides for SQLite/Postgres parity.
	*/
	applySearchFilter(query, where, type) {
		const term = where?.q?.trim();
		const columns = where?.searchColumns;
		if (!term || !columns || columns.length === 0) return query;
		if (where.useFts) {
			const match = buildFtsPrefixMatch(term);
			if (match) {
				validateIdentifier(type, "collection slug");
				const ftsTable = `_emdash_fts_${type}`;
				const slugPrefix = buildSlugGlobPrefix(term);
				return query.where((eb) => eb.or([sql`id IN (SELECT id FROM ${sql.ref(ftsTable)} WHERE ${sql.ref(ftsTable)} MATCH ${match})`, sql`slug GLOB ${slugPrefix}`]));
			}
		}
		const pattern = `%${term.replace(LIKE_WILDCARD_RE, (c) => `\\${c}`)}%`;
		return query.where((eb) => eb.or(columns.map((col) => {
			validateIdentifier(col, "search column");
			return eb(sql`lower(${sql.ref(col)})`, "like", sql`lower(${pattern}) escape '\\'`);
		})));
	}
	/**
	* Apply the optional inclusive date-range filter. The field is mapped
	* through `DATE_FILTER_COLUMNS` (a closed whitelist), and bounds compare
	* lexicographically against the stored ISO 8601 timestamps. A `publishedAt`
	* range naturally excludes never-published rows (their column is NULL).
	*/
	applyDateFilter(query, where) {
		const filter = where?.dateFilter;
		if (!filter) return query;
		const column = DATE_FILTER_COLUMNS[filter.field];
		if (!column) throw new EmDashValidationError(`Invalid date filter field: ${filter.field}`);
		const { from, to } = filter;
		if (!from && !to) return query;
		let next = query;
		if (from) next = next.where((eb) => eb(column, ">=", from));
		if (to) next = next.where((eb) => eb(column, "<=", to));
		return next;
	}
	/**
	* Count content items
	*/
	async count(type, where) {
		const tableName = getTableName(type);
		let query = this.db.selectFrom(tableName).select((eb) => eb.fn.count("id").as("count")).where("deleted_at", "is", null);
		if (where?.status) query = query.where("status", "=", where.status);
		if (where?.authorId) query = query.where("author_id", "=", where.authorId);
		if (where?.locale) query = query.where("locale", "=", where.locale);
		query = this.applySearchFilter(query, where, type);
		query = this.applyDateFilter(query, where);
		const result = await query.executeTakeFirst();
		return Number(result?.count || 0);
	}
	/**
	* Distinct, non-null `author_id` values across the collection's live
	* (non-trashed) content. Used to populate the admin author filter with
	* only the users who have actually authored entries, rather than the
	* full user directory (which requires admin privileges to read).
	*/
	async findDistinctAuthorIds(type) {
		const tableName = getTableName(type);
		return (await this.db.selectFrom(tableName).select("author_id").distinct().where("deleted_at", "is", null).where("author_id", "is not", null).execute()).map((row) => row.author_id).filter((id) => id !== null);
	}
	async getStats(type) {
		const tableName = getTableName(type);
		const result = await this.db.selectFrom(tableName).select((eb) => [
			eb.fn.count("id").as("total"),
			eb.fn.sum(eb.case().when("status", "=", "published").then(1).else(0).end()).as("published"),
			eb.fn.sum(eb.case().when("status", "=", "draft").then(1).else(0).end()).as("draft"),
			sql`SUM(CASE WHEN scheduled_at IS NOT NULL THEN 1 ELSE 0 END)`.as("scheduled")
		]).where("deleted_at", "is", null).executeTakeFirst();
		return {
			total: Number(result?.total || 0),
			published: Number(result?.published || 0),
			draft: Number(result?.draft || 0),
			scheduled: Number(result?.scheduled || 0)
		};
	}
	/**
	* Schedule content for future publishing
	*
	* Sets status to 'scheduled' and stores the scheduled publish time.
	* The content will be auto-published when the scheduled time is reached.
	*/
	async schedule(type, id, scheduledAt) {
		const tableName = getTableName(type);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const scheduledDate = new Date(scheduledAt);
		if (isNaN(scheduledDate.getTime())) throw new EmDashValidationError("Invalid scheduled date");
		if (scheduledDate <= /* @__PURE__ */ new Date()) throw new EmDashValidationError("Scheduled date must be in the future");
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		const newStatus = existing.status === "published" ? "published" : "scheduled";
		await sql`
			UPDATE ${sql.ref(tableName)}
			SET status = ${newStatus},
				scheduled_at = ${scheduledAt},
				updated_at = ${now}
			WHERE id = ${id}
			AND deleted_at IS NULL
		`.execute(this.db);
		await this.restampEntryPivot(type, id);
		invalidateCollectionCache(type);
		const updated = await this.findById(type, id);
		if (!updated) throw new Error("Content not found");
		return updated;
	}
	/**
	* Unschedule content
	*
	* Clears the scheduled time. Published posts stay published;
	* draft/scheduled posts revert to 'draft'.
	*/
	async unschedule(type, id) {
		const tableName = getTableName(type);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		const newStatus = existing.status === "published" ? "published" : "draft";
		await sql`
			UPDATE ${sql.ref(tableName)}
			SET status = ${newStatus},
				scheduled_at = NULL,
				updated_at = ${now}
			WHERE id = ${id}
			AND scheduled_at IS NOT NULL
			AND deleted_at IS NULL
		`.execute(this.db);
		await this.restampEntryPivot(type, id);
		invalidateCollectionCache(type);
		const updated = await this.findById(type, id);
		if (!updated) throw new Error("Content not found");
		return updated;
	}
	/**
	* Find content that is ready to be published
	*
	* Returns all content where scheduled_at <= now, regardless of status.
	* This covers both draft-scheduled posts (status='scheduled') and
	* published posts with scheduled draft changes (status='published').
	*
	* `limit` (optional) caps how many due rows are returned, oldest-due first.
	* The scheduled-publishing sweep passes a limit so a large backlog can't
	* fan out unbounded publish/webhook work in a single tick (and blow a Worker
	* invocation's CPU/subrequest budget); the remainder drains on later ticks.
	*/
	async findReadyToPublish(type, limit) {
		const tableName = getTableName(type);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const limitClause = typeof limit === "number" && Number.isInteger(limit) && limit > 0 ? sql`LIMIT ${limit}` : sql``;
		return (await sql`
			SELECT * FROM ${sql.ref(tableName)}
			WHERE scheduled_at IS NOT NULL
			AND scheduled_at <= ${now}
			AND deleted_at IS NULL
			ORDER BY scheduled_at ASC
			${limitClause}
		`.execute(this.db)).rows.map((row) => this.mapRow(type, row));
	}
	/**
	* Find all translations in a translation group
	*/
	async findTranslations(type, translationGroup) {
		const tableName = getTableName(type);
		return (await sql`
			SELECT * FROM ${sql.ref(tableName)}
			WHERE translation_group = ${translationGroup}
			AND deleted_at IS NULL
			ORDER BY locale ASC
		`.execute(this.db)).rows.map((row) => this.mapRow(type, row));
	}
	/**
	* Batch variant of {@link findTranslations}: every (non-deleted) locale
	* variant for any of `translationGroups`, in one `WHERE translation_group IN
	* (...)` query chunked at `SQL_BATCH_SIZE` for D1's bind-parameter limit.
	* Lets callers resolve many edge groups without an N+1 per group. The caller
	* groups the flat result by `translationGroup` itself.
	*
	* `publishedOnly` restricts the result to `status = 'published'` — reference
	* reads pass this for callers without `content:read_drafts` so draft/scheduled
	* entries never leak through an edge traversal.
	*
	* A reference edge stores only a collection slug (no SQL FK), so the table may
	* have been dropped since the edge was written. That is a tolerated dangling
	* state, not an error: a missing table resolves to no rows, mirroring how the
	* content read handlers treat `isMissingTableError`.
	*/
	async findTranslationsForGroups(type, translationGroups, options = {}) {
		if (translationGroups.length === 0) return [];
		const tableName = getTableName(type);
		const publishedFilter = options.publishedOnly ? sql`AND status = 'published'` : sql``;
		const items = [];
		try {
			for (const chunk of chunks(translationGroups, 50)) {
				const result = await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE translation_group IN (${sql.join(chunk)})
					AND deleted_at IS NULL
					${publishedFilter}
					ORDER BY locale ASC
				`.execute(this.db);
				for (const row of result.rows) items.push(this.mapRow(type, row));
			}
		} catch (error) {
			if (isMissingTableError(error)) return [];
			throw error;
		}
		return items;
	}
	/**
	* Batch variant of {@link findByIdOrSlug}: resolve many identifiers (each an
	* id OR a slug) within `type` in a constant number of queries — one `WHERE id
	* IN (...)` and one `WHERE slug IN (...)`, each chunked at `SQL_BATCH_SIZE`.
	* Returns a map from the input identifier to its resolved item; identifiers
	* that match nothing are absent. Used on write paths that accept a list of
	* references, so a single request doesn't fan out to an N+1 of point lookups.
	*
	* Resolution mirrors {@link findByIdOrSlug}: a ULID-shaped identifier prefers
	* the id match and falls back to slug; anything else prefers the slug match
	* and falls back to id. Slug matches collapse to the lowest-locale variant
	* (`ORDER BY locale ASC`), matching the slug-without-locale lookup.
	*/
	async findManyByIdOrSlug(type, identifiers) {
		const resolved = /* @__PURE__ */ new Map();
		const unique = [...new Set(identifiers)];
		if (unique.length === 0) return resolved;
		const tableName = getTableName(type);
		const byId = /* @__PURE__ */ new Map();
		const bySlug = /* @__PURE__ */ new Map();
		try {
			for (const chunk of chunks(unique, 50)) {
				const idRows = await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE id IN (${sql.join(chunk)})
					AND deleted_at IS NULL
				`.execute(this.db);
				for (const row of idRows.rows) {
					const item = this.mapRow(type, row);
					byId.set(item.id, item);
				}
				const slugRows = await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE slug IN (${sql.join(chunk)})
					AND deleted_at IS NULL
					ORDER BY locale ASC
				`.execute(this.db);
				for (const row of slugRows.rows) {
					const item = this.mapRow(type, row);
					if (item.slug != null && !bySlug.has(item.slug)) bySlug.set(item.slug, item);
				}
			}
		} catch (error) {
			if (isMissingTableError(error)) return resolved;
			throw error;
		}
		for (const identifier of unique) {
			const item = ULID_PATTERN.test(identifier) ? byId.get(identifier) ?? bySlug.get(identifier) : bySlug.get(identifier) ?? byId.get(identifier);
			if (item) resolved.set(identifier, item);
		}
		return resolved;
	}
	/**
	* Publish the current draft
	*
	* Promotes draft_revision_id to live_revision_id and clears draft pointer.
	* Syncs the draft revision's data into the content table columns so the
	* content table always reflects the published version.
	* If no draft revision exists, creates one from current data and publishes it.
	*
	* `publishedAt` (optional) overrides the publication timestamp. If omitted,
	* the existing `published_at` is preserved (idempotent re-publish keeps the
	* original date) and falls back to the current time on first publish. Pass
	* an explicit value to backdate a publish (e.g. when migrating content from
	* another CMS).
	*
	* `requireDue` (optional) gates the publish on the row still being due:
	* `scheduled_at` non-null and in the past. Used by the scheduled-publishing
	* sweep to avoid publishing content an editor unscheduled or rescheduled
	* between selection and publish. It claims the row with a single conditional
	* UPDATE (clearing `scheduled_at`) before any other write, so it is atomic
	* even on D1 (no multi-statement transactions) and serialises against
	* `unschedule()` and concurrent sweeps — no TOCTOU and no double publish.
	*/
	async publish(type, id, publishedAt, requireDue = false) {
		const tableName = getTableName(type);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		let claimedScheduledAt = null;
		let claimedUpdatedAt = null;
		if (requireDue) {
			if (((await sql`
				UPDATE ${sql.ref(tableName)}
				SET scheduled_at = NULL,
					updated_at = ${now}
				WHERE id = ${id}
				AND scheduled_at IS NOT NULL
				AND scheduled_at <= ${now}
				AND deleted_at IS NULL
			`.execute(this.db)).numAffectedRows ?? 0n) === 0n) throw new ScheduledNotDueError();
			claimedScheduledAt = existing.scheduledAt;
			claimedUpdatedAt = existing.updatedAt;
		}
		let publishCommitted = false;
		try {
			const revisionRepo = new RevisionRepository(this.db);
			let revisionToPublish = existing.draftRevisionId || existing.liveRevisionId;
			if (!revisionToPublish) revisionToPublish = (await revisionRepo.create({
				collection: type,
				entryId: id,
				data: existing.data
			})).id;
			const revision = await revisionRepo.findById(revisionToPublish);
			if (revision) {
				const stagedSlug = typeof revision.data._slug === "string" ? revision.data._slug : null;
				if (stagedSlug !== null && stagedSlug !== existing.slug && existing.locale !== null) {
					const conflict = await this.findBySlugIncludingTrashed(type, stagedSlug, existing.locale);
					if (conflict && conflict.id !== id) throw new EmDashValidationError(`Cannot publish: slug '${stagedSlug}' is already used by another entry in this collection (id: ${conflict.id}). Choose a different slug.`, { code: "SLUG_CONFLICT" });
				}
				if (stagedSlug !== null) await sql`
						UPDATE ${sql.ref(tableName)}
						SET slug = ${stagedSlug}
						WHERE id = ${id}
					`.execute(this.db);
				await this.syncDataColumns(type, id, revision.data);
			}
			if (publishedAt !== void 0) await sql`
					UPDATE ${sql.ref(tableName)}
					SET live_revision_id = ${revisionToPublish},
						draft_revision_id = NULL,
						status = 'published',
						scheduled_at = NULL,
						published_at = ${publishedAt},
						updated_at = ${now}
					WHERE id = ${id}
					AND deleted_at IS NULL
				`.execute(this.db);
			else await sql`
					UPDATE ${sql.ref(tableName)}
					SET live_revision_id = ${revisionToPublish},
						draft_revision_id = NULL,
						status = 'published',
						scheduled_at = NULL,
						published_at = COALESCE(published_at, ${now}),
						updated_at = ${now}
					WHERE id = ${id}
					AND deleted_at IS NULL
				`.execute(this.db);
			publishCommitted = true;
			await this.restampEntryPivot(type, id);
			const updated = await this.findById(type, id);
			if (!updated) throw new Error("Content not found");
			invalidateCollectionCache(type);
			return updated;
		} catch (error) {
			if (requireDue && claimedScheduledAt && !publishCommitted) try {
				await sql`
						UPDATE ${sql.ref(tableName)}
						SET scheduled_at = ${claimedScheduledAt},
							updated_at = ${claimedUpdatedAt ?? now}
						WHERE id = ${id}
						AND scheduled_at IS NULL
						AND deleted_at IS NULL
						AND (status != 'published' OR draft_revision_id IS NOT NULL)
					`.execute(this.db);
			} catch (restoreError) {
				console.error(`[content] Failed to restore schedule for ${type}/${id} after publish failure:`, restoreError);
			}
			throw error;
		}
	}
	/**
	* Unpublish content
	*
	* Removes live pointer but preserves draft. If no draft exists,
	* creates one from the live version so the content isn't lost.
	*/
	async unpublish(type, id) {
		const tableName = getTableName(type);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		if (!existing.draftRevisionId && existing.liveRevisionId) {
			const revisionRepo = new RevisionRepository(this.db);
			const liveRevision = await revisionRepo.findById(existing.liveRevisionId);
			if (liveRevision) {
				const draft = await revisionRepo.create({
					collection: type,
					entryId: id,
					data: liveRevision.data
				});
				await sql`
					UPDATE ${sql.ref(tableName)}
					SET draft_revision_id = ${draft.id}
					WHERE id = ${id}
				`.execute(this.db);
			}
		}
		await sql`
			UPDATE ${sql.ref(tableName)}
			SET live_revision_id = NULL,
				status = 'draft',
				published_at = NULL,
				updated_at = ${now}
			WHERE id = ${id}
			AND deleted_at IS NULL
		`.execute(this.db);
		await this.restampEntryPivot(type, id);
		invalidateCollectionCache(type);
		const updated = await this.findById(type, id);
		if (!updated) throw new Error("Content not found");
		return updated;
	}
	/**
	* Set the draft revision pointer for a content item.
	*
	* Used by seed/import paths that stage a new revision's data before
	* promoting it to live via `publish()`.
	*
	* Validates that the content item exists and is not soft-deleted, that
	* the revision exists, and that the revision belongs to the same
	* collection and entry. Without these checks, a caller could leave the
	* content row pointing at a missing or unrelated revision.
	*/
	async setDraftRevision(type, id, revisionId) {
		const tableName = getTableName(type);
		if (!await this.findById(type, id)) throw new EmDashValidationError("Content item not found");
		const revision = await new RevisionRepository(this.db).findById(revisionId);
		if (!revision) throw new EmDashValidationError("Revision not found");
		if (revision.collection !== type || revision.entryId !== id) throw new EmDashValidationError("Revision does not belong to the specified content item");
		await sql`
			UPDATE ${sql.ref(tableName)}
			SET draft_revision_id = ${revisionId}
			WHERE id = ${id}
			AND deleted_at IS NULL
		`.execute(this.db);
		invalidateCollectionCache(type);
	}
	/**
	* Discard pending draft changes
	*
	* Clears draft_revision_id. The content table columns already hold the
	* published version, so no data sync is needed.
	*/
	async discardDraft(type, id) {
		const tableName = getTableName(type);
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		if (!existing.draftRevisionId) return existing;
		await sql`
			UPDATE ${sql.ref(tableName)}
			SET draft_revision_id = NULL
			WHERE id = ${id}
			AND deleted_at IS NULL
		`.execute(this.db);
		invalidateCollectionCache(type);
		const updated = await this.findById(type, id);
		if (!updated) throw new Error("Content not found");
		return updated;
	}
	/**
	* Sync data columns in the content table from a data object.
	* Used to promote revision data into the content table on publish.
	* Keys starting with _ are revision metadata (e.g. _slug) and are skipped.
	*/
	async syncDataColumns(type, id, data) {
		const tableName = getTableName(type);
		const updates = {};
		for (const [key, value] of Object.entries(data)) {
			if (SYSTEM_COLUMNS.has(key)) continue;
			if (key.startsWith("_")) continue;
			validateIdentifier(key, "content field name");
			updates[key] = serializeValue(value);
		}
		if (Object.keys(updates).length === 0) return;
		await this.db.updateTable(tableName).set(updates).where("id", "=", id).execute();
	}
	/**
	* Count content items with a pending schedule.
	* Includes both draft-scheduled (status='scheduled') and published
	* posts with scheduled draft changes (status='published', scheduled_at set).
	*/
	async countScheduled(type) {
		const tableName = getTableName(type);
		const result = await sql`
			SELECT COUNT(id) as count FROM ${sql.ref(tableName)}
			WHERE scheduled_at IS NOT NULL
			AND deleted_at IS NULL
		`.execute(this.db);
		return Number(result.rows[0]?.count || 0);
	}
	/**
	* Map database row to ContentItem
	* Extracts system columns and puts content fields in data
	* Excludes null values from data to match input semantics
	*/
	mapRow(type, row) {
		const data = {};
		for (const [key, value] of Object.entries(row)) if (!SYSTEM_COLUMNS.has(key) && value !== null) data[key] = deserializeValue(value);
		return {
			id: row.id,
			type,
			slug: row.slug,
			status: row.status,
			data,
			authorId: row.author_id,
			primaryBylineId: row.primary_byline_id ?? null,
			createdAt: row.created_at,
			updatedAt: row.updated_at,
			publishedAt: row.published_at,
			scheduledAt: row.scheduled_at,
			liveRevisionId: row.live_revision_id ?? null,
			draftRevisionId: row.draft_revision_id ?? null,
			version: typeof row.version === "number" ? row.version : 1,
			locale: row.locale ?? null,
			translationGroup: row.translation_group ?? null
		};
	}
	/**
	* Map order field names to database columns.
	* Only allows known fields to prevent column enumeration via crafted orderBy values.
	*/
	mapOrderField(field) {
		const mapped = {
			createdAt: "created_at",
			updatedAt: "updated_at",
			publishedAt: "published_at",
			scheduledAt: "scheduled_at",
			deletedAt: "deleted_at",
			title: "title",
			name: "name",
			slug: "slug",
			status: "status",
			locale: "locale"
		}[field];
		if (!mapped) throw new EmDashValidationError(`Invalid order field: ${field}`);
		return mapped;
	}
};
//#endregion
//#region node_modules/emdash/src/seo/hreflang.ts
var TRAILING_SLASH_RE = /\/$/;
var ABSOLUTE_URL_RE = /^https?:\/\//i;
/**
* IDs of variants flagged `noindex` in the SEO panel. Entries without
* an `_emdash_seo` row are indexable by default (same as the sitemap).
* The id list is bounded by the number of configured locales, so no
* chunking is needed.
*/
async function findNoindexIds(db, collection, ids) {
	if (ids.length === 0) return /* @__PURE__ */ new Set();
	const rows = await db.selectFrom("_emdash_seo").select("content_id").where("collection", "=", collection).where("content_id", "in", ids).where("seo_no_index", "=", 1).execute();
	return new Set(rows.map((r) => r.content_id));
}
/**
* Resolve hreflang alternates for a content entry.
*
* @example
* ```astro
* ---
* import { getHreflangAlternates } from "emdash";
*
* const alternates = await getHreflangAlternates("posts", entry.data.id, {
*   siteUrl: Astro.url.origin,
* });
* ---
* <head>
*   {alternates.map((a) => <link rel="alternate" hreflang={a.hreflang} href={a.href} />)}
* </head>
* ```
*/
async function getHreflangAlternates(collection, entryId, options = {}) {
	if (!isI18nEnabled()) return [];
	const key = `hreflang:${collection}:${entryId}:${options.siteUrl ?? ""}`;
	return requestCached(key, async () => {
		const { getDb } = await import("./loader_BVU5p3DI.mjs");
		return getHreflangAlternatesWithDb(await getDb(), collection, entryId, options);
	});
}
/**
* Resolve hreflang alternates with an explicit db handle.
*
* @internal Use `getHreflangAlternates()` in templates. This variant is
* for routes/components that already have a database handle.
*/
async function getHreflangAlternatesWithDb(db, collection, entryId, options = {}) {
	if (!isI18nEnabled()) return [];
	let siteUrl = options.siteUrl;
	if (!siteUrl) siteUrl = (await getSiteSettingsWithDb(db)).url;
	if (!siteUrl || !ABSOLUTE_URL_RE.test(siteUrl)) return [];
	siteUrl = siteUrl.replace(TRAILING_SLASH_RE, "");
	const repo = new ContentRepository(db);
	const item = await repo.findByIdOrSlug(collection, entryId);
	if (!item) return [];
	const group = item.translationGroup || item.id;
	let variants = await repo.findTranslations(collection, group);
	if (variants.length === 0) variants = [item];
	let published = variants.filter((v) => v.status === "published");
	if (published.length === 0) return [];
	const noindexIds = await findNoindexIds(db, collection, published.map((v) => v.id));
	if (noindexIds.has(item.id)) return [];
	published = published.filter((v) => !noindexIds.has(v.id));
	const urlPattern = (await getCollectionInfoWithDb(db, collection))?.urlPattern ?? null;
	const resolved = [];
	for (const variant of published) {
		const locale = variant.locale || "en";
		const path = interpolateUrlPattern$1({
			pattern: urlPattern,
			collection,
			slug: variant.slug || variant.id,
			id: variant.id
		});
		const localized = await localizePath(path, locale);
		if (localized === null) continue;
		resolved.push({
			locale,
			href: `${siteUrl}${localized}`
		});
	}
	if (resolved.length === 0) return [];
	resolved.sort((a, b) => a.locale.localeCompare(b.locale));
	const alternates = resolved.map((r) => ({
		hreflang: r.locale,
		href: r.href
	}));
	const defaultLocale = getI18nConfig()?.defaultLocale;
	const xDefault = resolved.find((r) => r.locale === defaultLocale) ?? resolved[0];
	if (xDefault) alternates.push({
		hreflang: "x-default",
		href: xDefault.href
	});
	return alternates;
}
//#endregion
//#region node_modules/emdash/src/components/EmDashHead.astro
createAstro("https://astro.build");
var $$EmDashHead = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EmDashHead;
	const { page } = Astro.props;
	const runtime = getPageRuntime(Astro.locals);
	let metadataHtml = "";
	let siteIdentityHtml = "";
	let fragmentsHtml = "";
	let jsonLdScripts = [];
	if (runtime) {
		const [siteSettings, pluginContributions, fragments] = await Promise.all([
			getSiteSettings$1(),
			runtime.collectPageMetadata(page),
			runtime.collectPageFragments(page)
		]);
		const baseContributions = generateBaseSeoContributions(page, absolutizeMediaUrl(siteSettings.seo?.defaultOgImage?.url, siteSettings.url, page));
		let hreflangContributions = [];
		if (page.content && isI18nEnabled()) {
			const siteUrl = page.siteUrl || siteSettings.url || new URL(page.url).origin;
			hreflangContributions = (await getHreflangAlternates(page.content.collection, page.content.id, { siteUrl })).map((a) => ({
				kind: "link",
				rel: "alternate",
				href: a.href,
				hreflang: a.hreflang
			}));
		}
		const siteContributions = generateSiteSeoContributions(siteSettings.seo);
		const resolved = resolvePageMetadata([
			...pluginContributions,
			...siteContributions,
			...baseContributions,
			...hreflangContributions
		]);
		jsonLdScripts = resolved.jsonld;
		metadataHtml = renderPageMetadata(resolved, { includeJsonLd: false });
		siteIdentityHtml = renderSiteIdentity({ favicon: siteSettings.favicon });
		fragmentsHtml = renderFragments(fragments, "head");
	} else {
		const resolved = resolvePageMetadata(generateBaseSeoContributions(page));
		jsonLdScripts = resolved.jsonld;
		metadataHtml = renderPageMetadata(resolved, { includeJsonLd: false });
	}
	await registerJsonLdCspHashes(config_default.astroCspEnabled === true, () => Astro.csp, jsonLdScripts);
	return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result) => renderTemplate`${unescapeHTML(metadataHtml)}` })}${jsonLdScripts.map(({ json }) => renderTemplate`${renderComponent($$result, "JsonLdScript", $$JsonLdScript, { "json": json })}`)}${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result) => renderTemplate`${unescapeHTML(siteIdentityHtml)}` })}${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result) => renderTemplate`${unescapeHTML(fragmentsHtml)}` })}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/EmDashHead.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/EmDashBodyStart.astro
createAstro("https://astro.build");
var $$EmDashBodyStart = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EmDashBodyStart;
	const { page } = Astro.props;
	const runtime = getPageRuntime(Astro.locals);
	let html = "";
	if (runtime) html = renderFragments(await runtime.collectPageFragments(page), "body:start");
	return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result) => renderTemplate`${unescapeHTML(html)}` })}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/EmDashBodyStart.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/EmDashBodyEnd.astro
createAstro("https://astro.build");
var $$EmDashBodyEnd = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EmDashBodyEnd;
	const { page } = Astro.props;
	const runtime = getPageRuntime(Astro.locals);
	let html = "";
	if (runtime) html = renderFragments(await runtime.collectPageFragments(page), "body:end");
	return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result) => renderTemplate`${unescapeHTML(html)}` })}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/EmDashBodyEnd.astro", void 0);
//#endregion
//#region node_modules/emdash/src/components/index.ts
/**
* Pre-configured components for EmDash Portable Text content
*
* Includes renderers for:
* - Block styles: paragraph, h1..h6, blockquote — with `textAlign` honoured
*   as a WordPress-style `has-text-align-{value}` class (#1201)
* - Block types: image, code, embed, gallery, columns, break, htmlBlock, table,
*   button, buttons, cover, file, pullquote
* - Marks: superscript, subscript, underline, strike-through, link
*/
var emdashComponents = {
	block: $$Block,
	type: {
		blockquoteGroup: $$BlockquoteGroup,
		image: $$Image,
		code: $$Code,
		embed: $$Embed,
		gallery: $$Gallery,
		columns: $$Columns,
		break: $$Break,
		htmlBlock: $$HtmlBlock,
		table: $$Table,
		button: $$Button,
		buttons: $$Buttons,
		cover: $$Cover,
		file: $$File,
		pullquote: $$Pullquote
	},
	mark: emdashMarkComponents
};
//#endregion
//#region node_modules/emdash/dist/page/index.mjs
function isAstroInput(input) {
	return "Astro" in input;
}
function createPublicPageContext(input) {
	let url;
	let path;
	let locale;
	if (isAstroInput(input)) {
		url = input.Astro.url.href;
		path = input.Astro.url.pathname;
		locale = input.Astro.currentLocale ?? null;
	} else {
		const parsed = typeof input.url === "string" ? new URL(input.url) : input.url;
		url = parsed.href;
		path = parsed.pathname;
		locale = input.locale ?? null;
	}
	return {
		url,
		path,
		locale,
		kind: input.kind,
		pageType: input.pageType ?? (input.kind === "content" ? "article" : "website"),
		title: input.title ?? null,
		pageTitle: input.pageTitle ?? null,
		description: input.description ?? null,
		canonical: input.canonical ?? null,
		image: input.image ?? null,
		content: input.content ? {
			collection: input.content.collection,
			id: input.content.id,
			slug: input.content.slug ?? null
		} : void 0,
		seo: input.seo,
		articleMeta: input.articleMeta,
		siteName: input.siteName,
		breadcrumbs: input.breadcrumbs,
		siteUrl: input.siteUrl
	};
}
//#endregion
//#region node_modules/emdash/src/components/LiveSearch.astro
createAstro("https://astro.build");
var $$LiveSearch = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LiveSearch;
	const { placeholder = "Search...", collections, minChars = 2, debounce = 300, limit = 10, class: className = "", style: styleAttr = "", inputClass = "", resultsClass = "", resultClass = "", showSnippets = true, autofocus = false, suggestMode = false, expandOnFocus, searchPage = "", routeMap = {} } = Astro.props;
	const config = {
		collections: collections?.join(",") ?? "",
		minChars,
		debounce,
		limit,
		showSnippets,
		suggestMode,
		expandOnFocus: expandOnFocus ?? null,
		searchPage,
		routeMap
	};
	return renderTemplate`${renderComponent($$result, "emdash-live-search", "emdash-live-search", {
		"class:list": ["emdash-live-search", className],
		"style": styleAttr,
		"data-config": JSON.stringify(config),
		"data-astro-cid-klwkb3g6": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<input type="search"${addAttribute(placeholder, "placeholder")}${addAttribute(["emdash-live-search-input", inputClass], "class:list")} autocomplete="off"${addAttribute(autofocus, "autofocus")} data-astro-cid-klwkb3g6><div${addAttribute(["emdash-live-search-results", resultsClass], "class:list")} hidden data-astro-cid-klwkb3g6>${renderSlot($$result, $$slots["loading"], renderTemplate`<div class="emdash-live-search-loading" data-astro-cid-klwkb3g6>Searching...</div>`)}${renderSlot($$result, $$slots["no-results"], renderTemplate`<div class="emdash-live-search-no-results" data-astro-cid-klwkb3g6>No results found</div>`)}<template class="emdash-live-search-result-template" data-astro-cid-klwkb3g6>${templateEnter($$result)}${renderSlot($$result, $$slots["result"], renderTemplate`<a${addAttribute(["emdash-live-search-result", resultClass], "class:list")} href="" data-astro-cid-klwkb3g6><span class="emdash-live-search-result-title" data-astro-cid-klwkb3g6></span><span class="emdash-live-search-result-collection" data-astro-cid-klwkb3g6></span><span class="emdash-live-search-result-snippet" data-astro-cid-klwkb3g6></span></a>`)}${templateExit($$result)}</template><div class="emdash-live-search-results-list" data-astro-cid-klwkb3g6></div></div>` })}${renderScript($$result, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/LiveSearch.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/LiveSearch.astro", void 0);
//#endregion
//#region src/layouts/Base.astro
createAstro("https://astro.build");
var $$Base = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Base;
	const { title, pageTitle, description, image, canonical, robots, type = "website", publishedTime, modifiedTime, author, content } = Astro.props;
	const { siteTitle, siteTagline, siteLogo } = resolveBlogSiteIdentity(await getSiteSettings());
	const fullTitle = title.includes(siteTitle) ? title : `${title} — ${siteTitle}`;
	const menu = await getMenu$1("primary");
	const socialMenu = await getMenu$1("social");
	const { entries: pages } = await getEmDashCollection("pages");
	const pageCtx = createPublicPageContext({
		Astro,
		kind: content ? "content" : "custom",
		pageType: type,
		title: fullTitle,
		pageTitle: pageTitle ?? title,
		description,
		canonical,
		image,
		content,
		seo: {
			ogImage: image,
			robots
		},
		articleMeta: {
			publishedTime,
			modifiedTime,
			author
		},
		siteName: siteTitle
	});
	const isLoggedIn = !!Astro.locals.user;
	return renderTemplate`<html lang="en" data-astro-cid-hkbrpulz><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">${renderComponent($$result, "Font", $$Font, {
		"cssVariable": "--font-body",
		"preload": true,
		"data-astro-cid-hkbrpulz": true
	})}${renderComponent($$result, "Font", $$Font, {
		"cssVariable": "--font-mono",
		"data-astro-cid-hkbrpulz": true
	})}<title>${fullTitle}</title>${renderComponent($$result, "EmDashHead", $$EmDashHead, {
		"page": pageCtx,
		"data-astro-cid-hkbrpulz": true
	})}<script>
			// Apply an explicit theme choice immediately to prevent flash.
			// With no cookie, color-scheme: light dark follows the OS.
			(function () {
				var c = document.cookie;
				var i = c.indexOf("theme=");
				var theme = i >= 0 ? c.slice(i + 6).split(";")[0] : null;
				if (theme === "dark" || theme === "light") {
					document.documentElement.classList.add(theme);
				}
			})();
		<\/script>${renderHead($$result)}</head><body data-astro-cid-hkbrpulz>${renderComponent($$result, "EmDashBodyStart", $$EmDashBodyStart, {
		"page": pageCtx,
		"data-astro-cid-hkbrpulz": true
	})}<header class="site-header" data-astro-cid-hkbrpulz><nav class="nav" data-astro-cid-hkbrpulz><a href="/" class="site-title" data-astro-cid-hkbrpulz>${siteLogo ? renderTemplate`<img${addAttribute(siteLogo.url, "src")}${addAttribute(siteLogo.alt || siteTitle, "alt")} class="site-logo-img" data-astro-cid-hkbrpulz>` : siteTitle}</a><div class="nav-right" data-astro-cid-hkbrpulz>${renderComponent($$result, "LiveSearch", $$LiveSearch, {
		"placeholder": "Search...",
		"class": "site-search",
		"inputClass": "site-search-input",
		"resultsClass": "site-search-results",
		"resultClass": "site-search-result",
		"collections": ["posts", "pages"],
		"data-astro-cid-hkbrpulz": true
	})}<div class="nav-links" data-astro-cid-hkbrpulz>${menu?.items.map((item) => renderTemplate`<a${addAttribute(item.url, "href")}${addAttribute(item.target, "target")} data-astro-cid-hkbrpulz>${item.label}</a>`)}</div></div>${isLoggedIn && renderTemplate`<a href="/_emdash/admin" class="nav-admin" data-astro-cid-hkbrpulz>Admin</a>`}</nav></header><main data-astro-cid-hkbrpulz>${renderSlot($$result, $$slots["default"])}</main><footer class="site-footer" data-astro-cid-hkbrpulz><div class="footer-inner" data-astro-cid-hkbrpulz><div class="footer-grid" data-astro-cid-hkbrpulz><div class="footer-brand" data-astro-cid-hkbrpulz><a href="/" class="footer-logo" data-astro-cid-hkbrpulz>${siteLogo ? renderTemplate`<img${addAttribute(siteLogo.url, "src")}${addAttribute(siteLogo.alt || siteTitle, "alt")} class="footer-logo-img" data-astro-cid-hkbrpulz>` : siteTitle}</a><p class="footer-tagline" data-astro-cid-hkbrpulz>${siteTagline}</p></div><div class="footer-nav" data-astro-cid-hkbrpulz><h4 class="footer-heading" data-astro-cid-hkbrpulz>Navigate</h4><ul class="footer-links" data-astro-cid-hkbrpulz><li data-astro-cid-hkbrpulz><a href="/" data-astro-cid-hkbrpulz>Home</a></li><li data-astro-cid-hkbrpulz><a href="/posts" data-astro-cid-hkbrpulz>All Posts</a></li>${pages.slice(0, 3).map((page) => renderTemplate`<li data-astro-cid-hkbrpulz><a${addAttribute(`/pages/${page.data.slug || page.id}`, "href")} data-astro-cid-hkbrpulz>${page.data.title}</a></li>`)}</ul></div><div class="footer-nav" data-astro-cid-hkbrpulz><h4 class="footer-heading" data-astro-cid-hkbrpulz>Connect</h4><ul class="footer-links" data-astro-cid-hkbrpulz>${socialMenu?.items.map((item) => renderTemplate`<li data-astro-cid-hkbrpulz><a${addAttribute(item.url, "href")}${addAttribute(item.target, "target")}${addAttribute(item.target === "_blank" ? "noopener noreferrer" : void 0, "rel")} data-astro-cid-hkbrpulz>${item.label}</a></li>`)}<li data-astro-cid-hkbrpulz><a href="/rss.xml" data-astro-cid-hkbrpulz>RSS Feed</a></li></ul></div><div class="footer-widgets-section" data-astro-cid-hkbrpulz>${renderComponent($$result, "WidgetArea", $$WidgetArea, {
		"name": "footer",
		"data-astro-cid-hkbrpulz": true
	})}</div></div><div class="footer-bottom" data-astro-cid-hkbrpulz><p class="footer-copyright" data-astro-cid-hkbrpulz>Powered by <a href="https://emdashcms.com" data-astro-cid-hkbrpulz>EmDash</a></p><div class="theme-switcher" data-astro-cid-hkbrpulz><button type="button" class="theme-btn" data-theme="light" aria-label="Light mode" data-astro-cid-hkbrpulz><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-hkbrpulz><circle cx="12" cy="12" r="5" data-astro-cid-hkbrpulz></circle><line x1="12" y1="1" x2="12" y2="3" data-astro-cid-hkbrpulz></line><line x1="12" y1="21" x2="12" y2="23" data-astro-cid-hkbrpulz></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" data-astro-cid-hkbrpulz></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" data-astro-cid-hkbrpulz></line><line x1="1" y1="12" x2="3" y2="12" data-astro-cid-hkbrpulz></line><line x1="21" y1="12" x2="23" y2="12" data-astro-cid-hkbrpulz></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" data-astro-cid-hkbrpulz></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" data-astro-cid-hkbrpulz></line></svg></button><button type="button" class="theme-btn" data-theme="dark" aria-label="Dark mode" data-astro-cid-hkbrpulz><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-hkbrpulz><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" data-astro-cid-hkbrpulz></path></svg></button><button type="button" class="theme-btn" data-theme="system" aria-label="System theme" data-astro-cid-hkbrpulz><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-hkbrpulz><rect x="2" y="3" width="20" height="14" rx="2" ry="2" data-astro-cid-hkbrpulz></rect><line x1="8" y1="21" x2="16" y2="21" data-astro-cid-hkbrpulz></line><line x1="12" y1="17" x2="12" y2="21" data-astro-cid-hkbrpulz></line></svg></button></div></div></div></footer>${renderScript($$result, "C:/Users/prohl/Documents/blog/my-site/src/layouts/Base.astro?astro&type=script&index=0&lang.ts")}${renderScript($$result, "C:/Users/prohl/Documents/blog/my-site/src/layouts/Base.astro?astro&type=script&index=1&lang.ts")}${renderComponent($$result, "EmDashBodyEnd", $$EmDashBodyEnd, {
		"page": pageCtx,
		"data-astro-cid-hkbrpulz": true
	})}</body></html>`;
}, "C:/Users/prohl/Documents/blog/my-site/src/layouts/Base.astro", void 0);
//#endregion
export { $$Comments as a, $$CommentForm as i, $$EmDashImage as n, $$PortableText as o, $$WidgetArea as r, renderScript as s, $$Base as t };
