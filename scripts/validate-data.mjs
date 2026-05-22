import fs from "node:fs";

const data = JSON.parse(fs.readFileSync(new URL("../data/prompts.json", import.meta.url), "utf8"));
if (!Array.isArray(data.examples) || data.examples.length < 800) {
  throw new Error("Expected at least 800 verified examples.");
}
const ids = new Set();
for (const item of data.examples) {
  for (const key of ["id", "title", "category", "prompt", "image", "source_page", "score"]) {
    if (!item[key]) throw new Error("Missing " + key + " in " + item.id);
  }
  if (ids.has(item.id)) throw new Error("Duplicate id: " + item.id);
  ids.add(item.id);
  if (!/^https?:\/\//.test(item.image) && !fs.existsSync(new URL("../" + item.image, import.meta.url))) {
    throw new Error("Missing image: " + item.image);
  }
  if (!/^https:\/\/gptimg2\.art\/zh\/prompts\/gpt-image-2\//.test(item.source_page)) {
    throw new Error("Unexpected source page: " + item.source_page);
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
