import Card from './Card.js';

export default class ResultsSection {
  constructor({ $target, onClick, onRandom }) {
    this.onClick = onClick;
    this.onRandom = onRandom;
    this.data = localStorage.getItem('catData')
      ? JSON.parse(localStorage.getItem('catData'))
      : [];
    this.section = document.createElement('section');
    this.section.className = 'results-section';

    $target.appendChild(this.section);

    this.render();
  }

  fetchData() {
    this.scrollLoading = true;
    this.onRandom();
  }

  setState(data, scrolling) {
    if (scrolling) {
      if (!data.length) return;
      this.data = [...this.data, ...data];
    } else {
      this.data = data; 
    }
    
    localStorage.setItem('catData', JSON.stringify(this.data)); //추가
    this.render();
  }

  render() {
    this.section.innerHTML = '';
    this.scrollLoading = false;

    if (this.data.length > 0) {
      const cardContainer = document.createElement('div');
      let target;
      cardContainer.className = 'card-container';

      cardContainer.addEventListener('click', (event) => {
        const checkingTopNode = (className) => (
          event.target.classList.contains(className));

        if (event.target === event.currentTarget) return;

        if (checkingTopNode('cat-card')) {
          target = event.target;
        } else if (
          checkingTopNode('card-image') ||
          checkingTopNode('card-info')
        ) {
          target = event.target.parentNode;
        } else if (
          checkingTopNode('cat-name') ||
          checkingTopNode('cat-origin')
        ) {
          target = event.target.parentNode.parentNode;
        }
            
        this.onClick(this.data[Number(target.dataset.index)]);
      });


      this.data.map((cat, index) => {
        return new Card({
          $target: cardContainer,
          data: cat,
          cardIndex: index
        });
      });

      this.section.appendChild(cardContainer);

      window.addEventListener('scroll', (event) => {
        if (
          window.pageYOffset + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 500 && !this.scrollLoading
          ) {
          this.fetchData();
         }
      });

    } else {
      const noticeSection = document.createElement('section');
      noticeSection.className = 'noticeSection';

      const notice = document.createElement('h2');
      notice.className = 'notice';
      notice.innerText = '검색 결과가 없습니다.';

      const noticeImage = document.createElement('img');
      noticeImage.className = 'notice-image';
      noticeImage.src = 'src/img/emptybox.png';

      noticeSection.appendChild(notice);
      noticeSection.appendChild(noticeImage);
      this.section.appendChild(noticeSection);
    }
  }
}
