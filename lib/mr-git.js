"use babel";

class MrGit {

  constructor() {
    console.log("MR GIT");
    this.repo = atom.project.getRepositories()[0]

    var z = this.repo.getPathStatus("/Users/Steen/github/mr-bookmark/lib/mr-bookmark-view.js");
    console.log("z",z);
    this.addChangeListener();
    this.addAllChangeListener();
  }
  
  colorItems(status, item) {

    //Stagad
    if (status === 2)
      item.classList.add("git-staged");

    //inte stagad men ändrad
    if (status === 256)
      item.classList.add("git-edited");

    //inte ändrad
    if (status === 0)
      item.classList.remove("git-staged", "git-edited");
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
        var path = items.dataset.filePath;
        var status = self.repo.getPathStatus(path);
        self.colorItems(status, item);
      }
    });
  }
}

export default MrGit;
