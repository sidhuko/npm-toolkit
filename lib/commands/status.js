//var _ = require('lodash');
var chalk  = require('chalk');
// var fs = require('fs');
var os = require('os');
var Helpers = require('../helpers');
var config = require('../../config');

module.exports = function (opts) {
  var displayInfo = !opts.quiet;
  var displayStyle = (displayInfo) ? 'detailed' : 'short';

  var print = function (label, value, style) {
    if (!style) style = 'detailed';

    if (style === 'short') {
      console.log(chalk.bold(label + ' ') + value);
    }

    if (style === 'detailed') {
      console.log(chalk.bold(label + '\n ') + value + '\n');
    }
  };

  Helpers.printHeader(displayStyle);

  print('Current location:           ', config.paths.root, displayStyle);
  print('Settings directory location:', config.paths.settings, displayStyle);
  print('Hostname:                   ', os.hostname(), displayStyle);
  var osString = [os.type(), os.release(), os.arch()].join(' ');
  print('Operating system:           ', osString, displayStyle);
  print('Node version:               ', process.version, displayStyle);
  print('npm-toolkit version:        ', config.constants.version, displayStyle);

  Helpers.printSummary(displayStyle);
};
