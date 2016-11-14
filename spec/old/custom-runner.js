var createRunner = require('atom-mocha-test-runner').createRunner

// optional options to customize the runner
var extraOptions = {
  testSuffixes: ['-spec.js', '-spec.coffee']
}

var optionalConfigurationFunction = function (mocha) {
  // If provided, atom-mocha-test-runner will pass the mocha instance
  // to this function, so you can do whatever you'd like to it.
}

module.exports = createRunner(extraOptions, optionalConfigurationFunction)
