var chalk  = require('chalk');

module.exports = function (opts, cmd, print) {

  print.data(chalk.bold('npm-toolkit'));
  print.data('Create custom workflows that work well with your project.');
  print.data('Automatically picks up tasks from "ntrc/tasks" folder.');
  print.data();

  print.data(chalk.bold('System tasks:'));
  print.data(' * nt help              This screen');
  print.data(' * nt list (ls)         List tasks from "ntrc/tasks" folder');
  print.data(' * nt status            Environment information');
  print.data(' * nt version           Returns version number');
  print.data();
  print.data(chalk.bold('You can also pass the arguments:'));
  print.data(' * --verbose      (-v)  for a more detailed output');
  print.data(' * --env=[name]   (-e)  for predefined environmetal variables to be loaded from file');
  print.data(' * --cwd=[dir]    (-c)  to change working directory');
  print.data();

};
