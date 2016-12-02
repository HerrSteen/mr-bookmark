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
    atom.workspace.getPaneItems = workspaceHelper.getPaneItems;
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

  it("has the right class if it's git modified", () => {
    gitHelper.triggerChangeStatus(`${mainFolder}/f1.js`, 256);
    const items = container.getElementsByClassName("git-modified");
    expect(items.length).to.equal(1);
  });

  it("removes all files when mr-bookmark:removeAll is pressed", () => {
    atom.commands.dispatch(workspaceElement, "mr-bookmark:removeAll");

    const items = container.getElementsByClassName("list-item");
    expect(items.length).to.equal(0);
  });

  it("ad all files workspace when mr-bookmark:addAll is pressed", () => {
    atom.commands.dispatch(workspaceElement, "mr-bookmark:addAll");

    const items = container.getElementsByClassName("list-item");
    expect(items.length).to.equal(3);
  });

  it("removes all files when mr-bookmark:removeAll is pressed again", () => {
    atom.commands.dispatch(workspaceElement, "mr-bookmark:removeAll");

    const items = container.getElementsByClassName("list-item");
    expect(items.length).to.equal(0);
  });

  it("ad all files workspace when mr-bookmark:addAllGit is pressed", () => {
    gitHelper.addPath("g1.jpg", 256);
    gitHelper.addPath("g2.jpg", 256);

    atom.commands.dispatch(workspaceElement, "mr-bookmark:addAllGit");

    const items = container.getElementsByClassName("list-item");
    expect(items.length).to.equal(2);
  });
});
