var _ = require('lodash');
var loadTasksFromDir = require('./loadTasksFromDir');
var config = require('../config');

/**
 * This is to be used to decorate imported tasks
 * Turns a function into a new task format.
 */
function loadTask (task) {
  var rtn;
  if (typeof task === 'function') {
    rtn = {fn: task};
  }
  if (typeof task === 'string') {
    rtn = {fn: require(task)};
  }
  return rtn;
}

/** Task-matcher */
var dispatcher = function (args) {
  config.initialise(args);
  var ntrcFound = config.resolved.ntrc;
  var task = args.cmd[0];
  var taskObj = null;

  if (task === 'version') {
    taskObj = loadTask('../systemtasks/version');
  }

  if (task === 'help') {
    taskObj = loadTask('../systemtasks/help');
  }

  if (task === 'status') {
    taskObj = loadTask('../systemtasks/status');
  }

  if (!ntrcFound && !taskObj) {
    return console.error('Couldn\'t find ntrc directory.');
  }

  if (ntrcFound) {
    if (task === 'ls' || task === 'list') {
      taskObj = loadTask('../systemtasks/list');
    }

    // scan for tasks then load appropriate one
    if (task && !taskObj && ntrcFound) {
      var taskList = loadTasksFromDir(config.resolved.ntrc);
      if (taskList.indexOf(args.cmd[0]) !== -1) {
        taskObj = {fn: loadTasksFromDir(config.resolved.ntrc, args.cmd[0])};
      }
    }
  }

  // execute if task is a system task
  if (taskObj !== null) {
    return taskObj.fn(args.opts, args.cmd);
  }

  if (!task) {
    if (ntrcFound) {
      taskObj = loadTask('../systemtasks/cli');
    } else {
      taskObj = loadTask(function () {
        return console.log('Task not specified / ntrc folder not found');
      });
    }
  }




  if (!taskObj || !taskObj.fn || typeof taskObj.fn !== 'function') {
    return console.log('[nt] Task "' + task + '" not registered\n');
  }

  return taskObj.fn(args.opts, args.cmd);
};

module.exports = dispatcher;
