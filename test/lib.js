var expect = require('chai').expect;
var dispatcher = require('../lib/dispatcher');
// var os = require('os');
// var fs = require('fs-extra');

function generateBasicArgs () {
  var args = {
    cmd: [],
    opts: {},
    onDataFn: function (str) {
      // console.log('>>', str || '');
    },
    onErrFn: function (str) {
      console.log('!!', str || '');
      throwFailure(null, str);
    }
  };
  return args;
}

function throwFailure (exp, actual) {
  if (typeof exp !== 'undefined' && typeof actual !== 'undefined') {
    expect(actual).to.equal(exp);
  } else {
    expect(false).to.be.ok;
  }
}

describe('npm-toolkit dispatcher', function() {
  describe('system tasks', function() {

    it('should execute "" and return a no-task-specified error', function() {
      var args = generateBasicArgs();
      args.onDataFn = function (str) {
        var expected = 'No task specified. See "nt help".';
        if (str !== expected) {
          throwFailure(expected, str);
        }
      };

      var task = dispatcher(args);
    });

    it('should execute "version" task successfully', function() {
      var args = generateBasicArgs();
      args.cmd = 'version';
      var task = dispatcher(args);
    });

    it('should execute "help" task successfully', function() {
      var args = generateBasicArgs();
      args.cmd = 'help';
      var task = dispatcher(args);
    });

    it('should execute "status" task successfully', function() {
      var args = generateBasicArgs();
      args.cmd = 'status';
      var task = dispatcher(args);
    });

    it('should execute "ls" and return no-ntrc error', function() {
      var args = generateBasicArgs();
      args.cmd = 'ls';

      args.onDataFn = function (str) {
        throwFailure(null, str);
      };
      args.onErrFn = function () {};

      var task = dispatcher(args);
    });

    it('should not execute "potato" and return no-task error', function() {
      var args = generateBasicArgs();
      args.cmd = 'potato';

      args.onDataFn = function (str) {
        throwFailure(null, str);
      };
      args.onErrFn = function () {};

      var task = dispatcher(args);
    });
  });

});
