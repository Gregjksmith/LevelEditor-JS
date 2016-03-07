function Entity(filePath)
{
	this.position = [0,0,0];
	this.rotation = [0,0,0];
	this.scale = [1,1,1];

	this.modelViewMatrix = new Matrix4x4();
	this.normalMatrix = new Matrix4x4();
	this.inverseMatrix = new Matrix4x4();
	this.entityMatrix = new Matrix4x4();

	this.tempMatrix = new Matrix4x4();
	this.tempScaleMatrix = new Matrix4x4();
	this.tempRotationMatrix = new Matrix4x4();
	this.tempTranslationMatrix = new Matrix4x4();

	loadObj(filePath,this.onObjLoaded);

	this.onObjLoaded = function(model,materials)
	{
		this.model = model;
		this.materials = materials;
	}

	this.update = function(camera)
	{
		this.computeLocalMatrix();
		this.computeGlobalMatrix(camera);
		this.computeNormalMatrix();
	};

	this.moveGlobal = function(x,y,z)
	{
		position[0] = position[0] + x;
		position[1] = position[1] + y;
		position[2] = position[2] + z;
	};

	this.scale = function(x,y,z)
	{
		scale[0] = x;
		scale[1] = y;
		scale[2] = z;
	};

	this.rotate = function(x,y,z)
	{
		rotation[0] = rotation[0] + x;
		rotation[1] = rotation[1] + y;
		rotation[2] = rotation[2] + z;
	};

	this.moveTo = function(x,y,z)
	{
		position[0] = x;
		position[1] = y;
		position[2] = z;
	};

	this.scaleTo = function(x,y,z)
	{
		scale[0] = x;
		scale[1] = y;
		scale[2] = z;
	};

	this.rotateTo = function(x,y,z)
	{
		rotation[0] = x;
		rotation[1] = y;
		rotation[2] = z;
	};

	this.computeLocalMatrix = function()
	{
		//this.tempMatrix
		
		this.tempScaleMatrix.loadIdentity();
		this.tempScaleMatrix.set(0,0,scale[0]);
		this.tempScaleMatrix.set(1,1,scale[1]);
		this.tempScaleMatrix.set(2,2,scale[2]);
		this.tempScaleMatrix.set(3,3,1.0);

		this.tempTranslationMatrix.loadIdentity();
		this.tempTranslationMatrix.set(0,3,position[0]);
		this.tempTranslationMatrix.set(1,3,position[1]);
		this.tempTranslationMatrix.set(2,3,position[2]);

		this.tempRotationMatrix.loadIdentity();
		if(rotation[0] != 0.0)
			this.tempRotationMatrix.rotate(rotation[0],1,0,0);
		if(rotation[1] != 0.0)
			this.tempRotationMatrix.rotate(rotation[1],0,1,0);
		if(rotation[2] != 0.0)
			this.tempRotationMatrix.rotate(rotation[2],0,0,1);

		multMatrix(this.tempTranslationMatrix,this.tempRotationMatrix,this.tempMatrix);
		multMatrix(this.tempMatrix, this.tempScaleMatrix, this.entityMatrix);

	};

	this.computeGlobalMatrix = function(camera)
	{
		multMatrix(camera.modelViewMatrix,this.entityMatrix,this.modelViewMatrix);
		this.modelViewMatrix.inverseMatrix(this.inverseMatrix);
	};

	this.computeNormalMatrix = function()
	{
		copyMatrix(this.modelViewMatrix,this.tempMatrix);
		this.tempMatrix.inverse(this.normalMatrix);
		this.normalMatrix.transpose();
	};

}