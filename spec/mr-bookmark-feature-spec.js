"use babel";

import gitHelper from "./helpers/git-helper";
import workspaceHelper from "./helpers/workspace-helper";
import mrBookmark from "../lib/mr-bookmark";

describe("Mr Bookmark", () => {
  let workspaceElement, container, mainFolder;

  before(() => {
    mainFolder = "folder";
    workspaceElement = atom.views.getView(atom.workspace);
  });

  before(() => {
    atom.workspace.getActivePaneItem = workspaceHelper.getActivePaneItem;
    atom.project.getPaths = workspaceHelper.getPaths;
    atom.project.getRepositories = () => {
      return [gitHelper];
    };
  });

  it("activates package", (done) => {
    atom.packages.activatePackage("mr-bookmark").then((res, err) => {
      if (err) done(err);
      done();
    });

  });

  it("has its own container", () => {
    container = workspaceElement.querySelector(".mr-bookmark-panel");
    expect(container).to.exist;
  });

  it("Adds files", () => {
    const addButton = workspaceElement.getElementsByClassName("add-button")[0];

    ["f1.js", "f2.js", "f3.js"].forEach((arr) => {
      workspaceHelper.setEditorFile(`${mainFolder}/${arr}`);
      addButton.click();
    });
  });

  it("contains added files", () => {
    const items = container.getElementsByClassName("list-item");
    expect(items.length).to.equal(3);
  });

  it("has the right color if it's git modified", () => {
    gitHelper.triggerChangeStatus(`${mainFolder}/f1.js`, 256);
    const items = container.getElementsByClassName("git-modified");
    expect(items.length).to.equal(1);
  });

});
