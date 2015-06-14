var Constants = require('../../constants');

module.exports = function (opts) {
  var NTInterfaceCLIFactory = require('../NTInterfaceCLI');
  var NTInterfaceCLI = NTInterfaceCLIFactory(require(Constants.SETTINGS_DIR + '/inq-questions'), require(Constants.SETTINGS_DIR + '/inq-script'));
  NTInterfaceCLI.ask();
  // TODO: replace inq-questions: parse commands.json and output it
  // TODO: replace inq-script: write a generic exit script / command launcher
};
