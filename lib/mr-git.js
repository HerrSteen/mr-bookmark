"use babel";

import {File} from 'atom';

class MrGit {

  constructor() {
    console.log("MR GIT");
    this.repo = atom.project.getRepositories()[0]


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

    this.addChangeListener();
    this.addAllChangeListener();
  }

  colorItems(status, item) {

    //Stagad
    if (status === 2)
      item.classList.add("git-added");

    //modified
    if (status === 256)
      item.classList.add("git-modified");

    //inte ändrad
    if (status === 0)
      item.classList.remove("git-added", "git-edited");
  }

  addAllChangeListener() {
    var self = this;
    this.repo.onDidChangeStatuses((evt) => {
      console.log("evt2", evt);

      var items = document.querySelectorAll(".mr-bookmark-panel .list-item");
      console.log("items", items);

      for(var i = 0; i < items.length; i++) {
        var path = items[i].dataset.filePath;
        var status = self.repo.getPathStatus(path);
        console.log("status", path, status);

        console.log(`[data-file-path="${path}"]`);
        var item = document.querySelector(`[data-file-path="${path}"]`);

        if(item)
          self.colorItems(status, item); 

      }
    });
  }


  addChangeListener() {
    var self = this;

    this.repo.onDidChangeStatus(function(evt) {
      console.log("evt", evt);

      console.log(`[data-file-path="${evt.path}"]`);
      var item = document.querySelector(`[data-file-path="${evt.path}"]`);

      if (item) {
        var path = item.dataset.filePath;
        var status = self.repo.getPathStatus(path);
        self.colorItems(status, item);
      }
    });
  }
}

export default MrGit;
