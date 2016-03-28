var path = require('path');
var fs = require('fs-extra');

module.exports = function (opts) {
  // console.log(opts);
  var linkOnly = false;

  var ntGlobal = path.join(__dirname + '/../..');
  var cwd = process.cwd();

  var ntrcExists = fs.existsSync(cwd + '/ntrc');
  var ntInstalled = fs.existsSync(cwd + '/node_modules/npm-toolkit');
  var nmExists = fs.existsSync(cwd + '/node_modules');
  // try using config.resolved.ntrc instead for a parent lookup
  // then assign ntInstalled = fs.existsSync(config.resolved.root + '/node_modules/npm-toolkit');



  var methods = {
    copyNtrc: function (callback) {
      console.log('[nt] Creating ntrc directory');
      fs.copy(ntGlobal + '/ntrc-sample', cwd + '/ntrc', function (err) {
        if (err) {
          console.log('[nt] Couldn\'t create ntrc in your current directory. Please ensure you have write permissions.');
          return callback(err);
        }

        return callback();
      });
    },

    installNt: function (callback) {
      if (ntInstalled) {
        return callback();
      }
      console.log('[nt] Installing npm-toolkit locally');
      fs.ensureDirSync(cwd + '/node_modules');

      if (linkOnly) {
        console.log('Linking to package');
        console.log(ntGlobal);
        // var childProcess = require('child_process');
        // childProcess.spawn('ln -s ');
      } else {
        var childProcess = require('child_process');
        childProcess.spawn('npm', ['install', 'npm-toolkit', '--save'], {cwd: cwd});
      }
    }
  };


  // execute
  if (ntrcExists) {
    console.log('[nt] Already initialised in the current directory.');
    // return;
  } else {
    methods.copyNtrc(function (err) {
      if (err) {
        console.log(err);
        return;
      }

      methods.installNt();

      // console.log('[nt] Created ntrc folder in your current dir');
      // console.log('[nt] You can use "nt list" to see the sample tasks already registered or "nt status" to see some debug information.');

    })
  }



}
