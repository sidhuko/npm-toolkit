## npm-toolkit

TL;DR: essentially a fancy "npm run" wrapper / launcher.

NOTE: THIS MODULE IS STILL IN EXPERIMENTAL STAGE. DO NOT USE IN PRODUCTION.

A small command line utility to provide you a prompt-based menu with predefined tasks.
It is written in a simple way to give you the flexibility to create custom workflows available under multiple interfaces.

At the moment it is advised for the tasks should be self-contained and have as little dependencies as possible.
This is in order to ensure integrity of your toolkit and its results regardless of environment or module versions.


## Change log

v0.1.11

Added support for tasks to be executed directly (without the do prefix)


v0.1.10

Updated env switch name (used to be config). Updated docs and parser inputs for help screen.

Fixed settings switch.


v0.1.9

Added env.json parser to set environment variables for your apps through a dedicated JSON file. Supports switching to custom files with --env switch.
By default it looks for env.json, if env switch is set to "yourconfig" then env.yourconfig.json is loaded instead.

### Installing

```
npm install npm-toolkit -g
```

You can also check out development version directly from GitHub, instructions near the end.

"nt" alias will be added globally.


### Quick start
At the top-level of your own app create a folder named npm-toolkit-rc.
You can do this using the following command.

```
mkdir npm-toolkit-rc
```

You add the tasks by creating a Node.js script in npm-toolkit-rc/tasks.
These tasks will be picked up automatically and available instantly.
You can run them by typing "nt do [task-name]" from anywhere within your project

You can use a different settings directory name with --settings=yourdir switch.

### Commands

* nt: interactive prompt
* nt list: lists tasks and file templates
* nt do [task]: run a task directly
* nt make [file]: create a file from a template in a current directory
* nt status: shows the status information


### Example tasks

See example npm-toolkit-rc on GitHub: https://github.com/vot/npm-toolkit-example

The examples include:
- starting app
- reading logs
- running unit tests and linters

What else will be added to examples?
- running migrations for your app
- checking app health (dependencies, services, etc)

### Env variables

npm-toolkit will set the environment variables for your tasks if it finds env.json in your settings directory.
You can use --env switch to quickly change environment configuration, for example typing "nt --env=yourfile" will load variables from "env.yourfile.json".

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

And you're good to go. Making changes to the code and contributing is encouraged :)


### To do

There's still plenty to do around here, including but not limited to:

* Make generic reusable tasks as examples
* Improve documentation
* Allow starting a task as a daemon
* Jumping in and out of daemon's stdout stream
* Create a REST API to communicate between instances of npm-toolkit (with permissions system)
