var fs = require('fs');
var parseCliArgs = require('./parseCliArgs');
var _ = require('lodash');

var args = parseCliArgs();
var verbose = args.opts.verbose;
var print = {
  data: _.get(args, 'print.data', console.log),
  err: _.get(args, 'print.err', console.error),
};

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
