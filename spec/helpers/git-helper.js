"use babel";

const pub = {};

pub.storedStatusFunctions = [];
pub.storedStatusesFunctions = [];

pub.statuses = [];
//example
// pub.statuses["spec/mr-bookmark-spec.js"] = 128;
// pub.statuses["spec/mr-git-spec.js"] = 250;


pub.addPath = function(path, status) {
  pub.statuses[path] = status;
}

pub.getPathStatus = function(path) {
  return pub.statuses[path];
}

pub.onDidChangeStatus = function(fn) {
  pub.storedStatusFunctions.push(fn);
};

pub.triggerChangeStatus = function(path, pathStatus) {
  pub.storedStatusFunctions.forEach((fn) => {
    fn({path, pathStatus, trigger: "johan"});
  });
};

pub.onDidChangeStatuses = function(fn) {
  pub.storedStatusesFunctions.push(fn);
}

pub.triggerChangeStatuses = function(path, pathStatus) {
  pub.storedStatusesFunctions.forEach((fn) => {
    fn({path, pathStatus});
  });
};


export default pub;
