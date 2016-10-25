'use babel';

export default class MrBookmarkView {

  constructor(serializedState) {
    this.element = document.createElement('div');
    this.element.classList.add('my-right-panel');

    this.link = document.createElement('a');
    this.link.classList.add('icon', 'icon-heart');
    this.element.appendChild(this.link);

    this.fileList = document.createElement('div');

    if(serializedState)
    this.fileList.innerHTML = serializedState; //#TODO Ändra till HTML

    this.element.appendChild(this.fileList);
  }

  serialize() {
    return this.fileList.innerHTML;
  }

  destroy() {
    this.element.remove();
  }

  addItem(filePath, filename) {
    var fileId = "file_" + (this.element.getElementsByClassName("item").length + 1);

    var item = document.createElement('div');
    item.classList.add("item", fileId);

    var fileButton = document.createElement('a');
    fileButton.classList.add("file-button");
    fileButton.setAttribute("href", filePath);
    var fileButtonText = document.createTextNode(filename);

    var removeButton = document.createElement('a');
    removeButton.dataset.fileID = fileId;
    removeButton.classList.add('remove-button', 'icon', 'icon-x')

    fileButton.appendChild(fileButtonText);
    item.appendChild(fileButton);
    item.appendChild(removeButton);

    var firstItem = this.fileList.getElementsByClassName("item")[0];
    this.fileList.insertBefore(item, firstItem);
  }

  removeItem(fileId) {
    try {
      var item = document.getElementsByClassName(fileId)[0];
      if (!item) throw new Error('Fixa dubbelradering..');

      item.parentNode.removeChild(item);
    } catch(e) {
      console.error(e);
    }
  }

  removeAllItems() {
    while(this.fileList.firstChild) {
      this.fileList.removeChild(this.fileList.firstChild)
    }
  }

  getFileButtons() {
    return document.getElementsByClassName('file-button');
  }

  getRemoveButtons() {
    return document.getElementsByClassName('remove-button');
  }

  getAddButton() {
    return this.link;
  }

  getElement() {
    return this.element;
  }
}
