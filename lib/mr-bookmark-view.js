'use babel';

export default class MrBookmarkView {

  constructor(serializedState) {

    this.element = document.createElement('div');
    this.element.classList.add('mr-bookmark-panel');

    this.link = document.createElement('a');
    this.link.classList.add('icon', 'icon-heart');
    this.element.appendChild(this.link);

    this.fileContainer = document.createElement('div');
    this.element.appendChild(this.fileContainer);

    // if(serializedState)
      // this.fileList.insertHtml(serializedState);
  }

  getFileContainer() {
    return this.fileContainer;
  }

  serialize() {
    // return this.fileList.getHTML();
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
