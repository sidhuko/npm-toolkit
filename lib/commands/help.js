var chalk  = require('chalk');
var Helpers = require('../helpers');

module.exports = function (opts) {
  Helpers.printHeader('detailed');

  console.log(chalk.bold.underline('TL;DR: npm-toolkit is essentially a fancy "npm run".'));
  console.log('It is written in a simple way to give you the flexibility');
  console.log('to create custom workflows available under multiple interfaces.');
  console.log();
  console.log(chalk.bold.underline('You can run npm-toolkit in three ways:'));
  console.log(' * with an interactive interface (' + chalk.bold('npm-toolkit') + ')');
  console.log(' * execute commands directly (' + chalk.bold('npm-toolkit do [command name]') + ')');
  console.log(' * start a web interface (' + chalk.bold('npm-toolkit web') + ')');
  console.log();
  console.log(chalk.bold.underline('You can also pass the arguments to customise the behaviour:'));
  console.log(' * --quiet=true or --q=true for a less noisy output');
  console.log(' * --settings=[dirname] for a custom settings directory');
  console.log();
  console.log(chalk.bold.underline('More information:'));
  console.log(' * npm-toolkit help: This screen');
  console.log(' * npm-toolkit info: Debug & environment information');
  console.log(' * npm-toolkit list: View available commands');

  Helpers.printSummary('detailed');
};
