"use babel";

class MrGit {

  constructor() {
    console.log("MR GIT");
    this.repo = atom.project.getRepositories()[0]

    this.addChangeListener();
  }

  addAllChangeListener() {

    this.repo.onDidChangeStatuses(function(evt) {
      console.log("evt2", evt);


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
