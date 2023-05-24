class Loading {
  $loading = null;
  data = null;

  constructor({ $target }) {
    const $loading = document.createElement("div");
    this.$loading = $loading;
    $target.appendChild(this.$loading);

    this.data = {
      show: false,
    };

    this.render();
  }

  show() {
    this.setState(true);
    this.render();
  }
  hide() {
    this.setState(false);
    this.render();
  }

  setState(nextData) {
    this.data.show = nextData;
  }

  render() {
    if (this.data.show) {
      this.$loading.innerHTML = `
        <div class='Loading'>
            <P>
                로딩중....🔥
            </P>
        </div>
    `;
    } else {
      this.$loading.innerHTML = ``;
    }
  }
}
