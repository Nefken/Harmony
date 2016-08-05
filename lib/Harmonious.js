var Auth = require("../../harmony-discord-auth/auth.json");

// BGN HARMONIOUS VARS //
// contains all users recognized by the server
var serverlist = [];
// END HARMONIOUS VARS //

// BGN HARMONIOUS FUNCTIONS
var serverGivenID = function(serverid, listofservers) {
	for (i=0; i < listofservers.length; i++){
		if (listofservers[i].id === serverid) {
			return listofservers[i];
		}
	}
	return "Server not found";
};
var printServerlist = function(listofservers) {
	for (i = 0; i < listofservers.length; i++) {
		console.log("-" + listofservers[i].name);
	}
};
var addToServerlist = function(newhserver, listofservers) {
	/*
	 *	> So I really don't know why, but I can't seem to set the input as the new
	 *	discord.js server, which is weird because I believe it is the same code
	 *	as what I currently have, just changing where the object is created.
	 *	So practice from now on: create all objects over in harmony.js.
	 */
	if (!newhserver.isInServerlist(listofservers)) {
		listofservers.push(newhserver);
	}
};
var updateServerlist = function(oldhserver, newhserver, listofservers) {
	if (oldhserver.isInServerlist(listofservers)) {
		var index = listofservers.indexOf(oldhserver);
		if (index > -1) {
			listofservers.splice(index, 1);
			listofservers.push(newhserver);
		}
	}
};
var removeFromServerlist = function(oldhserver, listofservers) {
	if (oldhserver.isInServerlist(listofservers)) {
		var index = listofservers.indexOf(oldhserver);
		if (index > -1) {
			listofservers.splice(index, 1);
		}
	}
};
// END HARMONIOUS FUNCTIONS

// BGN HARMONIOUS CLASSES //
var User = function(user) {
	//vars
	this.obj = user;
	this.name = this.obj.name;
	this.id = this.obj.id;
	/*
	 *	> Note that this currently means the time is set
	 *    based on the time the server becomes "ready",
   *    not the time the user ACTUALLY joins the server.
	 */

	// functions
		// bools
	this.isSuperMod = function() {
		if (this.id === Auth.supermodid) {
			return true;
		} else {
			return false;
		}
	};
	this.isInUserList = function(listofusers) {
		for (i = 0; i < listofusers.length; i++) {
			if (listofusers[i].id === user.id) {
				return true;
			}
		}
		return false;
	};
};
var Server = function(server) {
	//vars
	this.obj = server;
	this.name = this.obj.name;
	this.id = this.obj.id;
	this.userlist = [];

	for (i=0; i < server.members.length; i++) {
		this.userlist.push(new User(server.members[i]));
	}

	//functions
		//bools
	this.isInServerlist = function(listofservers) {
		for (i = 0; i < listofservers.length; i++) {
			if (listofservers[i].id === this.id) {
				return true;
			}
		}
		return false;
	};
		//general
	this.userGivenID = function (userid) {
		for (i=0; i < this.userlist.length; i++) {
			if (Number(this.userlist[i].id) === Number(userid)) {
				return this.userlist[i];
			}
		}
		return "User not found";
	};/*
	this.userTimeInServer = function (huser) {
		var then = new Date(server.detailsOfUser(huser.obj).joinedAt);
		var now = new Date();
		return Moment.range(then, now).valueOf();
	};*/
	this.addToUserlist = function (newhuser) {
		this.userlist.push(newhuser);
	};
	this.updateUserlist = function (newduser) {
		var oldhuser = this.userGivenID(newduser.id);
		if (oldhuser !== "User not found") {
			var index = this.userlist.indexOf(oldhuser);
			if (index > -1) {
				this.userlist.splice(index, 1);
				var newhuser = new User(newduser);
				this.userlist.push(newhuser);
			}
		}
	};
	this.removeFromUserlist = function (oldduser) {
		var oldhuser = this.userGivenID(oldduser.id);
		if (oldhuser !== "User not found") {
			var index = this.userlist.indexOf(oldhuser);
			if (index > -1) {
				this.userlist.splice(index, 1);
			}
		}
	};
};

module.exports = {
	//vars
	serverlist,

	//functions
	serverGivenID,
	printServerlist,

	addToServerlist,
	removeFromServerlist,
	updateServerlist,

	//Classes
	User,
	Server
};
// END HARMONIOUS CLASSES //
