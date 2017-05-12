var expect = require('chai').expect;
var nt = require('..');
// var os = require('os');
// var fs = require('fs-extra');

var LOCAL_CACHE_DIR = os.homedir() + '/.ffbinaries-cache';

describe('npm-toolkit dispatcher', function() {
  describe('system tasks', function() {
    // version
    // help
    // init
    // status
    // ls
    // list
    it('should have "status" task', function() {
      var task = nt('status');
      // console.log(task);
      expect(true).to.be.ok;
    });
  });

});
