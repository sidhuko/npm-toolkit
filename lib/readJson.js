var fs = require('fs');
var debug = false;

module.exports = function (path, cb) {
  if (debug) console.log('[nt] Trying to read JSON at', path);
  var rtn = {};
  try {
    rtn = JSON.parse(fs.readFileSync(path).toString());
    // rtn = require(path);
  } catch (e) {
    if (cb && typeof cb === 'function') {
      return cb(e);
    } else {
      if (debug) {
        console.error(e);
      }
    }
  }

  if (cb && typeof cb === 'function') {
    return cb(null, rtn);
  }
  return rtn;
};
