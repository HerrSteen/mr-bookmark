"use babel";

const pub = {};
const workspace = {buffer: {file: {path: {} } } };

pub.setEditorFile = function (file) {
  workspace.buffer.file.path = file;
};

pub.getActivePaneItem = function () {
  return workspace;
};

pub.getPaths = function () {
  return "";
};

export default pub;
