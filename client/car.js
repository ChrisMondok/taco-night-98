function car()
{
	this.x = 0.5;
	this.y = 0.5;
	this.facingDirection = 0;
	this.velocity = {x:0.09,y:0.00};
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

	var collision = this.track.getCollision(collisionVector)
	if(collision)
	{
		var distanceToMove = this.getSpeed() - Math.sqrt(Math.pow(this.x-collision.point.x,2)+Math.pow(this.y-collision.point.y,2));
		debugger;
		this.setDirection(2*collision.direction-this.getDirection());
		newX = collision.point.x+distanceToMove*Math.cos(this.getDirection());
		newY = collision.point.y+distanceToMove*Math.sin(this.getDirection());

	}

	this.x = newX;
	this.y = newY;
	this.updateNode();
}

car.prototype.getSpeed = function()
{
	return Math.sqrt(Math.pow(this.velocity.x,2)+Math.pow(this.velocity.y,2));
}
car.prototype.setDirection = function(direction)
{
	var speed = this.getSpeed();
	this.velocity.x = Math.cos(direction) * speed;
	this.velocity.y = Math.sin(direction) * speed;
}

car.prototype.getDirection = function()
{
	return Math.atan2(this.velocity.y,this.velocity.x);
}
