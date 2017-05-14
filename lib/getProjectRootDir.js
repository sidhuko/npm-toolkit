var _ = require('lodash');
var path = require('path');
var locatePackageJson = require('./locatePackageJson');
/**
 * Resolves project root directory (looks for package.json)
 *
 * @return {string} A resolved root path
 */
module.exports = function getProjectRootDir(dir, args) {
  var isVerbose = _.get(args, 'opts.verbose');
  var packageJsonLocation = locatePackageJson(dir, args);
  var root = path.join(packageJsonLocation, '..');
  if (isVerbose) args.print.data('[debug] Project root set at ' + root);
  return root;
};
