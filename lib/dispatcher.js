var _ = require('lodash');
var SystemTasks = require('../tasks');
// var Helpers = require('./helpers');
var scanTasks = require('./scanTasks');
// var fs = require('fs');
var config = require('../config');
var ntrcFound = config.initialise();



/** A custom task-matching adapter.
 * Replaces old nomnom implementation.
 */
// TODO: fluffy match
var dispatcher = function (args) {
  // console.log(args);
  var task = null;

  var globalTasks = ['v', 'version', 'h', 'help', 'init', 's', 'status', 'ls', 'list'];
  // Tasks where config is not needed
  if (args.task === 'v' || args.task === 'version') {
    task = SystemTasks.version;
  }
  if (args.task === 'h' || args.task === 'help') {
    task = SystemTasks.help;
  }
  if (args.task === 'init') {
    task = SystemTasks.init;
  }
  // if (args.task === 'install') {
  //   task = SystemTasks.install;
  // }

  // Tasks where config is optional
  if (args.task === 's' || args.task === 'status') {
    task = SystemTasks.status;
  }

  // Tasks where config is required
  if (args.task === 'ls' || args.task === 'list') {
    task = SystemTasks.list;
  }



  // Fallback
  if (!args.task) {
    task = function () {
      if (ntrcFound) {
        return SystemTasks.cli();
      } else {
        task = function () {
          console.log('Task not specified');
        };
      }

    }
  }


  if (args.task && !task && ntrcFound) {
    var taskList = scanTasks(config.resolved.ntrc);

    if (taskList.indexOf(args.task !== -1)) {
      task = scanTasks(config.resolved.ntrc, args.task);
    } else {
      task = function () {
        return console.log('Task not found');
      }
    }
  }

  if (args.task && !task) {
    task = function () {
      console.log('Task not registered');
    };
  }

  return task(args.opts, args.args);
};

module.exports = dispatcher;
