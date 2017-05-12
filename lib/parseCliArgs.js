var clarg = require('clarg');

function parser () {
  var cliArgs = clarg();

  var rtn = {
    cmd: cliArgs.args,
    opts: {
      env: cliArgs.opts.env || cliArgs.opts.e || false,
      verbose: cliArgs.opts.verbose || cliArgs.opts.v || false,
      config: cliArgs.opts.config || cliArgs.opts.c || false
    }
  };

  return rtn;
}

module.exports = parser;
