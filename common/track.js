function Track()
{
	this.walls = [];
}

Track.prototype.addWall = function(line)
{
	this.walls.push(line);
}

Track.prototype.getCollision = function(line)
{
	var intersections = new Array();
	for(var w in this.walls)
	{
		i = this.walls[w].getIntersection(line)
		if(i)
			intersections.push(i);
	}
	//TODO: return closest intersection
	if(intersections.length)
		return intersections[0];
	return null;
}

function Line(x1,y1,x2,y2)
{
	this.points = [
		{x:x2, y:y2},
		{x:x1, y:y1},
	]
	this.sortPoints();
}

Line.prototype.sortPoints = function()
{

	if((this.x2 < this.x1) || (this.x1 == this.x2 && this.y2 < this.y1))
		this.points.push(this.points.shift())
}

Line.prototype.extendTo = function(otherLine, skipBoundsCheck)
{
	if(skipBoundsCheck === undefined)
		skipBoundsCheck = false;
	var x1 = this.points[0].x;
	var y1 = this.points[0].y;
	var x2 = this.points[1].x;
	var y2 = this.points[1].y;

	var x3 = otherLine.points[0].x;
	var y3 = otherLine.points[0].y;
	var x4 = otherLine.points[1].x;
	var y4 = otherLine.points[1].y;

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

Line.prototype.getIntersection = function(otherLine)
{
	var intersection = this.extendTo(otherLine);
	if(!intersection)
		return null;
	if(intersection.x >= this.points[0].x && intersection.x <= this.points[1].x)
		return intersection;
	else
		return null;
}

Line.prototype.getDirection = function()
{
	return Math.atan2(this.points[1].y-this.points[0].y,this.points[1].x-this.points[0].x);
}

if(typeof(exports) != "undefined")
{
	exports.Track = Track;
	exports.Line = Line;
}

