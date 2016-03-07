const INT_1 = 1;
const INT_2 = 2;
const INT_3 = 3;
const INT_4 = 4;

const FLOAT_1 = 5;
const FLOAT_2 = 6;
const FLOAT_3 = 7;
const FLOAT_4 = 8;

const MAT_3 = 9;
const MAT_4 = 10;

function shaderAttributeMeta(name,index)
{
	this.name = name;
	this.index = index;
}

function createShader(shaderId, shaderAttrib)
{
	if(shaderId.length != 2)
		return;

	if(	shaderId[0] == "" || shaderId[1] == "")
		return;
	
	var vShader = getVertexShader(shaderId[0]);
	var fShader = getFragmentShader(shaderId[1]);

	var shaderProgram = gl.createProgram();
			
	gl.attachShader(shaderProgram, vShader);
	gl.attachShader(shaderProgram, fShader);

	shaderProgram.attribs = new Array(shaderAttrib.length);
	shaderProgram.attribBuffer = new Array(shaderAttrib.length);
	shaderProgram.numPrimitives = 0;
	for( var i=0; i<shaderAttrib.length; i++)
	{
		gl.bindAttribLocation(shaderProgram, shaderAttrib[i].index, shaderAttrib[i].name);
		shaderProgram.attribs[i] = shaderAttrib[i].name;
	}

	gl.linkProgram(shaderProgram);
	gl.useProgram(shaderProgram);
	return shaderProgram;
}

function getVertexShader(id)
{
	var shaderNode = document.getElementById(id);
	var shaderSource = getShaderSource(shaderNode);
			
	var shader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(shader, shaderSource);
	gl.compileShader(shader);
	console.log(gl.getShaderInfoLog(shader));
	return shader;
}

function getFragmentShader(id)
{
	var shaderNode = document.getElementById(id);
	var shaderSource = getShaderSource(shaderNode);
			
	var shader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(shader, shaderSource);
	gl.compileShader(shader);
	console.log(gl.getShaderInfoLog(shader));
	return shader;
}

function getGeometryShader(id)
{
	var shaderNode = document.getElementById(id);
	var shaderSource = getShaderSource(shaderNode);
			
	var shader = gl.createShader(gl.GEOMETRY_SHADER);
	gl.shaderSource(shader, shaderSource);
	gl.compileShader(shader);
	console.log(gl.getShaderInfoLog(shader));
	return shader;
}

function getShaderSource(shaderNode)
{
	var shaderSource = "";
	var node = shaderNode.firstChild;
	while(node)
	{
		if(node.nodeType == 3)
		{
			shaderSource += node.textContent;
		}
		node = node.nextSibling;
	}
	return shaderSource;
}

function attribute(primitives,attribName,attribLocation,attribDatSize,uniformType)
{
	this.data = primitives;
	this.dataLength = primitives.length;
	this.attribName = attribName;
	this.attribLocation = attribLocation;
	this.dataSize = attribDatSize;
	this.uniformType = uniformType;
}

function texAttribute(image,texName,texLocation)
{
	this.image = image;
	this.texName = texName;
	this.texLocation = texLocation;
}

function addAttributeBuffer( shader, attrib )
{
	if (shader == null)
		return false;
	if (attrib.dataLength <= 0)
		return false;
	if(attrib.attribName == null)
		return false;

	/*
	var attribInShader = false;
	for(var i=0; i<shader.attribs.length; i++)
	{
		if(shader.attribs[i] == attrib.attribName && i == attrib.attribLocation)
		{
			attribInShader = true; 
			break;
		}
	}
	if(!attribInShader)
		return false;
	*/
	gl.useProgram(shader);
	var vbo = gl.createBuffer();
		
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(attrib.data), gl.STATIC_DRAW);
		
	gl.enableVertexAttribArray(attrib.attribLocation);
	gl.vertexAttribPointer(attrib.attribLocation, attrib.dataSize, gl.FLOAT, false, 0 ,0 );
		
	shader.attribBuffer[attrib.attribLocation] = vbo;
	shader.numPrimitives = parseInt(attrib.dataLength/attrib.dataSize);
}

function addUniformBuffer(shader, attrib)
{
	gl.useProgram(shader);
	attrib.attribLocation = gl.getUniformLocation(shader, attrib.attribName);

	switch(attrib.uniformType)
	{
		case INT_1:
			gl.uniform1i(attrib.attribLocation, attrib.data);
			break;
		case INT_2:
			gl.uniform2iv(attrib.attribLocation, attrib.data);
			break;
		case INT_3:
			gl.uniform3iv(attrib.attribLocation, attrib.data);
			break;
		case INT_4:
			gl.uniform4iv(attrib.attribLocation, attrib.data);
			break;

		case FLOAT_1:
			gl.uniform1f(attrib.attribLocation, attrib.data);
			break;
		case FLOAT_2:
			gl.uniform2fv(attrib.attribLocation, attrib.data);
			break;
		case FLOAT_3:
			gl.uniform3fv(attrib.attribLocation, attrib.data);
			break;
		case FLOAT_4:
			gl.uniform4fv(attrib.attribLocation, attrib.data);
			break;
		case MAT_3:
			gl.uniformMatrix3fv(attrib.attribLocation, false, attrib.data);
			break;
		case MAT_4:
			gl.uniformMatrix4fv(attrib.attribLocation, false, attrib.data);
			break;
	}
}

function updateUniformBuffer(shader,attrib)
{
	gl.useProgram(shader);
	switch(attrib.uniformType)
	{
		case INT_1:
			gl.uniform1i(attrib.attribLocation, attrib.data);
			break;
		case INT_2:
			gl.uniform2iv(attrib.attribLocation, attrib.data);
			break;
		case INT_3:
			gl.uniform3iv(attrib.attribLocation, attrib.data);
			break;
		case INT_4:
			gl.uniform4iv(attrib.attribLocation, attrib.data);
			break;

		case FLOAT_1:
			gl.uniform1f(attrib.attribLocation, attrib.data);
			break;
		case FLOAT_2:
			gl.uniform2fv(attrib.attribLocation, attrib.data);
			break;
		case FLOAT_3:
			gl.uniform3fv(attrib.attribLocation, attrib.data);
			break;
		case FLOAT_4:
			gl.uniform4fv(attrib.attribLocation, attrib.data);
			break;
		case MAT_3:
			gl.uniformMatrix3fv(attrib.attribLocation, false, attrib.data);
			break;
		case MAT_4:
			gl.uniformMatrix4fv(attrib.attribLocation, false, attrib.data);
			break;
	}
}

function addTextureAttribute(shader,texAttribute)
{
	gl.useProgram(shader);
	var texture = gl.createTexture();
	var textureLocation = gl.getUniformLocation(shader, texAttribute.texName);
	gl.activeTexture(gl.TEXTURE0 + texAttribute.texLocation);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texAttribute.image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	
  	gl.uniform1i(textureLocation, texAttribute.texLocation);
}