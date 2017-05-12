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
  var taskObj = null;

  if (args.cmd[0] === 'version') {
    taskObj = loadTask('../systemtasks/version');
  }

  if (args.cmd[0] === 'help') {
    taskObj = loadTask('../systemtasks/help');
  }

  if (args.cmd[0] === 'init') {
    taskObj = loadTask('../systemtasks/init');
  }

  if (args.cmd[0] === 'status') {
    taskObj = loadTask('../systemtasks/status');
  }

  if (args.cmd[0] === 'ls' || args.cmd[0] === 'list') {
    taskObj = loadTask('../systemtasks/list');
  }

  // execute if task is a system task
  if (taskObj !== null) {
    return taskObj.fn(args.opts, args.cmd);
  }

  // load project tasks now
  if (!taskObj) {
    var ntrcFound = config.resolved.ntrc;
  }

  if (!args.cmd[0]) {
    if (ntrcFound) {
      taskObj = loadTask('../systemtasks/cli');
    } else {
      taskObj = loadTask(function () {
        return console.log('Task not specified / ntrc folder not found');
      });
    }
  }

  // scan for tasks then load appropriate one
  if (args.cmd[0] && !taskObj && ntrcFound) {
    var taskList = loadTasksFromDir(config.resolved.ntrc);
    if (taskList.indexOf(args.cmd[0]) !== -1) {
      taskObj = {fn: loadTasksFromDir(config.resolved.ntrc, args.cmd[0])};
    }
  }

  if (!taskObj || !taskObj.fn || typeof taskObj.fn !== 'function') {
    return console.log('[nt] Task "' + task + '" not registered\n');
  }

  return taskObj.fn(args.opts, args.cmd);
};

module.exports = dispatcher;
