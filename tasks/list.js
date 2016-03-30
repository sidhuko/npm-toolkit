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
    console.log('You don\'t seem to be in the right directory.')
    console.log('You can run type nt status to check that.');
    console.log('You can also initialise nt in current directory with nt init.');
  } else {
    console.log(chalk.bold('Available tasks:  ') + availableTasks.join('  '));
    console.log();
    console.log('You can run them by typing nt [task].');
    console.log('You can get more help on their usage by typing nt help [task].');
  }

  // Helpers.printSummary('detailed');
};
