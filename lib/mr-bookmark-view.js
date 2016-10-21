'use babel';

export default class MrBookmarkView {

  constructor(serializedState) {

    console.log("serializedState: " + serializedState);
    this.element = document.createElement('div');
    this.element.classList.add('my-right-panel');

    this.link = document.createElement('a');
    this.link.classList.add('icon', 'icon-heart');
    this.element.appendChild(this.link);

    this.fileList = document.createElement('div');
    if(serializedState)
    this.fileList.innerHTML = serializedState;
    this.element.appendChild(this.fileList);
  }

  serialize() {
    return this.fileList.innerHTML;
    // return "hello dude";
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  toggle() {
    console.log(this.element.style.visible);
  }

  addItem(filePath, filename) {
    var fileId = "file_" + (this.element.getElementsByClassName("item").length + 1);

    var item = document.createElement('div');
    item.className = "item " + fileId;

    var fileButton = document.createElement('a');
    fileButton.className = "file-button"
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
    //TODO Sluta fånga och gör något bättre
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

    // var myNode = document.getElementById("foo");
    // var length = .getElementsByTagName('*').length;
    //
    // while (this.element.firstChild) {
    //   var classNames = this.element.firstChild.className;
    //   console.log(classNames);
    //   console.log(classNames.indexOf("item"));
    //
    //   if(classNames.indexOf("item") === -1) continue;
    //     this.element.removeChild(this.element.firstChild);
    // }
    // var items = document.getElementsByClassName("item");
    //
    // for(var i = 0; i < items.length; i++) {
    //   console.log(i, items.length);
    //   try {
    //      this.element.removeChild(items[i]);
    //   } catch(e) {
    //     console.log(e);
    //   }
    // }
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
