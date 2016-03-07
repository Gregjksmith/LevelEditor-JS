/*
function Camera()
{
	this.matrix = new Matrix();
	this.projectionMatrix = new Matrix();
	this.cameraPosition = [0,0,8];
	this.rMatrix = new Matrix();
	this.invMatrix = new Matrix();

	this.xDirection = [1,0,0];
	this.yDirection = [0,1,0];
	this.zDirection = [0,0,1];

	this.resetMatrix = function()
	{
		loadIdentity(this.matrix);
		loadIdentity(this.rMatrix);
	}; 
	this.getGlobalDirection = function(x,y,z)
	{
		return multiMatVec(this.rMatrix,[x,y,z,0.0]);
	};
	this.rotateGlobal = function(angle, x, y, z)
	{
		rotate(this.rMatrix, -angle, x, y, z);
		rotate(this.matrix, angle, x, y, z);
	};
	this.rotateLocal = function(angle, x, y, z)
	{
		this.rMatrix = rotationMatrix(-angle,x,y,z)
		var rm = rotationMatrix(angle,x,y,z);
		copyMatrix(this.matrix, multMatrix(rm, this.matrix) );
	};
	this.translation = function()
	{
		translate(this.matrix, -this.cameraPosition[0], -this.cameraPosition[1], -this.cameraPosition[2]);
	};
	this.moveLocal = function(x,y,z)
	{
		var tPosition = this.getGlobalDirection(x,y,z);
		this.moveGlobal(tPosition[0],tPosition[1],tPosition[2]);
	};
	this.moveGlobal = function(x,y,z)
	{
		this.cameraPosition[0] = this.cameraPosition[0] + x;
		this.cameraPosition[1] = this.cameraPosition[1] + y;
		this.cameraPosition[2] = this.cameraPosition[2] + z;
	};
	this.computeInverse = function()
	{
		this.invMatrix = inverse(this.matrix);
	}
}
*/

function Camera(fov,nearPlane,farPlane)
{
	this.cameraPosition = [0,0,0,1];
	this.projectionMatrix = new Matrix4x4();
	this.modelViewMatrix = new Matrix4x4();
	this.normalMatrix = new Matrix4x4();
	this.rotationMatrix = new Matrix4x4();
	this.inverseMatrix = new Matrix4x4();

	this.fov = fov;
	this.nearPlane = nearPlane;
	this.farPlane = farPlane;

	this.rotationX = 0;
	this.rotationY = 0;

	this.xDirection = [1,0,0];
	this.yDirection = [0,1,0];
	this.zDirection = [0,0,1];

	this.moveLocal = function(x, y, z)
	{
		var gd = [0,0,0,1];
		this.getGlobalDirection(x,y,z,gd);
		this.moveGlobal(gd[0],gd[1],gd[2]);
	};
	this.resetMatrix = function()
	{
		this.modelViewMatrix.loadIdentity();
		this.rotationMatrix.loadIdentity();
	};
	this.getGlobalDirection = function(x, y, z, globalDirection)
	{
		globalDirection[0] = x*xDirection[0] + y*yDirection[0] + z*zDirection[0];
		globalDirection[1] = x*xDirection[1] + y*yDirection[1] + z*zDirection[1];
		globalDirection[2] = x*xDirection[2] + y*yDirection[2] + z*zDirection[2];
	};
	this.getGlobalPosition = function(globalPosition)
	{
		globalPosition[0] = cameraPosition[0];
		globalPosition[1] = cameraPosition[1];
		globalPosition[2] = cameraPosition[2];
		globalPosition[3] = cameraPosition[3];
	};
	
	this.rotateGlobal = function( angle,  x,  y,  z)
	{
		this.modelViewMatrix.rotate(angle,x,y,z);
	};
	this.rotateLocal = function( angle,  x,  y,  z)
	{

	};

	this.translation = function()
	{
		this.modelViewMatrix.translate(-cameraPosition[0],-cameraPosition[1],-cameraPosition[2]);
	};

	this.moveGlobal = function( x,  y,  z)
	{
		this.cameraPosition[0] = this.cameraPosition[0] + x;
		this.cameraPosition[1] = this.cameraPosition[1] + y;
		this.cameraPosition[2] = this.cameraPosition[2] + z;
	};
	this.moveTo = function( x,  y,  z)
	{
		this.cameraPosition[0] = x;
		this.cameraPosition[1] = y;
		this.cameraPosition[2] = z;
	};

}