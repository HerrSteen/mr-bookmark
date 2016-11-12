'use babel';

import MrBookmark from '../lib/mr-bookmark';

describe('MrBookmark', () => {
  let workspaceElement, activationPromise;

  it("has add button", (done) => { 

    // atom.packages.activatePackage('mr-bookmark').then((a,b) => {
    atom.workspace.open("this.dataset.filePath").then((a,b) => {
      expect(2).to.equal(3);
      done();
    });
    console.log("test");
  })

  it("works", () => {
    console.log("test");
  });

});
