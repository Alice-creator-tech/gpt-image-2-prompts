import fs from "node:fs";

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
