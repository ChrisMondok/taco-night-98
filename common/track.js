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


if(typeof(exports) != "undefined")
	exports.Track = Track;

