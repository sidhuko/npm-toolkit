## npm-toolkit

A small command line utility to provide you a prompt-based menu with predefined
tasks.


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

```
npm install . -g

npm install github:vot/npm-toolkit -g
```

### How to use

First install npm-toolkit globally and register task alias.
In most cases you can use "npm install npm-toolkit -g" for that.

For local development create links manually:
  ln -s ' + TOOLKIT_DIR + ' /usr/local/lib/node_modules/npm-toolkit
  ln -s /usr/local/lib/node_modules/npm-toolkit/index.js /usr/local/bin/npm-toolkit

Then create a folder named npm-toolkit-rc in your project directory.
Check out the example at https://github.com/vot/npm-toolkit-example 


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
