"use babel";

class MrGit {

  constructor() {
    this.repo = atom.project.getRepositories()[0]
  }

  addAllChangeListener(fn) {
    this.repo.onDidChangeStatuses(fn);
  }

  addChangeListener() {
    this.repo.onDidChangeStatus(function() {
      console.log("evt", evt);

      if (evt.pathStatus === 256) {
        console.log(`[data-file-path="${evt.path}"]`);
        var item = document.querySelector(`[data-file-path="${evt.path}"]`);

        if (item)
        item.style.backgroundColor = "orange";

        return;
      }

      if (evt.pathStatus === )

    });
  }

}

export default MrGit;
