var readJson = require('./readJson');
var locatePackageJson = require('./locatePackageJson');

function getProjectPackageJson(dir, args) {
  var pjson = locatePackageJson(dir, args);
  return readJson(pjson);
}

module.exports = getProjectPackageJson;
