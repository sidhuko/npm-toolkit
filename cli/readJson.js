var fs = require('fs');
var parseCliArgs = require('./parseCliArgs');
var _mapPrintFn = require('../lib/_mapPrintFn');
var _ = require('lodash');

var args = parseCliArgs();
var verbose = args.opts.verbose;
var print = _mapPrintFn(args);

module.exports = function (path, cb) {
  // Bind print options
  if (verbose) print.data('[debug] Parsing "' + path + '"');
  var rtn = {};
  try {
    rtn = JSON.parse(fs.readFileSync(path).toString());
    // rtn = require(path);
  } catch (e) {
    if (cb && typeof cb === 'function') {
      return cb(e);
    } else {
      if (verbose) {
        print.err(e);
      }
    }
  }

  if (cb && typeof cb === 'function') {
    return cb(null, rtn);
  }
  return rtn;
};
