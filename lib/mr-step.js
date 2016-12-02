"use babel";

class MrStep {

  constructor(container, modalPanel, panelShouldBeVisible) {
    this.container = container;
    this.list = this.container.getElementsByClassName("list")[0];

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

      if (!this.keysDown.cmd && !this.keysDown.alt) {
        const item = this.list.getElementsByClassName("step")[0];
        if (item) {
          item.classList.remove("step");
        }

        if (!this.panelShouldBeVisible) {
          this.modalPanel.hide();
        }
      }
    });
  }

  open() {
    const item = this.list.getElementsByClassName("step")[0];
    if (!item) return;

    atom.workspace.open(item.dataset.filePath);
  }

  step(direction) {
    if (!this.modalPanel.isVisible()) {
      this.modalPanel.show();
      this.shouldHidePanel = true;
    }

    this.list = this.container.getElementsByClassName("list")[0];
    if (this.list.children.length === 0) return;

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
