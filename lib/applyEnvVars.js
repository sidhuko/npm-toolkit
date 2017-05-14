var _ = require('lodash');
var getProjectEnvVars = require('./getProjectEnvVars');

/**
 * Sets env vars for specified env
 * @param {string} env - Environment variant to use
 */
function applyEnvVars(env, args) {
  var envVars = (typeof env === 'string') ? getProjectEnvVars(env) : env;
  var isVerbose = _.get(args, 'opts.verbose');

  Object.keys(envVars).forEach(function (key) {
    if (process.env[key]) {
      if (isVerbose) print.data(chalk.grey('[debug] Overwriting environment variable', key + ':', process.env[key], '->', envVars[key]));
    } else {
      if (isVerbose) print.data(chalk.grey('[debug] Setting environment variable', key + ':', envVars[key]));
    }
    process.env[key] = envVars[key];
  });
};

module.exports = applyEnvVars;
