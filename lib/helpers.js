var _ = require('lodash');

var chalk  = require('chalk');
var config = require('../config');
// var posix = require('posix');
var readJson = require('./readJson');

var debug = false;

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
    var screenDefinition = readJson(config.resolved.ntrc + '/layout.json');
    var screenDefinitionLegacy = readJson(config.resolved.ntrc + '/tasks.' + screen + '.json');

    if (Object.keys(screenDefinition).length) {
      return screenDefinition;
    }

    if (Object.keys(screenDefinitionLegacy).length) {
      console.log('[nt] Using legacy tasks.(screen).json definitions. Please update to layout.json model, legacy support is being phased out.');
      return screenDefinitionLegacy;
    }

    return {};
  },

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

};
