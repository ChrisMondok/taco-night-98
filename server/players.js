var players = [];

function Player()
{
	this.connection = null;
	this.role = 0;
	this.team = -1;
	this.name = "Unnamed player"
}

Player.prototype.gotMessage = function(message)
{
	var processMessageData = function(message)
	{
		if("role" in message)
		{
			this.role = message.role;
			this.sendMessage({role:this.role});
		}
		if("name" in message)
			this.name = message.name;
		if("team" in message)
		{
			this.team = message.team;
			this.sendMessage({team:this.team});
		}
		if("line" in message)
		{
			announce({line:message.line},this);
		}
	}
	
	//yeah, I don't like it either, but a client should NEVER be able to crash the server, which is precisely what node would do.
	var data = null;
	try
	{
		data = JSON.parse(message);
	}
	catch(e)
	{
		console.log("Invalid message from player '"+this.name+"'");
		console.log(e);
		this.connection.send(JSON.stringify({"alert":"Invalid message received."}));
	}
	if(data)
		processMessageData.bind(this,data)();
}

Player.prototype.sendMessage = function(message)
{
	this.connection.send(JSON.stringify(message));
}

function getPlayerByConnection(connection)
{
	for(var i in players)
		if(players[i].connection == connection)
			return players[i];
	return null;
}

function addPlayer(player)
{
	players.push(player);
	console.log("Player added");
	player.sendMessage({
		showSetup:true,
	});
}

function removePlayer(player)
{
	players.splice(players.indexOf(player),1);
	console.log("Player removed");
}

function announce(announcement,notme)
{
	for(var p in players)
		if(players[p] != notme)
			players[p].sendMessage(announcement);
}

exports.Player = Player;
exports.addPlayer = addPlayer;
exports.removePlayer = removePlayer;
