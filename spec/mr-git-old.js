'use babel';

import MrGit from '../lib/mr-git';
import gitHelper from './helpers/git-helper';
import FileListView from "../lib/file-list-view";

describe('MrGit', () => {
  let fileListView, files, workspaceElement, container;

  before((done) => {
    workspaceElement = atom.views.getView(atom.workspace)
    // document = workspaceElement;

    files = [];
    files.push({path: "folder/file1.js", name: "file1"});
    files.push({path: "folder/file2.js", name: "file2"});

    atom.project.getRepositories = () => {
      return [gitHelper];
    };

    gitHelper.addPath("folder/file1.js", 0);

    atom.packages.activatePackage('mr-bookmark').then((res, err) => {
      container = workspaceElement.querySelector(".mr-bookmark-panel");
      fileListView = new FileListView(container);

      files.forEach((file) => {
        fileListView.addItem(file.path, file.name);
      });

      done();
    });

  });

  it("has its own wrapper", () => {
    expect(container).to.exist;
  });

  it("containes added files", () => {
    let items = container.getElementsByClassName('list-item');
    expect(items.length).to.equal(2);
  });

  it("has the right color if its git modified", () => {

    gitHelper.triggerChangeStatus("folder/file1.js", 256);
    let items = container.getElementsByClassName('git-modified');
    expect(items.length).to.equal(1);
  });

});
