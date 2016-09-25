## npm-toolkit

Flexible script launcher. Like Grunt or Gulp but without imposing a lot of structure.

Simply add a script to ntrc/tasks folder in your application and you're ready to go.

It also comes with an interactive prompt menu for convenience.
Create workflows as custom as you need them to be.


## Change log

v0.2.2

* Replaced several libraries / general cleanup
* More sensible option parsing
* --debug is now --verbose


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

Added --env switch.


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
nt init
```

Init command will create a sample configuration with a few tasks defined.
These tasks will be picked up automatically and available instantly.
You can run them by typing "nt [task-name]" from anywhere within your project.
To see what tasks are registered use "nt list".

### Aliases

You can use a ntrc directory outside your working dir with --config=/path-to-my-project/ntrc switch.
This can be useful for registering custom aliases in a multi-project configurations.

You can also create a ntrc-alias file anywhere which should be
a text file with a path to the desired ntrc folder.


### Commands

* nt: interactive prompt
* nt [task]: run a task directly
* nt list: lists tasks and file templates
* nt status: shows the status information


### Env variables

npm-toolkit will set the environment variables for you based on env key of your ntrc/settings.json file.
You can use --env switch to quickly change environment configuration, for example typing "nt --env=qa" will load all variables defined in "env.qa" key.


### Switches

--env switch toggles environment definitions on.
--verbose switch will produce detailed log messages about npm-toolkit
--config switch can be used to point to your application regardless of your current location

### Logging issues and feature requests

Please log issues on https://github.com/vot/npm-toolkit/issues

You can also just check out code and create a pull request, contributors welcome :)
