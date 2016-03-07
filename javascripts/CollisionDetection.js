/* add camera body,
	every button press, 

	detectCollision(scene,camera)	: 	return true/false
		-get global viewing direction
		-multiply it by the inversion of the mvm,
			gives you local ray
	

	*/

function detectCollision(scene,camera)
{
	var rayPos = multiMatVec(camera.invMatrix,[0,0,0,1]);

	var rayDirArray = camera.getGlobalDirection(0,0,-1);
	var rayDir = multiMatVec(camera.invMatrix,[rayDirArray[0],rayDirArray[1],rayDirArray[2],0]);

	var hitInfo = new rayHitInfo();

	if(rayBoxIntersect(new Vertex(rayDir[0],rayDir[1],rayDir[2]), new Vertex(rayPos[0],rayPos[1],rayPos[2]), scene.bounds, hitInfo))
		console.log("intersect");
}