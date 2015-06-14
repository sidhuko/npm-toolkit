var _ = require('lodash');
var fs = require('fs');
var chalk  = require('chalk');

module.exports = {
  printHeader: function (style) {
    if (style && style === 'detailed') {
      console.log();
      console.log(chalk.bold('------------- npm-toolkit -------------'));
      console.log();
    } else {
      console.log();
    }
  },

  printSummary: function (style, args) {
    if (style && style === 'detailed') {
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
    } else {
      console.log();
    }
  },

  scanTasks: function (dir) {
    var tasks = {};
    _.forEach(fs.readdirSync(dir + '/tasks'), function (el) {
      var item = _.trimRight(el, '.js');
      tasks[item] = require(dir + '/tasks/' + item);
    });

    return tasks;
  },

  scanTemplates: function (dir) {
    var templates = {};
    _.forEach(fs.readdirSync(dir + '/templates'), function (el) {
      var item = _.trimRight(el, '.js');
      templates[item] = dir + '/templates/' + item + '.js';
    });

    return templates;
  }
};
