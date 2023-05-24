const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onClickRnadomButton }) {
    const $wrapper = document.createElement("section");
    $wrapper.className = "SearchWrapper";
    $target.appendChild($wrapper);

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.🐱";
    $searchInput.className = "SearchInput";
    $wrapper.appendChild($searchInput);

    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    $randomButton.className = "RandomButton";
    $randomButton.textContent = "랜덤고양이";
    $wrapper.appendChild($randomButton);

    $randomButton.addEventListener("click", () => {
      onClickRnadomButton();
    });
  }
  render() {}
}
