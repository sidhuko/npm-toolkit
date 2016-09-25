var _ = require('lodash');

var chalk  = require('chalk');
var config = require('../config');
// var posix = require('posix');
var readJson = require('./readJson');

var debug = false;

module.exports = {
  printHeader: function (style) {
    console.log(chalk.bold('------------- npm-toolkit -------------'));
  },

  printLine: function (style, args) {
    console.log(chalk.bold('---------------------------------------'));
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
