/*
 * harmony-discord
 * a bot for Discord by Michael Candels
 */

// BGN REQUIRE //
var Discord = require("./node_modules/discord.js/");

var Harmonious = require("./lib/Harmonious.js");

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
	console.log("Connected to " + Bot.channels.length + " channels");
	console.log("In servers:");
	for(i = 0; i < Bot.servers.length; i++){
		console.log("- " + Bot.servers[i].name);
		Harmonious.addToServerlist(
			new Harmonious.Server(Bot.servers[i]),
			Harmonious.serverlist
			);
	}
});
Bot.on("disconnected", function () {
	console.log("status: disconnected");
	// >Should I be running a reconnect function here?

	//exit node.js with an error
	process.exit(1);
});
// BGN STATE CHANGE EVENT HANDLERS //

// BGN USERLIST UPDATER v1 //
Bot.on("serverNewMember",function (server, user) {
	var thisserver = Harmonious.serverGivenID(server.id, Harmonious.serverlist);
	if (thisserver !== "Server not found"){
			thisserver.addToUserlist(new Harmonious.User(user));
	} else {
		console.log("Error in adding new member!");
	}
});
Bot.on("serverMemberUpdated",function (server, user) {
	var thisserver = Harmonious.serverGivenID(server.id, Harmonious.serverlist);
	if (thisserver !== "Server not found"){
			thisserver.updateUserlist(user);
	} else {
		console.log("Error in updating member!");
	}
});
Bot.on("serverMemberRemoved",function (server, user) {
	var thisserver = Harmonious.serverGivenID(server.id, Harmonious.serverlist);
	if (thisserver !== "Server not found"){
			thisserver.removeFromUserlist(user);
	} else {
		console.log("Error in updating member!");
	}
});
// END USERLIST UPDATER v1 //

// BGN SERVERLIST UPDATER v2 //
Bot.on("serverCreated",function (newdserver) {
	var newhserver = new Harmonious.Server(newdserver);
	Harmonious.addToServerlist(
		newhserver,
		Harmonious.serverlist);
	console.log("status: ready");
	console.log("Connected to " + Bot.channels.length + " channels");
	console.log("In servers:");
	for(i = 0; i < Bot.servers.length; i++){
		console.log("- " + Bot.servers[i].name);
	}
});
Bot.on("serverUpdated",function (olddserver, newdserver) {
	var oldhserver = Harmonious.serverGivenID(olddserver.id);
	var newhserver = new Harmonious.Server(newdserver);
	// save old harmonious data
	newhserver.userlist = oldhserver.userlist;
	newhserver.jointime = oldhserver.jointime;
	Harmonious.updateServerlist(
		oldhserver,
		newdserver,
		Harmonious.serverlist);
	console.log("Connected to " + Bot.channels.length + " channels");
	console.log("In servers:");
	for(i = 0; i < Bot.servers.length; i++){
		console.log("- " + Bot.servers[i].name);
	}
});
Bot.on("serverDeleted",function (olddserver) {
	var oldhserver = Harmonious.serverGivenID(
		olddserver.id,
		Harmonious.serverlist);
	Harmonious.removeFromServerlist(
		oldhserver,
		Harmonious.serverlist);
	console.log("Connected to " + Bot.channels.length + " channels");
	console.log("In servers:");
	for(i = 0; i < Bot.servers.length; i++){
		console.log("- " + Bot.servers[i].name);
	}
});
// END SERVERLIST UPDATER v2 //

// BGN MESSAGE RECEPTION //
Bot.on("message", function (msg) {

	// BGN MESSAGE PARSING //
	// > for the eventual !copycat command.
	// END MESSAGE PARSING //

	// BGN TESTING COMMANDS //
	// > Don't use this, it's usually broken
	if (msg.content.indexOf("!ping") === 0) {
		console.log("Connected to " + Bot.channels.length + " channels");
		console.log("In servers:");
		for(i = 0; i < Bot.servers.length; i++){
			console.log("- " + Bot.servers[i].name);
		}
	}
	// END TESTING COMMANDS

	// BGN GENERAL COMMANDS //
	if (msg.content.indexOf("!hello") === 0) {
		// send a message in the channel the message was sent in, and @mention sender
		Bot.sendMessage(msg.channel, "Hello, " + msg.author.toString() + "!");
	}
	if (msg.content.indexOf("!help") === 0) {
		var helptype = msg.content.substring(6);
		if (helptype.indexOf("modtools") === 0) {
			Bot.sendMessage(msg.channel, Help.modtools);
		} else {
		Bot.sendMessage(msg.channel, Help.text);
		}
	}
	if (msg.content.indexOf("!rtd") === 0) {
		var sides = Number(msg.content.substring(5));
		if (sides === 0) {
			sides = 20;
		}
		var rtd = Math.floor(Math.random() * (sides - 1) + 1);
		Bot.sendMessage(msg.channel, String(rtd));
	}

	// END GENERAL COMMANDS //

	// BGN MOD TOOLS //
	if (msg.content.indexOf("!modtools") === 0) {
		var args = msg.content.substring(10);
		args = args.split(" ");
		if (args[0] === "help") {
			Bot.sendMessage(msg.channel, Help.modtools);
		}/*
		if (args[0] === "timeInServer" && args.length === 3) {
			var serverid = args[1];
			var userid = args[2];
			var hserver = Harmonious.serverGivenID(
				serverid,
				Harmonious.serverlist
			);
			if (hserver !== "Server not found") {
				var huser = hserver.userGivenID(userid);
				var servertime = hserver.userTimeInServer(huser);
				if (huser === "User not found") {
					Bot.sendMessage(msg.channel, huser);
				} else {
					Bot.sendMessage(msg.channel,
						huser.name +
						" has been in " +
						hserver.name +
						" for " +
						servertime +
						" ms.");
				}
			}
		}*/
	}
	// END MOD TOOLS //
});
// END MESSAGE RECEPTION //

//Bot.login(Auth.username, Auth.password);
Bot.loginWithToken(Auth.token);
