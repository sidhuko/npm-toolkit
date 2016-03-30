var path = require('path');
var fs = require('fs-extra');
var childProcess = require('child_process');

module.exports = function (opts) {
  opts = opts || {};
  // console.log(opts);

  var ntGlobal = path.join(__dirname + '/..');
  var cwd = process.cwd();

  var ntrcExists = fs.existsSync(cwd + '/ntrc');
  var ntInstalled = fs.existsSync(cwd + '/node_modules/npm-toolkit');
  var nmExists = fs.existsSync(cwd + '/node_modules');
  // try using config.resolved.ntrc instead for a parent lookup
  // then assign ntInstalled = fs.existsSync(config.resolved.root + '/node_modules/npm-toolkit');



  var methods = {
    copyNtrc: function (callback) {
      console.log('> Creating ntrc directory');
      fs.copy(ntGlobal + '/ntrc-sample', cwd + '/ntrc', function (err) {
        if (err) {
          console.log('> Couldn\'t create ntrc in your current directory. Please ensure you have write permissions.');
          return callback(err);
        }

        return callback();
      });
    },

    installNt: function (opts) {
      if (ntInstalled) {
        return;
      }

      console.log('> Installing npm-toolkit locally');
      fs.ensureDirSync(cwd + '/node_modules');

      if (opts && opts.link) {
        console.log('  > Linking to global npm-toolkit');
        console.log(ntGlobal);
        return childProcess.spawn('ln', ['-s', ntGlobal, './node_modules/npm-toolkit'], {cwd: cwd});
      } else {
        console.log('  > Installing npm-toolkit');
        return childProcess.spawn('npm', ['install', 'npm-toolkit', '--save'], {cwd: cwd});
      }
    }
  };


  // execute
  if (ntrcExists) {
    methods.installNt();
  } else {
    methods.copyNtrc(function (err) {
      if (err) {
        console.log(err);
        return;
      }

      return methods.installNt();
    })
  }

  console.log('Use "nt help" for usage info.');
}
