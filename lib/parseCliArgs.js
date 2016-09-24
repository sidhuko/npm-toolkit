var clarg = require('clarg');
// TODO: add mapping if single hyphen (-d => --debug, -v => --verbose, -c => config)
// TODO: add custom map support (--help and --version => redirect to global task)
// TODO: add support for --json option for formatted output

// default: _.get(config, 'settings.local.quiet', false)
// default: _.get(config, 'settings.local.debug', false)
// default: _.get(config, 'const.settingsDir', './ntrc')

function parser () {
  var cliArgs = clarg();

  cliArgs.opts.debug = cliArgs.opts.debug || cliArgs.opts.d || false;
  cliArgs.opts.quiet = cliArgs.opts.quiet || cliArgs.opts.q || true;

  return cliArgs;
}

module.exports = parser;
