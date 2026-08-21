import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const DEFAULT_APP_NAME = "notquite";
export const OG_SERVICE_URL_DEFAULT = "https://og.grok.me";
export const OG_SITE_REL_PATH = "src/lib/og/site.json";
export const GROK_EXTENSIONS_SCRIPT_SRC =
  "https://grok.com/grok-app-builder/extensions.js";

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function appNameFromHost(hostHeader) {
  const host = String(hostHeader ?? "").split(",")[0].trim().split(":")[0].toLowerCase();
  if (!host.endsWith(".grok.me")) return DEFAULT_APP_NAME;
  const slug = host.split(".")[0] ?? "";
  if (!slug || slug === "www") return DEFAULT_APP_NAME;
  return slug.split("-").filter(Boolean).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ") || DEFAULT_APP_NAME;
}

export function publicAppHost(hostHeader) {
  const host = String(hostHeader ?? "").split(",")[0].trim().split(":")[0].toLowerCase();
  if (!host || !host.includes(".")) return "";
  if (host.endsWith(".vercel.app") || host === "vercel.app") return "";
  return host;
}

export function resolvePublicHost(hostHeader) {
  return publicAppHost(process.env?.VITE_PUBLIC_HOSTNAME) || publicAppHost(hostHeader);
}

export function isInstallQuery(url) {
  const query = String(url ?? "").split("?", 2)[1] ?? "";
  const params = new URLSearchParams(query);
  const install = params.get("install");
  const platform = (params.get("platform") ?? "").toLowerCase();
  return (install === "1" || install === "true") && platform === "ios";
}

export function isDocumentPath(pathname) {
  const path = String(pathname ?? "");
  return (
    !path.startsWith("/__grok/") &&
    !path.startsWith("/api/") &&
    !path.startsWith("/@") &&
    !path.startsWith("/node_modules") &&
    !/\.[a-z0-9]+$/i.test(path)
  );
}

export function acceptsHtml(accept) {
  const value = String(accept ?? "");
  return value === "" || value.includes("text/html") || value.includes("*/*");
}

export function stripInstallParams(url) {
  const [path = "/", query = ""] = String(url ?? "/").split("?", 2);
  const params = new URLSearchParams(query);
  params.delete("install");
  params.delete("platform");
  const rest = params.toString();
  return rest ? `${path}?${rest}` : path;
}

export function renderInstallPageHtml(template, { host, url } = {}) {
  return String(template)
    .replaceAll("{{APP_NAME}}", escapeHtml(appNameFromHost(host)))
    .replaceAll("{{APP_URL}}", escapeHtml(stripInstallParams(url)));
}

export function renderWebManifest(hostHeader) {
  const name = appNameFromHost(hostHeader);
  return JSON.stringify({
    name,
    short_name: name,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#08080a",
    theme_color: "#08080a",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  }, null, 2);
}

export function grokPwaHeadTags(appName = DEFAULT_APP_NAME) {
  return [
    ["manifest", '<link rel="manifest" href="/__grok/manifest.webmanifest">'],
    ["apple-touch-icon", '<link rel="apple-touch-icon" href="/favicon.svg">'],
    ["apple-mobile-web-app-title", `<meta name="apple-mobile-web-app-title" content="${escapeHtml(appName)}">`],
    ["theme-color", '<meta name="theme-color" content="#08080a">'],
  ];
}

export function readGrokProjectId() {
  return String(process.env?.VITE_PROJECT_ID ?? "").trim();
}
export function readXCreator() {
  return String(process.env?.X_CREATOR ?? "").trim();
}
export function readXCreatorId() {
  return String(process.env?.X_CREATOR_ID ?? "").trim();
}
export function grokXCreatorHeadTags() { return []; }
export function grokExtensionsHeadTags() { return []; }

export function readOgSite(cwd = process.cwd()) {
  try {
    const parsed = JSON.parse(readFileSync(join(cwd, OG_SITE_REL_PATH), "utf8"));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function ogCardPublicPath(cwd = process.cwd()) {
  if (existsSync(join(cwd, "public/og.jpg"))) return "/og.jpg";
  if (existsSync(join(cwd, "public/og.png"))) return "/og.png";
  return "";
}

export function siteHasCustomCard(site = {}) {
  return String(site.card ?? "").toLowerCase() === "custom";
}

export function snapshotOgIdentity(cwd = process.cwd()) {
  const site = { ...readOgSite(cwd) };
  const disk = ogCardPublicPath(cwd);
  if (disk) {
    site.card = "custom";
    site.image = disk;
  }
  return { site };
}

export function customOgAssetPath(cwd = process.cwd()) {
  return ogCardPublicPath(cwd) || "/og.jpg";
}
export function ogServiceUrl() {
  return OG_SERVICE_URL_DEFAULT;
}
export function titleFromDocument(html) {
  const match = String(html ?? "").match(/<title\b[^>]*>([^<]*)<\/title>/i);
  return match ? match[1].trim() : "";
}
export function resolveOgTitle(site = {}, appName = DEFAULT_APP_NAME) {
  return String(site.title ?? "").trim() || appName;
}
export function resolveOgCardAsset(site = {}, cwd = process.cwd()) {
  return ogCardPublicPath(cwd) || String(site.image ?? "").trim();
}
export function grokOgHeadTags() { return []; }
export function stripShareMetaTags(html) { return String(html); }
export function normalizeHeadContext(ctx = {}) {
  const cwd = ctx.cwd ?? process.cwd();
  return {
    appName: ctx.appName ?? DEFAULT_APP_NAME,
    projectId: ctx.projectId ?? "",
    creator: ctx.creator ?? "",
    creatorId: ctx.creatorId ?? "",
    host: ctx.host ?? "",
    cwd,
    site: ctx.site ?? snapshotOgIdentity(cwd).site,
  };
}
export function injectGrokPwaHead(html) {
  return html;
}
export function createHeadInjector() {
  const chunks = [];
  return {
    push(chunk) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : Buffer.from(chunk));
      return [];
    },
    flush() {
      return chunks.length ? [Buffer.concat(chunks)] : [];
    },
  };
}
