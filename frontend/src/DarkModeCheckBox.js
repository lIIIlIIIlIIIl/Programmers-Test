class DarkModeCheckBox {
  isDarckMode = null;

  constructor({ $target }) {
    const $DarkModeCheckBox = document.createElement("input");
    this.$DarkModeCheckBox = $DarkModeCheckBox;
    this.$DarkModeCheckBox.type = "checkbox";

    $DarkModeCheckBox.className = "DarkModeCheckBox";
    $target.appendChild($DarkModeCheckBox);

    $DarkModeCheckBox.addEventListener("change", (e) => {
      this.setColorMode(e.target.checked);
    });

    this.initColorMode();
  }

  initColorMode() {
    // 초기화 - isDarkMode state, checkbox state
    this.setState(window.matchMedia("(prefers-color-scheme: dark)").matches);
    this.$DarkModeCheckBox.checked = this.isDarckMode;
    this.setColorMode(this.isDarckMode);
  }

  setColorMode(isDarkMode) {
    document.documentElement.setAttribute(
      "color-mode",
      isDarkMode ? "dark" : "light"
    );
  }

  setState(isDarkMode) {
    this.isDarckMode = isDarkMode;
  }
}
