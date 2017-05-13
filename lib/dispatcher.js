var _ = require('lodash');
var loadTasksFromDir = require('./loadTasksFromDir');
var config = require('../config');

var dispatcher = function (args) {
  var onDataFn = _.get(args, 'onDataFn');
  var onErrFn = _.get(args, 'onErrFn');

  args.print = {
    data: onDataFn ? onDataFn : console.log,
    err:  onErrFn ? onErrFn : console.error,
  };

  var ntrcFound = config.initialise(args);
  if (args && args.cmd && typeof args.cmd === 'string') {
    args.cmd = args.cmd.split(' ');
  }
  var task = _.get(args, 'cmd.0');
  var taskObj = null;


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

  if (!task && !ntrcFound) {
    taskObj = loadTask(function () {
      return args.print.data('No task specified. See "nt help".');
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
    return args.print.err('Couldn\'t find ntrc directory - cannot load task "' + task + '".');
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
  // the odd order is due to the fact that mostly opts are needed in tasks
  // and cmds are secondary
  // this turns out to be a very confusing mistake
  // signature needs to change in major version update
  if (taskObj !== null) {
    return taskObj.fn(args.opts, args.cmd, args.print);
  }



  if (!taskObj || !taskObj.fn || typeof taskObj.fn !== 'function') {
    return args.print.err('Task "' + task + '" not registered\n');
  }

  return taskObj.fn(args.opts, args.cmd);
};

module.exports = dispatcher;
