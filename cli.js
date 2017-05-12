#!/usr/bin/env node
var taskDispatcher = require('./lib/dispatcher');
var parseCliArgs = require('./lib/parseCliArgs');
var args = parseCliArgs();
taskDispatcher(args);
