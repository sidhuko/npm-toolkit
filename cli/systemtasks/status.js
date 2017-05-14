var chalk  = require('chalk');
var _ = require('lodash');

var getSystemInfo = require('../../lib/getSystemInfo');

function genLine (label, value) {
  var l = _.padRight(label, 30);
  return chalk.bold(l) + value;
}

module.exports = function (args) {
  var sysinfo = getSystemInfo();
  var envDefinitions = Object.keys(sysinfo.projectEnvVars);

  args.print.data(chalk.bold(_.pad(' npm-toolkit ', 60, '-')));

  var lines = [];

  lines.push({name: 'Current location', val: sysinfo.cwd});
  lines.push({name: 'Project root', val: sysinfo.projectRootDir ? sysinfo.projectRootDir : 'not found'});
  lines.push({name: 'Hostname', val: sysinfo.hostname});
  lines.push({name: 'Operating system', val: sysinfo.os});
  lines.push({name: 'Node version', val: sysinfo.nodeVersion});
  lines.push({name: 'npm-toolkit version', val: 'v' + sysinfo.ntVersion});

  if (sysinfo.projectRoot) {
    // project npm-toolkit version
  }

  if (envDefinitions.length) {
    lines.push({name: 'Env var definitions', val: Object.keys(envDefinitions).join(',')});
  }

  lines.forEach(function (i) {
    args.print.data(genLine(i.name, i.val));
  });
};
