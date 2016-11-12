'use babel';

import MrGit from '../lib/mr-git';
import gitHelper from './helpers/git-helper';

describe('MrGit', () => {
  // let workspaceElement, activationPromise;

  it("fires up a repository", (done) => {

    atom.project.getRepositories = () => {
      return [gitHelper];
    };

    var git = new MrGit();

    gitHelper.triggerChangeStatus("myPath", 200);
    console.log(gitHelper.getPathStatus("spec/mr-git-spec.js"));


    done();
  });

});
