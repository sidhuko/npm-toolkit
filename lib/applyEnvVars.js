var getProjectEnvVars = require('./getProjectEnvVars');

/**
 * Sets env vars for specified env
 * @param {string} env - Environment variant to use
 */
function applyEnvVars(env) {
  var envVars = (typeof env === 'string') ? getProjectEnvVars(env) : env;

  Object.keys(envVars).forEach(function (key) {
    if (process.env[key]) {
      if (verbose) print.data(chalk.grey('[debug] Overwriting environment variable', key + ':', process.env[key], '->', envVars[key]));
    } else {
      if (verbose) print.data(chalk.grey('[debug] Setting environment variable', key + ':', envVars[key]));
    }
    process.env[key] = envVars[key];
  });
};

module.exports = applyEnvVars;
