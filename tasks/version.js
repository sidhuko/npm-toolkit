var readJson = require('../lib/readJson');

module.exports = function () {
  var packageJson = readJson(__dirname + '/../package.json');
  console.log('npm-toolkit ' + (packageJson.version || '- unknown version'));
};
