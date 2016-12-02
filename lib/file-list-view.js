"use babel";

class FileListView {

  constructor(container, state) {
    if (!container) throw Error("No file container");
    this.container = container;

    this.list = document.createElement("ul");
    this.list.classList.add("list");
    container.appendChild(this.list);

    if (state) this.insertHtml(state);
  }

  getFileList() {
    return this.list;
  }

  insertHtml(html) {
    this.list.innerHTML = html;
  }

  serialize() {
    let sHTML = this.list.innerHTML;
    sHTML = sHTML.replace("git-modified", "");
    sHTML = sHTML.replace("git-added", "");
    return sHTML;
  }

  fileDoesExist(file) {
    const item = this.list.querySelector(`[data-file-path="${file}"]`);

    if (item) return true;

    return false;
  }

  addItem(filePath, filename) {
    const listEl = document.createElement("li");

    listEl.classList.add("list-item", "active", "file-hidden");
    listEl.dataset.filePath = filePath;

    const filenameEl = document.createElement("p");
    filenameEl.classList.add("file-name");
    const filenameTextEl = document.createTextNode(filename);

    const removeButtonEl = document.createElement("a");
    removeButtonEl.classList.add("list-item-remove-button", "icon", "icon-x");

    filenameEl.appendChild(filenameTextEl);
    listEl.appendChild(filenameEl);
    listEl.appendChild(removeButtonEl);

    this.list.appendChild(listEl);
    this.list = this.sortList(this.list);
    this.setFolderMargins(this.list);

    setTimeout(() => {
      listEl.classList.remove("file-hidden");
    }, 100, listEl);

    return {listEl: listEl, removeButtonEl: removeButtonEl};
  }

  setFolderMargins(list) {
    for (let i = 0; i < list.childNodes.length - 1; i++) {

      const a = list.childNodes[i].dataset.filePath.lastIndexOf("/");
      const b = list.childNodes[i + 1].dataset.filePath.lastIndexOf("/");

      list.childNodes[i].classList.remove("extra-margin");

      if (a !== b) {
        list.childNodes[i].classList.add("extra-margin");
      }
    }
  }

  sortList(oldList) {
    const newList = oldList.cloneNode(false);
    const sortArr = [];

    for (let i = 0; i < oldList.childNodes.length; i++) {
      sortArr.push(oldList.childNodes[i]);
    }
    sortArr.sort((a, b) => {
      return a.dataset.filePath.localeCompare(b.dataset.filePath);
    });

    for (let i = 0; i < sortArr.length; i++) {
      newList.appendChild(sortArr[i]);
    }

    oldList.parentNode.replaceChild(newList, oldList);

    return newList;
  }

  removeItem(path) {
    const item = this.list.querySelector(`[data-file-path="${path}"]`);
    if (!item) return;

    this.list.removeChild(item);
  }

  removeAllItems() {
    while (this.list.firstChild) {
      this.list.removeChild(this.list.firstChild);
    }
  }

  selectActiveFile(fileName) {
    const items = document.getElementsByClassName("list-item");

    for (let i = 0; i < items.length; i++) {
      if (items[i].dataset.filePath === fileName) {
        items[i].classList.add("active");
      } else {
        items[i].classList.remove("active");
      }
    }
  }

  getItemOnCurrentStep() {
    return this.list.getElementsByClassName("current-step");
  }

  getItems() {
    return document.getElementsByClassName("list-item");
  }

  getRemoveButtons() {
    return document.getElementsByClassName("list-item-remove-button");
  }
}

export default FileListView;
