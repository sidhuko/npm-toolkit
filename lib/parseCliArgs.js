var clarg = require('clarg');

var parsed;

function parser (args) {
  if (parsed) {
    return parsed;
  }
  var cliArgs = args || clarg();

  parsed = {
    cmd: cliArgs.args,
    opts: {
      env: cliArgs.opts.env || cliArgs.opts.e || false,
      verbose: cliArgs.opts.verbose || cliArgs.opts.v || false,
      config: cliArgs.opts.config || cliArgs.opts.c || false
    }
  };

  return parsed;
}

module.exports = parser;
