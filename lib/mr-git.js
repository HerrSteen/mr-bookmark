"use babel";

// import {File} from "atom";

class MrGit {

  constructor(container) {
    this.repo = atom.project.getRepositories()[0];
    this.container = container;

    this.addChangeListener();
    this.addAllChangeListener();
  }

  colorItems(status, item) {

    //Stagad
    if (status === 2) {
      item.classList.add("git-added");
    }

    //modified
    if (status === 256) {
      item.classList.add("git-modified");
    }

    //not changed
    if (status === 0) {
      item.classList.remove("git-added", "git-edited");
    }
  }

  addAllChangeListener() {
    const self = this;

    this.repo.onDidChangeStatuses(() => {
      const items = document.querySelectorAll(".mr-bookmark-panel .list-item");

      for (let i = 0; i < items.length; i++) {
        const path = items[i].dataset.filePath;
        const status = self.repo.getPathStatus(path);

        const item = self.container.querySelector(`[data-file-path="${path}"]`);

        if (item) {
          self.colorItems(status, item);
        }
      }
    });
  }

  addChangeListener() {
    this.repo.onDidChangeStatus((evt) => {
      const item = this.container.querySelector(`[data-file-path="${evt.path}"]`);

      if (item) {
        this.colorItems(evt.pathStatus, item);
      }
    });
  }
}

export default MrGit;


    // this.repo.getPathStatus("/Users/Steen/github/mr-bookmark/lib/mr-bookmark-view.js");
    // getLineDiffs(path, text)

    // var t = new File("/Users/Steen/github/mr-bookmark/lib/mr-bookmark-view.js");
    //
    // t.read().then((res, err) => {
    //   // console.log("read", res);
    //   var k = this.repo.getLineDiffs("/Users/Steen/github/mr-bookmark/lib/mr-bookmark-view.js", res);
    //   var k = this.repo.getDiffStats("/Users/Steen/github/mr-bookmark/lib/mr-bookmark-view.js");
    //   console.log("k", k);
    // });
