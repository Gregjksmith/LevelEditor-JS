var actionQueue;
var assets;

function newAssets()
{
	assets = new Object();
}

function newActionQueue()
{
	actionQueue = new Object();
	actionQueue.queue = new Array();
}

function addQueueItem(assetJson)
{
	if(!actionQueue)
		actuionQueue = newActionQueue();
		
	var queueSize = actionQueue.queue.length;
	actionQueue.queue[queueSize] = new Object();
	actionQueue.queue[queueSize].asset = assetJson;
}

function executeQueue()
{
	if (!actionQueue)
		return;
	if (actionQueue.queue.length > 0)
	{
		switch(actionQueue.queue[0].asset.type)
		{
			case "json":
				loadJSON(actionQueue.queue[0].asset);
				break;
			case "bin":
				loadBinary(actionQueue.queue[0].asset);
				break;
			case "text":
				loadText(actionQueue.queue[0].asset);
				break;
		}
	}
	else
	{
		assets.onAssetsLoaded();
	}
}

function shiftQueue()
{
	var queueSize = actionQueue.queue.length;
	for( var i = 0; i < queueSize-1; i++)
	{
		actionQueue.queue[i] = actionQueue.queue[i+1];
	}
	actionQueue.queue[queueSize-1] = null;
	delete actionQueue.queue[queueSize-1];
	actionQueue.queue.length = actionQueue.queue.length - 1;
}

function loadJSON(assetJson)
{
	$.getJSON(assetJson.path, function(json) 
				{ 
					assets[assetJson.name] = json;
					shiftQueue();
					executeQueue();
				}
			);
}

function loadBinary(asset)
{	
	var fnCallBack = function(objBinaryFile)
	{
		if(objBinaryFile)
		{
			assets[asset.name] = new Float32Array(objBinaryFile.Content);	
			shiftQueue();
			executeQueue();
		}
	}
	
	GetBinaryFile( asset.path, fnCallBack);
}

function loadText(asset)
{
	$.get(asset.path, 
	function(response)
	{
		assets[asset.name] = response;
		shiftQueue();
		executeQueue();
	}
	);
}

function getAsset(assetName)
{
	var assetObject = assets[assetName];
	if(assetOject)
		return assetObject;
}



