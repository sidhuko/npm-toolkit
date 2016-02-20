var args = require('nomnom')().parse();
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var readJson = require('./lib/readJson');

var chalk = require('chalk');

// console.log('------------------\n' + chalk.yellow('args object') + ':\n', args, '\n------------------\n');

var _cfg = {
  // constants - binding the fixed values and defaults
  const: {
    version: require('./package.json').version,
    settingsDirname: 'ntrc', // can be overridden by input from --config path/my-ntrc
    settingsDirnameAlias: 'ntrc-alias',
    projectSettingsFilename: 'settings.json',
    localSettingsFilename: 'settings.local.json'
  },

  // keep raw input of args here, use resolved object to parse them
  args: {
    debug: args.debug || args.d,// || false,
    config: args.config || args.c,
    env: args.env || args.e
  },

  // final paths to ntrc, root, settingsDirname
  resolved: {}
};







/**
  Breaks config path into object with parts
  Can parse raw --config argument

  Config switch should support:
  nt list --config=my-custom-ntrc
  nt list --config=~/my-project-path/app/ntrc
*/
var configPathToObject = function (location) {
  if (!location) {
    location = './ntrc';
  }

  // if path begins with '~' replace it with home directory
  if (location.charAt(0) === '~') {
    location = location.replace('~', process.env.HOME);
  }

  var tmpArray = path.resolve(location).split('/');

  return {
    settingsDirname: tmpArray.pop(),
    root: tmpArray.join('/')
  }
}






// var debug = _cfg.args.debug;
var debug = true;
// var debug = false;


/*
  Parses settings.json and settings.local.json in a given location
*/
var parseSettingsJson = function (dir) {
  if (debug) console.log('parseSettingsJson in "' + dir + '"');
  var projectSettingsPath = dir + '/' + _cfg.const.projectSettingsFilename;
  var localSettingsPath = dir + '/' + _cfg.const.localSettingsFilename;
  if (debug) console.log('projectSettingsPath', projectSettingsPath);
  if (debug) console.log('localSettingsPath', localSettingsPath);

  var settings = {};


  if (fs.existsSync(projectSettingsPath)) {
    console.log('projectSettingsPath exists');

    var projectSettings = readJson(projectSettingsPath);
    // console.log('projectSettings', projectSettings)
    settings = projectSettings;
  }

  //local
  if (fs.existsSync(localSettingsPath)) {
    console.log('localSettingsPath exists');

    settings.local = readJson(localSettingsPath);
    // console.log('localSettings', localSettings)
    // _.merge(settings, localSettings);
  }

  // console.log(settings);


  // setEnvVars(dir);
  // setEnvVars(settings);
  return settings;
};


/*
  Reads env.{env}.json files and sets appropriate env variables on the process

  @String path  Path to ntrc directory
*/
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


var locateNTRC = function (dir) {

  // ntrc lookup
  var _dirContainsNtrc = function (dir) {
    return fs.existsSync(dir.rootPath + '/' + _cfg.const.settingsDirname);
    //dir.settingsDirname
  }

  // ntrc alias lookup
  var _dirContainsNtrcAlias = function (dir) {
    return fs.existsSync(dir + '/' + _cfg.const.settingsDirnameAlias);
  }


  // IS THIS USEFUL? How do we detect that this matches ntrc structure? settings.json?
  // function _handleCaseIsNtrcDir (dir) {
  //   return false;
  // }

  // FOUND
  function _handleCaseNtrcFound (dir) {
    if (debug) console.log('ntrc found in', dir);
    if (debug) console.log(_cfg.const.settingsDirname + ' found in ' + dir + '\n');

    return dir;
  }

  function _handleCaseNtrcAliasFound (dir) {
    console.log('Alias found in', dir);
    var aliasDir = path.resolve(fs.readFileSync(path.join(dir, _cfg.const.settingsDirnameAlias)).toString().trim());
    console.log('Alias points to "' +  aliasDir + '"');
    return aliasDir;
  }

  // NOT FOUND
  function _handleCaseNotFound (dir) {
    if (debug) console.log(_cfg.const.settingsDirname + ' NOT found in ' + dir);
    if (dir === '/') {
      console.log('Couldn\'t find ' + _cfg.const.settingsDirname + '. Check if you\'re in the right directory.');
      // return process.exit(1);
      return false;
    }

    return locateNTRC(path.join(dir + '/..'));
  }



  if (_dirContainsNtrc(dir)) {
    return _handleCaseNtrcFound(dir);
  } else {
    if (_dirContainsNtrcAlias(dir)) {
      return _handleCaseNtrcAliasFound(dir);
    } else {
      return _handleCaseNotFound(dir)
    }
  }
}




var locateRoot = function (ntrc) {
  var resolved = path.join(_cfg.resolved.ntrc, (_cfg.settings.root || '..'));
  if (debug) console.log('Root set at', resolved);
  return resolved;
}




if (debug) console.log('\n---------------------------------------');


var initialise = function (dir) {
  // if (['status', 'list', 'info'].indexOf(taskArg) !== -1) ignoreErrors = true;
  var ntrcLocationObject = configPathToObject(dir);
  ntrcLocationAbsolute = ntrcLocationObject.root + '/' + ntrcLocationObject.settingsDirname;
  if (debug) console.log('Start location', ntrcLocationAbsolute);


  _cfg.resolved.ntrc = locateNTRC(ntrcLocationAbsolute);
  _cfg.resolved.settingsDirname = configPathToObject(_cfg.resolved.ntrc).settingsDirname;

  console.log('_cfg.resolved.ntrc', _cfg.resolved.ntrc);

  _cfg.settings = parseSettingsJson(_cfg.resolved.ntrc);

  _cfg.resolved.root = locateRoot(_cfg.resolved.ntrc);

  // parseEnvVars(_cfg.resolved.ntrc)


  // console.log('------------------\n' + chalk.green('_cfg object') + ':\n', _cfg, '\n------------------\n');
  return !!_cfg.resolved.ntrc;
};


module.exports = _cfg;
module.exports.initialise = initialise;
