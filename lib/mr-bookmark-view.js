'use babel';

export default class MrBookmarkView {

  constructor(serializedState) {

    this.element = document.createElement('div');
    this.element.classList.add('mr-bookmark-panel');

    this.link = document.createElement('a');
    this.link.classList.add('add-button');

    var lineH = document.createElement('span');
    var lineV = document.createElement('span');
    lineH.classList.add('line-hor');
    lineV.classList.add('line-ver');
 

    this.link.appendChild(lineH);
    this.link.appendChild(lineV);
    this.element.appendChild(this.link);

    this.fileContainer = document.createElement('div');
    this.element.appendChild(this.fileContainer);
  }

  getFileContainer() {
    return this.fileContainer;
  }

  destroy() {
    this.element.remove();
  }

  getAddButton() {
    return this.link;
  }

  getElement() {
    return this.element;
  }
}
