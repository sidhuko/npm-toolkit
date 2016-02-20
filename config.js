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


/**
 * Merges the env vars in the following order:
 * - base vars
 * - local overrides to base vars,
 * - env specific vars
 * - local overrides to env specific vars
 *
 * @param {string} env - Environment variant to use
 * @return {object} Flattened env vars object
 */
var getFlattenedEnvVarsFromSettings = function (env) {
  var fullVarsObject = {};

  // Read base env vars
  var baseEnvVars = _.get(_cfg, 'settings.env._', {});
  var baseEnvVarsLocal = _.get(_cfg, 'settings.local.env._', {});

  // Read specific env vars
  var specificEnvVars = _.get(_cfg, 'settings.env.' + env, {});
  var specificEnvVarsLocal = _.get(_cfg, 'settings.local.env.' + env, {});

  // Merge it all
  _.merge(fullVarsObject, baseEnvVars);
  _.merge(fullVarsObject, baseEnvVarsLocal);

  _.merge(fullVarsObject, specificEnvVars);
  _.merge(fullVarsObject, specificEnvVarsLocal);

  return fullVarsObject;
}


/**
 * Sets env vars for specified env
 * @param {string} env - Environment variant to use
 */
var setEnvVars = function (env) {
  var envVars = getFlattenedEnvVarsFromSettings(env);

  Object.keys(envVars).forEach(function (key) {
    if (process.env[key]) {
      console.log(chalk.grey('Overwriting environment variable', key, '(' + process.env[key], '->', envVars[key] + ')'));
    } else {
      console.log(chalk.grey('Setting environment variable', key, '(' + envVars[key] + ')'));
    }
    process.env[key] = envVars[key];
  });
};




/**
 * Locates the NTRC folder in specified Location
 * Keeps going up in the filesystem until valid ntrc is found or false is returned
 *
 * @param {string} dir - Directory to look in
 * @return {mixed} (string) directory or (bool) false
 */
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

    var aliasContent = fs.readFileSync(path.join(dir, _cfg.const.settingsDirnameAlias)).toString().trim();
    var aliasDest = path.resolve(dir, aliasContent);

    console.log('Alias points to "' +  aliasDest + '"');

    return aliasDest;
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



/**
 * Resolves project root based on "root" property specified in settings.JSON
 * If "root" property is not specified a folder above ntrc is assumed as default
 *
 * @param {string} ntrc - Path to ntrc directory
 * @return {string} Resolved root path
 */
var locateRoot = function (ntrc) {
  var resolved = path.join(_cfg.resolved.ntrc, (_cfg.settings.root || '..'));
  if (debug) console.log('Root set at', resolved);
  return resolved;
}




if (debug) console.log('\n---------------------------------------');


/**
 * Initialises config, starting in directory passed in
 * Kicks off locateNTRC to find a valid NTRC path to use
 *
 * @param {string} dir - Directory to start lookup in
 * @return {bool} Indicates whether a valid NTRC folder has been located
 */
var initialise = function (dir) {
  if (_cfg.args.config) {
    console.log('Config argument provided, skipping to', _cfg.args.config);
    dir = _cfg.args.config;
  }

  // if (['status', 'list', 'info'].indexOf(taskArg) !== -1) ignoreErrors = true;
  var ntrcLocationObject = configPathToObject(dir);
  ntrcLocationAbsolute = ntrcLocationObject.root + '/' + ntrcLocationObject.settingsDirname;
  if (debug) console.log('Start location', ntrcLocationAbsolute);


  _cfg.resolved.ntrc = locateNTRC(ntrcLocationAbsolute);

  if (_cfg.resolved.ntrc) {
    _cfg.resolved.settingsDirname = configPathToObject(_cfg.resolved.ntrc).settingsDirname;

    if (debug) console.log('_cfg.resolved.ntrc', _cfg.resolved.ntrc);

    _cfg.settings = parseSettingsJson(_cfg.resolved.ntrc);

    _cfg.resolved.root = locateRoot(_cfg.resolved.ntrc);

    console.log('_cfg.args.env', _cfg.args.env);
    setEnvVars(_cfg.args.env);
  }


  // console.log('------------------\n' + chalk.green('_cfg object') + ':\n', _cfg, '\n------------------\n');
  return !!_cfg.resolved.ntrc;
};


module.exports = _cfg;
module.exports.initialise = initialise;
