var fs = require('fs-extra');

/**
 * Locates the package.json in specified Location
 * Keeps going up in the filesystem until package.json is found or returns false
 *
 * @param {string} dir - Directory to look in
 * @return {mixed} (string) directory or (bool) false
 */
function locatePackageJson (dir, args) {
  var _dirContainsPackage = function (dir) {
    return fs.existsSync(dir + '/package.json');
  };

  var _dirContainsAlias = function (dir) {
    return fs.existsSync(dir + '/ntrc-alias');
  };

  // FOUND
  function _handleCaseFound (dir) {
    if (args.opts.verbose) args.print.data('[debug] package.json found in ' + dir);

    return dir + '/package.json';
  }

  // ALIAS FOUND
  function _handleCaseAliasFound (dir) {
    var aliasContent = fs.readFileSync(dir + '/ntrc-alias').toString().trim();
    var aliasDest = path.resolve(dir, aliasContent);

    if (args.opts.verbose) args.print.data('[debug] Alias found in ' + dir + '. Jumping to ' + aliasDest);

    // return aliasDest;
    return locatePackageJson(aliasDest);
  }

  // NOT FOUND
  function _handleCaseNotFound (dir) {
    if (args.opts.verbose) args.print.data('[debug] package.json not found in ' + dir);
    if (dir === '/') {
      return false;
    }

    return locatePackageJson(path.join(dir + '/..'));
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

module.exports = locatePackageJson;
