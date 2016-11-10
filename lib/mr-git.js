"use babel";

class MrGit {

  constructor() {
    console.log("MR GIT");
    this.repo = atom.project.getRepositories()[0]

    var z = this.repo.getPathStatus("/Users/Steen/github/mr-bookmark/keymaps/mr-bookmark.json");
    console.log("z",z);
    this.addChangeListener();
    this.addAllChangeListener();
  }

  addAllChangeListener() {
    var self = this;
    this.repo.onDidChangeStatuses(function(evt) {
      console.log("evt2", evt);
      var z = self.repo.getPathStatus("/Users/Steen/github/mr-bookmark/keymaps/mr-bookmark.json");
      console.log("z",z);
    });

  }

  addChangeListener() {
    this.repo.onDidChangeStatus(function(evt) {
      console.log("evt", evt);

      if (evt.pathStatus === 256) {
        console.log(`[data-file-path="${evt.path}"]`);
        var item = document.querySelector(`[data-file-path="${evt.path}"]`);

        if (item)
        item.style.backgroundColor = "orange";

        return;
      }

      // if (evt.pathStatus === )

    });
  }

}

export default MrGit;
