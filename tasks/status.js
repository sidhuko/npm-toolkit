var chalk  = require('chalk');
var os = require('os');
var Helpers = require('../lib/helpers');
var config = require('../config');

function print (label, value) {
  console.log(chalk.bold(label + ' ') + value);
}

module.exports = function () {
  Helpers.printHeader();

  print('Current location:           ', process.cwd());
  print('Project root:               ', config.resolved.ntrc ? config.resolved.root : 'ntrc not found');
  print('Project settings:           ', config.resolved.ntrc ? config.resolved.ntrc : 'ntrc not found');
  print('Hostname:                   ', os.hostname());
  var osString = [os.type(), os.release(), os.arch()].join(', ');
  print('Operating system:           ', osString);
  print('Node version:               ', process.version);
  print('npm-toolkit version:        ', 'v' + config.const.version);
  if (config && config.settings && config.settings.env) {
    print('Defined env var sets:       ', Object.keys(config.settings.env).join(','));
  }
  console.log();
};
