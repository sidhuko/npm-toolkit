#!/usr/bin/env node
var taskDispatcher = require('./lib/dispatcher');
var parseCliArgs = require('./lib/parseCliArgs');
var chalk = require('chalk');
var args = parseCliArgs();
args.onDataFn = function onDataFn(str) {
  console.log(str);
};
args.onErrFn = function onErrFn(str) {
  console.error(chalk.red.bold('[ERR!]'), str);
  process.exit(1);
};

taskDispatcher(args);
