/*
 * harmony-discord
 * a bot for Discord by Michael Candels
 */

// BGN REQUIRE //
var Discord = require("./node_modules/discord.js/");

//var Harmonious = require("./lib/Harmonious.js");

var Auth = require("../harmony-discord-auth/auth.json");
var Help = require("./help.json");
// END REQUIRE //

// BGN GLOBAL VARS //
// None
// END GLOBAL VARS //

// BGN BOT CREATION
var Bot = new Discord.Client();
// END BOT CREATION

// BGN STATE CHANGE EVENT HANDLERS //
Bot.on("ready", function () {
	console.log("status: ready");
	console.log("Connected to:");
	for(i = 0; i < Bot.servers.length; i++){
		console.log("- " + Bot.servers[i].name);
		for(j = 0; j > Bot.servers.channels.length; j++){
			console.log("└──" + Bot.servers.channels[j]);
		}
	}
});
Bot.on("disconnected", function () {
	console.log("status: disconnected");
	// > Should I be running a reconnect function here?

	//exit node.js with an error
	process.exit(1);
});
// BGN STATE CHANGE EVENT HANDLERS //

// BGN MESSAGE RECEPTION //
Bot.on("message", function (msg) {

	// BGN MESSAGE PARSING //
	// END MESSAGE PARSING //

	// BGN TESTING COMMANDS //
	// END TESTING COMMANDS //

	// BGN GENERAL COMMANDS //

	// END GENERAL COMMANDS //

	// BGN MOD TOOLS //
	// END MOD TOOLS //
});
// END MESSAGE RECEPTION //

//Bot.login(Auth.username, Auth.password);
Bot.loginWithToken(Auth.token);
