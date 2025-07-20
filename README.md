# homebridge-applescript-file-speaker

A homebridge speaker accessory that can trigger specific AppleScript files


## Installation

1. Install homebridge using: `npm install -g homebridge`
2. Install this plugin using: `npm install -g homebridge-applescript-file-speaker`
3. Update your configuration file. See `sample-config.json` in this repository for a sample.


## Configuration

Configuration sample:

```
"accessories": [
    {
        "accessory": "ApplescriptFileSpeaker",
        "name": "iTunes Speaker",
        "on": "",
        "off": "",
        "volume": "/Users/bendodson/Documents/Scripts/musicVolume.applescript"
    }
]
```
Note that you must use absolute paths for your AppleScript file.

In this example the "volume" attribute is used to change the volume of iTunes although you can specify on / off states should you want to do something like pause or resume iTunes with the same accessory. An example of a volume control AppleScript is listed below:

```
on run argv
    set v to item 1 of argv
    activate application "iTunes"
    tell application "iTunes"
        set sound volume to v
    end tell
end run
```

## Credits

My thanks to [Dan Budiac](https://github.com/dansays/) for his original [homebridge-applescript plugin](https://github.com/dansays/homebridge-applescript) from which this is based.
