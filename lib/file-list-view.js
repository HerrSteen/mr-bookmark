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

    this.list.appendChild(listEl);

    //Bryt ut
    for (var i = 0 ; i < this.list.childNodes.length - 1 ; i++) {
      for (var j = i +1 ; j < this.list.childNodes.length ; j++)
      {
        var x = this.list.childNodes[i];
        var y = this.list.childNodes[j];

        if( (x.dataset.filePath != 'undefined') && (y.dataset.filePath != 'undefined')  && (x.dataset.filePath > y.dataset.filePath))
          this.swapNode(this.list.childNodes[j], this.list.childNodes[i]);
      }
    }

    //Bryt ut
    for (var i = 0 ; i < this.list.childNodes.length - 1; i++) {

      var a = this.list.childNodes[i].dataset.filePath.lastIndexOf("/");
      var b = this.list.childNodes[i+1].dataset.filePath.lastIndexOf("/");

      this.list.childNodes[i].classList.remove("extra-margin");

      if(a !== b) {
        this.list.childNodes[i].classList.add("extra-margin");
      }
    }

     setTimeout(function(listEl){listEl.classList.remove("file-hidden");}, 100, listEl);

     return {listEl: listEl, removeButtonEl: removeButtonEl};
  }

  swapNode(a, b) {
    var pa1 = a.parentNode, pa2 = b.parentNode, sib = b.nextSibling;
    if (sib === a) sib = sib.nextSibling;

    pa1.replaceChild(b, a);
    if(sib) pa2.insertBefore(a, sib);

    else pa2.appendChild(a);
    return true;
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
