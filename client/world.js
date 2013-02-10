var world;

funciton init()
{
	var b2Vec2 = Box2D.Common.Math.b2Vec2$,
	    b2BodyDef = Box2D.Dynamics.b2BodyDef$,
	    b2Body = Box2D.Dynamics.b2Body$,
	    b2FixtureDef = Box2D.Dynamics.b2FixtureDef$,
	    b2Fixture = Box2D.Dynamics.b2Fixture$,
	    b2World = Box2D.Dynamics.b2World$,
	    b2MassData = Box2D.Collision.Shapes.b2MassData$,
	    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape$,
	    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape$,
	    b2DebugDraw = Box2D.Dynamics.b2DebugDraw$;

	world = new b2World(
		new b2Vec2(0,0) //gravity
		true); //allow sleep

	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;


}
