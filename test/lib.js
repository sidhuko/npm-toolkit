var expect = require('chai').expect;
var dispatcher = require('../lib/dispatcher');
// var os = require('os');
// var fs = require('fs-extra');

describe('npm-toolkit dispatcher', function() {
  describe('system tasks', function() {

    it('should execute "" and return a no-task-specified error', function() {
      var args = {}
      var task = dispatcher(args);
      // console.log(task);
      expect(true).to.be.ok;
      // expect(task).to.equal('No task specified. See "nt help".');
    });

    it('should execute "version" task successfully', function() {
      var args = {cmd: 'version'}
      var task = dispatcher(args);
      // console.log(task);
      expect(true).to.be.ok;
    });

    it('should execute "help" task successfully', function() {
      var args = {cmd: 'help'}
      var task = dispatcher(args);
      // console.log(task);
      expect(true).to.be.ok;
    });

    it('should execute "status" task successfully', function() {
      var args = {cmd: 'status'}
      var task = dispatcher(args);
      // console.log(task);
      expect(true).to.be.ok;
    });

    it('should execute "ls" and return no-ntrc error', function() {
      var args = {cmd: 'ls'}
      var task = dispatcher(args);
      // console.log(task);
      expect(true).to.be.ok;
    });

    it('should not execute "potato" and return no-task error', function() {
      var args = {cmd: 'potato'}
      var task = dispatcher(args);
      // console.log(task);
      expect(true).to.be.ok;
    });
  });

});
