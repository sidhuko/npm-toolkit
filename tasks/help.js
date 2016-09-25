var chalk  = require('chalk');
var Helpers = require('../lib/helpers');

module.exports = function () {
  Helpers.printHeader();

  console.log(chalk.bold('TL;DR: npm-toolkit is essentially a fancy task runner.'));
  console.log('It is written in a way that gives you all the flexibility you need');
  console.log('to create custom workflows available in multiple interfaces.');
  console.log();
  console.log(chalk.bold('You can run npm-toolkit in two ways:'));
  console.log(' * with an interactive interface (' + chalk.bold('nt') + ')');
  console.log(' * execute commands directly (' + chalk.bold('nt [command name]') + ')');
  console.log();
  console.log(chalk.bold('You can also pass the arguments to customise the behaviour:'));
  console.log(' * --debug or -d for a more detailed output');
  console.log(' * --env=[file] for an alternative environmetal variables file to be loaded');
  console.log(' * --config=[dirname] for a custom config directory (ntrc)');
  console.log();
  console.log(chalk.bold('More information:'));
  console.log(' * nt help: This screen');
  console.log(' * nt list: View available commands');
  console.log(' * nt status: Debug/environment information');

  Helpers.printLine();
};
