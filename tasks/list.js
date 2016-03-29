var _ = require('lodash');
var chalk  = require('chalk');
// var fs = require('fs');
// var os = require('os');
var Helpers = require('../lib/helpers');
var config = require('../config');

module.exports = function (opts) {
  var displayInfo = !opts.quiet;
  var display = (displayInfo) ? 'detailed' : 'short';
  var availableTasks = Object.keys(Helpers.scanTasks(config.resolved.ntrc));

  Helpers.printHeader(display);

  // "do" commands
  if (display === 'detailed') {
    console.log(chalk.bold(' Available tasks:'));
    console.log();

    _.forEach(availableTasks, function (command) {
      console.log(' * ' + command.toString());
    });

    console.log();
    console.log('You can run them by typing npm-toolkit do [task]');
  } else {
    console.log(chalk.bold('Available tasks:  ') + availableTasks.join('  '));
  }

  Helpers.printSummary(display);
};
