var fs = require('fs-extra');
var _ = require('lodash');
var _mapPrintFn = require('./_mapPrintFn');

function getScriptsFromPackageJson(dir, args) {
  var print = _mapPrintFn(args);
  var verbose = _.get(args, 'opts.verbose');

  if (dir) {
    if (verbose) print.data('[debug] Scanning tasks in', dir);
    var contents = fs.readJSONSync(dir);
    var list = contents.scripts;

    if (verbose) print.data('[debug] Finished scanning tasks');

    return list;
  }


  return [];
};

module.exports = getScriptsFromPackageJson;
