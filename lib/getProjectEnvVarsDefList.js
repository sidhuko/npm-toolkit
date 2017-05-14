var _ = require('lodash');
var fs = require('fs-extra');
var getProjectRootDir = require('./getProjectRootDir');

/**
 * Fetches the env vars defined in .env.[key].json file (i.e. .env.qa.json)
 * If no env key is specified it fetches all .env files
 *
 * @param {string} env - Environment variant to use
 * @return {object} Flattened env vars object
 */
function getProjectEnvVarsDefList () {
  var root = getProjectRootDir();
  var list = fs.readdirSync(root);
  var envs = _.filter(list, function (i) {
    return i.startsWith('.env.') && i.endsWith('.json') ? i : false;
  });
  envs = _.map(envs, function (i) {
    return i.replace('.env.', '').replace('.json', '');
  });

  return envs;
};

module.exports = getProjectEnvVarsDefList;
