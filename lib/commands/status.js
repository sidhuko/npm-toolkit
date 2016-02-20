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

  print('Current location:           ', process.cwd(), displayStyle);
  print('Project root:               ', config.resolved.root, displayStyle);
  print('Project settings:           ', config.resolved.ntrc, displayStyle);
  print('Hostname:                   ', os.hostname(), displayStyle);
  var osString = [os.type(), os.release(), os.arch()].join(' ');
  print('Operating system:           ', osString, displayStyle);
  print('Node version:               ', process.version, displayStyle);
  print('npm-toolkit version:        ', config.const.version, displayStyle);

  Helpers.printSummary(displayStyle);
};
