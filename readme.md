## npm-toolkit

TL;DR: essentially a fancy "npm run" wrapper / launcher.

NOTE: THIS MODULE IS STILL IN EXPERIMENTAL STAGE. DO NOT USE IN PRODUCTION.

A small command line utility to provide you a prompt-based menu with predefined tasks.
It is written in a simple way to give you the flexibility to create custom workflows available under multiple interfaces.

At the moment it is advised for the tasks should be self-contained and have as little dependencies as possible.
This is in order to ensure integrity of your toolkit and its results regardless of environment or module versions.


## Change log

v0.1.9

Added env.json parser to set environmental variables for your apps through a dedicated JSON file. Supports multiple configs with --config switch.
By default it looks for env.json, if config switch is set to "yourconfig" then env.yourconfig.json is loaded instead.

### Installing

```
npm install npm-toolkit -g
```

You can also check out development version directly from GitHub, instructions near the end.

"npm-toolkit" and "nt" aliases will be added globally and can be used interchangeably.


### Quick start
At the top-level of your own app create a folder named npm-toolkit-rc.
You can do this using the following command.

```
mkdir npm-toolkit-rc
```

You add the tasks by creating a Node.js script in npm-toolkit-rc/tasks.
These tasks will be picked up automatically and available instantly.
You can run them by typing "nt do [task-name]" from anywhere within your project

See example npm-toolkit-rc on GitHub: https://github.com/vot/npm-toolkit-example

### Commands

* nt: interactive prompt
* nt list: lists tasks and file templates
* nt do [task]: run a task directly
* nt make [file]: create a file from a template in a current directory
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


### Logging issues and feature requests

Please log issues on https://github.com/vot/npm-toolkit/issues

You can also just check out code and create a pull request, contributors welcome :)


### Manual installation (development version)

In case you want to use development version and contribute node-toolkit
checkout the project from GitHub and create links manually:
```
  git clone https://github.com/git/npm-toolkit.git

  ln -s $(pwd) /usr/local/lib/node_modules/npm-toolkit

  ln -s /usr/local/lib/node_modules/npm-toolkit/index.js /usr/local/bin/nt
```

Then in your app folder:

```
ln -s /usr/local/lib/node_modules/npm-toolkit ./npm-toolkit-rc/node_modules/npm-toolkit
```

And you're good to go. You can make changes to the code and contribute :)


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
