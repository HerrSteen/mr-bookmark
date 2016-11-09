'use babel';

// import MrBookmark from '../lib/mr-bookmark';
// import FileListView from '../lib/file-list-view';
import MrBookmark from '../lib/mr-bookmark'

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('FileListView', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);

    waitsForPromise(() => {
      return atom.packages.activatePackage('mr-bookmark');
    })
  });

  describe('when a file is added', () => {
    it('contains another file in list', () => {
      expect(workspaceElement.querySelector('.list-item')).toExist();
    });

    it('shows an empty file-list', () => {
      expect(workspaceElement.querySelector('.list-item')).not.toExist();
    });
  });
});
