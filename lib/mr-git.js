"use babel";

class MrGit {

  constructor() {
    // console.log("i MrGit");
    this.repo = atom.project.getRepositories()[0]
    // console.log("repo", this.repo);

  }

  addAllChangeListener(fn) {
    this.repo.onDidChangeStatuses(function(evt) {
      // console.log("evt...", evt);
    });
  }

  addChangeListener(fn) {
    this.repo.onDidChangeStatus(fn);
  }


}

export default MrGit;
