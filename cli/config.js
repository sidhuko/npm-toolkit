var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var chalk = require('chalk');
var parseCliArgs = require('./parseCliArgs');

var locatePackageJson = require('../lib/locatePackageJson');
var resolvePath = require('../lib/resolvePath');
var getProjectRootDir = require('../lib/getProjectRootDir');
var applyEnvVars = require('../lib/applyEnvVars');
var _mapPrintFn = require('../lib/_mapPrintFn');

var _cfg = {
  ntVersion: require('../package.json').version,
  initialised: false
};

/**
 * Initialises config, starting in directory passed in
 * Locates package.json
 *
 * @param {string} args - args object
 * @return {bool} Indicates whether a valid NTRC folder has been located
 */
var initialise = function (argsIn) {
  if (_cfg.initialised) {
    return true;
  }
  var args = argsIn || parseCliArgs();
  args.opts.verbose = args.opts.verbose || false;

  args.print = _mapPrintFn(args);

  var dir;
  if (_.get(args, 'opts.cwd')) {
    args.print.data('cwd argument provided, switching to:', args.opts.cwd);
    dir = args.opts.cwd;
  }

  _cfg.packageJson = locatePackageJson(resolvePath(dir), args);

  if (_cfg.packageJson) {
    _cfg.projectRoot = getProjectRootDir(_cfg.packageJson, args);
    if (args.opts.verbose) args.print.data('[debug] Environment:', args.opts.env || 'not specified');
    applyEnvVars(args.opts.env);
  }

  _cfg.initialised = !!_cfg.packageJson;
  return _cfg.initialised;
};

module.exports = _cfg;
module.exports.initialise = initialise;
