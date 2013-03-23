var ws = null;
var CTX = null;
var sketchpad = null;

function DriveClient()
{
	this.sketchpad = new Sketchpad(document.getElementById('gameCanvas').getContext('2d'));
	this.socket = null;
	this.connectToServer();
	this.gameLoop = null;

	this.track = new Track();
	this.track.addWall(new Vector(0.50,0.25,0.75,0.25));
	this.track.addWall(new Vector(0.75,0.25,0.75,0.75));
	this.track.addWall(new Vector(0.75,0.75,0.25,0.75));
	this.track.addWall(new Vector(0.25,0.75,0.25,0.50));
	this.track.addWall(new Vector(0.25,0.50,0.50,0.25));

	this.tickedEntities = new Array();

	var c = new car();
	c.setTrack(this.track);
	this.addTickedEntity(c);

	this.initGameLoop();
	this.drawTrack();

}

DriveClient.prototype.connectToServer = function()
{
	this.socket = new WebSocket('ws://'+getServerUrl()+':'+PORT);
	this.socket.onerror = function(error){console.error(error)};
	this.socket.onclose = function(){addDebugMessage("Connection to server lost.")};
	this.socket.onmessage = this.gotMessage.bind(this);
	this.sketchpad.socket = this.socket;
}

DriveClient.prototype.gotMessage = function(message)
{
	var data = JSON.parse(message.data)
	if("alert" in data)
		alert(data.alert);
	if(data.showSetup)
		(data.showSetup?showPopup:hidePopup)(document.getElementById('setup'));
	if("line" in data)
	{
		this.sketchpad.receiveLine(data.line);
	}
}

DriveClient.prototype.drawTrack = function()
{
	var lines = this.track.walls;
	for(var l in lines)
	{
		this.sketchpad.receiveLine({
			x1:	lines[l].points[0].x,
			y1: lines[l].points[0].y,
			x2: lines[l].points[1].x,
			y2: lines[l].points[1].y
		});
	}
}

DriveClient.prototype.initGameLoop = function()
{
	var lastTick = new Date();
	var dispatchTick = function()
	{
		var now = new Date();
		var dt = (now - lastTick)/1000;
		for(var e in this.tickedEntities)
			this.tickedEntities[e].tick(dt);

		lastTick = now;
	}

	this.gameLoop = setInterval(dispatchTick.bind(this),50);
}

DriveClient.prototype.addTickedEntity = function(entity)
{
	this.tickedEntities.push(entity);
}

function getServerUrl()
{
	var pattern = /http:\/\/(.+?)\/.*?/;
	var matches = pattern.exec(window.location.href);
	return matches[1];
}
