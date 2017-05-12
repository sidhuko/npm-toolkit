var _ = require('lodash');
var chalk  = require('chalk');
var loadTasksFromDir = require('../lib/loadTasksFromDir');
var config = require('../config');

module.exports = function () {
  var availableTasks = loadTasksFromDir(config.resolved.ntrc);

  if (!availableTasks.length) {
    console.log(chalk.bold('No tasks found.'));
    console.log();
    console.log('You don\'t seem to be in the right directory - type nt status for details.');
    console.log('You can also initialise nt in current directory with nt init.');
    console.log();
  } else {
    console.log(chalk.bold('Available tasks:')),
    console.log(availableTasks.join(', '));
    console.log();
    console.log(chalk.grey(chalk.bold('Task usage:') + ' nt [task]     ' + chalk.bold('Task help:') + ' nt help [task].'));
    console.log();
  }

};
