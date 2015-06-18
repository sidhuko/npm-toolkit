var fs = require('fs');
var path = require('path');
var debug = false;
// TODO: Make debug sensitive to --debug flag

var _cfg = {
  constants: {
    version: '0.1.3',
    settingsDir: 'npm-toolkit-rc',
    userdataFilename: 'userdata.ntkrc'
  },
  paths: {}
};

var rtn = _cfg;

var parseUserdata = function (path) {
  var userdata = fs.readFileSync(path + '/' + _cfg.constants.userdataFilename);
  return JSON.parse(userdata);
};

var produceConfig = function (checkDir) {
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
    produceConfig(newDir);
  }
};

rtn = produceConfig(process.cwd().toString());
module.exports = rtn;
