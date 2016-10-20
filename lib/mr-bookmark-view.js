'use babel';

export default class MrBookmarkView {

  constructor(serializedState) {

    console.log("serializedState: " + serializedState);
    this.element = document.createElement('div');
    this.element.classList.add('my-right-panel');

    this.link = document.createElement('a');
    this.link.classList.add('icon', 'icon-heart');
    // this.link.setAttribute("href", "#");
    this.element.appendChild(this.link);
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  addItem(filename) {
    var fileId = "file_" + (this.element.getElementsByClassName("item").length + 1);

    var item = document.createElement('div');
    item.className = "item " + fileId;


    var fileButton = document.createElement('a');
    fileButton.className = "file-button"
    fileButton.setAttribute("href", filename);
    var fileButtonText = document.createTextNode(filename);

    var removeButton = document.createElement('a');
    removeButton.dataset.fileID = fileId;
    removeButton.classList.add('remove-button', 'icon', 'icon-x')

    fileButton.appendChild(fileButtonText);
    item.appendChild(fileButton);
    item.appendChild(removeButton);

    this.element.appendChild(item);
  }

  removeItem(fileId) {
    //TODO Sluta fånga och gör något bättre
    try {
      var item = document.getElementsByClassName(fileId)[0];
      if (!item) throw new Error('Fixa dubbelradering..');

      item.parentNode.removeChild(item);
    } catch(e) {
      console.error(e);
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


// atom.deserializers.add(this);
// // Returns an object that can be retrieved when package is activated
// serialize() {
//   deserializer: 'MrBookmarkView', data: this.seriData
//   // console.log("Serializing:");
// }
//
// deserialize(data) {
//      new MrBookmarkView(data);
// }
