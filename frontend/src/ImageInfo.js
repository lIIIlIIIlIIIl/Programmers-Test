class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  getCateDeatil(catData) {
    api.fetchCatDtail(catData.cat.id).then(({ data }) => {
      this.setState({
        visible: true,
        cat: data,
      });
    });
  }

  closeModal() {
    this.setState({
      visible: false,
      cat: null,
    });
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.cat;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";

      document.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape") this.closeModal();
      });

      this.$imageInfo.addEventListener("click", (ev) => {
        if (
          ev.target.className === "ImageInfo" ||
          ev.target.className === "close"
        ) {
          this.closeModal();
        }
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
