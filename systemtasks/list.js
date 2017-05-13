var _ = require('lodash');
var chalk  = require('chalk');
var loadTasksFromDir = require('../lib/loadTasksFromDir');
var config = require('../config');

module.exports = function (opts, cmd, print) {
  var availableTasks = loadTasksFromDir(config.resolved.ntrc);

  if (!availableTasks.length) {
    print.data(chalk.bold('No tasks found.'));
    print.data();
    print.data('You don\'t seem to be in the right directory - type nt status for details.');
    print.data('You can also initialise nt in current directory with nt init.');
    print.data();
  } else {
    print.data(chalk.bold('Available tasks:')),
    print.data(availableTasks.join(', '));
    print.data();
    print.data(chalk.grey(chalk.bold('Task usage:') + ' nt [task]     ' + chalk.bold('Task help:') + ' nt help [task].'));
    print.data();
  }

};
