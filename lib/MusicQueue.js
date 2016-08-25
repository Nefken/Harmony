var MusicQueue = function () {
  this.serverlist = [];

  this.addServer = function (srvid) {
    if (!this.serverInList(srvid)) {
      this.serverlist.push({
        id : srvid,
        queue : []
      });
    }
  }
  this.serverInList = function (srvid) {
    for (i=0; i < this.serverlist.length; i++){
      if (this.serverlist[i].id === srvid) return true;
    }
    return false;
  }
  this.serverQueue = function (srvid) {
    for (i=0; i < this.serverlist.length; i++){
      if (this.serverlist[i].id === srvid) return this.serverlist[i].queue;
    }
  }
  this.playSong = function (srvid) {
    for (i=0; i < this.serverlist.length; i++){
      if (this.serverlist[i].id === srvid) {
        return this.serverlist[i].queue.shift();
      }
    }
  }
  this.addToServerQueue = function (srvid, url) {
    for (i=0; i < this.serverlist.length; i++){
      if (this.serverlist[i].id === srvid) this.serverlist[i].queue.push(url);
    }
  }
  this.printServerList = function () {
    console.log(this.serverlist);
  }
}
module.exports = MusicQueue;
