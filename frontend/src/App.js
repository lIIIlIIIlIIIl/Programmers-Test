console.log("app is running!");

class App {
  $target = null;
  data = [];

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
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
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
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
