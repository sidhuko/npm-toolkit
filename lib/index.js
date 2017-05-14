var _ = require('lodash');
var clarg = require('clarg');
var fs = require('fs-extra');
var flattenOutputForConsole = require('./flattenOutputForConsole');

var getNtVersion = require('./getNtVersion');
var getProjectRootDir = require('./getProjectRootDir');
var locatePackageJson = require('./locatePackageJson');
var getProjectPackageJson = require('./getProjectPackageJson');
var getScriptsFromPackageJson = require('./getScriptsFromPackageJson');
var getSystemInfo = require('./getSystemInfo');
var readJson = require('./readJson');

var getProjectEnvVars = require('./getProjectEnvVars');
var getProjectEnvVarsList = require('./getProjectEnvVarsList');

var NpmToolkit = {
  version: getNtVersion,
  getProjectRootDir: getProjectRootDir,
  locatePackageJson: locatePackageJson,
  getProjectPackageJson: getProjectPackageJson,
  getScriptsFromPackageJson: getScriptsFromPackageJson,
  getSystemInfo: getSystemInfo,
  readJson: readJson,
  /**
   * @param {Mixed} args An array or a string of CLI arguments
   */
  parseCLI: function (args) {
    if (typeof args === 'string') {
      args = args.split(' ');
    }
    if (!Array.isArray(args)) {
      args = null;
    }

    var parsed = clarg(args);
    return parsed;
  },

  getProjectEnvVarsList: getProjectEnvVarsList,

  // read file
  getProjectEnvVars: getProjectEnvVars,

  applyProjectEnvFile: function (envMap) {
    if (typeof envMap === 'string') {
      envMap = this.getProjectEnvVars(envMap);
    }

    //

    return envMap;
  },

  exec: null,

  execNpmScript: null,

  printOut: function () {
    var flattenedArgs = flattenOutputForConsole(arguments);
    console.log(flattenedArgs);
  },

  printErr: function () {
    var flattenedArgs = flattenOutputForConsole(arguments);
    console.error(flattenedArgs);
  },

  glob: null,

  tailFile: null,

  fsDelete: null,

  fsMove: null,

  fsCopy: null,

  fsUnzip: null,



};

module.exports = NpmToolkit;
