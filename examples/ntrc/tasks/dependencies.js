var config = require('npm-toolkit/config');
var readJson = require('npm-toolkit/lib/readJson');
config.initialise();

module.exports = function () {
  if (config.packageJson) {
    var packageJson = readJson(config.packageJson);
    if (packageJson) {
      console.log('Dependencies', packageJson.dependencies);
      console.log('Dev Dependencies', packageJson.devDependencies);
    } else {
      console.log('Couldn\'t find package.json in project root');
    }
  }
};
