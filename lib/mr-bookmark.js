'use babel';

import MrBookmarkView from './mr-bookmark-view';
import { CompositeDisposable } from 'atom';

const MrBookmark = {

  MrBookmarkView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.MrBookmarkView = new MrBookmarkView(state.myPackageViewState);

    this.modalPanel = atom.workspace.addRightPanel({
      item: this.MrBookmarkView.getElement(),
      visible: true
    });

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mr-bookmark:removeAll': () => this.removeAll(),
      'mr-bookmark:toggle': () => this.toggle()
    }));

    var self = this;
    this.MrBookmarkView.getAddButton().addEventListener("click", function() {
      var editor = atom.workspace.getActivePaneItem();
      var filePath = editor.buffer.file.path;

      var projectPath = atom.project.getPaths();
      var fileName = filePath.replace(projectPath + "/", "");

      self.MrBookmarkView.addItem(filePath, fileName);
      self.addEventListeners();
    });
  },

  serialize() {
    console.log("serialize");
    return {
      myPackageViewState: this.MrBookmarkView.serialize()
    };
  },

  addEventListeners() {
    var self = this;

    //#TODO Stop re-listening all files...
    var fileButtons = this.MrBookmarkView.getFileButtons();

    for(var i = 0; i < fileButtons.length; i++) {
      fileButtons[i].addEventListener("click", function() {
          console.log("item", this.getAttribute("href"));
          var file = this.getAttribute("href");
          atom.workspace.open(file);
      });
    }

    var removeButtons = this.MrBookmarkView.getRemoveButtons();

    for(var i = 0; i < removeButtons.length; i++) {
      removeButtons[i].addEventListener("mousedown", function(evt) {
        evt.stopPropagation();
        self.MrBookmarkView.removeItem(this.dataset.fileID);
      });
    }
  },

  removeAll() {
    console.log("RemoveAll");
    this.MrBookmarkView.removeAllItems();
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.MrBookmarkView.destroy();
  },

  toggle() {
    console.log('MyPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }
};

export default MrBookmark;
