# Install

Start with installing npm-toolkit globally:

```
npm install npm-toolkit -g
```

"nt" command will be registered.


## Quick start

At the top-level of your project you will need to create an "ntrc" folder.
You can do this using the following command:

```
nt init
```

Init command will create a sample configuration with a few tasks defined.


## Running tasks

You can run them by typing "nt [task-name]" from anywhere within your project.
To see what tasks are registered use "nt list".


## Creating tasks

To register a taks all you need to do is put a script in ntrc/tasks.
These tasks will be picked up automatically and available straight away.

For instance if you want to use "nt lint" just create a lint.js file and put
all the script logic in it.
