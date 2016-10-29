'use babel';

export default class FileList {

  constructor(container, state) {
    console.log("FileList");
    if(!container)
      throw Error("No file container");

     this.container = container;

    this.list = document.createElement("ul");
    this.list.classList.add("list");
    container.appendChild(this.list);

    console.log("state", state);
    if (state)
      this.insertHtml(state);
  }

  insertHtml(html) {
    //#TODO Ändra till HTMLaj...
    this.list.innerHTML = html;
  }

  serialize() {
    return this.list.innerHTML;
  }

  addItem(filePath, filename) {

    var listEl = document.createElement('li');
    listEl.classList.add("list-item", "active", "file-hidden");
    listEl.dataset.filePath = filePath;

    var filenameEl = document.createElement('p');
    filenameEl.classList.add("file-name");
    var filenameTextEl = document.createTextNode(filename);

    var removeButtonEl = document.createElement('a');
    removeButtonEl.classList.add('list-item-remove-button', 'icon', 'icon-x')

    filenameEl.appendChild(filenameTextEl);
    listEl.appendChild(filenameEl);
    listEl.appendChild(removeButtonEl);

    var firstItem = this.list.getElementsByClassName("list-item")[0];
    this.list.insertBefore(listEl, firstItem);
    console.log("listEl", this.container);

     setTimeout(function(listEl){listEl.classList.remove("file-hidden");}, 100, listEl);

     return {listEl: listEl, removeButtonEl: removeButtonEl};
  }

  removeItem(item) {
    try {
      if (!item) throw new Error('Fixa dubbelradering..');

      this.list.removeChild(item);
    } catch(e) {
      console.error(e);
    }
  }

  removeAllItems() {
    while(this.list.firstChild) {
      this.list.removeChild(this.list.firstChild)
    }
  }

  selectActiveFile(fileName) {
    var items = document.getElementsByClassName("list-item");

    for(var i = 0; i < items.length; i++) {
      // var link = items[i].firstChild;
      // console.log(link.getAttribute("href"));

      if(items[i].dataset.filePath === fileName) {
        items[i].classList.add("active");
      } else {
        items[i].classList.remove("active");
      }
    }
  }

  getItems() {
    return document.getElementsByClassName('list-item');
  }

  getRemoveButtons() {
    return document.getElementsByClassName('list-item-remove-button');
  }

}
