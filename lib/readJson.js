var fs = require('fs');
var parseCliArgs = require('./parseCliArgs');

var args = parseCliArgs();
var verbose = args.opts.verbose;

module.exports = function (path, cb) {
  // if (verbose) console.log('[nt] Reading JSON at', path);
  var rtn = {};
  try {
    rtn = JSON.parse(fs.readFileSync(path).toString());
    // rtn = require(path);
  } catch (e) {
    if (cb && typeof cb === 'function') {
      return cb(e);
    } else {
      if (verbose) {
        console.error(e);
      }
    }
  }

  if (cb && typeof cb === 'function') {
    return cb(null, rtn);
  }
  return rtn;
};
