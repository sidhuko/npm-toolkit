var fs = require('fs-extra');

module.exports = function readJson (path) {
  return fs.readJsonSync(path);
};
