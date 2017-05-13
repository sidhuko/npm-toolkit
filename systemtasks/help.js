var chalk  = require('chalk');

module.exports = function (opts, cmd, print) {

  print.data(chalk.bold('npm-toolkit - flexible script launcher / task runner.'));
  print.data('TL;DR: Allows you to create custom workflows that suit your project.');
  print.data('Like Grunt or Gulp but without imposing a lot of their structure.');
  print.data();
  // print.data(chalk.bold('You can run npm-toolkit in two ways:'));
  // print.data(' * with an interactive interface (' + chalk.bold('nt') + ')');
  // print.data(' * execute commands directly (' + chalk.bold('nt [command name]') + ')');
  // print.data();
  print.data(chalk.bold('System tasks:'));
  print.data(' * nt help              This screen');
  print.data(' * nt list (ls)         List project tasks');
  print.data(' * nt status            Environment information');
  print.data(' * nt version           Returns version number');
  print.data();
  print.data(chalk.bold('You can also pass the arguments to customise the behaviour:'));
  print.data(' * --verbose      (-v)  for a more detailed output');
  print.data(' * --env=[name]   (-e)  for predefined environmetal variables to be loaded from file');
  print.data(' * --cwd=[dir]    (-c)  to change working directory');
  print.data();

};
