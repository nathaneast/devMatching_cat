export default class Term {
  constructor({$target, data, onClick}) {
      this.onClick = onClick;
      this.data = data;
      this.term = document.createElement('div');
      this.term.className = 'term-item';

      $target.appendChild(this.term);

      this.render();
  }

  render() {
      const termContents = document.createElement('span');
      termContents.innerText = this.data;

      this.term.addEventListener('click', () => this.onClick(this.data));
      this.term.appendChild(termContents);
  }
}
