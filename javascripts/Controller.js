
function Controller(nearPlane, farPlane)
{
	this.camera = new Camera();
	//this.screenWidth = window.innerWidth;
	//this.screenHeight = window.innerHeight;
	this.nearPlane = nearPlane;
	this.farPlane = farPlane;

	this.rotTheta = 0;
	this.rotPhi = 0;
	this.rotZ = 0;

	this.mouseMiddleDown = false;
	this.lastMouseX = 0;
	this.lastMouseY = 0;
	this.mouseX = 0;
	this.mouseY = 0;

	this.startingRotationPhi = 0;
	this.startingRotationTheta = 0;

	this.middleMouseDown = false;
	this.rightMouseDown = false;

	this.motionFunction = function(x,y)
	{
		if(this.middleMouseDown == true)
		{
			this.updateRotation(x,y);
		}
	};

	this.mouseFunc = function(button,state,x,y)
	{
		if(state == 0)
		{

		}
		else
		{
			this.startingRotationPhi = this.rotPhi;
			this.startingRotationTheta = this.rotTheta;
		}

		switch(button)
		{
			//do the button shit here....
		}
	};

	this.update = function()
	{
		this.updateRotation();
	};

	this.keyboardFunc = function(key,x,y)
	{
		// do the keyboard stuff here...
	};

	this.updateRotation = function()
	{
		var deltaX = this.mouseX - this.lastMouseX;
		var deltaY = this.mouseY - this.lastMouseY;
		//window.innerWidth

		var sw = window.innerWidth;
		var sh = window.innerHeight;
		var pi = 3.14159265;
		this.rotPhi = this.startingRotationPhi + 3*(deltaY/(sw*0.5))*pi/4 -pi/4;
		this.rotTheta = this.startingRotationTheta + (deltaX/(sh*0.5))*pi - pi;
	};

	this.updateCameraMatrix = function()
	{
		this.camera.resetMatrix();
		this.camera.rotationX = this.rotTheta;
		this.camera.rotationY = this.rotPhi;

		this.camera.rotateGlobal(this.rotPhi,1,0,0);
		this.camera.rotateGlobal(this.rotTheta,0,1,0);
		this.camera.translation();

		var cosPhi = Math.cos(this.rotPhi);
		var cosTheta = Math.cos(this.rotTheta);
		var sinPhi = Math.sin(this.rotPhi);
		var sinTheta = Math.sin(this.rotTheta);

		this.camera.zDirection[0] = sinTheta;
		this.camera.zDirection[0] = 0;
		this.camera.zDirection[0] = -cosTheta;

		this.camera.xDirection[0] = cosTheta;
		this.camera.xDirection[0] = 0;
		this.camera.xDirection[0] = sinTheta;

		//this.camera.yDirection[0] = 0;
		//this.camera.yDirection[0] = 1;
		//this.camera.yDirection[0] = 0;
	};

	this.setMousePosition = function(x,y)
	{
		this.mouseX = x;
		this.mouseY = y;
	};

	this.setStarting = function()
	{
		this.startingRotationPhi = rotPhi;
		this.startingRotationTheta = rotTheta;
		this.lastMouseX = mouseX;
		this.lastMouseY = mouseY;
	};

	this.updateProjectionMatrix = function()
	{
		this.camera.projectionMatrix.perspective()
	};

}

/*
var mouseX;
var mouseY;
var mouseUp;

var cameraPosition = [0.0,0.0,8.0,0.0];

function onMouseDown(e)
{
	mouseUp = true;
}
			
function onMouseUp(e)
{
	mouseUp = false;
}
			
function onMouseMove(e)
{
	mouseX = e.x;
	mouseY = e.y
}

function onKeyDown(event)
{
	updateMovement(event.keyCode);
}

const SPEED = 0.2;
function updateMovement(keyCode)
{
	if(keyCode == 87)	// w
	{
		cam.moveLocal(0,0,-SPEED);
	}
	else if(keyCode == 65)	//a
	{
		cam.moveLocal(-SPEED,0,0);
	}
	else if(keyCode == 83)	//s
	{
		cam.moveLocal(0,0,SPEED);
	}
	else if(keyCode == 68)	//d
	{
		cam.moveLocal(SPEED,0,0);
	}
}

var rotationX;
var rotationY;
var cam = new Camera();
function updateMatrix()
{
	rotationX = ((mouseX - canvas.width*0.5)/(canvas.width*0.5))*Math.PI;
	rotationY = ((mouseY - canvas.height*0.5)/(canvas.height*0.5))*Math.PI;

	cam.resetMatrix();
	cam.rotateGlobal(rotationX, 0, 1, 0);
	cam.rotateGlobal(rotationY, 1, 0, 0);
	cam.translation();
	cam.computeInverse();
	var globalForward = cam.getGlobalDirection(0,0,-1);

	copyMatrix(modelViewMatrix_model.data, cam.matrix);

	copyMatrix(modelViewMatrix_light.data,modelViewMatrix_model.data);
	updateUniformBuffer(sLight, modelViewMatrix_light);

	copyMatrix(normalMatrix_model.data, modelViewMatrix_model.data);
	normalMatrix_model.data = inverse(normalMatrix_model.data);
	transpose(normalMatrix_model.data);
	modelViewMatrix_light.data = modelViewMatrix_model.data;

	updateUniformBuffer(s, modelViewMatrix_model);
	updateUniformBuffer(s, normalMatrix_model);
	
	detectCollision(modelTree,cam);
}

*/