//var _ = require('lodash');
var chalk  = require('chalk');
// var fs = require('fs');
var os = require('os');
var Helpers = require('../lib/helpers');
var config = require('../config');

module.exports = function (opts) {

  var print = function (label, value) {
    console.log(chalk.bold(label + ' ') + value);
  };

  // Helpers.printHeader('detailed');

  print('Current location:           ', process.cwd());
  print('Project root:               ', config.resolved.root);
  print('Project settings:           ', config.resolved.ntrc);
  print('Hostname:                   ', os.hostname());
  var osString = [os.type(), os.release(), os.arch()].join(', ');
  print('Operating system:           ', osString);
  print('Node version:               ', process.version);
  print('npm-toolkit version:        ', config.const.version);
  if (config && config.settings && config.settings.env) {
    print('Available env var sets:     ', Object.keys(config.settings.env).join(','));
  }
  console.log();

  // Helpers.printSummary('detailed');
};
