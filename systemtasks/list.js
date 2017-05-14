var _ = require('lodash');
var chalk  = require('chalk');
var getScriptsFromPackageJson = require('../lib/getScriptsFromPackageJson');
var config = require('../config');

module.exports = function (args) {
  if (!config.packageJson) {
    return args.print.err('Unable to list tasks - cannot find package.json.');
  }

  var availableTasks = getScriptsFromPackageJson(config.packageJson);

  if (!availableTasks.length) {
    return args.print.err('There are no scripts defined in package.json.');
  }

  args.print.data(chalk.bold('Available tasks:')),
  args.print.data(availableTasks.join(', '));
  args.print.data();
  args.print.data(chalk.grey(chalk.bold('Task usage:') + ' nt [task]  or  npm run [task]'));
  args.print.data();

};
