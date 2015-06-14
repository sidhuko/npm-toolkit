var Constants = require('../../constants');

module.exports = function (opts) {
  var settingsExist = true;
  if (!settingsExist) {
    console.log();
    console.log('npm-toolkit installation not found in current location or in the folders above.');
    console.log();
    console.log('You can initialise it in current folder with command:');
    console.log('   npm-toolkit init');
    console.log();
    console.log('You can also initialise it with some example data:');
    console.log('   npm-toolkit init --e=true');
    console.log();
    return;
  }




  var NTInterfaceCLIFactory = require('../NTInterfaceCLI');
  var NTInterfaceCLI = NTInterfaceCLIFactory(require(Constants.SETTINGS_DIR + '/inq-questions'), require(Constants.SETTINGS_DIR + '/inq-script'));
  NTInterfaceCLI.ask();
  // TODO: replace inq-questions: parse commands.json and output it
  // TODO: replace inq-script: write a generic exit script / command launcher
};
