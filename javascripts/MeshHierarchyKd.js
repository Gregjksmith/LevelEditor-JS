
/*
*****************************
*	CONSTRUCTION METHODS    *
*****************************
*/

/*
	TODO:
	translate node Adjacency algorithm

*/

const SORT_ON_X = 0;
const SORT_ON_Y = 1;
const SORT_ON_Z = 2;

function Bounds(low,high)
{
	if(low == null)
		this.low = new Vertex(0,0,0);
	else
		this.low = new Vertex(low.x,low.y,low.z);
	
	if(high == null)
		this.high = new Vertex(0,0,0);
	else
		this.high = new Vertex(high.x,high.y,high.z);
	

	this.width = this.high.x - this.low.x;
	this.height = this.high.y - this.low.y;
	this.depth = this.high.z - this.low.z;

	this.recalculateDimensions = function()
	{
		this.width = this.high.x - this.low.x;
		this.height = this.high.y - this.low.y;
		this.depth = this.high.z - this.low.z;
	};
}

function largest(arr)
{
	var result = arr[0];
	for(var i = 1; i<arr.length; i++)
	{
		if(arr[i] > result)
			result = arr[i];
	}
	return result;
}

function smallest(arr)
{
	var result = arr[0];
	for(var i = 1; i<arr.length; i++)
	{
		if(arr[i] < result)
			result = arr[i];
	}
	return result;
}

function getVertexBounds(face,bounds)
{
	bounds.low.x = smallest([face.vertex[0].x,face.vertex[1].x,face.vertex[2].x]);
	bounds.high.x = largest([face.vertex[0].x,face.vertex[1].x,face.vertex[2].x]);

	bounds.low.y = smallest([face.vertex[0].y,face.vertex[1].y,face.vertex[2].y]);
	bounds.high.y = largest([face.vertex[0].y,face.vertex[1].y,face.vertex[2].y]);

	bounds.low.z = smallest([face.vertex[0].z,face.vertex[1].z,face.vertex[2].z]);
	bounds.high.z = largest([face.vertex[0].z,face.vertex[1].z,face.vertex[2].z]);

	bounds.recalculateDimensions();
}

function getLargestBound(faces)
{
	var v = new Vertex(faces[0].vertex[0].x, faces[0].vertex[1].x, faces[0].vertex[2].x);
	for(var i=0; i<faces.length; i++)
	{
		for(var j=0; j<3; j++)
		{
			if(faces[i].vertex[j].x > v.x)
			{
				v.x = faces[i].vertex[j].x;
			}
			if(faces[i].vertex[j].y > v.y)
			{
				v.y = faces[i].vertex[j].y;
			}
			if(faces[i].vertex[j].z > v.z)
			{
				v.z = faces[i].vertex[j].z;
			}
		}
	}

	return v;
}

function getSmallestBound(faces)
{
	var v = new Vertex(faces[0].vertex[0].x, faces[0].vertex[1].x, faces[0].vertex[2].x);
	for(var i=0; i<faces.length; i++)
	{
		for(var j=0; j<3; j++)
		{
			if(faces[i].vertex[j].x < v.x)
			{
				v.x = faces[i].vertex[j].x;
			}
			if(faces[i].vertex[j].y < v.y)
			{
				v.y = faces[i].vertex[j].y;
			}
			if(faces[i].vertex[j].z < v.z)
			{
				v.z = faces[i].vertex[j].z;
			}
		}
	}

	return v;
}

function buildKdTree(vertices,start,end)
{

}

function pointInBounds(container,item)
{
	if(item.x < container.low.x || item.y < container.low.y || item.z < container.low.z)
		return false;
	if(item.x > container.high.x || item.y > container.high.y || item.z > container.high.z)
		return false
	return true;
}

function boundsOverlap(b1,b2)
{
	var point = new Vertex(b2.low.x,b2.low.y,b2.low.z);
	if(pointInBounds(b1,point))
		return true;

	point.x = b2.low.x;
	point.y = b2.low.y;
	point.z = b2.high.z;
	if(pointInBounds(b1,point))
		return true;

	point.x = b2.low.x;
	point.y = b2.high.y;
	point.z = b2.low.z;
	if(pointInBounds(b1,point))
		return true;

	point.x = b2.low.x;
	point.y = b2.high.y;
	point.z = b2.high.z;
	if(pointInBounds(b1,point))
		return true;

	point.x = b2.high.x;
	point.y = b2.low.y;
	point.z = b2.low.z;
	if(pointInBounds(b1,point))
		return true;

	point.x = b2.high.x;
	point.y = b2.low.y;
	point.z = b2.high.z;
	if(pointInBounds(b1,point))
		return true;

	point.x = b2.high.x;
	point.y = b2.high.y;
	point.z = b2.low.z;
	if(pointInBounds(b1,point))
		return true;

	point.x = b2.high.x;
	point.y = b2.high.y;
	point.z = b2.high.z;
	if(pointInBounds(b1,point))
		return true;

	return false;
}

function MeshHierarchyKd(faces, start, end, numFacesInMesh, sOn, faceBounds)
{

	this.isLeaf = function()
	{
		if(this.children[0] == null || this.children[1] == null)
			return true;
		return false;
	};

	this.build = function(faces,start,end,numFacesInMesh, sOn)
	{
		this.sortOn = sOn;
		this.findIntersectingFaces(faces,start,faces.length - 1);

		if(end - start == 0)
		{
			this.node = faceAverage(faces[start]);
			return;
		}

		switch(sOn)
		{
			case SORT_ON_X:
				mergeSortFacesX(faces, start, end);
				break;
			case SORT_ON_Y:
				mergeSortFacesY(faces, start, end);
				break;
			case SORT_ON_Z:
				mergeSortFacesZ(faces, start, end);
				break;
		}

		var numPoints = (end - start + 1);
		var mid = parseInt(Math.floor(numPoints*0.5) + start);
		this.node = new Vertex(faces[mid].average.x, faces[mid].average.y, faces[mid].average.z);

		var numPointsHigh = (end - mid + 1);
		var numPointsLow = (mid  - start);


		var bHigh;	//vertex
		var bLow;	//vertex

		if ( numPointsHigh > 0)
		{
			bHigh = new Vertex();
			bHigh.x = this.bounds.high.x;
			bHigh.y = this.bounds.high.y;
			bHigh.z = this.bounds.high.z;

			bLow = new Vertex();
			bLow.x = this.bounds.low.x;
			bLow.y = this.bounds.low.y;
			bLow.z = this.bounds.low.z;

			switch(sOn)
			{
			case SORT_ON_X:
				bLow.x = this.node.x;
				break;
			case SORT_ON_Y:
				bLow.y = this.node.y;
				break;
			case SORT_ON_Z:
				bLow.z = this.node.z;
				break;
			}
			this.children[1] = new MeshHierarchyKd(faces, mid, end, faces.length, nextSortOn(sOn),new Bounds(bLow,bHigh));
		}

		if( numPointsLow > 0)
		{

			bHigh = new Vertex();
			bHigh.x = this.bounds.high.x;
			bHigh.y = this.bounds.high.y;
			bHigh.z = this.bounds.high.z;

			bLow = new Vertex();
			bLow.x = this.bounds.low.x;
			bLow.y = this.bounds.low.y;
			bLow.z = this.bounds.low.z;

			switch(sOn)
			{
			case SORT_ON_X:
				bHigh.x = this.node.x;
				break;
			case SORT_ON_Y:
				bHigh.y = this.node.y;
				break;
			case SORT_ON_Z:
				bHigh.z = this.node.z;
				break;
			}
			this.children[0] = new MeshHierarchyKd(faces, start, mid -1, faces.length, nextSortOn(sOn),new Bounds(bLow,bHigh));
		}
	};

	/* TODO: PARTITION FACES BETTER */
	this.findIntersectingFaces = function findIntersectingFaces(faces,start,end)
	{
		var numIntersectingFaces = 0;
		var tempArrayIndex = 0;

		var p = [0,0,0];
		var face;
		var boundsMin = [0,0,0];
		var boundsMax = [0,0,0];
		var b = new Bounds();
		b.low = boundsMin;
		b.high = boundsMax;

		var startIndex = 0;

		for(var i = start; i <= end; i++)
		{
			face = faces[i];

			getVertexBounds(face, b);

			if(boundsOverlap(this.bounds,b))
			{
				this.intersectingFaces.push([face[0],face[1],face[2],
											face[3],face[4],face[5],
											face[6],face[7],face[0] ]);
			}
		}
	};

	if(faceBounds == null)
	{
		this.bounds = new Bounds(getSmallestBound(faces),getLargestBound(faces));
	}
	else
	{
		this.bounds = faceBounds;
	}

	this.children = [null,null];

	if(sOn == null)
	{
		this.sortOn = 0;
	}
	else
	{
		this.sortOn = sOn;
	}
	
	this.adjTree = null;

	this.intersectingFaces = Array(0);
	this.node = null;

	if(start == null || end == null)
	{
		this.build(faces,0,faces.length - 1, faces.length, 0);
	}
	else
	{
		this.build(faces,start,end,faces.length,sOn);
	}
}

function nextSortOn(sortOn)
{
	switch(sortOn)
	{
		case SORT_ON_X:
			return SORT_ON_Y;
			break;
		case SORT_ON_Y:
			return SORT_ON_Z;
			break;
		case SORT_ON_Z:
			return SORT_ON_X;
			break;
	}
}

function mergeFaceX(faces, left, mid, right)
{
	var i, leftEnd, numElements, tempPos;

	leftEnd = mid;
	tempPos = 0;
	numElements = right- left;
	var tempArray = [];

	while(left < leftEnd && mid <= right)
	{
		if( faces[left].average.x <= faces[mid].average.x)
		{
			tempArray.push(faces[left]);
			left++;
		}
		else
		{
			tempArray.push(faces[mid]);
			mid++;
		}
	}

	while(left < leftEnd)
	{
		tempArray.push(faces[left]);
		left++;
	}
	while(mid <= right)
	{
		tempArray.push(faces[mid]);
		mid++;
	}

	for(var i=tempArray.legnth-1; i>=0; i--)
	{
		faces[right] = tempArray[i];
		right--;
	}
}

function mergeFaceY(faces, left, mid, right)
{
	var i, leftEnd, numElements, tempPos;

	leftEnd = mid;
	tempPos = 0;
	numElements = right- left;
	var tempArray = [];
	while(left < leftEnd && mid <= right)
	{
		if( faces[left].average.y <= faces[mid].average.y)
		{
			tempArray.push(faces[left]);
			left++;
		}
		else
		{
			tempArray.push(faces[mid]);
			mid++;
		}
	}

	while(left < leftEnd)
	{
		tempArray.push(faces[left]);
		left++;
	}
	while(mid <= right)
	{
		tempArray.push(faces[mid]);
		mid++;
	}

	for(var i=tempArray.length-1; i>=0; i--)
	{
		faces[right] = tempArray[i];
		right--;
	}
}

function mergeFaceZ(faces, left, mid, right)
{
	var i, leftEnd, numElements, tempPos;

	leftEnd = mid;
	tempPos = 0;
	numElements = right- left;

	var tempArray = [];

	while(left < leftEnd && mid <= right)
	{
		if( faces[left].average.z <= faces[mid].average.z)
		{
			tempArray.push(faces[left]);
			left++;
		}
		else
		{
			tempArray.push(faces[mid]);
			mid++;
		}
	}

	while(left < leftEnd)
	{
		tempArray.push(faces[left]);
		left++;
	}
	while(mid <= right)
	{
		tempArray.push(faces[mid]);
		mid++;
	}

	for(var i=tempArray.length-1; i>=0; i--)
	{
		faces[right] = tempArray[i];
		right--;
	}
}

function mergeSortFacesX(faces, left, right)
{
	var mid;
	if( right > left)
	{
		mid = parseInt(Math.floor((right + left)*0.5));
		mergeSortFacesX(faces, left, mid);
		mergeSortFacesX(faces, mid+1,right);

		mergeFaceX(faces, left, mid+1, right);
	}
}
function mergeSortFacesY(faces, left, right)
{
	var mid;
	if( right > left)
	{
		mid = parseInt(Math.floor((right + left)*0.5));
		mergeSortFacesY(faces, left, mid);
		mergeSortFacesY(faces, mid+1,right);

		mergeFaceY(faces, left, mid+1, right);
	}
}
function mergeSortFacesZ(faces, left, right)
{
	var mid;
	if( right > left)
	{
		mid = parseInt(Math.floor((right + left)*0.5));
		mergeSortFacesZ(faces, left, mid);
		mergeSortFacesZ(faces, mid+1,right);

		mergeFaceZ(faces, left, mid+1, right);
	}
}


/*
***********************
*	SEARCH METHODS    *
***********************
*/

function getClosestNode(tree,point)
{
	if(tree.isLeaf())
		return tree;
	
	switch(tree.sortOn)
	{
		case SORT_ON_X:
			if(tree.node.x <= point.x)
				return getClosestNode(tree.children[0],point);
			else
				return getClosestNode(tree.children[1],point);
			break;


		case SORT_ON_Y:
			if(tree.node.y <= point.y)
				return getClosestNode(tree.children[0],point);
			else
				return getClosestNode(tree.children[1],point);
			break;


		case SORT_ON_Z:
			if(tree.node.z <= point.z)
				return getClosestNode(tree.children[0],point);
			else
				return getClosestNode(tree.children[1],point);
			break;
	}
}