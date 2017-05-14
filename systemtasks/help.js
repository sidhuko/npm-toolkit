var chalk  = require('chalk');

module.exports = function (args) {

  args.print.data(chalk.bold('npm-toolkit'));
  args.print.data('Simple CLI launcher. Picks up scripts from package.json.');
  args.print.data();

  args.print.data(chalk.bold('System tasks:'));
  args.print.data(' * nt help              This screen');
  args.print.data(' * nt list (ls)         List tasks from "ntrc/tasks" folder');
  args.print.data(' * nt status            Environment information');
  args.print.data(' * nt version           Returns version number');
  args.print.data();
  args.print.data(chalk.bold('You can also pass the arguments:'));
  args.print.data(' * --verbose      (-v)  for a more detailed output');
  args.print.data(' * --env=[name]   (-e)  for predefined environmetal variables to be loaded from file');
  args.print.data(' * --cwd=[dir]    (-c)  to change working directory');
  args.print.data();

};
