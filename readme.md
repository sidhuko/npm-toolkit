## npm-toolkit

TL;DR: essentially a fancy "npm run" wrapper / launcher.

NOTE: THIS MODULE IS STILL IN EXPERIMENTAL STAGE. DO NOT USE IN PRODUCTION.

A small command line utility to provide you a prompt-based menu with predefined tasks.
It is written in a simple way to give you the flexibility to create custom workflows available under multiple interfaces.

At the moment it is advised for the tasks should be self-contained and have as little dependencies as possible.
This is in order to ensure integrity of your toolkit and its results regardless of environment or module versions.

### Quick start
1) Install npm-toolkit globally.
2) Set it up in your application.
  * First of all create npm-toolkit-rc in the root of your project.
  * You add the tasks by creating a Node.js script in npm-toolkit-rc/tasks.

"npm-toolkit" and "nt" aliases will be added globally and can be used interchangeably.

You can run created tasks by typing "nt do [task-name]" from anywhere in your project

Check out an example here: https://github.com/vot/npm-toolkit-example


### Displaying tasks in the interactive menu
Assuming you defined your task as "app.js", here is the sample entry you add to tasks.main.json:

```
{
  "name": "Launch app",
  "type": "launch",
  "opts": "app",
  "interfaces": ["cli", "web"]
}
```

Note: opts has to contain the name of your task (same as your filename without the extension).
More docs coming. In the meantime - check in code ;)

### Feature list (draft)

It should be possible to run as:

* nt: interactive prompt
* nt do [task]: run a task directly
* nt list: lists tasks
* nt status: shows the status information
* nt web: starts web interface (not yet implemented)



### Example tasks

At the moment there aren't many predefined tasks but they could include things like:
- starting app
- reading logs
- running unit tests and linters
- running migrations for your app
- checking dependencies & integration: MongoDB, Redis, VPN, external services, their pings
- checking config values of your app and the environment
- setting an application up for predefined deployments (creating symlinks for developers, setting env variables)
- ssh into the deployed boxes and predefine the common tasks
  to be ran without having to log in (such as restarting a remote service)


### Logging issues and feature requests

Please log issues on https://github.com/vot/npm-toolkit/issues

You can also just check out code and create a pull request, contributors welcome :)


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

  ln -s /usr/local/lib/node_modules/npm-toolkit/index.js /usr/local/bin/nt
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

### To do

This will have to be a long list of features since there is a lot of stuff to write ;)

* Pretty much everything on the list of example uses + make standard tasks generic to be reusable
* Write documentation and proper example configurations
* Starting services as a daemon
* Jumping in and out of daemon's stdout stream
* Create a REST API to communicate between instances of npm-toolkit (with permissions system)
* Unify the internal API
* Write a parser for userdata.ntkrc
* Write a parser for commands.json to generate interactive menu & Web interface
