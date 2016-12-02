"use babel";

class MrStep {

  constructor(list, modalPanel, panelShouldBeVisible) {
    this.list = list;
    this.keysDown = { cmd: false, alt: false };
    this.modalPanel = modalPanel;
    this.panelShouldBeVisible = panelShouldBeVisible;

    const workspaceElement = atom.views.getView(atom.workspace);

    workspaceElement.addEventListener("keydown", (evt) => {
      if (evt.key === "Alt") {
        this.keysDown.alt = true;
      }
      if (evt.key === "Meta") {
        this.keysDown.cmd = true;
      }
    });

    workspaceElement.addEventListener("keyup", (evt) => {
      if (evt.key === "Alt") {
        this.keysDown.alt = false;
      }
      if (evt.key === "Meta") {
        this.keysDown.cmd = false;
      }
      console.log("this.panelShouldBeVisible", this.panelShouldBeVisible);
      if (!this.keysDown.cmd && !this.keysDown.alt && !this.panelShouldBeVisible) {
        this.modalPanel.hide();
      }
    });
  }

  open() {
    console.log("open");
    const item = this.list.getElementsByClassName("step")[0];
    if (!item) return;

    atom.workspace.open(item.dataset.filePath);
  }

  step(direction, isVisible) {

    if (!this.modalPanel.isVisible()) {
      this.modalPanel.show();
      this.shouldHidePanel = true;
    } else {
      this.shouldHidePanel = false;
    }

    if (direction === "up") {
      this.stepUp();
    }

    if (direction === "down") {
      this.stepDown();
    }
  }

  stepUp() {
    const item = this.list.getElementsByClassName("step")[0];

    if (item) {
      item.classList.remove("step");
      const prevItem = item.previousSibling;

      if (prevItem) {
        prevItem.classList.add("step");
      } else {
        this.list.lastChild.classList.add("step");
      }
    } else {
      this.list.lastChild.classList.add("step");
    }
  }

  stepDown() {
    const item = this.list.getElementsByClassName("step")[0];

    if (item) {
      item.classList.remove("step");
      const nextItem = item.nextSibling;

      if (nextItem) {
        nextItem.classList.add("step");
      } else {
        this.list.firstChild.classList.add("step");
      }
    } else {
      this.list.firstChild.classList.add("step");
    }
  }
}

export default MrStep;
