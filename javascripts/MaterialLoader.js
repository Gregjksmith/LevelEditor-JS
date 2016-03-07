const MATERIAL_ELEMENTS = ["newmtl","Ka","Kd","Ks","Tf","illum","d","Ns","Ni","Sharpness", "map_Kd"];
const MATERIAL_NEW_MATERIAL = 0;
const MATERIAL_KA = 1;
const MATERIAL_KD = 2;
const MATERIAL_KS = 3;
const MATERIAL_TF = 4;
const MATERIAL_ILLUM = 5;
const MATERIAL_D_FACTOR = 6;
const MATERIAL_NS = 7;
const MATERIAL_NI = 8;
const MATERIAL_SHARPNESS = 9;
const MATERIAL_MAP_KD = 10;
const MATERIAL_LINE_FEED = -1;
const MATERIAL_NULL = -2;

function Material()
{
	this.materialName = "";
	this.ka = Array(3);
	this.kd = Array(3);
	this.ks = Array(3);
	this.tf = Array(3);
	this.ni = 0;
	this.ns = 0;
	this.d = 0;
	this.sharpness = 0;
	this.illum = 0;
	this.tex = null;
	this.basePath = "";
}

function MaterialLoader(filepath,objList)
{
	var lists = [];
	var basePath = filepath.substring(0,filepath.lastIndexOf("/")+1);
	var ajaxRequest = new Object();
	ajaxRequest.url = filepath;
	ajaxRequest.success = function(response)
	{
		parseMaterial(response,lists,basePath);
		objList.materials = lists;
		materialLoaded = true;
	};
	ajaxRequest.async = false;
	ajaxRequest.type = "GET";

	$.ajax(ajaxRequest);
	//$.get(filepath, 
	//function(response)
	//{
		//parseMaterial(response,lists,basePath);
		//objList.materials = lists;
		//materialLoaded = true;
	//}
	//);
}

function parseMaterial(matFile,lists,basePath)
{
	mat = matFile.split("\n");
	var matLength = mat.length;
	var currentLine;
	var currentMaterial = -1;
	for(var i=0; i<matLength;i++)
	{
		currentLine = mat[i];
		switch(getMaterialIdentifier(currentLine))
		{
			case MATERIAL_NEW_MATERIAL:
				currentMaterial = currentMaterial + 1;
				var material = new Material();
				material.basePath = basePath;
				getMaterialName(currentLine,material)
				lists.push(material);
				break;
			case MATERIAL_KA:
				getMaterialKa(currentLine,lists[currentMaterial]);
				break;

			case MATERIAL_KD:
				getMaterialKd(currentLine,lists[currentMaterial]);
				break;

			case MATERIAL_KS:
				getMaterialKs(currentLine,lists[currentMaterial]);
				break;

			case MATERIAL_TF:
				getMaterialTf(currentLine,lists[currentMaterial]);
				break;

			case MATERIAL_ILLUM:
				getMaterialIllum(currentLine,lists[currentMaterial]);
				break;

			case MATERIAL_D_FACTOR:
				getMaterialDFactor(currentLine,lists[currentMaterial]);
				break;

			case MATERIAL_NS:
				getMaterialNs(currentLine,lists[currentMaterial]);
				break;

			case MATERIAL_NI:
				getMaterialNi(currentLine,lists[currentMaterial]);
				break;

			case MATERIAL_SHARPNESS:
				getMaterialSharpness(currentLine,lists[currentMaterial]);
				break;

			case MATERIAL_MAP_KD:
				getTexturePath(currentLine,lists[currentMaterial]);
				break;

			case MATERIAL_LINE_FEED:

				break;

			case MATERIAL_NULL: 

				break;
		}
	}

}

function getMaterialIdentifier(matLine)
{
	if(matLine == null || matLine == "")
		return MATERIAL_LINE_FEED;

	matLine = matLine.trim();
	var ii = matLine.indexOf(" ");
	var identifier = matLine.substring(0,ii);
	for(var i=0; i<MATERIAL_ELEMENTS.length;i++)
	{
		if(identifier == MATERIAL_ELEMENTS[i])
			return i;
	}

	return MATERIAL_NULL;
}

function getMaterialName(matLine,material)
{
	matLine = matLine.trim();
	var name = matLine.substring(7,matLine.length);
	material.materialName = name;
}

function getMaterialKa(matLine,material)
{
	matLine = matLine.trim();
	var kString = matLine.substring(3,matLine.length);
	var kArray = kString.split(" ");
	var j=0;
	for(var i=0; i<kArray.length; i++)
	{
		if(kArray[i] != "")
		{
			material.ka[j] = parseFloat(kArray[i])
			j++;
		}
	}
}

function getMaterialKd(matLine,material)
{
	matLine = matLine.trim();
	var kString = matLine.substring(3,matLine.length);
	var kArray = kString.split(" ");
	var j=0;
	for(var i=0; i<kArray.length; i++)
	{
		if(kArray[i] != "")
		{
			material.kd[j] = parseFloat(kArray[i])
			j++;
		}
	}
}

function getMaterialKs(matLine,material)
{
	matLine = matLine.trim();
	var kString = matLine.substring(3,matLine.length);
	var kArray = kString.split(" ");
	var j=0;
	for(var i=0; i<kArray.length; i++)
	{
		if(kArray[i] != "")
		{
			material.ks[j] = parseFloat(kArray[i])
			j++;
		}
	}
}

function getMaterialTf(matLine,material)
{
	matLine = matLine.trim();
	var kString = matLine.substring(3,matLine.length);
	var kArray = kString.split(" ");
	var j=0;
	for(var i=0; i<kArray.length; i++)
	{
		if(kArray[i] != "")
		{
			material.tf[j] = parseFloat(kArray[i])
			j++;
		}
	}
}

function getMaterialIllum(matLine,material)
{
	matLine = matLine.trim();
	var kString = matLine.substring(6,matLine.length);
	kString = kString.trim();
	material.illum = parseInt(kString);
}

function getMaterialNs(matLine,material)
{
	matLine = matLine.trim();
	var kString = matLine.substring(3,matLine.length);
	kString = kString.trim();
	material.ns = parseFloat(kString);
}

function getMaterialNi(matLine,material)
{
	matLine = matLine.trim();
	var kString = matLine.substring(3,matLine.length);
	kString = kString.trim();
	material.ni = parseFloat(kString);
}

function getMaterialSharpness(matLine,material)
{
	matLine = matLine.trim();
	var kString = matLine.substring(10,matLine.length);
	kString = kString.trim();
	material.sharpness = parseFloat(kString);
}

function getMaterialDFactor(matLine,material)
{
	matLine = matLine.trim();
	var kString = matLine.substring(2,matLine.length);
	kString = kString.trim();
	material.d = parseFloat(kString);
}

function getTexturePath(matLine,material)
{
	matLine = matLine.trim();
	var kString = matLine.substring(7,matLine.length);
	material.tex = material.basePath + kString;
}

function loadTexture(material,callback)
{
	var img = new Image();
	img.src = material.tex;
	img.onload = function ()
	{
		callback(img);
	};
}
