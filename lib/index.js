var clarg = require('clarg');
var fs = require('fs-extra');

var flattenOutputForConsole = require('./flattenOutputForConsole');
var getSystemInfo = require('./getSystemInfo');


var NpmToolkit = {
  version: require('../package.json').version,

  getProjectRootDir: null,

  getProjectPackageJson: function () {
    // this.getProjectRootDir
    // return this.readJson('./package.json');
    return fs.readJsonSync('./package.json');
  },

  getSystemInfo: getSystemInfo,



  readJson: function (path) {
    return fs.readJsonSync(path);
  },
  /**
   *
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

  getProjectEnvVarsList: function () {
    // readDir and return array of env keys
    return {};
  },

  // read file
  getProjectEnvVars: function (envKey) {
    return {};
  },

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
