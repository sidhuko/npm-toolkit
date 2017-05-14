var readJson = require('../cli/readJson');

module.exports = function (args) {
  var packageJson = readJson(__dirname + '/../package.json');
  args.print.data('npm-toolkit ' + (packageJson.version || '- unknown version'));
};
