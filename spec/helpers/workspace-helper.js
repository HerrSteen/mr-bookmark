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

pub.getPaneItems = function () {
  const returnArr = [];
  ["f1.jpg", "f2.js", "f3.js"].forEach((item) => {
    returnArr.push({buffer: {file: {path: item } } });
  });

  return returnArr;
};

export default pub;
