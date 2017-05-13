var chalk  = require('chalk');
var os = require('os');
var config = require('../config');
var _ = require('lodash');

function genLine (label, value) {
  var l = _.padRight(label, 30);
  return chalk.bold(l) + value;
}

module.exports = function (opts, cmd, print) {
  print.data(chalk.bold(_.pad(' npm-toolkit ', 60, '-')));
  var osString = [os.type(), os.release(), os.arch()].join(', ');
  var envDefinitions = _.get(config, 'settings.env');

  print.data(genLine('Current location', process.cwd()));
  print.data(genLine('Project root', config.resolved.ntrc ? config.resolved.root : 'ntrc not found'));
  print.data(genLine('Project settings', config.resolved.ntrc ? config.resolved.ntrc : 'ntrc not found'));
  print.data(genLine('Hostname', os.hostname()));
  print.data(genLine('Operating system', osString));
  print.data(genLine('Node version', process.version));
  print.data(genLine('npm-toolkit version', 'v' + config.const.version));
  if (envDefinitions) {
    print.data(genLine('Defined env var sets', Object.keys(envDefinitions).join(',')));
  }

};
