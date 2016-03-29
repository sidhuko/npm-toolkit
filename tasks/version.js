var readJson = require('../lib/readJson');

module.exports = function (opts) {
  var packageJson = readJson('../package.json');
  return 'npm-toolkit ' + (packageJson.version || '- unknown version');
};
