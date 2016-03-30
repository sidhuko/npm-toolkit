var _ = require('lodash');
// var SystemTasks = require('../tasks');
var loadTasks = require('./loadTasks');
var config = require('../config');
// var ntrcFound = config.initialise();

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
}

/** A custom task-matching adapter.
 * Replaces old nomnom implementation.
 */
// TODO: fluffy match
var dispatcher = function (args) {
  var taskObj = null;

  if (args.task === 'v' || args.task === 'version') {
    taskObj = loadSystemTask('version');
  }
  if (args.task === 'h' || args.task === 'help') {
    taskObj = loadSystemTask('help');
  }
  if (args.task === 'init') {
    taskObj = loadSystemTask('init');
  }
  // if (args.task === 'install') {
  //   taskObj = loadSystemTask('install');
  // }

  if (args.task === 's' || args.task === 'status') {
    taskObj = loadSystemTask('status');
  }

  if (args.task === 'ls' || args.task === 'list') {
    taskObj = loadSystemTask('list');
  }

  // console.log('taskObj', typeof taskObj);
  // console.log('taskObj === null', (taskObj === null));

  if (taskObj !== null) {
    return taskObj.fn(args.opts, args.args);
  }

  if (!taskObj) {
    var ntrcFound = config.initialise();
  }


  // Fallback
  if (!args.task) {
    taskObj = loadTask(function () {
      if (ntrcFound) {
        return SystemTasks.cli();
      } else {
        taskObj = loadTask(function () {
          console.log('Task not specified');
        });
      }
    });
  }

  // first scan for tasks/index.js or tasks/list.json
  // then merge with decorated tasks found as files
  if (args.task && !taskObj && ntrcFound) {
    var taskList = loadTasks(config.resolved.ntrc);

    if (taskList.indexOf(args.task !== -1)) {
      taskObj = loadTasks(config.resolved.ntrc, args.task);
    } else {
      taskObj = {
        fn: function () {
          return console.log('Task not found');
        }
      }
    }
  }

  if (args.task && !taskObj) {
    taskObj = loadTask(function () {
      console.log('Task "' + args.task + '" not registered\n');
    });
  }

  return taskObj.fn(args.opts, args.args);
};

module.exports = dispatcher;
