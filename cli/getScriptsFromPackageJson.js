var fs = require('fs-extra');
var _ = require('lodash');
var parseCliArgs = require('./parseCliArgs');

var args = parseCliArgs();
var verbose = args.opts.verbose;

// TODO: this used to scan folder - update
function getScriptsFromPackageJson(dir) {
  var print = {
    data: _.get(args, 'print.data', console.log),
    err: _.get(args, 'print.err', console.error),
  };

  if (dir) {
    if (verbose) print.data('[debug] Scanning tasks in', dir);
    var contents = fs.readJSONSync(dir);
    var list = contents.scripts;

    if (verbose) print.data('[debug] Finished scanning tasks');

    // if (load && typeof load === 'string') {
    //   if (list.indexOf(load + '.js') === -1) {
    //     if (verbose) print.data('[debug] Task', load, 'not found');
    //     return;
    //   } else {
    //     if (verbose) print.data('[debug] Loading task:', load);
    //     return require(dir + '/tasks/' + load);
    //   }
    // }
    return list;
  }


  return [];
};

module.exports = getScriptsFromPackageJson;
