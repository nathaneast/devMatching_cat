export default class Card {
  constructor({ $target, data, cardIndex }) {
    this.data = data;
    this.card = document.createElement('article');
    this.card.className = 'cat-card';
    this.cardIndex = cardIndex;

    this.card.dataset.index = `${this.cardIndex}`;
    $target.appendChild(this.card);

    this.render();
  }

  io(cardImage, url) {
    const option =  {
        rootMargin: '10px',
    }

    return new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 && !cardImage.src) {
            cardImage.src = url;
          }
        });
      }, option);
  }

  render() {
    const url = this.data.url;
    const { name, origin } =
      this.data.breeds.length > 0
        ? this.data.breeds[0]
        : { name: '정보없음', origin: '정보없음' };

    const cardImage = document.createElement('img');
    cardImage.className = 'card-image';
    const cardInfo = document.createElement('article');
    cardInfo.className = 'card-info';

    if (this.cardIndex > 11) {
        this.io(cardImage, url).observe(cardInfo);
    } else {
        cardImage.src = url;
    }

    const catName = document.createElement('p');
    catName.className = 'cat-name';
    catName.innerText = name;

    const catOrigin = document.createElement('p');
    catOrigin.className = 'cat-origin';
    catOrigin.innerText = origin;

    cardInfo.appendChild(catName);
    cardInfo.appendChild(catOrigin);
    this.card.appendChild(cardImage);
    this.card.appendChild(cardInfo);
  }
}
