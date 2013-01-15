var WebSocket = require('ws');
var Players = require('players');


var driver = null;
var navigator = null;

var server = new WebSocket.Server({port:1337});
server.on('connection', function(ws)
{
	var player = new Players.Player();
	player.connection = ws;
	Players.addPlayer(player);

	ws.on('message', player.gotMessage.bind(player));
	ws.on('error',function(error)
	{
		console.error(error);
	});
	ws.on('close',function(message)
	{
		Players.removePlayer(player);
	});
});

