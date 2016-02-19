var _ = require('lodash');
var fs = require('fs');
var chalk  = require('chalk');
var config = require('../config');
// var posix = require('posix');

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

  getScreenDefinition: function (screen) {
    var loadScreen = !!screen ? screen : 'main';
    var screenPath = config.paths.settings + '/tasks.' + loadScreen + '.json';
    return require(screenPath);
  },

  scanTasks: function (dir) {
    var tasks = {};
    if (dir) {  
      _.forEach(fs.readdirSync(dir + '/tasks'), function (el) {
        var item = el.substring(0, el.length - 3);
        tasks[item] = require(dir + '/tasks/' + item);
      });
    }

    return tasks;
  },

  scanTemplates: function (dir) {
    var templates = {};
    _.forEach(fs.readdirSync(dir + '/templates'), function (el) {
      var item = el.substring(0, el.length - 3);
      templates[item] = dir + '/templates/' + item + '.js';
    });

    return templates;
  // },
  //
  // ulimit: {
  //   set: function set(limit) {
  //     var current = posix.getrlimit('nofile').soft;
  //     var newLimit = limit || 30000;
  //
  //     if (current !== null && current < newLimit) {
  //       posix.setrlimit('nofile', {
  //           soft: newLimit,
  //           hard: null
  //       });
  //     }
  //   },
  //
  //   get: function get() {
  //     return posix.getrlimit('nofile').soft;
  //   }
  }

};
