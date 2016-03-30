var _ = require('lodash');
var SystemTasks = require('../tasks');
var scanTasks = require('./scanTasks');
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



  // Fallback
  if (!args.task) {
    taskFn = function () {
      if (ntrcFound) {
        return SystemTasks.cli();
      } else {
        taskFn = function () {
          console.log('Task not specified');
        };
      }

    }
  }


  if (args.task && !taskFn && ntrcFound) {
    var taskList = scanTasks(config.resolved.ntrc);

    if (taskList.indexOf(args.task !== -1)) {
      taskFn = scanTasks(config.resolved.ntrc, args.task);
    } else {
      taskFn = function () {
        return console.log('Task not found');
      }
    }
  }

  if (args.task && !taskFn) {
    taskFn = function () {
      console.log('Task not registered');
    };
  }

  return taskFn(args.opts, args.args);
};

module.exports = dispatcher;
