'use babel';

import MrGit from '../lib/mr-git';
import gitHelper from './helpers/git-helper';

describe('MrGit', () => {
  let tempGitHelper;
  // let stringid;

  before(() => {
    // console.log("BEFORE");
    // stringid = JSON.stringify(gitHelper);

  });

  // let workspaceElement, activationPromise;
  beforeEach(() => {
    // console.log(gitHelper.statuses);
    // tempGitHelper = null;
    // tempGitHelper = Object.assign({}, gitHelper);
    // console.log("stringid", stringid);
    // tempGitHelper = JSON.parse(stringid);
    // console.log("tempGitHelper", tempGitHelper);
    console.log("BEFORE EACH");

    // tempGitHelper = Object.create(gitHelper);
    tempGitHelper = (JSON.parse(JSON.stringify(gitHelper)));

  });

  it("fires up a repository", (done) => {
    atom.project.getRepositories = () => {
      return [gitHelper];
    };

    // var git = new MrGit();

    tempGitHelper.addPath("my-custom-file.js", 200);
    // tempGitHelper.triggerChangeStatus("myPath", 200);
    // console.log(tempGitHelper.getPathStatus("spec/mr-git-spec.js"));

    done();
  });

  it("fires up a repository", () => {

      console.log("test");
      console.log(tempGitHelper.statuses);
      // console.log(tempGitHelper.statuses);

  });


});
