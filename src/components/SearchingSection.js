// import { createWrapper } from '../util/wrapper.js';
import Term from './Term.js';

export default class SearchBar {
  searchTerm = [];

  constructor({ $target, onSearch, onRandom }) {
    this.onSearch = onSearch;
    this.onRandom = onRandom;
    this.section = document.createElement('section');
    this.section.className = 'searching-section';
    this.termWrapper = document.createElement('div');
    this.termWrapper.className = 'term-wrapper';

    $target.appendChild(this.section);

    this.render();
  }

  addSearchTerm(term) {
    this.searchTerm.push(term);
    if (this.searchTerm.length > 5) {
      this.searchTerm.shift();
    }

    this.renderSearchTerm();
  }

  searchByKeyword(event) {
    if (event.keyCode == 13) {
      const keyword = document.querySelector('.search-box').value;
      this.onSearch(keyword);
      this.addSearchTerm(keyword);
    }
  }

  deleteKeyword() {
    const searchBox = document.querySelector('.search-box');
    searchBox.value = '';
  }

  renderSearchTerm() {
    this.termWrapper.innerHTML = '';
    this.searchTerm.map((term) => {
      new Term({
        $target: this.termWrapper,
        data: term,
        onClick: this.onSearch,
      });
    });
  }

  render() {
    const randomBtn = document.createElement('span');
    randomBtn.className = 'random-btn';
    randomBtn.innerText = '🐱';

    const searchBox = document.createElement('input');
    searchBox.className = 'search-box';
    searchBox.placeholder = '고양이를 검색하세요.';

    const checkBoxWrapper = document.createElement('div');
    const checkBoxLabel = document.createElement('label');
    const checkBox = document.createElement('input');
    checkBoxWrapper.className = 'checkbox-wrapper';
    checkBox.className = 'check-box';
    checkBoxLabel.innerText = 'Dark mode On';
    checkBox.type = 'checkbox';
    checkBoxWrapper.appendChild(checkBox);
    checkBoxWrapper.appendChild(checkBoxLabel);

    randomBtn.addEventListener('click', this.onRandom);
    searchBox.addEventListener('focus', this.deleteKeyword);
    searchBox.addEventListener('keyup', (event) => {
      this.searchByKeyword(event);
    });
    checkBox.addEventListener('click', (event) => {
      document.querySelector('body').classList.toggle('dark-mode');
    });

    const searchRow = document.createElement('div');
    searchRow.appendChild(randomBtn);
    searchRow.appendChild(searchBox);
    searchRow.appendChild(checkBoxWrapper);
    this.section.appendChild(searchRow);
    this.section.appendChild(this.termWrapper);

    this.renderSearchTerm();
  }
}
