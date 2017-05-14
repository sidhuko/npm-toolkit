var _ = require('lodash');
var getScriptsFromPackageJson = require('./getScriptsFromPackageJson');
var config = require('../config');

var launcher = function (args) {
  var onDataFn = _.get(args, 'onDataFn');
  var onErrFn = _.get(args, 'onErrFn');

  args.print = {
    data: onDataFn ? onDataFn : console.log,
    err:  onErrFn ? onErrFn : console.error,
  };
  delete args.onDataFn;
  delete args.onErrFn;

  var packageFound = config.initialise(args);
  if (args && args.cmd && typeof args.cmd === 'string') {
    args.cmd = args.cmd.split(' ');
  }
  var task = _.get(args, 'cmd.0');
  var taskFn = null;


  if (!task) {
    taskFn = function () {
      args.print.data('No task specified. See "nt help" for usage info or "nt list" for a list of available tasks.');
      return false;
    };
  }

  // allowing _ in front of task name to bypass potential
  // package.json script naming conflicts (i.e. npm run help = nt _help)
  if (task[0] !== '_') {
    if (task === 'version') {
      taskFn = require('../systemtasks/version');
    }

    if (task === 'help') {
      taskFn = require('../systemtasks/help');
    }

    if (task === 'status') {
      taskFn = require('../systemtasks/status');
    }

    if (task === 'ls' || task === 'list') {
      taskFn = require('../systemtasks/list');
    }
  }

  if (!packageFound && !taskFn) {
    return args.print.err('Cannot load task "' + task + '".');
  }

  // scan for tasks then load appropriate one
  if (packageFound && task && !taskFn) {
    var taskList = getScriptsFromPackageJson(config.packageJson);
    if (taskList.indexOf(task) !== -1) {
      taskFn = getScriptsFromPackageJson(config.packageJson, task);
    }
  }

  if (!taskFn || typeof taskFn !== 'function') {
    return args.print.err('Task "' + task + '" not found.');
  }

  return taskFn(args);
};

module.exports = launcher;
