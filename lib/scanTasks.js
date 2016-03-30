var fs = require('fs');
var _ = require('lodash');
var removeFileExt = require('./removeFileExtension');
var debug = true;

var loadTask = function (task) {

}

var scanTasks = function (dir, load) {
  load = load || false;
  var tasks = {};

  if (dir) {
    if (debug && !load) console.log('[nt] Scanning tasks in', dir);
    var list = fs.readdirSync(dir + '/tasks');
    if (debug && !load) console.log('[nt] Finished scanning tasks');

    if (load && typeof load === 'string') {
      // load only the specified task
      if (debug) console.log('[nt] Loading task:', load);
      return require(dir + '/tasks/' + load);
    }

    return _.map(list, function (item) {return removeFileExt(item);});
  }


  return [];
};

module.exports = scanTasks;
