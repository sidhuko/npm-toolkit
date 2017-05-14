var clarg = require('clarg');

var NpmToolkit = {
  version: function () {
    return require('./package.json').version;
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

  applyProjectEnvFile: function (envKey) {
    return {};
  },

  exec: function (cmd) {

  },

  printOut: function (str) {
    console.log(str);
  },

  printErr: function (str) {
    console.error(str);
  },

  getProjectRootDir: function () {

  },

  getProjectPackageJson: function () {

  },

  tailFile: function () {

  },

  fsDelete: function () {

  },

  fsMove: function () {

  },

  fsCopy: function () {

  },

  fsZip: function () {

  }



};

module.exports = NpmToolkit;
