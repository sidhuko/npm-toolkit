var fs = require('fs');
var path = require('path');
var debug = false;

var constants = {
  NPM_TOOLKIT_VERSION: '0.0.1',
  SETTINGS_DIR_NAME: 'npm-toolkit-rc',
};

var resolveRootDir = function (checkDir) {
  if (fs.existsSync(checkDir + '/' + constants.SETTINGS_DIR_NAME)) {
    if (debug) console.log(constants.SETTINGS_DIR_NAME + ' found in ' + checkDir);
    constants.ROOT_DIR = checkDir;
    constants.SETTINGS_DIR = [checkDir, constants.SETTINGS_DIR_NAME].join('/');
  } else {
    if (debug) console.log(constants.SETTINGS_DIR_NAME + ' NOT found in ' + checkDir);
    if (checkDir === '/') {
      console.log('Couldn\'t find ' + constants.SETTINGS_DIR_NAME + '. Check if you\'re in the right directory.');
      return process.exit(1);
    }
    var newDir = path.join(checkDir + '/..');
    resolveRootDir(newDir);
  }
};

resolveRootDir(process.cwd().toString());

module.exports = constants;
