var readJson = require('../lib/readJson');

module.exports = function (opts, cmd, print) {
  var packageJson = readJson(__dirname + '/../package.json');
  print.data('npm-toolkit ' + (packageJson.version || '- unknown version'));
};
