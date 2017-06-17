var _ = require('lodash');
var chalk  = require('chalk');
var getScriptsFromPackageJson = require('../../lib/getScriptsFromPackageJson');
var getProjectEnvVarsDefList = require('../../lib/getProjectEnvVarsDefList');
var config = require('../config');

module.exports = function (args) {
  if (!config.packageJson) {
    return args.print.err('Unable to list tasks - cannot find package.json.');
  }

  var availableTasks = Object.keys(getScriptsFromPackageJson(config.packageJson), args);
  var availableEnvs = getProjectEnvVarsDefList(config.packageJson);

  if (!availableTasks.length) {
    return args.print.err('There are no scripts defined in package.json.');
  }

  args.print.data(chalk.bold('Available tasks:')),
  args.print.data(availableTasks.join(', '));
  args.print.data();

  if (availableEnvs.length) {
    var envLine = _.without(availableEnvs, 'overrides').join(', ') + ' ';
    if (availableEnvs.indexOf('overrides') !== -1) {
      envLine += chalk.dim('(local overrides file exits)');
    }

    args.print.data(chalk.bold('Available env files:')),
    args.print.data(envLine);



    args.print.data();
  }

  var usageLine = [];

  usageLine.push(chalk.bold('Task usage:  '));
  usageLine.push(chalk.bold('nt [task]' + (availableEnvs.length ? ' -e [env]' : '')));
  usageLine.push('  or  ');
  usageLine.push(chalk.bold('npm run [task]'));


  args.print.data(usageLine.join(''));
  args.print.data();

};
