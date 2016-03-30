var fs = require('fs');
var _ = require('lodash');
var removeFileExt = require('./removeFileExtension');
var debug = false;

// var loadTaskFunction = function (task) {}
// var loadTaskDefinition = function (task) {}
// var loadTaskFull = function (task) {}

var loadTasks = function (dir, load) {
  load = load || false;
  var tasks = {};

  if (dir) {
    if (debug && !load) console.log('[nt] Scanning tasks in', dir);
    var list = fs.readdirSync(dir + '/tasks');
    if (debug && !load) console.log('[nt] Finished scanning tasks');

    if (load && typeof load === 'string') {
      if (list.indexOf(load + '.js') === -1) {
        if (debug) console.log('[nt] Task', load, 'not found');
        return;
      } else {
        if (debug) console.log('[nt] Loading task:', load);
        return require(dir + '/tasks/' + load);
      }
    }

    return _.map(list, function (item) {return removeFileExt(item);});
  }


  return [];
};

module.exports = loadTasks;
