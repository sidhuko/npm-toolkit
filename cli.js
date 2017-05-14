#!/usr/bin/env node
var launcher = require('./lib/launcher');
var parseCliArgs = require('./lib/parseCliArgs');
var chalk = require('chalk');
var args = parseCliArgs();
args.onDataFn = function onDataFn(str) {
  console.log(str || '');
};
args.onErrFn = function onErrFn(str) {
  console.error(chalk.red.bold('[ERR!]'), str || '');
  process.exit(1);
};

launcher(args);
