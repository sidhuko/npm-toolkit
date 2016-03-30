var _ = require('lodash');
var SystemTasks = require('../tasks');
var loadTasks = require('./loadTasks');
var config = require('../config');
var ntrcFound = config.initialise();



/** A custom task-matching adapter.
 * Replaces old nomnom implementation.
 */
// TODO: fluffy match
var dispatcher = function (args) {
  var taskFn = null;

  if (args.task === 'v' || args.task === 'version') {
    taskFn = SystemTasks.version;
  }
  if (args.task === 'h' || args.task === 'help') {
    taskFn = SystemTasks.help;
  }
  if (args.task === 'init') {
    taskFn = SystemTasks.init;
  }
  // if (args.task === 'install') {
  //   taskFn = SystemTasks.install;
  // }

  if (args.task === 's' || args.task === 'status') {
    taskFn = SystemTasks.status;
  }

  if (args.task === 'ls' || args.task === 'list') {
    taskFn = SystemTasks.list;
  }


  // if (!taskFn) {
  //   var ntrcFound = config.initialise();
  // }

  // Fallback
  if (!args.task) {
    taskFn = function () {
      if (ntrcFound) {
        return SystemTasks.cli();
      } else {
        taskFn = function () {
          console.log('Task not specified\n');
        };
      }
    }
  }


  if (args.task && !taskFn && ntrcFound) {
    var taskList = loadTasks(config.resolved.ntrc);

    if (taskList.indexOf(args.task !== -1)) {
      taskFn = loadTasks(config.resolved.ntrc, args.task);
    } else {
      taskFn = function () {
        return console.log('Task not found\n');
      }
    }
  }

  if (args.task && !taskFn) {
    taskFn = function () {
      console.log('Task "' + args.task + '" not registered\n');
    };
  }

  return taskFn(args.opts, args.args);
};

module.exports = dispatcher;
