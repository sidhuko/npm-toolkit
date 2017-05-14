var _ = require('lodash');
var _mapPrintFn = require('./_mapPrintFn');
var readJson = require('./readJson');

function getScriptsFromPackageJson(dir, args) {
  var print = _mapPrintFn(args);
  var verbose = _.get(args, 'opts.verbose');

  if (dir) {
    if (verbose) print.data('[debug] Scanning tasks in', dir);
    var contents = readJson(dir);
    var list = contents.scripts;

    if (verbose) print.data('[debug] Finished scanning tasks');

    return list;
  }


  return [];
};

module.exports = getScriptsFromPackageJson;
