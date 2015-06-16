var _ = require('lodash');
var chalk  = require('chalk');
// var fs = require('fs');
// var os = require('os');
var Helpers = require('../helpers');
var config = require('../../config');

module.exports = function (opts) {
  var displayInfo = !opts.quiet;
  var display = (displayInfo) ? 'detailed' : 'short';
  var availableTasks = Object.keys(Helpers.scanTasks(config.paths.settings));
  var availableTemplates = Object.keys(Helpers.scanTemplates(config.paths.settings));

  Helpers.printHeader(display);

  // "do" commands
  if (display === 'detailed') {
    console.log(chalk.bold(' Available "do" tasks:'));
    console.log();

    _.forEach(availableTasks, function (command) {
      console.log(' * ' + command.toString());
    });

    console.log();
    console.log('You can run them by typing npm-toolkit do [task]');
  } else {
    console.log(chalk.bold('Available "do" tasks:  ') + availableTasks.join('  '));
  }

  // "create" templates
  if (display === 'detailed') {
    console.log('\n\n');
    console.log(chalk.bold(' Available "create" templates:'));
    console.log();

    _.forEach(availableTemplates, function (template) {
      console.log(' * ' + template.toString());
    });

    console.log();
    console.log('You can create them by typing npm-toolkit create [template] [filename]');
  } else {
    console.log(chalk.bold('Available "create" templates:  ') + availableTemplates.join('  '));
  }

  Helpers.printSummary(display);
};
