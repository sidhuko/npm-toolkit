var fs = require('fs');
var path = require('path');
var debug = false;
// TODO: Make debug sensitive to --debug flag

var _cfg = {
  constants: {
    version: require('./package.json').version,
    settingsDir: 'npm-toolkit-rc',
    userdataFilename: 'userdata.ntkrc'
  },
  paths: {}
};

var parseUserdata = function (path) {
  var userdata = fs.readFileSync(path + '/' + _cfg.constants.userdataFilename);
  return JSON.parse(userdata);
};

var findConfig = function (checkDir) {
  if (fs.existsSync(checkDir + '/' + _cfg.constants.settingsDir)) {
    if (debug) console.log(_cfg.constants.settingsDir + ' found in ' + checkDir);
    _cfg.paths.root = checkDir;
    _cfg.paths.settings = [checkDir, _cfg.constants.settingsDir].join('/');

    if (debug) console.log('Parsing userdata');
    _cfg.userdata = parseUserdata(_cfg.paths.settings);
    _cfg.paths.launcher = _cfg.userdata.launcher.dir;
    if (debug) console.log(_cfg);
    if (debug) console.log('---------------------------------------\n');
    return _cfg;
  } else {
    if (debug) console.log(_cfg.constants.settingsDir + ' NOT found in ' + checkDir);
    if (checkDir === '/') {
      console.log('Couldn\'t find ' + _cfg.constants.settingsDir + '. Check if you\'re in the right directory.');
      return process.exit(1);
    }
    var newDir = path.join(checkDir + '/..');
    findConfig(newDir);
  }
};

findConfig(process.cwd().toString());

module.exports = _cfg;
