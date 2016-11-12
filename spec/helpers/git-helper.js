"use babel";

const pub = {};

pub.storedStatusFunctions = [];
pub.storedStatusesFunctions = [];

pub.statuses = [];
pub.statuses["spec/mr-bookmark-spec.js"] = 128;
pub.statuses["spec/mr-git-spec.js"] = 250;


pub.addPath(path, status) {
  pub.statuses[path] = status;
}

pub.getPathStatus = function(path) {
  return pub.statuses[path];
}

pub.onDidChangeStatus = function(fn) {
  pub.storedStatusFunctions.push(fn);
};

pub.triggerChangeStatus = function(path, status) {
  pub.storedStatusFunctions.forEach((fn) => {
    fn({path, status});
  });
};

pub.onDidChangeStatuses = function(fn) {
  pub.storedStatusFunctions.push(fn);
}

pub.triggerChangeStatuses = function(path, status) {
  pub.storedStatusesFunctions.forEach((fn) => {
    fn({path, status});
  });
};


export default pub;
