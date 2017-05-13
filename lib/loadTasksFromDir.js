var fs = require('fs');
var _ = require('lodash');
var removeFileExt = require('./removeFileExtension');
var parseCliArgs = require('./parseCliArgs');

var args = parseCliArgs();
var verbose = args.opts.verbose;


function loadTasksFromDir(dir, load) {
  load = load || false;
  var tasks = {};
  // Bind print options
  var print = {
    data: _.get(args, 'print.data', console.log),
    err: _.get(args, 'print.err', console.error),
  };

  if (dir) {
    if (verbose && !load) print.data('[debug] Scanning tasks in', dir);
    var list = fs.readdirSync(dir + '/tasks');
    if (verbose && !load) print.data('[debug] Finished scanning tasks');

    if (load && typeof load === 'string') {
      if (list.indexOf(load + '.js') === -1) {
        if (verbose) print.data('[debug] Task', load, 'not found');
        return;
      } else {
        if (verbose) print.data('[debug] Loading task:', load);
        return require(dir + '/tasks/' + load);
      }
    }

    return _.map(list, function (item) {return removeFileExt(item);});
  }


  return [];
};

module.exports = loadTasksFromDir;
