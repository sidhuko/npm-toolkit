var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var chalk = require('chalk');
var readJson = require('./lib/readJson');
var parseCliArgs = require('./lib/parseCliArgs');
var args, verbose, print;

var _cfg = {
  // constants - binding the fixed values and defaults
  const: {
    version: require('./package.json').version,
    projectSettingsFilename: 'settings.json',
    localSettingsFilename: 'settings.local.json'
  },

  opts: null,

  resolved: {},
  initialised: false
};



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
    settingsDirname: 'ntrc',
    root: path.resolve(location)
  };
};



/**
 * Parses settings.json and settings.local.json in a given location
 */
var parseSettingsJson = function (dir) {
  var projectSettingsPath = dir + '/' + _cfg.const.projectSettingsFilename;
  var localSettingsPath = dir + '/' + _cfg.const.localSettingsFilename;

  var settings = {};

  if (fs.existsSync(projectSettingsPath)) {
    settings = readJson(projectSettingsPath);
  }

  if (fs.existsSync(localSettingsPath)) {
    settings.local = readJson(localSettingsPath);
  }

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
      if (verbose) print.data(chalk.grey('[debug] Overwriting environment variable', key + ':', process.env[key], '->', envVars[key]));
    } else {
      if (verbose) print.data(chalk.grey('[debug] Setting environment variable', key + ':', envVars[key]));
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
    return fs.existsSync(dir + '/ntrc');
  };

  var _dirContainsNtrcAlias = function (dir) {
    return fs.existsSync(dir + '/ntrc-alias');
  };

  // FOUND
  function _handleCaseNtrcFound (dir) {
    if (verbose) print.data('[debug] ntrc found in ' + dir);

    return dir + '/ntrc';
  }

  // ALIAS FOUND
  function _handleCaseNtrcAliasFound (dir) {
    var aliasContent = fs.readFileSync(dir + '/ntrc-alias').toString().trim();
    var aliasDest = path.resolve(dir, aliasContent);

    if (verbose) print.data('[debug] Alias found in ' + dir + '. Jumping to ' + aliasDest);

    return aliasDest;
  }

  // NOT FOUND
  function _handleCaseNotFound (dir) {
    if (verbose) print.data('[debug] ntrc NOT found in ' + dir);
    if (dir === '/') {
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
  if (verbose) print.data('[debug] Project root set at', resolved);
  return resolved;
};



/**
 * Initialises config, starting in directory passed in
 * Kicks off locateNTRC to find a valid NTRC path to use
 *
 * @param {string} args - args object
 * @return {bool} Indicates whether a valid NTRC folder has been located
 */
var initialise = function (args) {
  if (_cfg.initialised) {
    return true;
  }
  args = args || parseCliArgs();
  verbose = args.opts.verbose || false;
  _cfg.opts = args.opts;

  // Bind print options
  print = {
    data: _.get(args, 'print.data', console.log),
    err: _.get(args, 'print.err', console.error),
  };

  var dir;
  if (_.get(args, 'opts.cwd')) {
    print.data('cwd argument provided, switching to:', args.opts.cwd);
    dir = args.opts.cwd;
  }

  var ntrcLocationObject = resolveConfigPath(dir);
  _cfg.resolved.ntrc = locateNTRC(ntrcLocationObject.root);

  if (_cfg.resolved.ntrc) {
    _cfg.resolved.settingsDirname = resolveConfigPath(_cfg.resolved.ntrc).settingsDirname;

    _cfg.settings = parseSettingsJson(_cfg.resolved.ntrc);

    _cfg.resolved.root = locateRoot(_cfg.resolved.ntrc);

    if (verbose) print.data('[debug] Environment:', args.opts.env || 'not specified');
    setEnvVars(args.opts.env);
  }

  _cfg.initialised = !!_cfg.resolved.ntrc;
  return !!_cfg.resolved.ntrc;
};

module.exports = _cfg;
module.exports.initialise = initialise;
