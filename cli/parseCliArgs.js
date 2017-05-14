var _ = require('lodash');
var clarg = require('clarg');

/**
 * Parsed arguments stay in place for entire runtime
 */
var parsed;

function parser (args) {
  if (parsed) {
    return parsed;
  }
  var cliArgs = args || clarg();

  parsed = {
    cmd: cliArgs.args,
    opts: {
      verbose: cliArgs.opts.verbose || cliArgs.opts.v || false,
      env: cliArgs.opts.env || cliArgs.opts.e || false,
      cwd: cliArgs.opts.cwd || cliArgs.opts.c || false
    }
  };

  _.map(cliArgs.opts, function (v, k) {
    if (['verbose', 'env', 'cwd', 'v', 'c', 'e'].indexOf(k) === -1) {
      parsed.opts[k] = v;
    }

  });

  return parsed;
}

module.exports = parser;
