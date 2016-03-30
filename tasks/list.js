var _ = require('lodash');
var chalk  = require('chalk');
// var Helpers = require('../lib/helpers');
var scanTasks = require('../lib/scanTasks');
var config = require('../config');

module.exports = function (opts) {
  var availableTasks = scanTasks(config.resolved.ntrc);

  // Helpers.printHeader('detailed');

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
    console.log('To execute one type nt [task]. For help use nt help [task].');
    console.log();
  }

  // Helpers.printSummary('detailed');
};
