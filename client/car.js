function car()
{
	this.x = 0.5;
	this.y = 0.5;
	this.facingDirection = 0;
	this.velocity = {x:0.05,y:0};
	this.node = document.createElement('div');
	this.track = null;

	this.canvasNode = document.getElementById('gameCanvas');

	this.node.className = 'car';

	document.getElementById('canvasContainer').appendChild(this.node);

	document.addEventListener('tick',this.tick.bind(this));
}

car.prototype.setTrack = function(track)
{
	this.track = track;
}

car.prototype.tick = function(dt)
{
	this.processMovement(dt);
}

car.prototype.updateNode = function()
{
	this.node.style.left = (gameCanvas.offsetLeft + gameCanvas.offsetWidth*this.x)+'px';
	this.node.style.top = (gameCanvas.offsetTop + gameCanvas.offsetHeight*this.y)+'px';
}

car.prototype.processMovement = function(dt)
{
	var newX = this.x+dt*this.velocity.x;
	var newY = this.y+dt*this.velocity.y;

	var collisionVector = new Vector(this.x,this.y,newX,newY);

	if(this.track.getCollision(collisionVector))
	{
		alert("COLLISION!");
	}

	this.x = newX;
	this.y = newY;
	this.updateNode();
}
