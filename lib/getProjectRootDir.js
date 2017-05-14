var path = require('path');

/**
 * Resolves project root directory (looks for package.json)
 *
 * @return {string} A resolved root path
 */
module.exports = function getProjectRootDir(packageJsonLocation, args) {
  var root = path.join(packageJsonLocation, '..');
  if (args.opts.verbose) args.print.data('[debug] Project root set at ' + root);
  return root;
};
