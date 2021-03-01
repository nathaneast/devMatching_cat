// import { createWrapper } from '../util/wrapper.js';
import Term from './Term.js';

export default class BannerSection {
  constructor({ $target, getRandomCats }) {
    this.isVisible = false;
    this.section = document.createElement('section');
    this.section.className = 'banner-section';
    this.section.classList.add('hidden');
    this.bannerList = document.createElement('article');
    this.bannerList.className = 'banner-list';
    this.randomCats;

    $target.appendChild(this.section);

    getRandomCats().then(data => {
      this.randomCats = data;
      this.render();
    });
    
  }

  // renderSearchTerm() {
  //   this.termWrapper.innerHTML = '';
  //   this.searchTerm.map((term) => {
  //     new Term({
  //       $target: this.termWrapper,
  //       data: term,
  //       onClick: this.onSearch,
  //     });
  //   });
  // }

  toggleBanner(isOn) {
    if (isOn) {
      this.section.classList.remove('hidden');
    } else {
      this.section.classList.add('hidden');
    }
    this.isVisible = isOn;
  }
  
  setState(isOn) {
    this.toggleBanner(isOn);
    this.render();
  }

  render() {
    if (!this.isVisible) return;
    this.section.innerHTML = `
      <div>배너!</div>
    `;

    // const randomBtn = document.createElement('span');
    // randomBtn.className = 'random-btn';
    // randomBtn.innerText = '🐱';

    // const searchBox = document.createElement('input');
    // searchBox.className = 'search-box';
    // searchBox.placeholder = '고양이를 검색하세요.';

    // const checkBoxWrapper = document.createElement('div');
    // const checkBoxLabel = document.createElement('label');
    // const checkBox = document.createElement('input');
    // checkBoxWrapper.className = 'checkbox-wrapper';
    // checkBox.className = 'check-box';
    // checkBoxLabel.innerText = 'Dark mode On';
    // checkBox.type = 'checkbox';
    // checkBoxWrapper.appendChild(checkBox);
    // checkBoxWrapper.appendChild(checkBoxLabel);

    // randomBtn.addEventListener('click', this.onRandom);
    // searchBox.addEventListener('focus', this.deleteKeyword);
    // searchBox.addEventListener('keyup', (event) => {
    //   this.searchByKeyword(event);
    // });
    // checkBox.addEventListener('click', (event) => {
    //   document.querySelector('body').classList.toggle('dark-mode');
    // });

    // const searchRow = document.createElement('div');
    // searchRow.appendChild(randomBtn);
    // searchRow.appendChild(searchBox);
    // searchRow.appendChild(checkBoxWrapper);
    // this.section.appendChild(searchRow);
    // this.section.appendChild(this.termWrapper);

    // this.renderSearchTerm();
  }
}
