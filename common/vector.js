function Vector(x1,y1,x2,y2)
{
	this.points = [
		{x:x2, y:y2},
		{x:x1, y:y1},
	]
	this.sortPoints();
}

Vector.fromMagnitudeAndDirection = function(magnitude,direciton)
{

}

Vector.prototype.add = function(x,y)
{
	for(var i = 0; i < 2; i++)
	{
		this.points[i].x += x
		this.points[i].y += y
	}

}

Vector.prototype.sortPoints = function()
{

	if((this.x2 < this.x1) || (this.x1 == this.x2 && this.y2 < this.y1))
		this.points.push(this.points.shift())
}

Vector.prototype.extendTo = function(otherVector, skipBoundsCheck)
{
	if(skipBoundsCheck === undefined)
		skipBoundsCheck = false;
	var x1 = this.points[0].x;
	var y1 = this.points[0].y;
	var x2 = this.points[1].x;
	var y2 = this.points[1].y;

	var x3 = otherVector.points[0].x;
	var y3 = otherVector.points[0].y;
	var x4 = otherVector.points[1].x;
	var y4 = otherVector.points[1].y;

	var denominator = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4);

	if(denominator == 0) //parallel (or coincident) lines
	{
		return null;
	}

	var x = ((x1*y2 - y1*x2)*(x3-x4) - (x1-x2)*(x3*y4 - y3*x4)) / denominator;
	var y = ((x1*y2 - y1*x2)*(y3-y4) - (y1-y2)*(x3*y4 - y3*x4)) / denominator;

	if(skipBoundsCheck)
		return {x:x,y:y};

	if(x < Math.min(x3,x4) || x > Math.max(x3,x4))
		return null;
	if(y < Math.min(y3,y4) || y > Math.max(y3,y4))
		return null;
	return {x:x,y:y};
}

Vector.prototype.getIntersection = function(otherVector)
{
	var intersection = this.extendTo(otherVector);
	if(!intersection)
		return null;
	if(intersection.x >= this.points[0].x && intersection.x <= this.points[1].x)
		return intersection;
	else
		return null;
}

Vector.prototype.getDirection = function()
{
	return Math.atan2(this.points[1].y-this.points[0].y,this.points[1].x-this.points[0].x);
}

Vector.prototype.getNormal = function()
{
	var normal = this.getDirection() + 0.5*Math.PI;
	while(normal < 0)
		normal += 2*Math.PI;
	return normal % (2*Math.PI);
}

if(typeof(exports) != "undefined")
	exports.Vector = Vector;
