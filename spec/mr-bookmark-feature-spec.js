'use babel';

// import MrGit from '../lib/mr-git';
import gitHelper from './helpers/git-helper';
import workspaceHelper from './helpers/workspace-helper';
// import FileListView from "../lib/file-list-view";

describe('Mr Bookmark', () => {
  let workspaceElement, container;

  before(() => {
    workspaceElement = atom.views.getView(atom.workspace)
  });

  before(() => {
    atom.workspace.getActivePaneItem = workspaceHelper.getActivePaneItem;
    workspaceHelper.setEditorFile("folder/file1.js")
  });

  before(() => {
    atom.project.getPaths = workspaceHelper.getPaths;
  });



  it("has a fake repo", () => {
    atom.project.getRepositories = () => {
      return [gitHelper];
    };
  });

  it("activates package", (done) => {
    atom.packages.activatePackage('mr-bookmark').then((res, err) => {
      done();
    });
  });

  it("Contains file in buffer", () => {

  });

  it("has its own container", () => {
    container = workspaceElement.querySelector(".mr-bookmark-panel");
    expect(container).to.exist;
  });

  it("Adds files", () => {
    const addButton = workspaceElement.getElementsByClassName("add-button")[0];
    addButton.click();
  });

  it("containes added files", () => {
    let items = container.getElementsByClassName('list-item');
    console.log("items", items);
    expect(items.length).to.equal(1);
  });

  it("has the right color if its git modified", () => {
    gitHelper.triggerChangeStatus("folder/file1.js", 256);
    let items = container.getElementsByClassName('git-modified');
    expect(items.length).to.equal(1);
  });

});
