"use babel";

class FileListView {

  constructor(container, state) {
    if(!container)
      throw Error("No file container");

    this.container = container;

    this.list = document.createElement("ul");
    this.list.classList.add("list");
    container.appendChild(this.list);

    if (state)
      this.insertHtml(state);
  }

  addChangedGitColor(evt) {
    console.log("Hello from git");
    console.log("evt", evt);

    console.log(`[data-file-path="${evt.path}"]`);
    var item = this.list.querySelector(`[data-file-path="${evt.path}"]`);
    item.style.color = "orange";
  }

  insertHtml(html) {
    this.list.innerHTML = html;
  }

  serialize() {
    return this.list.innerHTML;
  }

  fileDoesExist(file) {
    var item = this.list.querySelector(`[data-file-path="${file}"]`);

    if(item)
      return true;

    return false;
  }

  addItem(filePath, filename) {
    var listEl = document.createElement("li");
    listEl.classList.add("list-item", "active", "file-hidden");
    listEl.dataset.filePath = filePath;

    var filenameEl = document.createElement("p");
    filenameEl.classList.add("file-name");
    var filenameTextEl = document.createTextNode(filename);

    var removeButtonEl = document.createElement("a");
    removeButtonEl.classList.add("list-item-remove-button", "icon", "icon-x")

    filenameEl.appendChild(filenameTextEl);
    listEl.appendChild(filenameEl);
    listEl.appendChild(removeButtonEl);

    this.list.appendChild(listEl);
    this.list = this.sortList(this.list);
    this.setFolderMargins(this.list);

     setTimeout(function(listEl){listEl.classList.remove("file-hidden");}, 100, listEl);

     return {listEl: listEl, removeButtonEl: removeButtonEl};
  }

  setFolderMargins(list) {
    for (var i = 0 ; i < list.childNodes.length - 1; i++) {

      var a = list.childNodes[i].dataset.filePath.lastIndexOf("/");
      var b = list.childNodes[i+1].dataset.filePath.lastIndexOf("/");

      list.childNodes[i].classList.remove("extra-margin");

      if(a !== b) {
        list.childNodes[i].classList.add("extra-margin");
      }
    }
  }

   sortList(oldList){
    var newList = oldList.cloneNode(false);
    var sortArr = [];

    for(var i = 0; i < oldList.childNodes.length ; i++)
      sortArr.push(oldList.childNodes[i]);

    sortArr.sort(function(a, b){
       return a.dataset.filePath.localeCompare(b.dataset.filePath);
    });

    for(var i = 0; i < sortArr.length; i++)
      newList.appendChild(sortArr[i]);

    oldList.parentNode.replaceChild(newList, oldList);

    return newList;
  }

  removeItem(item) {
    try {
      if (!item) throw new Error("Fixa dubbelradering..");

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
      if(items[i].dataset.filePath === fileName) {
        items[i].classList.add("active");
      } else {
        items[i].classList.remove("active");
      }
    }
  }

  getItems() {
    return document.getElementsByClassName("list-item");
  }

  getRemoveButtons() {
    return document.getElementsByClassName("list-item-remove-button");
  }
}

export default FileListView;
