// var fs = require('fs');

var debug = false;

module.exports = function (path) {
  if (debug) console.log('trying to read json at', path);
  var rtn = {};
  try {
    // rtn = JSON.parse(fs.readFileSync(path).toString());
    rtn = require(path);
  } catch (e) {
    console.error(e);
  }

  //catch try
  return rtn;
}
