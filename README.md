# Harmony, a Discord bot based on Discord.js
*Dev note: Harmony is currently meant for only one discord server at a time.*

## Development status
TODO for vx.x.x: Get to v1.0.0
* Update help.json
* Update options_example.json

v1.0.0 - Harmony works, however non-breaking changes will be coming.
TODO for v1.0.1:
* Add multi-server support

## Features
* Message logging
* Music playback via YouTube

## Installation

To run this bot from your own node terminal, you must read this section. If it is not helpful, open an issue above.

Harmony is not yet on npm, so you must clone this repo first. You will end up with a folder setup like so:

```
harmony-discord/
├── img/
└─┬ json/
  └── options.json
```

options.json is critical; an example file is provided. You must go to

https://discordapp.com/login?redirect_to=/developers/applications/me

and register your bot. Ensure you create an app bot user. From this, you can use the bot

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
