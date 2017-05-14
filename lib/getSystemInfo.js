var os = require('os');
var getProjectRootDir = require('./getProjectRootDir');
var getNtVersion = require('./getNtVersion');
var getProjectEnvVars = require('./getProjectEnvVars');

module.exports = function () {
  return {
    ntVersion: getNtVersion(),
    nodeVersion: process.version,
    os: [os.type(), os.release(), os.arch()].join(' '),
    hostname: os.hostname(),
    projectRootDir: getProjectRootDir(),
    projectEnvVars: getProjectEnvVars(),
    cwd: process.cwd(),
  };
};
