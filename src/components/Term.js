export default class Term {
  constructor({$target, data, onClick, onBanner}) {
      this.onClick = onClick;
      this.onBanner = onBanner;
      this.data = data;
      this.term = document.createElement('div');
      this.term.className = 'term-item';

      $target.appendChild(this.term);
      this.render();
  }

  render() {
      const termContents = document.createElement('span');
      termContents.innerText = this.data;
      this.term.addEventListener('click', () => {
        this.onClick(this.data)
        this.onBanner();
      });
      this.term.appendChild(termContents);
  }
}
