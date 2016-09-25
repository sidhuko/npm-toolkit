var clarg = require('clarg');
// default: _.get(config, 'const.settingsDir', './ntrc')

function parser () {
  var cliArgs = clarg();

  cliArgs.opts.env = cliArgs.opts.env || cliArgs.opts.e || false;
  cliArgs.opts.verbose = cliArgs.opts.verbose || cliArgs.opts.v || false;
  cliArgs.opts.config = cliArgs.opts.config || cliArgs.opts.c || false;

  delete cliArgs.opts.e;
  delete cliArgs.opts.v;
  delete cliArgs.opts.c;

  return cliArgs;
}

module.exports = parser;
