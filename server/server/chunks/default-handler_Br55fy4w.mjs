import { $ as StaticClientAddressNotAvailable, A as LocalsReassigned, G as PrerenderClientAddressNotAvailable, J as ReservedSlotName, M as MiddlewareNotAResponse, Q as SessionStorageSaveError, Y as ResponseSentError, Z as SessionStorageInitError, a as AstroResponseHeadersReassigned, c as ClientAddressNotAvailable, g as ForbiddenRewrite, i as ActionsReturnedInvalidDataError, it as i18nNoLocaleFoundInPath, j as MiddlewareNoDataOrNextCalled, k as LocalsNotAnObject, n as isAstroError, o as CacheNotEnabled, r as ActionNotFoundError, t as AstroError, z as NoManifestAvailable } from "./errors_pu5yVRD2.mjs";
import { A as clientAddressSymbol, C as isRoute404, E as ASTRO_GENERATOR, F as decodeKey, L as generateCspDigest, N as originPathnameSymbol, O as REDIRECT_STATUS_CODES, P as responseSentSymbol$1, T as ASTRO_ERROR_HEADER, _ as normalizeCspResourceEntry, g as isRenderInstruction, j as fetchStateSymbol, k as REROUTABLE_STATUS_CODES, l as renderSlotToString, n as renderPage, o as chunkToString, r as renderJSX, u as isRenderTemplateResult, v as pushDirective, w as isRoute500, x as renderEndpoint } from "./server_BcH6IwVj.mjs";
import { f as removeLeadingForwardSlash, g as stripRequestBase, h as slash, i as collapseDuplicateTrailingSlashes, l as joinPaths, m as removeTrailingForwardSlash, o as hasFileExtension, r as collapseDuplicateSlashes, s as isInternalPath, t as appendForwardSlash, u as prependForwardSlash } from "./path_DW70cvEd.mjs";
import { n as matchPattern } from "./remote_BgpFkaRQ.mjs";
import { A as pathHasLocale, C as readBodyWithLimit, D as AstroIntegrationLogger, E as shouldAppendForwardSlash, O as normalizeTheLocale, S as BodySizeLimitError, T as createManifestMemo, _ as getCustom404Route, a as getRouteCache, b as routeHasHtmlExtension, c as getResolvedLogger, d as getOriginPathname, f as setOriginPathname, g as SERVER_ISLAND_COMPONENT, h as DEFAULT_404_ROUTE, i as getProps, k as normalizeThePath, l as getEnvironment, m as validateAndDecodePathname, n as defineMiddleware, o as getRouteGenerator, p as MultiLevelEncodingError, r as getParams, s as getLogger, t as sequence, u as copyRequest, v as getCustom500Route, w as createAsyncManifestMemo, x as getErrorRoutePath, y as getDefaultStatusCode } from "./sequence_7DdI3OEt.mjs";
import React, { createElement, memo } from "react";
import ReactDOM from "react-dom/server";
import picomatch from "picomatch";
import { parseCookie, stringifySetCookie } from "cookie";
import colors from "piccolore";
import { parse, stringify, unflatten } from "devalue";
import { escape } from "html-escaper";
import { createStorage } from "unstorage";
//#region node_modules/astro/dist/core/middleware/noop-middleware.js
var NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
	return await next();
};
//#endregion
//#region node_modules/astro/dist/core/app/manifest.js
function deserializeManifest(serializedManifest, routesList) {
	const routes = [];
	if (serializedManifest.routes) for (const serializedRoute of serializedManifest.routes) {
		routes.push({
			...serializedRoute,
			routeData: deserializeRouteData(serializedRoute.routeData)
		});
		const route = serializedRoute;
		route.routeData = deserializeRouteData(serializedRoute.routeData);
	}
	if (routesList) for (const route of routesList?.routes) routes.push({
		file: "",
		links: [],
		scripts: [],
		styles: [],
		routeData: route
	});
	const assets = new Set(serializedManifest.assets);
	const componentMetadata = new Map(serializedManifest.componentMetadata);
	const inlinedScripts = new Map(serializedManifest.inlinedScripts);
	const clientDirectives = new Map(serializedManifest.clientDirectives);
	const key = decodeKey(serializedManifest.key);
	return {
		middleware() {
			return { onRequest: NOOP_MIDDLEWARE_FN };
		},
		...serializedManifest,
		rootDir: new URL(serializedManifest.rootDir),
		srcDir: new URL(serializedManifest.srcDir),
		publicDir: new URL(serializedManifest.publicDir),
		outDir: new URL(serializedManifest.outDir),
		cacheDir: new URL(serializedManifest.cacheDir),
		buildClientDir: new URL(serializedManifest.buildClientDir),
		buildServerDir: new URL(serializedManifest.buildServerDir),
		assets,
		componentMetadata,
		inlinedScripts,
		clientDirectives,
		routes,
		key
	};
}
function deserializeRouteData(rawRouteData) {
	return {
		route: rawRouteData.route,
		type: rawRouteData.type,
		pattern: new RegExp(rawRouteData.pattern),
		params: rawRouteData.params,
		component: rawRouteData.component,
		pathname: rawRouteData.pathname || void 0,
		segments: rawRouteData.segments,
		prerender: rawRouteData.prerender,
		redirect: rawRouteData.redirect,
		redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
		fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
			return deserializeRouteData(fallback);
		}),
		isIndex: rawRouteData.isIndex,
		origin: rawRouteData.origin,
		distURL: rawRouteData.distURL
	};
}
function deserializeRouteInfo(rawRouteInfo) {
	return {
		styles: rawRouteInfo.styles,
		file: rawRouteInfo.file,
		links: rawRouteInfo.links,
		scripts: rawRouteInfo.scripts,
		routeData: deserializeRouteData(rawRouteInfo.routeData)
	};
}
//#endregion
//#region \0astro:react:opts
var _astro_react_opts_default = {
	include: void 0,
	exclude: void 0,
	experimentalReactChildren: false,
	experimentalDisableStreaming: false
};
//#endregion
//#region node_modules/@astrojs/react/dist/context.js
var contexts = /* @__PURE__ */ new WeakMap();
var ID_PREFIX = "r";
function getContext(rendererContextResult) {
	if (contexts.has(rendererContextResult)) return contexts.get(rendererContextResult);
	const ctx = {
		currentIndex: 0,
		get id() {
			return ID_PREFIX + this.currentIndex.toString();
		}
	};
	contexts.set(rendererContextResult, ctx);
	return ctx;
}
function incrementId(rendererContextResult) {
	const ctx = getContext(rendererContextResult);
	const id = ctx.id;
	ctx.currentIndex++;
	return id;
}
//#endregion
//#region node_modules/@astrojs/react/dist/static-html.js
var StaticHtml = ({ value, name, hydrate = true }) => {
	if (value == null || value.trim() === "") return null;
	return createElement(hydrate ? "astro-slot" : "astro-static-slot", {
		name,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: value }
	});
};
var static_html_default = memo(StaticHtml, () => true);
//#endregion
//#region node_modules/@astrojs/internal-helpers/dist/create-filter.js
function ensureArray(thing) {
	if (Array.isArray(thing)) return thing;
	if (thing == null) return [];
	return [thing];
}
function toMatcher(pattern) {
	if (pattern instanceof RegExp) return pattern;
	const normalized = slash(pattern);
	const fn = picomatch(normalized, { dot: true });
	return { test: (what) => fn(what) };
}
function createFilter(include, exclude) {
	const includeMatchers = ensureArray(include).map(toMatcher);
	const excludeMatchers = ensureArray(exclude).map(toMatcher);
	if (!includeMatchers.length && !excludeMatchers.length) return (id) => typeof id === "string" && !id.includes("\0");
	return function(id) {
		if (typeof id !== "string") return false;
		if (id.includes("\0")) return false;
		const pathId = slash(id);
		for (const matcher of excludeMatchers) {
			if (matcher instanceof RegExp) matcher.lastIndex = 0;
			if (matcher.test(pathId)) return false;
		}
		for (const matcher of includeMatchers) {
			if (matcher instanceof RegExp) matcher.lastIndex = 0;
			if (matcher.test(pathId)) return true;
		}
		return !includeMatchers.length;
	};
}
//#endregion
//#region node_modules/@astrojs/react/dist/server.js
var slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
var reactTypeof = /* @__PURE__ */ Symbol.for("react.element");
var reactTransitionalTypeof = /* @__PURE__ */ Symbol.for("react.transitional.element");
var filter = _astro_react_opts_default?.include || _astro_react_opts_default?.exclude ? createFilter(_astro_react_opts_default.include, _astro_react_opts_default.exclude) : null;
async function check(Component, props, children, metadata) {
	if (typeof Component === "object") return Component["$$typeof"].toString().slice(7).startsWith("react");
	if (typeof Component !== "function") return false;
	if (Component.name === "QwikComponent") return false;
	if (typeof Component === "function" && Component["$$typeof"] === /* @__PURE__ */ Symbol.for("react.forward_ref")) return false;
	if (Component.prototype != null && typeof Component.prototype.render === "function") return React.Component.isPrototypeOf(Component) || React.PureComponent.isPrototypeOf(Component);
	if (filter && metadata?.componentUrl && !filter(metadata.componentUrl)) return false;
	let isReactComponent = false;
	function Tester(...args) {
		try {
			const vnode = Component(...args);
			if (vnode && (vnode["$$typeof"] === reactTypeof || vnode["$$typeof"] === reactTransitionalTypeof)) isReactComponent = true;
		} catch {}
		return React.createElement("div");
	}
	await renderToStaticMarkup.call(this, Tester, props, children);
	return isReactComponent;
}
async function getNodeWritable() {
	let { Writable } = await import(
		/* @vite-ignore */
		"node:stream"
);
	return Writable;
}
function needsHydration(metadata) {
	return metadata?.astroStaticSlot ? !!metadata.hydrate : true;
}
async function renderToStaticMarkup(Component, props, { default: children, ...slotted }, metadata) {
	let prefix;
	if (this && this.result) prefix = incrementId(this.result);
	const attrs = { prefix };
	delete props["class"];
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName(key);
		slots[name] = React.createElement(static_html_default, {
			hydrate: needsHydration(metadata),
			value,
			name
		});
	}
	const newProps = {
		...props,
		...slots
	};
	const newChildren = children ?? props.children;
	if (children && _astro_react_opts_default.experimentalReactChildren) {
		attrs["data-react-children"] = true;
		newProps.children = (await import("./vnode-children_B6vVcKTz.mjs").then((mod) => mod.default))(children);
	} else if (newChildren != null) newProps.children = React.createElement(static_html_default, {
		hydrate: needsHydration(metadata),
		value: newChildren
	});
	const formState = this ? await getFormState(this) : void 0;
	if (formState) {
		attrs["data-action-result"] = JSON.stringify(formState[0]);
		attrs["data-action-key"] = formState[1];
		attrs["data-action-name"] = formState[2];
	}
	const vnode = React.createElement(Component, newProps);
	const renderOptions = {
		identifierPrefix: prefix,
		formState
	};
	let html;
	if (_astro_react_opts_default.experimentalDisableStreaming) html = ReactDOM.renderToString(vnode);
	else if ("renderToReadableStream" in ReactDOM) html = await renderToReadableStreamAsync(vnode, renderOptions);
	else html = await renderToPipeableStreamAsync(vnode, renderOptions);
	html = html.replace(/<link\s[^>]*rel="(?:preload|modulepreload|stylesheet|preconnect|dns-prefetch)"[^>]*>/g, "");
	return {
		html,
		attrs
	};
}
async function getFormState({ result }) {
	const { request, actionResult } = result;
	if (!actionResult) return void 0;
	if (!isFormRequest(request.headers.get("content-type"))) return void 0;
	const { searchParams } = new URL(request.url);
	const actionKey = (await request.clone().formData()).get("$ACTION_KEY")?.toString();
	const actionName = searchParams.get("_action");
	if (!actionKey || !actionName) return void 0;
	return [
		actionResult,
		actionKey,
		actionName
	];
}
async function renderToPipeableStreamAsync(vnode, options) {
	const Writable = await getNodeWritable();
	let html = "";
	return new Promise((resolve, reject) => {
		let error = void 0;
		let stream = ReactDOM.renderToPipeableStream(vnode, {
			...options,
			onError(err) {
				error = err;
				reject(error);
			},
			onAllReady() {
				stream.pipe(new Writable({
					write(chunk, _encoding, callback) {
						html += chunk.toString("utf-8");
						callback();
					},
					destroy() {
						resolve(html);
					}
				}));
			}
		});
	});
}
async function readResult(stream) {
	const reader = stream.getReader();
	let result = "";
	const decoder = new TextDecoder("utf-8");
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			if (value) result += decoder.decode(value);
			else decoder.decode(/* @__PURE__ */ new Uint8Array());
			return result;
		}
		result += decoder.decode(value, { stream: true });
	}
}
async function renderToReadableStreamAsync(vnode, options) {
	return await readResult(await ReactDOM.renderToReadableStream(vnode, options));
}
var formContentTypes$1 = ["application/x-www-form-urlencoded", "multipart/form-data"];
function isFormRequest(contentType) {
	const type = contentType?.split(";")[0].toLowerCase();
	return formContentTypes$1.some((t) => type === t);
}
//#endregion
//#region \0virtual:astro:renderers
var renderers = [Object.assign({
	"name": "@astrojs/react",
	"clientEntrypoint": "@astrojs/react/client.js",
	"serverEntrypoint": "@astrojs/react/server.js"
}, { ssr: {
	name: "@astrojs/react",
	check,
	renderToStaticMarkup,
	supportsAstroStaticSlot: true
} })];
//#endregion
//#region node_modules/astro/dist/core/i18n/domain.js
function computePathnameFromDomain(request, url, i18n, base, trailingSlash, logger, pathnameFromRequest) {
	let pathname = void 0;
	if (i18n && (i18n.strategy === "domains-prefix-always" || i18n.strategy === "domains-prefix-other-locales" || i18n.strategy === "domains-prefix-always-no-redirect")) {
		let host = request.headers.get("X-Forwarded-Host");
		let protocol = request.headers.get("X-Forwarded-Proto");
		if (protocol) protocol = protocol + ":";
		else protocol = url.protocol;
		if (!host) host = request.headers.get("Host");
		if (host && protocol) {
			host = host.split(":")[0];
			try {
				let locale;
				const hostAsUrl = new URL(`${protocol}//${host}`);
				for (const [domainKey, localeValue] of Object.entries(i18n.domainLookupTable)) {
					const domainKeyAsUrl = new URL(domainKey);
					if (hostAsUrl.host === domainKeyAsUrl.host && hostAsUrl.protocol === domainKeyAsUrl.protocol) {
						locale = localeValue;
						break;
					}
				}
				if (locale) {
					const requestPathname = pathnameFromRequest ?? stripRequestBase(url.pathname, base);
					pathname = prependForwardSlash(joinPaths(normalizeTheLocale(locale), requestPathname));
					if (trailingSlash === "always") pathname = appendForwardSlash(pathname);
					else if (trailingSlash === "never") pathname = removeTrailingForwardSlash(pathname);
					else if (url.pathname.endsWith("/")) pathname = appendForwardSlash(pathname);
				}
			} catch (e) {
				logger.error("router", `Astro tried to parse ${protocol}//${host} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`);
				logger.error("router", `Error: ${e}`);
			}
		}
	}
	return pathname;
}
//#endregion
//#region node_modules/astro/dist/core/cookies/cookies.js
var DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
var DELETED_VALUE = "deleted";
var responseSentSymbol = /* @__PURE__ */ Symbol.for("astro.responseSent");
var identity = (value) => value;
var AstroCookie = class {
	value;
	constructor(value) {
		this.value = value;
	}
	json() {
		if (this.value === void 0) throw new Error(`Cannot convert undefined to an object.`);
		return JSON.parse(this.value);
	}
	number() {
		return Number(this.value);
	}
	boolean() {
		if (this.value === "false") return false;
		if (this.value === "0") return false;
		return Boolean(this.value);
	}
};
var AstroCookies = class {
	#request;
	#requestValues;
	#outgoing;
	#consumed;
	constructor(request) {
		this.#request = request;
		this.#requestValues = null;
		this.#outgoing = null;
		this.#consumed = false;
	}
	/**
	* Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
	* in a Set-Cookie header added to the response.
	* @param key The cookie to delete
	* @param options Options related to this deletion, such as the path of the cookie.
	*/
	delete(key, options) {
		this.#ensureOutgoingMap().set(key, [
			DELETED_VALUE,
			stringifySetCookie({
				...options,
				name: key,
				value: DELETED_VALUE,
				expires: DELETED_EXPIRATION,
				maxAge: void 0
			}),
			false
		]);
	}
	/**
	* Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
	* request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
	* from that set call, overriding any values already part of the request.
	* @param key The cookie to get.
	* @returns An object containing the cookie value as well as convenience methods for converting its value.
	*/
	get(key, options = void 0) {
		if (this.#outgoing?.has(key)) {
			let [serializedValue, , isSetValue] = this.#outgoing.get(key);
			if (isSetValue) return new AstroCookie(serializedValue);
			else return;
		}
		const decode = options?.decode ?? decodeURIComponent;
		const values = this.#ensureParsed();
		if (key in values) {
			const value = values[key];
			if (value) {
				let decodedValue;
				try {
					decodedValue = decode(value);
				} catch (_error) {
					decodedValue = value;
				}
				return new AstroCookie(decodedValue);
			}
		}
	}
	/**
	* Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
	* part of the initial request or set via Astro.cookies.set(key)
	* @param key The cookie to check for.
	* @param _options This parameter is no longer used.
	* @returns
	*/
	has(key, _options) {
		if (this.#outgoing?.has(key)) {
			let [, , isSetValue] = this.#outgoing.get(key);
			return isSetValue;
		}
		return this.#ensureParsed()[key] !== void 0;
	}
	/**
	* Astro.cookies.set(key, value) is used to set a cookie's value. If provided
	* an object it will be stringified via JSON.stringify(value). Additionally you
	* can provide options customizing how this cookie will be set, such as setting httpOnly
	* in order to prevent the cookie from being read in client-side JavaScript.
	* @param key The name of the cookie to set.
	* @param value A value, either a string or other primitive or an object.
	* @param options Options for the cookie, such as the path and security settings.
	*/
	set(key, value, options) {
		if (this.#consumed) {
			const warning = /* @__PURE__ */ new Error("Astro.cookies.set() was called after the cookies had already been sent to the browser.\nThis may have happened if this method was called in an imported component.\nPlease make sure that Astro.cookies.set() is only called in the frontmatter of the main page.");
			warning.name = "Warning";
			console.warn(warning);
		}
		let serializedValue;
		if (typeof value === "string") serializedValue = value;
		else {
			let toStringValue = value.toString();
			if (toStringValue === Object.prototype.toString.call(value)) serializedValue = JSON.stringify(value);
			else serializedValue = toStringValue;
		}
		const { encode, ...attributes } = options ?? {};
		this.#ensureOutgoingMap().set(key, [
			serializedValue,
			stringifySetCookie({
				...attributes,
				name: key,
				value: serializedValue
			}, { encode }),
			true
		]);
		if (this.#request[responseSentSymbol]) throw new AstroError({ ...ResponseSentError });
	}
	/**
	* Merges a new AstroCookies instance into the current instance. Any new cookies
	* will be added to the current instance, overwriting any existing cookies with the same name.
	*/
	merge(cookies) {
		const outgoing = cookies.#outgoing;
		if (outgoing) for (const [key, value] of outgoing) this.#ensureOutgoingMap().set(key, value);
	}
	/**
	* Astro.cookies.header() returns an iterator for the cookies that have previously
	* been set by either Astro.cookies.set() or Astro.cookies.delete().
	* This method is primarily used by adapters to set the header on outgoing responses.
	* @returns
	*/
	*headers() {
		if (this.#outgoing == null) return;
		for (const [, value] of this.#outgoing) yield value[1];
	}
	/**
	* Marks the cookies as consumed and returns the header values.
	* After consumption, any subsequent `set()` calls will warn.
	*/
	consume() {
		this.#consumed = true;
		return this.headers();
	}
	/**
	* @deprecated Use the instance method `cookies.consume()` instead.
	* Kept for backward compatibility with adapters.
	*/
	static consume(cookies) {
		return cookies.consume();
	}
	#ensureParsed() {
		if (!this.#requestValues) this.#parse();
		if (!this.#requestValues) this.#requestValues = /* @__PURE__ */ Object.create(null);
		return this.#requestValues;
	}
	#ensureOutgoingMap() {
		if (!this.#outgoing) this.#outgoing = /* @__PURE__ */ new Map();
		return this.#outgoing;
	}
	#parse() {
		const raw = this.#request.headers.get("cookie");
		if (!raw) return;
		this.#requestValues = parseCookie(raw, { decode: identity });
	}
};
//#endregion
//#region node_modules/astro/dist/core/cookies/response.js
var astroCookiesSymbol = /* @__PURE__ */ Symbol.for("astro.cookies");
function attachCookiesToResponse(response, cookies) {
	Reflect.set(response, astroCookiesSymbol, cookies);
}
function getCookiesFromResponse(response) {
	let cookies = Reflect.get(response, astroCookiesSymbol);
	if (cookies != null) return cookies;
	else return;
}
function* getSetCookiesFromResponse(response) {
	const cookies = getCookiesFromResponse(response);
	if (!cookies) return [];
	for (const headerValue of cookies.consume()) yield headerValue;
	return [];
}
//#endregion
//#region node_modules/astro/dist/core/fetch/features.js
var FetchFeatures = {
	redirects: 1,
	sessions: 2,
	actions: 4,
	middleware: 8,
	i18n: 16,
	cache: 32
};
var ALL_FETCH_FEATURES = FetchFeatures.redirects | FetchFeatures.sessions | FetchFeatures.actions | FetchFeatures.middleware | FetchFeatures.i18n | FetchFeatures.cache;
var usedFeatures = /* @__PURE__ */ new WeakMap();
function markFeatureUsed(manifest, feature) {
	const entry = usedFeatures.get(manifest);
	if (entry) entry.bits |= feature;
	else usedFeatures.set(manifest, { bits: feature });
}
function getUsedFeatures(manifest) {
	return usedFeatures.get(manifest)?.bits ?? 0;
}
var ACTION_QUERY_PARAMS = {
	actionName: "_action",
	actionPayload: "_astroActionPayload"
};
//#endregion
//#region node_modules/astro/dist/actions/runtime/client.js
var codeToStatusMap = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	PROXY_AUTHENTICATION_REQUIRED: 407,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	LENGTH_REQUIRED: 411,
	PRECONDITION_FAILED: 412,
	CONTENT_TOO_LARGE: 413,
	URI_TOO_LONG: 414,
	UNSUPPORTED_MEDIA_TYPE: 415,
	RANGE_NOT_SATISFIABLE: 416,
	EXPECTATION_FAILED: 417,
	MISDIRECTED_REQUEST: 421,
	UNPROCESSABLE_CONTENT: 422,
	LOCKED: 423,
	FAILED_DEPENDENCY: 424,
	TOO_EARLY: 425,
	UPGRADE_REQUIRED: 426,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
	VARIANT_ALSO_NEGOTIATES: 506,
	INSUFFICIENT_STORAGE: 507,
	LOOP_DETECTED: 508,
	NETWORK_AUTHENTICATION_REQUIRED: 511
};
var statusToCodeMap = Object.fromEntries(Object.entries(codeToStatusMap).map(([key, value]) => [value, key]));
var ActionError = class ActionError extends Error {
	type = "AstroActionError";
	code = "INTERNAL_SERVER_ERROR";
	status = 500;
	constructor(params) {
		super(params.message);
		this.code = params.code;
		this.status = ActionError.codeToStatus(params.code);
		if (params.stack) this.stack = params.stack;
	}
	static codeToStatus(code) {
		return codeToStatusMap[code];
	}
	static statusToCode(status) {
		return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
	}
	static fromJson(body) {
		if (isInputError(body)) return new ActionInputError(body.issues);
		if (isActionError(body)) return new ActionError(body);
		return new ActionError({ code: "INTERNAL_SERVER_ERROR" });
	}
};
function isActionError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
var ActionInputError = class extends ActionError {
	type = "AstroActionInputError";
	issues;
	fields;
	constructor(issues) {
		super({
			message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
			code: "BAD_REQUEST"
		});
		this.issues = issues;
		this.fields = {};
		for (const issue of issues) if (issue.path.length > 0) {
			const key = issue.path[0].toString();
			this.fields[key] ??= [];
			this.fields[key]?.push(issue.message);
		}
	}
};
function deserializeActionResult(res) {
	if (res.type === "error") {
		let json;
		try {
			json = JSON.parse(res.body);
		} catch {
			return {
				data: void 0,
				error: new ActionError({
					message: res.body,
					code: "INTERNAL_SERVER_ERROR"
				})
			};
		}
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SITE": void 0,
			"SSR": true
		}, {
			OS: "Windows_NT",
			Path: "C:\\Users\\prohl\\Documents\\blog\\my-site\\node_modules\\.bin;C:\\Users\\prohl\\Documents\\blog\\my-site\\node_modules\\.bin;C:\\Users\\prohl\\Documents\\blog\\node_modules\\.bin;C:\\Users\\prohl\\Documents\\node_modules\\.bin;C:\\Users\\prohl\\node_modules\\.bin;C:\\Users\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\;C:\\WINDOWS\\System32\\OpenSSH\\;C:\\Users\\prohl\\novus\\shims;C:\\Users\\prohl\\novus\\shims;C:\\Program Files\\NVIDIA Corporation\\NVIDIA NvDLISR;C:\\Program Files\\Cloudflare\\Cloudflare WARP\\;C:\\Program Files\\nodejs\\;C:\\Users\\prohl\\scoop\\persist\\bun\\bin;C:\\Users\\prohl\\scoop\\apps\\git\\current\\cmd;C:\\Users\\prohl\\scoop\\apps\\nodejs\\current\\bin;C:\\Users\\prohl\\scoop\\apps\\nodejs\\current;C:\\Users\\prohl\\scoop\\shims;C:\\Users\\prohl\\AppData\\Local\\pnpm\\bin;C:\\Users\\prohl\\.local\\bin;C:\\Users\\prohl\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\prohl\\AppData\\Local\\Python\\bin;C:\\Users\\prohl\\.lmstudio\\bin;C:\\flutter\\bin;C:\\Users\\prohl\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Atuinsh.Atuin_Microsoft.Winget.Source_8wekyb3d8bbwe;C:\\Users\\prohl\\AppData\\Local\\Programs\\Antigravity IDE\\bin;C:\\Users\\prohl\\AppData\\Roaming\\npm;C:\\ProgramData\\prohl\\GitHubDesktop\\bin"
		})?.PROD) return {
			error: ActionError.fromJson(json),
			data: void 0
		};
		else {
			const error = ActionError.fromJson(json);
			error.stack = actionResultErrorStack.get();
			return {
				error,
				data: void 0
			};
		}
	}
	if (res.type === "empty") return {
		data: void 0,
		error: void 0
	};
	return {
		data: parse(res.body, { URL: (href) => new URL(href) }),
		error: void 0
	};
}
var actionResultErrorStack = /* @__PURE__ */ (function actionResultErrorStackFn() {
	let errorStack;
	return {
		set(stack) {
			errorStack = stack;
		},
		get() {
			return errorStack;
		}
	};
})();
function getActionQueryString(name) {
	return `?${new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name }).toString()}`;
}
//#endregion
//#region node_modules/@astrojs/internal-helpers/dist/object.js
var FORBIDDEN_PATH_KEYS = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
//#endregion
//#region node_modules/astro/dist/actions/noop-actions.js
var NOOP_ACTIONS_MOD = { server: {} };
//#endregion
//#region node_modules/astro/dist/actions/load.js
var actionsMemo = createAsyncManifestMemo(async (manifest) => manifest.actions ? await manifest.actions() : NOOP_ACTIONS_MOD);
function getActions(manifest) {
	return actionsMemo.get(manifest);
}
async function getAction(manifest, path) {
	const pathKeys = path.split(".").map((key) => decodeURIComponent(key));
	let { server } = await getActions(manifest);
	if (!server || !(typeof server === "object")) throw new TypeError(`Expected \`server\` export in actions file to be an object. Received ${typeof server}.`);
	for (const key of pathKeys) {
		if (typeof server === "function") throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		if (FORBIDDEN_PATH_KEYS.has(key)) throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		if (!Object.hasOwn(server, key)) throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		server = server[key];
	}
	if (typeof server !== "function") throw new TypeError(`Expected handler for action ${pathKeys.join(".")} to be a function. Received ${typeof server}.`);
	return server;
}
//#endregion
//#region node_modules/astro/dist/actions/runtime/server.js
function getActionContext(context) {
	const callerInfo = getCallerInfo(context);
	const actionResultAlreadySet = Boolean(context.locals._actionPayload);
	let action = void 0;
	if (callerInfo && context.request.method === "POST" && !actionResultAlreadySet) action = {
		calledFrom: callerInfo.from,
		name: callerInfo.name,
		handler: async () => {
			const { manifest } = getFetchStateFromAPIContext(context);
			const callerInfoName = shouldAppendForwardSlash(manifest.trailingSlash, manifest.buildFormat) ? removeTrailingForwardSlash(callerInfo.name) : callerInfo.name;
			let baseAction;
			try {
				baseAction = await getAction(manifest, callerInfoName);
			} catch (error) {
				if (error instanceof Error && "name" in error && typeof error.name === "string" && error.name === ActionNotFoundError.name) return {
					data: void 0,
					error: new ActionError({ code: "NOT_FOUND" })
				};
				throw error;
			}
			const bodySizeLimit = manifest.actionBodySizeLimit;
			let input;
			try {
				input = await parseRequestBody(context.request, bodySizeLimit);
			} catch (e) {
				if (e instanceof ActionError) return {
					data: void 0,
					error: e
				};
				if (e instanceof TypeError) return {
					data: void 0,
					error: new ActionError({ code: "UNSUPPORTED_MEDIA_TYPE" })
				};
				throw e;
			}
			const omitKeys = [
				"props",
				"getActionResult",
				"callAction",
				"redirect"
			];
			const actionAPIContext = Object.create(Object.getPrototypeOf(context), Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(context)).filter(([key]) => !omitKeys.includes(key))));
			Reflect.set(actionAPIContext, ACTION_API_CONTEXT_SYMBOL, true);
			return baseAction.bind(actionAPIContext)(input);
		}
	};
	function setActionResult(actionName, actionResult) {
		context.locals._actionPayload = {
			actionResult,
			actionName
		};
	}
	return {
		action,
		setActionResult,
		serializeActionResult,
		deserializeActionResult
	};
}
function getCallerInfo(ctx) {
	if (ctx.routePattern === "/_actions/[...path]") return {
		from: "rpc",
		name: ctx.url.pathname.replace(/^.*\/_actions\//, "")
	};
	const queryParam = ctx.url.searchParams.get(ACTION_QUERY_PARAMS.actionName);
	if (queryParam) return {
		from: "form",
		name: queryParam
	};
}
async function parseRequestBody(request, bodySizeLimit) {
	const contentType = request.headers.get("content-type");
	const contentLengthHeader = request.headers.get("content-length");
	const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : void 0;
	const hasContentLength = typeof contentLength === "number" && Number.isFinite(contentLength);
	if (!contentType) return void 0;
	if (hasContentLength && contentLength > bodySizeLimit) throw new ActionError({
		code: "CONTENT_TOO_LARGE",
		message: `Request body exceeds ${bodySizeLimit} bytes`
	});
	try {
		if (hasContentType(contentType, formContentTypes)) {
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				return await new Request(request.url, {
					method: request.method,
					headers: request.headers,
					body: toArrayBuffer(body)
				}).formData();
			}
			return await request.clone().formData();
		}
		if (hasContentType(contentType, ["application/json"])) {
			if (contentLength === 0) return void 0;
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				if (body.byteLength === 0) return void 0;
				return JSON.parse(new TextDecoder().decode(body));
			}
			return await request.clone().json();
		}
	} catch (e) {
		if (e instanceof BodySizeLimitError) throw new ActionError({
			code: "CONTENT_TOO_LARGE",
			message: `Request body exceeds ${bodySizeLimit} bytes`
		});
		throw e;
	}
	throw new TypeError("Unsupported content type");
}
var ACTION_API_CONTEXT_SYMBOL = /* @__PURE__ */ Symbol.for("astro.actionAPIContext");
var formContentTypes = ["application/x-www-form-urlencoded", "multipart/form-data"];
function hasContentType(contentType, expected) {
	const type = contentType.split(";")[0].toLowerCase();
	return expected.some((t) => type === t);
}
function serializeActionResult(res) {
	if (res.error) {
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SITE": void 0,
			"SSR": true
		}, { OS: "Windows_NT" })?.DEV) actionResultErrorStack.set(res.error.stack);
		let body2;
		if (res.error instanceof ActionInputError) body2 = {
			type: res.error.type,
			issues: res.error.issues,
			fields: res.error.fields
		};
		else body2 = {
			...res.error,
			message: res.error.message
		};
		return {
			type: "error",
			status: res.error.status,
			contentType: "application/json",
			body: JSON.stringify(body2)
		};
	}
	if (res.data === void 0) return {
		type: "empty",
		status: 204
	};
	let body;
	try {
		body = stringify(res.data, { URL: (value) => value instanceof URL && value.href });
	} catch (e) {
		let hint = ActionsReturnedInvalidDataError.hint;
		if (res.data instanceof Response) hint = REDIRECT_STATUS_CODES.includes(res.data.status) ? "If you need to redirect when the action succeeds, trigger a redirect where the action is called. See the Actions guide for server and client redirect examples: https://docs.astro.build/en/guides/actions." : "If you need to return a Response object, try using a server endpoint instead. See https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes";
		throw new AstroError({
			...ActionsReturnedInvalidDataError,
			message: ActionsReturnedInvalidDataError.message(String(e)),
			hint
		});
	}
	return {
		type: "data",
		status: 200,
		contentType: "application/json+devalue",
		body
	};
}
function toArrayBuffer(buffer) {
	const copy = new Uint8Array(buffer.byteLength);
	copy.set(buffer);
	return copy.buffer;
}
//#endregion
//#region node_modules/astro/dist/actions/utils.js
function hasActionPayload(locals) {
	return "_actionPayload" in locals;
}
function createGetActionResult(locals) {
	return (actionFn) => {
		if (!hasActionPayload(locals) || actionFn.toString() !== getActionQueryString(locals._actionPayload.actionName)) return;
		return deserializeActionResult(locals._actionPayload.actionResult);
	};
}
function createCallAction(context) {
	return (baseAction, input) => {
		Reflect.set(context, ACTION_API_CONTEXT_SYMBOL, true);
		return baseAction.bind(context)(input);
	};
}
//#endregion
//#region node_modules/astro/dist/core/routing/pattern.js
function getPattern(segments, base, addTrailingSlash) {
	const pathname = segments.map((segment) => {
		if (segment.length === 1 && segment[0].spread) return "(?:\\/(.*?))?";
		else return "\\/" + segment.map((part) => {
			if (part.spread) return "(.*?)";
			else if (part.dynamic) return "([^/]+?)";
			else return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}).join("");
	}).join("");
	const trailing = addTrailingSlash && segments.length ? getTrailingSlashPattern(addTrailingSlash) : "$";
	let initial = "\\/";
	if (addTrailingSlash === "never" && base !== "/" && pathname !== "") initial = "";
	return new RegExp(`^${pathname || initial}${trailing}`);
}
function getTrailingSlashPattern(addTrailingSlash) {
	if (addTrailingSlash === "always") return "\\/$";
	if (addTrailingSlash === "never") return "$";
	return "\\/?$";
}
//#endregion
//#region node_modules/astro/dist/core/render/slots.js
function getFunctionExpression(slot) {
	if (!slot) return;
	const expressions = slot?.expressions?.filter((e) => isRenderInstruction(e) === false || isRenderTemplateResult(e));
	if (expressions?.length !== 1) return;
	const expression = expressions[0];
	if (isRenderTemplateResult(expression)) return getFunctionExpression(expression);
	return expression;
}
var Slots = class {
	#result;
	#slots;
	#logger;
	constructor(result, slots, logger) {
		this.#result = result;
		this.#slots = slots;
		this.#logger = logger;
		if (slots) for (const key of Object.keys(slots)) {
			if (this[key] !== void 0) throw new AstroError({
				...ReservedSlotName,
				message: ReservedSlotName.message(key)
			});
			Object.defineProperty(this, key, {
				get() {
					return true;
				},
				enumerable: true
			});
		}
	}
	has(name) {
		if (!this.#slots) return false;
		return Boolean(this.#slots[name]);
	}
	async render(name, args = []) {
		if (!this.#slots || !this.has(name)) return;
		const result = this.#result;
		if (!Array.isArray(args)) this.#logger.warn(null, `Expected second parameter to be an array, received a ${typeof args}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as an item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`);
		else if (args.length > 0) {
			const slotValue = this.#slots[name];
			const component = typeof slotValue === "function" ? await slotValue(result) : await slotValue;
			const expression = getFunctionExpression(component);
			if (expression) {
				const slot = async () => typeof expression === "function" ? expression(...args) : expression;
				return await renderSlotToString(result, slot).then((res) => {
					return res;
				});
			}
			if (typeof component === "function") return await renderJSX(result, component(...args)).then((res) => res != null ? String(res) : res);
		}
		const content = await renderSlotToString(result, this.#slots[name]);
		return chunkToString(result, content);
	}
};
//#endregion
//#region node_modules/astro/dist/i18n/fallback.js
function computeFallbackRoute(options) {
	const { pathname, responseStatus, fallback, fallbackType, locales, defaultLocale, strategy, base } = options;
	if (responseStatus !== 404) return { type: "none" };
	if (!fallback || Object.keys(fallback).length === 0) return { type: "none" };
	const urlLocale = pathname.split("/").find((segment) => {
		for (const locale of locales) if (typeof locale === "string") {
			if (locale === segment) return true;
		} else if (locale.path === segment) return true;
		return false;
	});
	if (!urlLocale) return { type: "none" };
	if (!Object.keys(fallback).includes(urlLocale)) return { type: "none" };
	const fallbackLocale = fallback[urlLocale];
	const pathFallbackLocale = getPathByLocale(fallbackLocale, locales);
	let newPathname;
	if (pathFallbackLocale === defaultLocale && strategy === "pathname-prefix-other-locales") {
		if (pathname.includes(`${base}`)) newPathname = pathname.replace(`/${urlLocale}`, ``);
		else newPathname = pathname.replace(`/${urlLocale}`, `/`);
	} else newPathname = pathname.replace(`/${urlLocale}`, `/${pathFallbackLocale}`);
	return {
		type: fallbackType,
		pathname: newPathname
	};
}
//#endregion
//#region node_modules/astro/dist/i18n/router.js
var I18nRouter = class {
	#strategy;
	#defaultLocale;
	#locales;
	#base;
	#domains;
	constructor(options) {
		this.#strategy = options.strategy;
		this.#defaultLocale = options.defaultLocale;
		this.#locales = options.locales;
		this.#base = options.base === "/" ? "/" : removeTrailingForwardSlash(options.base || "");
		this.#domains = options.domains;
	}
	/**
	* Evaluate routing strategy for a pathname.
	* Returns decision object (not HTTP Response).
	*/
	match(pathname, context) {
		if (this.shouldSkipProcessing(pathname, context)) return { type: "continue" };
		switch (this.#strategy) {
			case "manual": return { type: "continue" };
			case "pathname-prefix-always": return this.matchPrefixAlways(pathname, context);
			case "domains-prefix-always":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlways(pathname, context);
			case "pathname-prefix-other-locales": return this.matchPrefixOtherLocales(pathname, context);
			case "domains-prefix-other-locales":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixOtherLocales(pathname, context);
			case "pathname-prefix-always-no-redirect": return this.matchPrefixAlwaysNoRedirect(pathname, context);
			case "domains-prefix-always-no-redirect":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlwaysNoRedirect(pathname, context);
			default: return { type: "continue" };
		}
	}
	/**
	* Check if i18n processing should be skipped for this request
	*/
	shouldSkipProcessing(pathname, context) {
		if (pathname.includes("/404") || pathname.includes("/500")) return true;
		if (pathname.includes("/_server-islands/")) return true;
		if (context.isReroute) return true;
		if (context.routeType && context.routeType !== "page" && context.routeType !== "fallback") return true;
		return false;
	}
	/**
	* Strategy: pathname-prefix-always
	* All locales must have a prefix, including the default locale.
	*/
	matchPrefixAlways(pathname, _context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return {
			type: "redirect",
			location: `${this.#base === "/" ? "" : this.#base}/${this.#defaultLocale}`
		};
		if (!pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-other-locales
	* Default locale has no prefix, other locales must have a prefix.
	*/
	matchPrefixOtherLocales(pathname, _context) {
		let pathnameContainsDefaultLocale = false;
		for (const segment of pathname.split("/")) if (normalizeTheLocale(segment) === normalizeTheLocale(this.#defaultLocale)) {
			pathnameContainsDefaultLocale = true;
			break;
		}
		if (pathnameContainsDefaultLocale) return {
			type: "notFound",
			location: pathname.replace(`/${this.#defaultLocale}`, "")
		};
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-always-no-redirect
	* Like prefix-always but allows root to serve instead of redirecting
	*/
	matchPrefixAlwaysNoRedirect(pathname, _context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return { type: "continue" };
		if (!pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Check if the current locale doesn't belong to the configured domain.
	* Used for domain-based routing strategies.
	*/
	localeHasntDomain(currentLocale, currentDomain) {
		if (!this.#domains || !currentDomain) return false;
		if (!currentLocale) return false;
		const localesForDomain = this.#domains[currentDomain];
		if (!localesForDomain) return true;
		return !localesForDomain.includes(currentLocale);
	}
};
//#endregion
//#region node_modules/astro/dist/core/i18n/handler.js
function compileI18n(i18n, base, trailingSlash, format) {
	return {
		config: i18n,
		base,
		trailingSlash,
		format,
		router: new I18nRouter({
			strategy: i18n.strategy,
			defaultLocale: i18n.defaultLocale,
			locales: i18n.locales,
			base,
			domains: i18n.domainLookupTable ? Object.keys(i18n.domainLookupTable).reduce((acc, domain) => {
				const locale = i18n.domainLookupTable[domain];
				if (!acc[domain]) acc[domain] = [];
				acc[domain].push(locale);
				return acc;
			}, {}) : void 0
		})
	};
}
var i18nMemo = createManifestMemo((manifest) => {
	const config = manifest.i18n;
	return config && config.strategy !== "manual" ? compileI18n(config, manifest.base, manifest.trailingSlash, manifest.buildFormat) : null;
});
function getI18n(manifest) {
	return i18nMemo.get(manifest);
}
async function finalizeI18n(compiled, state, response) {
	markFeatureUsed(state.manifest, FetchFeatures.i18n);
	const i18n = compiled.config;
	if (state.skipErrorReroute && typeof i18n.fallback === "undefined") return response;
	if (state.responseRouteType !== "page" && state.responseRouteType !== "fallback") return response;
	const url = state.url;
	const currentLocale = state.computeCurrentLocale();
	const isPrerendered = state.routeData.prerender;
	const routerContext = {
		currentLocale,
		currentDomain: url.hostname,
		routeType: state.responseRouteType,
		isReroute: false
	};
	const routeDecision = compiled.router.match(url.pathname, routerContext);
	switch (routeDecision.type) {
		case "redirect": {
			let location = routeDecision.location;
			if (shouldAppendForwardSlash(compiled.trailingSlash, compiled.format)) location = appendForwardSlash(location);
			return new Response(null, {
				status: routeDecision.status ?? 302,
				headers: { Location: location }
			});
		}
		case "notFound": {
			if (isPrerendered) {
				const prerenderedRes = new Response(response.body, {
					status: 404,
					headers: response.headers
				});
				state.skipErrorReroute = true;
				if (routeDecision.location) prerenderedRes.headers.set("Location", routeDecision.location);
				return prerenderedRes;
			}
			const headers = new Headers();
			if (routeDecision.location) headers.set("Location", routeDecision.location);
			return new Response(null, {
				status: 404,
				headers
			});
		}
	}
	if (i18n.fallback && i18n.fallbackType) {
		const effectiveStatus = state.responseRouteType === "fallback" ? 404 : response.status;
		const fallbackDecision = computeFallbackRoute({
			pathname: url.pathname,
			responseStatus: effectiveStatus,
			currentLocale,
			fallback: i18n.fallback,
			fallbackType: i18n.fallbackType,
			locales: i18n.locales,
			defaultLocale: i18n.defaultLocale,
			strategy: i18n.strategy,
			base: compiled.base
		});
		switch (fallbackDecision.type) {
			case "redirect": return new Response(null, {
				status: 302,
				headers: { Location: fallbackDecision.pathname + url.search }
			});
			case "rewrite": return await state.rewrite(fallbackDecision.pathname + url.search);
		}
	}
	return response;
}
//#endregion
//#region node_modules/astro/dist/i18n/index.js
function getPathByLocale(locale, locales) {
	for (const loopLocale of locales) if (typeof loopLocale === "string") {
		if (loopLocale === locale) return loopLocale;
	} else for (const code of loopLocale.codes) if (code === locale) return loopLocale.path;
	throw new AstroError(i18nNoLocaleFoundInPath);
}
function getAllCodes(locales) {
	const result = [];
	for (const loopLocale of locales) if (typeof loopLocale === "string") result.push(loopLocale);
	else result.push(...loopLocale.codes);
	return result;
}
//#endregion
//#region node_modules/astro/dist/i18n/utils.js
function parseLocale(header) {
	if (header === "*") return [{
		locale: header,
		qualityValue: void 0
	}];
	const result = [];
	const localeValues = header.split(",").map((str) => str.trim());
	for (const localeValue of localeValues) {
		const split = localeValue.split(";").map((str) => str.trim());
		const localeName = split[0];
		const qualityValue = split[1];
		if (!split) continue;
		if (qualityValue && qualityValue.startsWith("q=")) {
			const qualityValueAsFloat = Number.parseFloat(qualityValue.slice(2));
			if (Number.isNaN(qualityValueAsFloat) || qualityValueAsFloat > 1) result.push({
				locale: localeName,
				qualityValue: void 0
			});
			else result.push({
				locale: localeName,
				qualityValue: qualityValueAsFloat
			});
		} else result.push({
			locale: localeName,
			qualityValue: void 0
		});
	}
	return result;
}
function sortAndFilterLocales(browserLocaleList, locales) {
	const normalizedLocales = getAllCodes(locales).map(normalizeTheLocale);
	return browserLocaleList.filter((browserLocale) => {
		if (browserLocale.locale !== "*") return normalizedLocales.includes(normalizeTheLocale(browserLocale.locale));
		return true;
	}).sort((a, b) => {
		if (a.qualityValue && b.qualityValue) return Math.sign(b.qualityValue - a.qualityValue);
		return 0;
	});
}
function computePreferredLocale(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = void 0;
	if (acceptHeader) {
		const firstResult = sortAndFilterLocales(parseLocale(acceptHeader), locales).at(0);
		if (firstResult && firstResult.locale !== "*") {
			outer: for (const currentLocale of locales) if (typeof currentLocale === "string") {
				if (normalizeTheLocale(currentLocale) === normalizeTheLocale(firstResult.locale)) {
					result = currentLocale;
					break;
				}
			} else for (const currentCode of currentLocale.codes) if (normalizeTheLocale(currentCode) === normalizeTheLocale(firstResult.locale)) {
				result = currentCode;
				break outer;
			}
		}
	}
	return result;
}
function computePreferredLocaleList(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = [];
	if (acceptHeader) {
		const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
		if (browserLocaleList.length === 1 && browserLocaleList.at(0).locale === "*") return getAllCodes(locales);
		else if (browserLocaleList.length > 0) {
			for (const browserLocale of browserLocaleList) for (const loopLocale of locales) if (typeof loopLocale === "string") {
				if (normalizeTheLocale(loopLocale) === normalizeTheLocale(browserLocale.locale)) result.push(loopLocale);
			} else for (const code of loopLocale.codes) if (code === browserLocale.locale) result.push(code);
		}
	}
	return result;
}
function computeCurrentLocale(pathname, locales, defaultLocale) {
	for (const segment of pathname.split("/").map(normalizeThePath)) for (const locale of locales) if (typeof locale === "string") {
		if (!segment.includes(locale)) continue;
		if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) return locale;
	} else if (locale.path === segment) return locale.codes.at(0);
	else for (const code of locale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(segment)) return code;
	for (const locale of locales) if (typeof locale === "string") {
		if (locale === defaultLocale) return locale;
	} else if (locale.path === defaultLocale) return locale.codes.at(0);
}
function computeCurrentLocaleFromParams(params, locales) {
	const byNormalizedCode = /* @__PURE__ */ new Map();
	const byPath = /* @__PURE__ */ new Map();
	for (const locale of locales) if (typeof locale === "string") byNormalizedCode.set(normalizeTheLocale(locale), locale);
	else {
		byPath.set(locale.path, locale.codes[0]);
		for (const code of locale.codes) byNormalizedCode.set(normalizeTheLocale(code), code);
	}
	for (const value of Object.values(params)) {
		if (!value) continue;
		const pathMatch = byPath.get(value);
		if (pathMatch) return pathMatch;
		const codeMatch = byNormalizedCode.get(normalizeTheLocale(value));
		if (codeMatch) return codeMatch;
	}
}
//#endregion
//#region node_modules/astro/dist/core/app/prepare-response.js
function prepareResponse(response, { addCookieHeader }) {
	if (addCookieHeader) for (const setCookieHeaderValue of getSetCookiesFromResponse(response)) response.headers.append("set-cookie", setCookieHeaderValue);
	Reflect.set(response, responseSentSymbol$1, true);
}
//#endregion
//#region node_modules/astro/dist/core/app/origin-check.js
var FORM_CONTENT_TYPES = [
	"application/x-www-form-urlencoded",
	"multipart/form-data",
	"text/plain"
];
var SAFE_METHODS = [
	"GET",
	"HEAD",
	"OPTIONS"
];
function isForbiddenCrossOriginRequest(request, url, isPrerendered) {
	if (isPrerendered) return false;
	if (SAFE_METHODS.includes(request.method)) return false;
	const isSameOrigin = request.headers.get("origin") === url.origin;
	if (request.headers.has("content-type")) return hasFormLikeHeader(request.headers.get("content-type")) && !isSameOrigin;
	return !isSameOrigin;
}
function createCrossOriginForbiddenResponse(request) {
	return new Response(`Cross-site ${request.method} form submissions are forbidden`, { status: 403 });
}
function createOriginCheckMiddleware() {
	return defineMiddleware((context, next) => {
		const { request, url, isPrerendered } = context;
		if (isForbiddenCrossOriginRequest(request, url, isPrerendered)) return createCrossOriginForbiddenResponse(request);
		return next();
	});
}
function hasFormLikeHeader(contentType) {
	if (contentType) {
		for (const FORM_CONTENT_TYPE of FORM_CONTENT_TYPES) if (contentType.toLowerCase().includes(FORM_CONTENT_TYPE)) return true;
	}
	return false;
}
//#endregion
//#region node_modules/astro/dist/core/pages/handler.js
var EMPTY_SLOTS = Object.freeze({});
async function handlePages(state, ctx) {
	const { logger, streaming } = state;
	state.resetResponseMetadata();
	let response;
	const componentInstance = await state.loadComponentInstance();
	switch (state.routeData.type) {
		case "endpoint":
			response = await renderEndpoint(componentInstance, ctx, state.routeData.prerender, logger, state);
			break;
		case "page": {
			const props = await state.getProps();
			const actionApiContext = state.getActionAPIContext();
			const result = await state.createResult(componentInstance, actionApiContext);
			try {
				response = await renderPage(result, componentInstance?.default, props, state.slots ?? EMPTY_SLOTS, streaming, state.routeData);
			} catch (e) {
				result.cancelled = true;
				throw e;
			}
			state.responseRouteType = "page";
			if (state.routeData.route === "/404" || state.routeData.route === "/500") state.skipErrorReroute = true;
			break;
		}
		case "redirect": return new Response(null, {
			status: 404,
			headers: { [ASTRO_ERROR_HEADER]: "true" }
		});
		case "fallback":
			state.responseRouteType = "fallback";
			return new Response(null, { status: 500 });
	}
	const responseCookies = getCookiesFromResponse(response);
	if (responseCookies) state.cookies.merge(responseCookies);
	state.response = response;
	return response;
}
//#endregion
//#region node_modules/astro/dist/core/routing/match.js
function matchRoute$1(pathname, manifest) {
	if (isRoute404(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute404(route.route));
		if (errorRoute) return errorRoute;
	}
	if (isRoute500(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute500(route.route));
		if (errorRoute) return errorRoute;
	}
	return manifest.routes.find((route) => {
		return route.pattern.test(pathname) || route.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
	});
}
function isRoute404or500(route) {
	return isRoute404(route.route) || isRoute500(route.route);
}
function isRouteServerIsland(route) {
	return route.component === SERVER_ISLAND_COMPONENT;
}
//#endregion
//#region node_modules/astro/dist/core/routing/astro-designed-error-pages.js
function ensure404Route(manifest) {
	if (!manifest.routes.some((route) => route.route === "/404")) manifest.routes.push(DEFAULT_404_ROUTE);
	return manifest;
}
//#endregion
//#region node_modules/astro/dist/core/routing/priority.js
function routeComparator(a, b) {
	const commonLength = Math.min(a.segments.length, b.segments.length);
	for (let index = 0; index < commonLength; index++) {
		const aSegment = a.segments[index];
		const bSegment = b.segments[index];
		const aIsStatic = aSegment.every((part) => !part.dynamic && !part.spread);
		const bIsStatic = bSegment.every((part) => !part.dynamic && !part.spread);
		if (aIsStatic && bIsStatic) {
			const aContent = aSegment.map((part) => part.content).join("");
			const bContent = bSegment.map((part) => part.content).join("");
			if (aContent !== bContent) return aContent.localeCompare(bContent);
		}
		if (aIsStatic !== bIsStatic) return aIsStatic ? -1 : 1;
		const aAllDynamic = aSegment.every((part) => part.dynamic);
		if (aAllDynamic !== bSegment.every((part) => part.dynamic)) return aAllDynamic ? 1 : -1;
		const aHasSpread = aSegment.some((part) => part.spread);
		if (aHasSpread !== bSegment.some((part) => part.spread)) return aHasSpread ? 1 : -1;
	}
	const aLength = a.segments.length;
	const bLength = b.segments.length;
	if (aLength !== bLength) {
		const aEndsInRest = a.segments.at(-1)?.some((part) => part.spread);
		const bEndsInRest = b.segments.at(-1)?.some((part) => part.spread);
		if (aEndsInRest !== bEndsInRest && Math.abs(aLength - bLength) === 1) {
			if (aLength > bLength && aEndsInRest) return 1;
			if (bLength > aLength && bEndsInRest) return -1;
		}
		return aLength > bLength ? -1 : 1;
	}
	if (a.type === "endpoint" !== (b.type === "endpoint")) return a.type === "endpoint" ? -1 : 1;
	return a.route.localeCompare(b.route);
}
//#endregion
//#region node_modules/astro/dist/core/routing/router.js
var Router = class {
	#routes;
	#base;
	#baseWithoutTrailingSlash;
	#buildFormat;
	#trailingSlash;
	constructor(routes, options) {
		this.#routes = [...routes].sort(routeComparator);
		this.#base = normalizeBase(options.base);
		this.#baseWithoutTrailingSlash = removeTrailingForwardSlash(this.#base);
		this.#buildFormat = options.buildFormat;
		this.#trailingSlash = options.trailingSlash;
	}
	/**
	* Match an input pathname against the route list.
	* If allowWithoutBase is true, a non-base-prefixed path is still considered.
	*/
	match(inputPathname, { allowWithoutBase = false } = {}) {
		const normalized = getRedirectForPathname(inputPathname);
		if (normalized.redirect) return {
			type: "redirect",
			location: normalized.redirect,
			status: 301
		};
		if (this.#base !== "/") {
			const baseWithSlash = `${this.#baseWithoutTrailingSlash}/`;
			if (this.#trailingSlash === "always" && (normalized.pathname === this.#baseWithoutTrailingSlash || normalized.pathname === this.#base)) return {
				type: "redirect",
				location: baseWithSlash,
				status: 301
			};
			if (this.#trailingSlash === "never" && normalized.pathname === baseWithSlash) return {
				type: "redirect",
				location: this.#baseWithoutTrailingSlash,
				status: 301
			};
		}
		const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
		if (!baseResult) {
			if (!allowWithoutBase) return {
				type: "none",
				reason: "outside-base"
			};
		}
		let pathname = baseResult ?? normalized.pathname;
		if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
		const route = this.#routes.find((candidate) => {
			if (candidate.pattern.test(pathname)) return true;
			return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
		});
		if (!route) return {
			type: "none",
			reason: "no-match"
		};
		return {
			type: "match",
			route,
			params: getParams(route, pathname),
			pathname
		};
	}
	/**
	* Returns all routes that match the given pathname, in priority order.
	* Used when the first match (e.g. a prerendered route) cannot serve
	* the request and subsequent matches need to be tried.
	*/
	matchAll(inputPathname, { allowWithoutBase = false } = {}) {
		const normalized = getRedirectForPathname(inputPathname);
		if (normalized.redirect) return [];
		const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
		if (!baseResult && !allowWithoutBase) return [];
		let pathname = baseResult ?? normalized.pathname;
		if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
		return this.#routes.filter((candidate) => {
			if (candidate.pattern.test(pathname)) return true;
			return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
		});
	}
};
function normalizeBase(base) {
	if (!base) return "/";
	if (base === "/") return base;
	return prependForwardSlash(base);
}
function getRedirectForPathname(pathname) {
	let value = prependForwardSlash(pathname);
	if (value.startsWith("//")) return {
		pathname: value,
		redirect: `/${value.replace(/^\/+/, "")}`
	};
	return { pathname: value };
}
function stripBase(pathname, base, baseWithoutTrailingSlash, trailingSlash) {
	if (base === "/") return pathname;
	const baseWithSlash = `${baseWithoutTrailingSlash}/`;
	if (pathname === baseWithoutTrailingSlash || pathname === base) return trailingSlash === "always" ? null : "/";
	if (pathname === baseWithSlash) return trailingSlash === "never" ? null : "/";
	if (pathname.startsWith(baseWithSlash)) return pathname.slice(baseWithoutTrailingSlash.length);
	return null;
}
function normalizeFileFormatPathname(pathname) {
	if (pathname.endsWith("/index.html")) {
		const trimmed = pathname.slice(0, -11);
		return trimmed === "" ? "/" : trimmed;
	}
	if (pathname.endsWith(".html")) {
		const trimmed = pathname.slice(0, -5);
		return trimmed === "" ? "/" : trimmed;
	}
	return pathname;
}
//#endregion
//#region node_modules/astro/dist/core/routing/route-table.js
function compileRouteTable(manifest, routes) {
	const routesList = ensure404Route({ routes });
	const router = new Router(routesList.routes, {
		base: manifest.base,
		trailingSlash: manifest.trailingSlash,
		buildFormat: manifest.buildFormat
	});
	return {
		routes: routesList.routes,
		router
	};
}
var routeTables = createManifestMemo((manifest) => compileRouteTable(manifest, (manifest.routes ?? []).map((route) => route.routeData)));
function getRouteTable(manifest) {
	return routeTables.get(manifest);
}
function updateRouteTable(manifest, routes) {
	routeTables.set(manifest, compileRouteTable(manifest, [...routes]));
}
function matchRoute(manifest, pathname) {
	const match = getRouteTable(manifest).router.match(pathname, { allowWithoutBase: true });
	if (match.type !== "match") return void 0;
	return match.route;
}
function matchAllRoutes(manifest, pathname) {
	return getRouteTable(manifest).router.matchAll(pathname, { allowWithoutBase: true });
}
//#endregion
//#region node_modules/astro/dist/core/session/driver.js
var sessionDriverMemo = createAsyncManifestMemo(async (manifest) => {
	if (manifest.sessionDriver) return (await manifest.sessionDriver())?.default || null;
	return null;
});
function getSessionDriver(manifest) {
	return sessionDriverMemo.get(manifest);
}
//#endregion
//#region node_modules/astro/dist/core/session/runtime.js
var PERSIST_SYMBOL = /* @__PURE__ */ Symbol();
var DEFAULT_COOKIE_NAME = "astro-session";
var VALID_COOKIE_REGEX = /^[\w-]+$/;
var unflatten$1 = (parsed, _) => {
	return unflatten(parsed, { URL: (href) => new URL(href) });
};
var stringify$1 = (data, _) => {
	return stringify(data, { URL: (val) => val instanceof URL && val.href });
};
var AstroSession = class AstroSession {
	#cookies;
	#config;
	#cookieConfig;
	#cookieName;
	#storage;
	#data;
	#sessionID;
	#toDestroy = /* @__PURE__ */ new Set();
	#toDelete = /* @__PURE__ */ new Set();
	#dirty = false;
	#cookieSet = false;
	#sessionIDFromCookie = false;
	#partial = true;
	#logger;
	#driverFactory;
	static #sharedStorage = /* @__PURE__ */ new Map();
	constructor({ cookies, config, runtimeMode, driverFactory, mockStorage, logger }) {
		this.#logger = logger;
		if (!config) throw new AstroError({
			...SessionStorageInitError,
			message: SessionStorageInitError.message("No driver was defined in the session configuration and the adapter did not provide a default driver.")
		});
		this.#cookies = cookies;
		this.#driverFactory = driverFactory;
		const { cookie: cookieConfig = DEFAULT_COOKIE_NAME, ...configRest } = config;
		let cookieConfigObject;
		if (typeof cookieConfig === "object") {
			const { name = DEFAULT_COOKIE_NAME, ...rest } = cookieConfig;
			this.#cookieName = name;
			cookieConfigObject = rest;
		} else this.#cookieName = cookieConfig || DEFAULT_COOKIE_NAME;
		this.#cookieConfig = {
			sameSite: "lax",
			secure: runtimeMode === "production",
			path: "/",
			...cookieConfigObject,
			httpOnly: true
		};
		this.#config = configRest;
		if (mockStorage) this.#storage = mockStorage;
	}
	/**
	* Gets a session value. Returns `undefined` if the session or value does not exist.
	*/
	async get(key) {
		return (await this.#ensureData()).get(key)?.data;
	}
	/**
	* Checks if a session value exists.
	*/
	async has(key) {
		return (await this.#ensureData()).has(key);
	}
	/**
	* Gets all session values.
	*/
	async keys() {
		return (await this.#ensureData()).keys();
	}
	/**
	* Gets all session values.
	*/
	async values() {
		return [...(await this.#ensureData()).values()].map((entry) => entry.data);
	}
	/**
	* Gets all session entries.
	*/
	async entries() {
		return [...(await this.#ensureData()).entries()].map(([key, entry]) => [key, entry.data]);
	}
	/**
	* Deletes a session value.
	*/
	delete(key) {
		this.#data ??= /* @__PURE__ */ new Map();
		this.#data.delete(key);
		if (this.#partial) this.#toDelete.add(key);
		this.#dirty = true;
	}
	/**
	* Sets a session value. The session is created if it does not exist.
	*/
	set(key, value, { ttl } = {}) {
		if (!key) throw new AstroError({
			...SessionStorageSaveError,
			message: "The session key was not provided."
		});
		let cloned;
		try {
			cloned = unflatten$1(JSON.parse(stringify$1(value)));
		} catch (err) {
			throw new AstroError({
				...SessionStorageSaveError,
				message: `The session data for ${key} could not be serialized.`,
				hint: "See the devalue library for all supported types: https://github.com/rich-harris/devalue"
			}, { cause: err });
		}
		if (!this.#cookieSet) {
			this.#setCookie();
			this.#cookieSet = true;
		}
		this.#data ??= /* @__PURE__ */ new Map();
		const lifetime = ttl ?? this.#config.ttl;
		const expires = typeof lifetime === "number" ? Date.now() + lifetime * 1e3 : lifetime;
		this.#data.set(key, {
			data: cloned,
			expires
		});
		this.#dirty = true;
	}
	/**
	* Destroys the session, clearing the cookie and storage if it exists.
	*/
	destroy() {
		const sessionId = this.#sessionID ?? this.#cookies.get(this.#cookieName)?.value;
		if (sessionId) this.#toDestroy.add(sessionId);
		this.#cookies.delete(this.#cookieName, this.#cookieConfig);
		this.#sessionID = void 0;
		this.#data = void 0;
		this.#dirty = true;
	}
	/**
	* Regenerates the session, creating a new session ID. The existing session data is preserved.
	*/
	async regenerate() {
		let data = /* @__PURE__ */ new Map();
		try {
			data = await this.#ensureData();
		} catch (err) {
			this.#logger.error("session", `Failed to load session data during regeneration: ${err}`);
			this.#partial = false;
		}
		const oldSessionId = this.#sessionID;
		this.#sessionID = crypto.randomUUID();
		this.#sessionIDFromCookie = false;
		this.#data = data;
		this.#dirty = true;
		await this.#setCookie();
		if (oldSessionId && this.#storage) this.#storage.removeItem(oldSessionId).catch((err) => {
			this.#logger.error("session", `Failed to remove old session ${oldSessionId}: ${err}`);
		});
	}
	async [PERSIST_SYMBOL]() {
		if (!this.#dirty && !this.#toDestroy.size) return;
		const storage = await this.#ensureStorage();
		if (this.#dirty && this.#data) {
			const data = await this.#ensureData();
			this.#toDelete.forEach((key2) => data.delete(key2));
			const key = this.#ensureSessionID();
			let serialized;
			try {
				serialized = stringify$1(data);
			} catch (err) {
				throw new AstroError({
					...SessionStorageSaveError,
					message: SessionStorageSaveError.message("The session data could not be serialized.", this.#config.driver)
				}, { cause: err });
			}
			await storage.setItem(key, serialized);
			this.#dirty = false;
		}
		if (this.#toDestroy.size > 0) {
			const cleanupPromises = [...this.#toDestroy].map((sessionId) => storage.removeItem(sessionId).catch((err) => {
				this.#logger.error("session", `Failed to remove session ${sessionId}: ${err}`);
			}));
			await Promise.all(cleanupPromises);
			this.#toDestroy.clear();
		}
	}
	get sessionID() {
		return this.#sessionID;
	}
	/**
	* Loads a session from storage with the given ID, and replaces the current session.
	* Any changes made to the current session will be lost.
	* This is not normally needed, as the session is automatically loaded using the cookie.
	* However it can be used to restore a session where the ID has been recorded somewhere
	* else (e.g. in a database).
	*/
	async load(sessionID) {
		this.#sessionID = sessionID;
		this.#data = void 0;
		await this.#setCookie();
		await this.#ensureData();
	}
	/**
	* Sets the session cookie.
	*/
	async #setCookie() {
		if (!VALID_COOKIE_REGEX.test(this.#cookieName)) throw new AstroError({
			...SessionStorageSaveError,
			message: "Invalid cookie name. Cookie names can only contain letters, numbers, and dashes."
		});
		const value = this.#ensureSessionID();
		this.#cookies.set(this.#cookieName, value, this.#cookieConfig);
	}
	/**
	* Attempts to load the session data from storage, or creates a new data object if none exists.
	* If there is existing partial data, it will be merged into the new data object.
	*/
	async #ensureData() {
		if (this.#data && !this.#partial) return this.#data;
		this.#data ??= /* @__PURE__ */ new Map();
		if (!this.#sessionID && !this.#cookies.get(this.#cookieName)?.value) {
			this.#partial = false;
			return this.#data;
		}
		const raw = await (await this.#ensureStorage()).get(this.#ensureSessionID());
		if (!raw) {
			if (this.#sessionIDFromCookie) {
				this.#sessionID = crypto.randomUUID();
				this.#sessionIDFromCookie = false;
				if (this.#cookieSet) await this.#setCookie();
			}
			return this.#data;
		}
		try {
			const storedMap = unflatten$1(raw);
			if (!(storedMap instanceof Map)) {
				this.destroy();
				throw new AstroError({
					...SessionStorageInitError,
					message: SessionStorageInitError.message("The session data was an invalid type.", this.#config.driver)
				});
			}
			const now = Date.now();
			for (const [key, value] of storedMap) {
				const expired = typeof value.expires === "number" && value.expires < now;
				if (!this.#data.has(key) && !this.#toDelete.has(key) && !expired) this.#data.set(key, value);
			}
			this.#partial = false;
			return this.#data;
		} catch (err) {
			this.destroy();
			if (err instanceof AstroError) throw err;
			throw new AstroError({
				...SessionStorageInitError,
				message: SessionStorageInitError.message("The session data could not be parsed.", this.#config.driver)
			}, { cause: err });
		}
	}
	/**
	* Returns the session ID, generating a new one if it does not exist.
	*/
	#ensureSessionID() {
		if (!this.#sessionID) {
			const cookieValue = this.#cookies.get(this.#cookieName)?.value;
			if (cookieValue) {
				this.#sessionID = cookieValue;
				this.#sessionIDFromCookie = true;
			} else this.#sessionID = crypto.randomUUID();
		}
		return this.#sessionID;
	}
	/**
	* Ensures the storage is initialized.
	* This is called automatically when a storage operation is needed.
	*/
	async #ensureStorage() {
		if (this.#storage) return this.#storage;
		if (AstroSession.#sharedStorage.has(this.#config.driver)) {
			this.#storage = AstroSession.#sharedStorage.get(this.#config.driver);
			return this.#storage;
		}
		if (!this.#driverFactory) throw new AstroError({
			...SessionStorageInitError,
			message: SessionStorageInitError.message("Astro could not load the driver correctly. Does it exist?", this.#config.driver)
		});
		const driver = this.#driverFactory;
		try {
			this.#storage = createStorage({ driver: {
				...driver(this.#config.options),
				hasItem() {
					return false;
				},
				getKeys() {
					return [];
				}
			} });
			AstroSession.#sharedStorage.set(this.#config.driver, this.#storage);
			return this.#storage;
		} catch (err) {
			throw new AstroError({
				...SessionStorageInitError,
				message: SessionStorageInitError.message("Unknown error", this.#config.driver)
			}, { cause: err });
		}
	}
};
//#endregion
//#region node_modules/astro/dist/core/session/handler.js
var SESSION_KEY = "session";
function provideSession(state) {
	markFeatureUsed(state.manifest, FetchFeatures.sessions);
	const config = state.manifest.sessionConfig;
	if (!config) return;
	return provideSessionAsync(state, config);
}
async function provideSessionAsync(state, config) {
	const driverFactory = await getSessionDriver(state.manifest);
	if (!driverFactory) return;
	state.provide(SESSION_KEY, {
		create() {
			const cookies = state.cookies;
			return new AstroSession({
				cookies,
				config,
				runtimeMode: getEnvironment(state.manifest).runtimeMode,
				driverFactory,
				mockStorage: null,
				logger: state.logger
			});
		},
		finalize(session) {
			return session[PERSIST_SYMBOL]();
		}
	});
}
//#endregion
//#region node_modules/astro/dist/core/app/validate-headers.js
function getFirstForwardedValue(multiValueHeader) {
	return multiValueHeader?.toString().split(",").map((e) => e.trim())[0];
}
function sanitizeHost(hostname) {
	if (!hostname) return void 0;
	if (/[/\\]/.test(hostname)) return void 0;
	return hostname;
}
function parseHost(host) {
	const parts = host.split(":");
	if (parts.length > 2) return void 0;
	return {
		hostname: parts[0],
		port: parts[1]
	};
}
function matchesAllowedDomains(hostname, protocol, port, allowedDomains) {
	const urlString = `${protocol}://${port ? `${hostname}:${port}` : hostname}`;
	if (!URL.canParse(urlString)) return false;
	const testUrl = new URL(urlString);
	return allowedDomains.some((pattern) => matchPattern(testUrl, pattern));
}
function validateHost(host, protocol, allowedDomains) {
	if (!host || host.length === 0) return void 0;
	if (!allowedDomains || allowedDomains.length === 0) return void 0;
	const sanitized = sanitizeHost(host);
	if (!sanitized) return void 0;
	const parsed = parseHost(sanitized);
	if (!parsed) return void 0;
	const { hostname, port } = parsed;
	if (matchesAllowedDomains(hostname, protocol, port, allowedDomains)) return sanitized;
}
function validateForwardedHeaders(forwardedProtocol, forwardedHost, forwardedPort, allowedDomains) {
	const result = {};
	if (forwardedProtocol) {
		if (allowedDomains && allowedDomains.length > 0) {
			if (allowedDomains.some((pattern) => pattern.protocol !== void 0)) try {
				const testUrl = new URL(`${forwardedProtocol}://example.com`);
				if (allowedDomains.some((pattern) => matchPattern(testUrl, { protocol: pattern.protocol }))) result.protocol = forwardedProtocol;
			} catch {}
			else if (/^https?$/.test(forwardedProtocol)) result.protocol = forwardedProtocol;
		}
	}
	if (forwardedPort && allowedDomains && allowedDomains.length > 0) {
		if (allowedDomains.some((pattern) => pattern.port !== void 0)) {
			if (allowedDomains.some((pattern) => pattern.port === forwardedPort)) result.port = forwardedPort;
		}
	}
	if (forwardedHost && forwardedHost.length > 0 && allowedDomains && allowedDomains.length > 0) {
		const protoForValidation = result.protocol || "https";
		const sanitized = sanitizeHost(forwardedHost);
		const parsed = sanitized ? parseHost(sanitized) : void 0;
		if (sanitized && parsed) {
			const { hostname, port: portFromHost } = parsed;
			if (matchesAllowedDomains(hostname, protoForValidation, result.port || portFromHost, allowedDomains)) result.host = sanitized;
		}
	}
	return result;
}
//#endregion
//#region node_modules/astro/dist/core/output-filename.js
var STATUS_CODE_PAGES = /* @__PURE__ */ new Set(["/404", "/500"]);
function getOutputFilename(buildFormat, name, routeData) {
	if (routeData.type === "endpoint") return name;
	if (name === "/" || name === "") return name === "" ? "index.html" : "/index.html";
	if (buildFormat === "file" || STATUS_CODE_PAGES.has(name)) return `${removeTrailingForwardSlash(name || "index")}.html`;
	if (buildFormat === "preserve" && !routeData.isIndex) return `${removeTrailingForwardSlash(name || "index")}.html`;
	return `${removeTrailingForwardSlash(name)}/index.html`;
}
//#endregion
//#region node_modules/astro/dist/core/errors/default-handler.js
async function renderDefaultError(manifest, request, { status, response: originalResponse, skipMiddleware = false, error, pathname, ...resolvedRenderOptions }) {
	const resolvedPathname = pathname ?? new FetchState(manifest, request).pathname;
	const routeTable = getRouteTable(manifest);
	const errorRouteData = matchRoute$1(getErrorRoutePath(resolvedPathname, status, routeTable.routes, manifest.i18n?.locales, manifest.trailingSlash === "always"), routeTable);
	const url = new URL(request.url);
	if (errorRouteData) {
		if (errorRouteData.prerender) {
			const allowedDomains = manifest.allowedDomains;
			const safeOrigin = validateHost(url.host, url.protocol.replace(":", ""), allowedDomains) ? url.origin : `${url.protocol}//localhost`;
			const statusURL = new URL(`${removeTrailingForwardSlash(manifest.base)}${getOutputFilename(manifest.buildFormat, errorRouteData.route, errorRouteData)}`, safeOrigin);
			if (statusURL.toString() !== request.url && resolvedRenderOptions.prerenderedErrorPageFetch) try {
				const newResponse = mergeResponses(await resolvedRenderOptions.prerenderedErrorPageFetch(statusURL.toString()), originalResponse, {
					status,
					removeContentEncodingHeaders: true
				});
				prepareResponse(newResponse, resolvedRenderOptions);
				return newResponse;
			} catch {
				const response2 = mergeResponses(new Response(null, { status }), originalResponse);
				prepareResponse(response2, resolvedRenderOptions);
				return response2;
			}
		}
		const mod = await getEnvironment(manifest).getComponentByRoute(manifest, errorRouteData);
		const errorState = new FetchState(manifest, request);
		errorState.skipMiddleware = skipMiddleware;
		errorState.clientAddress = resolvedRenderOptions.clientAddress;
		errorState.routeData = errorRouteData;
		errorState.pathname = resolvedPathname;
		errorState.status = status;
		errorState.componentInstance = mod;
		errorState.locals = resolvedRenderOptions.locals ?? {};
		errorState.initialProps = { error };
		try {
			await provideSession(errorState);
			const response2 = await handleMiddleware(errorState, handlePages);
			if (rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, errorState.routeData, response2)) return renderDefaultError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				response: originalResponse,
				skipMiddleware: true,
				pathname: resolvedPathname
			});
			const newResponse = mergeResponses(response2, originalResponse);
			prepareResponse(newResponse, resolvedRenderOptions);
			return newResponse;
		} catch {
			if (skipMiddleware === false) return renderDefaultError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				response: originalResponse,
				skipMiddleware: true,
				pathname: resolvedPathname
			});
		} finally {
			await errorState.finalizeAll();
		}
	}
	const response = mergeResponses(new Response(null, { status }), originalResponse);
	prepareResponse(response, resolvedRenderOptions);
	return response;
}
function mergeResponses(newResponse, originalResponse, override) {
	let newResponseHeaders = newResponse.headers;
	if (override?.removeContentEncodingHeaders) {
		newResponseHeaders = new Headers(newResponseHeaders);
		newResponseHeaders.delete("Content-Encoding");
		newResponseHeaders.delete("Content-Length");
	}
	if (!originalResponse) {
		if (override !== void 0) return new Response(newResponse.body, {
			status: override.status,
			statusText: newResponse.statusText,
			headers: newResponseHeaders
		});
		return newResponse;
	}
	const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
	try {
		originalResponse.headers.delete("Content-type");
		originalResponse.headers.delete("Content-Length");
		originalResponse.headers.delete("Transfer-Encoding");
	} catch {}
	const newHeaders = new Headers();
	const seen = /* @__PURE__ */ new Set();
	for (const [name, value] of originalResponse.headers) {
		newHeaders.append(name, value);
		seen.add(name.toLowerCase());
	}
	for (const [name, value] of newResponseHeaders) {
		const lower = name.toLowerCase();
		if (!seen.has(lower) || lower === "set-cookie") newHeaders.append(name, value);
	}
	const mergedResponse = new Response(newResponse.body, {
		status,
		statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
		headers: newHeaders
	});
	const originalCookies = getCookiesFromResponse(originalResponse);
	const newCookies = getCookiesFromResponse(newResponse);
	if (originalCookies) {
		if (newCookies) originalCookies.merge(newCookies);
		attachCookiesToResponse(mergedResponse, originalCookies);
	} else if (newCookies) attachCookiesToResponse(mergedResponse, newCookies);
	return mergedResponse;
}
//#endregion
//#region node_modules/astro/dist/core/errors/build-handler.js
async function renderBuildError(manifest, request, options) {
	if (options.status === 500) {
		if (options.response) return options.response;
		throw options.error;
	}
	return renderDefaultError(manifest, request, {
		...options,
		prerenderedErrorPageFetch: void 0
	});
}
//#endregion
//#region node_modules/astro/dist/core/errors/dev-handler.js
async function renderDevError(manifest, request, { skipMiddleware = false, error, status, response: _response, pathname, ...resolvedRenderOptions }, { shouldInjectCspMetaTags }) {
	if (isAstroError(error) && [MiddlewareNoDataOrNextCalled.name, MiddlewareNotAResponse.name].includes(error.name)) throw error;
	const resolvedPathname = pathname ?? new FetchState(manifest, request).pathname;
	const renderRoute = async (routeData) => {
		try {
			const preloadedComponent = await getEnvironment(manifest).getComponentByRoute(manifest, routeData);
			const errorState = new FetchState(manifest, request);
			errorState.skipMiddleware = skipMiddleware;
			errorState.clientAddress = resolvedRenderOptions.clientAddress;
			errorState.shouldInjectCspMetaTags = shouldInjectCspMetaTags ? !!manifest.csp : false;
			errorState.routeData = routeData;
			errorState.pathname = resolvedPathname;
			errorState.status = status;
			errorState.componentInstance = preloadedComponent;
			errorState.locals = resolvedRenderOptions.locals ?? {};
			errorState.initialProps = { error };
			const response = await handleMiddleware(errorState, handlePages);
			if (rewroteToEmptyErrorResponse(skipMiddleware, routeData, errorState.routeData, response)) return renderDevError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				skipMiddleware: true,
				pathname: resolvedPathname
			}, { shouldInjectCspMetaTags });
			if (error) getLogger(manifest).error("router", error.stack || error.message);
			return response;
		} catch (_err) {
			if (skipMiddleware === false) return renderDevError(manifest, request, {
				...resolvedRenderOptions,
				status: 500,
				skipMiddleware: true,
				error: _err,
				pathname: resolvedPathname
			}, { shouldInjectCspMetaTags });
			throw _err;
		}
	};
	if (status === 404) {
		const custom404 = getCustom404Route(getRouteTable(manifest));
		if (custom404) return renderRoute(custom404);
	}
	const custom500 = getCustom500Route(getRouteTable(manifest));
	if (!custom500) throw error;
	else return renderRoute(custom500);
}
//#endregion
//#region node_modules/astro/dist/core/errors/handler.js
function renderErrorPage(manifest, request, options) {
	const env = getEnvironment(manifest);
	switch (env.errorStrategy) {
		case "dev": return renderDevError(manifest, request, options, { shouldInjectCspMetaTags: env.injectCspMetaTagsOnErrorPages });
		case "build": return renderBuildError(manifest, request, options);
		case "default": return renderDefaultError(manifest, request, options);
	}
}
function renderErrorFromState(state, request, options) {
	if (state.renderError) return state.renderError(request, options);
	return renderErrorPage(state.manifest, request, options);
}
function rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, renderedRouteData, response) {
	return skipMiddleware === false && renderedRouteData !== errorRouteData && response.body === null && REROUTABLE_STATUS_CODES.includes(response.status);
}
//#endregion
//#region node_modules/astro/dist/core/middleware/callMiddleware.js
async function callMiddleware(onRequest, apiContext, responseFunction) {
	let nextCalled = false;
	let responseFunctionPromise = void 0;
	const next = async (payload) => {
		nextCalled = true;
		responseFunctionPromise = responseFunction(apiContext, payload);
		return responseFunctionPromise;
	};
	const middlewarePromise = onRequest(apiContext, next);
	return await Promise.resolve(middlewarePromise).then(async (value) => {
		if (nextCalled) {
			if (typeof value !== "undefined") {
				if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
				return value;
			} else if (responseFunctionPromise) return responseFunctionPromise;
			else throw new AstroError(MiddlewareNotAResponse);
		} else if (typeof value === "undefined") throw new AstroError(MiddlewareNoDataOrNextCalled);
		else if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
		else return value;
	});
}
//#endregion
//#region node_modules/astro/dist/core/middleware/load.js
var resolvedMiddleware = /* @__PURE__ */ new WeakMap();
var middlewareMemo = createAsyncManifestMemo(async (manifest) => {
	let handler;
	if (manifest.middleware) {
		const internalMiddlewares = [(await manifest.middleware()).onRequest ?? NOOP_MIDDLEWARE_FN];
		if (manifest.checkOrigin) internalMiddlewares.unshift(createOriginCheckMiddleware());
		handler = sequence(...internalMiddlewares);
	} else handler = NOOP_MIDDLEWARE_FN;
	resolvedMiddleware.set(manifest, handler);
	return handler;
});
function getMiddleware(manifest) {
	return middlewareMemo.get(manifest);
}
//#endregion
//#region node_modules/astro/dist/core/cache/runtime/noop.js
var EMPTY_OPTIONS = Object.freeze({ tags: [] });
var NoopAstroCache = class {
	enabled = false;
	set() {}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {}
};
var hasWarned = false;
var DisabledAstroCache = class {
	enabled = false;
	#logger;
	constructor(logger) {
		this.#logger = logger;
	}
	#warn() {
		if (!hasWarned) {
			hasWarned = true;
			this.#logger?.warn("cache", "`cache.set()` was called but caching is not enabled. Configure a cache provider in your Astro config under `cache` to enable caching.");
		}
	}
	set() {
		this.#warn();
	}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {
		throw new AstroError(CacheNotEnabled);
	}
};
//#endregion
//#region node_modules/astro/dist/core/middleware/astro-middleware.js
async function handleMiddleware(state, renderRouteCallback) {
	markFeatureUsed(state.manifest, FetchFeatures.middleware);
	await state.getProps();
	const apiContext = state.getAPIContext();
	state.counter++;
	if (state.counter === 4) return new Response("Loop Detected", {
		status: 508,
		statusText: "Astro detected a loop where you tried to call the rewriting logic more than four times."
	});
	const next = async (ctx, payload) => {
		if (payload) {
			state.logger.debug("router", "Called rewriting to:", payload);
			applyRewriteToState(state, payload, await getEnvironment(state.manifest).tryRewrite(state.manifest, payload, state.request));
		}
		return renderRouteCallback(state, ctx);
	};
	let response;
	if (state.skipMiddleware) response = await next(apiContext);
	else {
		const middleware = await getMiddleware(state.manifest);
		response = await callMiddleware(sequence(middleware), apiContext, next);
	}
	attachCookiesToResponse(response, state.cookies);
	state.response = response;
	return response;
}
//#endregion
//#region node_modules/astro/dist/core/util/normalized-url.js
function createNormalizedUrl(requestUrl) {
	return normalizeUrl(new URL(requestUrl));
}
function normalizeUrl(url) {
	try {
		url.pathname = validateAndDecodePathname(url.pathname);
	} catch {
		try {
			url.pathname = decodeURI(url.pathname);
		} catch {}
	}
	url.pathname = collapseDuplicateSlashes(url.pathname);
	return url;
}
//#endregion
//#region node_modules/astro/dist/core/rewrites/handler.js
function applyRewriteToState(state, payload, { routeData, componentInstance, newUrl, pathname }, { mergeCookies = false } = {}) {
	const oldPathname = state.pathname;
	const isI18nFallback = routeData.fallbackRoutes && routeData.fallbackRoutes.length > 0;
	if (state.manifest.serverLike && !state.routeData.prerender && routeData.prerender && !isI18nFallback) throw new AstroError({
		...ForbiddenRewrite,
		message: ForbiddenRewrite.message(state.pathname, pathname, routeData.component),
		hint: ForbiddenRewrite.hint(routeData.component)
	});
	state.routeData = routeData;
	state.componentInstance = componentInstance;
	if (payload instanceof Request) state.request = payload;
	else state.request = copyRequest(newUrl, state.request, routeData.prerender, state.logger, state.routeData.route);
	state.url = createNormalizedUrl(state.request.url);
	if (mergeCookies) {
		const newCookies = new AstroCookies(state.request);
		if (state.cookies) newCookies.merge(state.cookies);
		state.cookies = newCookies;
	}
	state.params = getParams(routeData, pathname);
	state.pathname = pathname;
	state.isRewriting = true;
	state.status = 200;
	setOriginPathname(state.request, oldPathname, state.manifest.trailingSlash, state.manifest.buildFormat);
	state.invalidateContexts();
}
async function executeRewrite(state, payload) {
	state.logger.debug("router", "Calling rewrite: ", payload);
	applyRewriteToState(state, payload, await getEnvironment(state.manifest).tryRewrite(state.manifest, payload, state.request), { mergeCookies: true });
	return handleMiddleware(state, handlePages);
}
//#endregion
//#region node_modules/astro/dist/core/app/render-options.js
var renderOptionsSymbol = /* @__PURE__ */ Symbol.for("astro.renderOptions");
function getRenderOptions(request) {
	return Reflect.get(request, renderOptionsSymbol);
}
function setRenderOptions(request, options) {
	Reflect.set(request, renderOptionsSymbol, options);
}
//#endregion
//#region node_modules/astro/dist/core/manifest/derived.js
var sites = createManifestMemo((manifest) => manifest.site ? new URL(manifest.site) : void 0);
function getSite(manifest) {
	return sites.get(manifest);
}
//#endregion
//#region node_modules/astro/dist/core/server-islands/mappings.js
async function getServerIslands(manifest) {
	if (manifest.serverIslandMappings) return manifest.serverIslandMappings();
	return {
		serverIslandMap: /* @__PURE__ */ new Map(),
		serverIslandNameMap: /* @__PURE__ */ new Map()
	};
}
//#endregion
//#region node_modules/astro/dist/core/fetch/fetch-state.js
function getFetchStateFromAPIContext(context) {
	const state = context[fetchStateSymbol];
	if (!state) throw new Error("FetchState not found on APIContext. This is an internal error — the context was not created through Astro's request pipeline.");
	return state;
}
var FetchState = class {
	/** The manifest — the single ambient source of static, build-time data. */
	manifest;
	/** The manifest's identity-stable logger, captured once at construction. */
	logger;
	/**
	* Whether page renders stream. From the facade hooks on the fast path,
	* else the environment's default.
	*/
	streaming;
	/**
	* Internal facade hook: late-bound `app.renderError` dispatch. Undefined on
	* bare and custom-handler paths — those fall through to the environment's
	* error strategy (`renderErrorPage`).
	*/
	renderError;
	/**
	* Internal facade hook: late-bound `app.logThisRequest` dispatch. Undefined
	* on bare and custom-handler paths — those fall through to the
	* environment's `logRequest` behavior.
	*/
	logRequest;
	/**
	* The request to render. Mutated during rewrites so subsequent renders
	* see the rewritten URL.
	*/
	request;
	routeData;
	/**
	* The pathname to use for routing and rendering. Starts out as the raw,
	* base-stripped, decoded pathname from the request. May be further
	* normalized by `handleRequest` after routeData is known (in dev, when
	* the matched route has no `.html` extension, `.html` / `/index.html`
	* suffixes are stripped).
	*/
	pathname;
	/** Resolved render options (addCookieHeader, clientAddress, locals, etc.). */
	renderOptions;
	/** When the request started, used to log duration. */
	timeStart;
	/**
	* The route's loaded component module. Set before middleware runs; may
	* be swapped during in-flight rewrites from inside the middleware chain.
	*/
	componentInstance;
	/**
	* Slot overrides supplied by the container API. `undefined` for HTTP
	* requests — `PagesHandler` coalesces to `{}` on read so we don't
	* allocate an empty object per request.
	*/
	slots;
	/**
	* The `Response` produced by handlers, if any. Set after page
	* rendering or middleware completes.
	*/
	response;
	/**
	* Default HTTP status for the rendered response. Callers override
	* before rendering runs (e.g. `handleRequest` sets this from
	* `BaseApp.getDefaultStatusCode`; error handlers set `404` / `500`).
	*/
	status = 200;
	/** Whether user middleware should be skipped for this request. */
	skipMiddleware = false;
	/**
	* Set to `true` when the request path was encoded too many times to fully
	* decode (see {@link validateAndDecodePathname}). These requests are
	* rejected with a `400` before middleware or routing run.
	*/
	invalidEncoding = false;
	/** A flag that tells the render content if the rewriting was triggered. */
	isRewriting = false;
	/** A safety net in case of loops (rewrite counter). */
	counter = 0;
	/** Cookies for this request. Created lazily on first access. */
	cookies;
	/** Route params derived from routeData + pathname. Computed lazily. */
	#params;
	get params() {
		if (!this.#params && this.routeData) this.#params = getParams(this.routeData, this.pathname);
		return this.#params;
	}
	set params(value) {
		this.#params = value;
	}
	/** Normalized URL for this request. */
	url;
	/** Client address for this request. */
	clientAddress;
	/** Whether this is a partial render (container API). */
	partial;
	/** Internal metadata about the current response route type. */
	responseRouteType;
	/** Internal flag to prevent rerouting this response to an error page. */
	skipErrorReroute = false;
	/** Whether to inject CSP meta tags. */
	shouldInjectCspMetaTags;
	/** Request-scoped locals object, shared with user middleware. */
	locals = {};
	/**
	* Memoized `props` (see `getProps`). `null` means "not yet computed"
	* — using `null` (rather than `undefined`) keeps the hidden class
	* stable and distinct from a valid-but-empty result.
	*/
	props = null;
	/** Memoized `ActionAPIContext` (see `getActionAPIContext`). */
	actionApiContext = null;
	/** Memoized `APIContext` (see `getAPIContext`). */
	apiContext = null;
	/** Registered context providers keyed by name. Lazy-initialized on first provide(). */
	#providers;
	/** Cached values from resolved providers. Lazy-initialized on first resolve(). */
	#providersResolvedValues;
	/** Cached promise for lazy component instance loading. */
	#componentInstancePromise;
	/** SSR result for the current page render. */
	result;
	/** Initial props (from container/error handler). */
	initialProps = {};
	/** Memoized Astro page partial. */
	#astroPagePartial;
	/**
	* Locale-prefixed pathname derived from the Host header for domain-based
	* i18n routing (e.g. `/en/boats/1/foo`), or `undefined` when the request
	* isn't served from a locale-mapped domain. When set, `this.pathname` is
	* derived from it so locale/param resolution match the route pattern.
	*/
	#domainPathname;
	/** Memoized current locale. */
	#currentLocale;
	/** Memoized preferred locale. */
	#preferredLocale;
	/** Memoized preferred locale list. */
	#preferredLocaleList;
	constructor(manifest, request, options, hooks) {
		this.manifest = manifest;
		this.logger = getLogger(manifest);
		this.streaming = hooks?.streaming ?? getEnvironment(manifest).defaultStreaming(manifest);
		this.renderError = hooks?.renderError;
		this.logRequest = hooks?.logRequest;
		this.request = request;
		options ??= getRenderOptions(request);
		this.routeData = options?.routeData;
		const self = this;
		this.renderOptions = {
			...options ?? {
				addCookieHeader: false,
				clientAddress: void 0,
				prerenderedErrorPageFetch: fetch,
				routeData: void 0,
				waitUntil: void 0
			},
			get locals() {
				return self.locals;
			}
		};
		this.componentInstance = void 0;
		this.slots = void 0;
		const url = new URL(request.url);
		const publicPathname = this.#normalizePathname(url.pathname);
		const pathname = this.#computePathname(publicPathname);
		url.pathname = publicPathname;
		url.pathname = collapseDuplicateSlashes(url.pathname);
		const domainPathname = computePathnameFromDomain(request, url, manifest.i18n, manifest.base, manifest.trailingSlash, this.logger, pathname);
		if (domainPathname) {
			this.#domainPathname = domainPathname;
			this.pathname = domainPathname;
		} else this.pathname = pathname;
		this.timeStart = performance.now();
		this.clientAddress = options?.clientAddress;
		this.locals = options?.locals ?? {};
		this.url = url;
		this.cookies = new AstroCookies(request);
		if (manifest.allowedDomains && manifest.allowedDomains.length > 0 && !this.routeData?.prerender) this.#applyForwardedHeaders();
		if (!Reflect.get(this.request, originPathnameSymbol)) setOriginPathname(this.request, this.pathname, manifest.trailingSlash, manifest.buildFormat);
		this.#resolveRouteData();
	}
	/**
	* Triggers a rewrite. Delegates to the rewrites handler module.
	*/
	rewrite(payload) {
		return executeRewrite(this, payload);
	}
	/**
	* Creates the SSR result for the current page render.
	*/
	async createResult(mod, ctx) {
		const manifest = this.manifest;
		const env = getEnvironment(manifest);
		const { clientDirectives, inlinedScripts, compressHTML } = manifest;
		const renderers = env.getRenderers(manifest);
		const resolve = (specifier) => env.resolve(manifest, specifier);
		const routeData = this.routeData;
		const { links, scripts, styles } = await env.headElements(manifest, routeData);
		const extraStyleHashes = [];
		const extraScriptHashes = [];
		const shouldInjectCspMetaTags = this.shouldInjectCspMetaTags ?? manifest.shouldInjectCspMetaTags;
		const cspAlgorithm = manifest.csp?.algorithm ?? "SHA-256";
		if (shouldInjectCspMetaTags) {
			for (const style of styles) extraStyleHashes.push(await generateCspDigest(style.children, cspAlgorithm));
			for (const script of scripts) extraScriptHashes.push(await generateCspDigest(script.children, cspAlgorithm));
		}
		const componentMetadata = await env.componentMetadata(manifest, routeData) ?? manifest.componentMetadata;
		const headers = new Headers({ "Content-Type": "text/html" });
		const partial = typeof this.partial === "boolean" ? this.partial : Boolean(mod.partial);
		const actionResult = hasActionPayload(this.locals) ? deserializeActionResult(this.locals._actionPayload.actionResult) : void 0;
		const status = this.status;
		const response = {
			status: actionResult?.error ? actionResult?.error.status : status,
			statusText: actionResult?.error ? actionResult?.error.type : "OK",
			get headers() {
				return headers;
			},
			set headers(_) {
				throw new AstroError(AstroResponseHeadersReassigned);
			}
		};
		const state = this;
		const result = {
			base: manifest.base,
			userAssetsBase: manifest.userAssetsBase,
			cancelled: false,
			clientDirectives,
			inlinedScripts,
			componentMetadata,
			compressHTML,
			cookies: this.cookies,
			createAstro: (props, slots) => state.createAstro(result, props, slots, ctx),
			links,
			params: this.params,
			partial,
			pathname: this.pathname,
			renderers,
			resolve,
			response,
			request: this.request,
			scripts,
			styles,
			actionResult,
			async getServerIslandNameMap() {
				return (await getServerIslands(manifest)).serverIslandNameMap ?? /* @__PURE__ */ new Map();
			},
			key: manifest.key,
			trailingSlash: manifest.trailingSlash,
			_metadata: {
				hasHydrationScript: false,
				rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(),
				hasRenderedHead: false,
				renderedScripts: /* @__PURE__ */ new Set(),
				hasDirectives: /* @__PURE__ */ new Set(),
				hasRenderedServerIslandRuntime: false,
				headInTree: false,
				extraHead: [],
				extraStyleHashes,
				extraScriptHashes,
				propagators: /* @__PURE__ */ new Set(),
				routeHasPropagation: false,
				pendingSlotEvaluations: [],
				templateDepth: 0
			},
			cspDestination: manifest.csp?.cspDestination ?? (routeData.prerender ? "meta" : "header"),
			shouldInjectCspMetaTags,
			cspAlgorithm,
			directives: manifest.csp?.directives ? [...manifest.csp.directives] : [],
			scriptHashes: manifest.csp?.scriptHashes ? [...manifest.csp.scriptHashes] : [],
			scriptResources: manifest.csp?.scriptResources ? [...manifest.csp.scriptResources] : [],
			styleHashes: manifest.csp?.styleHashes ? [...manifest.csp.styleHashes] : [],
			styleResources: manifest.csp?.styleResources ? [...manifest.csp.styleResources] : [],
			isStrictDynamic: manifest.csp?.isStrictDynamic ?? false,
			scriptDirective: {
				resources: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.resources] : [],
				hashes: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.hashes] : [],
				strictDynamic: manifest.csp?.scriptDirective?.strictDynamic ?? false
			},
			styleDirective: {
				resources: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.resources] : [],
				hashes: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.hashes] : []
			},
			speculationRulesContent: manifest.csp?.speculationRulesContent,
			internalFetchHeaders: manifest.internalFetchHeaders
		};
		this.result = result;
		return result;
	}
	/**
	* Creates the Astro global object for a component render.
	*/
	createAstro(result, props, slotValues, apiContext) {
		let astroPagePartial;
		if (this.isRewriting) this.#astroPagePartial = this.createAstroPagePartial(result, apiContext);
		this.#astroPagePartial ??= this.createAstroPagePartial(result, apiContext);
		astroPagePartial = this.#astroPagePartial;
		const astroComponentPartial = {
			props,
			self: null
		};
		const Astro = Object.assign(Object.create(astroPagePartial), astroComponentPartial);
		let _slots;
		Object.defineProperty(Astro, "slots", { get: () => {
			if (!_slots) _slots = new Slots(result, slotValues, this.logger);
			return _slots;
		} });
		return Astro;
	}
	/**
	* Creates the Astro page-level partial (prototype for Astro global).
	*/
	createAstroPagePartial(result, apiContext) {
		const state = this;
		const { cookies, locals, params, logger, url } = this;
		const { response } = result;
		const redirect = (path, status = 302) => {
			if (state.request[responseSentSymbol$1]) throw new AstroError({ ...ResponseSentError });
			return new Response(null, {
				status,
				headers: { Location: path }
			});
		};
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		const callAction = createCallAction(apiContext);
		const partial = {
			generator: ASTRO_GENERATOR,
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			cookies,
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			locals,
			redirect,
			rewrite,
			request: this.request,
			response,
			site: getSite(this.manifest),
			getActionResult: createGetActionResult(locals),
			get callAction() {
				return callAction;
			},
			url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return {
					info(msg) {
						logger.info(null, msg);
					},
					warn(msg) {
						logger.warn(null, msg);
					},
					error(msg) {
						logger.error(null, msg);
					}
				};
			}
		};
		this.defineProviderGetters(partial);
		return partial;
	}
	getClientAddress() {
		const { clientAddress } = this;
		const routeData = this.routeData;
		if (routeData.prerender) throw new AstroError({
			...PrerenderClientAddressNotAvailable,
			message: PrerenderClientAddressNotAvailable.message(routeData.component)
		});
		if (clientAddress) return clientAddress;
		if (this.manifest.adapterName) throw new AstroError({
			...ClientAddressNotAvailable,
			message: ClientAddressNotAvailable.message(this.manifest.adapterName)
		});
		throw new AstroError(StaticClientAddressNotAvailable);
	}
	getCookies() {
		return this.cookies;
	}
	getCsp() {
		const state = this;
		if (!this.manifest.csp) {
			if (getEnvironment(this.manifest).runtimeMode === "production") this.logger.warn("csp", `context.csp was used when rendering the route ${colors.green(state.routeData.route)}, but CSP was not configured. For more information, see https://docs.astro.build/en/reference/configuration-reference/#securitycsp`);
			return;
		}
		const warnedFallback = /* @__PURE__ */ new Set();
		const warnFallback = (family, kind) => {
			if (kind === "default" || !state.result) return;
			const defaultResources = (family === "script" ? state.result.scriptDirective : state.result.styleDirective).resources.map(normalizeCspResourceEntry).filter((entry) => entry.kind === "default").map((entry) => entry.resource);
			if (defaultResources.length === 0) return;
			const key = `${family}:${kind}`;
			if (warnedFallback.has(key)) return;
			warnedFallback.add(key);
			const general = `${family}-src`;
			const specific = `${general}-${kind === "element" ? "elem" : "attr"}`;
			state.logger.warn("csp", `A resource was added to \`${specific}\`, but \`${general}\` also defines custom resources (${defaultResources.join(" ")}). Because \`${specific}\` overrides \`${general}\` for its scope (browsers do not fall back), those resources will not apply there. Add them to \`${specific}\` as well if needed.`);
		};
		return {
			insertDirective(payload) {
				if (state.result) state.result.directives = pushDirective(state.result.directives, payload);
			},
			insertScriptResource(payload) {
				if (!state.result) return;
				warnFallback("script", normalizeCspResourceEntry(payload).kind);
				state.result.scriptDirective.resources.push(payload);
			},
			insertStyleResource(payload) {
				if (!state.result) return;
				warnFallback("style", normalizeCspResourceEntry(payload).kind);
				state.result.styleDirective.resources.push(payload);
			},
			insertStyleHash(payload) {
				state.result?.styleDirective.hashes.push(payload);
			},
			insertScriptHash(payload) {
				state.result?.scriptDirective.hashes.push(payload);
			}
		};
	}
	computeCurrentLocale() {
		const { url, manifest: { i18n }, routeData } = this;
		if (!i18n || !routeData) return;
		const { defaultLocale, locales, strategy } = i18n;
		const fallbackTo = strategy === "pathname-prefix-other-locales" || strategy === "domains-prefix-other-locales" ? defaultLocale : void 0;
		if (this.#currentLocale) return this.#currentLocale;
		let computedLocale;
		if (isRouteServerIsland(routeData)) {
			let referer = this.request.headers.get("referer");
			if (referer) {
				if (URL.canParse(referer)) referer = new URL(referer).pathname;
				computedLocale = computeCurrentLocale(referer, locales, defaultLocale);
			}
		} else {
			let pathname = routeData.pathname;
			if (this.#domainPathname) pathname = this.pathname;
			else if (url && !routeData.pattern.test(url.pathname)) {
				for (const fallbackRoute of routeData.fallbackRoutes) if (fallbackRoute.pattern.test(url.pathname)) {
					pathname = fallbackRoute.pathname;
					break;
				}
			}
			pathname = pathname && !isRoute404or500(routeData) ? pathname : url.pathname ?? this.pathname;
			computedLocale = computeCurrentLocale(pathname, locales, defaultLocale);
			if (routeData.params.length > 0) {
				const localeFromParams = computeCurrentLocaleFromParams(this.params, locales);
				if (localeFromParams) computedLocale = localeFromParams;
			}
		}
		this.#currentLocale = computedLocale ?? fallbackTo;
		return this.#currentLocale;
	}
	computePreferredLocale() {
		const { manifest: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocale ??= computePreferredLocale(request, i18n.locales);
	}
	computePreferredLocaleList() {
		const { manifest: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocaleList ??= computePreferredLocaleList(request, i18n.locales);
	}
	/**
	* Lazily loads the route's component module. Returns the cached
	* instance if already loaded. The promise is cached so concurrent
	* callers share the same load.
	*/
	async loadComponentInstance() {
		if (this.componentInstance) return this.componentInstance;
		if (this.#componentInstancePromise) return this.#componentInstancePromise;
		this.#componentInstancePromise = getEnvironment(this.manifest).getComponentByRoute(this.manifest, this.routeData).then((mod) => {
			this.componentInstance = mod;
			return mod;
		});
		return this.#componentInstancePromise;
	}
	/**
	* Registers a context provider under the given key. Handlers call
	* this to contribute values to the request context (e.g. sessions).
	* The `create` factory is called lazily on the first `resolve(key)`.
	*/
	provide(key, provider) {
		(this.#providers ??= /* @__PURE__ */ new Map()).set(key, provider);
	}
	/**
	* Lazily resolves a provider registered under `key`. Calls
	* `provider.create()` on first access and caches the result.
	* Returns `undefined` if no provider was registered for the key.
	*/
	resolve(key) {
		if (this.#providersResolvedValues?.has(key)) return this.#providersResolvedValues.get(key);
		const provider = this.#providers?.get(key);
		if (!provider) return void 0;
		const value = provider.create();
		(this.#providersResolvedValues ??= /* @__PURE__ */ new Map()).set(key, value);
		return value;
	}
	/**
	* Runs all registered `finalize` callbacks. Should be called after
	* the response is produced, typically in a `finally` block.
	*
	* Returns synchronously (no promise allocation) when nothing needs
	* finalizing — important for the hot path where sessions are not used.
	*/
	finalizeAll() {
		if (!this.#providersResolvedValues || this.#providersResolvedValues.size === 0) return;
		let chain;
		for (const [key, provider] of this.#providers) if (provider.finalize && this.#providersResolvedValues.has(key)) {
			const result = provider.finalize(this.#providersResolvedValues.get(key));
			if (result) chain = chain ? chain.then(() => result) : result;
		}
		return chain;
	}
	/**
	* Adds lazy getters to `target` for each registered provider key.
	* Used by context creation (APIContext, Astro global) so that
	* provider values like `session` and `cache` appear as properties
	* without hard-coding the keys.
	*
	* Always defines a `session` getter (returning `undefined` when no
	* provider is registered) so `ctx.session` / `Astro.session` is a
	* present property regardless of whether the sessions handler was
	* included in the pipeline.
	*/
	defineProviderGetters(target) {
		const state = this;
		if (this.#providers) for (const key of this.#providers.keys()) Object.defineProperty(target, key, {
			get: () => state.resolve(key),
			enumerable: true,
			configurable: true
		});
		if (!this.#providers?.has("session")) {
			let warned = false;
			Object.defineProperty(target, "session", {
				get() {
					if (!warned) {
						warned = true;
						state.logger.warn("session", "`Astro.session` was accessed but no session storage is configured. Either configure the storage manually or use an adapter that provides session storage. For more information, see https://docs.astro.build/en/guides/sessions/");
					}
				},
				enumerable: true,
				configurable: true
			});
		}
	}
	/**
	* Resolves the route to use for this request and stores it on
	* `this.routeData`. If the adapter (or the dev server) provided a
	* `routeData` via render options it's already set and this is a
	* no-op. Otherwise we use the app's synchronous route matcher and
	* fall back to a `404.astro` route so middleware can still run.
	*
	* Called eagerly from the constructor so individual handlers
	* (actions, pages, middleware, etc.) always see a resolved route
	* without the caller needing an extra setup step.
	*
	* Once routeData is known, finalizes `this.pathname`: in dev, if the
	* matched route has no `.html` extension, strip `.html` / `/index.html`
	* suffixes so the rendering pipeline sees the canonical pathname.
	*/
	/**
	* Strip `.html` / `/index.html` suffixes from the pathname so the
	* rendering pipeline sees the canonical route path. Only applies to
	* page routes where `.html` is framework-injected. Endpoint routes
	* preserve `.html` because any such suffix is user-provided (e.g.
	* from `getStaticPaths` params). Skipped when the matched route
	* itself has an `.html` extension in its definition.
	*/
	#stripHtmlExtension() {
		if (this.routeData && this.routeData.type === "page" && !routeHasHtmlExtension(this.routeData)) {
			this.pathname = this.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
			if (this.manifest.trailingSlash === "always" && this.pathname !== "" && !this.pathname.endsWith("/")) this.pathname += "/";
		}
	}
	#resolveRouteData() {
		if (this.routeData) {
			this.#stripHtmlExtension();
			return;
		}
		const matched = matchRoute(this.manifest, this.pathname);
		if (matched && matched.prerender && this.manifest.serverLike) {
			if (matched.params.length > 0) {
				const allMatches = matchAllRoutes(this.manifest, this.pathname);
				this.routeData = allMatches.find((r) => !r.prerender);
			} else this.routeData = void 0;
		} else this.routeData = matched;
		this.logger.debug("router", "Astro matched the following route for " + this.request.url);
		this.logger.debug("router", "RouteData:\n" + this.routeData);
		if (!this.routeData) {
			const custom404 = getCustom404Route(getRouteTable(this.manifest));
			if (custom404 && !custom404.prerender) this.routeData = custom404;
		}
		if (!this.routeData) {
			this.logger.debug("router", "Astro hasn't found routes that match " + this.request.url);
			this.logger.debug("router", "Here's the available routes:\n", getRouteTable(this.manifest));
			return;
		}
		this.#stripHtmlExtension();
	}
	/**
	* Strips the manifest's base from a normalized request pathname and prepends
	* a forward slash.
	*
	* Mirrors `BaseApp.removeBase`: the router matches against this stripped path
	* while middleware reads the un-stripped `context.url.pathname`, so both must
	* strip the base identically.
	*/
	#computePathname(normalizedPathname) {
		return prependForwardSlash(stripRequestBase(normalizedPathname, this.manifest.base));
	}
	/**
	* Decodes and normalizes the public request pathname before deriving the
	* separate pathname used for route matching.
	*/
	#normalizePathname(pathname) {
		try {
			pathname = validateAndDecodePathname(pathname);
		} catch (e) {
			if (e instanceof MultiLevelEncodingError) this.invalidEncoding = true;
			else this.logger.error(null, e.toString());
		}
		return collapseDuplicateSlashes(pathname);
	}
	/**
	* Reads X-Forwarded-Proto, X-Forwarded-Host, and X-Forwarded-Port
	* from the request headers, validates them against the manifest's
	* `allowedDomains`, and updates `this.url` accordingly. Also resolves
	* `clientAddress` from X-Forwarded-For when the host is trusted.
	*
	* Only called when `allowedDomains` is configured — without it,
	* forwarded headers are never trusted.
	*/
	#applyForwardedHeaders() {
		const headers = this.request.headers;
		const allowedDomains = this.manifest.allowedDomains;
		const validated = validateForwardedHeaders(getFirstForwardedValue(headers.get("x-forwarded-proto") ?? void 0), getFirstForwardedValue(headers.get("x-forwarded-host") ?? void 0), getFirstForwardedValue(headers.get("x-forwarded-port") ?? void 0), allowedDomains);
		if (!validated.protocol && !validated.host && !validated.port) return;
		if (validated.protocol) this.url.protocol = validated.protocol + ":";
		if (validated.host) {
			const colonIdx = validated.host.indexOf(":");
			if (colonIdx !== -1) {
				this.url.hostname = validated.host.slice(0, colonIdx);
				this.url.port = validated.host.slice(colonIdx + 1);
			} else {
				this.url.hostname = validated.host;
				this.url.port = "";
			}
		}
		if (validated.port) this.url.port = validated.port;
		if (validated.host !== void 0 && !this.clientAddress) {
			const forwardedFor = getFirstForwardedValue(this.request.headers.get("x-forwarded-for") ?? void 0);
			if (forwardedFor) this.clientAddress = forwardedFor;
		}
		this.request = new Request(this.url, this.request);
	}
	/**
	* Returns the resolved `props` for this render, computing them lazily
	* from the route + component module on first access. If the
	* `initialProps` already carries user-supplied props (e.g. the
	* container API) those are used verbatim.
	*/
	async getProps() {
		if (this.props !== null) return this.props;
		if (Object.keys(this.initialProps).length > 0) {
			this.props = this.initialProps;
			return this.props;
		}
		const mod = await this.loadComponentInstance();
		this.props = await getProps({
			mod,
			routeData: this.routeData,
			routeCache: getRouteCache(this.manifest),
			pathname: this.pathname,
			logger: this.logger,
			serverLike: this.manifest.serverLike,
			base: this.manifest.base,
			trailingSlash: this.manifest.trailingSlash
		});
		return this.props;
	}
	/**
	* Returns the `ActionAPIContext` for this render, creating it lazily.
	* Used by middleware, actions, and page dispatch.
	*/
	getActionAPIContext() {
		if (this.actionApiContext !== null) return this.actionApiContext;
		const state = this;
		const ctx = {
			get cookies() {
				return state.cookies;
			},
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			generator: ASTRO_GENERATOR,
			get locals() {
				return state.locals;
			},
			set locals(_) {
				throw new AstroError(LocalsReassigned);
			},
			params: this.params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			request: this.request,
			site: getSite(this.manifest),
			url: this.url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return {
					info(msg) {
						state.logger.info(null, msg);
					},
					warn(msg) {
						state.logger.warn(null, msg);
					},
					error(msg) {
						state.logger.error(null, msg);
					}
				};
			}
		};
		this.defineProviderGetters(ctx);
		this.actionApiContext = ctx;
		return this.actionApiContext;
	}
	/**
	* Returns the `APIContext` for this render, creating it lazily from
	* the memoized props + action context.
	*
	* Callers must ensure `getProps()` has resolved at least once before
	* calling this.
	*/
	getAPIContext() {
		if (this.apiContext !== null) return this.apiContext;
		const actionApiContext = this.getActionAPIContext();
		const state = this;
		const redirect = (path, status = 302) => new Response(null, {
			status,
			headers: { Location: path }
		});
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		actionApiContext[fetchStateSymbol] = this;
		this.apiContext = Object.assign(actionApiContext, {
			props: this.props,
			redirect,
			rewrite,
			getActionResult: createGetActionResult(actionApiContext.locals),
			callAction: createCallAction(actionApiContext)
		});
		return this.apiContext;
	}
	/**
	* Invalidates the cached `APIContext` so the next `getAPIContext()`
	* call re-derives it from the (possibly mutated) state. Used
	* after an in-flight rewrite swaps the route / request / params.
	*/
	invalidateContexts() {
		this.props = null;
		this.actionApiContext = null;
		this.apiContext = null;
	}
	resetResponseMetadata() {
		this.responseRouteType = void 0;
		this.skipErrorReroute = false;
	}
};
//#endregion
//#region node_modules/astro/dist/actions/handler.js
function handleAction(apiContext, state) {
	markFeatureUsed(state.manifest, FetchFeatures.actions);
	if (apiContext.isPrerendered) return;
	const { action, setActionResult } = getActionContext(apiContext);
	if (!action) return;
	if (state.manifest.checkOrigin && isForbiddenCrossOriginRequest(apiContext.request, apiContext.url, apiContext.isPrerendered)) return Promise.resolve(createCrossOriginForbiddenResponse(apiContext.request));
	return executeAction(action, setActionResult);
}
async function executeAction(action, setActionResult) {
	const serialized = serializeActionResult(await action.handler());
	if (action.calledFrom === "rpc") {
		if (serialized.type === "empty") return new Response(null, { status: serialized.status });
		return new Response(serialized.body, {
			status: serialized.status,
			headers: { "Content-Type": serialized.contentType }
		});
	}
	setActionResult(action.name, serialized);
}
//#endregion
//#region node_modules/astro/dist/core/routing/3xx.js
function redirectTemplate({ status, absoluteLocation, relativeLocation, from }) {
	const delay = status === 302 ? 2 : 0;
	const rel = escape(String(relativeLocation));
	return `<!doctype html>
<title>Redirecting to: ${rel}</title>
<meta http-equiv="refresh" content="${delay};url=${rel}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${escape(String(absoluteLocation))}">
<body>
	<a href="${rel}">Redirecting ${from ? `from <code>${escape(from)}</code> ` : ""}to <code>${rel}</code></a>
</body>`;
}
//#endregion
//#region node_modules/astro/dist/core/routing/trailing-slash-handler.js
function handleTrailingSlash(state) {
	const url = new URL(state.request.url);
	const redirect = redirectTrailingSlash(state.manifest.trailingSlash, url.pathname);
	if (redirect === url.pathname) return;
	const addCookieHeader = state.renderOptions.addCookieHeader;
	const status = state.request.method === "GET" ? 301 : 308;
	const response = new Response(redirectTemplate({
		status,
		relativeLocation: url.pathname,
		absoluteLocation: redirect,
		from: state.request.url
	}), {
		status,
		headers: { location: redirect + url.search }
	});
	prepareResponse(response, { addCookieHeader });
	return response;
}
function redirectTrailingSlash(trailingSlash, pathname) {
	if (pathname === "/" || isInternalPath(pathname)) return pathname;
	const path = collapseDuplicateTrailingSlashes(pathname, trailingSlash !== "never");
	if (path !== pathname) return path;
	if (trailingSlash === "ignore") return pathname;
	if (trailingSlash === "always" && !hasFileExtension(pathname)) return appendForwardSlash(pathname);
	if (trailingSlash === "never") return removeTrailingForwardSlash(pathname);
	return pathname;
}
//#endregion
//#region node_modules/astro/dist/core/cache/provider.js
var cacheProviderMemo = createAsyncManifestMemo(async (manifest) => {
	if (manifest.cacheProvider) {
		const factory = (await manifest.cacheProvider())?.default || null;
		return factory ? factory(manifest.cacheConfig?.options) : null;
	}
	return null;
});
function getCacheProvider(manifest) {
	return cacheProviderMemo.get(manifest);
}
//#endregion
//#region node_modules/astro/dist/core/cache/runtime/utils.js
function defaultSetHeaders(options) {
	const headers = new Headers();
	const directives = [];
	if (options.maxAge !== void 0) directives.push(`max-age=${options.maxAge}`);
	if (options.swr !== void 0) directives.push(`stale-while-revalidate=${options.swr}`);
	if (directives.length > 0) headers.set("CDN-Cache-Control", directives.join(", "));
	if (options.tags && options.tags.length > 0) headers.set("Cache-Tag", options.tags.join(", "));
	if (options.lastModified) headers.set("Last-Modified", options.lastModified.toUTCString());
	if (options.etag) headers.set("ETag", options.etag);
	return headers;
}
function isLiveDataEntry(value) {
	return value != null && typeof value === "object" && "id" in value && "data" in value && "cacheHint" in value;
}
//#endregion
//#region node_modules/astro/dist/core/cache/runtime/cache.js
var APPLY_HEADERS = /* @__PURE__ */ Symbol.for("astro:cache:apply");
var IS_ACTIVE = /* @__PURE__ */ Symbol.for("astro:cache:active");
var AstroCache = class {
	#options = {};
	#tags = /* @__PURE__ */ new Set();
	#disabled = false;
	#provider;
	enabled = true;
	constructor(provider) {
		this.#provider = provider;
	}
	set(input) {
		if (input === false) {
			this.#disabled = true;
			this.#tags.clear();
			this.#options = {};
			return;
		}
		this.#disabled = false;
		let options;
		if (isLiveDataEntry(input)) {
			if (!input.cacheHint) return;
			options = input.cacheHint;
		} else options = input;
		if ("maxAge" in options && options.maxAge !== void 0) this.#options.maxAge = options.maxAge;
		if ("swr" in options && options.swr !== void 0) this.#options.swr = options.swr;
		if ("etag" in options && options.etag !== void 0) this.#options.etag = options.etag;
		if (options.lastModified !== void 0) {
			if (!this.#options.lastModified || options.lastModified > this.#options.lastModified) this.#options.lastModified = options.lastModified;
		}
		if (options.tags) for (const tag of options.tags) this.#tags.add(tag);
	}
	get tags() {
		return [...this.#tags];
	}
	/**
	* Get the current cache options (read-only snapshot).
	* Includes all accumulated options: maxAge, swr, tags, etag, lastModified.
	*/
	get options() {
		return {
			...this.#options,
			tags: this.tags
		};
	}
	async invalidate(input) {
		if (!this.#provider) throw new AstroError(CacheNotEnabled);
		let options;
		if (isLiveDataEntry(input)) options = { tags: input.cacheHint?.tags ?? [] };
		else options = input;
		return this.#provider.invalidate(options);
	}
	/** @internal */
	[APPLY_HEADERS](response, request) {
		if (this.#disabled) return;
		const finalOptions = {
			...this.#options,
			tags: this.tags
		};
		if (finalOptions.maxAge === void 0 && !finalOptions.tags?.length) return;
		const headers = this.#provider?.setHeaders?.(finalOptions, request) ?? defaultSetHeaders(finalOptions);
		for (const [key, value] of headers) response.headers.set(key, value);
	}
	/** @internal */
	get [IS_ACTIVE]() {
		return !this.#disabled && (this.#options.maxAge !== void 0 || this.#tags.size > 0);
	}
};
function applyCacheHeaders(cache, response, request) {
	if (APPLY_HEADERS in cache) cache[APPLY_HEADERS](response, request);
}
//#endregion
//#region node_modules/astro/dist/core/routing/parts.js
var ROUTE_DYNAMIC_SPLIT = /\[(.+?\(.+?\)|.+?)\]/;
var ROUTE_SPREAD = /^\.{3}.+$/;
function getParts(part, file) {
	const result = [];
	part.split(ROUTE_DYNAMIC_SPLIT).map((str, i) => {
		if (!str) return;
		const dynamic = i % 2 === 1;
		const [, content] = dynamic ? /([^(]+)$/.exec(str) || [null, null] : [null, str];
		if (!content || dynamic && !/^(?:\.\.\.)?[\w$]+$/.test(content)) throw new Error(`Invalid route ${file} \u2014 parameter name must match /^[a-zA-Z0-9_$]+$/`);
		result.push({
			content,
			dynamic,
			spread: dynamic && ROUTE_SPREAD.test(content)
		});
	});
	return result;
}
//#endregion
//#region node_modules/astro/dist/core/cache/runtime/route-matching.js
function compileCacheRoutes(routes, base, trailingSlash) {
	const compiled = Object.entries(routes).map(([path, options]) => {
		const segments = removeLeadingForwardSlash(path).split("/").filter(Boolean).map((s) => getParts(s, path));
		return {
			pattern: getPattern(segments, base, trailingSlash),
			options,
			segments,
			route: path
		};
	});
	compiled.sort((a, b) => routeComparator({
		segments: a.segments,
		route: a.route,
		type: "page"
	}, {
		segments: b.segments,
		route: b.route,
		type: "page"
	}));
	return compiled;
}
function matchCacheRoute(pathname, compiledRoutes) {
	for (const route of compiledRoutes) if (route.pattern.test(pathname)) return route.options;
	return null;
}
//#endregion
//#region node_modules/astro/dist/core/cache/handler.js
var CACHE_KEY = "cache";
function provideCache(state) {
	const manifest = state.manifest;
	if (!manifest.cacheConfig) {
		state.provide(CACHE_KEY, { create: () => new DisabledAstroCache(state.logger) });
		return;
	}
	if (getEnvironment(manifest).runtimeMode === "development") {
		state.provide(CACHE_KEY, { create: () => new NoopAstroCache() });
		return;
	}
	return provideCacheAsync(state, manifest);
}
async function provideCacheAsync(state, manifest) {
	const cacheProvider = await getCacheProvider(manifest);
	state.provide(CACHE_KEY, { create() {
		const cache = new AstroCache(cacheProvider);
		if (manifest.cacheConfig?.routes) {
			const matched = matchCacheRoute(state.pathname, getCompiledCacheRoutes(manifest));
			if (matched) cache.set(matched);
		}
		return cache;
	} });
}
async function handleCache(state, next) {
	markFeatureUsed(state.manifest, FetchFeatures.cache);
	if (!state.manifest.cacheProvider) return next();
	const cache = state.resolve(CACHE_KEY);
	const cacheProvider = await getCacheProvider(state.manifest);
	if (cacheProvider?.onRequest) {
		const response2 = await cacheProvider.onRequest({
			request: state.request,
			url: new URL(state.request.url),
			waitUntil: state.renderOptions.waitUntil
		}, async () => {
			const res = await next();
			applyCacheHeaders(cache, res, state.request);
			return res;
		});
		response2.headers.delete("CDN-Cache-Control");
		response2.headers.delete("Cache-Tag");
		return response2;
	}
	const response = await next();
	applyCacheHeaders(cache, response, state.request);
	return response;
}
var compiledCacheRoutesMemo = createManifestMemo((manifest) => manifest.cacheConfig?.routes ? compileCacheRoutes(manifest.cacheConfig.routes, manifest.base, manifest.trailingSlash) : []);
function getCompiledCacheRoutes(manifest) {
	return compiledCacheRoutesMemo.get(manifest);
}
//#endregion
//#region node_modules/astro/dist/core/redirects/render.js
function isExternalURL(url) {
	return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}
function redirectIsExternal(redirect) {
	if (typeof redirect === "string") return isExternalURL(redirect);
	else return isExternalURL(redirect.destination);
}
function computeRedirectStatus(method, redirect, redirectRoute) {
	return redirectRoute && typeof redirect === "object" ? redirect.status : method === "GET" ? 301 : 308;
}
function resolveRedirectTarget(params, redirect, redirectRoute, trailingSlash) {
	if (typeof redirectRoute !== "undefined") return getRouteGenerator(redirectRoute.segments, trailingSlash)(params) || redirectRoute?.pathname || "/";
	else if (typeof redirect === "string") {
		if (redirectIsExternal(redirect)) return redirect;
		else {
			let target = redirect;
			for (const param of Object.keys(params)) {
				const paramValue = params[param];
				target = target.replace(`[${param}]`, paramValue).replace(`[...${param}]`, paramValue);
			}
			return target;
		}
	} else if (typeof redirect === "undefined") return "/";
	return redirect.destination;
}
async function renderRedirect(state) {
	markFeatureUsed(state.manifest, FetchFeatures.redirects);
	const { redirect, redirectRoute } = state.routeData;
	const status = computeRedirectStatus(state.request.method, redirect, redirectRoute);
	const headers = { location: encodeURI(resolveRedirectTarget(state.params, redirect, redirectRoute, state.manifest.trailingSlash)) };
	if (redirect && redirectIsExternal(redirect)) {
		if (typeof redirect === "string") return Response.redirect(redirect, status);
		else return Response.redirect(redirect.destination, status);
	}
	return new Response(null, {
		status,
		headers
	});
}
//#endregion
//#region node_modules/astro/dist/core/routing/handler.js
function logRequestFromState(state, payload) {
	if (state.logRequest) state.logRequest(payload);
	else getEnvironment(state.manifest).logRequest(state.manifest, payload);
}
function actionsAndPages(state, ctx) {
	if (!state.skipMiddleware) {
		const actionResult = handleAction(ctx, state);
		if (actionResult) return actionResult.then((response) => response ?? handlePages(state, ctx));
	}
	return handlePages(state, ctx);
}
async function handleRequest(state) {
	await getResolvedLogger(state.manifest);
	markFeatureUsed(state.manifest, ALL_FETCH_FEATURES);
	if (state.invalidEncoding) return new Response(null, {
		status: 400,
		statusText: "Bad Request"
	});
	const trailingSlashRedirect = handleTrailingSlash(state);
	if (trailingSlashRedirect) return trailingSlashRedirect;
	if (!state.routeData) return renderErrorFromState(state, state.request, {
		...state.renderOptions,
		status: 404,
		pathname: state.pathname
	});
	return render(state);
}
async function render(state) {
	const routeData = state.routeData;
	const pathname = state.pathname;
	const request = state.request;
	const { addCookieHeader } = state.renderOptions;
	state.status = getDefaultStatusCode(state.manifest, routeData, pathname);
	let response;
	let finalizeError;
	try {
		const sessionP = state.manifest.sessionConfig ? provideSession(state) : void 0;
		const cacheP = provideCache(state);
		if (sessionP || cacheP) await Promise.all([sessionP, cacheP]);
		markFeatureUsed(state.manifest, FetchFeatures.sessions);
		if (routeData.type === "redirect") {
			const redirectResponse = await renderRedirect(state);
			logRequestFromState(state, {
				pathname,
				method: request.method,
				statusCode: redirectResponse.status,
				isRewrite: false,
				timeStart: state.timeStart
			});
			prepareResponse(redirectResponse, { addCookieHeader });
			state.logger.flush();
			return redirectResponse;
		}
		const i18n = getI18n(state.manifest);
		if (!state.manifest.cacheProvider) {
			markFeatureUsed(state.manifest, FetchFeatures.cache);
			response = await handleMiddleware(state, actionsAndPages);
			if (i18n) response = await finalizeI18n(i18n, state, response);
		} else {
			const runPipeline = async () => {
				let res = await handleMiddleware(state, actionsAndPages);
				if (i18n) res = await finalizeI18n(i18n, state, res);
				return res;
			};
			response = await handleCache(state, runPipeline);
		}
		logRequestFromState(state, {
			pathname,
			method: request.method,
			statusCode: response.status,
			isRewrite: state.isRewriting,
			timeStart: state.timeStart
		});
	} catch (err) {
		state.logger.error(null, err.stack || err.message || String(err));
		return renderErrorFromState(state, request, {
			...state.renderOptions,
			status: 500,
			error: err,
			pathname: state.pathname
		});
	} finally {
		try {
			const finalize = state.finalizeAll();
			if (finalize) await finalize;
		} catch (err) {
			finalizeError = err;
			state.logger.error(null, err.stack || err.message || String(err));
		}
	}
	if (finalizeError) return renderErrorFromState(state, request, {
		...state.renderOptions,
		status: 500,
		error: finalizeError,
		pathname: state.pathname
	});
	if (REROUTABLE_STATUS_CODES.includes(response.status) && response.body === null && !state.skipErrorReroute) return renderErrorFromState(state, request, {
		...state.renderOptions,
		response,
		status: response.status,
		error: response.status === 500 ? null : void 0,
		pathname: state.pathname
	});
	prepareResponse(response, { addCookieHeader });
	state.logger.flush();
	return response;
}
//#endregion
//#region node_modules/astro/dist/core/routing/match-request.js
function safeDecodeURI(manifest, pathname) {
	try {
		return decodeURI(pathname);
	} catch (e) {
		new AstroIntegrationLogger(getLogger(manifest).options, manifest.adapterName).debug(e.toString());
		return pathname;
	}
}
function matchRequest(manifest, request, allowPrerenderedRoutes = false) {
	const url = new URL(request.url);
	if (manifest.assets.has(url.pathname)) return void 0;
	let pathname = computePathnameFromDomain(request, url, manifest.i18n, manifest.base, manifest.trailingSlash, getLogger(manifest));
	if (!pathname) pathname = prependForwardSlash(stripRequestBase(url.pathname, manifest.base));
	const routeData = matchRoute(manifest, safeDecodeURI(manifest, pathname));
	if (!routeData) return void 0;
	if (allowPrerenderedRoutes) return routeData;
	if (routeData.prerender) {
		if (routeData.params.length > 0) return matchAllRoutes(manifest, safeDecodeURI(manifest, pathname)).find((r) => !r.prerender);
		return;
	}
	return routeData;
}
//#endregion
//#region node_modules/astro/dist/core/app/base.js
var BaseApp = class BaseApp {
	manifest;
	#adapterLogger;
	baseWithoutTrailingSlash;
	/**
	* The streaming flag passed to the constructor, surfaced through the
	* protected `resolveStreaming()` hook and fed into the internal
	* `FetchState` facade hooks on the fast path.
	*/
	#streaming;
	/**
	* The handler that turns incoming `Request` objects into `Response`s.
	* Defaults to a `DefaultFetchHandler` pinned to this app and can be
	* overridden via `setFetchHandler` — typically by the bundled
	* entrypoint after importing `virtual:astro:fetchable`.
	*/
	#fetchHandler;
	#errorHandler;
	/**
	* Whether a custom fetch handler (from `src/fetch.ts`) has been set
	* via `setFetchHandler`. When false, the `DefaultFetchHandler` is
	* in use and all features are implicitly active.
	*/
	#hasCustomFetchHandler = false;
	/**
	* Whether the missing-feature check has already run. We only want
	* to warn once — after the first request in dev, or at build end.
	*/
	#featureCheckDone = false;
	get logger() {
		return getLogger(this.manifest);
	}
	/**
	* Route data derived from the manifest, used for route matching. Reads and
	* writes go through the single per-manifest route table, so HMR updates are
	* visible to every consumer at once.
	*/
	get manifestData() {
		return getRouteTable(this.manifest);
	}
	set manifestData(routesList) {
		updateRouteTable(this.manifest, routesList.routes);
	}
	get adapterLogger() {
		const currentOptions = this.logger.options;
		if (!this.#adapterLogger || this.#adapterLogger.options !== currentOptions) this.#adapterLogger = new AstroIntegrationLogger(currentOptions, this.manifest.adapterName);
		return this.#adapterLogger;
	}
	constructor(manifest, streaming = true) {
		this.manifest = manifest;
		this.baseWithoutTrailingSlash = removeTrailingForwardSlash(manifest.base);
		this.#streaming = streaming;
		getRouteTable(manifest);
		getLogger(manifest);
		this.#fetchHandler = new DefaultFetchHandler(this);
		this.#errorHandler = this.createErrorHandler();
	}
	/**
	* Resolves the user-configured logger destination from the manifest and
	* returns the logger. Lazy and only resolves once; safe to call before
	* the first render (adapters use this to log startup messages through
	* the configured destination).
	*/
	getLogger() {
		return getResolvedLogger(this.manifest);
	}
	/**
	* The streaming flag fed into the internal `FetchState` facade hooks on
	* the fast path. Returns the constructor flag by
	* default; `BuildApp` overrides this to return `undefined` so streaming
	* falls through to the environment default (`manifest.serverLike`).
	*/
	resolveStreaming() {
		return this.#streaming;
	}
	/**
	* Override the fetch handler used to dispatch requests. Entrypoints
	* call this with the default export of `virtual:astro:fetchable` to
	* plug in a user-authored handler from `src/fetch.ts`.
	*/
	setFetchHandler(handler) {
		this.#fetchHandler = handler;
		this.#hasCustomFetchHandler = !(handler instanceof DefaultFetchHandler);
	}
	/**
	* Returns the error handler used by this app. The default is a thin
	* bridge over the functional error API — strategy selection (production
	* default / dev / build) is environment-driven inside `renderErrorPage`.
	* External subclasses can override this to customize error rendering.
	*/
	createErrorHandler() {
		return { renderError: (request, options) => renderErrorPage(this.manifest, request, options) };
	}
	/**
	* Resets the cached adapter logger so it picks up a new logger instance.
	* Used by BuildApp when the logger is replaced via setOptions().
	*/
	resetAdapterLogger() {
		this.#adapterLogger = void 0;
	}
	getAllowedDomains() {
		return this.manifest.allowedDomains;
	}
	matchesAllowedDomains(forwardedHost, protocol) {
		return BaseApp.validateForwardedHost(forwardedHost, this.manifest.allowedDomains, protocol);
	}
	static validateForwardedHost(forwardedHost, allowedDomains, protocol) {
		if (!allowedDomains || allowedDomains.length === 0) return false;
		try {
			const testUrl = new URL(`${protocol || "https"}://${forwardedHost}`);
			return allowedDomains.some((pattern) => {
				return matchPattern(testUrl, pattern);
			});
		} catch {
			return false;
		}
	}
	set setManifestData(newManifestData) {
		updateRouteTable(this.manifest, newManifestData.routes);
	}
	removeBase(pathname) {
		return stripRequestBase(pathname, this.manifest.base);
	}
	/**
	* Decodes a pathname with `decodeURI`, falling back to the raw pathname when it
	* contains an invalid percent-sequence (e.g. `%C0%AF`, an overlong-UTF-8 encoding of
	* `/` commonly sent by path-traversal scanners). A raw `decodeURI()` would throw
	* `URIError: URI malformed`, and because `match()` runs before `render()` that error
	* escapes the adapter's request handler as an uncaught exception (HTTP 500) that user
	* middleware can't catch.
	*/
	safeDecodeURI(pathname) {
		try {
			return decodeURI(pathname);
		} catch (e) {
			this.adapterLogger.debug(e.toString());
			return pathname;
		}
	}
	/**
	* Extracts the base-stripped, decoded pathname from a request.
	* Used by adapters to compute the pathname for dev-mode route matching.
	*/
	getPathnameFromRequest(request) {
		const url = new URL(request.url);
		const pathname = prependForwardSlash(this.removeBase(url.pathname));
		return this.safeDecodeURI(pathname);
	}
	/**
	* Given a `Request`, it returns the `RouteData` that matches its `pathname`. By default, prerendered
	* routes aren't returned, even if they are matched.
	*
	* When `allowPrerenderedRoutes` is `true`, the function returns matched prerendered routes too.
	* @param request
	* @param allowPrerenderedRoutes
	*/
	match(request, allowPrerenderedRoutes = false) {
		return matchRequest(this.manifest, request, allowPrerenderedRoutes);
	}
	/**
	* A matching route function to use in the development server.
	* Contrary to the `.match` function, this function resolves props and params, returning the correct
	* route based on the priority, segments. It also returns the correct, resolved pathname.
	* @param pathname
	*/
	devMatch(pathname) {}
	computePathnameFromDomain(request) {
		return computePathnameFromDomain(request, new URL(request.url), this.manifest.i18n, this.manifest.base, this.manifest.trailingSlash, this.logger);
	}
	async render(request, { addCookieHeader = false, clientAddress = Reflect.get(request, clientAddressSymbol), locals, prerenderedErrorPageFetch = fetch, routeData, waitUntil } = {}) {
		await getResolvedLogger(this.manifest);
		if (routeData) {
			this.logger.debug("router", "The adapter " + this.manifest.adapterName + " provided a custom RouteData for ", request.url);
			this.logger.debug("router", "RouteData");
			this.logger.debug("router", routeData);
		}
		if (locals) {
			if (typeof locals !== "object") {
				const error = new AstroError(LocalsNotAnObject);
				this.logger.error(null, error.stack);
				return this.renderError(request, {
					addCookieHeader,
					clientAddress,
					prerenderedErrorPageFetch,
					locals: void 0,
					routeData,
					waitUntil,
					status: 500,
					error
				});
			}
		}
		if (!routeData) {
			const domainPathname = this.computePathnameFromDomain(request);
			if (domainPathname) routeData = matchRoute(this.manifest, this.safeDecodeURI(domainPathname));
		}
		const resolvedOptions = {
			addCookieHeader,
			clientAddress,
			prerenderedErrorPageFetch,
			locals,
			routeData,
			waitUntil
		};
		let response;
		if (this.#fetchHandler instanceof DefaultFetchHandler) response = await handleRequest(new FetchState(this.manifest, request, resolvedOptions, {
			streaming: this.resolveStreaming(),
			renderError: (req, opts) => this.renderError(req, opts),
			logRequest: (payload) => this.logThisRequest(payload)
		}));
		else {
			setRenderOptions(request, resolvedOptions);
			response = await this.#fetchHandler.fetch(request);
		}
		this.#warnMissingFeatures();
		if (response.headers.get("X-Astro-Error")) {
			response.headers.delete(ASTRO_ERROR_HEADER);
			return this.renderError(request, {
				addCookieHeader,
				clientAddress,
				prerenderedErrorPageFetch,
				locals,
				routeData,
				waitUntil,
				response,
				status: response.status,
				error: response.status === 500 ? null : void 0
			});
		}
		return response;
	}
	setCookieHeaders(response) {
		return getSetCookiesFromResponse(response);
	}
	/**
	* Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
	* For example,
	* ```ts
	* for (const cookie_ of App.getSetCookieFromResponse(response)) {
	*     const cookie: string = cookie_
	* }
	* ```
	* @param response The response to read cookies from.
	* @returns An iterator that yields key-value pairs as equal-sign-separated strings.
	*/
	static getSetCookieFromResponse = getSetCookiesFromResponse;
	/**
	* If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
	* This also handles pre-rendered /404 or /500 routes.
	*
	* Delegates to the app's configured `ErrorHandler`. To customize behavior
	* for a specific environment, override `createErrorHandler()` rather than
	* this method.
	*/
	async renderError(request, options) {
		return this.#errorHandler.renderError(request, options);
	}
	/**
	* One-shot check: after the first request with a custom `src/fetch.ts`,
	* compare `usedFeatures` against the manifest and warn about any
	* configured features the user's pipeline doesn't call.
	*/
	#warnMissingFeatures() {
		if (this.#featureCheckDone || !this.#hasCustomFetchHandler) return;
		this.#featureCheckDone = true;
		const manifest = this.manifest;
		const missing = [];
		const used = getUsedFeatures(this.manifest);
		if (manifest.routes.some((r) => r.routeData.type === "redirect") && !(used & FetchFeatures.redirects)) missing.push("redirects");
		if (manifest.sessionConfig && !(used & FetchFeatures.sessions)) missing.push("sessions");
		if (manifest.actions && !(used & FetchFeatures.actions)) missing.push("actions");
		if (manifest.middleware && !(used & FetchFeatures.middleware)) missing.push("middleware");
		if (manifest.i18n && manifest.i18n.strategy !== "manual" && !(used & FetchFeatures.i18n)) missing.push("i18n");
		if (manifest.cacheConfig && !(used & FetchFeatures.cache)) missing.push("cache");
		for (const feature of missing) this.logger.warn("router", `Your project uses ${feature}, but your custom src/fetch.ts does not call the ${feature}() handler. This feature will not work unless your fetch handler calls it.`);
	}
	getDefaultStatusCode(routeData, pathname) {
		return getDefaultStatusCode(this.manifest, routeData, pathname);
	}
	getManifest() {
		return this.manifest;
	}
	logThisRequest({ pathname, method, statusCode, isRewrite, timeStart }) {
		const timeEnd = performance.now();
		this.logRequest({
			pathname,
			method,
			statusCode,
			isRewrite,
			reqTime: timeEnd - timeStart
		});
	}
};
//#endregion
//#region node_modules/astro/dist/core/app/app.js
var App = class extends BaseApp {
	isDev() {
		return false;
	}
	logRequest(_options) {}
};
[
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "page",
			"component": "_server-islands.astro",
			"params": ["name"],
			"segments": [[{
				"content": "_server-islands",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "name",
				"dynamic": true,
				"spread": false
			}]],
			"pattern": "^\\/_server-islands\\/([^/]+?)\\/?$",
			"prerender": false,
			"isIndex": false,
			"fallbackRoutes": [],
			"route": "/_server-islands/[name]",
			"origin": "internal",
			"distURL": [],
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/_image",
			"component": "node_modules/emdash/dist/astro/image-endpoint.mjs",
			"params": [],
			"pathname": "/_image",
			"pattern": "^\\/_image\\/?$",
			"segments": [[{
				"content": "_image",
				"dynamic": false,
				"spread": false
			}]],
			"type": "endpoint",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"isIndex": false,
			"origin": "internal",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/.well-known/auth",
			"pattern": "^\\/_emdash\\/\\.well-known\\/auth\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": ".well-known",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/well-known/auth.mjs",
			"pathname": "/_emdash/.well-known/auth",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "page",
			"isIndex": false,
			"route": "/_emdash/admin/[...path]",
			"pattern": "^\\/_emdash\\/admin(?:\\/(.*?))?\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "...path",
					"dynamic": true,
					"spread": true
				}]
			],
			"params": ["...path"],
			"component": "node_modules/emdash/src/astro/routes/admin.astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/allowed-domains/[domain]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/allowed-domains\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "allowed-domains",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "domain",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["domain"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/_domain_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/allowed-domains",
			"pattern": "^\\/_emdash\\/api\\/admin\\/allowed-domains\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "allowed-domains",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/index.mjs",
			"pathname": "/_emdash/api/admin/allowed-domains",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/api-tokens/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/api-tokens\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api-tokens",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/api-tokens",
			"pattern": "^\\/_emdash\\/api\\/admin\\/api-tokens\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api-tokens",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/api-tokens/index.mjs",
			"pathname": "/_emdash/api/admin/api-tokens",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/byline-fields/reorder",
			"pattern": "^\\/_emdash\\/api\\/admin\\/byline-fields\\/reorder\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "byline-fields",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "reorder",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/byline-fields/reorder.mjs",
			"pathname": "/_emdash/api/admin/byline-fields/reorder",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/byline-fields/[slug]/usage",
			"pattern": "^\\/_emdash\\/api\\/admin\\/byline-fields\\/([^/]+?)\\/usage\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "byline-fields",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "usage",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/byline-fields/[slug]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/byline-fields\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "byline-fields",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/byline-fields",
			"pattern": "^\\/_emdash\\/api\\/admin\\/byline-fields\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "byline-fields",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index.mjs",
			"pathname": "/_emdash/api/admin/byline-fields",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/bylines/[id]/translations",
			"pattern": "^\\/_emdash\\/api\\/admin\\/bylines\\/([^/]+?)\\/translations\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "bylines",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "translations",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/bylines/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/bylines\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "bylines",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/bylines",
			"pattern": "^\\/_emdash\\/api\\/admin\\/bylines\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "bylines",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/bylines/index.mjs",
			"pathname": "/_emdash/api/admin/bylines",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/comments/bulk",
			"pattern": "^\\/_emdash\\/api\\/admin\\/comments\\/bulk\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "bulk",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/comments/bulk.mjs",
			"pathname": "/_emdash/api/admin/comments/bulk",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/comments/counts",
			"pattern": "^\\/_emdash\\/api\\/admin\\/comments\\/counts\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "counts",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/comments/counts.mjs",
			"pathname": "/_emdash/api/admin/comments/counts",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/comments/[id]/status",
			"pattern": "^\\/_emdash\\/api\\/admin\\/comments\\/([^/]+?)\\/status\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "status",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/comments/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/comments\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/comments/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/comments",
			"pattern": "^\\/_emdash\\/api\\/admin\\/comments\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/comments/index.mjs",
			"pathname": "/_emdash/api/admin/comments",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/hooks/exclusive/[hookName]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/hooks\\/exclusive\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "hooks",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "exclusive",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "hookName",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["hookName"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/_hookName_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/hooks/exclusive",
			"pattern": "^\\/_emdash\\/api\\/admin\\/hooks\\/exclusive\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "hooks",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "exclusive",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/index.mjs",
			"pathname": "/_emdash/api/admin/hooks/exclusive",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/media-usage/repair",
			"pattern": "^\\/_emdash\\/api\\/admin\\/media-usage\\/repair\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media-usage",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "repair",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/media-usage/repair.mjs",
			"pathname": "/_emdash/api/admin/media-usage/repair",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/oauth-clients/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/oauth-clients\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth-clients",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/oauth-clients",
			"pattern": "^\\/_emdash\\/api\\/admin\\/oauth-clients\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth-clients",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/index.mjs",
			"pathname": "/_emdash/api/admin/oauth-clients",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/marketplace/[id]/icon",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/icon\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "icon",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/icon.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/marketplace/[id]/install",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/install\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "install",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/marketplace/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/marketplace",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/index.mjs",
			"pathname": "/_emdash/api/admin/plugins/marketplace",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/registry/artifact",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/artifact\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "registry",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "artifact",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/artifact.mjs",
			"pathname": "/_emdash/api/admin/plugins/registry/artifact",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/registry/install",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/install\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "registry",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "install",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install.mjs",
			"pathname": "/_emdash/api/admin/plugins/registry/install",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/updates",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/updates\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "updates",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/updates.mjs",
			"pathname": "/_emdash/api/admin/plugins/updates",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/disable",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/disable\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "disable",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/disable.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/enable",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/enable\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "enable",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/enable.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/mcp",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/mcp\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "mcp",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/mcp.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/settings",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/settings\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/settings.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/uninstall",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/uninstall\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "uninstall",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/uninstall.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/update",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/update\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "update",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/update.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/index.mjs",
			"pathname": "/_emdash/api/admin/plugins",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/themes/marketplace/[id]/thumbnail",
			"pattern": "^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/([^/]+?)\\/thumbnail\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "themes",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "thumbnail",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/thumbnail.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/themes/marketplace/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "themes",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/themes/marketplace",
			"pattern": "^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "themes",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/index.mjs",
			"pathname": "/_emdash/api/admin/themes/marketplace",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/users/[id]/disable",
			"pattern": "^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/disable\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "users",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "disable",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/users/_id_/disable.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/users/[id]/enable",
			"pattern": "^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/enable\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "users",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "enable",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/users/_id_/enable.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/users/[id]/send-recovery",
			"pattern": "^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/send-recovery\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "users",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "send-recovery",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/users/_id_/send-recovery.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/users/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "users",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/users/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/users",
			"pattern": "^\\/_emdash\\/api\\/admin\\/users\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "users",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/users/index.mjs",
			"pathname": "/_emdash/api/admin/users",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/dev-bypass",
			"pattern": "^\\/_emdash\\/api\\/auth\\/dev-bypass\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "dev-bypass",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/dev-bypass.mjs",
			"pathname": "/_emdash/api/auth/dev-bypass",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/invite/accept",
			"pattern": "^\\/_emdash\\/api\\/auth\\/invite\\/accept\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "invite",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "accept",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/invite/accept.mjs",
			"pathname": "/_emdash/api/auth/invite/accept",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/invite/complete",
			"pattern": "^\\/_emdash\\/api\\/auth\\/invite\\/complete\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "invite",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "complete",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/invite/complete.mjs",
			"pathname": "/_emdash/api/auth/invite/complete",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/invite/register-options",
			"pattern": "^\\/_emdash\\/api\\/auth\\/invite\\/register-options\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "invite",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "register-options",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/invite/register-options.mjs",
			"pathname": "/_emdash/api/auth/invite/register-options",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/invite",
			"pattern": "^\\/_emdash\\/api\\/auth\\/invite\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "invite",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/invite/index.mjs",
			"pathname": "/_emdash/api/auth/invite",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/logout",
			"pattern": "^\\/_emdash\\/api\\/auth\\/logout\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "logout",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/logout.mjs",
			"pathname": "/_emdash/api/auth/logout",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/magic-link/send",
			"pattern": "^\\/_emdash\\/api\\/auth\\/magic-link\\/send\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "magic-link",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "send",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/magic-link/send.mjs",
			"pathname": "/_emdash/api/auth/magic-link/send",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/magic-link/verify",
			"pattern": "^\\/_emdash\\/api\\/auth\\/magic-link\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "magic-link",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/magic-link/verify.mjs",
			"pathname": "/_emdash/api/auth/magic-link/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/me",
			"pattern": "^\\/_emdash\\/api\\/auth\\/me\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "me",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/me.mjs",
			"pathname": "/_emdash/api/auth/me",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/mode",
			"pattern": "^\\/_emdash\\/api\\/auth\\/mode\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "mode",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/mode.mjs",
			"pathname": "/_emdash/api/auth/mode",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/oauth/[provider]/callback",
			"pattern": "^\\/_emdash\\/api\\/auth\\/oauth\\/([^/]+?)\\/callback\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "provider",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "callback",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["provider"],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_/callback.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/oauth/[provider]",
			"pattern": "^\\/_emdash\\/api\\/auth\\/oauth\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "provider",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["provider"],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey/options",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/options\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "options",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/options.mjs",
			"pathname": "/_emdash/api/auth/passkey/options",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey/register/options",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/register\\/options\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "register",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "options",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options.mjs",
			"pathname": "/_emdash/api/auth/passkey/register/options",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey/register/verify",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/register\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "register",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify.mjs",
			"pathname": "/_emdash/api/auth/passkey/register/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey/verify",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/verify.mjs",
			"pathname": "/_emdash/api/auth/passkey/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey/[id]",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/index.mjs",
			"pathname": "/_emdash/api/auth/passkey",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/signup/complete",
			"pattern": "^\\/_emdash\\/api\\/auth\\/signup\\/complete\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "signup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "complete",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/signup/complete.mjs",
			"pathname": "/_emdash/api/auth/signup/complete",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/signup/request",
			"pattern": "^\\/_emdash\\/api\\/auth\\/signup\\/request\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "signup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "request",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/signup/request.mjs",
			"pathname": "/_emdash/api/auth/signup/request",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/signup/verify",
			"pattern": "^\\/_emdash\\/api\\/auth\\/signup\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "signup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/signup/verify.mjs",
			"pathname": "/_emdash/api/auth/signup/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/comments/[collection]/[contentId]/reactions",
			"pattern": "^\\/_emdash\\/api\\/comments\\/([^/]+?)\\/([^/]+?)\\/reactions\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "contentId",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "reactions",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "contentId"],
			"component": "node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/reactions.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/comments/[collection]/[contentId]",
			"pattern": "^\\/_emdash\\/api\\/comments\\/([^/]+?)\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "contentId",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["collection", "contentId"],
			"component": "node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/authors",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/authors\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "authors",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/authors.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/trash",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/trash\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "trash",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/trash.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/compare",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/compare\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "compare",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/compare.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/discard-draft",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/discard-draft\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "discard-draft",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/discard-draft.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/duplicate",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/duplicate\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "duplicate",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/duplicate.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/permanent",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/permanent\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "permanent",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/permanent.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/preview-url",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/preview-url\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "preview-url",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/publish",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/publish\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "publish",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/publish.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/restore",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/restore\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "restore",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/restore.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/revisions",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/revisions\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "revisions",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/schedule",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/schedule\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "schedule",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/schedule.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/terms/[taxonomy]",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/terms\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomy",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": [
				"collection",
				"id",
				"taxonomy"
			],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/translations",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/translations\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "translations",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/translations.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/unpublish",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/unpublish\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "unpublish",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/unpublish.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["collection"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/dashboard",
			"pattern": "^\\/_emdash\\/api\\/dashboard\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "dashboard",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/dashboard.mjs",
			"pathname": "/_emdash/api/dashboard",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/dev/emails",
			"pattern": "^\\/_emdash\\/api\\/dev\\/emails\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "dev",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "emails",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/dev/emails.mjs",
			"pathname": "/_emdash/api/dev/emails",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/probe",
			"pattern": "^\\/_emdash\\/api\\/import\\/probe\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "probe",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/probe.mjs",
			"pathname": "/_emdash/api/import/probe",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress/analyze",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress\\/analyze\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "analyze",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress/analyze.mjs",
			"pathname": "/_emdash/api/import/wordpress/analyze",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress/execute",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress\\/execute\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "execute",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress/execute.mjs",
			"pathname": "/_emdash/api/import/wordpress/execute",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress/media",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress\\/media\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress/media.mjs",
			"pathname": "/_emdash/api/import/wordpress/media",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress/prepare",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress\\/prepare\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "prepare",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare.mjs",
			"pathname": "/_emdash/api/import/wordpress/prepare",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress/rewrite-urls",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress\\/rewrite-urls\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "rewrite-urls",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress/rewrite-urls.mjs",
			"pathname": "/_emdash/api/import/wordpress/rewrite-urls",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress-plugin/analyze",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/analyze\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress-plugin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "analyze",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze.mjs",
			"pathname": "/_emdash/api/import/wordpress-plugin/analyze",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress-plugin/callback",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/callback\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress-plugin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "callback",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/callback.mjs",
			"pathname": "/_emdash/api/import/wordpress-plugin/callback",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress-plugin/execute",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/execute\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress-plugin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "execute",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/execute.mjs",
			"pathname": "/_emdash/api/import/wordpress-plugin/execute",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/manifest",
			"pattern": "^\\/_emdash\\/api\\/manifest\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "manifest",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/manifest.mjs",
			"pathname": "/_emdash/api/manifest",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/mcp",
			"pattern": "^\\/_emdash\\/api\\/mcp\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "mcp",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/mcp.mjs",
			"pathname": "/_emdash/api/mcp",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/file/[...key]",
			"pattern": "^\\/_emdash\\/api\\/media\\/file(?:\\/(.*?))?\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "file",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "...key",
					"dynamic": true,
					"spread": true
				}]
			],
			"params": ["...key"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/file/_...key_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/providers/[providerId]/[itemId]",
			"pattern": "^\\/_emdash\\/api\\/media\\/providers\\/([^/]+?)\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "providers",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "providerId",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "itemId",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["providerId", "itemId"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/_itemId_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/providers/[providerId]",
			"pattern": "^\\/_emdash\\/api\\/media\\/providers\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "providers",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "providerId",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["providerId"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/providers",
			"pattern": "^\\/_emdash\\/api\\/media\\/providers\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "providers",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/media/providers/index.mjs",
			"pathname": "/_emdash/api/media/providers",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/upload-url",
			"pattern": "^\\/_emdash\\/api\\/media\\/upload-url\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "upload-url",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/media/upload-url.mjs",
			"pathname": "/_emdash/api/media/upload-url",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/[id]/confirm",
			"pattern": "^\\/_emdash\\/api\\/media\\/([^/]+?)\\/confirm\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "confirm",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/_id_/confirm.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/[id]/usage",
			"pattern": "^\\/_emdash\\/api\\/media\\/([^/]+?)\\/usage\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "usage",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/_id_/usage.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/[id]",
			"pattern": "^\\/_emdash\\/api\\/media\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media",
			"pattern": "^\\/_emdash\\/api\\/media\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/media.mjs",
			"pathname": "/_emdash/api/media",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus/[name]/items/[id]",
			"pattern": "^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/items\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "items",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus/[name]/items",
			"pattern": "^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/items\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "items",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/_name_/items.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus/[name]/reorder",
			"pattern": "^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/reorder\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "reorder",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/_name_/reorder.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus/[name]/translations",
			"pattern": "^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/translations\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "translations",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/_name_/translations.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus/[name]",
			"pattern": "^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/_name_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus",
			"pattern": "^\\/_emdash\\/api\\/menus\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/index.mjs",
			"pathname": "/_emdash/api/menus",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/device/authorize",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/device\\/authorize\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "device",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "authorize",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/device/authorize.mjs",
			"pathname": "/_emdash/api/oauth/device/authorize",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/device/code",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/device\\/code\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "device",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "code",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/device/code.mjs",
			"pathname": "/_emdash/api/oauth/device/code",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/device/token",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/device\\/token\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "device",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "token",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/device/token.mjs",
			"pathname": "/_emdash/api/oauth/device/token",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/register",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/register\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "register",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/register.mjs",
			"pathname": "/_emdash/api/oauth/register",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/token/refresh",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/token\\/refresh\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "token",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "refresh",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/token/refresh.mjs",
			"pathname": "/_emdash/api/oauth/token/refresh",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/token/revoke",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/token\\/revoke\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "token",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "revoke",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/token/revoke.mjs",
			"pathname": "/_emdash/api/oauth/token/revoke",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/token",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/token\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "token",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/token.mjs",
			"pathname": "/_emdash/api/oauth/token",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/plugins/[pluginId]/[...path]",
			"pattern": "^\\/_emdash\\/api\\/plugins\\/([^/]+?)(?:\\/(.*?))?\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "pluginId",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "...path",
					"dynamic": true,
					"spread": true
				}]
			],
			"params": ["pluginId", "...path"],
			"component": "node_modules/emdash/dist/astro/routes/api/plugins/_pluginId_/_...path_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/redirects/404s/summary",
			"pattern": "^\\/_emdash\\/api\\/redirects\\/404s\\/summary\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "redirects",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "404s",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "summary",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/redirects/404s/summary.mjs",
			"pathname": "/_emdash/api/redirects/404s/summary",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/redirects/404s",
			"pattern": "^\\/_emdash\\/api\\/redirects\\/404s\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "redirects",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "404s",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/redirects/404s/index.mjs",
			"pathname": "/_emdash/api/redirects/404s",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/redirects/[id]",
			"pattern": "^\\/_emdash\\/api\\/redirects\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "redirects",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/redirects/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/redirects",
			"pattern": "^\\/_emdash\\/api\\/redirects\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "redirects",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/redirects/index.mjs",
			"pathname": "/_emdash/api/redirects",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/revisions/[revisionId]/restore",
			"pattern": "^\\/_emdash\\/api\\/revisions\\/([^/]+?)\\/restore\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "revisions",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "revisionId",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "restore",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["revisionId"],
			"component": "node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/revisions/[revisionId]",
			"pattern": "^\\/_emdash\\/api\\/revisions\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "revisions",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "revisionId",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["revisionId"],
			"component": "node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections/[slug]/fields/reorder",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/reorder\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "fields",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "reorder",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/reorder.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections/[slug]/fields/[fieldSlug]",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "fields",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "fieldSlug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug", "fieldSlug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/_fieldSlug_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections/[slug]/fields",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "fields",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections/[slug]",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/index.mjs",
			"pathname": "/_emdash/api/schema/collections",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/orphans/[slug]",
			"pattern": "^\\/_emdash\\/api\\/schema\\/orphans\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "orphans",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/orphans/_slug_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/orphans",
			"pattern": "^\\/_emdash\\/api\\/schema\\/orphans\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "orphans",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/orphans/index.mjs",
			"pathname": "/_emdash/api/schema/orphans",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema",
			"pattern": "^\\/_emdash\\/api\\/schema\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/index.mjs",
			"pathname": "/_emdash/api/schema",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/search/enable",
			"pattern": "^\\/_emdash\\/api\\/search\\/enable\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "search",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "enable",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/search/enable.mjs",
			"pathname": "/_emdash/api/search/enable",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/search/rebuild",
			"pattern": "^\\/_emdash\\/api\\/search\\/rebuild\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "search",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "rebuild",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/search/rebuild.mjs",
			"pathname": "/_emdash/api/search/rebuild",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/search/stats",
			"pattern": "^\\/_emdash\\/api\\/search\\/stats\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "search",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "stats",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/search/stats.mjs",
			"pathname": "/_emdash/api/search/stats",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/search/suggest",
			"pattern": "^\\/_emdash\\/api\\/search\\/suggest\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "search",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "suggest",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/search/suggest.mjs",
			"pathname": "/_emdash/api/search/suggest",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/search",
			"pattern": "^\\/_emdash\\/api\\/search\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "search",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/search/index.mjs",
			"pathname": "/_emdash/api/search",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/sections/[slug]",
			"pattern": "^\\/_emdash\\/api\\/sections\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "sections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/sections/_slug_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/sections",
			"pattern": "^\\/_emdash\\/api\\/sections\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "sections",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/sections/index.mjs",
			"pathname": "/_emdash/api/sections",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/backups/archives/[name]",
			"pattern": "^\\/_emdash\\/api\\/settings\\/backups\\/archives\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "backups",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "archives",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/backups/archives/_name_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/backups/archives",
			"pattern": "^\\/_emdash\\/api\\/settings\\/backups\\/archives\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "backups",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "archives",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index.mjs",
			"pathname": "/_emdash/api/settings/backups/archives",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/backups/export",
			"pattern": "^\\/_emdash\\/api\\/settings\\/backups\\/export\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "backups",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "export",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/backups/export.mjs",
			"pathname": "/_emdash/api/settings/backups/export",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/backups",
			"pattern": "^\\/_emdash\\/api\\/settings\\/backups\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "backups",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/backups/index.mjs",
			"pathname": "/_emdash/api/settings/backups",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/email",
			"pattern": "^\\/_emdash\\/api\\/settings\\/email\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "email",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/email.mjs",
			"pathname": "/_emdash/api/settings/email",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings",
			"pattern": "^\\/_emdash\\/api\\/settings\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings.mjs",
			"pathname": "/_emdash/api/settings",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup/admin/verify",
			"pattern": "^\\/_emdash\\/api\\/setup\\/admin\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/admin-verify.mjs",
			"pathname": "/_emdash/api/setup/admin/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup/admin",
			"pattern": "^\\/_emdash\\/api\\/setup\\/admin\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/admin.mjs",
			"pathname": "/_emdash/api/setup/admin",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup/dev-bypass",
			"pattern": "^\\/_emdash\\/api\\/setup\\/dev-bypass\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "dev-bypass",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/dev-bypass.mjs",
			"pathname": "/_emdash/api/setup/dev-bypass",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup/dev-reset",
			"pattern": "^\\/_emdash\\/api\\/setup\\/dev-reset\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "dev-reset",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/dev-reset.mjs",
			"pathname": "/_emdash/api/setup/dev-reset",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup/status",
			"pattern": "^\\/_emdash\\/api\\/setup\\/status\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "status",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/status.mjs",
			"pathname": "/_emdash/api/setup/status",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup",
			"pattern": "^\\/_emdash\\/api\\/setup\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/index.mjs",
			"pathname": "/_emdash/api/setup",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/snapshot",
			"pattern": "^\\/_emdash\\/api\\/snapshot\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "snapshot",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/snapshot.mjs",
			"pathname": "/_emdash/api/snapshot",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/[name]/terms/[slug]/translations",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/([^/]+?)\\/translations\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "translations",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name", "slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/[name]/terms/[slug]",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name", "slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/[name]/terms",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/index.mjs",
			"pathname": "/_emdash/api/taxonomies",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/themes/preview",
			"pattern": "^\\/_emdash\\/api\\/themes\\/preview\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "themes",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "preview",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/themes/preview.mjs",
			"pathname": "/_emdash/api/themes/preview",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/typegen",
			"pattern": "^\\/_emdash\\/api\\/typegen\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "typegen",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/typegen.mjs",
			"pathname": "/_emdash/api/typegen",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-areas/[name]/reorder",
			"pattern": "^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/reorder\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-areas",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "reorder",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/reorder.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-areas/[name]/widgets/[id]",
			"pattern": "^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/widgets\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-areas",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "widgets",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-areas/[name]/widgets",
			"pattern": "^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/widgets\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-areas",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "widgets",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-areas/[name]",
			"pattern": "^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-areas",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-areas/_name_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-areas",
			"pattern": "^\\/_emdash\\/api\\/widget-areas\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-areas",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-areas/index.mjs",
			"pathname": "/_emdash/api/widget-areas",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-components",
			"pattern": "^\\/_emdash\\/api\\/widget-components\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-components",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-components.mjs",
			"pathname": "/_emdash/api/widget-components",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/oauth/authorize",
			"pattern": "^\\/_emdash\\/oauth\\/authorize\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "authorize",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/authorize.mjs",
			"pathname": "/_emdash/oauth/authorize",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/.well-known/oauth-authorization-server/_emdash",
			"pattern": "^\\/\\.well-known\\/oauth-authorization-server\\/_emdash\\/?$",
			"segments": [
				[{
					"content": ".well-known",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth-authorization-server",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/well-known/oauth-authorization-server.mjs",
			"pathname": "/.well-known/oauth-authorization-server/_emdash",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/.well-known/oauth-protected-resource",
			"pattern": "^\\/\\.well-known\\/oauth-protected-resource\\/?$",
			"segments": [[{
				"content": ".well-known",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "oauth-protected-resource",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/well-known/oauth-protected-resource.mjs",
			"pathname": "/.well-known/oauth-protected-resource",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/404",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/404\\/?$",
			"segments": [[{
				"content": "404",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/404.astro",
			"pathname": "/404",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/category/[slug]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/category\\/([^/]+?)\\/?$",
			"segments": [[{
				"content": "category",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "slug",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["slug"],
			"component": "src/pages/category/[slug].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/pages/[slug]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/pages\\/([^/]+?)\\/?$",
			"segments": [[{
				"content": "pages",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "slug",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["slug"],
			"component": "src/pages/pages/[slug].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/posts/[slug]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/posts\\/([^/]+?)\\/?$",
			"segments": [[{
				"content": "posts",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "slug",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["slug"],
			"component": "src/pages/posts/[slug].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/posts",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/posts\\/?$",
			"segments": [[{
				"content": "posts",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/posts/index.astro",
			"pathname": "/posts",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/robots.txt",
			"pattern": "^\\/robots\\.txt$",
			"segments": [[{
				"content": "robots.txt",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/robots.txt.mjs",
			"pathname": "/robots.txt",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/rss.xml",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/rss\\.xml$",
			"segments": [[{
				"content": "rss.xml",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/rss.xml.ts",
			"pathname": "/rss.xml",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/search",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/search\\/?$",
			"segments": [[{
				"content": "search",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/search.astro",
			"pathname": "/search",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/sitemap.xml",
			"pattern": "^\\/sitemap\\.xml$",
			"segments": [[{
				"content": "sitemap.xml",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/sitemap.xml.mjs",
			"pathname": "/sitemap.xml",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/tag/[slug]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/tag\\/([^/]+?)\\/?$",
			"segments": [[{
				"content": "tag",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "slug",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["slug"],
			"component": "src/pages/tag/[slug].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/sitemap-[collection].xml",
			"pattern": "^\\/sitemap-([^/]+?)\\.xml$",
			"segments": [[
				{
					"content": "sitemap-",
					"dynamic": false,
					"spread": false
				},
				{
					"content": "collection",
					"dynamic": true,
					"spread": false
				},
				{
					"content": ".xml",
					"dynamic": false,
					"spread": false
				}
			]],
			"params": ["collection"],
			"component": "node_modules/emdash/dist/astro/routes/sitemap-_collection_.xml.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/$",
			"segments": [],
			"params": [],
			"component": "src/pages/index.astro",
			"pathname": "/",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	}
].map(deserializeRouteInfo);
//#endregion
//#region \0virtual:astro:pages
var _page0 = () => import("./image-endpoint_CrWXIHWw.mjs");
var _page1 = () => import("./auth_LEtRi63e.mjs");
var _page2 = () => import("./admin_BDqqHsUA.mjs");
var _page3 = () => import("./_domain__Ca-IodHl.mjs");
var _page4 = () => import("./index_BNFOBfO8.mjs");
var _page5 = () => import("./_id__CjDmF7Oy.mjs");
var _page6 = () => import("./index_BWcg6qPm.mjs");
var _page7 = () => import("./reorder_B_SAudhT.mjs");
var _page8 = () => import("./usage_DLxziG1L.mjs");
var _page9 = () => import("./_slug__Kh4c8-UJ.mjs");
var _page10 = () => import("./index_Br8hAho_.mjs");
var _page11 = () => import("./translations_Di1TpBY6.mjs");
var _page12 = () => import("./index_GbxM3gSW.mjs");
var _page13 = () => import("./index_U9hBKV_7.mjs");
var _page14 = () => import("./bulk_eAYKSqTT.mjs");
var _page15 = () => import("./counts_BN9_n8YK.mjs");
var _page16 = () => import("./status_Bt-D2pnn.mjs");
var _page17 = () => import("./_id__BgaW91l8.mjs");
var _page18 = () => import("./index_CleoFeCd.mjs");
var _page19 = () => import("./_hookName__18Jj1F8t.mjs");
var _page20 = () => import("./index_CZ_wY1tm.mjs");
var _page21 = () => import("./repair_BMUMGI9R.mjs");
var _page22 = () => import("./_id__BV7pqC1u.mjs");
var _page23 = () => import("./index_WoE3VJ-H.mjs");
var _page24 = () => import("./icon_Dn8TFIve.mjs");
var _page25 = () => import("./install_Dhd7VRy7.mjs");
var _page26 = () => import("./index_DX5wwgze.mjs");
var _page27 = () => import("./index_DQZ6aJVk.mjs");
var _page28 = () => import("./artifact_Bq-5Rw8l.mjs");
var _page29 = () => import("./install_mCetrQrW.mjs");
var _page30 = () => import("./updates_DIV64owb.mjs");
var _page31 = () => import("./disable_CLo5EJDf.mjs");
var _page32 = () => import("./enable_BbJDOwsW.mjs");
var _page33 = () => import("./mcp_BnRcOsNg.mjs");
var _page34 = () => import("./settings_Ct9hXYf0.mjs");
var _page35 = () => import("./uninstall_C_Kak_xS.mjs");
var _page36 = () => import("./update_B2jgakf_.mjs");
var _page37 = () => import("./index_jQ41p1vT.mjs");
var _page38 = () => import("./index_CKmcc5WC.mjs");
var _page39 = () => import("./thumbnail_CMosSeY4.mjs");
var _page40 = () => import("./index_ImmdLPMf.mjs");
var _page41 = () => import("./index_C53IamsK.mjs");
var _page42 = () => import("./disable_C0z7Kh91.mjs");
var _page43 = () => import("./enable_CuabP71-.mjs");
var _page44 = () => import("./send-recovery_1bYkg8Qt.mjs");
var _page45 = () => import("./index_CA54UwKp.mjs");
var _page46 = () => import("./index_Bo8iG7uz.mjs");
var _page47 = () => import("./dev-bypass_CLDUasfc.mjs");
var _page48 = () => import("./accept_BnapDNGU.mjs");
var _page49 = () => import("./complete_tVrDGk3S.mjs");
var _page50 = () => import("./register-options_DdvkD7Jz.mjs");
var _page51 = () => import("./index_B-eQ3f2P.mjs");
var _page52 = () => import("./logout_8m61nxJx.mjs");
var _page53 = () => import("./send_D-aGhiAA.mjs");
var _page54 = () => import("./verify_BL9i-Vie.mjs");
var _page55 = () => import("./me_BWU8eRm9.mjs");
var _page56 = () => import("./mode_vptULOkN.mjs");
var _page57 = () => import("./callback_f6_ZZy9o.mjs");
var _page58 = () => import("./_provider__htFMTcyX.mjs");
var _page59 = () => import("./options_Bw8JP8ab.mjs");
var _page60 = () => import("./options_B_vVLlzt.mjs");
var _page61 = () => import("./verify_Ci-BVwyR.mjs");
var _page62 = () => import("./verify_ChE3aLBZ.mjs");
var _page63 = () => import("./_id___qDv-8rF.mjs");
var _page64 = () => import("./index_BTVsE7U3.mjs");
var _page65 = () => import("./complete_JdSqUH4v.mjs");
var _page66 = () => import("./request_DR-MdHrN.mjs");
var _page67 = () => import("./verify_CkAe3dy5.mjs");
var _page68 = () => import("./reactions_eahEbFUj.mjs");
var _page69 = () => import("./index_DmKzQIE5.mjs");
var _page70 = () => import("./authors_Cm-wA5lv.mjs");
var _page71 = () => import("./trash_C1KMRo5y.mjs");
var _page72 = () => import("./compare_Dd9KHluf.mjs");
var _page73 = () => import("./discard-draft_D6eFOsKD.mjs");
var _page74 = () => import("./duplicate_B4O16h78.mjs");
var _page75 = () => import("./permanent_wOuornSQ.mjs");
var _page76 = () => import("./preview-url_B1eZusS3.mjs");
var _page77 = () => import("./publish_Bv6qmTsU.mjs");
var _page78 = () => import("./restore_DjJP3LJ1.mjs");
var _page79 = () => import("./revisions_Bnl84CpB.mjs");
var _page80 = () => import("./schedule_D9OrQZEB.mjs");
var _page81 = () => import("./_taxonomy__DYtpsEve.mjs");
var _page82 = () => import("./translations_oGsWHp8r.mjs");
var _page83 = () => import("./unpublish_CW0jiS45.mjs");
var _page84 = () => import("./_id__DRKvb-DU.mjs");
var _page85 = () => import("./index_Bqt5gMjG.mjs");
var _page86 = () => import("./dashboard_D3vGltAk.mjs");
var _page87 = () => import("./emails_yezHG2S2.mjs");
var _page88 = () => import("./probe_Ds136kHw.mjs");
var _page89 = () => import("./analyze_DB5oDPTA.mjs");
var _page90 = () => import("./execute_B8kQiDNa.mjs");
var _page91 = () => import("./media_CRxcGBZT.mjs");
var _page92 = () => import("./prepare_Cw8dJmhj.mjs");
var _page93 = () => import("./rewrite-urls_gD5wt3kM.mjs");
var _page94 = () => import("./analyze_Bu4yg3KI.mjs");
var _page95 = () => import("./callback_DNpf2W8O.mjs");
var _page96 = () => import("./execute_DgwkGGmi.mjs");
var _page97 = () => import("./manifest_tK1X9AMg.mjs");
var _page98 = () => import("./mcp_BXhL4nPB.mjs");
var _page99 = () => import("./_.._Cx05jelA.mjs");
var _page100 = () => import("./_itemId__pkzk1TBU.mjs");
var _page101 = () => import("./index_TDrL6FRV.mjs");
var _page102 = () => import("./index_eQKI3__F.mjs");
var _page103 = () => import("./upload-url_D2-y89_4.mjs");
var _page104 = () => import("./confirm_BQhXjJ5s.mjs");
var _page105 = () => import("./usage_luXxjB75.mjs");
var _page106 = () => import("./_id__BVLgxaZ5.mjs");
var _page107 = () => import("./media_CPB-IG45.mjs");
var _page108 = () => import("./_id__o-jtjGMv.mjs");
var _page109 = () => import("./items_Dr-JT4aF.mjs");
var _page110 = () => import("./reorder_Bi8E9Pow.mjs");
var _page111 = () => import("./translations_DWrextZ8.mjs");
var _page112 = () => import("./_name__CIg1aIOI.mjs");
var _page113 = () => import("./index_C-0plP4P.mjs");
var _page114 = () => import("./authorize_fuHgfY-M.mjs");
var _page115 = () => import("./code_TEpHUPKo.mjs");
var _page116 = () => import("./token_Dy0PknSv.mjs");
var _page117 = () => import("./register_CoR4SKJd.mjs");
var _page118 = () => import("./refresh_Ip5q9C0K.mjs");
var _page119 = () => import("./revoke_BFyqt3VO.mjs");
var _page120 = () => import("./token_BRiSCPBI.mjs");
var _page121 = () => import("./_.._CFKVvk_4.mjs");
var _page122 = () => import("./summary_BBoMdVs9.mjs");
var _page123 = () => import("./index_BG2yX59E.mjs");
var _page124 = () => import("./_id__4hgMxceT.mjs");
var _page125 = () => import("./index_Cc4DU4iS.mjs");
var _page126 = () => import("./restore_1SWHVGjs.mjs");
var _page127 = () => import("./index_CxDRAKVc.mjs");
var _page128 = () => import("./reorder_B7sPhMkZ.mjs");
var _page129 = () => import("./_fieldSlug__C_R-Ln_O.mjs");
var _page130 = () => import("./index_B9FCBm6F.mjs");
var _page131 = () => import("./index_Kv6ldgd2.mjs");
var _page132 = () => import("./index_C7rCULeL.mjs");
var _page133 = () => import("./_slug__PkMKmKr2.mjs");
var _page134 = () => import("./index_DRyayUzI.mjs");
var _page135 = () => import("./index_BMKB8iUJ.mjs");
var _page136 = () => import("./enable_CUlWcr6H.mjs");
var _page137 = () => import("./rebuild_B-yTF3_-.mjs");
var _page138 = () => import("./stats_DTsSt9w8.mjs");
var _page139 = () => import("./suggest_Dt0I-KkH.mjs");
var _page140 = () => import("./index_CZAVK_uj.mjs");
var _page141 = () => import("./_slug__Bnz9Yyjw.mjs");
var _page142 = () => import("./index_Bj96G7Ku.mjs");
var _page143 = () => import("./_name__D6ormbny.mjs");
var _page144 = () => import("./index_CBi85kEd.mjs");
var _page145 = () => import("./export_BHLvIrHz.mjs");
var _page146 = () => import("./index_CE6pY6xW.mjs");
var _page147 = () => import("./email_4jbxfQOf.mjs");
var _page148 = () => import("./settings_Cbad80YH.mjs");
var _page149 = () => import("./admin-verify_DE8JN5hG.mjs");
var _page150 = () => import("./admin_Bh_Lzqap.mjs");
var _page151 = () => import("./dev-bypass_IRr23Wk7.mjs");
var _page152 = () => import("./dev-reset_Blqv5KU-.mjs");
var _page153 = () => import("./status_CbgWnJHF.mjs");
var _page154 = () => import("./index_C8MvZVu4.mjs");
var _page155 = () => import("./snapshot_Df6XFlsr.mjs");
var _page156 = () => import("./translations_Dz93sTJg.mjs");
var _page157 = () => import("./_slug__CGAWjPt_.mjs");
var _page158 = () => import("./index_D7-bICPC.mjs");
var _page159 = () => import("./index_2oRuYRps.mjs");
var _page160 = () => import("./preview_BtO2VBM9.mjs");
var _page161 = () => import("./typegen_77aCz8cG.mjs");
var _page162 = () => import("./reorder_0Pu7uHst.mjs");
var _page163 = () => import("./_id__3dcR5UFE.mjs");
var _page164 = () => import("./widgets_OxkFneoi.mjs");
var _page165 = () => import("./_name__DFfUQ1I-.mjs");
var _page166 = () => import("./index_SRdHYOml.mjs");
var _page167 = () => import("./widget-components_DV5s7qea.mjs");
var _page168 = () => import("./authorize_CpIUvWgE.mjs");
var _page169 = () => import("./oauth-authorization-server_FE9d0uce.mjs");
var _page170 = () => import("./oauth-protected-resource_D00vtoqA.mjs");
var _page171 = () => import("./404_BmChgN7e.mjs");
var _page172 = () => import("./_slug__CGcAOGkv.mjs");
var _page173 = () => import("./_slug__Dn6ilDeR.mjs");
var _page174 = () => import("./_slug__CNMJCngW.mjs");
var _page175 = () => import("./index_U3PQtdyF.mjs");
var _page176 = () => import("./robots_vOnWx9Fo.mjs");
var _page177 = () => import("./rss_DwfPVC30.mjs");
var _page178 = () => import("./search_sfv8fSzk.mjs");
var _page179 = () => import("./sitemap_0_y85KLM.mjs");
var _page180 = () => import("./_slug__BdQhH54S.mjs");
var _page181 = () => import("./sitemap-_collection__CxHzORI3.mjs");
var _page182 = () => import("./index_BxJXDgbm.mjs");
var pageMap = /* @__PURE__ */ new Map([
	["node_modules/emdash/dist/astro/image-endpoint.mjs", _page0],
	["node_modules/emdash/dist/astro/routes/api/well-known/auth.mjs", _page1],
	["node_modules/emdash/src/astro/routes/admin.astro", _page2],
	["node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/_domain_.mjs", _page3],
	["node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/index.mjs", _page4],
	["node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_.mjs", _page5],
	["node_modules/emdash/dist/astro/routes/api/admin/api-tokens/index.mjs", _page6],
	["node_modules/emdash/dist/astro/routes/api/admin/byline-fields/reorder.mjs", _page7],
	["node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage.mjs", _page8],
	["node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_.mjs", _page9],
	["node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index.mjs", _page10],
	["node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations.mjs", _page11],
	["node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index.mjs", _page12],
	["node_modules/emdash/dist/astro/routes/api/admin/bylines/index.mjs", _page13],
	["node_modules/emdash/dist/astro/routes/api/admin/comments/bulk.mjs", _page14],
	["node_modules/emdash/dist/astro/routes/api/admin/comments/counts.mjs", _page15],
	["node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status.mjs", _page16],
	["node_modules/emdash/dist/astro/routes/api/admin/comments/_id_.mjs", _page17],
	["node_modules/emdash/dist/astro/routes/api/admin/comments/index.mjs", _page18],
	["node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/_hookName_.mjs", _page19],
	["node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/index.mjs", _page20],
	["node_modules/emdash/dist/astro/routes/api/admin/media-usage/repair.mjs", _page21],
	["node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/_id_.mjs", _page22],
	["node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/index.mjs", _page23],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/icon.mjs", _page24],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install.mjs", _page25],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/index.mjs", _page26],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/index.mjs", _page27],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/artifact.mjs", _page28],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install.mjs", _page29],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/updates.mjs", _page30],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/disable.mjs", _page31],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/enable.mjs", _page32],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/mcp.mjs", _page33],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/settings.mjs", _page34],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/uninstall.mjs", _page35],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/update.mjs", _page36],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/index.mjs", _page37],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/index.mjs", _page38],
	["node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/thumbnail.mjs", _page39],
	["node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/index.mjs", _page40],
	["node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/index.mjs", _page41],
	["node_modules/emdash/dist/astro/routes/api/admin/users/_id_/disable.mjs", _page42],
	["node_modules/emdash/dist/astro/routes/api/admin/users/_id_/enable.mjs", _page43],
	["node_modules/emdash/dist/astro/routes/api/admin/users/_id_/send-recovery.mjs", _page44],
	["node_modules/emdash/dist/astro/routes/api/admin/users/_id_/index.mjs", _page45],
	["node_modules/emdash/dist/astro/routes/api/admin/users/index.mjs", _page46],
	["node_modules/emdash/dist/astro/routes/api/auth/dev-bypass.mjs", _page47],
	["node_modules/emdash/dist/astro/routes/api/auth/invite/accept.mjs", _page48],
	["node_modules/emdash/dist/astro/routes/api/auth/invite/complete.mjs", _page49],
	["node_modules/emdash/dist/astro/routes/api/auth/invite/register-options.mjs", _page50],
	["node_modules/emdash/dist/astro/routes/api/auth/invite/index.mjs", _page51],
	["node_modules/emdash/dist/astro/routes/api/auth/logout.mjs", _page52],
	["node_modules/emdash/dist/astro/routes/api/auth/magic-link/send.mjs", _page53],
	["node_modules/emdash/dist/astro/routes/api/auth/magic-link/verify.mjs", _page54],
	["node_modules/emdash/dist/astro/routes/api/auth/me.mjs", _page55],
	["node_modules/emdash/dist/astro/routes/api/auth/mode.mjs", _page56],
	["node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_/callback.mjs", _page57],
	["node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_.mjs", _page58],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/options.mjs", _page59],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options.mjs", _page60],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify.mjs", _page61],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/verify.mjs", _page62],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/_id_.mjs", _page63],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/index.mjs", _page64],
	["node_modules/emdash/dist/astro/routes/api/auth/signup/complete.mjs", _page65],
	["node_modules/emdash/dist/astro/routes/api/auth/signup/request.mjs", _page66],
	["node_modules/emdash/dist/astro/routes/api/auth/signup/verify.mjs", _page67],
	["node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/reactions.mjs", _page68],
	["node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/index.mjs", _page69],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/authors.mjs", _page70],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/trash.mjs", _page71],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/compare.mjs", _page72],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/discard-draft.mjs", _page73],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/duplicate.mjs", _page74],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/permanent.mjs", _page75],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url.mjs", _page76],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/publish.mjs", _page77],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/restore.mjs", _page78],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions.mjs", _page79],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/schedule.mjs", _page80],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_.mjs", _page81],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/translations.mjs", _page82],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/unpublish.mjs", _page83],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_.mjs", _page84],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/index.mjs", _page85],
	["node_modules/emdash/dist/astro/routes/api/dashboard.mjs", _page86],
	["node_modules/emdash/dist/astro/routes/api/dev/emails.mjs", _page87],
	["node_modules/emdash/dist/astro/routes/api/import/probe.mjs", _page88],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress/analyze.mjs", _page89],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress/execute.mjs", _page90],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress/media.mjs", _page91],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare.mjs", _page92],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress/rewrite-urls.mjs", _page93],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze.mjs", _page94],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/callback.mjs", _page95],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/execute.mjs", _page96],
	["node_modules/emdash/dist/astro/routes/api/manifest.mjs", _page97],
	["node_modules/emdash/dist/astro/routes/api/mcp.mjs", _page98],
	["node_modules/emdash/dist/astro/routes/api/media/file/_...key_.mjs", _page99],
	["node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/_itemId_.mjs", _page100],
	["node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/index.mjs", _page101],
	["node_modules/emdash/dist/astro/routes/api/media/providers/index.mjs", _page102],
	["node_modules/emdash/dist/astro/routes/api/media/upload-url.mjs", _page103],
	["node_modules/emdash/dist/astro/routes/api/media/_id_/confirm.mjs", _page104],
	["node_modules/emdash/dist/astro/routes/api/media/_id_/usage.mjs", _page105],
	["node_modules/emdash/dist/astro/routes/api/media/_id_.mjs", _page106],
	["node_modules/emdash/dist/astro/routes/api/media.mjs", _page107],
	["node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_.mjs", _page108],
	["node_modules/emdash/dist/astro/routes/api/menus/_name_/items.mjs", _page109],
	["node_modules/emdash/dist/astro/routes/api/menus/_name_/reorder.mjs", _page110],
	["node_modules/emdash/dist/astro/routes/api/menus/_name_/translations.mjs", _page111],
	["node_modules/emdash/dist/astro/routes/api/menus/_name_.mjs", _page112],
	["node_modules/emdash/dist/astro/routes/api/menus/index.mjs", _page113],
	["node_modules/emdash/dist/astro/routes/api/oauth/device/authorize.mjs", _page114],
	["node_modules/emdash/dist/astro/routes/api/oauth/device/code.mjs", _page115],
	["node_modules/emdash/dist/astro/routes/api/oauth/device/token.mjs", _page116],
	["node_modules/emdash/dist/astro/routes/api/oauth/register.mjs", _page117],
	["node_modules/emdash/dist/astro/routes/api/oauth/token/refresh.mjs", _page118],
	["node_modules/emdash/dist/astro/routes/api/oauth/token/revoke.mjs", _page119],
	["node_modules/emdash/dist/astro/routes/api/oauth/token.mjs", _page120],
	["node_modules/emdash/dist/astro/routes/api/plugins/_pluginId_/_...path_.mjs", _page121],
	["node_modules/emdash/dist/astro/routes/api/redirects/404s/summary.mjs", _page122],
	["node_modules/emdash/dist/astro/routes/api/redirects/404s/index.mjs", _page123],
	["node_modules/emdash/dist/astro/routes/api/redirects/_id_.mjs", _page124],
	["node_modules/emdash/dist/astro/routes/api/redirects/index.mjs", _page125],
	["node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore.mjs", _page126],
	["node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/index.mjs", _page127],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/reorder.mjs", _page128],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/_fieldSlug_.mjs", _page129],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/index.mjs", _page130],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/index.mjs", _page131],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/index.mjs", _page132],
	["node_modules/emdash/dist/astro/routes/api/schema/orphans/_slug_.mjs", _page133],
	["node_modules/emdash/dist/astro/routes/api/schema/orphans/index.mjs", _page134],
	["node_modules/emdash/dist/astro/routes/api/schema/index.mjs", _page135],
	["node_modules/emdash/dist/astro/routes/api/search/enable.mjs", _page136],
	["node_modules/emdash/dist/astro/routes/api/search/rebuild.mjs", _page137],
	["node_modules/emdash/dist/astro/routes/api/search/stats.mjs", _page138],
	["node_modules/emdash/dist/astro/routes/api/search/suggest.mjs", _page139],
	["node_modules/emdash/dist/astro/routes/api/search/index.mjs", _page140],
	["node_modules/emdash/dist/astro/routes/api/sections/_slug_.mjs", _page141],
	["node_modules/emdash/dist/astro/routes/api/sections/index.mjs", _page142],
	["node_modules/emdash/dist/astro/routes/api/settings/backups/archives/_name_.mjs", _page143],
	["node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index.mjs", _page144],
	["node_modules/emdash/dist/astro/routes/api/settings/backups/export.mjs", _page145],
	["node_modules/emdash/dist/astro/routes/api/settings/backups/index.mjs", _page146],
	["node_modules/emdash/dist/astro/routes/api/settings/email.mjs", _page147],
	["node_modules/emdash/dist/astro/routes/api/settings.mjs", _page148],
	["node_modules/emdash/dist/astro/routes/api/setup/admin-verify.mjs", _page149],
	["node_modules/emdash/dist/astro/routes/api/setup/admin.mjs", _page150],
	["node_modules/emdash/dist/astro/routes/api/setup/dev-bypass.mjs", _page151],
	["node_modules/emdash/dist/astro/routes/api/setup/dev-reset.mjs", _page152],
	["node_modules/emdash/dist/astro/routes/api/setup/status.mjs", _page153],
	["node_modules/emdash/dist/astro/routes/api/setup/index.mjs", _page154],
	["node_modules/emdash/dist/astro/routes/api/snapshot.mjs", _page155],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations.mjs", _page156],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_.mjs", _page157],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/index.mjs", _page158],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/index.mjs", _page159],
	["node_modules/emdash/dist/astro/routes/api/themes/preview.mjs", _page160],
	["node_modules/emdash/dist/astro/routes/api/typegen.mjs", _page161],
	["node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/reorder.mjs", _page162],
	["node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_.mjs", _page163],
	["node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets.mjs", _page164],
	["node_modules/emdash/dist/astro/routes/api/widget-areas/_name_.mjs", _page165],
	["node_modules/emdash/dist/astro/routes/api/widget-areas/index.mjs", _page166],
	["node_modules/emdash/dist/astro/routes/api/widget-components.mjs", _page167],
	["node_modules/emdash/dist/astro/routes/api/oauth/authorize.mjs", _page168],
	["node_modules/emdash/dist/astro/routes/api/well-known/oauth-authorization-server.mjs", _page169],
	["node_modules/emdash/dist/astro/routes/api/well-known/oauth-protected-resource.mjs", _page170],
	["src/pages/404.astro", _page171],
	["src/pages/category/[slug].astro", _page172],
	["src/pages/pages/[slug].astro", _page173],
	["src/pages/posts/[slug].astro", _page174],
	["src/pages/posts/index.astro", _page175],
	["node_modules/emdash/dist/astro/routes/robots.txt.mjs", _page176],
	["src/pages/rss.xml.ts", _page177],
	["src/pages/search.astro", _page178],
	["node_modules/emdash/dist/astro/routes/sitemap.xml.mjs", _page179],
	["src/pages/tag/[slug].astro", _page180],
	["node_modules/emdash/dist/astro/routes/sitemap-_collection_.xml.mjs", _page181],
	["src/pages/index.astro", _page182]
]);
//#endregion
//#region \0virtual:astro:manifest
var _manifest = deserializeManifest({"rootDir":"file:///C:/Users/prohl/Documents/blog/my-site/","cacheDir":"file:///C:/Users/prohl/Documents/blog/my-site/node_modules/.astro/","outDir":"file:///C:/Users/prohl/Documents/blog/my-site/server/","srcDir":"file:///C:/Users/prohl/Documents/blog/my-site/src/","publicDir":"file:///C:/Users/prohl/Documents/blog/my-site/public/","buildClientDir":"file:///C:/Users/prohl/Documents/blog/my-site/server/client/","buildServerDir":"file:///C:/Users/prohl/Documents/blog/my-site/server/server/","adapterName":"@astrojs/node","assetsDir":"_astro","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-bottom]{object-position:top bottom}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-top]{object-position:bottom top}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-right]{object-position:left right}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-left]{object-position:right left}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"route":"/_image","component":"node_modules/emdash/dist/astro/image-endpoint.mjs","params":[],"pathname":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/.well-known/auth","pattern":"^\\/_emdash\\/\\.well-known\\/auth\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":".well-known","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/well-known/auth.mjs","pathname":"/_emdash/.well-known/auth","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"#emdash-boot-loader[data-astro-cid-u6fdjxxc]{background:var(--color-kumo-elevated);justify-content:center;align-items:center;min-height:100vh;display:flex}#emdash-boot-loader[data-astro-cid-u6fdjxxc] .loader-inner[data-astro-cid-u6fdjxxc]{text-align:center}#emdash-boot-loader[data-astro-cid-u6fdjxxc] .spinner[data-astro-cid-u6fdjxxc]{border:2.5px solid var(--color-kumo-line);border-top-color:var(--text-color-kumo-subtle);border-radius:50%;width:24px;height:24px;margin:0 auto;animation:.8s linear infinite emdash-spin}#emdash-boot-loader[data-astro-cid-u6fdjxxc] p[data-astro-cid-u6fdjxxc]{font-family:var(--font-emdash,ui-sans-serif, system-ui, sans-serif);color:var(--text-color-kumo-subtle);margin-top:1rem;font-size:.875rem}@keyframes emdash-spin{to{transform:rotate(360deg)}}\n@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-bottom]{object-position:top bottom}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-top]{object-position:bottom top}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-right]{object-position:left right}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-left]{object-position:right left}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"type":"page","isIndex":false,"route":"/_emdash/admin/[...path]","pattern":"^\\/_emdash\\/admin(?:\\/(.*?))?\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/emdash/src/astro/routes/admin.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/allowed-domains/[domain]","pattern":"^\\/_emdash\\/api\\/admin\\/allowed-domains\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"allowed-domains","dynamic":false,"spread":false}],[{"content":"domain","dynamic":true,"spread":false}]],"params":["domain"],"component":"node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/_domain_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/allowed-domains","pattern":"^\\/_emdash\\/api\\/admin\\/allowed-domains\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"allowed-domains","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/index.mjs","pathname":"/_emdash/api/admin/allowed-domains","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/api-tokens/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/api-tokens\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"api-tokens","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/api-tokens","pattern":"^\\/_emdash\\/api\\/admin\\/api-tokens\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"api-tokens","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/api-tokens/index.mjs","pathname":"/_emdash/api/admin/api-tokens","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/byline-fields/reorder","pattern":"^\\/_emdash\\/api\\/admin\\/byline-fields\\/reorder\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"byline-fields","dynamic":false,"spread":false}],[{"content":"reorder","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/byline-fields/reorder.mjs","pathname":"/_emdash/api/admin/byline-fields/reorder","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/byline-fields/[slug]/usage","pattern":"^\\/_emdash\\/api\\/admin\\/byline-fields\\/([^/]+?)\\/usage\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"byline-fields","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"usage","dynamic":false,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/byline-fields/[slug]","pattern":"^\\/_emdash\\/api\\/admin\\/byline-fields\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"byline-fields","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/byline-fields","pattern":"^\\/_emdash\\/api\\/admin\\/byline-fields\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"byline-fields","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index.mjs","pathname":"/_emdash/api/admin/byline-fields","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/bylines/[id]/translations","pattern":"^\\/_emdash\\/api\\/admin\\/bylines\\/([^/]+?)\\/translations\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"bylines","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"translations","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/bylines/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/bylines\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"bylines","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/bylines","pattern":"^\\/_emdash\\/api\\/admin\\/bylines\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"bylines","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/bylines/index.mjs","pathname":"/_emdash/api/admin/bylines","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/comments/bulk","pattern":"^\\/_emdash\\/api\\/admin\\/comments\\/bulk\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"bulk","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/comments/bulk.mjs","pathname":"/_emdash/api/admin/comments/bulk","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/comments/counts","pattern":"^\\/_emdash\\/api\\/admin\\/comments\\/counts\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"counts","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/comments/counts.mjs","pathname":"/_emdash/api/admin/comments/counts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/comments/[id]/status","pattern":"^\\/_emdash\\/api\\/admin\\/comments\\/([^/]+?)\\/status\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"status","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/comments/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/comments\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/comments/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/comments","pattern":"^\\/_emdash\\/api\\/admin\\/comments\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/comments/index.mjs","pathname":"/_emdash/api/admin/comments","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/hooks/exclusive/[hookName]","pattern":"^\\/_emdash\\/api\\/admin\\/hooks\\/exclusive\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"hooks","dynamic":false,"spread":false}],[{"content":"exclusive","dynamic":false,"spread":false}],[{"content":"hookName","dynamic":true,"spread":false}]],"params":["hookName"],"component":"node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/_hookName_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/hooks/exclusive","pattern":"^\\/_emdash\\/api\\/admin\\/hooks\\/exclusive\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"hooks","dynamic":false,"spread":false}],[{"content":"exclusive","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/index.mjs","pathname":"/_emdash/api/admin/hooks/exclusive","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/media-usage/repair","pattern":"^\\/_emdash\\/api\\/admin\\/media-usage\\/repair\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"media-usage","dynamic":false,"spread":false}],[{"content":"repair","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/media-usage/repair.mjs","pathname":"/_emdash/api/admin/media-usage/repair","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/oauth-clients/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/oauth-clients\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"oauth-clients","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/oauth-clients","pattern":"^\\/_emdash\\/api\\/admin\\/oauth-clients\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"oauth-clients","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/index.mjs","pathname":"/_emdash/api/admin/oauth-clients","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/marketplace/[id]/icon","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/icon\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"icon","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/icon.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/marketplace/[id]/install","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/install\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"install","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/marketplace/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/marketplace","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/index.mjs","pathname":"/_emdash/api/admin/plugins/marketplace","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/registry/artifact","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/artifact\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"registry","dynamic":false,"spread":false}],[{"content":"artifact","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/artifact.mjs","pathname":"/_emdash/api/admin/plugins/registry/artifact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/registry/install","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/install\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"registry","dynamic":false,"spread":false}],[{"content":"install","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install.mjs","pathname":"/_emdash/api/admin/plugins/registry/install","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/updates","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/updates\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"updates","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/updates.mjs","pathname":"/_emdash/api/admin/plugins/updates","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/disable","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/disable\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"disable","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/disable.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/enable","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/enable\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"enable","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/enable.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/mcp","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/mcp\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"mcp","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/mcp.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/settings","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/settings\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/settings.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/uninstall","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/uninstall\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"uninstall","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/uninstall.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/update","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/update\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"update","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/update.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/index.mjs","pathname":"/_emdash/api/admin/plugins","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/themes/marketplace/[id]/thumbnail","pattern":"^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/([^/]+?)\\/thumbnail\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"themes","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"thumbnail","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/thumbnail.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/themes/marketplace/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"themes","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/themes/marketplace","pattern":"^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"themes","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/index.mjs","pathname":"/_emdash/api/admin/themes/marketplace","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/users/[id]/disable","pattern":"^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/disable\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"disable","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/users/_id_/disable.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/users/[id]/enable","pattern":"^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/enable\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"enable","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/users/_id_/enable.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/users/[id]/send-recovery","pattern":"^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/send-recovery\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"send-recovery","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/users/_id_/send-recovery.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/users/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/users/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/users","pattern":"^\\/_emdash\\/api\\/admin\\/users\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/users/index.mjs","pathname":"/_emdash/api/admin/users","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/dev-bypass","pattern":"^\\/_emdash\\/api\\/auth\\/dev-bypass\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"dev-bypass","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/dev-bypass.mjs","pathname":"/_emdash/api/auth/dev-bypass","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/invite/accept","pattern":"^\\/_emdash\\/api\\/auth\\/invite\\/accept\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"invite","dynamic":false,"spread":false}],[{"content":"accept","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/invite/accept.mjs","pathname":"/_emdash/api/auth/invite/accept","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/invite/complete","pattern":"^\\/_emdash\\/api\\/auth\\/invite\\/complete\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"invite","dynamic":false,"spread":false}],[{"content":"complete","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/invite/complete.mjs","pathname":"/_emdash/api/auth/invite/complete","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/invite/register-options","pattern":"^\\/_emdash\\/api\\/auth\\/invite\\/register-options\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"invite","dynamic":false,"spread":false}],[{"content":"register-options","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/invite/register-options.mjs","pathname":"/_emdash/api/auth/invite/register-options","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/invite","pattern":"^\\/_emdash\\/api\\/auth\\/invite\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"invite","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/invite/index.mjs","pathname":"/_emdash/api/auth/invite","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/logout","pattern":"^\\/_emdash\\/api\\/auth\\/logout\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/logout.mjs","pathname":"/_emdash/api/auth/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/magic-link/send","pattern":"^\\/_emdash\\/api\\/auth\\/magic-link\\/send\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"magic-link","dynamic":false,"spread":false}],[{"content":"send","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/magic-link/send.mjs","pathname":"/_emdash/api/auth/magic-link/send","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/magic-link/verify","pattern":"^\\/_emdash\\/api\\/auth\\/magic-link\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"magic-link","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/magic-link/verify.mjs","pathname":"/_emdash/api/auth/magic-link/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/me","pattern":"^\\/_emdash\\/api\\/auth\\/me\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"me","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/me.mjs","pathname":"/_emdash/api/auth/me","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/mode","pattern":"^\\/_emdash\\/api\\/auth\\/mode\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"mode","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/mode.mjs","pathname":"/_emdash/api/auth/mode","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/oauth/[provider]/callback","pattern":"^\\/_emdash\\/api\\/auth\\/oauth\\/([^/]+?)\\/callback\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"provider","dynamic":true,"spread":false}],[{"content":"callback","dynamic":false,"spread":false}]],"params":["provider"],"component":"node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_/callback.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/oauth/[provider]","pattern":"^\\/_emdash\\/api\\/auth\\/oauth\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"provider","dynamic":true,"spread":false}]],"params":["provider"],"component":"node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey/options","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/options\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}],[{"content":"options","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/options.mjs","pathname":"/_emdash/api/auth/passkey/options","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey/register/options","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/register\\/options\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}],[{"content":"options","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options.mjs","pathname":"/_emdash/api/auth/passkey/register/options","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey/register/verify","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/register\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify.mjs","pathname":"/_emdash/api/auth/passkey/register/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey/verify","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/verify.mjs","pathname":"/_emdash/api/auth/passkey/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey/[id]","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/index.mjs","pathname":"/_emdash/api/auth/passkey","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/signup/complete","pattern":"^\\/_emdash\\/api\\/auth\\/signup\\/complete\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}],[{"content":"complete","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/signup/complete.mjs","pathname":"/_emdash/api/auth/signup/complete","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/signup/request","pattern":"^\\/_emdash\\/api\\/auth\\/signup\\/request\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}],[{"content":"request","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/signup/request.mjs","pathname":"/_emdash/api/auth/signup/request","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/signup/verify","pattern":"^\\/_emdash\\/api\\/auth\\/signup\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/signup/verify.mjs","pathname":"/_emdash/api/auth/signup/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/comments/[collection]/[contentId]/reactions","pattern":"^\\/_emdash\\/api\\/comments\\/([^/]+?)\\/([^/]+?)\\/reactions\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"contentId","dynamic":true,"spread":false}],[{"content":"reactions","dynamic":false,"spread":false}]],"params":["collection","contentId"],"component":"node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/reactions.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/comments/[collection]/[contentId]","pattern":"^\\/_emdash\\/api\\/comments\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"contentId","dynamic":true,"spread":false}]],"params":["collection","contentId"],"component":"node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/authors","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/authors\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"authors","dynamic":false,"spread":false}]],"params":["collection"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/authors.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/trash","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/trash\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"trash","dynamic":false,"spread":false}]],"params":["collection"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/trash.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/compare","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/compare\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"compare","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/compare.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/discard-draft","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/discard-draft\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"discard-draft","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/discard-draft.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/duplicate","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/duplicate\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"duplicate","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/duplicate.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/permanent","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/permanent\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"permanent","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/permanent.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/preview-url","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/preview-url\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"preview-url","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/publish","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/publish\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"publish","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/publish.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/restore","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/restore\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"restore","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/restore.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/revisions","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/revisions\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"revisions","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/schedule","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/schedule\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"schedule","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/schedule.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/terms/[taxonomy]","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/terms\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}],[{"content":"taxonomy","dynamic":true,"spread":false}]],"params":["collection","id","taxonomy"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/translations","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/translations\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"translations","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/translations.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/unpublish","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/unpublish\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"unpublish","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/unpublish.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}]],"params":["collection"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/dashboard","pattern":"^\\/_emdash\\/api\\/dashboard\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/dashboard.mjs","pathname":"/_emdash/api/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/dev/emails","pattern":"^\\/_emdash\\/api\\/dev\\/emails\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"dev","dynamic":false,"spread":false}],[{"content":"emails","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/dev/emails.mjs","pathname":"/_emdash/api/dev/emails","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/probe","pattern":"^\\/_emdash\\/api\\/import\\/probe\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"probe","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/probe.mjs","pathname":"/_emdash/api/import/probe","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress/analyze","pattern":"^\\/_emdash\\/api\\/import\\/wordpress\\/analyze\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress","dynamic":false,"spread":false}],[{"content":"analyze","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress/analyze.mjs","pathname":"/_emdash/api/import/wordpress/analyze","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress/execute","pattern":"^\\/_emdash\\/api\\/import\\/wordpress\\/execute\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress","dynamic":false,"spread":false}],[{"content":"execute","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress/execute.mjs","pathname":"/_emdash/api/import/wordpress/execute","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress/media","pattern":"^\\/_emdash\\/api\\/import\\/wordpress\\/media\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress/media.mjs","pathname":"/_emdash/api/import/wordpress/media","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress/prepare","pattern":"^\\/_emdash\\/api\\/import\\/wordpress\\/prepare\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress","dynamic":false,"spread":false}],[{"content":"prepare","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare.mjs","pathname":"/_emdash/api/import/wordpress/prepare","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress/rewrite-urls","pattern":"^\\/_emdash\\/api\\/import\\/wordpress\\/rewrite-urls\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress","dynamic":false,"spread":false}],[{"content":"rewrite-urls","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress/rewrite-urls.mjs","pathname":"/_emdash/api/import/wordpress/rewrite-urls","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress-plugin/analyze","pattern":"^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/analyze\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress-plugin","dynamic":false,"spread":false}],[{"content":"analyze","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze.mjs","pathname":"/_emdash/api/import/wordpress-plugin/analyze","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress-plugin/callback","pattern":"^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/callback\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress-plugin","dynamic":false,"spread":false}],[{"content":"callback","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/callback.mjs","pathname":"/_emdash/api/import/wordpress-plugin/callback","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress-plugin/execute","pattern":"^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/execute\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress-plugin","dynamic":false,"spread":false}],[{"content":"execute","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/execute.mjs","pathname":"/_emdash/api/import/wordpress-plugin/execute","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/manifest","pattern":"^\\/_emdash\\/api\\/manifest\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"manifest","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/manifest.mjs","pathname":"/_emdash/api/manifest","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/mcp","pattern":"^\\/_emdash\\/api\\/mcp\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"mcp","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/mcp.mjs","pathname":"/_emdash/api/mcp","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/file/[...key]","pattern":"^\\/_emdash\\/api\\/media\\/file(?:\\/(.*?))?\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"file","dynamic":false,"spread":false}],[{"content":"...key","dynamic":true,"spread":true}]],"params":["...key"],"component":"node_modules/emdash/dist/astro/routes/api/media/file/_...key_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/providers/[providerId]/[itemId]","pattern":"^\\/_emdash\\/api\\/media\\/providers\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"providers","dynamic":false,"spread":false}],[{"content":"providerId","dynamic":true,"spread":false}],[{"content":"itemId","dynamic":true,"spread":false}]],"params":["providerId","itemId"],"component":"node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/_itemId_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/providers/[providerId]","pattern":"^\\/_emdash\\/api\\/media\\/providers\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"providers","dynamic":false,"spread":false}],[{"content":"providerId","dynamic":true,"spread":false}]],"params":["providerId"],"component":"node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/providers","pattern":"^\\/_emdash\\/api\\/media\\/providers\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"providers","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/media/providers/index.mjs","pathname":"/_emdash/api/media/providers","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/upload-url","pattern":"^\\/_emdash\\/api\\/media\\/upload-url\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"upload-url","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/media/upload-url.mjs","pathname":"/_emdash/api/media/upload-url","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/[id]/confirm","pattern":"^\\/_emdash\\/api\\/media\\/([^/]+?)\\/confirm\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"confirm","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/media/_id_/confirm.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/[id]/usage","pattern":"^\\/_emdash\\/api\\/media\\/([^/]+?)\\/usage\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"usage","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/media/_id_/usage.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/[id]","pattern":"^\\/_emdash\\/api\\/media\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/media/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media","pattern":"^\\/_emdash\\/api\\/media\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/media.mjs","pathname":"/_emdash/api/media","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus/[name]/items/[id]","pattern":"^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/items\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"items","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["name","id"],"component":"node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus/[name]/items","pattern":"^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/items\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"items","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/menus/_name_/items.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus/[name]/reorder","pattern":"^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/reorder\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"reorder","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/menus/_name_/reorder.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus/[name]/translations","pattern":"^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/translations\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"translations","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/menus/_name_/translations.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus/[name]","pattern":"^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/menus/_name_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus","pattern":"^\\/_emdash\\/api\\/menus\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/menus/index.mjs","pathname":"/_emdash/api/menus","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/device/authorize","pattern":"^\\/_emdash\\/api\\/oauth\\/device\\/authorize\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"device","dynamic":false,"spread":false}],[{"content":"authorize","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/device/authorize.mjs","pathname":"/_emdash/api/oauth/device/authorize","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/device/code","pattern":"^\\/_emdash\\/api\\/oauth\\/device\\/code\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"device","dynamic":false,"spread":false}],[{"content":"code","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/device/code.mjs","pathname":"/_emdash/api/oauth/device/code","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/device/token","pattern":"^\\/_emdash\\/api\\/oauth\\/device\\/token\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"device","dynamic":false,"spread":false}],[{"content":"token","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/device/token.mjs","pathname":"/_emdash/api/oauth/device/token","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/register","pattern":"^\\/_emdash\\/api\\/oauth\\/register\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/register.mjs","pathname":"/_emdash/api/oauth/register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/token/refresh","pattern":"^\\/_emdash\\/api\\/oauth\\/token\\/refresh\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"token","dynamic":false,"spread":false}],[{"content":"refresh","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/token/refresh.mjs","pathname":"/_emdash/api/oauth/token/refresh","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/token/revoke","pattern":"^\\/_emdash\\/api\\/oauth\\/token\\/revoke\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"token","dynamic":false,"spread":false}],[{"content":"revoke","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/token/revoke.mjs","pathname":"/_emdash/api/oauth/token/revoke","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/token","pattern":"^\\/_emdash\\/api\\/oauth\\/token\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"token","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/token.mjs","pathname":"/_emdash/api/oauth/token","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/plugins/[pluginId]/[...path]","pattern":"^\\/_emdash\\/api\\/plugins\\/([^/]+?)(?:\\/(.*?))?\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"pluginId","dynamic":true,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["pluginId","...path"],"component":"node_modules/emdash/dist/astro/routes/api/plugins/_pluginId_/_...path_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/redirects/404s/summary","pattern":"^\\/_emdash\\/api\\/redirects\\/404s\\/summary\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"redirects","dynamic":false,"spread":false}],[{"content":"404s","dynamic":false,"spread":false}],[{"content":"summary","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/redirects/404s/summary.mjs","pathname":"/_emdash/api/redirects/404s/summary","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/redirects/404s","pattern":"^\\/_emdash\\/api\\/redirects\\/404s\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"redirects","dynamic":false,"spread":false}],[{"content":"404s","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/redirects/404s/index.mjs","pathname":"/_emdash/api/redirects/404s","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/redirects/[id]","pattern":"^\\/_emdash\\/api\\/redirects\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"redirects","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/redirects/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/redirects","pattern":"^\\/_emdash\\/api\\/redirects\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"redirects","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/redirects/index.mjs","pathname":"/_emdash/api/redirects","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/revisions/[revisionId]/restore","pattern":"^\\/_emdash\\/api\\/revisions\\/([^/]+?)\\/restore\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"revisions","dynamic":false,"spread":false}],[{"content":"revisionId","dynamic":true,"spread":false}],[{"content":"restore","dynamic":false,"spread":false}]],"params":["revisionId"],"component":"node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/revisions/[revisionId]","pattern":"^\\/_emdash\\/api\\/revisions\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"revisions","dynamic":false,"spread":false}],[{"content":"revisionId","dynamic":true,"spread":false}]],"params":["revisionId"],"component":"node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections/[slug]/fields/reorder","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/reorder\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"fields","dynamic":false,"spread":false}],[{"content":"reorder","dynamic":false,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/reorder.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections/[slug]/fields/[fieldSlug]","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"fields","dynamic":false,"spread":false}],[{"content":"fieldSlug","dynamic":true,"spread":false}]],"params":["slug","fieldSlug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/_fieldSlug_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections/[slug]/fields","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"fields","dynamic":false,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections/[slug]","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/index.mjs","pathname":"/_emdash/api/schema/collections","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/orphans/[slug]","pattern":"^\\/_emdash\\/api\\/schema\\/orphans\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"orphans","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/orphans/_slug_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/orphans","pattern":"^\\/_emdash\\/api\\/schema\\/orphans\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"orphans","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/schema/orphans/index.mjs","pathname":"/_emdash/api/schema/orphans","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema","pattern":"^\\/_emdash\\/api\\/schema\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/schema/index.mjs","pathname":"/_emdash/api/schema","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/search/enable","pattern":"^\\/_emdash\\/api\\/search\\/enable\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}],[{"content":"enable","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/search/enable.mjs","pathname":"/_emdash/api/search/enable","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/search/rebuild","pattern":"^\\/_emdash\\/api\\/search\\/rebuild\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}],[{"content":"rebuild","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/search/rebuild.mjs","pathname":"/_emdash/api/search/rebuild","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/search/stats","pattern":"^\\/_emdash\\/api\\/search\\/stats\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}],[{"content":"stats","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/search/stats.mjs","pathname":"/_emdash/api/search/stats","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/search/suggest","pattern":"^\\/_emdash\\/api\\/search\\/suggest\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}],[{"content":"suggest","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/search/suggest.mjs","pathname":"/_emdash/api/search/suggest","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/search","pattern":"^\\/_emdash\\/api\\/search\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/search/index.mjs","pathname":"/_emdash/api/search","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/sections/[slug]","pattern":"^\\/_emdash\\/api\\/sections\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"sections","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/sections/_slug_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/sections","pattern":"^\\/_emdash\\/api\\/sections\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"sections","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/sections/index.mjs","pathname":"/_emdash/api/sections","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/backups/archives/[name]","pattern":"^\\/_emdash\\/api\\/settings\\/backups\\/archives\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"backups","dynamic":false,"spread":false}],[{"content":"archives","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/settings/backups/archives/_name_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/backups/archives","pattern":"^\\/_emdash\\/api\\/settings\\/backups\\/archives\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"backups","dynamic":false,"spread":false}],[{"content":"archives","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index.mjs","pathname":"/_emdash/api/settings/backups/archives","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/backups/export","pattern":"^\\/_emdash\\/api\\/settings\\/backups\\/export\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"backups","dynamic":false,"spread":false}],[{"content":"export","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings/backups/export.mjs","pathname":"/_emdash/api/settings/backups/export","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/backups","pattern":"^\\/_emdash\\/api\\/settings\\/backups\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"backups","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings/backups/index.mjs","pathname":"/_emdash/api/settings/backups","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/email","pattern":"^\\/_emdash\\/api\\/settings\\/email\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"email","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings/email.mjs","pathname":"/_emdash/api/settings/email","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings","pattern":"^\\/_emdash\\/api\\/settings\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings.mjs","pathname":"/_emdash/api/settings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup/admin/verify","pattern":"^\\/_emdash\\/api\\/setup\\/admin\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/admin-verify.mjs","pathname":"/_emdash/api/setup/admin/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup/admin","pattern":"^\\/_emdash\\/api\\/setup\\/admin\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/admin.mjs","pathname":"/_emdash/api/setup/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup/dev-bypass","pattern":"^\\/_emdash\\/api\\/setup\\/dev-bypass\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}],[{"content":"dev-bypass","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/dev-bypass.mjs","pathname":"/_emdash/api/setup/dev-bypass","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup/dev-reset","pattern":"^\\/_emdash\\/api\\/setup\\/dev-reset\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}],[{"content":"dev-reset","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/dev-reset.mjs","pathname":"/_emdash/api/setup/dev-reset","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup/status","pattern":"^\\/_emdash\\/api\\/setup\\/status\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}],[{"content":"status","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/status.mjs","pathname":"/_emdash/api/setup/status","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup","pattern":"^\\/_emdash\\/api\\/setup\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/index.mjs","pathname":"/_emdash/api/setup","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/snapshot","pattern":"^\\/_emdash\\/api\\/snapshot\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"snapshot","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/snapshot.mjs","pathname":"/_emdash/api/snapshot","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/[name]/terms/[slug]/translations","pattern":"^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/([^/]+?)\\/translations\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"translations","dynamic":false,"spread":false}]],"params":["name","slug"],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/[name]/terms/[slug]","pattern":"^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["name","slug"],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/[name]/terms","pattern":"^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies","pattern":"^\\/_emdash\\/api\\/taxonomies\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/index.mjs","pathname":"/_emdash/api/taxonomies","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/themes/preview","pattern":"^\\/_emdash\\/api\\/themes\\/preview\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"themes","dynamic":false,"spread":false}],[{"content":"preview","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/themes/preview.mjs","pathname":"/_emdash/api/themes/preview","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/typegen","pattern":"^\\/_emdash\\/api\\/typegen\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"typegen","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/typegen.mjs","pathname":"/_emdash/api/typegen","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-areas/[name]/reorder","pattern":"^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/reorder\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-areas","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"reorder","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/reorder.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-areas/[name]/widgets/[id]","pattern":"^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/widgets\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-areas","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"widgets","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["name","id"],"component":"node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-areas/[name]/widgets","pattern":"^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/widgets\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-areas","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"widgets","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-areas/[name]","pattern":"^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-areas","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/widget-areas/_name_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-areas","pattern":"^\\/_emdash\\/api\\/widget-areas\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-areas","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/widget-areas/index.mjs","pathname":"/_emdash/api/widget-areas","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-components","pattern":"^\\/_emdash\\/api\\/widget-components\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-components","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/widget-components.mjs","pathname":"/_emdash/api/widget-components","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/oauth/authorize","pattern":"^\\/_emdash\\/oauth\\/authorize\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"authorize","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/authorize.mjs","pathname":"/_emdash/oauth/authorize","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/.well-known/oauth-authorization-server/_emdash","pattern":"^\\/\\.well-known\\/oauth-authorization-server\\/_emdash\\/?$","segments":[[{"content":".well-known","dynamic":false,"spread":false}],[{"content":"oauth-authorization-server","dynamic":false,"spread":false}],[{"content":"_emdash","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/well-known/oauth-authorization-server.mjs","pathname":"/.well-known/oauth-authorization-server/_emdash","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/.well-known/oauth-protected-resource","pattern":"^\\/\\.well-known\\/oauth-protected-resource\\/?$","segments":[[{"content":".well-known","dynamic":false,"spread":false}],[{"content":"oauth-protected-resource","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/well-known/oauth-protected-resource.mjs","pathname":"/.well-known/oauth-protected-resource","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".not-found[data-astro-cid-ibpinaeu]{text-align:center;padding:var(--spacing-24) var(--spacing-6)}.not-found[data-astro-cid-ibpinaeu] h1[data-astro-cid-ibpinaeu]{font-size:var(--font-size-5xl);margin-bottom:var(--spacing-2);color:var(--color-border)}.not-found[data-astro-cid-ibpinaeu] p[data-astro-cid-ibpinaeu]{color:var(--color-muted);margin-bottom:var(--spacing-6)}.not-found[data-astro-cid-ibpinaeu] a[data-astro-cid-ibpinaeu]{color:var(--color-text)}\n"},{"type":"external","src":"_astro/Base.v4DM9BTs.css"},{"type":"inline","content":"@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-bottom]{object-position:top bottom}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-top]{object-position:bottom top}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-right]{object-position:left right}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-left]{object-position:right left}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".post-card[data-astro-cid-sbmovh4h]{flex-direction:column;display:flex}.card-link[data-astro-cid-sbmovh4h]{color:inherit;text-decoration:none;display:block}.card-image[data-astro-cid-sbmovh4h]{aspect-ratio:16/10;border-radius:var(--radius-lg);background:var(--color-surface);margin-bottom:var(--spacing-4);overflow:hidden}.card-image[data-astro-cid-sbmovh4h] img[data-astro-cid-sbmovh4h]{object-fit:cover;width:100%;height:100%;transition:transform .3s}.card-link[data-astro-cid-sbmovh4h]:hover .card-image[data-astro-cid-sbmovh4h] img[data-astro-cid-sbmovh4h]{transform:scale(1.03)}.card-placeholder[data-astro-cid-sbmovh4h]{aspect-ratio:16/10;border-radius:var(--radius-lg);background:var(--color-surface);margin-bottom:var(--spacing-4)}.card-body[data-astro-cid-sbmovh4h]{flex:1}.card-meta[data-astro-cid-sbmovh4h]{align-items:center;column-gap:var(--spacing-3);font-size:var(--font-size-sm);color:var(--color-muted);margin-bottom:var(--spacing-2);flex-wrap:wrap;row-gap:0;display:flex}.card-meta[data-astro-cid-sbmovh4h] time[data-astro-cid-sbmovh4h],.card-meta[data-astro-cid-sbmovh4h] span[data-astro-cid-sbmovh4h]:not(.meta-dot){white-space:nowrap}.meta-dot[data-astro-cid-sbmovh4h]{background:var(--color-muted);border-radius:50%;width:3px;height:3px}.card-title[data-astro-cid-sbmovh4h]{font-size:var(--font-size-xl);font-weight:var(--font-weight-heading);line-height:var(--leading-snug);letter-spacing:var(--tracking-snug);margin-bottom:var(--spacing-2);transition:color var(--transition-fast)}.card-link[data-astro-cid-sbmovh4h]:hover .card-title[data-astro-cid-sbmovh4h]{color:var(--color-brand)}.card-excerpt[data-astro-cid-sbmovh4h]{font-size:var(--font-size-base);line-height:var(--leading-relaxed);color:var(--color-text-secondary);-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.card-tags[data-astro-cid-sbmovh4h]{gap:var(--spacing-2);margin-top:var(--spacing-3);flex-wrap:wrap;display:flex}.card-tag[data-astro-cid-sbmovh4h]{padding:var(--tag-padding-y) var(--spacing-2);font-size:var(--font-size-xs);color:var(--color-text-secondary);background:var(--color-surface);border-radius:var(--radius);transition:color var(--transition-fast), background var(--transition-fast);text-decoration:none;display:inline-block}.card-tag[data-astro-cid-sbmovh4h]:hover{color:var(--color-text);background:var(--color-border)}.card-bylines[data-astro-cid-sbmovh4h]{white-space:nowrap;align-items:center;gap:2px;display:flex}.card-byline[data-astro-cid-sbmovh4h]{align-items:center;gap:var(--spacing-1);display:inline-flex}.card-byline-avatar[data-astro-cid-sbmovh4h]{width:var(--avatar-size-xs);height:var(--avatar-size-xs);object-fit:cover;border-radius:50%}.card-byline-name[data-astro-cid-sbmovh4h]{color:var(--color-text-secondary);font-weight:500}.byline-more[data-astro-cid-sbmovh4h]{font-size:var(--font-size-xs);color:var(--color-muted);cursor:default;border-radius:var(--radius);outline-offset:2px;margin-left:2px;position:relative}.byline-more[data-astro-cid-sbmovh4h]:focus-visible{outline:2px solid var(--color-brand)}.byline-more[data-astro-cid-sbmovh4h][data-tooltip]:hover:after,.byline-more[data-astro-cid-sbmovh4h][data-tooltip]:focus-visible:after{content:attr(data-tooltip);white-space:nowrap;background:var(--color-text);color:var(--color-bg);font-size:var(--font-size-xs);padding:var(--spacing-1) var(--spacing-2);border-radius:var(--radius);pointer-events:none;z-index:10;font-weight:400;position:absolute;bottom:calc(100% + 6px);left:50%;transform:translate(-50%)}\n.archive-section[data-astro-cid-pjwz537a]{max-width:var(--wide-width);padding:var(--spacing-12) var(--spacing-6);margin:0 auto}.archive-header[data-astro-cid-pjwz537a]{margin-bottom:var(--spacing-12);padding-bottom:var(--spacing-8);border-bottom:1px solid var(--color-border-subtle)}.archive-label[data-astro-cid-pjwz537a]{font-size:var(--font-size-xs);color:var(--color-brand);text-transform:uppercase;letter-spacing:var(--tracking-wider);margin-bottom:var(--spacing-2);font-weight:500;display:block}.archive-title[data-astro-cid-pjwz537a]{font-size:var(--font-size-4xl);font-weight:var(--font-weight-display);letter-spacing:var(--tracking-tight);margin-bottom:var(--spacing-2)}.archive-count[data-astro-cid-pjwz537a]{font-size:var(--font-size-sm);color:var(--color-muted)}.posts-grid[data-astro-cid-pjwz537a]{gap:var(--spacing-12) var(--spacing-8);grid-template-columns:repeat(3,1fr);display:grid}.no-posts[data-astro-cid-pjwz537a]{color:var(--color-muted)}@media (width<=900px){.posts-grid[data-astro-cid-pjwz537a]{grid-template-columns:repeat(2,1fr)}}@media (width<=600px){.posts-grid[data-astro-cid-pjwz537a]{grid-template-columns:1fr}}\n"},{"type":"external","src":"_astro/Base.v4DM9BTs.css"},{"type":"inline","content":"@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-bottom]{object-position:top bottom}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-top]{object-position:bottom top}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-right]{object-position:left right}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-left]{object-position:right left}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"route":"/category/[slug]","isIndex":false,"type":"page","pattern":"^\\/category\\/([^/]+?)\\/?$","segments":[[{"content":"category","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/category/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".page-article[data-astro-cid-h25gr2g4]{max-width:var(--max-width);padding:var(--spacing-16) var(--spacing-6) var(--spacing-16);margin:0 auto}.page-header[data-astro-cid-h25gr2g4]{margin-bottom:var(--spacing-8)}.page-title[data-astro-cid-h25gr2g4]{font-size:clamp(var(--font-size-2xl), 4vw, var(--font-size-4xl));font-weight:var(--font-weight-display);line-height:var(--leading-tight)}.page-content[data-astro-cid-h25gr2g4] p{margin-bottom:1.5em}.page-content[data-astro-cid-h25gr2g4] h2{font-size:var(--font-size-2xl);margin-top:2em;margin-bottom:.75em}.page-content[data-astro-cid-h25gr2g4] h3{font-size:var(--font-size-xl);margin-top:1.75em;margin-bottom:.5em}.page-content[data-astro-cid-h25gr2g4] blockquote{padding-left:var(--spacing-6);border-left:3px solid var(--color-border);color:var(--color-muted);margin:1.5em 0}.page-content[data-astro-cid-h25gr2g4] pre{padding:var(--spacing-4);background:var(--color-surface);border-radius:var(--radius);font-family:var(--font-mono);font-size:var(--font-size-sm);margin:1.5em 0;overflow-x:auto}.page-content[data-astro-cid-h25gr2g4] code{font-family:var(--font-mono);background:var(--color-surface);border-radius:var(--radius);padding:.15em .3em;font-size:.9em}.page-content[data-astro-cid-h25gr2g4] pre code{background:0 0;padding:0}.page-content[data-astro-cid-h25gr2g4] ul,.page-content[data-astro-cid-h25gr2g4] ol{padding-left:var(--spacing-5);margin-bottom:1.5em}.page-content[data-astro-cid-h25gr2g4] li{margin-bottom:.5em}\n"},{"type":"external","src":"_astro/Base.v4DM9BTs.css"},{"type":"inline","content":"@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-bottom]{object-position:top bottom}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-top]{object-position:bottom top}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-right]{object-position:left right}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-left]{object-position:right left}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"route":"/pages/[slug]","isIndex":false,"type":"page","pattern":"^\\/pages\\/([^/]+?)\\/?$","segments":[[{"content":"pages","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/pages/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".post-card[data-astro-cid-sbmovh4h]{flex-direction:column;display:flex}.card-link[data-astro-cid-sbmovh4h]{color:inherit;text-decoration:none;display:block}.card-image[data-astro-cid-sbmovh4h]{aspect-ratio:16/10;border-radius:var(--radius-lg);background:var(--color-surface);margin-bottom:var(--spacing-4);overflow:hidden}.card-image[data-astro-cid-sbmovh4h] img[data-astro-cid-sbmovh4h]{object-fit:cover;width:100%;height:100%;transition:transform .3s}.card-link[data-astro-cid-sbmovh4h]:hover .card-image[data-astro-cid-sbmovh4h] img[data-astro-cid-sbmovh4h]{transform:scale(1.03)}.card-placeholder[data-astro-cid-sbmovh4h]{aspect-ratio:16/10;border-radius:var(--radius-lg);background:var(--color-surface);margin-bottom:var(--spacing-4)}.card-body[data-astro-cid-sbmovh4h]{flex:1}.card-meta[data-astro-cid-sbmovh4h]{align-items:center;column-gap:var(--spacing-3);font-size:var(--font-size-sm);color:var(--color-muted);margin-bottom:var(--spacing-2);flex-wrap:wrap;row-gap:0;display:flex}.card-meta[data-astro-cid-sbmovh4h] time[data-astro-cid-sbmovh4h],.card-meta[data-astro-cid-sbmovh4h] span[data-astro-cid-sbmovh4h]:not(.meta-dot){white-space:nowrap}.meta-dot[data-astro-cid-sbmovh4h]{background:var(--color-muted);border-radius:50%;width:3px;height:3px}.card-title[data-astro-cid-sbmovh4h]{font-size:var(--font-size-xl);font-weight:var(--font-weight-heading);line-height:var(--leading-snug);letter-spacing:var(--tracking-snug);margin-bottom:var(--spacing-2);transition:color var(--transition-fast)}.card-link[data-astro-cid-sbmovh4h]:hover .card-title[data-astro-cid-sbmovh4h]{color:var(--color-brand)}.card-excerpt[data-astro-cid-sbmovh4h]{font-size:var(--font-size-base);line-height:var(--leading-relaxed);color:var(--color-text-secondary);-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.card-tags[data-astro-cid-sbmovh4h]{gap:var(--spacing-2);margin-top:var(--spacing-3);flex-wrap:wrap;display:flex}.card-tag[data-astro-cid-sbmovh4h]{padding:var(--tag-padding-y) var(--spacing-2);font-size:var(--font-size-xs);color:var(--color-text-secondary);background:var(--color-surface);border-radius:var(--radius);transition:color var(--transition-fast), background var(--transition-fast);text-decoration:none;display:inline-block}.card-tag[data-astro-cid-sbmovh4h]:hover{color:var(--color-text);background:var(--color-border)}.card-bylines[data-astro-cid-sbmovh4h]{white-space:nowrap;align-items:center;gap:2px;display:flex}.card-byline[data-astro-cid-sbmovh4h]{align-items:center;gap:var(--spacing-1);display:inline-flex}.card-byline-avatar[data-astro-cid-sbmovh4h]{width:var(--avatar-size-xs);height:var(--avatar-size-xs);object-fit:cover;border-radius:50%}.card-byline-name[data-astro-cid-sbmovh4h]{color:var(--color-text-secondary);font-weight:500}.byline-more[data-astro-cid-sbmovh4h]{font-size:var(--font-size-xs);color:var(--color-muted);cursor:default;border-radius:var(--radius);outline-offset:2px;margin-left:2px;position:relative}.byline-more[data-astro-cid-sbmovh4h]:focus-visible{outline:2px solid var(--color-brand)}.byline-more[data-astro-cid-sbmovh4h][data-tooltip]:hover:after,.byline-more[data-astro-cid-sbmovh4h][data-tooltip]:focus-visible:after{content:attr(data-tooltip);white-space:nowrap;background:var(--color-text);color:var(--color-bg);font-size:var(--font-size-xs);padding:var(--spacing-1) var(--spacing-2);border-radius:var(--radius);pointer-events:none;z-index:10;font-weight:400;position:absolute;bottom:calc(100% + 6px);left:50%;transform:translate(-50%)}\n"},{"type":"external","src":"_astro/_slug_.Cbsuovo4.css"},{"type":"external","src":"_astro/Base.v4DM9BTs.css"},{"type":"inline","content":"@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-bottom]{object-position:top bottom}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-top]{object-position:bottom top}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-right]{object-position:left right}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-left]{object-position:right left}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"route":"/posts/[slug]","isIndex":false,"type":"page","pattern":"^\\/posts\\/([^/]+?)\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/posts/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".posts-page[data-astro-cid-bxdp5n4l]{max-width:var(--content-width);padding:var(--spacing-8) var(--spacing-6) var(--spacing-16);margin:0 auto}.page-header[data-astro-cid-bxdp5n4l]{margin-bottom:var(--spacing-12)}.page-title[data-astro-cid-bxdp5n4l]{font-size:var(--font-size-4xl);font-weight:var(--font-weight-display);letter-spacing:var(--tracking-tight);margin-bottom:var(--spacing-2)}.page-description[data-astro-cid-bxdp5n4l]{font-size:var(--font-size-lg);color:var(--color-muted)}.empty[data-astro-cid-bxdp5n4l]{color:var(--color-muted);font-size:var(--font-size-lg)}.posts-list[data-astro-cid-bxdp5n4l]{flex-direction:column;display:flex}.post-item[data-astro-cid-bxdp5n4l]{padding:var(--spacing-8) 0;border-bottom:1px solid var(--color-border-subtle)}.post-item[data-astro-cid-bxdp5n4l]:first-child{padding-top:0}.post-item[data-astro-cid-bxdp5n4l]:last-child{border-bottom:none}.post-link[data-astro-cid-bxdp5n4l]{color:inherit;text-decoration:none;display:block}.post-meta[data-astro-cid-bxdp5n4l]{align-items:center;gap:var(--spacing-3);font-size:var(--font-size-sm);color:var(--color-muted);margin-bottom:var(--spacing-2);display:flex}.meta-dot[data-astro-cid-bxdp5n4l]{background:var(--color-muted);border-radius:50%;width:3px;height:3px}.post-bylines[data-astro-cid-bxdp5n4l]{align-items:center;gap:2px;display:flex}.post-byline[data-astro-cid-bxdp5n4l]{align-items:center;gap:var(--spacing-1);display:inline-flex}.post-byline-avatar[data-astro-cid-bxdp5n4l]{width:var(--avatar-size-sm);height:var(--avatar-size-sm);object-fit:cover;border-radius:50%}.post-byline-name[data-astro-cid-bxdp5n4l]{color:var(--color-text-secondary);font-weight:500}.byline-sep[data-astro-cid-bxdp5n4l]{color:var(--color-muted);margin-right:2px}.byline-more[data-astro-cid-bxdp5n4l]{font-size:var(--font-size-xs);color:var(--color-muted);margin-left:2px}.post-title[data-astro-cid-bxdp5n4l]{font-size:var(--font-size-2xl);font-weight:var(--font-weight-heading);line-height:var(--leading-snug);letter-spacing:var(--tracking-snug);margin-bottom:var(--spacing-2);transition:color var(--transition-fast)}.post-link[data-astro-cid-bxdp5n4l]:hover .post-title[data-astro-cid-bxdp5n4l]{color:var(--color-brand)}.post-excerpt[data-astro-cid-bxdp5n4l]{font-size:var(--font-size-lg);line-height:var(--leading-relaxed);color:var(--color-text-secondary)}.post-tags[data-astro-cid-bxdp5n4l]{gap:var(--spacing-2);margin-top:var(--spacing-4);flex-wrap:wrap;display:flex}.post-tag[data-astro-cid-bxdp5n4l]{padding:var(--tag-padding-y) var(--spacing-2);font-size:var(--font-size-xs);color:var(--color-text-secondary);background:var(--color-surface);border-radius:var(--radius);transition:color var(--transition-fast), background var(--transition-fast);text-decoration:none;display:inline-block}.post-tag[data-astro-cid-bxdp5n4l]:hover{color:var(--color-text);background:var(--color-border)}@media (width<=600px){.posts-page[data-astro-cid-bxdp5n4l]{padding:var(--spacing-6) var(--spacing-4) var(--spacing-12)}.page-title[data-astro-cid-bxdp5n4l]{font-size:var(--font-size-3xl)}.post-title[data-astro-cid-bxdp5n4l]{font-size:var(--font-size-xl)}}\n"},{"type":"external","src":"_astro/Base.v4DM9BTs.css"},{"type":"inline","content":"@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-bottom]{object-position:top bottom}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-top]{object-position:bottom top}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-right]{object-position:left right}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-left]{object-position:right left}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"route":"/posts","isIndex":true,"type":"page","pattern":"^\\/posts\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/index.astro","pathname":"/posts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/robots.txt","pattern":"^\\/robots\\.txt$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/robots.txt.mjs","pathname":"/robots.txt","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".search-page[data-astro-cid-wp2l4cmv]{max-width:var(--max-width);padding:var(--spacing-8) var(--spacing-6) var(--spacing-16);margin:0 auto}.search-title[data-astro-cid-wp2l4cmv]{font-size:var(--font-size-2xl);margin-bottom:var(--spacing-6)}.search-form[data-astro-cid-wp2l4cmv]{gap:var(--spacing-2);margin-bottom:var(--spacing-8);display:flex}.search-input[data-astro-cid-wp2l4cmv]{padding:var(--spacing-2) var(--spacing-4);font-size:var(--font-size-base);border:1px solid var(--color-border);border-radius:var(--radius);background:var(--color-bg);color:var(--color-text);flex:1}.search-input[data-astro-cid-wp2l4cmv]:focus{border-color:var(--color-brand);outline:none}.search-button[data-astro-cid-wp2l4cmv]{padding:var(--spacing-2) var(--spacing-6);font-size:var(--font-size-base);background:var(--color-brand);color:var(--color-on-brand);border-radius:var(--radius);cursor:pointer;border:none;font-weight:500}.search-button[data-astro-cid-wp2l4cmv]:hover{opacity:.9}.search-summary[data-astro-cid-wp2l4cmv]{color:var(--color-muted);margin-bottom:var(--spacing-6)}.search-hint[data-astro-cid-wp2l4cmv]{color:var(--color-muted)}.search-results[data-astro-cid-wp2l4cmv]{flex-direction:column;margin:0;padding:0;list-style:none;display:flex}.search-result[data-astro-cid-wp2l4cmv]{padding:var(--spacing-6) 0;border-bottom:1px solid var(--color-border-subtle)}.search-result[data-astro-cid-wp2l4cmv]:first-child{padding-top:0}.search-result[data-astro-cid-wp2l4cmv]:last-child{border-bottom:none}.result-link[data-astro-cid-wp2l4cmv]{color:inherit;text-decoration:none;display:block}.result-title[data-astro-cid-wp2l4cmv]{font-size:var(--font-size-xl);font-weight:var(--font-weight-heading);line-height:var(--leading-snug);margin-bottom:var(--spacing-2);transition:color var(--transition-fast)}.result-link[data-astro-cid-wp2l4cmv]:hover .result-title[data-astro-cid-wp2l4cmv]{color:var(--color-brand)}.result-snippet[data-astro-cid-wp2l4cmv]{font-size:var(--font-size-base);line-height:var(--leading-relaxed);color:var(--color-text-secondary)}.result-snippet[data-astro-cid-wp2l4cmv] mark{background:var(--color-brand-ring);color:inherit;border-radius:2px;padding:0 .1em}\n"},{"type":"external","src":"_astro/Base.v4DM9BTs.css"},{"type":"inline","content":"@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-bottom]{object-position:top bottom}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-top]{object-position:bottom top}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-right]{object-position:left right}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-left]{object-position:right left}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"route":"/search","isIndex":false,"type":"page","pattern":"^\\/search\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search.astro","pathname":"/search","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/sitemap.xml","pattern":"^\\/sitemap\\.xml$","segments":[[{"content":"sitemap.xml","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/sitemap.xml.mjs","pathname":"/sitemap.xml","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".post-card[data-astro-cid-sbmovh4h]{flex-direction:column;display:flex}.card-link[data-astro-cid-sbmovh4h]{color:inherit;text-decoration:none;display:block}.card-image[data-astro-cid-sbmovh4h]{aspect-ratio:16/10;border-radius:var(--radius-lg);background:var(--color-surface);margin-bottom:var(--spacing-4);overflow:hidden}.card-image[data-astro-cid-sbmovh4h] img[data-astro-cid-sbmovh4h]{object-fit:cover;width:100%;height:100%;transition:transform .3s}.card-link[data-astro-cid-sbmovh4h]:hover .card-image[data-astro-cid-sbmovh4h] img[data-astro-cid-sbmovh4h]{transform:scale(1.03)}.card-placeholder[data-astro-cid-sbmovh4h]{aspect-ratio:16/10;border-radius:var(--radius-lg);background:var(--color-surface);margin-bottom:var(--spacing-4)}.card-body[data-astro-cid-sbmovh4h]{flex:1}.card-meta[data-astro-cid-sbmovh4h]{align-items:center;column-gap:var(--spacing-3);font-size:var(--font-size-sm);color:var(--color-muted);margin-bottom:var(--spacing-2);flex-wrap:wrap;row-gap:0;display:flex}.card-meta[data-astro-cid-sbmovh4h] time[data-astro-cid-sbmovh4h],.card-meta[data-astro-cid-sbmovh4h] span[data-astro-cid-sbmovh4h]:not(.meta-dot){white-space:nowrap}.meta-dot[data-astro-cid-sbmovh4h]{background:var(--color-muted);border-radius:50%;width:3px;height:3px}.card-title[data-astro-cid-sbmovh4h]{font-size:var(--font-size-xl);font-weight:var(--font-weight-heading);line-height:var(--leading-snug);letter-spacing:var(--tracking-snug);margin-bottom:var(--spacing-2);transition:color var(--transition-fast)}.card-link[data-astro-cid-sbmovh4h]:hover .card-title[data-astro-cid-sbmovh4h]{color:var(--color-brand)}.card-excerpt[data-astro-cid-sbmovh4h]{font-size:var(--font-size-base);line-height:var(--leading-relaxed);color:var(--color-text-secondary);-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.card-tags[data-astro-cid-sbmovh4h]{gap:var(--spacing-2);margin-top:var(--spacing-3);flex-wrap:wrap;display:flex}.card-tag[data-astro-cid-sbmovh4h]{padding:var(--tag-padding-y) var(--spacing-2);font-size:var(--font-size-xs);color:var(--color-text-secondary);background:var(--color-surface);border-radius:var(--radius);transition:color var(--transition-fast), background var(--transition-fast);text-decoration:none;display:inline-block}.card-tag[data-astro-cid-sbmovh4h]:hover{color:var(--color-text);background:var(--color-border)}.card-bylines[data-astro-cid-sbmovh4h]{white-space:nowrap;align-items:center;gap:2px;display:flex}.card-byline[data-astro-cid-sbmovh4h]{align-items:center;gap:var(--spacing-1);display:inline-flex}.card-byline-avatar[data-astro-cid-sbmovh4h]{width:var(--avatar-size-xs);height:var(--avatar-size-xs);object-fit:cover;border-radius:50%}.card-byline-name[data-astro-cid-sbmovh4h]{color:var(--color-text-secondary);font-weight:500}.byline-more[data-astro-cid-sbmovh4h]{font-size:var(--font-size-xs);color:var(--color-muted);cursor:default;border-radius:var(--radius);outline-offset:2px;margin-left:2px;position:relative}.byline-more[data-astro-cid-sbmovh4h]:focus-visible{outline:2px solid var(--color-brand)}.byline-more[data-astro-cid-sbmovh4h][data-tooltip]:hover:after,.byline-more[data-astro-cid-sbmovh4h][data-tooltip]:focus-visible:after{content:attr(data-tooltip);white-space:nowrap;background:var(--color-text);color:var(--color-bg);font-size:var(--font-size-xs);padding:var(--spacing-1) var(--spacing-2);border-radius:var(--radius);pointer-events:none;z-index:10;font-weight:400;position:absolute;bottom:calc(100% + 6px);left:50%;transform:translate(-50%)}\n.archive-section[data-astro-cid-ln763jns]{max-width:var(--wide-width);padding:var(--spacing-12) var(--spacing-6);margin:0 auto}.archive-header[data-astro-cid-ln763jns]{margin-bottom:var(--spacing-12);padding-bottom:var(--spacing-8);border-bottom:1px solid var(--color-border-subtle)}.archive-label[data-astro-cid-ln763jns]{font-size:var(--font-size-xs);color:var(--color-brand);text-transform:uppercase;letter-spacing:var(--tracking-wider);margin-bottom:var(--spacing-2);font-weight:500;display:block}.archive-title[data-astro-cid-ln763jns]{font-size:var(--font-size-4xl);font-weight:var(--font-weight-display);letter-spacing:var(--tracking-tight);margin-bottom:var(--spacing-2)}.archive-count[data-astro-cid-ln763jns]{font-size:var(--font-size-sm);color:var(--color-muted)}.posts-grid[data-astro-cid-ln763jns]{gap:var(--spacing-12) var(--spacing-8);grid-template-columns:repeat(3,1fr);display:grid}.no-posts[data-astro-cid-ln763jns]{color:var(--color-muted)}@media (width<=900px){.posts-grid[data-astro-cid-ln763jns]{grid-template-columns:repeat(2,1fr)}}@media (width<=600px){.posts-grid[data-astro-cid-ln763jns]{grid-template-columns:1fr}}\n"},{"type":"external","src":"_astro/Base.v4DM9BTs.css"},{"type":"inline","content":"@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-bottom]{object-position:top bottom}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-top]{object-position:bottom top}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-right]{object-position:left right}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-left]{object-position:right left}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"route":"/tag/[slug]","isIndex":false,"type":"page","pattern":"^\\/tag\\/([^/]+?)\\/?$","segments":[[{"content":"tag","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/tag/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/sitemap-[collection].xml","pattern":"^\\/sitemap-([^/]+?)\\.xml$","segments":[[{"content":"sitemap-","dynamic":false,"spread":false},{"content":"collection","dynamic":true,"spread":false},{"content":".xml","dynamic":false,"spread":false}]],"params":["collection"],"component":"node_modules/emdash/dist/astro/routes/sitemap-_collection_.xml.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".post-card[data-astro-cid-sbmovh4h]{flex-direction:column;display:flex}.card-link[data-astro-cid-sbmovh4h]{color:inherit;text-decoration:none;display:block}.card-image[data-astro-cid-sbmovh4h]{aspect-ratio:16/10;border-radius:var(--radius-lg);background:var(--color-surface);margin-bottom:var(--spacing-4);overflow:hidden}.card-image[data-astro-cid-sbmovh4h] img[data-astro-cid-sbmovh4h]{object-fit:cover;width:100%;height:100%;transition:transform .3s}.card-link[data-astro-cid-sbmovh4h]:hover .card-image[data-astro-cid-sbmovh4h] img[data-astro-cid-sbmovh4h]{transform:scale(1.03)}.card-placeholder[data-astro-cid-sbmovh4h]{aspect-ratio:16/10;border-radius:var(--radius-lg);background:var(--color-surface);margin-bottom:var(--spacing-4)}.card-body[data-astro-cid-sbmovh4h]{flex:1}.card-meta[data-astro-cid-sbmovh4h]{align-items:center;column-gap:var(--spacing-3);font-size:var(--font-size-sm);color:var(--color-muted);margin-bottom:var(--spacing-2);flex-wrap:wrap;row-gap:0;display:flex}.card-meta[data-astro-cid-sbmovh4h] time[data-astro-cid-sbmovh4h],.card-meta[data-astro-cid-sbmovh4h] span[data-astro-cid-sbmovh4h]:not(.meta-dot){white-space:nowrap}.meta-dot[data-astro-cid-sbmovh4h]{background:var(--color-muted);border-radius:50%;width:3px;height:3px}.card-title[data-astro-cid-sbmovh4h]{font-size:var(--font-size-xl);font-weight:var(--font-weight-heading);line-height:var(--leading-snug);letter-spacing:var(--tracking-snug);margin-bottom:var(--spacing-2);transition:color var(--transition-fast)}.card-link[data-astro-cid-sbmovh4h]:hover .card-title[data-astro-cid-sbmovh4h]{color:var(--color-brand)}.card-excerpt[data-astro-cid-sbmovh4h]{font-size:var(--font-size-base);line-height:var(--leading-relaxed);color:var(--color-text-secondary);-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.card-tags[data-astro-cid-sbmovh4h]{gap:var(--spacing-2);margin-top:var(--spacing-3);flex-wrap:wrap;display:flex}.card-tag[data-astro-cid-sbmovh4h]{padding:var(--tag-padding-y) var(--spacing-2);font-size:var(--font-size-xs);color:var(--color-text-secondary);background:var(--color-surface);border-radius:var(--radius);transition:color var(--transition-fast), background var(--transition-fast);text-decoration:none;display:inline-block}.card-tag[data-astro-cid-sbmovh4h]:hover{color:var(--color-text);background:var(--color-border)}.card-bylines[data-astro-cid-sbmovh4h]{white-space:nowrap;align-items:center;gap:2px;display:flex}.card-byline[data-astro-cid-sbmovh4h]{align-items:center;gap:var(--spacing-1);display:inline-flex}.card-byline-avatar[data-astro-cid-sbmovh4h]{width:var(--avatar-size-xs);height:var(--avatar-size-xs);object-fit:cover;border-radius:50%}.card-byline-name[data-astro-cid-sbmovh4h]{color:var(--color-text-secondary);font-weight:500}.byline-more[data-astro-cid-sbmovh4h]{font-size:var(--font-size-xs);color:var(--color-muted);cursor:default;border-radius:var(--radius);outline-offset:2px;margin-left:2px;position:relative}.byline-more[data-astro-cid-sbmovh4h]:focus-visible{outline:2px solid var(--color-brand)}.byline-more[data-astro-cid-sbmovh4h][data-tooltip]:hover:after,.byline-more[data-astro-cid-sbmovh4h][data-tooltip]:focus-visible:after{content:attr(data-tooltip);white-space:nowrap;background:var(--color-text);color:var(--color-bg);font-size:var(--font-size-xs);padding:var(--spacing-1) var(--spacing-2);border-radius:var(--radius);pointer-events:none;z-index:10;font-weight:400;position:absolute;bottom:calc(100% + 6px);left:50%;transform:translate(-50%)}\n"},{"type":"external","src":"_astro/index.1TSn_jbr.css"},{"type":"external","src":"_astro/Base.v4DM9BTs.css"},{"type":"inline","content":"@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-bottom]{object-position:top bottom}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-top]{object-position:bottom top}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-right]{object-position:left right}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-left]{object-position:right left}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"serverLike":true,"middlewareMode":"classic","base":"/","trailingSlash":"ignore","compressHTML":"jsx","componentMetadata":[["C:/Users/prohl/Documents/blog/my-site/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/bylines/index.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/disable.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/enable.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/index.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/settings.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/uninstall.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/update.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/plugins/index.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/index.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/index.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/artifact.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/plugins/updates.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/index.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/index.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/execute.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/import/wordpress/execute.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/_fieldSlug_.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/index.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/reorder.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/index.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/schema/collections/index.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/schema/orphans/_slug_.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/schema/orphans/index.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/index.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/taxonomies/index.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/sitemap-_collection_.xml.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/import/wordpress/analyze.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/import/wordpress/media.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/media/_id_/confirm.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/media/upload-url.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/schema/index.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/src/pages/category/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/src/pages/pages/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/src/pages/posts/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/src/pages/posts/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/src/pages/rss.xml.ts",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/src/pages/search.astro",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/src/pages/tag/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/setup/dev-bypass.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/setup/index.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/astro/routes/api/mcp.mjs",{"propagation":"none","containsHead":true}],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/astro/routes/admin.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"astro/entrypoints/prerender":"prerender-entry.BAxohyd8.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_CvzplLvf.mjs","\u0000astro:content":"chunks/_astro_content_InhjPmU7.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_DF6QNokH.mjs","\u0000virtual:astro:cache-provider":"chunks/_virtual_astro_cache-provider__w3VcCl0.mjs","\u0000virtual:astro:middleware":"virtual_astro_middleware.mjs","\u0000virtual:astro:server-island-manifest":"chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs","\u0000virtual:astro:session-driver":"chunks/_virtual_astro_session-driver_DS5V7T-N.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/plugins/adapt-sandbox-entry.mjs":"chunks/adapt-sandbox-entry_gWj33pDl.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/apply-CmIJK9j8.mjs":"chunks/apply-CmIJK9j8_BXQDCnpo.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/bylines-czseViYo.mjs":"chunks/bylines-czseViYo_Cs_76Gcc.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/cache-CGCd6AVM.mjs":"chunks/cache-CGCd6AVM_D40aAW8m.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/chunks-BxXyunY-.mjs":"chunks/chunks-BxXyunY-_Ct7aDsqB.mjs","\u0000virtual:emdash/config":"chunks/config_aMFX80P_.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/content-Ci04z2z-.mjs":"chunks/content-Ci04z2z-_C-m3vh_7.mjs","\u0000virtual:emdash/dialect":"chunks/dialect_C4kIkDQj.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/field-defs-cache-DvmlgP-D.mjs":"chunks/field-defs-cache-DvmlgP-D_C9dVOJKb.mjs","C:/Users/prohl/Documents/blog/my-site/src/live.config.ts":"chunks/live.config_D4TTs_Rg.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/load-Cx27ki1l.mjs":"chunks/load-Cx27ki1l_VOVp9SrB.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/loader-Be3ouI5L.mjs":"chunks/loader-Be3ouI5L_Ci-QkQvc.mjs","\u0000virtual:astro:actions/noop-entrypoint":"chunks/noop-entrypoint_Z3zFhrGC.mjs","\u0000virtual:emdash/object-cache":"chunks/object-cache_DyS47IAq.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/query-DR73ZNfm.mjs":"chunks/query-DR73ZNfm_B3oLB0Ua.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/registry-FV15nLge.mjs":"chunks/registry-FV15nLge_CLV8XNUm.mjs","\u0000virtual:emdash/seed":"chunks/seed_0tdY2fwo.mjs","\u0000astro:config/server":"chunks/server_BvN5DBl1.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/taxonomies-DjSKBZpq.mjs":"chunks/taxonomies-DjSKBZpq_QkJ3G2zF.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/validate-V9nCwq_-.mjs":"chunks/validate-V9nCwq_-_vQiZ2KN3.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/validation-BsVUJfsP.mjs":"chunks/validation-BsVUJfsP_DjXGy49j.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/@astrojs/react/dist/vnode-children.js":"chunks/vnode-children_B6vVcKTz.mjs","\u0000virtual:emdash/wait-until":"chunks/wait-until_DmvIcgN5.mjs","@astrojs/node/server.js":"entry.mjs","\u0000virtual:astro:page:src/pages/404@_@astro":"chunks/404_BmChgN7e.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/plugins/_pluginId_/_...path_@_@mjs":"chunks/_.._CFKVvk_4.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/file/_...key_@_@mjs":"chunks/_.._Cx05jelA.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/_domain_@_@mjs":"chunks/_domain__Ca-IodHl.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/_fieldSlug_@_@mjs":"chunks/_fieldSlug__C_R-Ln_O.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/_hookName_@_@mjs":"chunks/_hookName__18Jj1F8t.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_@_@mjs":"chunks/_id__3dcR5UFE.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/_id_@_@mjs":"chunks/_id__4hgMxceT.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/_id_@_@mjs":"chunks/_id__BV7pqC1u.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_@_@mjs":"chunks/_id__BVLgxaZ5.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/_id_@_@mjs":"chunks/_id__BgaW91l8.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_@_@mjs":"chunks/_id__CjDmF7Oy.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_@_@mjs":"chunks/_id__DRKvb-DU.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/_id_@_@mjs":"chunks/_id___qDv-8rF.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_@_@mjs":"chunks/_id__o-jtjGMv.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/_itemId_@_@mjs":"chunks/_itemId__pkzk1TBU.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_@_@mjs":"chunks/_name__CIg1aIOI.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/archives/_name_@_@mjs":"chunks/_name__D6ormbny.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_@_@mjs":"chunks/_name__DFfUQ1I-.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_@_@mjs":"chunks/_provider__htFMTcyX.mjs","\u0000virtual:astro:page:src/pages/tag/[slug]@_@astro":"chunks/_slug__BdQhH54S.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/sections/_slug_@_@mjs":"chunks/_slug__Bnz9Yyjw.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_@_@mjs":"chunks/_slug__CGAWjPt_.mjs","\u0000virtual:astro:page:src/pages/category/[slug]@_@astro":"chunks/_slug__CGcAOGkv.mjs","\u0000virtual:astro:page:src/pages/posts/[slug]@_@astro":"chunks/_slug__CNMJCngW.mjs","\u0000virtual:astro:page:src/pages/pages/[slug]@_@astro":"chunks/_slug__Dn6ilDeR.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_@_@mjs":"chunks/_slug__Kh4c8-UJ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/orphans/_slug_@_@mjs":"chunks/_slug__PkMKmKr2.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_@_@mjs":"chunks/_taxonomy__DYtpsEve.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/invite/accept@_@mjs":"chunks/accept_BnapDNGU.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/admin-verify@_@mjs":"chunks/admin-verify_DE8JN5hG.mjs","\u0000virtual:astro:page:node_modules/emdash/src/astro/routes/admin@_@astro":"chunks/admin_BDqqHsUA.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/admin@_@mjs":"chunks/admin_Bh_Lzqap.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze@_@mjs":"chunks/analyze_Bu4yg3KI.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/analyze@_@mjs":"chunks/analyze_DB5oDPTA.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/artifact@_@mjs":"chunks/artifact_Bq-5Rw8l.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/well-known/auth@_@mjs":"chunks/auth_LEtRi63e.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/authorize@_@mjs":"chunks/authorize_CpIUvWgE.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/device/authorize@_@mjs":"chunks/authorize_fuHgfY-M.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/authors@_@mjs":"chunks/authors_Cm-wA5lv.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/bulk@_@mjs":"chunks/bulk_eAYKSqTT.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/byline-XEjchwzZ.mjs":"chunks/byline-XEjchwzZ_Bqd634L9.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/bylines-BJbT4gKS.mjs":"chunks/bylines-BJbT4gKS_MgWoGfDb.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/bylines/index.ts":"chunks/bylines_CXA-LmjW.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/callback@_@mjs":"chunks/callback_DNpf2W8O.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_/callback@_@mjs":"chunks/callback_f6_ZZy9o.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/device/code@_@mjs":"chunks/code_TEpHUPKo.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/compare@_@mjs":"chunks/compare_Dd9KHluf.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/signup/complete@_@mjs":"chunks/complete_JdSqUH4v.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/invite/complete@_@mjs":"chunks/complete_tVrDGk3S.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/confirm@_@mjs":"chunks/confirm_BQhXjJ5s.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/counts@_@mjs":"chunks/counts_BN9_n8YK.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/dashboard@_@mjs":"chunks/dashboard_D3vGltAk.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/dev-bypass@_@mjs":"chunks/dev-bypass_CLDUasfc.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/dev-bypass@_@mjs":"chunks/dev-bypass_IRr23Wk7.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/dev-reset@_@mjs":"chunks/dev-reset_Blqv5KU-.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/_id_/disable@_@mjs":"chunks/disable_C0z7Kh91.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/disable@_@mjs":"chunks/disable_CLo5EJDf.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/discard-draft@_@mjs":"chunks/discard-draft_D6eFOsKD.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/duplicate@_@mjs":"chunks/duplicate_B4O16h78.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/email@_@mjs":"chunks/email_4jbxfQOf.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/dev/emails@_@mjs":"chunks/emails_yezHG2S2.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/enable@_@mjs":"chunks/enable_BbJDOwsW.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/enable@_@mjs":"chunks/enable_CUlWcr6H.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/_id_/enable@_@mjs":"chunks/enable_CuabP71-.mjs","\u0000virtual:emdash/env":"chunks/env_tImiiId5.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/execute@_@mjs":"chunks/execute_B8kQiDNa.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/execute@_@mjs":"chunks/execute_DgwkGGmi.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/export@_@mjs":"chunks/export_BHLvIrHz.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/bylines/field-defs-cache.ts":"chunks/field-defs-cache__Mb-upKY.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/fts-manager-DzqIBrrW.mjs":"chunks/fts-manager-DzqIBrrW_DYoq1tH7.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/icon@_@mjs":"chunks/icon_Dn8TFIve.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/image-endpoint@_@mjs":"chunks/image-endpoint_CrWXIHWw.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/index@_@mjs":"chunks/index_2oRuYRps.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/invite/index@_@mjs":"chunks/index_B-eQ3f2P.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/index@_@mjs":"chunks/index_B9FCBm6F.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/404s/index@_@mjs":"chunks/index_BG2yX59E.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/index@_@mjs":"chunks/index_BMKB8iUJ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/index@_@mjs":"chunks/index_BNFOBfO8.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/index@_@mjs":"chunks/index_BTVsE7U3.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/api-tokens/index@_@mjs":"chunks/index_BWcg6qPm.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/sections/index@_@mjs":"chunks/index_Bj96G7Ku.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/index@_@mjs":"chunks/index_Bo8iG7uz.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/index@_@mjs":"chunks/index_Bqt5gMjG.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index@_@mjs":"chunks/index_Br8hAho_.mjs","\u0000virtual:astro:page:src/pages/index@_@astro":"chunks/index_BxJXDgbm.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/index@_@mjs":"chunks/index_C-0plP4P.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/index@_@mjs":"chunks/index_C53IamsK.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/index@_@mjs":"chunks/index_C7rCULeL.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/index@_@mjs":"chunks/index_C8MvZVu4.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/_id_/index@_@mjs":"chunks/index_CA54UwKp.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index@_@mjs":"chunks/index_CBi85kEd.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/index@_@mjs":"chunks/index_CE6pY6xW.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/index@_@mjs":"chunks/index_CKmcc5WC.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/index@_@mjs":"chunks/index_CZAVK_uj.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/index@_@mjs":"chunks/index_CZ_wY1tm.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/index@_@mjs":"chunks/index_Cc4DU4iS.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/index@_@mjs":"chunks/index_CleoFeCd.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/index@_@mjs":"chunks/index_CxDRAKVc.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/index@_@mjs":"chunks/index_D7-bICPC.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/index@_@mjs":"chunks/index_DQZ6aJVk.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/orphans/index@_@mjs":"chunks/index_DRyayUzI.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/index@_@mjs":"chunks/index_DX5wwgze.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/index@_@mjs":"chunks/index_DmKzQIE5.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index@_@mjs":"chunks/index_GbxM3gSW.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/index@_@mjs":"chunks/index_ImmdLPMf.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/index@_@mjs":"chunks/index_Kv6ldgd2.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/index@_@mjs":"chunks/index_SRdHYOml.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/index@_@mjs":"chunks/index_TDrL6FRV.mjs","\u0000virtual:astro:page:src/pages/posts/index@_@astro":"chunks/index_U3PQtdyF.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/index@_@mjs":"chunks/index_U9hBKV_7.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/index@_@mjs":"chunks/index_WoE3VJ-H.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/providers/index@_@mjs":"chunks/index_eQKI3__F.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/index@_@mjs":"chunks/index_jQ41p1vT.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install@_@mjs":"chunks/install_Dhd7VRy7.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install@_@mjs":"chunks/install_mCetrQrW.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/items@_@mjs":"chunks/items_Dr-JT4aF.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/auth/dist/adapters/kysely.mjs":"chunks/kysely_DOyOei8H.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/loader.ts":"chunks/loader_BVU5p3DI.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/logout@_@mjs":"chunks/logout_8m61nxJx.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/manifest@_@mjs":"chunks/manifest_tK1X9AMg.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/mcp@_@mjs":"chunks/mcp_BXhL4nPB.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/mcp@_@mjs":"chunks/mcp_BnRcOsNg.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/me@_@mjs":"chunks/me_BWU8eRm9.mjs","\u0000virtual:emdash/media-providers":"chunks/media-providers_DOdgzUGc.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/media-upload-D2wk3EIt.mjs":"chunks/media-upload-D2wk3EIt_D0xmBkKW.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/media-usage-CljdO1mc.mjs":"chunks/media-usage-CljdO1mc_DOPTwjBw.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media@_@mjs":"chunks/media_CPB-IG45.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/media@_@mjs":"chunks/media_CRxcGBZT.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/menus-CZyG6rvx.mjs":"chunks/menus-CZyG6rvx_wrV8I6C7.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-30qbnmRx.js":"_astro/messages-30qbnmRx.DCJc-yEe.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-Axst6gLr.js":"_astro/messages-Axst6gLr.Bl2cGhI6.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-B-bWgBX8.js":"_astro/messages-B-bWgBX8.D_t1BR8E.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-B0QaP8co.js":"_astro/messages-B0QaP8co.DPuHQ9UM.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-BGf8F1lR.js":"_astro/messages-BGf8F1lR.BulIaZ-2.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-BMgCc4cZ.js":"_astro/messages-BMgCc4cZ.ClGo3If7.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-BNhQh9T8.js":"_astro/messages-BNhQh9T8.knvYpjT3.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-BR-TSB_9.js":"_astro/messages-BR-TSB_9.DZosCVvy.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-BSqQiKKo.js":"_astro/messages-BSqQiKKo.Bujgvrsy.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-Be0xmdDi.js":"_astro/messages-Be0xmdDi.DdAXizjv.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-BkOa_w3b.js":"_astro/messages-BkOa_w3b.LAtEatnu.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-Bqzqrw4i.js":"_astro/messages-Bqzqrw4i.CgQ8jb1U.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-CBWpqPBL.js":"_astro/messages-CBWpqPBL.DurhbQNa.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-CIkqn_8n.js":"_astro/messages-CIkqn_8n.CcSaii7b.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-CMbNQ7lX.js":"_astro/messages-CMbNQ7lX.Db1dMZJy.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-CSAH0lQI.js":"_astro/messages-CSAH0lQI.BR5b-BBE.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-CXUOdBIL.js":"_astro/messages-CXUOdBIL.CJuV1o4E.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-CnNncIUV.js":"_astro/messages-CnNncIUV.B4_puea4.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-CpRrAHoJ.js":"_astro/messages-CpRrAHoJ.CSKvDwgX.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-D0KmmMuH.js":"_astro/messages-D0KmmMuH.BkHQ9PpU.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-D6A5PrwK.js":"_astro/messages-D6A5PrwK.DmbnumOn.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-DD28du-X.js":"_astro/messages-DD28du-X.ZBZXGy9P.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-DWuyZMXt.js":"_astro/messages-DWuyZMXt.C3z8QW-U.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-JApRIdzY.js":"_astro/messages-JApRIdzY.DrCmTX87.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-l-TFOm7q.js":"_astro/messages-l-TFOm7q.pRqY4vZL.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/admin/dist/messages-lfFNZ58n.js":"_astro/messages-lfFNZ58n.BcAptHG4.js","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/mode@_@mjs":"chunks/mode_vptULOkN.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/well-known/oauth-authorization-server@_@mjs":"chunks/oauth-authorization-server_FE9d0uce.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/well-known/oauth-protected-resource@_@mjs":"chunks/oauth-protected-resource_D00vtoqA.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options@_@mjs":"chunks/options_B_vVLlzt.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/options@_@mjs":"chunks/options_Bw8JP8ab.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/permanent@_@mjs":"chunks/permanent_wOuornSQ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare@_@mjs":"chunks/prepare_Cw8dJmhj.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url@_@mjs":"chunks/preview-url_B1eZusS3.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/themes/preview@_@mjs":"chunks/preview_BtO2VBM9.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/probe@_@mjs":"chunks/probe_Ds136kHw.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/publish@_@mjs":"chunks/publish_Bv6qmTsU.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/query.ts":"chunks/query_BMyyJgkQ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/reactions@_@mjs":"chunks/reactions_eahEbFUj.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/rebuild@_@mjs":"chunks/rebuild_B-yTF3_-.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token/refresh@_@mjs":"chunks/refresh_Ip5q9C0K.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/invite/register-options@_@mjs":"chunks/register-options_DdvkD7Jz.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/register@_@mjs":"chunks/register_CoR4SKJd.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/reorder@_@mjs":"chunks/reorder_0Pu7uHst.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/reorder@_@mjs":"chunks/reorder_B7sPhMkZ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/reorder@_@mjs":"chunks/reorder_B_SAudhT.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/reorder@_@mjs":"chunks/reorder_Bi8E9Pow.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/repair@_@mjs":"chunks/repair_BMUMGI9R.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/signup/request@_@mjs":"chunks/request_DR-MdHrN.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore@_@mjs":"chunks/restore_1SWHVGjs.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/restore@_@mjs":"chunks/restore_DjJP3LJ1.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions@_@mjs":"chunks/revisions_Bnl84CpB.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token/revoke@_@mjs":"chunks/revoke_BFyqt3VO.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/rewrite-urls@_@mjs":"chunks/rewrite-urls_gD5wt3kM.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/robots.txt@_@mjs":"chunks/robots_vOnWx9Fo.mjs","\u0000virtual:astro:page:src/pages/rss.xml@_@ts":"chunks/rss_DwfPVC30.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/schedule@_@mjs":"chunks/schedule_D9OrQZEB.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/schema-BXxlHeAf.mjs":"chunks/schema-BXxlHeAf_D21wbBV2.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/search-Bff-7jFt.mjs":"chunks/search-Bff-7jFt_nhOVM-wl.mjs","\u0000virtual:astro:page:src/pages/search@_@astro":"chunks/search_sfv8fSzk.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/_id_/send-recovery@_@mjs":"chunks/send-recovery_1bYkg8Qt.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/magic-link/send@_@mjs":"chunks/send_D-aGhiAA.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/settings-C4s8hFQm.mjs":"chunks/settings-C4s8hFQm_DyYD8Qdh.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings@_@mjs":"chunks/settings_Cbad80YH.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/settings@_@mjs":"chunks/settings_Ct9hXYf0.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_M46T65qH.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/sitemap-_collection_.xml@_@mjs":"chunks/sitemap-_collection__CxHzORI3.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/sitemap.xml@_@mjs":"chunks/sitemap_0_y85KLM.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/snapshot@_@mjs":"chunks/snapshot_Df6XFlsr.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/stats@_@mjs":"chunks/stats_DTsSt9w8.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status@_@mjs":"chunks/status_Bt-D2pnn.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/status@_@mjs":"chunks/status_CbgWnJHF.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/suggest@_@mjs":"chunks/suggest_Dt0I-KkH.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/404s/summary@_@mjs":"chunks/summary_BBoMdVs9.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/taxonomies-Ce49uIzY.mjs":"chunks/taxonomies-Ce49uIzY_D9lqX2cB.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/taxonomies/index.ts":"chunks/taxonomies_BafXOZom.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/taxonomy-DfVooU4W.mjs":"chunks/taxonomy-DfVooU4W_D6rjF5JT.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/thumbnail@_@mjs":"chunks/thumbnail_CMosSeY4.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token@_@mjs":"chunks/token_BRiSCPBI.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/device/token@_@mjs":"chunks/token_Dy0PknSv.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/translations@_@mjs":"chunks/translations_DWrextZ8.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations@_@mjs":"chunks/translations_Di1TpBY6.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations@_@mjs":"chunks/translations_Dz93sTJg.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/translations@_@mjs":"chunks/translations_oGsWHp8r.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/trash@_@mjs":"chunks/trash_C1KMRo5y.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/typegen@_@mjs":"chunks/typegen_77aCz8cG.mjs","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/dist/types-D1iJ3DpO.mjs":"chunks/types-D1iJ3DpO_BJR-xK0z.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/uninstall@_@mjs":"chunks/uninstall_C_Kak_xS.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/unpublish@_@mjs":"chunks/unpublish_CW0jiS45.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/update@_@mjs":"chunks/update_B2jgakf_.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/updates@_@mjs":"chunks/updates_DIV64owb.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/upload-url@_@mjs":"chunks/upload-url_D2-y89_4.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage@_@mjs":"chunks/usage_DLxziG1L.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/usage@_@mjs":"chunks/usage_luXxjB75.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/magic-link/verify@_@mjs":"chunks/verify_BL9i-Vie.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/verify@_@mjs":"chunks/verify_ChE3aLBZ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify@_@mjs":"chunks/verify_Ci-BVwyR.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/signup/verify@_@mjs":"chunks/verify_CkAe3dy5.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-components@_@mjs":"chunks/widget-components_DV5s7qea.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets@_@mjs":"chunks/widgets_OxkFneoi.mjs","C:/Users/prohl/Documents/blog/my-site/src/layouts/Base.astro?astro&type=script&index=0&lang.ts":"_astro/Base.astro_astro_type_script_index_0_lang.Dg3X-jzG.js","C:/Users/prohl/Documents/blog/my-site/src/layouts/Base.astro?astro&type=script&index=1&lang.ts":"_astro/Base.astro_astro_type_script_index_1_lang.BnenOeJ4.js","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/CommentForm.astro?astro&type=script&index=0&lang.ts":"_astro/CommentForm.astro_astro_type_script_index_0_lang.D3OabnQ1.js","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/InlinePortableTextEditor.tsx":"_astro/InlinePortableTextEditor.BicIBf7L.js","C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/LiveSearch.astro?astro&type=script&index=0&lang.ts":"_astro/LiveSearch.astro_astro_type_script_index_0_lang.9-oQTAj2.js","emdash/routes/PluginRegistry":"_astro/PluginRegistry.BnavTeu9.js","C:/Users/prohl/Documents/blog/my-site/src/pages/posts/[slug].astro?astro&type=script&index=0&lang.ts":"_astro/_slug_.astro_astro_type_script_index_0_lang.0vK6ag_f.js","@astrojs/react/client.js":"_astro/client.CdiVc1BW.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@emdash-cms/registry-client/dist/discovery/index.js":"_astro/discovery.CPJoeEhc.js","C:/Users/prohl/Documents/blog/my-site/node_modules/@atcute/identity-resolver/dist/index.js":"_astro/dist.oOL4nY1Y.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/prohl/Documents/blog/my-site/src/layouts/Base.astro?astro&type=script&index=0&lang.ts","var e=/theme=([^;]+)/,t=document.querySelectorAll(`.theme-btn`),n=document.documentElement;function r(e,t,n=31536e3){let r=location.protocol===`https:`?`; Secure`:``;t===``?document.cookie=`${e}=; path=/; max-age=0; SameSite=Lax${r}`:document.cookie=`${e}=${t}; path=/; max-age=${n}; SameSite=Lax${r}`}function i(e){e===`system`?(r(`theme`,``),n.classList.remove(`light`,`dark`)):(r(`theme`,e),n.classList.remove(`light`,`dark`),n.classList.add(e)),a(e)}function a(e){t.forEach(t=>{t.classList.toggle(`active`,t.dataset.theme===e)})}function o(){let t=document.cookie.match(e);return t?t[1]:`system`}i(o()),t.forEach(e=>{e.addEventListener(`click`,()=>{i(e.dataset.theme||`system`)})});"],["C:/Users/prohl/Documents/blog/my-site/src/layouts/Base.astro?astro&type=script&index=1&lang.ts","document.addEventListener(`keydown`,e=>{if((e.metaKey||e.ctrlKey)&&e.key===`k`){e.preventDefault();let t=document.querySelector(`.site-search-input`);t&&t.focus()}});"],["C:/Users/prohl/Documents/blog/my-site/node_modules/emdash/src/components/CommentForm.astro?astro&type=script&index=0&lang.ts","document.addEventListener(`submit`,async e=>{let t=e.target;if(!(t instanceof HTMLFormElement)||!t.hasAttribute(`data-ec-comment-form`))return;e.preventDefault();let n=t.dataset.endpoint;if(!n)return;let r=t.querySelector(`.ec-comment-form-submit`),i=t.querySelector(`.ec-comment-form-status`);if(!r||!i)return;r.disabled=!0,r.textContent=`Submitting...`,i.textContent=``,i.className=`ec-comment-form-status`;let a=new FormData(t),o={},s=t.dataset.userName,c=t.dataset.userEmail;s&&(o.authorName=s),c&&(o.authorEmail=c);for(let[e,t]of a.entries())typeof t==`string`&&(o[e]=t);let l=t.querySelector(`[name='cf-turnstile-response']`);l?.value&&(o.turnstileToken=l.value);try{let e=await fetch(n,{method:`POST`,headers:{\"Content-Type\":`application/json`,\"X-EmDash-Request\":`1`},body:JSON.stringify(o)}),r=await e.json();if(e.ok){i.textContent=r.message||`Comment submitted!`,i.classList.add(`ec-comment-form-success`);let e=t.querySelector(`textarea[name='body']`);e&&(e.value=``)}else i.textContent=r.error?.message||r.message||`Failed to submit comment.`,i.classList.add(`ec-comment-form-error`)}catch{i.textContent=`Network error. Please try again.`,i.classList.add(`ec-comment-form-error`)}finally{window.turnstile!==void 0&&window.turnstile.reset(),r.disabled=!1,r.textContent=`Post Comment`}});"],["C:/Users/prohl/Documents/blog/my-site/src/pages/posts/[slug].astro?astro&type=script&index=0&lang.ts","function e(){let e=document.querySelector(`.article-content`),t=document.getElementById(`toc-content`);if(!e||!t)return;let n=e.querySelectorAll(`h2, h3`);if(n.length===0){let e=document.querySelector(`.toc`);e&&(e.style.display=`none`);return}let r=document.createElement(`ul`);r.className=`toc-list`,n.forEach((e,t)=>{e.id||=`heading-${t}`;let n=document.createElement(`li`);n.className=e.tagName===`H3`?`toc-item toc-item--nested`:`toc-item`;let i=document.createElement(`a`);i.href=`#${e.id}`,i.className=`toc-link`,i.textContent=e.textContent,n.appendChild(i),r.appendChild(n)}),t.appendChild(r);let i=new IntersectionObserver(e=>{e.forEach(e=>{let n=e.target.id,r=t.querySelector(`a[href=\"#${n}\"]`);r&&e.isIntersecting&&(t.querySelectorAll(`.toc-link`).forEach(e=>e.classList.remove(`active`)),r.classList.add(`active`))})},{rootMargin:`-80px 0px -80% 0px`});n.forEach(e=>i.observe(e))}e();"]],"assets":["/_astro/client.CdiVc1BW.js","/_astro/discovery.CPJoeEhc.js","/_astro/dist.BSKnbGhk.js","/_astro/dist.oOL4nY1Y.js","/_astro/handle.Pza2adut.js","/_astro/InlinePortableTextEditor.BicIBf7L.js","/_astro/LiveSearch.astro_astro_type_script_index_0_lang.9-oQTAj2.js","/_astro/messages-30qbnmRx.DCJc-yEe.js","/_astro/messages-Axst6gLr.Bl2cGhI6.js","/_astro/messages-B-bWgBX8.D_t1BR8E.js","/_astro/messages-B0QaP8co.DPuHQ9UM.js","/_astro/messages-Be0xmdDi.DdAXizjv.js","/_astro/messages-BGf8F1lR.BulIaZ-2.js","/_astro/messages-BkOa_w3b.LAtEatnu.js","/_astro/messages-BMgCc4cZ.ClGo3If7.js","/_astro/messages-BNhQh9T8.knvYpjT3.js","/_astro/messages-Bqzqrw4i.CgQ8jb1U.js","/_astro/messages-BR-TSB_9.DZosCVvy.js","/_astro/messages-BSqQiKKo.Bujgvrsy.js","/_astro/messages-CBWpqPBL.DurhbQNa.js","/_astro/messages-CIkqn_8n.CcSaii7b.js","/_astro/messages-CMbNQ7lX.Db1dMZJy.js","/_astro/messages-CnNncIUV.B4_puea4.js","/_astro/messages-CpRrAHoJ.CSKvDwgX.js","/_astro/messages-CSAH0lQI.BR5b-BBE.js","/_astro/messages-CXUOdBIL.CJuV1o4E.js","/_astro/messages-D0KmmMuH.BkHQ9PpU.js","/_astro/messages-D6A5PrwK.DmbnumOn.js","/_astro/messages-DD28du-X.ZBZXGy9P.js","/_astro/messages-DWuyZMXt.C3z8QW-U.js","/_astro/messages-JApRIdzY.DrCmTX87.js","/_astro/messages-l-TFOm7q.pRqY4vZL.js","/_astro/messages-lfFNZ58n.BcAptHG4.js","/_astro/PluginRegistry.BnavTeu9.js","/_astro/react-dom.CSegWjX7.js","/_astro/fonts/08f0ea18cdf1ae81.woff2","/_astro/fonts/1633c6c006fb5995.woff2","/_astro/fonts/190f8cf059e0f931.woff2","/_astro/fonts/1d7aab50fda97bb3.woff2","/_astro/fonts/1e5097bbf9c9d577.woff2","/_astro/fonts/63342f4e10d096aa.woff2","/_astro/fonts/6ed39b447c70fac7.woff2","/_astro/fonts/81fc65a9fa1b7533.woff2","/_astro/fonts/84070159564df0be.woff2","/_astro/fonts/91753f8d8da3aeb7.woff2","/_astro/fonts/9593fbb8383eb01c.woff2","/_astro/fonts/a582ec5275b6220a.woff2","/_astro/fonts/a9bea187e846fcc2.woff2","/_astro/fonts/ad35ff1453ab1728.woff2","/_astro/fonts/cced06053f87829e.woff2","/_astro/fonts/d39725b5b6a6f2ec.woff2","/_astro/fonts/d581d51cd793384e.woff2","/_astro/fonts/d767dad80444f27b.woff2","/_astro/fonts/e868cdf4720e9ea5.woff2","/_astro/fonts/f52e1d65e1364c61.woff2","/_astro/styles.DQ24hMvS.css","/_astro/Base.v4DM9BTs.css","/_astro/index.1TSn_jbr.css","/_astro/_slug_.Cbsuovo4.css"],"buildFormat":"directory","checkOrigin":false,"actionBodySizeLimit":1048576,"serverIslandBodySizeLimit":1048576,"allowedDomains":[],"key":"LRK8mIERjgSIhpD89Pwxt3+vA1u+yxvecdmFbJx2TBc=","sessionConfig":{"driver":"unstorage/drivers/fs-lite","options":{"base":"C:\\Users\\prohl\\Documents\\blog\\my-site\\node_modules\\.astro\\sessions"}},"cacheConfig":{"provider":"astro/cache/memory","options":{"max":500}},"image":{"layout":"constrained"},"devToolbar":{"enabled":false,"debugInfoOutput":""},"logLevel":"info","shouldInjectCspMetaTags":false});
var manifestRoutes = _manifest.routes;
var manifest = Object.assign(_manifest, {
	renderers,
	actions: () => import("./noop-entrypoint_Z3zFhrGC.mjs"),
	middleware: () => import("../virtual_astro_middleware.mjs"),
	sessionDriver: () => import("./_virtual_astro_session-driver_DS5V7T-N.mjs"),
	cacheProvider: () => import("./_virtual_astro_cache-provider__w3VcCl0.mjs"),
	serverIslandMappings: () => import("./_virtual_astro_server-island-manifest_C1Q2srgE.mjs"),
	routes: manifestRoutes,
	pageMap
});
function getAmbientManifest() {
	const manifest$1 = manifest;
	if (!manifest$1) throw new AstroError(NoManifestAvailable);
	return manifest$1;
}
//#endregion
//#region node_modules/astro/dist/core/fetch/default-handler.js
var DefaultFetchHandler = class {
	#manifest;
	/**
	* `BaseApp` passes itself so states resolve that app's manifest ahead of
	* the ambient one; generated builds construct the handler with no
	* arguments and use the ambient manifest.
	*/
	constructor(app) {
		this.#manifest = app?.manifest;
	}
	fetch = (request) => {
		const options = getRenderOptions(request);
		return handleRequest(new FetchState(this.#manifest ?? getAmbientManifest(), request, options));
	};
};
//#endregion
export { validateForwardedHeaders as a, getFirstForwardedValue as i, manifest as n, validateHost as o, App as r, DefaultFetchHandler as t };
