'use babel';

import MrBookmarkView from './mr-bookmark-view';
import FileListView from './file-list-view';
import { CompositeDisposable } from 'atom';

const MrBookmark = {

  MrBookmarkView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.MrBookmarkView = new MrBookmarkView(state.myPackageViewState);
    this.FileListView = new FileListView(this.MrBookmarkView.getFileContainer(), state.myPackageViewState);

    this.modalPanel = atom.workspace.addRightPanel({
      item: this.MrBookmarkView.getElement(),
      visible: true
    });

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mr-bookmark:removeAll': () => this.removeAllItems(),
      'mr-bookmark:toggle': () => this.toggle()
    }));

    atom.workspace.onDidChangeActivePaneItem(this.activeFileChange.bind(this));
    this.MrBookmarkView.getAddButton().onclick = this.addFileButtonClick.bind(this);

    if (state)
      this.addStartEventListeners();

  },

  activeFileChange(item) {
    this.FileListView.selectActiveFile(item.buffer.file.path)
  },

  addFileButtonClick(evt) {
    var editor = atom.workspace.getActivePaneItem();
    var filePath = editor.buffer.file.path;

    var projectPath = atom.project.getPaths();
    var fileName = filePath.replace(projectPath + "/", "");

    var item = this.FileListView.addItem(filePath, fileName);
    this.addItemEventListeners(item);
  },

  serialize() {
    return {
      myPackageViewState: this.FileListView.serialize()
    };
  },

  addItemEventListeners(item) {

    var self = this;

    item.listEl.addEventListener("click", function() {
        atom.workspace.open(this.dataset.filePath);
    });

    item.removeButtonEl.addEventListener("mousedown", function(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      console.log("REMOVE", this);
      self.FileListView.removeItem(this.parentNode);
    });
  },

  addStartEventListeners() {
    var self = this;
    var fileButtons = this.FileListView.getItems();
    var removeButtons = this.FileListView.getRemoveButtons();

    for(var i = 0; i < fileButtons.length; i++) {
      fileButtons[i].addEventListener("click", function() {
        atom.workspace.open(this.dataset.filePath);
      });
    }

    for(var i = 0; i < removeButtons.length; i++) {
      removeButtons[i].addEventListener("mousedown", function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        self.FileListView.removeItem(this.parentNode);
      });
    }
  },

  removeAllItems() {
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
