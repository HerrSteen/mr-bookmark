"use babel";

import MrBookmarkView from "./mr-bookmark-view";
import FileListView from "./file-list-view";
import MrGit from "./mr-git.js";
import { CompositeDisposable } from "atom";
//Change git status
const MrBookmark = {

  MrBookmarkView: null,
  FileListView: null,
  modalPanel: null,
  subscriptions: null,
  counter: 0,

  activate(state) {
    this.MrBookmarkView = new MrBookmarkView(state.myPackageViewState);
    this.FileListView = new FileListView(this.MrBookmarkView.getFileContainer(), state.myPackageViewState);
    this.MrGit = new MrGit(this.MrBookmarkView.getFileContainer());

    this.modalPanel = atom.workspace.addRightPanel({
      item: this.MrBookmarkView.getElement(),
      visible: true
    });
    this.counter++;

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "mr-bookmark:toggle": () => this.toggle(),
      "mr-bookmark:add": () => this.addItem(),
      "mr-bookmark:addAll": () => this.addAllOpenItems(),
      "mr-bookmark:remove": () => this.removeItem(),
      "mr-bookmark:removeAll": () => this.removeAllItems()
    }));

    atom.workspace.onDidChangeActivePaneItem(this.activeFileChange.bind(this));
    this.MrBookmarkView.getAddButton().onclick = this.addFileButtonClick.bind(this);

    if (state) this.addStartEventListeners();
  },

  activeFileChange(item) {
    try {
      this.FileListView.selectActiveFile(item.buffer.file.path);
    } catch (e) {
      console.log(e.message);
    }
  },

  addFileButtonClick() { //evt
    const editor = atom.workspace.getActivePaneItem();
    if (!editor.buffer) return;

    const filePath = editor.buffer.file.path;

    if (this.FileListView.fileDoesExist(filePath)) return;

    const projectPath = atom.project.getPaths();
    let fileName = filePath.replace(`${projectPath}/`, "");

    if (fileName.length > 28) {
      fileName = ".." + fileName.substr(-30);
    }

    const item = this.FileListView.addItem(filePath, fileName);
    this.addItemEventListeners(item);
    this.MrGit.checkStatus(filePath);
  },

  serialize() {
    return {
      myPackageViewState: this.FileListView.serialize()
    };
  },

  addItemEventListeners(item) {
    item.listEl.addEventListener("click", () => {
      atom.workspace.open(item.listEl.dataset.filePath);
    });

    item.removeButtonEl.addEventListener("mousedown", (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      this.FileListView.removeItem(item.removeButtonEl.parentNode);
    });
  },

  addStartEventListeners() {
    const self = this;
    const fileButtons = this.FileListView.getItems();
    const removeButtons = this.FileListView.getRemoveButtons();

    for (let i = 0; i < fileButtons.length; i++) {
      fileButtons[i].addEventListener("click", function () {
        atom.workspace.open(this.dataset.filePath);
      });
    }

    for (let i = 0; i < removeButtons.length; i++) {
      removeButtons[i].addEventListener("mousedown", function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        self.FileListView.removeItem(this.parentNode);
      });
    }
  },

  addItem() {
    console.log("addItem");
    this.addFileButtonClick();
  },

  addAllOpenItems() {
    console.log("addAllOpenItems");

    const editors = atom.workspace.getPaneItems();

    editors.forEach((editor) => {

      const filePath = editor.buffer.file.path;

      if (this.FileListView.fileDoesExist(filePath)) return;

      const projectPath = atom.project.getPaths();
      let fileName = filePath.replace(`${projectPath}/`, "");

      if (fileName.length > 28) {
        fileName = ".." + fileName.substr(-30);
      }

      const item = this.FileListView.addItem(filePath, fileName);
      this.addItemEventListeners(item);
      this.MrGit.checkStatus(filePath);

    });

    console.log("editor", editor);
  },

  removeItem() {
    console.log("removeItem");

    const editor = atom.workspace.getActivePaneItem();
    if (!editor.buffer) return;

    const file = editor.buffer.file.path;
    if (!this.FileListView.fileDoesExist(file)) return;

    const item = this.MrBookmarkView.getFileContainer().querySelector(`[data-file-path="${file}"]`);
    if (!item) return;

    this.FileListView.removeItem(item);
  },

  removeAllItems() {
    console.log("removeAll");
    this.FileListView.removeAllItems();
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.MrBookmarkView.destroy();
  },

  toggle() {
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }
};

export default MrBookmark;
