'use babel';

import MrBookmark from '../lib/mr-bookmark';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('MrBookmark', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {


    waitsForPromise(() => {
      console.log("open file");
      console.log( JSON.stringify(atom.workspace.open("spec/mr-bookmark-spec.js")));
    });

    waitsForPromise(() => {
      atom.packages.activatePackage('mr-bookmark');
    });


  });

  describe('when mr-bookmark is activated', () => {

    it("is positioned in the right-panel")

    it('shows an add button', () => {
      expect(workspaceElement.querySelector('.add-button')).toExist();
    });

    it('shows an empty file-list', () => {
      expect(workspaceElement.querySelector('.list-item')).not.toExist();
    });
  });

  describe("When files are added", () => {
    let edidor;

    it("Ads file with right path to the file-list", () => {
      // const mr = new MrBookmark();
      // let addButton = workspaceElement.querySelector('.add-button');
      MrBookmark.addFileButtonClick(null);

      // mr.addButton.click();
    });
  });
  /*
  describe("When files with long names are added", () => {
    it("The filename is cut to xx characters");
  });

  describe("When one file is removed", () => {
    it("The file-list is shorter");
  });

  describe("When a file with no path is added as bookmark", () => {
    it("Throws an error");
  });*/

});
