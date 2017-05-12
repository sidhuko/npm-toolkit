var fs = require('fs');
var _ = require('lodash');
var removeFileExt = require('./removeFileExtension');
var parseCliArgs = require('./parseCliArgs');

var args = parseCliArgs();
var verbose = args.opts.verbose;

function loadTasksFromDir(dir, load) {
  load = load || false;
  var tasks = {};

  if (dir) {
    if (verbose && !load) console.log('[nt] Scanning tasks in', dir);
    var list = fs.readdirSync(dir + '/tasks');
    if (verbose && !load) console.log('[nt] Finished scanning tasks');

    if (load && typeof load === 'string') {
      if (list.indexOf(load + '.js') === -1) {
        if (verbose) console.log('[nt] Task', load, 'not found');
        return;
      } else {
        if (verbose) console.log('[nt] Loading task:', load);
        return require(dir + '/tasks/' + load);
      }
    }

    return _.map(list, function (item) {return removeFileExt(item);});
  }


  return [];
};

module.exports = loadTasksFromDir;
