var fs = require('fs-extra');
var _ = require('lodash');

function getScriptsFromPackageJson(dir, args) {
  var print = {
    data: _.get(args, 'print.data', console.log),
    err: _.get(args, 'print.err', console.error),
  };
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
