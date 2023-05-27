console.log("app is running!");

class App {
  $target = null;
  data = [];
  page = 1;

  constructor($target) {
    this.$target = $target;

    this.loading = new Loading({ $target });

    this.darkModeCheckBox = new DarkModeCheckBox({ $target });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
          this.loading.hide();

          // 검색결과를 로컬스토리지에 저장
          this.saveResult(data);
        });
      },
      onClickRnadomButton: () => {
        this.loading.show();
        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          this.loading.hide();
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (catData) => {
        this.imageInfo.getCateDeatil({
          cat: catData,
        });
      },
      onNextPage: () => {
        this.loading.show();

        const keywordHistroy =
          localStorage.getItem("keywordHistroy") === null
            ? []
            : localStorage.getItem("keywordHistroy").split(",");
        const lastKeyword = keywordHistroy[0];
        const page = this.page + 1;

        api.fetchCatsPage(lastKeyword, page).then(({ data }) => {
          let newData = this.data.concat(data);
          this.setState(newData);
          this.page = page;

          this.loading.hide();
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });

    this.init();
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  saveResult(result) {
    localStorage.setItem("lastResult", JSON.stringify(result));
  }

  init() {
    const lastResult =
      localStorage.getItem("lastResult") === null
        ? []
        : JSON.parse(localStorage.getItem("lastResult"));
    this.setState(lastResult);
  }
}
