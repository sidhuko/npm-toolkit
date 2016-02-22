var chalk  = require('chalk');
var Helpers = require('../helpers');

module.exports = function (opts) {
  Helpers.printHeader('detailed');

  console.log(chalk.bold.underline('TL;DR: npm-toolkit is essentially a fancy "npm run".'));
  console.log('It is written in a way that gives you all the flexibility you need');
  console.log('to create custom workflows available in multiple interfaces.');
  console.log();
  console.log(chalk.bold.underline('You can run npm-toolkit in three ways:'));
  console.log(' * with an interactive interface (' + chalk.bold('nt') + ')');
  console.log(' * execute commands directly (' + chalk.bold('nt [command name]') + ')');
  // console.log(' * start a web interface (' + chalk.bold('npm-toolkit web') + ')');
  console.log();
  console.log(chalk.bold.underline('You can also pass the arguments to customise the behaviour:'));
  console.log(' * --quiet=true or --q=true for a less noisy output');
  console.log(' * --settings=[dirname] for a custom settings directory');
  console.log(' * --env=[file] for an alternative environmetal variables file to be loaded');
  console.log();
  console.log(chalk.bold.underline('More information:'));
  console.log(' * nt help: This screen');
  console.log(' * nt info: Debug & environment information');
  console.log(' * nt list: View available commands');

  Helpers.printSummary('detailed');
};
