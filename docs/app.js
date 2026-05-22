const grid = document.querySelector("#grid");
const search = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const difficultySelect = document.querySelector("#difficulty");
const stats = document.querySelector("#stats");
const template = document.querySelector("#card-template");
let examples = [];
let categories = [];
function label(value) {
  return String(value || "").replaceAll("-", " ").replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
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
