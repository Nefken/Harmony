/*
 * harmony-discord
 * a bot for Discord by Michael Candels
 */

// BGN REQUIRE //
var fs = require("fs");
var Discord = require("discord.js");
var YoutubeStream = require("youtube-audio-stream");
var MusicQueue = require("./lib/MusicQueue.js")
var Opt = require("./json/options.json");
var Help = require("./json/help.json");
// END REQUIRE //

// BGN BOT CREATION & DEBUG LOGGING
var Bot = new Discord.Client();
//var Queue = new MusicQueue;
var logStream = fs.createWriteStream("harmony_output.log", {"flags" : "a"});
// END BOT CREATION & DEBUG LOGGING

// BGN GLOBAL VARS //
var ampitup = true; // "do I keep playing the queue or not"
var isplaying = false;
var music_queue = [];
// END GLOBAL VARS //

// BGN GLOBAL FUNCTIONS //
var superLog = function (inputstring) {
	console.log(inputstring);
	logStream.write(inputstring + "\n");
}
var playMusic = function (srv) {
	var channel = srv.channels.get("name", Opt.music.voiceChannel);
	Bot.joinVoiceChannel(channel).then( (connection) => {
		isplaying = true;
		connection.playRawStream(
			YoutubeStream(music_queue.shift())
		).then(intent => {
			intent.on('end', () => {
				isplaying = false;
				if (music_queue.length != 0 && ampitup) {
					playMusic();
				} else {
					Bot.leaveVoiceChannel(channel);
				}
			})
			intent.on('error', () => {
				console.log('Playback Error: ' + err);
				isplaying = false;
				Bot.leaveVoiceChannel(channel);
			})
		});
	}).catch(err => {
			console.log("error: " + err);
	});
}
var queueMusic = function (srvid, url) {
	music_queue.push(url);
}
// END GLOBAL FUNCTIONS //

// BGN STATE CHANGE EVENT HANDLERS //
Bot.on("ready", function () {
	superLog("================================================================================");
	superLog("status: ready");
	superLog("Connected to:");
	for(i = 0; i < Bot.servers.length; i++){
		superLog("- " + Bot.servers[i].name);
		for(j = 0; j < Bot.servers[i].channels.length - 1; j++){
			superLog("  ├──" + Bot.servers[i].channels[j].name);
		}
		superLog("  └──" +
			Bot.servers[i].channels[Bot.servers[i].channels.length - 2].name
		);
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
// TODO: add more events
// END QUIET LOGGING //

// BGN MESSAGE RECEPTION //
Bot.on("message", function (msg) {
	// BGN MESSAGE PARSING //
	logStream.write( // put it in the log, but not the console
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

	// BGN COMMAND PARSING //
	if (msg.content.indexOf("!") === 0) {
		// Split arguments following "!" by spaces
		// > this could bite me in the future if spaces are not to be ignored
		var args = msg.content.substring(1).split(" ");

		// BGN TESTING COMMANDS //
		if (args[0] === "ping") {
			Bot.reply(msg, "hello!");
		}
		// END TESTING COMMANDS //

		// BGN GENERAL COMMANDS //
		if (args[0] === "rtd") {
			// standard rtd command: !rtd (1d20) or !rtd xdy
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
		if (args[0] === "modtools") {
			if(Opt.users.mods.indexOf(msg.author.id) != -1) {
				superLog("Modtools invoked by " +
					msg.author.username + "#" +
					msg.author.discriminator
				);
			}
			// modtools here
		}
		// END MOD TOOLS //

		// BGN MUSIC TOOLS //
		if (args[0] === "music") {
			if (args[1] === "play") {
				if (!isplaying) {
					ampitup = true;
					playMusic(msg.server);
				} else {
					Bot.voiceConnection.resume();
				}
			}
			if (args[1] === "queue") {
				queueMusic(msg.server.id, args[2]);
			}
			if (args[1] === "pause") {
				Bot.voiceConnection.pause();
			}
			if (args[1] === "resume") {
				Bot.voiceConnection.resume();
			}
			if (args[1] === "skip") {
				Bot.voiceConnection.stopPlaying();
			}
			if (args[1] === "stop") {
				ampitup = false;
				isplaying = false;
				Bot.voiceConnection.destroy();
			}
		}
		// END MUSIC TOOLS //
	}
	// END COMMAND PARSING
});
// END MESSAGE RECEPTION //

// BGN FOOTER //
Bot.loginWithToken(Opt.auth.token);

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
// END FOOTER //
