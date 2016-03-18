var path = require('path');
var fs = require('fs-extra');

module.exports = function () {
  var ntGlobal = path.join(__dirname + '/../..');
  var cwd = process.cwd();

  var ntInstalled = fs.existsSync(cwd + '/node_modules/npm-toolkit');
  var ntrcExists = fs.existsSync(cwd + '/ntrc');
  // try using config.resolved.ntrc instead for a parent lookup
  // then assign ntInstalled = fs.existsSync(config.resolved.root + '/node_modules/npm-toolkit');

  if (ntrcExists) {
    return console.log('[nt] Already initialised in the current directory.');
  }

  fs.copy(ntGlobal + '/ntrc-sample', cwd + '/ntrc', function (err) {
    if (err) {
      return console.log('[nt] Couldn\'t create ntrc in your current directory. Please ensure you have write permissions.');
    }

    console.log('[nt] Created ntrc folder in your current dir');
    console.log('[nt] You can use "nt list" to see the sample tasks already registered or "nt status" to see some debug information.');

    if (!ntInstalled) {
      console.log('[nt] Please run "npm install npm-toolkit --save" to install a local copy of nt in your project');
    }

  });

}
