import SearchingSection from './components/SearchingSection.js';
import ResultsSection from './components/ResultsSection.js';
import BannerSection from './components/BannerSection.js';
import DetailModal from './components/DetailModal.js';
import Loading from './components/Loading.js';
import { api } from './api/theCatAPI.js';

export default class App {
  constructor($target) {
    // 최상위 div
    const onRandom = () => {
      loading.toggleSpinner();
      api.fetchRandomCats().then((data) => {
        loading.toggleSpinner();
        resultsSection.setState(data, true);
      });
    };

    const searchingSection = new SearchingSection({
      $target,
      onSearch: (keyword) => {
        loading.toggleSpinner();
        api.fetchCats(keyword).then((data) => {
          loading.toggleSpinner();
          resultsSection.setState(data, false);
        });
      },
      onRandom,
      onBanner: (isOn) => bannerSection.setState(isOn),
    });

    const bannerSection = new BannerSection({
      $target,
      getRandomCats: api.fetchRandomCats,
    });

    const resultsSection = new ResultsSection({
      $target,
      onClick: (data) => {
        detailModal.setState(data);
      },
      onRandom,
    });

    const detailModal = new DetailModal({
      $target,
    });

    const loading = new Loading({
      $target,
    });

    this.focusOnSearchBox();
  }

  focusOnSearchBox() {
    const searchBox = document.querySelector('.search-box');
    searchBox.focus();
  }
}
