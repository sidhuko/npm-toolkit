## npm-toolkit

[![NPM Version][npm-img]][npm-url]
[![NPM Downloads][npm-dl-img]][npm-url]
[![Travis build][travis-img]][travis-url]
[![Coveralls coverage][coveralls-img]][coveralls-url]

[npm-url]: https://npmjs.org/package/npm-toolkit
[npm-img]: https://img.shields.io/npm/v/npm-toolkit.svg
[npm-dl-img]: https://img.shields.io/npm/dm/npm-toolkit.svg
[travis-img]: https://img.shields.io/travis/vot/npm-toolkit.svg
[travis-url]: https://travis-ci.org/vot/npm-toolkit
[coveralls-img]: https://img.shields.io/coveralls/vot/npm-toolkit.svg
[coveralls-url]: https://coveralls.io/github/vot/npm-toolkit


Task development toolkit. Bundles a collection of utilities.
The idea is to have scripts that you can run from all potential
entry points - through CLI or code.

The CLI utility can pick up tasks in project's package json
and enhance the default behaviour of "npm run".
while the module can assure that the scripts created
have all their most common tasks available in one place
and that they can be used in more than one way.



### Installing

```
npm install npm-toolkit
```

If you'd like to have the CLI utility available in any package
you can install the package globally as well
by adding `-g` to the above command.



### Quick start

### Commands

* nt [task]: run a package.json script
* nt list: list available tasks
* nt status: shows useful debug information


### Switches

--env switch toggles environment definitions on.
--verbose switch will produce detailed log messages about npm-toolkit
--config switch can be used to point to your application regardless of your current location


### Env variable definitions

npm-toolkit will set the environment variables for you based on the env key provided.

You can use --env switch to quickly swap the configuration of your application's environment.

For example typing "nt --env=qa" will load all variables defined in ".env.qa" key.
