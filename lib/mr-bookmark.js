'use babel';

import MrBookmarkView from './mr-bookmark-view';
import FileListView from './file-list-view';
import { CompositeDisposable } from 'atom';

const MrBookmark = {

  MrBookmarkView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // var self = this;

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
  },

  activeFileChange(item) {
    this.FileListView.selectActiveFile(item.buffer.file.path)
  },

  addFileButtonClick(evt) {
    var editor = atom.workspace.getActivePaneItem();
    var filePath = editor.buffer.file.path;

    var projectPath = atom.project.getPaths();
    var fileName = filePath.replace(projectPath + "/", "");

    this.FileListView.addItem(filePath, fileName);
    this.addEventListeners();
  },

  serialize() {
    return {
      myPackageViewState: this.FileListView.serialize()
    };
  },

  addEventListeners() {
    var self = this;
    //#TODO Stop re-listening on all files...
    var fileButtons = this.FileListView.getItems();

    for(var i = 0; i < fileButtons.length; i++) {
      fileButtons[i].addEventListener("click", function() {
          var file = this.getAttribute("href");
          atom.workspace.open(file);
      });
    }

    var removeButtons = this.FileListView.getRemoveButtons();

    for(var i = 0; i < removeButtons.length; i++) {
      removeButtons[i].addEventListener("mousedown", function(evt) {
        evt.stopPropagation();
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
