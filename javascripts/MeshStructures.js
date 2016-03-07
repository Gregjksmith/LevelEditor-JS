function Face()
{
	this.vertex = [new Vertex(0,0,0),new Vertex(0,0,0),new Vertex(0,0,0)];
	this.normal = [new Normal(0,0,0),new Normal(0,0,0),new Normal(0,0,0)];
	this.average = faceAverage(this);
}

function Face(verts,norms)
{
	this.vertex = [new Vertex(verts[0],verts[1],verts[2]),new Vertex(verts[3],verts[4],verts[5]),new Vertex(verts[6],verts[7],verts[8])];
	this.normal = [new Normal(norms[0],norms[1],norms[2]),new Normal(norms[3],norms[4],norms[5]),new Normal(norms[6],norms[7],norms[8])];
	this.average = faceAverage(this);
}

function Vertex(_x,_y,_z)
{
	this.x = _x;
	this.y = _y;
	this.z = _z;
}

function Normal(_x,_y,_z)
{
	this.x = _x;
	this.y = _y;
	this.z = _z;
}

function vertexAdd(v1,v2)
{
	var result;
	result.x = v1.x + v2.x;
	result.y = v1.y + v2.y;
	result.z = v1.z + v2.z;
	return result;
}

function vertexSub(v1,v2)
{
	var result;
	result.x = v1.x - v2.x;
	result.y = v1.y - v2.y;
	result.z = v1.z - v2.z;
	return result;
}

function vertexCross(v1,v2)
{
	var result;
	result.x = v1.y*v2.z - v1.z*v2.y;
	result.y = v1.z*v2.x - v1.x*v2.z;
	result.z = v1.x*v2.y - v1.y*v2.x;
	return result;
}

function vertexDot(v1,v2)
{
	var result;
	result.x = v1.x*v2.x;
	result.y = v1.y*v2.y;
	result.z = v1.z*v2.z;
	return result;
}

function primitiveArrayToFaces(model)
{
	var faceArray = new Array(0);
	for(var i=0; i<model.vertex.length; i=i+9)
	{
		faceArray.push(new Face([model.vertex[i],model.vertex[i+1],model.vertex[i+2],
								model.vertex[i+3],model.vertex[i+4],model.vertex[i+5],
								model.vertex[i+6],model.vertex[i+7],model.vertex[i+8]],

								[model.normal[i],model.normal[i+1],model.normal[i+2],
								model.normal[i+3],model.normal[i+4],model.normal[i+5],
								model.normal[i+6],model.normal[i+7],model.normal[i+8]] )

								);
	}
	return faceArray;
}

function faceAverage(face)
{
	var avg = new Vertex(0,0,0);
	avg.x = (face.vertex[0].x + face.vertex[1].x + face.vertex[2].x)/3;
	avg.y = (face.vertex[0].y + face.vertex[1].y + face.vertex[2].y)/3;
	avg.z = (face.vertex[0].z + face.vertex[1].z + face.vertex[2].z)/3;
	return avg;
}