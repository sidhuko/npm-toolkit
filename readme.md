## npm-toolkit

[![NPM Version][npm-img]][npm-url]
[![NPM Downloads][npm-dl-img]][npm-url]
[![Travis build][travis-img]][travis-url]
[![Coveralls coverage][coveralls-img]][coveralls-url]

[npm-url]: https://npmjs.org/package/npm-toolkit
[npm-img]: https://img.shields.io/npm/v/npm-toolkit.svg
[npm-dl-img]: https://img.shields.io/npm/dm/npm-toolkit.svg
[travis-img]: https://img.shields.io/travis/vot/npm-toolkit/v1.0.0.svg
[travis-url]: https://travis-ci.org/vot/npm-toolkit
[coveralls-img]: https://img.shields.io/coveralls/vot/npm-toolkit/v1.0.0.svg
[coveralls-url]: https://coveralls.io/github/vot/npm-toolkit


Everything you need to create your npm run scripts.
Bundles some of the most commonly used methods needed in build scripts.

Scripts can be started with `nt taskname` and `npm run taskname`.
You can also execute them programmatically with `nt.execNpmScript(taskname)`.

To list available tasks you can run `nt list`.

The CLI utility picks up tasks from project's package.json
and enhances the default behaviour of "npm run".



## Installing

Just run `npm install npm-toolkit --save` in your project and start using
npm-toolkit in your scripts.

If you'd like to use the CLI utility install the package globally
with `npm install npm-toolkit -g`. You can then use `nt` command in any package.


## Methods

* `version`
* `getProjectRootDir`
* `getProjectPackageJson`
* `getScriptsFromPackageJson`
* `getSystemInfo`
* `readJson`
* `parseCLI`
* `getProjectEnvVarsList`
* `getProjectEnvVars`
* `applyProjectEnvFile`
* `exec`
* `execNpmScript`
* `printOut`
* `printErr`
* `glob`
* `tailFile`
* `fsDelete`
* `fsMove`
* `fsCopy`
* `fsUnzip`

## CLI

* `nt [task]` runs a package.json script
* `nt list` list available tasks
* `nt status` shows useful debug information
* `nt help` shows useful debug information


### Switches

`--env [-e]` switch applies the env vars from `.env` files in the project
`--verbose [-v]` switch will produce more detailed output from nt
`--cwd [-c]` switch can be used to point to your application regardless of your current location


### Env variable definitions

npm-toolkit can set the environment variables for you based on the env key provided.

For example typing "nt --env=qa" will load all variables defined in ".env.qa" key.
