var args = require('nomnom')().parse();

var fs = require('fs');
var path = require('path');
var debug = args.debug || args.d || false;

var _cfg = {
  constants: {
    version: require('./package.json').version,
    settingsDir: 'npm-toolkit-rc',
    userdataFilename: 'userdata.ntkrc'
  },
  paths: {}
};

var parseUserdata = function (path) {
  setEnvVars(path);
  var userdata = JSON.parse(fs.readFileSync(path + '/' + _cfg.constants.userdataFilename));
  delete userdata._meta;
  return userdata;
};

var setEnvVars = function (path) {
  var env = args.config + '.';

  var json = JSON.parse(fs.readFileSync(path + '/' + 'env.' + (args.config ? args.config + '.' : '') + 'json'));
  if (debug) console.log('\n', 'Setting up following environmental vars', json);
  Object.keys(json).forEach(function (key) {
    if (process.env[key]) console.log('Overwriting variable', key, '(', process.env[key], '->', json[key], ')');
    process.env[key] = json[key];
  });
};

var findConfig = function (checkDir) {
  if (fs.existsSync(checkDir + '/' + _cfg.constants.settingsDir)) {
    if (debug) console.log(_cfg.constants.settingsDir + ' found in ' + checkDir + '\n');
    _cfg.paths.root = checkDir;
    _cfg.paths.settings = [checkDir, _cfg.constants.settingsDir].join('/');
    if (debug) console.log('\n', 'Parsing userdata');
    _cfg.userdata = parseUserdata(_cfg.paths.settings);
    _cfg.paths.app = checkDir + '/' + _cfg.userdata.launcher.dir;
    if (debug) console.log('\n', 'Config', _cfg);
    if (debug) console.log('---------------------------------------\n');
    return true;
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

if (debug) console.log('\n---------------------------------------');
findConfig(process.cwd().toString());

module.exports = _cfg;
