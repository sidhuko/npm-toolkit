var _ = require('lodash');
var fs = require('fs');
var chalk  = require('chalk');

module.exports = {
  printHeader: function () {
    console.log();
    console.log(chalk.bold('------------- npm-toolkit -------------'));
    console.log();
  },

  printSummary: function (args) {
    console.log();
    console.log(chalk.bold('---------------------------------------'));

    if (args) {
      console.log(args);
      //console.log(chalk.bold('Debug:  ') + !!args.debug);
      //console.log(chalk.bold('Config: ') + args.config);
      console.log(chalk.bold('---------------------------------------'));
      //console.log('Commands: ' + JSON.stringify(args._));
      //console.log('\n\n' + chalk.grey(chalk.underline('npm-toolkit opts:\n') + JSON.stringify(args, null, ' ')) + '\n\n');
    }

    console.log();
  },

  scanCommands: function (dir) {
    var commands = {};
    _.forEach(fs.readdirSync(dir + '/commands'), function (el) {
      var item = _.trimRight(el, '.js');
      commands[item] = require(dir + '/commands/' + item);
    });

    return commands;
  }
};
