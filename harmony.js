/*
 * harmony-discord
 * a bot for Discord by Michael Candels
 */

// BGN REQUIRE //
var fs = require("fs");
var Discord = require("discord.js");
//var Harmonious = require("./lib/Harmonious.js");
var Auth = require("../harmony-discord-auth/auth.json");
var Help = require("./help.json");
// END REQUIRE //

// BGN BOT CREATION & DEBUG LOGGING
var Bot = new Discord.Client();
var logStream = fs.createWriteStream("harmony_output.log", {"flags" : "a"});
// END BOT CREATION & DEBUG LOGGING

// BGN GLOBAL VARS //
// END GLOBAL VARS //

// BGN GLOBAL FUNCTIONS //
var superLog = function (inputstring) {
	console.log(inputstring);
	logStream.write(inputstring + "\n");
};
// END GLOBAL FUNCTIONS //

// BGN STATE CHANGE EVENT HANDLERS //
Bot.on("ready", function () {
	superLog("================================================================================");
	superLog("status: ready");
	superLog("Connected to:");
	for(i = 0; i < Bot.servers.length; i++){
		superLog("- " + Bot.servers[i].name);
		for(j = 0; j < Bot.servers[i].channels.length; j++){
			superLog("  └──" + Bot.servers[i].channels[j].name);
		}
	}
});
Bot.on("disconnected", function () {
	superLog("status: disconnected");
	// > Should I be running a reconnect function here?

	//exit node.js with an error
	process.exit(1);
});
// BGN STATE CHANGE EVENT HANDLERS //

// BGN QUIET LOGGING //
Bot.on("messageDeleted", function (msg, chn){
	logStream.write(
		"Message by " +
		msg.author.username +
		"#" +
		msg.author.discriminator +
		" deleted in " +
		msg.server.name +
		"#" +
		chn.name +
		": \'" +
		msg.content +
		"\'\n"
	);
});
Bot.on("messageUpdated", function (oldmsg, newmsg) {
	logStream.write(
		"Message by " +
		oldmsg.author.username +
		"#" +
		oldmsg.author.discriminator +
		" updated in " +
		oldmsg.server.name +
		"#" +
		oldmsg.channel.name +
		": \'" +
		oldmsg.content +
		"\' ~ \'" +
		newmsg.content +
		"\'\n"
	);
});
Bot.on("serverCreated", function (srv) {
	logStream.write(
		"Harmony has joined: \'" +
		srv.name +
		"\'\n"
	);
});
Bot.on("serverDeleted", function (srv) {
	logStream.write(
		"Harmony has left: \'" +
		srv.name +
		"\'\n"
	);
});
Bot.on("serverUpdated", function (oldsrv, newsrv) {
	logStream.write(
		"A server Harmony is in has changed names: \'" +
		oldsrv.name +
		"\' ~ \'" +
		newsrv.name +
		"\'\n"
	);
});
//add more events
// END QUIET LOGGING //

// BGN MESSAGE RECEPTION //
Bot.on("message", function (msg) {
	// BGN MESSAGE PARSING //
	logStream.write(
		msg.author.username +
		"#" +
		msg.author.discriminator +
		" sent in " +
		msg.server.name +
		"#" +
		msg.channel.name +
		": \'" +
		msg.content +
		"\'\n");
	// END MESSAGE PARSING //

	// Split arguments following "!" by spaces
	if (msg.content.indexOf("!") === 0) {
		var args = msg.content.substring(1).split(" ");

		// BGN TESTING COMMANDS //
		if (args[0] === "ping") {
			Bot.reply(msg, "hello!");
		}
		// END TESTING COMMANDS //

		// BGN GENERAL COMMANDS //
		// standard rtd command: !rtd (1d20) or !rtd xdy
		if (args[0] === "rtd") {
			if (args.length > 1) {
				var rtdargs = args[1].split("d");
				var dnum = rtdargs[0];
				var snum = rtdargs[1];
				// cap number of dice to 10 because no one needs that power
				if (dnum > 10) { dnum = 10; }
				for (i=0; i<dnum; i++) {
					var dx = Math.floor(Math.random() * (snum - 1) + 1);
					Bot.sendMessage(
						msg.channel,
						msg.author.toString() + " rolled: " + dx
					);
				}
			} else {
				var d20 = Math.floor(Math.random() * (20 - 1) + 1);
				Bot.sendMessage(
					msg.channel,
					msg.author.toString() + " rolled: " + d20
				);
			}
		}
		// END GENERAL COMMANDS //

		// BGN MOD TOOLS //
		// END MOD TOOLS //
}
});
// END MESSAGE RECEPTION //

//Bot.login(Auth.username, Auth.password);
Bot.loginWithToken(Auth.token);
