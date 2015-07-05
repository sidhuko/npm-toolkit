var _ = require('lodash');
var chalk  = require('chalk');
//var fs = require('fs');
var Helpers = require('../helpers');
var config = require('../../config');

module.exports = function (opts) {
  var displayStyle = (opts.quiet) ? 'short' : 'detailed';
  console.log(opts.example);
  Helpers.printHeader(displayStyle);

  //console.log('Initialising npm-toolkit-rc...');

  console.log('For this to work config.js will have to output a function with callback');
  console.log('so this function can be triggered after root directories are resolved.');

  if (opts.example) {
    // get zip file from https://github.com/vot/npm-toolkit-example/archive/master.zip
    // extract it to temp folder and copy npm-toolkit-rc from it
  } else {
    // copy lib/template-npm-toolkit-rc to ./npm-toolkit-rc
  }

  //console.log('Created npm-toolkit-rc');

  Helpers.printSummary(displayStyle);
};
