## npm-toolkit

TL;DR: essentially a fancy "npm run".

A small command line utility to provide you a prompt-based menu with predefined tasks.
It is written in a simple way to give you the flexibility to create custom workflows available under multiple interfaces.


It should be possible to run as:

* npm-toolkit: interactive prompt
* npm-toolkit do [task]: run a task directly
* npm-toolkit web: starts web interface (not yet implemented)


At the moment there aren't many features but the example tasks can include things like:
- starting app
- reading logs
- running unit tests and linters
- running migrations for your app
- checking dependencies & integration: MongoDB, Redis, VPN, external services, their pings
- checking config values of your app and the environment
- setting an application up for predefined deployments (creating symlinks for developers, setting env variables)
- ssh into the deployed boxes and predefine the common tasks
  to be ran without having to log in (such as restarting a remote service)


### Installing

First install npm-toolkit globally and register task alias.

```
npm install . -g
```

In case you want to use development version and contribute node-toolkit
checkout the project from GitHub and create links manually:
```
  git clone https://github.com/git/npm-toolkit.git

  ln -s ' + TOOLKIT_DIR + ' /usr/local/lib/node_modules/npm-toolkit

  ln -s /usr/local/lib/node_modules/npm-toolkit/index.js /usr/local/bin/npm-toolkit
```

### How to use

Note: If you chose to check out from GitHub you should do the following
in a different directory than the one with your npm-toolkit copy.

At the top-level of your own app create a folder named npm-toolkit-rc.
You can do this using the following command.

```
  mkdir npm-toolkit-rc
```

You can also check out the example code directly from GitHub:
```
  git clone https://github.com/vot/npm-toolkit-example.git
```

The example code can be seen here: https://github.com/vot/npm-toolkit-example

### To do

This will have to be a long list of features since there is a lot of stuff to write ;)

* Pretty much everything on the list of example uses + make standard tasks generic to be reusable
* Write documentation and proper example configurations
* Starting services as a daemon
* Jumping in and out of daemon's stdout stream
* Create a REST API to communicate between instances of npm-toolkit (with permissions system)
* Unify the internal API
* Write a parser for userdata.ntkrc
* Add an optional "ntk" alias
* Write a parser for commands.json to generate interactive menu & Web interface
