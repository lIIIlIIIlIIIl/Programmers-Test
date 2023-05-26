class KeywordHistroy {
  $keywordHistroy = null;
  data = null;

  constructor({ $target, onSearch }) {
    const $keywordHistroy = document.createElement("ul");
    this.$keywordHistroy = $keywordHistroy;
    $keywordHistroy.className = "keywordHistroy";
    $target.appendChild($keywordHistroy);

    this.onSearch = onSearch;
    this.init();
    this.rendor();
  }

  init() {
    const data = this.getHistory();
    this.setState(data);
  }

  addKeyword(keyword) {
    let keywordHistroy = this.getHistory();
    keywordHistroy.unshift(keyword);
    keywordHistroy = keywordHistroy.slice(0, 5);
    localStorage.setItem("keywordHistroy", keywordHistroy.join(","));
    this.init();
  }

  getHistory() {
    return localStorage.getItem("keywordHistroy") === null
      ? []
      : localStorage.getItem("keywordHistroy").split(",");
  }

  setState(nextData) {
    this.data = nextData;
    this.rendor();
  }

  rendor() {
    if (this.data) {
      this.$keywordHistroy.innerHTML = this.data
        .map(
          (keyword, idx) => `
                <li key=${idx}><button>${keyword}</button></li>
            `
        )
        .join("");
    } else {
    }

    this.$keywordHistroy.querySelectorAll("li button").forEach(($item, idx) => {
      $item.addEventListener("click", () => {
        this.onSearch(this.data[idx]);
      });
    });
  }
}
