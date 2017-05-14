var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var chalk = require('chalk');
var readJson = require('./lib/readJson');
var parseCliArgs = require('./lib/parseCliArgs');
var args, verbose, print;

var _cfg = {
  ntVersion: require('./package.json').version,
  args: null,
  initialised: false
};


/**
 * Breaks config path into object with parts
 */
var resolvePath = function (location) {
  if (!location) {
    location = './';
  }

  // if path begins with '~' replace it with home directory
  if (location.charAt(0) === '~') {
    location = location.replace('~', process.env.HOME);
  }

  return path.resolve(location);
};



/**
 * Fetches the env vars defined in .env.[key] file (i.e. .env.qa)
 *
 * @param {string} env - Environment variant to use
 * @return {object} Flattened env vars object
 */
var getEnvVars = function (env) {
  // Locate root dir with package.json

  return {};
};



/**
 * Sets env vars for specified env
 * @param {string} env - Environment variant to use
 */
var setEnvVars = function (env) {
  var envVars = getEnvVars(env);

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
 * Locates the package.json in specified Location
 * Keeps going up in the filesystem until package.json is found or returns false
 *
 * @param {string} dir - Directory to look in
 * @return {mixed} (string) directory or (bool) false
 */
var locatePackage = function (dir) {
  var _dirContainsPackage = function (dir) {
    return fs.existsSync(dir + '/package.json');
  };

  var _dirContainsAlias = function (dir) {
    return fs.existsSync(dir + '/ntrc-alias');
  };

  // FOUND
  function _handleCaseFound (dir) {
    if (verbose) print.data('[debug] package.json found in ' + dir);

    return dir + '/package.json';
  }

  // ALIAS FOUND
  function _handleCaseAliasFound (dir) {
    var aliasContent = fs.readFileSync(dir + '/ntrc-alias').toString().trim();
    var aliasDest = path.resolve(dir, aliasContent);

    if (verbose) print.data('[debug] Alias found in ' + dir + '. Jumping to ' + aliasDest);

    // return aliasDest;
    return locatePackage(aliasDest);
  }

  // NOT FOUND
  function _handleCaseNotFound (dir) {
    if (verbose) print.data('[debug] package.json not found in ' + dir);
    if (dir === '/') {
      return false;
    }

    return locatePackage(path.join(dir + '/..'));
  }

  if (_dirContainsPackage(dir)) {
    return _handleCaseFound(dir);
  } else {
    if (_dirContainsAlias(dir)) {
      return _handleCaseAliasFound(dir);
    } else {
      return _handleCaseNotFound(dir);
    }
  }
};



/**
 * Resolves directory in which package.json is located
 *
 * @return {string} A resolved root path
 */
var locateRoot = function () {
  var root = path.join(_cfg.packageJson, '..');
  if (verbose) print.data('[debug] Project root set at ' + root);
  return root;
};



/**
 * Initialises config, starting in directory passed in
 * Kicks off locatePackage to find a valid NTRC path to use
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
  _cfg.args = args;

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

  _cfg.packageJson = locatePackage(resolvePath(dir));

  if (_cfg.packageJson) {
    _cfg.projectRoot = locateRoot(_cfg.packageJson);
    if (verbose) print.data('[debug] Environment:', args.opts.env || 'not specified');
    setEnvVars(args.opts.env);
  }

  _cfg.initialised = !!_cfg.packageJson;
  return _cfg.initialised;
};

module.exports = _cfg;
module.exports.initialise = initialise;
