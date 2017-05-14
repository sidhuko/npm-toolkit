var expect = require('chai').expect;
var launcher = require('../lib/launcher');
var readJson = require('../lib/readJson');
var getScriptsFromPackageJson = require('../lib/getScriptsFromPackageJson');

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

describe('npm-toolkit launcher', function() {
  describe('system tasks', function() {

    it('should execute "" and return a no-task-specified error', function() {
      var args = generateBasicArgs();
      args.onDataFn = function (str) {
        var expected = 'No task specified. See "nt help" for usage info or "nt list" for a list of available tasks.';
        if (str !== expected) {
          throwFailure(expected, str);
        }
      };

      var task = launcher(args);
    });

    it('should execute "version" task successfully', function() {
      var args = generateBasicArgs();
      args.cmd = 'version';
      var task = launcher(args);
    });

    it('should execute "help" task successfully', function() {
      var args = generateBasicArgs();
      args.cmd = 'help';
      var task = launcher(args);
    });

    it('should execute "status" task successfully', function() {
      var args = generateBasicArgs();
      args.cmd = 'status';
      var task = launcher(args);
    });

    it('should execute "ls" and return no-ntrc error', function() {
      var args = generateBasicArgs();
      args.cmd = 'ls';

      args.onDataFn = function (str) {
        throwFailure(null, str);
      };
      args.onErrFn = function () {};

      var task = launcher(args);
    });

    it('should not execute "potato" and return no-task error', function() {
      var args = generateBasicArgs();
      args.cmd = 'potato';

      args.onDataFn = function (str) {
        throwFailure(null, str);
      };
      args.onErrFn = function () {};

      var task = launcher(args);
    });

    it('should switch cwd correctly', function() {
      var args = generateBasicArgs();
      args.cmd = 'db';
      args.opts.cwd = __dirname + '/../examples';

      var task = launcher(args);
    });
  });

});


describe('npm-toolkit readJson', function() {
  it('should read JSON correctly', function() {
    var list = readJson(__dirname + '/../examples/ntrc/settings.json', function (err, data) {
      expect(err).to.be.falsy;
      expect(data).to.not.be.empty;
    });
  });

  it('should throw error when JSON is invalid or file does not exits', function() {
    var list = readJson(__dirname + '/../examples/ntrc/settings-asdf-asdf.json', function (err, data) {
      expect(err).to.not.be.empty;
      expect(data).to.be.falsy;
    });

  });
});

describe.skip('npm-toolkit getScriptsFromPackageJson', function() {
  it('should pick up tasks in examples folder', function() {
    var list = getScriptsFromPackageJson(__dirname + '/../examples/ntrc');
    expect(list).to.not.be.empty;
  });

  it.skip('should return a function loading a task successfully', function() {
    var task = getScriptsFromPackageJson(__dirname + '/../examples/ntrc', 'db');
    expect(typeof task).to.equal('function');
  });

  it('should return with no value for missing task', function() {
    var task = getScriptsFromPackageJson(__dirname + '/../examples/ntrc', 'db-asdf');
    expect(typeof task).to.equal('undefined');
  });
});
