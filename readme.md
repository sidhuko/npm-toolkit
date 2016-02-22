## npm-toolkit

Highly customisable script launcher. Flexibility by design.
TL;DR: a fancy "npm run" wrapper. It's like Grunt or Gulp but without getting in your way or imposing their ways of doing things.

A small command line utility will provide you with a prompt-based menu with predefined tasks.
It allows you to create workflows as custom as you need them to be.


## Change log

v0.2.0

* Dropped legacy 'npm-toolkit' alias in favour of simple 'nt'
* Removed 'do' command completely
* Resolving everything to absolute paths to enable better handling of aliases
* Introduced 'ntrc-alias' files (text file with location of 'ntrc' folder to use)
* Renamed 'npm-toolkit-rc' to 'ntrc'
* Replaced 'userdata.ntkrc' with 'settings.json' and 'settings.local.json'
* Env var definitions should now be checked into 'settings.json' (supports user-level overrides in 'settings.local.json')



v0.1.14

* Cleaner 'nt status' output


v0.1.13

* Added padding in 'nt status' for easier reading
* Cleaned up files (linting)



v0.1.12

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
At the top-level of your own app create a folder named ntrc.
You can do this using the following command.

```
mkdir ntrc
```

You add the tasks by creating a Node.js script in ntrc/tasks.
These tasks will be picked up automatically and available instantly.
You can run them by typing "nt [task-name]" from anywhere within your project

### Aliases

You can use a ntrc directory outside your working dir with --config=/path-to-my-project/ntrc switch.
This can be useful for registering custom aliases in a multi-project configurations.

You can also put a


### Commands

* nt: interactive prompt
* nt [task]: run a task directly
* nt list: lists tasks and file templates
* nt make [file]: create a file from a template in a current directory
* nt status: shows the status information


### Env variables

npm-toolkit will set the environment variables for you based on env key of your ntrc/settings.json file.
You can use --env switch to quickly change environment configuration, for example typing "nt --env=qa" will load all variables defined in "env.qa" key.


### Logging issues and feature requests

Please log issues on https://github.com/vot/npm-toolkit/issues

You can also just check out code and create a pull request, contributors welcome :)

More docs coming. In the meantime - check in code ;)

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
ln -s /usr/local/lib/node_modules/npm-toolkit ./node_modules/npm-toolkit
```
