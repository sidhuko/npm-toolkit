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
  var ntrcFound = config.initialise(args);
  if (args && args.cmd && typeof args.cmd === 'string') {
    args.cmd = args.cmd.split(' ');
  }
  var task = _.get(args, 'cmd.0');
  var taskObj = null;

  if (!task && !ntrcFound) {
    taskObj = loadTask(function () {
      return console.log('No task specified. See "nt help".');
    });
  }

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
    return console.error('Couldn\'t find ntrc directory - cannot load task "' + task + '".');
  }

  if (ntrcFound) {
    if (task === 'ls' || task === 'list') {
      taskObj = loadTask('../systemtasks/list');
    }

    // scan for tasks then load appropriate one
    if (task && !taskObj && ntrcFound) {
      var taskList = loadTasksFromDir(config.resolved.ntrc);
      if (taskList.indexOf(task) !== -1) {
        taskObj = {fn: loadTasksFromDir(config.resolved.ntrc, task)};
      }
    }
  }

  // execute if task is a system task
  if (taskObj !== null) {
    return taskObj.fn(args.opts, args.cmd);
  }






  if (!taskObj || !taskObj.fn || typeof taskObj.fn !== 'function') {
    return console.log('[nt] Task "' + task + '" not registered\n');
  }

  return taskObj.fn(args.opts, args.cmd);
};

module.exports = dispatcher;
