var _ = require('lodash');
var fs = require('fs-extra');
var _flattenOutputForConsole = require('./_flattenOutputForConsole');

var NpmToolkit = {
  version: require('./getNtVersion'),
  getProjectRootDir: require('./getProjectRootDir'),
  locatePackageJson: require('./locatePackageJson'),
  getProjectPackageJson: require('./getProjectPackageJson'),
  getScriptsFromPackageJson: require('./getScriptsFromPackageJson'),
  getSystemInfo: require('./getSystemInfo'),
  readJson: require('./readJson'),
  parseCLI: require('./parseCLI'),
  getProjectEnvVarsDefList: require('./getProjectEnvVarsDefList'),
  getProjectEnvVars: require('./getProjectEnvVars'),
  applyEnvVars: require('./applyEnvVars'),
  exec: require('./exec'),
  execNpmScript: require('./execNpmScript'),

  tailFile: null,
  fsFind: null,
  fsExists: null,
  fsDelete: null,
  fsMove: null,
  fsCopy: null,
  fsUnzip: null,
  fsPatch: null,

  printOut: function () {
    var flattenedArgs = _flattenOutputForConsole(arguments);
    console.log(flattenedArgs);
  },

  printErr: function () {
    var flattenedArgs = _flattenOutputForConsole(arguments);
    console.error(flattenedArgs);
  },

};

module.exports = NpmToolkit;
