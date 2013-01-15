function Sketchpad(context)
{
	this.context = context;
	this.canvas = context.canvas;

	this.socket = null;

	this.moveListener = null;

	this.lastX = null;
	this.lastY = null;

	console.log("About to set up listeners")
	this.canvas.addEventListener('mousedown',this.startDrawing.bind(this),false);
	this.canvas.addEventListener('mouseup',this.stopDrawing.bind(this),false);
	this.canvas.addEventListener('mouseleave',this.stopDrawing.bind(this),false);

	this.maximizeCanvas();
}

Sketchpad.prototype.startDrawing = function(event)
{
	console.log('start drawing');
	var x = (event.clientX-event.target.offsetLeft)/this.canvas.offsetWidth;
	var y = (event.clientY-event.target.offsetTop)/this.canvas.offsetHeight;
	this.moveListener = this.mouseDragged.bind(this);
	this.canvas.addEventListener('mousemove',this.moveListener);
}

Sketchpad.prototype.stopDrawing = function(event)
{
	this.lastX = null;
	this.lastY = null;
	this.canvas.removeEventListener('mousemove',this.moveListener);
}

Sketchpad.prototype.mouseDragged = function(event)
{
	var x = (event.clientX-event.target.offsetLeft);
	var y = (event.clientY-event.target.offsetTop);
	if(this.lastX !== null && this.lastY !== null)
	{
		this.drawLine(this.lastX,this.lastY,x,y);
		this.sendLine(this.lastX,this.lastY,x,y);
	}
	this.lastX = x;
	this.lastY = y;
}

Sketchpad.prototype.drawLine = function(x1,y1,x2,y2)
{
	this.context.strokeStyle = "#FFF";
	this.context.lineWidth = 4;
	this.context.lineCap = 'round';
	this.context.beginPath();
	this.context.moveTo(x1,y1);
	this.context.lineTo(x2,y2);
	this.context.stroke();
}

Sketchpad.prototype.sendLine = function(x1,y1,x2,y2)
{
	this.socket.send(JSON.stringify({
		line:{
			x1:x1/this.canvas.offsetWidth,
	y1:y1/this.canvas.offsetHeight,
	x2:x2/this.canvas.offsetWidth,
	y2:y2/this.canvas.offsetHeight
		}
	}));
}

Sketchpad.prototype.receiveLine = function(line)
{

	this.drawLine(
			line.x1*this.canvas.offsetWidth,
			line.y1*this.canvas.offsetHeight,
			line.x2*this.canvas.offsetWidth,
			line.y2*this.canvas.offsetHeight
		     );

}

Sketchpad.prototype.maximizeCanvas = function()
{
	var maxWidth = window.innerWidth;
	var maxHeight = window.innerHeight;
	this.canvas.width = Math.min(maxWidth,maxHeight*ASPECT_RATIO);
	this.canvas.height = Math.min(maxHeight,maxWidth/ASPECT_RATIO);
}
