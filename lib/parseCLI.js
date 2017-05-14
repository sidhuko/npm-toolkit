var clarg = require('clarg');
/**
 * @param {Mixed} args An array or a string of CLI arguments
 */

 function parseCLI (args) {
  if (typeof args === 'string') {
    args = args.split(' ');
  }
  if (!Array.isArray(args)) {
    args = null;
  }

  var parsed = clarg(args);
  return parsed;
}

module.exports = parseCLI;
