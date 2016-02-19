var args = require('nomnom')().parse();
var fs = require('fs');
var path = require('path');



var _cfg = {
  const: {
    version: require('./package.json').version,
    settingsDirname: 'ntrc',//'npm-toolkit-rc'
    projectSettingsFilename: 'settings.json',
    localSettingsFilename: 'settings.local.json'
  },

  args: {
    debug: args.debug || args.d || false,
    // config: _parseConfigArg(args.config)
    config: args.config
  },

  resolved: {
    root:
  },

  // these should be finalised paths. Consider system-level caching on pwd level.
  paths: {
    // root: ''
  }
};



console.log('------------------\n_cfg object:\n', _cfg, '\n------------------\n');



/**
  Not yet used - expected to parse --config argument if present

  Config switch should support:
  nt list --config=my-custom-ntrc
  nt list --config=~/my-project-path/app/ntrc
*/
var parseConfigArg = function (str) {
  if (!str) {
    str = './ntrc';
  }

  // if path begins with '~' replace it with home directory
  if (str.charAt(0) === '~') {
    str = str.replace('~', process.env.HOME);
  }

  var tmpArray = path.resolve(str).split('/');

  return {
    configDirname: tmpArray.pop(),
    rootPath: tmpArray.join('/')
  }
}

// Test the above function
// console.log(parseConfigArg());
// console.log();
// console.log(parseConfigArg('my-custom-ntrc'));
// console.log();
// console.log(parseConfigArg('./ntrc'));
// console.log();
// console.log(parseConfigArg('~/some-absolute-path/etc/etc/ntrc'));
// console.log();
// console.log(parseConfigArg('~/some-absolute-path/~/with~tildes/etc/etc/ntrc'));
// console.log();
//
// process.exit(0);







var debug = _cfg.args.debug;



var parseUserdata = function (path) {
  console.log('parseUserdata@path', path);

  setEnvVars(path);
  var userdata = JSON.parse(fs.readFileSync(path + '/' + _cfg.const.projectSettingsFilename));
  delete userdata._meta;
  return userdata;
};

var setEnvVars = function (path) {
  var env = (args.env ? args.env + '.' : '');
  var file = path + '/' + 'env.' + env + 'json';
  if (!fs.existsSync(file)) {
    return;
  }


  var json;
  try {
    json = JSON.parse(fs.readFileSync(file));
  }
  catch (e) {
    console.log('Error parsing file', file);
    return;
  }

  if (debug) console.log('\n', 'Setting up following environment vars', json);
  Object.keys(json).forEach(function (key) {
    if (process.env[key]) console.log('Overwriting environment variable', key, '(' + process.env[key], '->', json[key] + ')');
    process.env[key] = json[key];
  });
};


/* consider changing signature to take settingsDirname or use _cfg.resolved object */
var locateNTRC = function (checkDir) {
  // if ntrc is a file:
  // if (typeof ntrc === 'file') {
  //   path = read(ntrc);
  //   parseConfigArg(path);
  //   locateNTRC();
  // }

  // if (['status', 'list', 'info'].indexOf(taskArg) !== -1) ignoreErrors = true;


  if (fs.existsSync(checkDir + '/' + _cfg.const.settingsDirname)) {
    if (debug) console.log(_cfg.const.settingsDirname + ' found in ' + checkDir + '\n');


    // use _cfg.resolved
    _cfg.paths.root = checkDir;
    _cfg.paths.app = checkDir
    _cfg.paths.settings = [checkDir, _cfg.const.settingsDirname].join('/');


    if (debug) console.log('\n', 'Parsing userdata');
    // _cfg.projectSettings = parseUserdata(_cfg.const.settingsDirname + '/' +  _cfg.const.projectSettingsFilename);
    // _cfg.localSettings = parseUserdata(_cfg.const.settingsDirname + '/' +  _cfg.const.localSettingsFilename);

    _cfg.settings = parseSettings();

    if (_cfg.userdata.launcher.dir) {
      _cfg.paths.app = checkDir + '/' + _cfg.userdata.launcher.dir;
    }

    if (debug) console.log('\n', 'Config', _cfg);
    if (debug) console.log('---------------------------------------\n');
    return true;
  } else {
    if (debug) console.log(_cfg.const.settingsDirname + ' NOT found in ' + checkDir);
    if (checkDir === '/') {
      console.log('Couldn\'t find ' + _cfg.const.settingsDirname + '. Check if you\'re in the right directory.');
      return process.exit(1);
      // return false;
    }
    var newDir = path.join(checkDir + '/..');
    findConfig(newDir);
  }
}




var findConfig = function (checkDir) {
  // if (fs.existsSync(checkDir + '/' + _cfg.const.settingsDirname)) {
  //   if (debug) console.log(_cfg.const.settingsDirname + ' found in ' + checkDir + '\n');
  //
  //
  //   // use _cfg.resolved
  //   _cfg.paths.root = checkDir;
  //   _cfg.paths.app = checkDir
  //   _cfg.paths.settings = [checkDir, _cfg.const.settingsDirname].join('/');
  //
  //
  //   if (debug) console.log('\n', 'Parsing userdata');
  //   // _cfg.projectSettings = parseUserdata(_cfg.const.settingsDirname + '/' +  _cfg.const.projectSettingsFilename);
  //   // _cfg.localSettings = parseUserdata(_cfg.const.settingsDirname + '/' +  _cfg.const.localSettingsFilename);
  //
  //   _cfg.settings = parseSettings();
  //
  //   if (_cfg.userdata.launcher.dir) {
  //     _cfg.paths.app = checkDir + '/' + _cfg.userdata.launcher.dir;
  //   }
  //
  //   if (debug) console.log('\n', 'Config', _cfg);
  //   if (debug) console.log('---------------------------------------\n');
  //   return true;
  // } else {
  //   if (debug) console.log(_cfg.const.settingsDirname + ' NOT found in ' + checkDir);
  //   if (checkDir === '/') {
  //     console.log('Couldn\'t find ' + _cfg.const.settingsDirname + '. Check if you\'re in the right directory.');
  //     return process.exit(1);
  //     // return false;
  //   }
  //   var newDir = path.join(checkDir + '/..');
  //   findConfig(newDir);
  // }
};

if (debug) console.log('\n---------------------------------------');


var initialise = function () {
  // ntrc is a folder

  // parseConfigArg

  // ntrc = locateNTRC()
  // parseSettings(ntrc)
  // parseUserSettings(ntrc)
  // parseEnvVars(ntrc)




  findConfig(process.cwd().toString());
};


module.exports = _cfg;
module.exports.initialise = initialise;
