/**
 * Gets npm-toolkit version
 */
function getNtVersion() {
  return require('../package.json').version;
};

module.exports = getNtVersion;
