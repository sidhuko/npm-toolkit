var _ = require('lodash');
var loadTasks = require('./loadTasks');
var parseCliArgs = require('./parseCliArgs');
var config = require('../config');

/**
 * This is to be used to decorate imported tasks
 * Turns a function into a new task format.
 */
var loadTask = function (task, path) {
  var rtn;
  path = path || '';
  if (typeof task === 'function') {
    return {fn: task};
  }
  if (typeof task === 'string') {
    rtn = {fn: require(path + task)};
  }

  // if (fs.existsSync(path + task + '.def')) {
  //   // readDefinitionData here
  // }
  return rtn;
};

var loadSystemTask = function (filename) {
  return loadTask(filename, '../tasks/');
};

/** A custom task-matching adapter. */
// TODO: fluffy match
var dispatcher = function (task) {
  var taskObj = null;
  var args = parseCliArgs();

  task = task || args.args[0];

  if (task === 'version') {
    taskObj = loadSystemTask('version');
  }

  if (task === 'help') {
    taskObj = loadSystemTask('help');
  }

  if (task === 'init') {
    taskObj = loadSystemTask('init');
  }

  if (task === 'status') {
    taskObj = loadSystemTask('status');
  }

  if (task === 'ls' || task === 'list') {
    taskObj = loadSystemTask('list');
  }

  // if (args.task === 'install') {
  //   taskObj = loadSystemTask('install');
  // }

  // execute if task is a system task
  if (taskObj !== null) {
    return taskObj.fn(args.opts, args.args);
  }

  // load project tasks now
  if (!taskObj) {
    var ntrcFound = config.resolved.ntrc;
  }

  if (!task) {
    if (ntrcFound) {
      taskObj = loadSystemTask('cli');
    } else {
      taskObj = loadTask(function () {
        return console.log('Task not specified / ntrc folder not found');
      });
    }
  }

  // scan for tasks then load appropriate one
  if (task && !taskObj && ntrcFound) {
    var taskList = loadTasks(config.resolved.ntrc);
    if (taskList.indexOf(task) !== -1) {
      taskObj = {fn: loadTasks(config.resolved.ntrc, task)};
    }
  }

  if (!taskObj || !taskObj.fn || typeof taskObj.fn !== 'function') {
    return console.log('[nt] Task "' + task + '" not registered\n');
  }

  return taskObj.fn(args.opts, args.args);
};

module.exports = dispatcher;
