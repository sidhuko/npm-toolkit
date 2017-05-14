var chalk  = require('chalk');
var os = require('os');
var config = require('../config');
var _ = require('lodash');

function genLine (label, value) {
  var l = _.padRight(label, 30);
  return chalk.bold(l) + value;
}

module.exports = function (args) {
  args.print.data(chalk.bold(_.pad(' npm-toolkit ', 60, '-')));
  var osString = [os.type(), os.release(), os.arch()].join(', ');
  // doesnt exist anymore - write a method to scan .env files in root dir
  var envDefinitions = _.get(config, 'settings.env');

  args.print.data(genLine('Current location', process.cwd()));
  args.print.data(genLine('Project root', config.projectRoot ? config.projectRoot : 'not found'));
  args.print.data(genLine('Hostname', os.hostname()));
  args.print.data(genLine('Operating system', osString));
  args.print.data(genLine('Node version', process.version));
  args.print.data(genLine('npm-toolkit version', 'v' + config.ntVersion));
  if (config.projectRoot) {
    // project npm-toolkit version
  }
  if (envDefinitions) {
    args.print.data(genLine('Defined env var sets', Object.keys(envDefinitions).join(',')));
  }
};
