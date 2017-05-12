var chalk  = require('chalk');
var Helpers = require('../lib/helpers');

module.exports = function () {
  // Helpers.printHeader();

  console.log(chalk.bold('npm-toolkit - flexible script launcher / task runner.'));
  console.log('TL;DR: Allows you to create custom workflows that suit your project.');
  console.log('Like Grunt or Gulp but without imposing a lot of their structure.');
  console.log();
  // console.log(chalk.bold('You can run npm-toolkit in two ways:'));
  // console.log(' * with an interactive interface (' + chalk.bold('nt') + ')');
  // console.log(' * execute commands directly (' + chalk.bold('nt [command name]') + ')');
  // console.log();
  console.log(chalk.bold('System tasks:'));
  console.log(' * nt help              This screen');
  console.log(' * nt list (ls)         List project tasks');
  console.log(' * nt status            Environment information');
  console.log(' * nt version           Returns version number');
  console.log();
  console.log(chalk.bold('You can also pass the arguments to customise the behaviour:'));
  console.log(' * --verbose      (-v)  for a more detailed output');
  console.log(' * --env=[name]   (-e)  for an alternative environmetal variables file to be loaded');
  console.log(' * --ntrc=[dir]   (-c)  for a custom ntrc location');
  console.log();

  // Helpers.printLine();
};
