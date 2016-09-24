var clarg = require('clarg');
// default: _.get(config, 'const.settingsDir', './ntrc')

function parser () {
  var cliArgs = clarg();

  cliArgs.opts.help = cliArgs.opts.help || cliArgs.opts.h || false;
  cliArgs.opts.version = cliArgs.opts.version || cliArgs.opts.v || false;
  cliArgs.opts.debug = cliArgs.opts.debug || cliArgs.opts.d || false;
  cliArgs.opts.config = cliArgs.opts.config || cliArgs.opts.c || false;

  return cliArgs;
}

module.exports = parser;
