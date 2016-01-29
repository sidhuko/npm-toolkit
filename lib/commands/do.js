var _ = require('lodash');
var chalk  = require('chalk');
var Helpers = require('../helpers');
var config = require('../../config');

module.exports = function (opts) {
  var inputCommands = opts._;
  var displayInfo = !opts.quiet;
  inputCommands.shift();
  var immediateTask = inputCommands[0];
  var availableTasks = Helpers.scanTasks(config.paths.settings);
  var taskDefined = _.has(availableTasks, immediateTask);
  var fn, result;

  console.log(chalk.bold('\nYou\'re using the old "nt do ' + immediateTask + '" syntax which will be soon deprecated.\nPlease switch to the new "nt ' + immediateTask + '" syntax wherever necessary.'));
  if (taskDefined) {
    if (displayInfo) result = chalk.bold('Executing a task: ') + inputCommands.join(' ');
    fn = _.get(availableTasks, immediateTask);

    if (immediateTask === 'log') {
      displayInfo = false;
      result = null;
    }
  } else {
    result = chalk.bold('Task "' + immediateTask + '" not found.');
    result += '\nType "nt list" for the list of available tasks.';
  }

  var summaryStyle = displayInfo ? 'detailed' : 'short';
  Helpers.printHeader(summaryStyle);
  //
  if (result) console.log(result);
  if (fn && typeof fn === 'function') fn(inputCommands);
  //
  Helpers.printSummary(summaryStyle);
  //if (displayInfo) Helpers.printSummary(summaryStyle, ApplicationArguments);
};
