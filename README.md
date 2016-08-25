# Harmony, a Discord bot based on Discord.js

## Development status

* v1.0.0 - Harmony works as a baseline, however non-breaking changes will be coming.
* v1.0.1 - Added multi-server support, fixed bugs

* TODO for v1.0.2:
 * Recreate modtool command list
 * Update help and examples

## Features
* Message logging
* Music playback via YouTube with multi-server support

## Installation

To run this bot from your own node terminal, read this section. If it is not helpful, open an issue above.

Harmony is not yet on npm, so you must clone this repo first. You will end up with a folder setup like so:

```
harmony-discord/
├── harmony.js, some other files
└─┬ json/
  └── options.json
```

options.json is critical; an example file is provided. You must go to

https://discordapp.com/login?redirect_to=/developers/applications/me

and register your bot. Ensure you create an app bot user. You will use these credentials to log your bot into Discord.

options.json must look like so:
```json
{
  "auth" : {
    "token": "<YOUR SECRET TOKEN>"
  },
  ...
}
```
Then, get ffmpeg in some way, and have it installed on your PATH. Run
```
npm install
```

and everything should be ready.

## Usage

```
node harmony.js
```

Then go to the following link to add Harmony to your server (replace YOUR_CLIENT_ID with your bot's client id):

https://discordapp.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot&permissions=0

## Contribution

Go ahead and open a pull request! I'm always happy to receive help.
