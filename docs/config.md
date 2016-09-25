# Config

Config object consists of a few main areas: const, opts, resolved and settings.

Const key stores the internal constants that npm-toolkit requires to run.
This will be created automatically and in most cases can be ignored.

Opts object contains the switches passed through CLI.

Resolved object contains three properties: ntrc, root and settingsDirname.
ntrc is a full path with the ntrc folder in use.
root is a full path of your project.

Settings object is built with contents of settings.json and settings.local.json
in your app's ntrc folder.

Your settings file has to contain at least root property which will point
to the root of your project. That will be the base of all scripts that you
execute. This allows you to have any project structure that works in your case.


Example config object:

```
{
  "const": {
    "version": "0.2.2",
    "settingsDirname": "ntrc",
    "settingsDirnameAlias": "ntrc-alias",
    "projectSettingsFilename": "settings.json",
    "localSettingsFilename": "settings.local.json"
  },
  "opts": {
    "verbose": true,
    "env": "dev"
  },
  "resolved": {
    "ntrc": "/Users/username/yourapp/ntrc",
    "settingsDirname": "ntrc",
    "root": "/Users/username/yourapp"
  },
  "initialised": true,
  "settings": {
    "root": "..",
    "env": {
      "_": {},
      "dev": {
        "MONGO_URI": "mongodb://mongo.yourapp.com:27017",
        "MOUNTING_URL": "/yourapp"
      }
    },
    "local": {
      "env": {
        "_": {
          "BYPASS_MIGRATIONS": true
        },
        "dev": {
          "MONGO_URI": "mongodb://localhost:27017"
        }
      }
    }
  }
}
```
