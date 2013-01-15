var ws = null;
var CTX = null;
var sketchpad = null;

function DriveClient()
{
	this.sketchpad = new Sketchpad(document.getElementById('gameCanvas').getContext('2d'));
	this.socket = null;
	this.connectToServer();
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

function getServerUrl()
{
	var pattern = /http:\/\/(.+?)\/.*?/;
	var matches = pattern.exec(window.location.href);
	return matches[1];
}
