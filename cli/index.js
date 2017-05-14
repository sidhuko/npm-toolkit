#!/usr/bin/env node
// var launcher = require('./launcher');
var parseCliArgs = require('./parseCliArgs');
var getScriptsFromPackageJson = require('./getScriptsFromPackageJson');
var _ = require('lodash');
var chalk = require('chalk');
var config = require('../config');



function executeScript(script, args) {
  args.print.data('ExecuteScript: ' + args.cmd[0]);
  args.print.data('> ' + script + '\n');
}

function launcher (args) {
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
    return args.print.data('No task specified. See "nt help" for usage info or "nt list" for a list of available tasks.');
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
    if (Object.keys(taskList).indexOf(task) !== -1) {
      taskFn = function () {
        return executeScript(taskList[task], args);
      };
    }
  }

  if (!taskFn || typeof taskFn !== 'function') {
    return args.print.err('Task "' + task + '" not found.');
  }

  return taskFn(args);
};


var args = parseCliArgs();

args.onDataFn = function onDataFn(str) {
  console.log(str || '');
};
args.onErrFn = function onErrFn(str) {
  console.error(chalk.red.bold('[ERR!]'), str || '');
  process.exit(1);
};

launcher(args);
