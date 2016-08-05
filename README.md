# Harmony, a Discord bot based on Discord.js

## Development status
Harmony is currently under heavy development and is not intended to be used as is yet. If you have issues using Harmony, please be patient.

## Available commands

### General commands
- !help - shows available commands
- !hello - Harmony will say hello to you.
- !rtd [number of sides] - Dice rolls! *Originality!* (default is d20)

### modtool commands
- !modtools help - shows help for modtools

## Usage

To run this bot from your own node terminal, you must read this section. If it is not helpful, open an issue above.

To use this bot, you must have two folders that look something like this:

```
harmony-discord/
└── harmony.js, README.md, etc.
harmony-discord-auth/
└── auth.json
```

auth.json is critical. You must go to

https://discordapp.com/login?redirect_to=/developers/applications/me

and register your bot. Ensure you create an app bot user.

Finally auth.json must look like so:
```json
{
	"token"		:	"YOUR CLIENT ID"
}
```

Do this, and you should be all set to run Harmony from the harmony-discord/ directory via the command:

```
node harmony.js
```

## Contribution

Go ahead and open a pull request! I'm always happy to receive help.
