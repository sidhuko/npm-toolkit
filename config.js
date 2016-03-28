var args = require('commander').parse(process.argv);
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var readJson = require('./lib/readJson');

var chalk = require('chalk');

var _cfg = {
  // constants - binding the fixed values and defaults
  const: {
    version: require('./package.json').version,
    settingsDirname: 'ntrc',
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
  resolved: {},
  initialised: false
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
  };
};






// var debug = _cfg.args.debug;
// var debug = true;
var debug = false;


/*
  Parses settings.json and settings.local.json in a given location
*/
var parseSettingsJson = function (dir) {
  if (debug) console.log('[nt] parseSettingsJson in "' + dir + '"');
  var projectSettingsPath = dir + '/' + _cfg.const.projectSettingsFilename;
  var localSettingsPath = dir + '/' + _cfg.const.localSettingsFilename;
  if (debug) console.log('[nt] projectSettingsPath', projectSettingsPath);
  if (debug) console.log('[nt] localSettingsPath', localSettingsPath);

  var settings = {};


  if (fs.existsSync(projectSettingsPath)) {
    if (debug) console.log('[nt] projectSettingsPath exists');

    var projectSettings = readJson(projectSettingsPath);
    // console.log('projectSettings', projectSettings)
    settings = projectSettings;
  }

  //local
  if (fs.existsSync(localSettingsPath)) {
    if (debug) console.log('[nt] localSettingsPath exists');

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
 * - env specific vars
 * - local overrides to base vars,
 * - local overrides to env specific vars
 *
 * This ordering allows you to override anything from your local settings
 *
 * @param {string} env - Environment variant to use
 * @return {object} Flattened env vars object
 */
var getFlattenedEnvVarsFromSettings = function (env) {
  var fullVarsObject = {};

  // Read base env vars
  var baseVars = _.get(_cfg, 'settings.env._', {});
  var envVars = _.get(_cfg, 'settings.env.' + env, {});

  // Read local overrides
  var baseVarsLocal = _.get(_cfg, 'settings.local.env._', {});
  var envVarsLocal = _.get(_cfg, 'settings.local.env.' + env, {});

  // Merge it all
  _.merge(fullVarsObject, baseVars);
  _.merge(fullVarsObject, envVars);

  _.merge(fullVarsObject, baseVarsLocal);
  _.merge(fullVarsObject, envVarsLocal);

  return fullVarsObject;
};


/**
 * Sets env vars for specified env
 * @param {string} env - Environment variant to use
 */
var setEnvVars = function (env) {
  var envVars = getFlattenedEnvVarsFromSettings(env);

  Object.keys(envVars).forEach(function (key) {
    if (process.env[key]) {
      if (debug) console.log(chalk.grey('[nt] Overwriting environment variable', key, '(' + process.env[key], '->', envVars[key] + ')'));
    } else {
      if (debug) console.log(chalk.grey('[nt] Setting environment variable', key, '(' + envVars[key] + ')'));
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
    return fs.existsSync(dir + '/' + _cfg.const.settingsDirname);
  };

  // ntrc alias lookup
  var _dirContainsNtrcAlias = function (dir) {
    return fs.existsSync(dir + '/' + _cfg.const.settingsDirnameAlias);
  };


  // IS THIS USEFUL? How do we detect that this matches ntrc structure? settings.json?
  // function _handleCaseIsNtrcDir (dir) {
  //   return false;
  // }

  // FOUND
  function _handleCaseNtrcFound (dir) {
    if (debug) if (debug) console.log('[nt] ' + _cfg.const.settingsDirname + ' found in ' + dir + '\n');

    return dir + '/' + _cfg.const.settingsDirname;
  }

  function _handleCaseNtrcAliasFound (dir) {
    var aliasContent = fs.readFileSync(path.join(dir, _cfg.const.settingsDirnameAlias)).toString().trim();
    var aliasDest = path.resolve(dir, aliasContent);

    if (debug) console.log('[nt] Alias found in "' + dir + '", it points to "' +  aliasDest + '"');

    return aliasDest;
  }

  // NOT FOUND
  function _handleCaseNotFound (dir) {
    if (debug) console.log('[nt] ' + _cfg.const.settingsDirname + ' NOT found in ' + dir);
    if (dir === '/') {
      if (args[0] && (args[0] === 'init' || args[0] === 'status')) {
        return false;
      }
      console.log('[nt] Couldn\'t find ' + _cfg.const.settingsDirname + '. Check if you\'re in the right directory.');
      console.log('[nt] You can also initialise a new project here by typing "nt init"');
      return process.exit(1);
    }

    return locateNTRC(path.join(dir + '/..'));
  }



  if (_dirContainsNtrc(dir)) {
    return _handleCaseNtrcFound(dir);
  } else {
    if (_dirContainsNtrcAlias(dir)) {
      return _handleCaseNtrcAliasFound(dir);
    } else {
      return _handleCaseNotFound(dir);
    }
  }
};



/**
 * Resolves project root based on "root" property specified in settings.JSON
 * If "root" property is not specified a folder above ntrc is assumed as default
 *
 * @param {string} ntrc - Path to ntrc directory
 * @return {string} Resolved root path
 */
var locateRoot = function (ntrc) {
  var resolved = path.join(_cfg.resolved.ntrc, (_cfg.settings.root || '..'));
  if (debug) console.log('[nt] Root set at', resolved);
  return resolved;
};




if (debug) console.log('\n---------------------------------------');


/**
 * Initialises config, starting in directory passed in
 * Kicks off locateNTRC to find a valid NTRC path to use
 *
 * @param {string} dir - Directory to start lookup in
 * @return {bool} Indicates whether a valid NTRC folder has been located
 */
var initialise = function (dir) {
  if (_cfg.initialised) {
    return true;
  }
  if (_cfg.args.config) {
    console.log('[nt] Config argument provided, jumping to', _cfg.args.config);
    dir = _cfg.args.config;
  }

  // if (['status', 'list', 'info'].indexOf(taskArg) !== -1) ignoreErrors = true;
  var ntrcLocationObject = configPathToObject(dir);
  ntrcLocationAbsolute = ntrcLocationObject.root + '/' + ntrcLocationObject.settingsDirname;
  if (debug) console.log('[nt] Start location', ntrcLocationAbsolute);


  _cfg.resolved.ntrc = locateNTRC(ntrcLocationAbsolute);

  if (_cfg.resolved.ntrc) {
    _cfg.resolved.settingsDirname = configPathToObject(_cfg.resolved.ntrc).settingsDirname;

    if (debug) console.log('[nt] _cfg.resolved.ntrc', _cfg.resolved.ntrc);

    _cfg.settings = parseSettingsJson(_cfg.resolved.ntrc);

    _cfg.resolved.root = locateRoot(_cfg.resolved.ntrc);

    if (debug) console.log('[nt] _cfg.args.env', _cfg.args.env);
    setEnvVars(_cfg.args.env);
  }

  _cfg.initialised = true;
  // console.log('------------------\n' + chalk.green('_cfg object') + ':\n', _cfg, '\n------------------\n');
  return !!_cfg.resolved.ntrc;
};


module.exports = _cfg;
module.exports.initialise = initialise;
