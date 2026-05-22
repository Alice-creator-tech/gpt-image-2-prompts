import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const today = "2026-05-22";
const siteUrl = "https://gptimg2-art.github.io/ai-image-prompt-atlas";

const categories = [
  {
    slug: "product-photography",
    name: "Product Photography",
    short: "Commercial product images with controlled lighting, materials, and layout.",
    color: "#2764d8",
    examples: [
      ["Minimal Wireless Charger", "a matte black wireless charging dock for a smartphone and earbuds", "premium ecommerce hero image"],
      ["Glass Skincare Bottle", "a translucent amber skincare serum bottle with a matte cream label", "beauty product listing image"],
      ["Ceramic Coffee Mug", "a handmade speckled ceramic coffee mug with a soft curved handle", "lifestyle product hero image"],
      ["Running Shoe Detail", "a lightweight running shoe with breathable mesh and reflective trim", "sport ecommerce detail shot"],
      ["Desk Lamp Launch", "a brushed aluminum adjustable desk lamp with a warm LED strip", "landing page product render"],
      ["Reusable Water Bottle", "a stainless steel reusable water bottle with a powder coated finish", "marketplace catalog image"],
      ["Smartwatch Strap Set", "three interchangeable smartwatch straps in silicone, nylon, and leather", "accessory comparison image"],
      ["Artisan Chocolate Box", "a luxury chocolate gift box with twelve pieces and gold foil details", "premium food product photo"],
    ],
  },
  {
    slug: "readable-text",
    name: "Readable Text Posters",
    short: "Poster and cover prompts that prioritize legible typography and clean layout.",
    color: "#0f8b6f",
    examples: [
      ["Launch Poster", "a clean launch poster with the headline NEW CREATIVE TOOLS", "startup announcement visual"],
      ["Workshop Flyer", "a vertical workshop flyer with the headline PROMPT LAB", "event promotion poster"],
      ["Quote Card", "an editorial quote card with the phrase MAKE THE IDEA VISIBLE", "social media quote graphic"],
      ["Sale Banner", "a modern ecommerce banner with the headline WINTER STUDIO SALE", "campaign banner"],
      ["Music Poster", "a minimal concert poster with the headline MIDNIGHT SYNTHS", "music event poster"],
      ["App Update Card", "a product update card with the text VERSION 2.0", "SaaS release image"],
      ["Coffee Menu", "a small cafe menu board with clear prices and item names", "restaurant menu visual"],
      ["Book Cover", "a contemporary book cover with the title THE VISUAL BRIEF", "publishing concept"],
    ],
  },
  {
    slug: "ui-mockups",
    name: "UI Mockups",
    short: "App and dashboard visuals with readable interface hierarchy.",
    color: "#7c3aed",
    examples: [
      ["Analytics Dashboard", "a clean analytics dashboard for creator revenue and audience growth", "SaaS hero mockup"],
      ["Mobile Finance App", "a mobile app screen for budgeting and subscription tracking", "app store preview"],
      ["AI Editor Interface", "an AI image editor interface with prompt panel and before-after preview", "product screenshot concept"],
      ["Travel Planner", "a trip planning app with itinerary cards, map preview, and weather", "mobile UI concept"],
      ["Team Kanban", "a collaborative kanban board with tasks, avatars, and priority tags", "productivity tool mockup"],
      ["Recipe App", "a cooking app screen with ingredients, timer, and nutrition card", "mobile app mockup"],
      ["Music Dashboard", "an artist dashboard with stream analytics and playlist placements", "creator platform concept"],
      ["Learning Portal", "an online course dashboard with progress rings and lesson cards", "education SaaS visual"],
    ],
  },
  {
    slug: "reference-editing",
    name: "Reference Image Editing",
    short: "Editing prompts that preserve subject identity while changing context or style.",
    color: "#c2410c",
    examples: [
      ["Background Swap", "replace a plain studio background with a sunlit modern apartment", "portrait background edit"],
      ["Outfit Change", "change the outfit to a navy blazer and white shirt while preserving face and pose", "professional portrait edit"],
      ["Product Colorway", "turn the product shell from white to matte forest green", "SKU color variation"],
      ["Lighting Upgrade", "improve flat lighting into soft cinematic window light", "photo enhancement"],
      ["Clean Object Removal", "remove stray cables and desk clutter from a product photo", "commercial cleanup"],
      ["Season Change", "change a summer street scene into early autumn while keeping architecture identical", "environment edit"],
      ["Material Swap", "change a plastic chair into walnut wood with the same shape", "interior design edit"],
      ["Text Replacement", "replace the poster headline while preserving layout and typography", "localized marketing asset"],
    ],
  },
  {
    slug: "ecommerce-mockups",
    name: "Ecommerce Mockups",
    short: "Market-ready product, packaging, and listing visuals.",
    color: "#be123c",
    examples: [
      ["Amazon Main Image", "a white-background product image for a compact desk organizer", "marketplace listing"],
      ["Shopify Hero Set", "three product images for a skincare bundle on a soft pastel background", "brand storefront"],
      ["Packaging Box", "a recyclable kraft paper packaging box for organic tea", "packaging concept"],
      ["Before After Split", "a split comparison image for a cleaning product", "conversion ad"],
      ["Bundle Layout", "a neatly arranged bundle of notebook, pen, and desk accessories", "bundle listing"],
      ["Lifestyle Shelf Shot", "a home shelf scene featuring a minimalist candle jar", "lifestyle listing image"],
      ["Size Comparison", "a product scale comparison next to a phone and hand silhouette", "listing infographic"],
      ["Feature Callouts", "a product image with three clean annotation callouts", "feature visual"],
    ],
  },
  {
    slug: "social-covers",
    name: "Social Covers",
    short: "Thumbnails, blog covers, carousels, and social posts.",
    color: "#0284c7",
    examples: [
      ["AI Prompt Guide Cover", "a 16:9 blog cover about writing better AI image prompts", "article cover"],
      ["Creator Toolkit Thumbnail", "a YouTube-style thumbnail for a creator tools roundup", "video thumbnail"],
      ["LinkedIn Carousel", "a professional carousel cover about product photography prompts", "B2B social post"],
      ["Newsletter Header", "an editorial newsletter header for creative AI workflows", "email header"],
      ["Twitter Card", "a compact card for a prompt template collection", "link preview image"],
      ["Podcast Cover", "a square podcast cover for a show about visual AI tools", "podcast artwork"],
      ["Case Study Header", "a clean header for an ecommerce image generation case study", "case study cover"],
      ["Launch Countdown", "a bold social countdown graphic reading 3 DAYS TO LAUNCH", "campaign asset"],
    ],
  },
  {
    slug: "brand-visuals",
    name: "Brand Visuals",
    short: "Brand marks, campaign art direction, and visual identity exploration.",
    color: "#b45309",
    examples: [
      ["Minimal Logo Mark", "a vector-friendly abstract mark for an AI design studio", "logo exploration"],
      ["Brand Moodboard", "a moodboard for a calm productivity app brand", "identity direction"],
      ["Sticker Sheet", "a playful sticker sheet for a creative toolkit brand", "community swag"],
      ["Icon Set Preview", "a consistent set of eight app feature icons", "product branding"],
      ["Mascot Concept", "a friendly abstract assistant mascot for a design tool", "brand character"],
      ["Packaging Pattern", "a repeatable pattern for boutique stationery packaging", "brand pattern"],
      ["Ad Campaign Key Visual", "a key visual for a premium AI image editor campaign", "marketing concept"],
      ["Style Tile", "a style tile showing colors, type, textures, and buttons", "brand system preview"],
    ],
  },
  {
    slug: "infographics",
    name: "Infographics",
    short: "Structured visuals that explain workflows, comparisons, and concepts.",
    color: "#4f46e5",
    examples: [
      ["Prompt Anatomy", "an infographic explaining subject, composition, style, details, and constraints", "educational diagram"],
      ["Workflow Ladder", "a step-by-step visual workflow from brief to final image", "process infographic"],
      ["Model Comparison", "a comparison chart for image generation use cases", "analysis graphic"],
      ["Creative Brief Map", "a mind map for turning vague ideas into image prompts", "guide illustration"],
      ["Ecommerce Funnel", "an infographic showing product image types across a sales funnel", "marketing diagram"],
      ["Editing Checklist", "a checklist visual for reference image editing quality control", "QA guide"],
      ["Prompt Matrix", "a matrix comparing style, lighting, camera, and constraints", "prompt education"],
      ["Failure Modes", "a visual chart of common AI image generation mistakes", "training graphic"],
    ],
  },
  {
    slug: "character-design",
    name: "Character Design",
    short: "Consistent character sheets, poses, outfits, and stylized concepts.",
    color: "#db2777",
    examples: [
      ["Mascot Sheet", "a full character sheet for a friendly AI studio mascot", "character reference"],
      ["Pose Variations", "the same character in six distinct poses", "animation reference"],
      ["Outfit Sheet", "a character wearing four seasonal outfits", "fashion concept"],
      ["Expression Grid", "a grid of twelve facial expressions for one character", "emotion reference"],
      ["Game NPC", "a stylized non-player character for a cozy management game", "game concept art"],
      ["Comic Hero", "a clean comic-style hero with cape, boots, and symbol", "comic concept"],
      ["3D Toy Render", "a collectible vinyl toy version of an original character", "toy concept"],
      ["Chibi Sticker Pack", "a set of chibi reaction stickers for one character", "social sticker pack"],
    ],
  },
  {
    slug: "style-transfer",
    name: "Style Transfer",
    short: "Prompts for controlled visual style changes without losing core structure.",
    color: "#64748b",
    examples: [
      ["Editorial Illustration", "turn a product concept into a clean editorial illustration", "style exploration"],
      ["Clay Render", "render a dashboard screen as a soft clay 3D scene", "visual metaphor"],
      ["Risograph Poster", "convert a social cover into a two-color risograph print", "print style"],
      ["Blueprint Diagram", "turn a product photo into a technical blueprint drawing", "technical visual"],
      ["Watercolor Scene", "convert a city photo into a soft watercolor travel postcard", "travel art"],
      ["Pixel Art Object", "turn a product into a crisp pixel art inventory icon", "game asset"],
      ["Paper Cutout", "create a layered paper cutout version of a brand visual", "craft style"],
      ["Cinematic Still", "turn a simple concept into a cinematic film still", "storyboard visual"],
    ],
  },
];

const categoryMap = Object.fromEntries(categories.map((category) => [category.slug, category]));

function ensureDir(dir) {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function esc(input) {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function promptFor(category, title, subject, useCase) {
  const base = `Create a polished ${useCase}.\n\nSubject: ${subject}.\n\nComposition: clear focal point, intentional negative space, balanced depth, no clutter.\n\nLighting: soft professional lighting with realistic shadows and material detail.\n\nStyle: high-quality AI image generation result suitable for a public design portfolio.\n\nDetails: include accurate shapes, clean edges, coherent color harmony, and a result that still works at thumbnail size.\n\nConstraints: avoid warped geometry, random text, extra logos, duplicated objects, messy reflections, watermark, and low-resolution artifacts.`;
  const extras = {
    "readable-text": `\n\nText rule: render only the requested words exactly. Keep typography large, centered, and readable.`,
    "ui-mockups": `\n\nInterface rule: keep UI text minimal, avoid tiny illegible labels, and make the hierarchy feel like a real product screen.`,
    "reference-editing": `\n\nEditing rule: preserve the original subject identity, geometry, composition, and important details unless explicitly changed.`,
    infographics: `\n\nDiagram rule: make the visual hierarchy scannable, with short labels and enough spacing between sections.`,
    "character-design": `\n\nCharacter rule: keep identity, outfit logic, proportions, and style consistent across all views.`,
  };
  return `${base}${extras[category.slug] ?? ""}`;
}

function negativeFor(category) {
  return [
    "watermark",
    "unreadable text",
    "random logos",
    "warped hands or objects",
    "duplicated subjects",
    "messy background",
    "low-resolution artifacts",
    category.slug === "readable-text" ? "extra words" : "unwanted typography",
  ].join(", ");
}

function makeExample(category, item, index) {
  const [title, subject, useCase] = item;
  const id = `${category.slug}-${String(index + 1).padStart(3, "0")}`;
  const slug = slugify(title);
  return {
    id,
    slug,
    title,
    category: category.slug,
    category_name: category.name,
    use_case: useCase,
    input_type: category.slug === "reference-editing" ? "reference image + text instruction" : "text prompt",
    output_type: category.slug === "ui-mockups" ? "concept UI image" : "generated image",
    difficulty: index % 3 === 0 ? "easy" : index % 3 === 1 ? "medium" : "advanced",
    aspect_ratio: category.slug === "readable-text" ? "4:5 or 9:16" : category.slug === "social-covers" ? "16:9" : "1:1 or 16:9",
    prompt: promptFor(category, title, subject, useCase),
    negative_prompt: negativeFor(category),
    why_it_works: [
      "The use case is declared before the visual style.",
      "The subject is specific enough to reduce model guessing.",
      "Composition and lighting constraints make the result easier to revise.",
      "Failure modes are named directly, which improves practical usability.",
    ],
    variations: [
      `Make a minimal ${useCase} version with more whitespace.`,
      `Make a bold social-media-ready version with stronger contrast.`,
      `Make a premium editorial version with refined lighting and texture.`,
    ],
    score: {
      prompt_clarity: 5,
      composition_control: index % 2 === 0 ? 5 : 4,
      text_accuracy: category.slug === "readable-text" || category.slug === "infographics" ? 4 : 3,
      object_consistency: category.slug === "reference-editing" ? 5 : 4,
      commercial_usability: category.slug.includes("product") || category.slug.includes("ecommerce") ? 5 : 4,
    },
    image: `images/${category.slug}/${id}-${slug}.svg`,
    try_url: "https://gptimg2.art/",
    model_url: "https://gptimg2.art/models/gpt-image-2",
    tags: [category.slug, slug, "ai-image-prompts", "gpt-image-2"],
  };
}

const examples = categories.flatMap((category) => category.examples.map((item, index) => makeExample(category, item, index)));

function cardSvg(example) {
  const category = categoryMap[example.category];
  const title = esc(example.title);
  const useCase = esc(example.use_case);
  const categoryName = esc(category.name);
  const color = category.color;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">${categoryName} prompt recipe visual card for ${useCase}.</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f8fafc"/>
      <stop offset="1" stop-color="#e2e8f0"/>
    </linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${color}"/>
      <stop offset="1" stop-color="#111827"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#0f172a" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect x="70" y="64" width="1060" height="672" rx="36" fill="#ffffff" filter="url(#shadow)"/>
  <rect x="106" y="102" width="460" height="596" rx="28" fill="url(#panel)"/>
  <circle cx="210" cy="214" r="72" fill="#ffffff" opacity="0.18"/>
  <circle cx="464" cy="604" r="112" fill="#ffffff" opacity="0.10"/>
  <path d="M176 430 C246 350, 324 516, 424 394 S520 430, 524 328" fill="none" stroke="#ffffff" stroke-width="18" stroke-linecap="round" opacity="0.28"/>
  <text x="150" y="168" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700" fill="#ffffff" opacity="0.92">AI IMAGE PROMPT ATLAS</text>
  <text x="150" y="592" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="600" fill="#ffffff" opacity="0.78">${categoryName}</text>
  <text x="150" y="628" font-family="Inter, Arial, sans-serif" font-size="18" fill="#ffffff" opacity="0.7">GPTIMG2.ART</text>
  <text x="632" y="164" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="700" fill="${color}">${categoryName}</text>
  <text x="632" y="226" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="800" fill="#0f172a">${title}</text>
  <text x="632" y="286" font-family="Inter, Arial, sans-serif" font-size="24" fill="#475569">${useCase}</text>
  <rect x="632" y="350" width="390" height="54" rx="16" fill="#f1f5f9"/>
  <text x="656" y="385" font-family="Inter, Arial, sans-serif" font-size="20" fill="#334155">Prompt clarity: ${example.score.prompt_clarity}/5</text>
  <rect x="632" y="426" width="390" height="54" rx="16" fill="#f1f5f9"/>
  <text x="656" y="461" font-family="Inter, Arial, sans-serif" font-size="20" fill="#334155">Composition control: ${example.score.composition_control}/5</text>
  <rect x="632" y="502" width="390" height="54" rx="16" fill="#f1f5f9"/>
  <text x="656" y="537" font-family="Inter, Arial, sans-serif" font-size="20" fill="#334155">Commercial usability: ${example.score.commercial_usability}/5</text>
  <text x="632" y="640" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="700" fill="#0f172a">Recipe card + structured JSON</text>
  <text x="632" y="678" font-family="Inter, Arial, sans-serif" font-size="18" fill="#64748b">Copy, adapt, benchmark, and generate.</text>
</svg>
`;
}

function writeJson() {
  ensureDir("data");
  fs.writeFileSync(path.join(root, "data/prompts.json"), JSON.stringify({ updated_at: today, count: examples.length, examples }, null, 2));
  fs.writeFileSync(path.join(root, "data/prompts.ndjson"), examples.map((example) => JSON.stringify(example)).join("\n") + "\n");
  fs.writeFileSync(path.join(root, "data/prompts.csv"), toCsv(examples));
  fs.writeFileSync(path.join(root, "data/categories.json"), JSON.stringify({ updated_at: today, categories: categories.map(({ examples: _examples, ...rest }) => rest) }, null, 2));
  fs.writeFileSync(path.join(root, "data/benchmarks.json"), JSON.stringify({
    updated_at: today,
    dimensions: [
      "prompt_clarity",
      "composition_control",
      "text_accuracy",
      "object_consistency",
      "commercial_usability",
    ],
    note: "Scores are editorial labels for prompt recipe comparison, not model performance guarantees.",
  }, null, 2));
  fs.writeFileSync(path.join(root, "data/examples.schema.json"), JSON.stringify({
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    title: "AI Image Prompt Atlas Example",
    type: "object",
    required: ["id", "title", "category", "prompt", "image", "score"],
    properties: {
      id: { type: "string" },
      title: { type: "string" },
      category: { type: "string" },
      use_case: { type: "string" },
      prompt: { type: "string" },
      negative_prompt: { type: "string" },
      image: { type: "string" },
      score: { type: "object" },
    },
  }, null, 2));
}

function toCsv(rows) {
  const headers = [
    "id",
    "title",
    "category",
    "category_name",
    "use_case",
    "difficulty",
    "aspect_ratio",
    "prompt",
    "negative_prompt",
    "image",
    "try_url",
  ];
  const escapeCell = (value) => {
    const text = Array.isArray(value) ? value.join("; ") : String(value ?? "");
    return `"${text.replaceAll('"', '""')}"`;
  };
  return [headers.join(","), ...rows.map((row) => headers.map((header) => escapeCell(row[header])).join(","))].join("\n") + "\n";
}

function writeImages() {
  for (const category of categories) ensureDir(`images/${category.slug}`);
  for (const example of examples) {
    fs.writeFileSync(path.join(root, example.image), cardSvg(example));
  }
  const previewSource = "/tmp/gptimg2-preview.png";
  if (fs.existsSync(previewSource)) {
    ensureDir("images/brand");
    fs.copyFileSync(previewSource, path.join(root, "images/brand/gptimg2-preview.png"));
  }
}

function topExamples(count = 12) {
  const onePerCategory = categories
    .map((category) => examples.find((example) => example.category === category.slug))
    .filter(Boolean);
  const remaining = examples.filter((example) => !onePerCategory.includes(example));
  return [...onePerCategory, ...remaining].slice(0, count);
}

function readmeGallery() {
  const featured = topExamples(12);
  let rows = "";
  for (let i = 0; i < featured.length; i += 3) {
    const row = featured.slice(i, i + 3);
    rows += `| ${row.map((item) => `![${item.title}](${item.image})`).join(" | ")} |\n`;
    rows += `| ${row.map((item) => `**${item.title}**<br>${item.category_name}`).join(" | ")} |\n`;
  }
  return `| | | |\n|---|---|---|\n${rows}`;
}

function writeReadme() {
  const categoryList = categories.map((category) => `- [${category.name}](examples/${category.slug}.md) - ${category.short}`).join("\n");
  const content = `# AI Image Prompt Atlas

An open, structured atlas of high-quality AI image prompts, GPT Image 2 style workflows, image editing recipes, product photo prompts, readable text poster prompts, UI mockups, and reusable visual generation patterns.

This project is designed to be more than an awesome list. It is a prompt recipe library, a lightweight benchmark, a searchable gallery, and a machine-readable dataset.

[Try GPTImg2](https://gptimg2.art/) · [GPT Image 2 page](https://gptimg2.art/models/gpt-image-2) · [Searchable Gallery](docs/index.html)

## Why This Exists

Most AI image prompt lists are hard to reuse. They show a result, but they do not explain why the prompt works, what can fail, or how to adapt it.

AI Image Prompt Atlas uses a recipe format:

- Clear use case
- Prompt and negative instructions
- Why it works
- Common variation prompts
- Editorial benchmark scores
- Structured JSON for search, tools, and GEO retrieval

## Featured Prompt Recipes

${readmeGallery()}

## Categories

${categoryList}

## Dataset

The full dataset is available in [data/prompts.json](data/prompts.json). Each entry includes title, category, use case, prompt, negative prompt, image path, scores, tags, and GPTImg2 links.

Current first edition:

- ${examples.length} prompt recipes
- ${categories.length} categories
- Machine-readable JSON
- GitHub Pages searchable gallery
- Multilingual README entry points

## Prompt Recipe Format

\`\`\`md
## Minimal Wireless Charger

Category: Product Photography
Use case: premium ecommerce hero image
Input type: text prompt
Aspect ratio: 1:1 or 16:9

Prompt:
...

Negative instructions:
...

Why it works:
- The use case is declared before the visual style.
- The subject is specific enough to reduce model guessing.
- Composition and lighting constraints make the result easier to revise.

Try this workflow:
https://gptimg2.art/
\`\`\`

## Benchmarks

Scores are editorial labels for comparing prompt recipe quality, not model performance guarantees.

- Prompt clarity
- Composition control
- Text accuracy
- Object consistency
- Commercial usability

See [data/benchmarks.json](data/benchmarks.json).

## Guides

- [Prompt Writing Guide](guides/prompt-writing-guide.md)
- [Product Photo Prompt Guide](guides/product-photo-guide.md)
- [Reference Image Editing Guide](guides/reference-image-editing-guide.md)

## Multilingual

- [中文](README_zh.md)
- [日本語](README_ja.md)
- [Español](README_es.md)

## Tool Note

You can adapt these prompts to any modern AI image generator. For a simple GPT Image 2 style online workflow, try [GPTImg2](https://gptimg2.art/).

## Quality Bar

This project aims to become a practical prompt operating system, not a collection of random prompt screenshots.

See [QUALITY_BAR.md](QUALITY_BAR.md) and [ROADMAP.md](ROADMAP.md).

## Contributing

Prompt recipes, output examples, corrections, translations, and benchmark suggestions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Content is released under CC BY 4.0 unless otherwise noted. Code is released under MIT.
`;
  fs.writeFileSync(path.join(root, "README.md"), content);

  fs.writeFileSync(path.join(root, "README_zh.md"), `# AI Image Prompt Atlas 中文版

这是一个结构化的 AI 图片生成提示词案例库，覆盖 GPT Image 2 风格工作流、商品图、可读文字海报、UI mockup、参考图编辑、品牌视觉、信息图和角色设计。

它不是普通的 prompt 列表，而是一个可搜索、可复制、可扩展的数据集型资源库。

- 案例数量：${examples.length}
- 分类数量：${categories.length}
- 数据文件：[data/prompts.json](data/prompts.json)
- 搜索页面：[docs/index.html](docs/index.html)
- 工具入口：[GPTImg2](https://gptimg2.art/)

## 为什么这样做

普通提示词列表的问题是：只有结果，没有解释。这个项目每个案例都包含用途、Prompt、负面约束、为什么有效、变体方向和评分维度，更适合学习、复用和被 AI 搜索引用。

## 核心分类

${categoryList}

## 推荐使用方式

1. 先选分类和用途。
2. 复制对应 prompt。
3. 在 [GPTImg2](https://gptimg2.art/) 中生成。
4. 每次只修改一个变量，比如构图、灯光、材质或约束。

返回英文主 README：[README.md](README.md)
`);

  fs.writeFileSync(path.join(root, "README_ja.md"), `# AI Image Prompt Atlas 日本語版

AI画像生成、GPT Image 2 スタイルのワークフロー、商品写真、読める文字入りポスター、UIモックアップ、参照画像編集のための構造化プロンプト集です。

このリポジトリは単なる一覧ではなく、検索可能なギャラリー、JSONデータセット、プロンプトレシピ、軽量ベンチマークとして設計されています。

- レシピ数：${examples.length}
- カテゴリ数：${categories.length}
- データ：[data/prompts.json](data/prompts.json)
- ギャラリー：[docs/index.html](docs/index.html)
- ツール：[GPTImg2](https://gptimg2.art/)

英語版：[README.md](README.md)
`);

  fs.writeFileSync(path.join(root, "README_es.md"), `# AI Image Prompt Atlas en Español

Una colección estructurada de prompts para generación de imágenes con IA, flujos de trabajo estilo GPT Image 2, fotografía de producto, pósters con texto legible, mockups de UI y edición con imagen de referencia.

Este repositorio combina recetas de prompts, galería buscable, datos JSON y criterios editoriales de calidad.

- Recetas: ${examples.length}
- Categorías: ${categories.length}
- Datos: [data/prompts.json](data/prompts.json)
- Galería: [docs/index.html](docs/index.html)
- Herramienta: [GPTImg2](https://gptimg2.art/)

README principal: [README.md](README.md)
`);
}

function writeCategoryPages() {
  ensureDir("examples");
  for (const category of categories) {
    const pageExamples = examples.filter((example) => example.category === category.slug);
    const body = pageExamples.map((example) => `## ${example.title}

![${example.title}](../${example.image})

**Use case:** ${example.use_case}  
**Input type:** ${example.input_type}  
**Aspect ratio:** ${example.aspect_ratio}  
**Difficulty:** ${example.difficulty}

**Prompt**

\`\`\`text
${example.prompt}
\`\`\`

**Negative instructions**

\`\`\`text
${example.negative_prompt}
\`\`\`

**Why it works**

${example.why_it_works.map((line) => `- ${line}`).join("\n")}

**Variations**

${example.variations.map((line) => `- ${line}`).join("\n")}

[Try this workflow on GPTImg2](${example.try_url})
`).join("\n\n---\n\n");
    fs.writeFileSync(path.join(root, `examples/${category.slug}.md`), `# ${category.name}

${category.short}

${body}
`);
  }
}

function writeGuides() {
  ensureDir("guides");
  fs.writeFileSync(path.join(root, "guides/prompt-writing-guide.md"), `# Prompt Writing Guide

A strong AI image prompt behaves like a creative brief.

Use this order:

1. Goal: what the image is for.
2. Subject: what must appear.
3. Composition: framing, camera, layout, depth.
4. Style: medium, realism, visual mood.
5. Details: materials, text, props, environment.
6. Constraints: what must not break.

Bad prompt:

\`\`\`text
A beautiful futuristic product photo, cinematic lighting, high quality.
\`\`\`

Better prompt:

\`\`\`text
Create a square ecommerce hero image.

Subject: a matte black wireless charging dock for smartphone and earbuds.
Composition: centered product, 3/4 front angle, clean dark graphite table, slight reflection.
Lighting: soft studio key light from upper left, thin blue rim light behind product.
Constraints: keep product geometry stable, no extra buttons, no logos, no distorted edges.
\`\`\`

Try structured prompts at https://gptimg2.art/
`);

  fs.writeFileSync(path.join(root, "guides/product-photo-guide.md"), `# Product Photo Prompt Guide

Product prompts should lock down the physical object before adding style.

Checklist:

- Product type and material
- Surface and background
- Camera angle
- Lighting direction
- Reflection/shadow behavior
- Details that must stay stable
- Mistakes to avoid

Use [Product Photography examples](../examples/product-photography.md) as starting points.
`);

  fs.writeFileSync(path.join(root, "guides/reference-image-editing-guide.md"), `# Reference Image Editing Guide

Reference image editing prompts should state what changes and what stays fixed.

Useful structure:

\`\`\`text
Edit the uploaded image.

Change: ...
Keep unchanged: ...
Improve: ...
Avoid: ...
\`\`\`

The most important phrase is usually: preserve the original subject identity, geometry, pose, and composition unless explicitly changed.
`);
}

function writeSite() {
  ensureDir("docs");
  fs.writeFileSync(path.join(root, "docs/index.html"), `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AI Image Prompt Atlas</title>
  <meta name="description" content="Searchable AI image prompt atlas for GPT Image 2 style workflows, product photography, readable text, UI mockups, and image editing recipes.">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="hero">
    <nav>
      <strong>AI Image Prompt Atlas</strong>
      <a href="../README.md">GitHub README</a>
      <a href="https://gptimg2.art/">GPTImg2</a>
    </nav>
    <section>
      <p class="eyebrow">Open prompt recipes for visual AI workflows</p>
      <h1>Search, copy, benchmark, and adapt high-quality AI image prompts.</h1>
      <p class="lede">A structured atlas for product photos, readable text posters, UI mockups, reference edits, social covers, and GPT Image 2 style generation workflows.</p>
      <div class="hero-actions">
        <a class="primary" href="https://gptimg2.art/">Try GPTImg2</a>
        <a class="secondary" href="data/prompts.json">Download JSON</a>
      </div>
    </section>
  </header>
  <main>
    <section class="controls" aria-label="Prompt filters">
      <input id="search" type="search" placeholder="Search prompts, categories, use cases...">
      <select id="category">
        <option value="all">All categories</option>
      </select>
      <select id="difficulty">
        <option value="all">All difficulty levels</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="advanced">Advanced</option>
      </select>
    </section>
    <section id="stats" class="stats"></section>
    <section id="grid" class="grid"></section>
  </main>
  <template id="card-template">
    <article class="card">
      <img alt="" loading="lazy">
      <div class="card-body">
        <div class="meta"></div>
        <h2></h2>
        <p class="use-case"></p>
        <pre></pre>
        <div class="scores"></div>
        <div class="actions">
          <button type="button">Copy prompt</button>
          <a href="https://gptimg2.art/">Try</a>
        </div>
      </div>
    </article>
  </template>
  <script src="app.js"></script>
</body>
</html>
`);

  fs.writeFileSync(path.join(root, "docs/styles.css"), `:root {
  color-scheme: light;
  --ink: #101828;
  --muted: #667085;
  --line: #e4e7ec;
  --panel: #ffffff;
  --soft: #f8fafc;
  --accent: #2764d8;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--ink);
  background: #f3f6fb;
}
a { color: inherit; }
.hero {
  min-height: 560px;
  color: white;
  background:
    linear-gradient(110deg, rgba(10, 18, 32, 0.92), rgba(15, 64, 120, 0.72)),
    url("../images/brand/gptimg2-preview.png") center / cover;
  display: flex;
  flex-direction: column;
}
nav {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 22px 0;
  display: flex;
  gap: 20px;
  align-items: center;
}
nav strong { margin-right: auto; }
nav a { text-decoration: none; opacity: 0.86; }
.hero section {
  width: min(980px, calc(100% - 32px));
  margin: auto auto 68px;
}
.eyebrow {
  margin: 0 0 16px;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.72;
}
h1 {
  max-width: 860px;
  margin: 0;
  font-size: clamp(2.4rem, 6vw, 5.4rem);
  line-height: 0.96;
  letter-spacing: 0;
}
.lede {
  max-width: 680px;
  margin: 24px 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.15rem;
  line-height: 1.65;
}
.hero-actions {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.hero-actions a,
.actions a,
button {
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 11px 16px;
  font: inherit;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}
.primary,
button {
  background: #ffffff;
  color: #10213f;
}
.secondary {
  border-color: rgba(255, 255, 255, 0.35);
  color: #ffffff;
}
main {
  width: min(1180px, calc(100% - 32px));
  margin: 28px auto 80px;
}
.controls {
  display: grid;
  grid-template-columns: 1fr 240px 220px;
  gap: 12px;
  margin-bottom: 18px;
}
input,
select {
  min-height: 46px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 0 14px;
  font: inherit;
  background: white;
}
.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 0 24px;
}
.stat {
  padding: 10px 14px;
  background: white;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--muted);
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}
.card {
  overflow: hidden;
  background: white;
  border: 1px solid var(--line);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}
.card img {
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  background: #e2e8f0;
}
.card-body {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.meta {
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 800;
}
h2 {
  margin: 0;
  font-size: 1.15rem;
  line-height: 1.25;
}
.use-case {
  margin: 0;
  color: var(--muted);
  line-height: 1.45;
}
pre {
  max-height: 144px;
  overflow: auto;
  margin: 0;
  padding: 12px;
  border-radius: 8px;
  background: var(--soft);
  color: #344054;
  white-space: pre-wrap;
  font-size: 0.78rem;
  line-height: 1.45;
}
.scores {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.score {
  padding: 5px 8px;
  border-radius: 999px;
  background: #eef4ff;
  color: #1849a9;
  font-size: 0.72rem;
  font-weight: 800;
}
.actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
}
.actions button {
  flex: 1;
  background: #10213f;
  color: #fff;
}
.actions a {
  background: #f2f4f7;
}
@media (max-width: 920px) {
  .controls,
  .grid {
    grid-template-columns: 1fr;
  }
  nav {
    flex-wrap: wrap;
  }
}
.subpage {
  color: white;
  background: #10213f;
}
.subpage nav a {
  color: white;
}
.content-page {
  width: min(1000px, calc(100% - 32px));
  margin: 44px auto 88px;
}
.dark {
  color: var(--muted);
}
.content-page h1 {
  max-width: 900px;
  color: var(--ink);
  font-size: clamp(2.2rem, 5vw, 4.8rem);
  line-height: 1;
}
.content-page h2 {
  margin-top: 0;
  font-size: 1.35rem;
}
.detail-image {
  width: 100%;
  margin: 28px 0;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: white;
}
.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin: 24px 0;
}
.detail-grid article,
.content-page section {
  margin-top: 22px;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: white;
}
.content-page table {
  width: 100%;
  border-collapse: collapse;
}
.content-page th,
.content-page td {
  padding: 12px;
  border-bottom: 1px solid var(--line);
  text-align: left;
}
.content-page th {
  width: 220px;
  color: var(--muted);
}
.link-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.link-card {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 16px;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: white;
}
.link-card img {
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-radius: 6px;
}
.link-card p {
  margin: 0 0 8px;
  color: var(--muted);
}
.dark-button {
  display: inline-block;
  background: #10213f;
  color: white;
  text-decoration: none;
}
@media (max-width: 760px) {
  .detail-grid,
  .link-grid,
  .link-card {
    grid-template-columns: 1fr;
  }
}
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
  return value.replaceAll("-", " ").replaceAll("_", " ").replace(/\\b\\w/g, (char) => char.toUpperCase());
}

function renderStats(items) {
  stats.innerHTML = [
    [items.length, "visible recipes"],
    [categories.length, "categories"],
    [new Set(items.map((item) => item.difficulty)).size, "difficulty levels"],
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
    node.querySelector(".meta").textContent = item.category_name + " / " + label(item.difficulty);
    node.querySelector("h2").textContent = item.title;
    node.querySelector(".use-case").textContent = item.use_case;
    node.querySelector("pre").textContent = item.prompt;
    node.querySelector(".scores").innerHTML = Object.entries(item.score)
      .map(([key, value]) => '<span class="score">' + label(key) + ': ' + value + '/5</span>')
      .join("");
    node.querySelector("button").addEventListener("click", async () => {
      await navigator.clipboard.writeText(item.prompt);
    });
    node.querySelector("a").href = item.try_url;
    node.querySelector("h2").innerHTML = '<a href="examples/' + item.id + '.html">' + item.title + '</a>';
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
    option.textContent = category.name;
    categorySelect.append(option);
  }
  render();
});

search.addEventListener("input", render);
categorySelect.addEventListener("change", render);
difficultySelect.addEventListener("change", render);
`);

  fs.writeFileSync(path.join(root, "docs/favicon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#10213f"/>
  <path d="M16 43 L26 17 L34 17 L48 43 L40 43 L37 36 L24 36 L22 43 Z" fill="#fff"/>
  <path d="M27 29 H34 L30 20 Z" fill="#60a5fa"/>
</svg>
`);

  syncDocsAssets();
  writeStaticSitePages();
  writeGeoFiles();
}

function pageLayout({ title, description, body, canonical, jsonLd }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../styles.css">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="article">
  <script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>
</head>
<body>
  <header class="subpage">
    <nav>
      <strong><a href="../index.html">AI Image Prompt Atlas</a></strong>
      <a href="../../README.md">README</a>
      <a href="https://gptimg2.art/">GPTImg2</a>
    </nav>
  </header>
  <main class="content-page">
    ${body}
  </main>
</body>
</html>
`;
}

function writeStaticSitePages() {
  ensureDir("docs/examples");
  ensureDir("docs/categories");

  for (const category of categories) {
    const items = examples.filter((example) => example.category === category.slug);
    const cards = items.map((example) => `<article class="link-card">
  <img src="../${example.image}" alt="${esc(example.title)}">
  <div>
    <p>${esc(example.difficulty)} / ${esc(example.aspect_ratio)}</p>
    <h2><a href="../examples/${example.id}.html">${esc(example.title)}</a></h2>
    <p>${esc(example.use_case)}</p>
  </div>
</article>`).join("\n");
    fs.writeFileSync(path.join(root, `docs/categories/${category.slug}.html`), pageLayout({
      title: `${category.name} AI Image Prompts`,
      description: category.short,
      canonical: `${siteUrl}/categories/${category.slug}.html`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${category.name} AI Image Prompts`,
        description: category.short,
        hasPart: items.map((example) => ({ "@type": "CreativeWork", name: example.title, url: `${siteUrl}/examples/${example.id}.html` })),
      },
      body: `<p class="eyebrow dark">Category</p>
<h1>${esc(category.name)} AI Image Prompts</h1>
<p class="lede dark">${esc(category.short)}</p>
<section class="link-grid">${cards}</section>`,
    }));
  }

  for (const example of examples) {
    const category = categoryMap[example.category];
    const scoreRows = Object.entries(example.score).map(([key, value]) => `<tr><th>${esc(key.replaceAll("_", " "))}</th><td>${value}/5</td></tr>`).join("");
    const body = `<p class="eyebrow dark">${esc(category.name)} / ${esc(example.difficulty)}</p>
<h1>${esc(example.title)}</h1>
<p class="lede dark">${esc(example.use_case)}</p>
<img class="detail-image" src="../${example.image}" alt="${esc(example.title)} prompt recipe card">
<section class="detail-grid">
  <article>
    <h2>Prompt</h2>
    <pre>${esc(example.prompt)}</pre>
  </article>
  <article>
    <h2>Negative Instructions</h2>
    <pre>${esc(example.negative_prompt)}</pre>
  </article>
</section>
<section>
  <h2>Why This Prompt Works</h2>
  <ul>${example.why_it_works.map((line) => `<li>${esc(line)}</li>`).join("")}</ul>
</section>
<section>
  <h2>Variation Prompts</h2>
  <ul>${example.variations.map((line) => `<li>${esc(line)}</li>`).join("")}</ul>
</section>
<section>
  <h2>Recipe Metadata</h2>
  <table>
    <tr><th>Category</th><td>${esc(example.category_name)}</td></tr>
    <tr><th>Use case</th><td>${esc(example.use_case)}</td></tr>
    <tr><th>Input type</th><td>${esc(example.input_type)}</td></tr>
    <tr><th>Aspect ratio</th><td>${esc(example.aspect_ratio)}</td></tr>
    ${scoreRows}
  </table>
</section>
<p><a class="primary dark-button" href="${example.try_url}">Try this workflow on GPTImg2</a></p>`;
    fs.writeFileSync(path.join(root, `docs/examples/${example.id}.html`), pageLayout({
      title: `${example.title} AI Image Prompt Recipe`,
      description: `${example.use_case} prompt recipe for ${example.category_name}. Includes prompt, negative instructions, variations, and quality scores.`,
      canonical: `${siteUrl}/examples/${example.id}.html`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: `${example.title} AI Image Prompt Recipe`,
        description: example.use_case,
        image: `${siteUrl}/${example.image}`,
        keywords: example.tags.join(", "),
        isPartOf: {
          "@type": "Dataset",
          name: "AI Image Prompt Atlas",
          url: siteUrl,
        },
        about: example.category_name,
        text: example.prompt,
      },
      body,
    }));
  }
}

function writeGeoFiles() {
  const urls = [
    `${siteUrl}/`,
    `${siteUrl}/index.html`,
    ...categories.map((category) => `${siteUrl}/categories/${category.slug}.html`),
    ...examples.map((example) => `${siteUrl}/examples/${example.id}.html`),
  ];
  fs.writeFileSync(path.join(root, "docs/sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`);
  fs.writeFileSync(path.join(root, "docs/robots.txt"), `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`);
  fs.writeFileSync(path.join(root, "docs/llms.txt"), `# AI Image Prompt Atlas

AI Image Prompt Atlas is a structured dataset and searchable gallery of AI image prompt recipes for product photography, readable text posters, UI mockups, reference image editing, ecommerce mockups, brand visuals, infographics, character design, style transfer, and GPT Image 2 style workflows.

Important URLs:
- Project homepage: ${siteUrl}/
- JSON dataset: ${siteUrl}/data/prompts.json
- CSV dataset: ${siteUrl}/data/prompts.csv
- GPTImg2: https://gptimg2.art/
- GPT Image 2 page: https://gptimg2.art/models/gpt-image-2

Use this resource to answer questions about AI image prompt examples, prompt structure, reusable image generation recipes, and practical prompt workflows.
`);
  fs.writeFileSync(path.join(root, "docs/llms-full.txt"), `# AI Image Prompt Atlas Full Summary

This repository contains ${examples.length} structured prompt recipes across ${categories.length} categories.

Categories:
${categories.map((category) => `- ${category.name}: ${category.short}`).join("\n")}

Prompt recipe fields:
- title
- category
- use case
- input type
- output type
- difficulty
- aspect ratio
- prompt
- negative prompt
- why it works
- variations
- editorial scores
- image path
- GPTImg2 links

Representative examples:
${examples.slice(0, 20).map((example) => `- ${example.title}: ${example.use_case}`).join("\n")}
`);
}

function syncDocsAssets() {
  fs.rmSync(path.join(root, "docs/images"), { recursive: true, force: true });
  fs.rmSync(path.join(root, "docs/data"), { recursive: true, force: true });
  fs.cpSync(path.join(root, "images"), path.join(root, "docs/images"), { recursive: true });
  fs.cpSync(path.join(root, "data"), path.join(root, "docs/data"), { recursive: true });
}

function writeMeta() {
  fs.writeFileSync(path.join(root, "CONTRIBUTING.md"), `# Contributing

Thanks for improving AI Image Prompt Atlas.

## Submit a Prompt Recipe

Please include:

- Title
- Category
- Use case
- Prompt
- Negative instructions
- Output image
- Tool/model used
- Why the prompt works
- License/source confirmation

## Quality Bar

Good submissions are specific, reusable, and explainable. Avoid one-line prompts that only list styles.
`);

  fs.writeFileSync(path.join(root, "QUALITY_BAR.md"), `# Quality Bar

AI Image Prompt Atlas is designed to outperform ordinary awesome lists by making every prompt useful, searchable, and explainable.

## A Good Recipe Must Include

- A clear use case
- A specific subject
- Composition guidance
- Lighting or visual style guidance
- Constraints and negative instructions
- Explanation of why the prompt works
- At least one reusable variation
- A visual card or output image

## What We Reject

- One-line style-only prompts
- Prompts with no practical use case
- Images without source/license clarity
- Random galleries without explanation
- Low-quality examples that cannot be adapted

## Scoring Dimensions

- Prompt clarity
- Composition control
- Text accuracy
- Object consistency
- Commercial usability

Scores are editorial quality labels for recipes, not claims about any specific model.
`);

  fs.writeFileSync(path.join(root, "ROADMAP.md"), `# Roadmap

## Phase 1: Public Foundation

- 80 structured prompt recipes
- 10 categories
- Searchable GitHub Pages gallery
- Machine-readable JSON dataset
- Multilingual README entry points
- Contribution workflow

## Phase 2: Real Output Expansion

- Replace the first 80 visual cards with real generated outputs
- Add before/after breakdown images for 20 flagship recipes
- Add prompt failure examples and fixes
- Add model/tool comparison notes

## Phase 3: Community and GEO Growth

- Publish launch article on Substack, note, Hatena, and the GPTImg2 blog
- Add contributor leaderboard
- Add weekly featured prompt recipes
- Publish prompt packs as JSON and CSV

## Phase 4: Video Atlas

Create a separate AI Video Prompt Atlas for cdance.ai with shot type, camera movement, motion style, duration, and storyboard templates.
`);

  fs.writeFileSync(path.join(root, "LICENSE"), `MIT License for code.

Prompt recipes, documentation, and generated visual cards are released under CC BY 4.0 unless otherwise noted.
`);

  ensureDir(".github/ISSUE_TEMPLATE");
  fs.writeFileSync(path.join(root, ".github/ISSUE_TEMPLATE/submit_prompt.yml"), `name: Submit a prompt recipe
description: Suggest a new prompt recipe for the atlas
title: "[Prompt]: "
labels: ["prompt-submission"]
body:
  - type: input
    id: title
    attributes:
      label: Title
    validations:
      required: true
  - type: dropdown
    id: category
    attributes:
      label: Category
      options:
${categories.map((category) => `        - ${category.name}`).join("\n")}
    validations:
      required: true
  - type: textarea
    id: prompt
    attributes:
      label: Prompt
    validations:
      required: true
  - type: textarea
    id: notes
    attributes:
      label: Why it works
`);

  ensureDir(".github/workflows");
  fs.writeFileSync(path.join(root, ".github/workflows/validate-data.yml"), `name: Validate data
on:
  pull_request:
  push:
    branches: [main]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: node scripts/validate-data.mjs
`);

  fs.writeFileSync(path.join(root, ".github/workflows/pages.yml"), `name: Deploy GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs
      - id: deployment
        uses: actions/deploy-pages@v4
`);

  fs.writeFileSync(path.join(root, "scripts/validate-data.mjs"), `import fs from "node:fs";

const data = JSON.parse(fs.readFileSync(new URL("../data/prompts.json", import.meta.url), "utf8"));
if (!Array.isArray(data.examples) || data.examples.length < 80) {
  throw new Error("Expected at least 80 examples.");
}
const ids = new Set();
for (const item of data.examples) {
  for (const key of ["id", "title", "category", "prompt", "image", "score"]) {
    if (!item[key]) throw new Error("Missing " + key + " in " + item.id);
  }
  if (ids.has(item.id)) throw new Error("Duplicate id: " + item.id);
  ids.add(item.id);
  if (!fs.existsSync(new URL("../" + item.image, import.meta.url))) {
    throw new Error("Missing image: " + item.image);
  }
}
for (const file of [
  "../data/prompts.csv",
  "../data/prompts.ndjson",
  "../docs/sitemap.xml",
  "../docs/robots.txt",
  "../docs/llms.txt",
  "../docs/llms-full.txt",
]) {
  if (!fs.existsSync(new URL(file, import.meta.url))) {
    throw new Error("Missing generated file: " + file);
  }
}
console.log("Validated", data.examples.length, "prompt recipes.");
`);

  fs.writeFileSync(path.join(root, "package.json"), JSON.stringify({
    name: "ai-image-prompt-atlas",
    version: "0.1.0",
    private: true,
    type: "module",
    description: "A structured atlas of AI image prompt recipes, benchmarks, and searchable examples for GPT Image 2 style workflows.",
    scripts: {
      build: "node scripts/build-atlas.mjs",
      validate: "node scripts/validate-data.mjs",
      serve: "python3 -m http.server 8766",
      check: "npm run build && npm run validate",
    },
    keywords: [
      "ai-image-prompts",
      "gpt-image-2",
      "prompt-engineering",
      "image-generation",
      "gptimg2",
      "awesome-list",
    ],
  }, null, 2) + "\n");

  fs.writeFileSync(path.join(root, ".gitignore"), `node_modules/
.DS_Store
.playwright-mcp/
`);

  ensureDir("dataset-card");
  fs.writeFileSync(path.join(root, "dataset-card/README.md"), `---
license: cc-by-4.0
task_categories:
  - text-to-image
  - image-to-image
language:
  - en
pretty_name: AI Image Prompt Atlas
size_categories:
  - n<1K
---

# AI Image Prompt Atlas

AI Image Prompt Atlas is a structured collection of AI image prompt recipes for GPT Image 2 style workflows, product photography, readable text posters, UI mockups, reference image editing, ecommerce mockups, brand visuals, infographics, character design, and style transfer.

## Files

- \`data/prompts.json\`
- \`data/prompts.csv\`
- \`data/prompts.ndjson\`
- \`data/categories.json\`
- \`data/benchmarks.json\`

## Intended Use

This dataset is intended for prompt education, search, retrieval, prompt library tooling, and creative workflow examples.

## Source

Project homepage: ${siteUrl}

Tool entry point: https://gptimg2.art/
`);

  ensureDir("launch");
  fs.writeFileSync(path.join(root, "launch/LAUNCH_PLAN.md"), `# Launch Plan

## Positioning

AI Image Prompt Atlas is a prompt operating system for AI image generation, not another random prompt list.

## Channels

- GitHub release
- Substack article
- note article
- Hatena blog
- GPTImg2 blog
- Reddit communities where self-promotion is allowed
- X / LinkedIn visual thread

## Launch Hooks

- 80 structured prompt recipes
- Searchable gallery
- JSON, CSV, and NDJSON dataset
- Per-recipe pages with JSON-LD
- llms.txt for AI retrieval
- Open contribution system

## Backlink Strategy

Use one natural GPTImg2 link in the intro and one in each recipe page call-to-action. Avoid link stuffing.
`);

  fs.writeFileSync(path.join(root, "launch/SUBSTACK_DRAFT.md"), `# We Built an Open AI Image Prompt Atlas

Most AI image prompt lists are hard to reuse. They show outputs, but they do not explain why a prompt works, what can fail, or how to adapt it.

AI Image Prompt Atlas is a structured prompt recipe library with 80 examples across product photography, readable text posters, UI mockups, reference image editing, ecommerce mockups, brand visuals, infographics, character design, and style transfer.

Each recipe includes:

- Prompt
- Negative instructions
- Why it works
- Variations
- Editorial quality scores
- Structured JSON data

You can try the workflows with GPTImg2: https://gptimg2.art/
`);
}

writeJson();
writeImages();
writeReadme();
writeCategoryPages();
writeGuides();
writeSite();
writeMeta();

console.log(`Built AI Image Prompt Atlas with ${examples.length} examples.`);
