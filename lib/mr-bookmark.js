"use babel";

import MrBookmarkView from "./mr-bookmark-view";
import FileListView from "./file-list-view";
import MrGit from "./mr-git.js";
import { CompositeDisposable } from "atom";

const MrBookmark = {

  MrBookmarkView: null,
  FileListView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.MrBookmarkView = new MrBookmarkView(state.myPackageViewState);
    this.FileListView = new FileListView(this.MrBookmarkView.getFileContainer(), state.myPackageViewState);
    this.MrGit = new MrGit(this.MrBookmarkView.getFileContainer());

    this.modalPanel = atom.workspace.addRightPanel({
      item: this.MrBookmarkView.getElement(),
      visible: true
    });

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
      /* eslint-disable no-console */
      console.log(e.message);
      /* eslint-enable no-console */
    }
  },

  addFileButtonClick() {
    const editor = atom.workspace.getActivePaneItem();
    if (!editor.buffer) return;

    const filePath = editor.buffer.file.path;
    this.addFile(filePath);
  },

  addFile(path) {
    if (this.FileListView.fileDoesExist(path)) return;

    let fileName = path.split("/").pop();

    if (fileName.length > 28) {
      fileName = `...${fileName.substr(-30)}`;
    }

    const item = this.FileListView.addItem(path, fileName);
    this.addItemEventListeners(item);
    this.MrGit.checkStatus(path);
  },

  addItemEventListeners(item) {
    item.listEl.addEventListener("click", () => {
      atom.workspace.open(item.listEl.dataset.filePath);
    });

    item.removeButtonEl.addEventListener("mousedown", (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      const filePath = item.removeButtonEl.parentNode.dataset.filePath;
      this.FileListView.removeItem(filePath);
    });
  },

  addStartEventListeners() {
    const fileButtons = this.FileListView.getItems();
    const removeButtons = this.FileListView.getRemoveButtons();

    for (let i = 0; i < fileButtons.length; i++) {
      fileButtons[i].addEventListener("click", () => {
        atom.workspace.open(fileButtons[i].dataset.filePath);
      });
    }

    for (let i = 0; i < removeButtons.length; i++) {
      removeButtons[i].addEventListener("mousedown", (evt) => {
        evt.stopPropagation();
        evt.preventDefault();

        this.FileListView.removeItem(removeButtons[i].parentNode.dataset.filePath);
      });
    }
  },

  addItem() {
    this.addFileButtonClick();
  },

  addAllOpenItems() {
    const editors = atom.workspace.getPaneItems();

    editors.forEach((editor) => {
      const filePath = editor.buffer.file.path;
      this.addFile(filePath);
    });
  },

  removeItem() {
    const editor = atom.workspace.getActivePaneItem();
    if (!editor.buffer) return;

    const filePath = editor.buffer.file.path;

    this.FileListView.removeItem(filePath);
  },

  removeAllItems() {
    this.FileListView.removeAllItems();
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.MrBookmarkView.destroy();
  },

  serialize() {
    return {
      myPackageViewState: this.FileListView.serialize()
    };
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
