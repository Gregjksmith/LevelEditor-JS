const VERTEX_IDENTIFIER = 0;
const FACE_IDENTIFIER = 1;
const NORMAL_IDENTIFIER = 2;
const TEXTURE_COORD_IDENTIFIER = 3;
const USE_MATERIAL_IDENTIFIER = 4;
const MATERIAL_LIBRARY = 5;
const OBJ_LINE_FEED = -1;
const OBJ_END_OF_FILE = -2;
const NOT_DEFINED = -3;

const OBJ_IDENTIFIERS = ["v", "f", "vn", "vt",  "usemtl", "mtllib"];

function Obj()
{
	this.vertexList = [];
	this.faceList = [];
	this.normalList = [];
	this.texCoordList = [];
	this.faceMaterials = []
	this.currentMaterial = "";
	this.materials = null;
	this.basePath = "";
}

function loadObj(filepath,callback)
{
	var lists = new Obj();
	lists.basePath = filepath.substring(0,filepath.lastIndexOf("/")+1);
	$.get(filepath, 
	function(response)
	{
		parseObjFile(response,lists);
		var model = buildModel(lists);
		callback(model,lists.materials);
	}
	);
	
}

function parseObjFile(objFile,lists)
{
	var objFile = objFile.split('\n');
	var objFileSize = objFile.length;
	var currentLine;
	for(var i=0; i<objFileSize; i++)
	{
		currentLine = objFile[i];
		switch(getIdentifier(currentLine))
		{
			case VERTEX_IDENTIFIER:
				addVertexCoord(currentLine,lists);
				break;
			case NORMAL_IDENTIFIER:
				addNormalCoord(currentLine,lists);
				break;
			case TEXTURE_COORD_IDENTIFIER:
				addTextureCoord(currentLine,lists);
				break;
			case FACE_IDENTIFIER:
				addFace(currentLine,lists);
				break;
			case USE_MATERIAL_IDENTIFIER:
				setCurrentMaterial(currentLine,lists);
				break;
			case MATERIAL_LIBRARY:
				loadMaterial(currentLine,lists);
				break;
			case NOT_DEFINED:
				break;
			case OBJ_LINE_FEED:
				break;
		}
	}
}

function getIdentifier(currentLine)
{
	if(currentLine == null || currentLine == "")
		return OBJ_LINE_FEED;
	ident = currentLine.trim();
	var identLength = ident.indexOf(" ");
	ident = ident.substr(0,identLength);
	for(var i=0; i<OBJ_IDENTIFIERS.length; i++)
	{
		var objIdentifier = OBJ_IDENTIFIERS[i];
		if(ident == objIdentifier)
			return i;
	}
	return NOT_DEFINED;

}

function addVertexCoord(currentLine,lists)
{
	var vertexString = currentLine.substring(1);
	vertexString = vertexString.split(" ");
	var vertexArray = Array(3);
	var j=0;
	for(var i=0; i<vertexString.length; i++)
	{
		if(vertexString[i] != "")
		{
			vertexArray[j] = parseFloat(vertexString[i]);
			j++
		}
	}
	lists.vertexList.push(vertexArray);
}


function addNormalCoord(currentLine,lists)
{
	var normalString = currentLine.substring(2);
	normalString = normalString.split(" ");
	var normalArray = Array(3);
	var j=0;
	for(var i=0; i<normalString.length; i++)
	{
		if(normalString[i] != "")
		{
			normalArray[j] = parseFloat(normalString[i]);
			j++;
		}
	}
	lists.normalList.push(normalArray);
}

function addTextureCoord(currentLine,lists)
{
	var texCoordString = currentLine.substring(2);
	texCoordString = texCoordString.split(" ");
	var texCoordArray = Array(2);
	var j=0;
	for(var i=0; i<texCoordString.length; i++)
	{
		if(texCoordString[i] != "")
		{
			texCoordArray[j] = parseFloat(texCoordString[i]);
			j++;
		}
	}
	lists.texCoordList.push(texCoordArray);
}

function addFace(currentLine,lists)
{
	var faceString = currentLine.substring(1);
	faceString = faceString.split(" ");
	var faceArray = Array(3);
	var j=0;
	var i=0;
	for(i=0; i<faceString.length; i++)
	{
		if(faceString[i] != "")
		{
			faceArray[j] = faceString[i];
			j++;
		}
	}
	for(j;i<3;j++)
	{
		faceArray[j] = -1;
	}

	for(var i=0; i<faceArray.length;i++)
	{
		var f = faceArray[i].split("/");
		for(var j=0; j<f.length; j++)
		{
			lists.faceList.push(parseInt(f[j]));
		}
	}
	lists.faceMaterials.push(getMaterialIndex(lists.materials,lists.currentMaterial));
}

function setCurrentMaterial(currentLine,lists)
{
	currentLine = currentLine.trim();
	var materialName = currentLine.substring(7,currentLine.length);
	materialName = materialName.trim();
	lists.currentMaterial = materialName;
}


function loadMaterial(currentLine,lists)
{
	currentLine = currentLine.trim();
	var materialName = currentLine.substring(7,currentLine.length);
	materialName = lists.basePath + materialName.trim();
	MaterialLoader(materialName,lists);
}

function Model()
{
	this.vertex = [];
	this.normal = [];
	this.texCoord = [];
	this.material = [];
}

function addVertexToModel(model,lists,faceIndex)
{
	var vertexIndex = lists.faceList[faceIndex] - 1;
	if(vertexIndex == -1)
		return;

	model.vertex.push( (lists.vertexList[vertexIndex])[0] );
	model.vertex.push( (lists.vertexList[vertexIndex])[1] );
	model.vertex.push( (lists.vertexList[vertexIndex])[2] );

	vertexIndex = lists.faceList[faceIndex+3] - 1;
	model.vertex.push( (lists.vertexList[vertexIndex])[0] );
	model.vertex.push( (lists.vertexList[vertexIndex])[1] );
	model.vertex.push( (lists.vertexList[vertexIndex])[2] );

	vertexIndex = lists.faceList[faceIndex+6] - 1;
	model.vertex.push( (lists.vertexList[vertexIndex])[0] );
	model.vertex.push( (lists.vertexList[vertexIndex])[1] );
	model.vertex.push( (lists.vertexList[vertexIndex])[2] );
}
function addTexCoordToModel(model,lists,faceIndex)
{
	var texCoordIndex = lists.faceList[faceIndex+1] - 1;
	if(texCoordIndex == -1)
		return;

	model.texCoord.push((lists.texCoordList[texCoordIndex])[0]);
	model.texCoord.push((lists.texCoordList[texCoordIndex])[1]);
	
	texCoordIndex = lists.faceList[faceIndex+4] - 1;
	model.texCoord.push((lists.texCoordList[texCoordIndex])[0]);
	model.texCoord.push((lists.texCoordList[texCoordIndex])[1]);

	texCoordIndex = lists.faceList[faceIndex+7] - 1;
	model.texCoord.push((lists.texCoordList[texCoordIndex])[0]);
	model.texCoord.push((lists.texCoordList[texCoordIndex])[1]);
}
function addNormalToModel(model,lists,faceIndex)
{
	var normalIndex = lists.faceList[faceIndex+2] - 1;
	if(normalIndex == -1)
		return;

	model.normal.push((lists.normalList[normalIndex])[0]);
	model.normal.push((lists.normalList[normalIndex])[1]);
	model.normal.push((lists.normalList[normalIndex])[2]);

	normalIndex = lists.faceList[faceIndex+5] - 1;
	model.normal.push((lists.normalList[normalIndex])[0]);
	model.normal.push((lists.normalList[normalIndex])[1]);
	model.normal.push((lists.normalList[normalIndex])[2]);

	normalIndex = lists.faceList[faceIndex+8] - 1;
	model.normal.push((lists.normalList[normalIndex])[0]);
	model.normal.push((lists.normalList[normalIndex])[1]);
	model.normal.push((lists.normalList[normalIndex])[2]);
}

function buildModel(lists)
{
	var faceIndex = 0;
	var numFaces = parseInt(lists.faceList.length/9);
	var model = new Model();
	for(var i=0; i<numFaces; i++)
	{
		faceIndex = i*9;
		addVertexToModel(model,lists,faceIndex);
		addTexCoordToModel(model,lists,faceIndex);
		addNormalToModel(model,lists,faceIndex);
		
	}
	model.material = lists.faceMaterials;
	return model;
}

function getMaterialIndex(materials,materialName)
{
	if(materials == null || materialName == "")
		return -1;
	for(var i=0; i<materials.length; i++)
	{
		if(materials[i].materialName == materialName)
			return i;
	}
	return -1;
}