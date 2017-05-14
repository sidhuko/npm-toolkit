var _ = require('lodash');
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
var getProjectEnvVarsDefList = require('./getProjectEnvVarsDefList');
var applyEnvVars = require('./applyEnvVars');
var parseCLI = require('./parseCLI');
var exec = require('./exec');
var execNpmScript = require('./execNpmScript');

var NpmToolkit = {
  version: getNtVersion,
  getProjectRootDir: getProjectRootDir,
  locatePackageJson: locatePackageJson,
  getProjectPackageJson: getProjectPackageJson,
  getScriptsFromPackageJson: getScriptsFromPackageJson,
  getSystemInfo: getSystemInfo,
  readJson: readJson,
  parseCLI: parseCLI,
  getProjectEnvVarsDefList: getProjectEnvVarsDefList,
  getProjectEnvVars: getProjectEnvVars,
  applyEnvVars: applyEnvVars,
  exec: exec,
  execNpmScript: execNpmScript,

  tailFile: null,
  fsFind: null,
  fsExists: null,
  fsDelete: null,
  fsMove: null,
  fsCopy: null,
  fsUnzip: null,
  fsPatch: null,

  printOut: function () {
    var flattenedArgs = flattenOutputForConsole(arguments);
    console.log(flattenedArgs);
  },

  printErr: function () {
    var flattenedArgs = flattenOutputForConsole(arguments);
    console.error(flattenedArgs);
  },

};

module.exports = NpmToolkit;
