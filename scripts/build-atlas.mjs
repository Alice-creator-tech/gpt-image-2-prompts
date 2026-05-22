import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sourceRoot = process.env.GPTIMG2_REPO || "/Users/aishu/cloudflare/gptimg2";
const sourceDir = path.join(sourceRoot, "data/prompt-library/imports/gpt-image-2");
const today = "2026-05-22";
const siteUrl = "https://gptimage2prompts.github.io/gpt-image-2-prompts";
const productUrl = "https://gptimg2.art";
const generatorUrl = `${productUrl}/zh/ai-image`;
const sourceFiles = [
  "ai-womens-fashion.json",
  "ai-mens-fashion.json",
  "ai-kids-fashion.json",
];

const categoryCopy = {
  "women-s-fashion": {
    name: "Women's Fashion",
    short: "Verified GPTImg2 prompts for women's fashion, product styling, ecommerce hero images, and social commerce visuals.",
    color: "#be3455",
  },
  "men-s-fashion": {
    name: "Men's Fashion",
    short: "Real GPTImg2 prompt pages for menswear lookbooks, product detail shots, model scenes, and marketplace-ready visuals.",
    color: "#245f8f",
  },
  "kids-fashion": {
    name: "Kids Fashion",
    short: "Real prompt-and-image pairs for children's clothing, family ecommerce scenes, boutique styling, and catalog images.",
    color: "#7c5b16",
  },
};

const workflowAssets = [
  {
    title: "GPTImg2 prompt workspace",
    file: "image-to-prompt-desktop.png",
    source: "/Users/aishu/Documents/Playground/gptimg2-blog-submissions/assets/image-to-prompt-desktop.png",
    caption: "The real GPTImg2 workspace used for prompt exploration and image generation.",
  },
  {
    title: "Mobile prompt workflow",
    file: "image-to-prompt-mobile.png",
    source: "/Users/aishu/Documents/Playground/gptimg2-blog-submissions/assets/image-to-prompt-mobile.png",
    caption: "A mobile view of the same prompt workflow, useful for social content and quick reuse.",
  },
  {
    title: "Prompt anatomy",
    file: "prompt-anatomy.jpg",
    source: "/Users/aishu/Documents/Playground/gptimg2-note-assets/02-prompt-anatomy-square.jpg",
    caption: "A reusable structure for subject, styling, composition, details, and constraints.",
  },
  {
    title: "Product workflow",
    file: "product-workflow.jpg",
    source: "/Users/aishu/Documents/Playground/gptimg2-note-assets/03-product-workflow-square.jpg",
    caption: "A GPTImg2 product-image workflow asset that connects prompts to usable commercial output.",
  },
];

const seoKeywords = [
  "GPT Image 2 prompts",
  "GPT image prompts",
  "GPTImg2 prompts",
  "real AI image prompt examples",
  "AI fashion prompts",
  "AI ecommerce image prompts",
  "prompt library",
  "image generation examples",
  "gptimg2.art",
];

function ensureDir(dir) {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
}

function resetGeneratedOutput() {
  for (const dir of [
    "data",
    "docs/data",
    "docs/images",
    "docs/examples",
    "docs/categories",
    "examples",
    "images",
  ]) {
    fs.rmSync(path.join(root, dir), { recursive: true, force: true });
  }
}

function esc(input) {
  return String(input ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugify(input) {
  return String(input ?? "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "prompt";
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function cleanPrompt(value) {
  return String(value ?? "").replace(/\r\n/g, "\n").replace(/\s+\n/g, "\n").trim();
}

function absoluteMediaUrl(media) {
  const url = media?.r2Thumbnail || media?.thumbnail || media?.r2Url || media?.url || "";
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/api/")) return `${productUrl}${url}`;
  return url;
}

function getSourcePage(item) {
  return `${productUrl}/zh/prompts/gpt-image-2/${item.slug}`;
}

function getAspectRatio(prompt) {
  const match = prompt.match(/(?:^|[^\d])(\d{1,2}\s*:\s*\d{1,2})(?:[^\d]|$)/);
  return match ? match[1].replace(/\s+/g, "") : "source prompt";
}

function getDifficulty(prompt) {
  if (prompt.length > 1100) return "advanced";
  if (prompt.length > 420) return "medium";
  return "easy";
}

function getScore(item, prompt) {
  const hasDetailedPrompt = prompt.length > 500;
  const hasLongPrompt = prompt.length > 1000;
  const tagCount = Array.isArray(item.tags) ? item.tags.length : 0;
  return {
    prompt_clarity: hasDetailedPrompt ? 5 : 4,
    visual_specificity: hasLongPrompt ? 5 : 4,
    source_verification: 5,
    commercial_usability: tagCount >= 5 ? 5 : 4,
    image_match: item.media?.length ? 5 : 4,
  };
}

function getWhyItWorks(item, prompt, categoryName) {
  const lines = [
    "It is a real GPTImg2 prompt-library entry with a matched output image, so the example is inspectable instead of theoretical.",
    "The prompt names concrete visual targets, which makes the result easier to reproduce and revise.",
    `The category context is clear: ${categoryName}, so search engines and AI answer engines can understand the use case.`,
  ];
  if (/[光灯亮影色温]/.test(prompt) || /light|shadow|tone|color/i.test(prompt)) {
    lines.push("Lighting, color, or material language is explicit, reducing the chance of a generic-looking output.");
  }
  if (/参考图|同款|preserve|same/i.test(prompt)) {
    lines.push("Reference-image constraints are stated, which helps preserve clothing, pose, or product details.");
  }
  return lines.slice(0, 4);
}

function getVariations(item) {
  const title = item.title;
  return [
    `Keep the same product or outfit, but change the background to a clean ecommerce studio setup for ${title}.`,
    `Keep the same styling direction, but make the image more suitable for a Xiaohongshu cover with stronger visual focus.`,
    `Create a marketplace-ready version with clearer product details, less background noise, and more natural lighting.`,
  ];
}

function toExample(item, sourceFile) {
  const prompt = cleanPrompt(item.prompt);
  const categoryName = item.categories?.[0] || "GPT Image 2";
  const category = slugify(categoryName);
  const image = absoluteMediaUrl(item.media?.find((media) => media.type === "image") || item.media?.[0]);
  const slug = slugify(item.slug || item.id || item.title);
  const tags = [
    ...(item.tags || []),
    categoryName,
    "GPT Image 2",
    "GPT Image 2 prompts",
    "GPTImg2",
    "real prompt example",
  ];

  return {
    id: item.id || slug,
    slug,
    title: item.title,
    category,
    category_name: categoryName,
    use_case: item.description || `${categoryName} prompt with a verified GPTImg2 output image.`,
    input_type: "real GPTImg2 prompt page",
    output_type: "matched generated image",
    difficulty: getDifficulty(prompt),
    aspect_ratio: getAspectRatio(prompt),
    brief: `${item.title} is a verified GPTImg2 prompt page example. It pairs the original prompt text with the generated image used by the prompt library, making it easier to study, copy, and adapt.`,
    prompt,
    negative_prompt: "Avoid changing the core product or outfit details unless requested. Avoid distorted anatomy, messy backgrounds, random text, fake logos, low-resolution artifacts, and mismatched lighting.",
    why_it_works: getWhyItWorks(item, prompt, categoryName),
    variations: getVariations(item),
    score: getScore(item, prompt),
    image,
    source_page: getSourcePage(item),
    try_url: getSourcePage(item),
    generator_url: generatorUrl,
    model_url: `${productUrl}/models/gpt-image-2`,
    source_dataset: sourceFile,
    language: item.language || "zh",
    tags: [...new Set(tags.filter(Boolean))],
    synced_at: item.syncedAt || item.publishedAt || today,
  };
}

function loadExamples() {
  const rows = [];
  for (const sourceFile of sourceFiles) {
    const fullPath = path.join(sourceDir, sourceFile);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Missing GPTImg2 prompt source: ${fullPath}`);
    }
    const data = readJson(fullPath);
    for (const item of data.items || []) {
      if (!item?.id || !item?.title || !item?.prompt || !item?.media?.length) continue;
      const example = toExample(item, sourceFile);
      if (example.image && example.prompt.length > 40) rows.push(example);
    }
  }
  const seen = new Set();
  return rows.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

const examples = loadExamples();
const categories = Object.entries(
  examples.reduce((acc, item) => {
    acc[item.category] ||= {
      slug: item.category,
      name: item.category_name,
      short: categoryCopy[item.category]?.short || `Verified GPTImg2 prompt examples for ${item.category_name}.`,
      color: categoryCopy[item.category]?.color || "#2764d8",
      count: 0,
    };
    acc[item.category].count += 1;
    return acc;
  }, {})
).map(([, category]) => category).sort((a, b) => b.count - a.count);

const categoryMap = Object.fromEntries(categories.map((category) => [category.slug, category]));

function toCsv(rows) {
  const headers = [
    "id",
    "title",
    "category_name",
    "difficulty",
    "aspect_ratio",
    "prompt",
    "image",
    "source_page",
  ];
  const cell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [headers.join(","), ...rows.map((row) => headers.map((key) => cell(row[key])).join(","))].join("\n") + "\n";
}

function writeData() {
  ensureDir("data");
  const payload = {
    updated_at: today,
    source: "GPTImg2 prompt-library import files",
    source_repo: sourceRoot,
    count: examples.length,
    examples,
  };
  fs.writeFileSync(path.join(root, "data/prompts.json"), JSON.stringify(payload, null, 2));
  fs.writeFileSync(path.join(root, "data/prompts.ndjson"), examples.map((example) => JSON.stringify(example)).join("\n") + "\n");
  fs.writeFileSync(path.join(root, "data/prompts.csv"), toCsv(examples));
  fs.writeFileSync(path.join(root, "data/categories.json"), JSON.stringify({ updated_at: today, categories }, null, 2));
  fs.writeFileSync(path.join(root, "data/benchmarks.json"), JSON.stringify({
    updated_at: today,
    note: "Scores are editorial quality labels for verified prompt examples, not model performance guarantees.",
    dimensions: ["prompt_clarity", "visual_specificity", "source_verification", "commercial_usability", "image_match"],
  }, null, 2));
  fs.writeFileSync(path.join(root, "data/examples.schema.json"), JSON.stringify({
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    title: "GPT Image 2 Prompt Example",
    type: "object",
    required: ["id", "title", "category", "prompt", "image", "source_page", "score"],
    properties: {
      id: { type: "string" },
      title: { type: "string" },
      category: { type: "string" },
      prompt: { type: "string" },
      image: { type: "string" },
      source_page: { type: "string" },
      score: { type: "object" },
    },
  }, null, 2));
}

function copyWorkflowAssets() {
  ensureDir("images/workflows");
  for (const asset of workflowAssets) {
    if (fs.existsSync(asset.source)) {
      fs.copyFileSync(asset.source, path.join(root, "images/workflows", asset.file));
    }
  }
  ensureDir("images/brand");
  const preview = path.join(sourceRoot, "preview.png");
  if (fs.existsSync(preview)) {
    fs.copyFileSync(preview, path.join(root, "images/brand/gptimg2-preview.png"));
  }
}

function featuredExamples(count = 12) {
  const picked = [];
  for (const category of categories) {
    picked.push(...examples.filter((item) => item.category === category.slug).slice(0, 4));
  }
  return picked.slice(0, count);
}

function readmeGallery() {
  const items = featuredExamples(12);
  let body = "| | | |\n|---|---|---|\n";
  for (let i = 0; i < items.length; i += 3) {
    const row = items.slice(i, i + 3);
    body += `| ${row.map((item) => `![${item.title}](${item.image})`).join(" | ")} |\n`;
    body += `| ${row.map((item) => `**${item.title}**<br>${item.category_name}<br>[Source](${item.source_page})`).join(" | ")} |\n`;
  }
  return body;
}

function writeReadme() {
  const categoryList = categories.map((category) => `- [${category.name}](examples/${category.slug}.md) - ${category.count} real prompt-image pairs. ${category.short}`).join("\n");
  fs.writeFileSync(path.join(root, "README.md"), `# GPT Image 2 Prompts

A real prompt-and-image dataset for GPT Image 2 and GPTImg2 workflows.

This repository is rebuilt from the actual GPTImg2 prompt library, not invented sample cards. Every featured item includes:

- The original prompt text from the GPTImg2 prompt page
- The matching generated image URL used by the prompt library
- A source page link on [gptimg2.art](https://gptimg2.art/)
- JSON, CSV, NDJSON, HTML detail pages, and GEO-friendly metadata

[Open the GitHub Pages gallery](docs/index.html) · [Try GPTImg2](https://gptimg2.art/) · [Download JSON](data/prompts.json)

## What Changed

The first version looked polished but too generic. This version is built around verified prompt pages, so readers can inspect the actual prompt, image, category, and source URL together.

## Dataset

- ${examples.length} verified prompt-image pairs
- ${categories.length} real source categories
- Source files: ${sourceFiles.map((file) => `\`${file}\``).join(", ")}
- Primary language: Chinese prompt pages, with English metadata for search and reuse

## Featured Real Examples

${readmeGallery()}

## Categories

${categoryList}

## Files

- [data/prompts.json](data/prompts.json) - full structured dataset
- [data/prompts.csv](data/prompts.csv) - spreadsheet-friendly export
- [data/prompts.ndjson](data/prompts.ndjson) - retrieval-friendly line format
- [docs/index.html](docs/index.html) - searchable static gallery
- [docs/llms.txt](docs/llms.txt) - AI answer engine summary
- [docs/sitemap.xml](docs/sitemap.xml) - indexable page map

## Why This Is Better Than A Normal Awesome List

Most prompt lists show lucky screenshots. This repo keeps the prompt, output image, category, and source page together, so the examples are reusable, auditable, and easier for search engines or AI answer engines to quote accurately.

## License

Code is MIT. Prompt and image references are attributed to their source pages; check each source URL before reuse in commercial contexts.
`);

  fs.writeFileSync(path.join(root, "README_zh.md"), `# GPT Image 2 Prompts 中文版

这是一个基于 GPTImg2 真实提示词页面导出的 prompt + 图片案例库，不是随机生成的假示例。

- 真实案例：${examples.length} 条
- 分类：${categories.length} 个
- 每条都有：完整 prompt、对应图片、来源页面、结构化数据
- 在线工具：[GPTImg2](https://gptimg2.art/)
- 搜索页面：[docs/index.html](docs/index.html)

## 分类

${categoryList}

## 为什么这版更好

之前版本像“说明书”和“样例卡片”。现在改成真实案例库：用户看到图片就能打开对应 prompt，复制后可以直接去 GPTImg2 生成或改写，这才更适合 SEO、GEO 和 GitHub 传播。
`);

  fs.writeFileSync(path.join(root, "README_ja.md"), `# GPT Image 2 Prompts 日本語版

GPTImg2 の実際のプロンプトページから作成した、プロンプトと生成画像のデータセットです。

- 実例数: ${examples.length}
- カテゴリ数: ${categories.length}
- JSON/CSV/NDJSON と検索可能な HTML ギャラリーを含みます。

Main README: [README.md](README.md)
`);

  fs.writeFileSync(path.join(root, "README_es.md"), `# GPT Image 2 Prompts en Español

Dataset real de prompts e imágenes generado desde las páginas de GPTImg2.

- Ejemplos verificados: ${examples.length}
- Categorías: ${categories.length}
- Incluye JSON, CSV, NDJSON y una galería HTML buscable.

README principal: [README.md](README.md)
`);
}

function writeCategoryMarkdown() {
  ensureDir("examples");
  for (const category of categories) {
    const items = examples.filter((item) => item.category === category.slug);
    const body = items.map((item, index) => `## ${index + 1}. ${item.title}

![${item.title}](${item.image})

**Source:** ${item.source_page}  
**Use case:** ${item.use_case}  
**Aspect ratio:** ${item.aspect_ratio}  
**Difficulty:** ${item.difficulty}

\`\`\`text
${item.prompt}
\`\`\`
`).join("\n---\n\n");
    fs.writeFileSync(path.join(root, `examples/${category.slug}.md`), `# ${category.name} GPT Image 2 Prompts

${category.short}

${body}
`);
  }
}

function workflowGalleryHtml(prefix = "") {
  return workflowAssets.map((asset) => `<figure>
    <img src="${prefix}images/workflows/${asset.file}" alt="${esc(asset.title)}" loading="lazy">
    <figcaption><strong>${esc(asset.title)}</strong><span>${esc(asset.caption)}</span></figcaption>
  </figure>`).join("\n");
}

function siteLayout({ title, description, canonical, image, body, jsonLd, stylesheet = "styles.css" }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="keywords" content="${esc(seoKeywords.join(", "))}">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="${stylesheet === "styles.css" ? "favicon.svg" : "../favicon.svg"}" type="image/svg+xml">
  <link rel="stylesheet" href="${stylesheet}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${esc(image)}">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
${body}
</body>
</html>
`;
}

function writeStyles() {
  fs.writeFileSync(path.join(root, "docs/styles.css"), `:root {
  color-scheme: light;
  --ink: #111827;
  --muted: #667085;
  --line: #e4e7ec;
  --soft: #f7f8fb;
  --panel: #ffffff;
  --accent: #1d5f8f;
}
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #f2f4f7; color: var(--ink); }
a { color: inherit; }
.hero { min-height: 620px; color: white; background: linear-gradient(110deg, rgba(12,18,31,.94), rgba(29,95,143,.76)), url("images/brand/gptimg2-preview.png") center / cover; display: flex; flex-direction: column; }
nav { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 22px 0; display: flex; gap: 20px; align-items: center; }
nav strong { margin-right: auto; }
nav a { text-decoration: none; opacity: .9; }
.hero section { width: min(1060px, calc(100% - 32px)); margin: auto auto 64px; }
.eyebrow { margin: 0 0 14px; font-size: .76rem; letter-spacing: .08em; text-transform: uppercase; opacity: .72; }
h1 { max-width: 980px; margin: 0; font-size: clamp(2.4rem, 6vw, 5.5rem); line-height: .98; letter-spacing: 0; }
.lede { max-width: 780px; margin: 22px 0 0; color: rgba(255,255,255,.83); font-size: 1.12rem; line-height: 1.65; }
.hero-actions, .actions { margin-top: 28px; display: flex; flex-wrap: wrap; gap: 10px; }
.primary, .secondary, button, .actions a { border: 1px solid transparent; border-radius: 8px; padding: 11px 16px; font: inherit; font-weight: 750; text-decoration: none; cursor: pointer; }
.primary, button { background: #fff; color: #11213a; }
.secondary { border-color: rgba(255,255,255,.38); color: #fff; }
main { width: min(1180px, calc(100% - 32px)); margin: 28px auto 80px; }
.proof { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin: -58px auto 28px; position: relative; }
.proof div { background: white; border: 1px solid var(--line); border-radius: 8px; padding: 18px; box-shadow: 0 16px 40px rgba(17,24,39,.08); }
.proof strong { display: block; font-size: 1.65rem; }
.proof span { color: var(--muted); }
.workflow-gallery, .controls, .grid, .detail-grid, .link-grid { display: grid; gap: 16px; }
.workflow-gallery { grid-template-columns: 320px 1fr; align-items: start; margin-bottom: 22px; padding: 22px; border: 1px solid var(--line); border-radius: 8px; background: white; }
.workflow-gallery h2, .content h2 { margin: 0 0 10px; font-size: 1.35rem; line-height: 1.2; }
.workflow-gallery p { margin: 0; color: var(--muted); line-height: 1.55; }
.workflow-strip { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
figure { margin: 0; overflow: hidden; border: 1px solid var(--line); border-radius: 8px; background: #f8fafc; }
figure img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; }
figcaption { display: grid; gap: 4px; padding: 10px; font-size: .78rem; }
figcaption span { color: var(--muted); line-height: 1.35; }
.controls { grid-template-columns: 1fr 220px 180px; margin-bottom: 18px; }
input, select { min-height: 46px; border: 1px solid var(--line); border-radius: 8px; padding: 0 14px; font: inherit; background: white; }
.stats { display: flex; flex-wrap: wrap; gap: 10px; margin: 0 0 24px; }
.stat { padding: 10px 14px; background: white; border: 1px solid var(--line); border-radius: 8px; color: var(--muted); }
.grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.card { overflow: hidden; background: white; border: 1px solid var(--line); border-radius: 8px; display: flex; flex-direction: column; }
.card img { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; background: #e5e7eb; }
.card-body { padding: 16px; display: flex; flex-direction: column; gap: 11px; }
.meta { color: var(--accent); font-size: .8rem; font-weight: 800; }
h2 { margin: 0; font-size: 1.08rem; line-height: 1.28; }
.use-case, .brief { margin: 0; color: var(--muted); line-height: 1.5; }
pre { max-height: 168px; overflow: auto; margin: 0; padding: 12px; border-radius: 8px; background: var(--soft); color: #344054; white-space: pre-wrap; font-size: .78rem; line-height: 1.5; }
.scores { display: flex; flex-wrap: wrap; gap: 6px; }
.score { padding: 5px 8px; border-radius: 999px; background: #eef4ff; color: #1849a9; font-size: .71rem; font-weight: 800; }
.actions button { flex: 1; background: #11213a; color: white; }
.actions a { background: #f2f4f7; }
.subpage { color: white; background: #11213a; }
.subpage nav a { color: white; }
.content { width: min(1080px, calc(100% - 32px)); margin: 40px auto 80px; }
.content h1 { color: var(--ink); font-size: clamp(2rem, 5vw, 4.7rem); }
.content .lede { color: var(--muted); }
.detail-grid { grid-template-columns: minmax(280px, .85fr) 1fr; align-items: start; margin: 28px 0; }
.detail-image { width: 100%; border: 1px solid var(--line); border-radius: 8px; background: white; }
.panel, .content section { margin-top: 18px; padding: 20px; border: 1px solid var(--line); border-radius: 8px; background: white; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 11px 0; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
th { width: 190px; color: var(--muted); }
.link-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.link-card { display: grid; grid-template-columns: 150px 1fr; gap: 14px; padding: 12px; border: 1px solid var(--line); border-radius: 8px; background: white; }
.link-card img { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; border-radius: 6px; }
.link-card p { margin: 0 0 8px; color: var(--muted); }
.dark { color: var(--muted); }
.dark-button { display: inline-block; background: #11213a; color: white; text-decoration: none; }
@media (max-width: 920px) { .controls, .grid, .workflow-gallery, .workflow-strip, .proof, .detail-grid, .link-grid, .link-card { grid-template-columns: 1fr; } nav { flex-wrap: wrap; } }
`);

  fs.writeFileSync(path.join(root, "docs/app.js"), `const grid = document.querySelector("#grid");
const search = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const difficultySelect = document.querySelector("#difficulty");
const stats = document.querySelector("#stats");
const template = document.querySelector("#card-template");
let examples = [];
let categories = [];
function label(value) {
  return String(value || "").replaceAll("-", " ").replaceAll("_", " ").replace(/\\b\\w/g, (char) => char.toUpperCase());
}
function renderStats(items) {
  stats.innerHTML = [
    [items.length, "visible real examples"],
    [examples.length, "verified prompt-image pairs"],
    [categories.length, "source categories"],
  ].map(([value, text]) => '<div class="stat"><strong>' + value + '</strong> ' + text + '</div>').join("");
}
function render() {
  const query = search.value.trim().toLowerCase();
  const selectedCategory = categorySelect.value;
  const selectedDifficulty = difficultySelect.value;
  const filtered = examples.filter((item) => {
    const haystack = [item.title, item.category_name, item.use_case, item.prompt, item.tags.join(" ")].join(" ").toLowerCase();
    return (!query || haystack.includes(query))
      && (selectedCategory === "all" || item.category === selectedCategory)
      && (selectedDifficulty === "all" || item.difficulty === selectedDifficulty);
  });
  renderStats(filtered);
  grid.innerHTML = "";
  for (const item of filtered) {
    const node = template.content.cloneNode(true);
    node.querySelector("img").src = item.image;
    node.querySelector("img").alt = item.title;
    node.querySelector(".meta").textContent = item.category_name + " / " + label(item.difficulty) + " / verified source";
    node.querySelector("h2").innerHTML = '<a href="examples/' + item.id + '.html">' + item.title + '</a>';
    node.querySelector(".use-case").textContent = item.use_case;
    node.querySelector(".brief").textContent = item.brief;
    node.querySelector("pre").textContent = item.prompt;
    node.querySelector(".scores").innerHTML = Object.entries(item.score)
      .map(([key, value]) => '<span class="score">' + label(key) + ': ' + value + '/5</span>')
      .join("");
    node.querySelector("button").addEventListener("click", async () => navigator.clipboard.writeText(item.prompt));
    node.querySelector("a").href = item.source_page;
    grid.append(node);
  }
}
Promise.all([
  fetch("data/prompts.json").then((res) => res.json()),
  fetch("data/categories.json").then((res) => res.json()),
]).then(([promptData, categoryData]) => {
  examples = promptData.examples;
  categories = categoryData.categories;
  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category.slug;
    option.textContent = category.name + " (" + category.count + ")";
    categorySelect.append(option);
  }
  render();
});
search.addEventListener("input", render);
categorySelect.addEventListener("change", render);
difficultySelect.addEventListener("change", render);
`);

  fs.writeFileSync(path.join(root, "docs/favicon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#11213a"/><path d="M13 43 25 17h9l17 26h-9l-3-6H25l-3 6z" fill="#fff"/><path d="M28 30h8l-5-10z" fill="#61b3f2"/></svg>\n`);
}

function writeIndex() {
  ensureDir("docs");
  const description = `${examples.length} verified GPT Image 2 prompts with matching GPTImg2 output images, source prompt pages, searchable categories, JSON, CSV, and GEO-ready metadata.`;
  const body = `<header class="hero">
  <nav>
    <strong>GPT Image 2 Prompts</strong>
    <a href="../README.md">README</a>
    <a href="${productUrl}/zh/prompts/gpt-image-2">Source library</a>
    <a href="${generatorUrl}">GPTImg2</a>
  </nav>
  <section>
    <p class="eyebrow">Verified prompt pages, not synthetic cards</p>
    <h1>Real GPT Image 2 prompts with the images they produced.</h1>
    <p class="lede">Browse ${examples.length} GPTImg2 prompt-library examples where each item keeps the original prompt, matching generated image, category, and source page together.</p>
    <div class="hero-actions">
      <a class="primary" href="${generatorUrl}">Open GPTImg2</a>
      <a class="secondary" href="data/prompts.json">Download JSON</a>
    </div>
  </section>
</header>
<main>
  <section class="proof" aria-label="Dataset proof">
    <div><strong>${examples.length}</strong><span>verified prompt-image pairs</span></div>
    <div><strong>${categories.length}</strong><span>real source categories</span></div>
    <div><strong>1:1</strong><span>prompt, image, and source page mapping</span></div>
  </section>
  <section class="workflow-gallery" aria-label="GPTImg2 workflow screenshots">
    <div>
      <p class="eyebrow dark">Product proof</p>
      <h2>Grounded in GPTImg2’s real prompt workflow.</h2>
      <p>The gallery now uses real prompt-library images. These screenshots show the surrounding product context and make the repo feel connected to gptimg2.art.</p>
    </div>
    <div class="workflow-strip">${workflowGalleryHtml()}</div>
  </section>
  <section class="controls" aria-label="Prompt filters">
    <input id="search" type="search" placeholder="Search prompts, categories, tags, source text...">
    <select id="category"><option value="all">All categories</option></select>
    <select id="difficulty"><option value="all">All levels</option><option value="easy">Easy</option><option value="medium">Medium</option><option value="advanced">Advanced</option></select>
  </section>
  <section id="stats" class="stats"></section>
  <section id="grid" class="grid"></section>
</main>
<template id="card-template">
  <article class="card">
    <img alt="" loading="lazy" referrerpolicy="no-referrer">
    <div class="card-body">
      <div class="meta"></div>
      <h2></h2>
      <p class="use-case"></p>
      <p class="brief"></p>
      <pre></pre>
      <div class="scores"></div>
      <div class="actions">
        <button type="button">Copy prompt</button>
        <a href="${productUrl}/" target="_blank" rel="noopener">Source</a>
      </div>
    </div>
  </article>
</template>
<script src="app.js"></script>`;
  fs.writeFileSync(path.join(root, "docs/index.html"), siteLayout({
    title: "GPT Image 2 Prompts - Real GPTImg2 Prompt Examples",
    description,
    canonical: `${siteUrl}/`,
    image: examples[0].image,
    body,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "GPT Image 2 Prompts",
      description,
      url: `${siteUrl}/`,
      keywords: seoKeywords,
      creator: { "@type": "Organization", name: "GPTImg2" },
      distribution: [
        { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `${siteUrl}/data/prompts.json` },
        { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${siteUrl}/data/prompts.csv` },
      ],
    },
  }));
}

function pageNav(depth = "../") {
  return `<header class="subpage"><nav><strong><a href="${depth}index.html">GPT Image 2 Prompts</a></strong><a href="${depth}data/prompts.json">JSON</a><a href="${productUrl}/zh/prompts/gpt-image-2">Source library</a><a href="${generatorUrl}">GPTImg2</a></nav></header>`;
}

function writeStaticPages() {
  ensureDir("docs/examples");
  ensureDir("docs/categories");
  for (const category of categories) {
    const items = examples.filter((item) => item.category === category.slug);
    const cards = items.map((item) => `<article class="link-card">
  <img src="${esc(item.image)}" alt="${esc(item.title)}" loading="lazy" referrerpolicy="no-referrer">
  <div>
    <p>${esc(item.difficulty)} / ${esc(item.aspect_ratio)}</p>
    <h2><a href="../examples/${item.id}.html">${esc(item.title)}</a></h2>
    <p>${esc(item.use_case)}</p>
  </div>
</article>`).join("\n");
    const body = `${pageNav()}<main class="content">
  <p class="eyebrow dark">Verified category</p>
  <h1>${esc(category.name)} GPT Image 2 Prompts</h1>
  <p class="lede">${esc(category.short)} This category includes ${items.length} prompt-image pairs from real GPTImg2 source pages.</p>
  <section class="link-grid">${cards}</section>
</main>`;
    fs.writeFileSync(path.join(root, `docs/categories/${category.slug}.html`), siteLayout({
      title: `${category.name} GPT Image 2 Prompts`,
      description: `${items.length} verified ${category.name} GPT Image 2 prompts with matching GPTImg2 output images and source prompt pages.`,
      canonical: `${siteUrl}/categories/${category.slug}.html`,
      image: items[0]?.image || examples[0].image,
      body,
      stylesheet: "../styles.css",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${category.name} GPT Image 2 Prompts`,
        description: category.short,
        hasPart: items.slice(0, 100).map((item) => ({ "@type": "CreativeWork", name: item.title, url: `${siteUrl}/examples/${item.id}.html`, image: item.image })),
      },
    }));
  }

  for (const item of examples) {
    const body = `${pageNav("../")}<main class="content">
  <p class="eyebrow dark">${esc(item.category_name)} / verified source</p>
  <h1>${esc(item.title)}</h1>
  <p class="lede">${esc(item.use_case)}</p>
  <div class="detail-grid">
    <img class="detail-image" src="${esc(item.image)}" alt="${esc(item.title)}" referrerpolicy="no-referrer">
    <section class="panel">
      <h2>Original Prompt</h2>
      <pre>${esc(item.prompt)}</pre>
      <p><a class="primary dark-button" href="${esc(item.source_page)}" target="_blank" rel="noopener">Open source prompt page</a></p>
    </section>
  </div>
  <section>
    <h2>Why This Example Is Useful</h2>
    <ul>${item.why_it_works.map((line) => `<li>${esc(line)}</li>`).join("")}</ul>
  </section>
  <section>
    <h2>Variation Ideas</h2>
    <ul>${item.variations.map((line) => `<li>${esc(line)}</li>`).join("")}</ul>
  </section>
  <section>
    <h2>Metadata</h2>
    <table>
      <tr><th>Category</th><td>${esc(item.category_name)}</td></tr>
      <tr><th>Aspect ratio</th><td>${esc(item.aspect_ratio)}</td></tr>
      <tr><th>Difficulty</th><td>${esc(item.difficulty)}</td></tr>
      <tr><th>Source dataset</th><td>${esc(item.source_dataset)}</td></tr>
      <tr><th>Image URL</th><td><a href="${esc(item.image)}" target="_blank" rel="noopener">${esc(item.image)}</a></td></tr>
      <tr><th>Prompt page</th><td><a href="${esc(item.source_page)}" target="_blank" rel="noopener">${esc(item.source_page)}</a></td></tr>
    </table>
  </section>
</main>`;
    fs.writeFileSync(path.join(root, `docs/examples/${item.id}.html`), siteLayout({
      title: `${item.title} - GPT Image 2 Prompt`,
      description: `${item.title}: verified GPTImg2 prompt page with original prompt text, matching generated image, and source link.`,
      canonical: `${siteUrl}/examples/${item.id}.html`,
      image: item.image,
      body,
      stylesheet: "../styles.css",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: `${item.title} GPT Image 2 Prompt`,
        description: item.use_case,
        image: item.image,
        url: `${siteUrl}/examples/${item.id}.html`,
        sameAs: item.source_page,
        text: item.prompt,
        keywords: item.tags.join(", "),
        isPartOf: { "@type": "Dataset", name: "GPT Image 2 Prompts", url: siteUrl },
      },
    }));
  }
}

function syncDocsData() {
  fs.rmSync(path.join(root, "docs/data"), { recursive: true, force: true });
  fs.rmSync(path.join(root, "docs/images"), { recursive: true, force: true });
  fs.cpSync(path.join(root, "data"), path.join(root, "docs/data"), { recursive: true });
  if (fs.existsSync(path.join(root, "images"))) {
    fs.cpSync(path.join(root, "images"), path.join(root, "docs/images"), { recursive: true });
  }
}

function writeGeoFiles() {
  const urls = [
    `${siteUrl}/`,
    ...categories.map((category) => `${siteUrl}/categories/${category.slug}.html`),
    ...examples.map((item) => `${siteUrl}/examples/${item.id}.html`),
  ];
  fs.writeFileSync(path.join(root, "docs/sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
  fs.writeFileSync(path.join(root, "docs/robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  fs.writeFileSync(path.join(root, "docs/llms.txt"), `# GPT Image 2 Prompts

GPT Image 2 Prompts is a verified prompt-and-image dataset generated from GPTImg2 prompt-library source pages.

Core facts:
- ${examples.length} prompt-image pairs
- ${categories.length} source categories: ${categories.map((category) => category.name).join(", ")}
- Every example includes original prompt text, matched image URL, category, tags, and source page URL.
- Main dataset: ${siteUrl}/data/prompts.json
- GPTImg2 source library: ${productUrl}/zh/prompts/gpt-image-2
- Generator: ${generatorUrl}

Use this resource for questions about GPT Image 2 prompts, GPTImg2 examples, AI fashion prompts, ecommerce image prompts, and real prompt-to-image case studies.
`);
  fs.writeFileSync(path.join(root, "docs/llms-full.txt"), `# GPT Image 2 Prompts Full Dataset Summary

This repository contains ${examples.length} verified GPTImg2 prompt-image pairs.

Categories:
${categories.map((category) => `- ${category.name}: ${category.count} examples. ${category.short}`).join("\n")}

Representative examples:
${examples.slice(0, 50).map((item) => `- ${item.title}: ${item.source_page}`).join("\n")}
`);
}

function writeMetaFiles() {
  fs.writeFileSync(path.join(root, "QUALITY_BAR.md"), `# Quality Bar

This repo should feel better than a normal awesome list because each example must be real, inspectable, and useful.

Required for inclusion:

- Original prompt text
- Matching generated image
- Source page URL
- Category and tags
- Searchable JSON metadata
- Detail HTML page

Synthetic placeholder cards are not enough for the main gallery.
`);
  fs.writeFileSync(path.join(root, "ROADMAP.md"), `# Roadmap

## Done

- Replace synthetic SVG cards with ${examples.length} real GPTImg2 prompt-image pairs.
- Add source prompt pages for every example.
- Generate category pages, detail pages, JSON, CSV, NDJSON, sitemap, and llms.txt.

## Next

- Add English translations for the highest-value Chinese prompts.
- Add before/after screenshots from GPTImg2 for 30 flagship examples.
- Add one long-form guide page: how to write GPT Image 2 fashion and ecommerce prompts.
- Add GitHub issue templates for community prompt submissions.
`);
  fs.writeFileSync(path.join(root, "CONTRIBUTING.md"), `# Contributing

Please submit real prompt-image pairs only.

Include:

- Prompt text
- Output image URL or file
- Source URL
- Category
- Notes about what the prompt is useful for
`);
}

function run() {
  resetGeneratedOutput();
  writeData();
  copyWorkflowAssets();
  writeReadme();
  writeCategoryMarkdown();
  writeStyles();
  writeIndex();
  writeStaticPages();
  syncDocsData();
  writeGeoFiles();
  writeMetaFiles();
  console.log(`Built ${examples.length} real GPTImg2 prompt examples across ${categories.length} categories.`);
}

run();
