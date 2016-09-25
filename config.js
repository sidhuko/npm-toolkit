var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var chalk = require('chalk');
var readJson = require('./lib/readJson');
var parseCliArgs = require('./lib/parseCliArgs');
var Helpers = require('./lib/helpers');
var args = parseCliArgs();

var _cfg = {
  // constants - binding the fixed values and defaults
  const: {
    version: require('./package.json').version,
    settingsDirname: 'ntrc',
    settingsDirnameAlias: 'ntrc-alias',
    projectSettingsFilename: 'settings.json',
    localSettingsFilename: 'settings.local.json'
  },

  opts: args.opts,

  // final paths to ntrc, root, settingsDirname
  resolved: {},
  initialised: false
};

var verbose = _cfg.opts.verbose;



/**
 * Breaks config path into object with parts
 */
var resolveConfigPath = function (location) {
  if (!location) {
    location = './';
  }

  // if path begins with '~' replace it with home directory
  if (location.charAt(0) === '~') {
    location = location.replace('~', process.env.HOME);
  }

  return {
    settingsDirname: _cfg.const.settingsDirname,
    root: path.resolve(location)
  };
};



/**
 * Parses settings.json and settings.local.json in a given location
 */
var parseSettingsJson = function (dir) {
  if (verbose) console.log('[nt] Trying to parse settings in ' + dir);
  var projectSettingsPath = dir + '/' + _cfg.const.projectSettingsFilename;
  var localSettingsPath = dir + '/' + _cfg.const.localSettingsFilename;

  var settings = {};

  if (fs.existsSync(projectSettingsPath)) {
    if (verbose) console.log('[nt] ' + projectSettingsPath + ' exists');
    settings = readJson(projectSettingsPath);
  }

  if (fs.existsSync(localSettingsPath)) {
    if (verbose) console.log('[nt] ' + localSettingsPath + ' exists');
    settings.local = readJson(localSettingsPath);
  }

  // console.log(settings);
  return settings;
};



/**
 * Merges the env vars in the following order:
 * - base vars
 * - local overrides to base vars,
 * - env specific vars
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
  _.merge(fullVarsObject, baseVarsLocal);

  _.merge(fullVarsObject, envVars);
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
      if (verbose) console.log(chalk.grey('[nt] Overwriting environment variable', key + ':', process.env[key], '->', envVars[key]));
    } else {
      if (verbose) console.log(chalk.grey('[nt] Setting environment variable', key + ':', envVars[key]));
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
  var _dirContainsNtrc = function (dir) {
    return fs.existsSync(dir + '/' + _cfg.const.settingsDirname);
  };

  var _dirContainsNtrcAlias = function (dir) {
    return fs.existsSync(dir + '/' + _cfg.const.settingsDirnameAlias);
  };

  // FOUND
  function _handleCaseNtrcFound (dir) {
    if (verbose) console.log('[nt] ' + _cfg.const.settingsDirname + ' found in ' + dir);

    return dir + '/' + _cfg.const.settingsDirname;
  }

  // ALIAS FOUND
  function _handleCaseNtrcAliasFound (dir) {
    var aliasContent = fs.readFileSync(path.join(dir, _cfg.const.settingsDirnameAlias)).toString().trim();
    var aliasDest = path.resolve(dir, aliasContent);

    if (verbose) console.log('[nt] Alias found in ' + dir + '. Jumping to ' + aliasDest);

    return aliasDest;
  }

  // NOT FOUND
  function _handleCaseNotFound (dir) {
    if (verbose) console.log('[nt] ' + _cfg.const.settingsDirname + ' NOT found in ' + dir);
    if (dir === '/') {
      if (args.args[0] && (args.args[0] === 'init' || args.args[0] === 'status')) {
        return false;
      }
      console.log('Couldn\'t find ' + _cfg.const.settingsDirname + ' directory. Check if you\'re in the right location.');
      console.log('You can also initialise a new project here by typing "nt init"');
      return process.exit(0);
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
 * @return {string} A resolved root path
 */
var locateRoot = function (ntrc) {
  var resolved = path.join(_cfg.resolved.ntrc, (_cfg.settings.root || '..'));
  if (verbose) console.log('[nt] Project root set at', resolved);
  return resolved;
};



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

  if (verbose) Helpers.printLine();

  if (_cfg.opts.config) {
    console.log('[nt] Config argument provided, jumping to', _cfg.opts.config);
    dir = _cfg.opts.config;
  }

  var ntrcLocationObject = resolveConfigPath(dir);
  _cfg.resolved.ntrc = locateNTRC(ntrcLocationObject.root);

  if (_cfg.resolved.ntrc) {
    _cfg.resolved.settingsDirname = resolveConfigPath(_cfg.resolved.ntrc).settingsDirname;

    // if (verbose) console.log('[nt] _cfg.resolved.ntrc', _cfg.resolved.ntrc);

    _cfg.settings = parseSettingsJson(_cfg.resolved.ntrc);

    _cfg.resolved.root = locateRoot(_cfg.resolved.ntrc);

    if (verbose) console.log('[nt] Environment:', _cfg.opts.env || 'not specified');
    setEnvVars(_cfg.opts.env);
  }

  _cfg.initialised = !!_cfg.resolved.ntrc;
  // console.log('------------------\n' + chalk.green('_cfg object') + ':\n', _cfg, '\n------------------\n');
  return !!_cfg.resolved.ntrc;
};

initialise();

module.exports = _cfg;
module.exports.initialise = function () {
  console.trace('Don\'t use config.initialise explicitly, the config will initialise itself');
};
