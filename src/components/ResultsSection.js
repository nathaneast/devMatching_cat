import Card from './Card.js';

export default class ResultsSection {
  constructor({ $target, onClick, onInfinityScroll }) {
    this.onClick = onClick;
    this.onInfinityScroll = onInfinityScroll;
    this.data = localStorage.getItem('catData')
      ? JSON.parse(localStorage.getItem('catData'))
      : [];
    this.section = document.createElement('section');
    this.section.className = 'results-section';

    $target.appendChild(this.section);

    this.render();
  }

  onScroll(event) {
    console.log(
      window.pageYOffset + document.documentElement.clientHeight,
      'window.pageYOffset + document.documentElement.clientHeight'
    );
    console.log(
      document.documentElement.scrollHeight - 500,
      'document.documentElement.scrollHeight - 500'
    );
    if (
      window.pageYOffset + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 500
    ) {
      this.onInfinityScroll();
    }
  }

  setState(data) {
    this.data = [...this.data, data];
    localStorage.setItem('catData', JSON.stringify(this.data)); //추가
    this.render();
  }

  render() {
    this.section.innerHTML = '';
    if (this.data.length > 0) {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'card-container';

      this.data.map((cat) => {
        new Card({
          $target: cardContainer,
          data: cat,
          onClick: this.onClick,
        });
      });

      this.section.appendChild(cardContainer);
      //   window.addEventListener('scroll', this.onScroll);
      window.addEventListener('scroll', (event) => {
        console.log(
          window.pageYOffset + document.documentElement.clientHeight,
          'window.pageYOffset + document.documentElement.clientHeight'
        );
        console.log(
          document.documentElement.scrollHeight - 500,
          'document.documentElement.scrollHeight - 500'
        );
        if (
          window.pageYOffset + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 500
        ) {
          this.onInfinityScroll();
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
