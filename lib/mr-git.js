"use babel";

class MrGit {

  constructor(container) {
    this.repo = atom.project.getRepositories()[0];
    if (!this.repo) {
      return;
    }

    this.container = container;

    this.addChangeListener();
    this.addAllChangeListener();
  }

  getModifiedItems() {
    return this.repo.statuses;
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
      item.classList.remove("git-added", "git-modified");
    }
  }

  checkStatus(file) {
    const item = this.container.querySelector(`[data-file-path="${file}"]`);

    if (item) {
      const status = this.repo.getPathStatus(file);
      this.colorItems(status, item);
    }
  }

  addAllChangeListener() {
    this.repo.onDidChangeStatuses(() => {
      const items = this.container.querySelectorAll(".mr-bookmark-panel .list-item");

      for (let i = 0; i < items.length; i++) {
        const path = items[i].dataset.filePath;
        const status = this.repo.getPathStatus(path);
        const item = this.container.querySelector(`[data-file-path="${path}"]`);

        if (item) {
          this.colorItems(status, item);
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
