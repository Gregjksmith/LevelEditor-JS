const MIN_FLOAT = -1.7976931348623157E+10308;
const MAX_FLOAT = 1.7976931348623157E+10308;

function rayHitInfo()
{
	this.rayDirection = new Vertex(0,0,0);
	this.rayPosition = new Vertex(0,0,0);
	
	this.min = new Vertex(0,0,0);;
	this.max = new Vertex(0,0,0);;
	
	this.tmin = 0;
	this.tmax = 0;
	
	this.txmin = 0;
	this.txmax = 0;
	this.tymin = 0;
	this.tymax = 0;
	this.tzmin = 0;
	this.tzmax = 0;

	this.computeMinMax = function(rayDir,rayPos)
	{
		this.rayDirection = rayDir;
		this.rayPosition = rayPos;
		
		this.min.x = rayPos.x + this.tmin*rayDir.x;
		this.min.y = rayPos.y + this.tmin*rayDir.y;
		this.min.z = rayPos.z + this.tmin*rayDir.z;

		this.max.x = rayPos.x + this.tmax*rayDir.x;
		this.max.y = rayPos.y + this.tmax*rayDir.y;
		this.max.z = rayPos.z + this.tmax*rayDir.z;
	};
}

function rayBoxIntersect(rayDir, rayPos, bounds, hitInfo)
{
	var tmin,tmax,temp;
	if(rayDir.x == 0.0)
	{
		tmin = MIN_FLOAT;
		tmax = MAX_FLOAT;
	}
	else
	{
		tmin = (bounds.low.x - rayPos.x) / rayDir.x;
		tmax = (bounds.high.x - rayPos.x) / rayDir.x;
		if(tmin > tmax)
		{
			temp = tmin;
			tmin = tmax;
			tmax = temp;
		}
	}
	hitInfo.txmin = tmin;
	hitInfo.txmax = tmax;
	
	var tymin,tymax;
	if(rayDir.y == 0.0)
	{
		tymin = MIN_FLOAT;
		tymax = MAX_FLOAT;
	}
	else
	{
		tymin = (bounds.low.y - rayPos.y) / rayDir.y;
		tymax = (bounds.high.y - rayPos.y) / rayDir.y;
		if(tymin > tymax)
		{
			temp = tymin;
			tymin = tymax;
			tymax = temp;
		}
	}
	hitInfo.tymin = tymin;
	hitInfo.tymax = tymax;
	
	if( (tmin >= tymax) || (tymin >= tmax) )
		return false;
	
	if( tymin > tmin)
		tmin = tymin;
	if(tymax < tmax)
		tmax = tymax;
		
	var tzmin,tzmax;
	if(rayDir.z == 0.0)
	{
		tzmin = MIN_FLOAT;
		tzmax = MAX_FLOAT;
	}
	else
	{
		tzmin = ( bounds.low.z - rayPos.z ) / rayDir.z;
		tzmax = ( bounds.high.z - rayPos.z ) / rayDir.z;
		if(tzmin > tzmax)
		{
			temp = tzmin;
			tzmin = tzmax;
			tzmax = temp;
		}
	}
	hitInfo.tzmin = tzmin;
	hitInfo.tzmax = tzmax;
	
	if( (tmin >= tzmax) || (tzmin >= tmax))
		return false;
	
	if(tzmin > tmin)
		tmin = tzmin;
	if(tzmax < tmax)
		tmax = tzmax;
	
	hitInfo.tmin = tmin;
	hitInfo.tmax = tmax;
	
	hitInfo.computeMinMax(rayDir,rayPos);

	return true;
}

function rayTriangleIntersect(face, rayDir, rayPos, hitInfo)
{
	var E1,E2,T,Q,P;

	E1 = vertexSub(face.vertex[1],face.vertex[0]);
	E2 = vertexSub(face.vertex[2],face.vertex[0]);
	T = vertexSub(rayPos,face.vertex[0]);
	Q = vertexCross(T,E1);
	P = vertexCross(rayDir,E2);

	var det = (vertexDot(P,E1));
	var detInv = 1/det;
	var u = vertexDot(P,T)*detInv;
	if( u < 0 || u > 1)
		return false;
	
	var v = verexDot(Q,rayDir)*detInv;
	if( v < 0 || u > 1)
		return false;
	
	if( u + v > 1)
		return false;
	
	var t = vertexDot(Q,E2)*detInv;

	
	hitInfo.rayDirection = rayDir;
	hitInfo.rayPosition = rayPos;

	hitInfo.min.x = face.vertex[0].x*(1-u-v) + u*face.vertex[1].x + v*face.vertex[2].x;
	hitInfo.min.y = face.vertex[0].y*(1-u-v) + u*face.vertex[1].y + v*face.vertex[2].y;
	hitInfo.min.z = face.vertex[0].z*(1-u-v) + u*face.vertex[1].z + v*face.vertex[2].z;
	
	return true;
}