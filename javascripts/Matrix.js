/*
function Matrix()
{
	var mat = Array(16);
	loadIdentity(mat);
	return mat;
}

function loadIdentity(mat)
{
	mat[0] = 1.0;
	mat[1] = 0.0;
	mat[2] = 0.0;
	mat[3] = 0.0;

	mat[4] = 0.0;
	mat[5] = 1.0;
	mat[6] = 0.0;
	mat[7] = 0.0;

	mat[8] = 0.0;
	mat[9] = 0.0;
	mat[10] = 1.0;
	mat[11] = 0.0;

	mat[12] = 0.0;
	mat[13] = 0.0;
	mat[14] = 0.0;
	mat[15] = 1.0;
}

function copyMatrix(mat1, mat2)
{
	for(var i=0; i<16; i++)
	{
		mat1[i] = mat2[i]; 
	}
}

function multMatrix(mat1, mat2)
{
	var tempMat = Array(16);

	tempMat[0] = mat1[0]*mat2[0] + mat1[1]*mat2[4] + mat1[2]*mat2[8] + mat1[3]*mat2[12];
	tempMat[1] = mat1[0]*mat2[1] + mat1[1]*mat2[5] + mat1[2]*mat2[9] + mat1[3]*mat2[13];
	tempMat[2] = mat1[0]*mat2[2] + mat1[1]*mat2[6] + mat1[2]*mat2[10] + mat1[3]*mat2[14];
	tempMat[3] = mat1[0]*mat2[3] + mat1[1]*mat2[7] + mat1[2]*mat2[11] + mat1[3]*mat2[15];

	tempMat[4] = mat1[4]*mat2[0] + mat1[5]*mat2[4] + mat1[6]*mat2[8] + mat1[7]*mat2[12];
	tempMat[5] = mat1[4]*mat2[1] + mat1[5]*mat2[5] + mat1[6]*mat2[9] + mat1[7]*mat2[13];
	tempMat[6] = mat1[4]*mat2[2] + mat1[5]*mat2[6] + mat1[6]*mat2[10] + mat1[7]*mat2[14];
	tempMat[7] = mat1[4]*mat2[3] + mat1[5]*mat2[7] + mat1[6]*mat2[11] + mat1[7]*mat2[15];

	tempMat[8] = mat1[8]*mat2[0] + mat1[9]*mat2[4] + mat1[10]*mat2[8] + mat1[11]*mat2[12];
	tempMat[9] = mat1[8]*mat2[1] + mat1[9]*mat2[5] + mat1[10]*mat2[9] + mat1[11]*mat2[13];
	tempMat[10] = mat1[8]*mat2[2] + mat1[9]*mat2[6] + mat1[10]*mat2[10] + mat1[11]*mat2[14];
	tempMat[11] = mat1[8]*mat2[3] + mat1[9]*mat2[7] + mat1[10]*mat2[11] + mat1[11]*mat2[15];

	tempMat[12] = mat1[12]*mat2[0] + mat1[13]*mat2[4] + mat1[14]*mat2[8] + mat1[15]*mat2[12];
	tempMat[13] = mat1[12]*mat2[1] + mat1[13]*mat2[5] + mat1[14]*mat2[9] + mat1[15]*mat2[13];
	tempMat[14] = mat1[12]*mat2[2] + mat1[13]*mat2[6] + mat1[14]*mat2[10] + mat1[15]*mat2[14];
	tempMat[15] = mat1[12]*mat2[3] + mat1[13]*mat2[7] + mat1[14]*mat2[11] + mat1[15]*mat2[15]; 

	return tempMat;
}

function transpose(mat)
{
	var temp;
	temp = mat[1];
	mat[1] = mat[4];
	mat[4] = temp; 

	temp = mat[2];
	mat[2] = mat[8];
	mat[8] = temp;

	temp = mat[3];
	mat[3] = mat[12];
	mat[12] = temp;

	temp = mat[6];
	mat[6] = mat[9];
	mat[9] = temp;

	temp = mat[7];
	mat[7] = mat[13];
	mat[13] = temp;

	temp = mat[11];
	mat[11] = mat[14];
	mat[14] = temp;
}

function translate(mat, x, y, z)
{
	var transMat = Array(16);
	loadIdentity(transMat);
	transMat[3] = x;
	transMat[7] = y;
	transMat[11] = z;
	copyMatrix(mat,multMatrix(mat,transMat));
}

function rotateX(mat,angle)
{
	var sinAngle = Math.sin(angle);
	var cosAngle = Math.cos(angle);
	var tempMAt = Matrix();
	tempMAt[5] = cosAngle;
	tempMAt[6] = -sinAngle;
	tempMAt[9] = sinAngle;
	tempMAt[10] = cosAngle;
	copyMatrix(mat,multMatrix(mat,tempMAt));
}

function rotateY(mat,angle)
{
	var sinAngle = Math.sin(angle);
	var cosAngle = Math.cos(angle);
	var tempMAt = Matrix();
	tempMAt[0] = cosAngle;
	tempMAt[8] = -sinAngle;
	tempMAt[2] = sinAngle;
	tempMAt[10] = cosAngle;
	copyMatrix(mat,multMatrix(mat,tempMAt));
}

function rotateZ(mat,angle)
{
	var sinAngle = Math.sin(angle);
	var cosAngle = Math.cos(angle);
	var tempMAt = Matrix();
	tempMAt[0] = cosAngle;
	tempMAt[4] = sinAngle;
	tempMAt[1] = -sinAngle;
	tempMAt[5] = cosAngle;
	copyMatrix(mat,multMatrix(mat,tempMAt));
}

function scale(mat, x, y, z)
{
	var tempMat = Array(16);
	tempMat[0] = x;
	tempMat[5] = y;
	tempMat[10] = z;
	tempMat[15] = 1.0;
	copyMatrix(mat,matrixMult(mat,tempMat));
}

function perspective(mat, fov, aspectRatio, nearPlane, farPlane)
{
	var e;
	if(fov == 180)
		e = 0;
	else
		e = 1/Math.tan( (fov*(Math.PI/180))/2 );

	mat[0] = e;
	mat[1] = 0;
	mat[2] = 0;
	mat[3] = 0;

	mat[4] = 0;
	mat[5] = e;
	mat[6] = 0;
	mat[7] = 0;

	mat[8] = 0;
	mat[9] = 0;
	mat[10] = -farPlane/(farPlane-nearPlane);
	mat[11] = -1; 

	mat[12] = 0;
	mat[13] = 0;
	mat[14] = -mat[10]*nearPlane;
	mat[15] = 0;
}

function determinant(mat)
{
	var a11 = 0;
	var a21 = 1;
	var a31 = 2;
	var a41 = 3;

	var a12 = 4;
	var a22 = 5;
	var a32 = 6;
	var a42 = 7;

	var a13 = 8;
	var a23 = 9;
	var a33 = 10;
	var a43 = 11;

	var a14 = 12;
	var a24 = 13;
	var a34 = 14;
	var a44 = 15;

	var det = 
		mat[a11]*mat[a22]*mat[a33]*mat[a44] +
		mat[a11]*mat[a23]*mat[a34]*mat[a42] +
		mat[a11]*mat[a24]*mat[a32]*mat[a43] +

		mat[a12]*mat[a21]*mat[a34]*mat[a43] +
		mat[a12]*mat[a23]*mat[a31]*mat[a44] +
		mat[a12]*mat[a24]*mat[a33]*mat[a41] +

		mat[a13]*mat[a21]*mat[a32]*mat[a44] +
		mat[a13]*mat[a22]*mat[a34]*mat[a41] +
		mat[a13]*mat[a24]*mat[a31]*mat[a42] +

		mat[a14]*mat[a21]*mat[a33]*mat[a42] +
		mat[a14]*mat[a22]*mat[a31]*mat[a43] +
		mat[a14]*mat[a23]*mat[a32]*mat[a41] -

		mat[a11]*mat[a22]*mat[a34]*mat[a43] -
		mat[a11]*mat[a23]*mat[a32]*mat[a44] -
		mat[a11]*mat[a24]*mat[a33]*mat[a42] -

		mat[a12]*mat[a21]*mat[a33]*mat[a44] -
		mat[a12]*mat[a23]*mat[a34]*mat[a41] -
		mat[a12]*mat[a24]*mat[a31]*mat[a43] -

		mat[a13]*mat[a21]*mat[a34]*mat[a42] -
		mat[a13]*mat[a22]*mat[a31]*mat[a44] -
		mat[a13]*mat[a24]*mat[a32]*mat[a41] -
		
		mat[a14]*mat[a21]*mat[a32]*mat[a43] -
		mat[a14]*mat[a22]*mat[a33]*mat[a41] -
		mat[a14]*mat[a23]*mat[a31]*mat[a42]; 

	return det;
}

function inverse(matrix)
{
	var det = determinant(matrix);
	var a00 = matrix[0];
	var a01 = matrix[1];
	var a02 = matrix[2];
	var a03 = matrix[3];

	var a10 = matrix[4];
	var a11 = matrix[5];
	var a12 = matrix[6];
	var a13 = matrix[7];

	var a20 = matrix[8];
	var a21 = matrix[9];
	var a22 = matrix[10];
	var a23 = matrix[11];

	var a30 = matrix[12];
	var a31 = matrix[13];
	var a32 = matrix[14];
	var a33 = matrix[15];
 
	var m = Array(16);
	
   m[0] = (a12*a23*a31 - a13*a22*a31 + a13*a21*a32 - a11*a23*a32 - a12*a21*a33 + a11*a22*a33)/det;
   m[1] = (a03*a22*a31 - a02*a23*a31 - a03*a21*a32 + a01*a23*a32 + a02*a21*a33 - a01*a22*a33)/det;
   m[2] = (a02*a13*a31 - a03*a12*a31 + a03*a11*a32 - a01*a13*a32 - a02*a11*a33 + a01*a12*a33)/det;
   m[3] = (a03*a12*a21 - a02*a13*a21 - a03*a11*a22 + a01*a13*a22 + a02*a11*a23 - a01*a12*a23)/det;
   m[4] = (a13*a22*a30 - a12*a23*a30 - a13*a20*a32 + a10*a23*a32 + a12*a20*a33 - a10*a22*a33)/det;
   m[5] = (a02*a23*a30 - a03*a22*a30 + a03*a20*a32 - a00*a23*a32 - a02*a20*a33 + a00*a22*a33)/det;
   m[6] = (a03*a12*a30 - a02*a13*a30 - a03*a10*a32 + a00*a13*a32 + a02*a10*a33 - a00*a12*a33)/det;
   m[7] = (a02*a13*a20 - a03*a12*a20 + a03*a10*a22 - a00*a13*a22 - a02*a10*a23 + a00*a12*a23)/det;
   m[8] = (a11*a23*a30 - a13*a21*a30 + a13*a20*a31 - a10*a23*a31 - a11*a20*a33 + a10*a21*a33)/det;
   m[9] = (a03*a21*a30 - a01*a23*a30 - a03*a20*a31 + a00*a23*a31 + a01*a20*a33 - a00*a21*a33)/det;
   m[10] = (a01*a13*a30 - a03*a11*a30 + a03*a10*a31 - a00*a13*a31 - a01*a10*a33 + a00*a11*a33)/det;
   m[11] = (a03*a11*a20 - a01*a13*a20 - a03*a10*a21 + a00*a13*a21 + a01*a10*a23 - a00*a11*a23)/det;
   m[12] = (a12*a21*a30 - a11*a22*a30 - a12*a20*a31 + a10*a22*a31 + a11*a20*a32 - a10*a21*a32)/det;
   m[13] = (a01*a22*a30 - a02*a21*a30 + a02*a20*a31 - a00*a22*a31 - a01*a20*a32 + a00*a21*a32)/det;
   m[14] = (a02*a11*a30 - a01*a12*a30 - a02*a10*a31 + a00*a12*a31 + a01*a10*a32 - a00*a11*a32)/det;
   m[15] = (a01*a12*a20 - a02*a11*a20 + a02*a10*a21 - a00*a12*a21 - a01*a10*a22 + a00*a11*a22)/det;

   return m;
}

function multiMatVec(mat,vec)
{
	var result = [0.0,0.0,0.0,0.0];
	result[0] = mat[0]*vec[0] + mat[1]*vec[1] + mat[2]*vec[2] + mat[3]*vec[3];
	result[1] = mat[4]*vec[0] + mat[5]*vec[1] + mat[6]*vec[2] + mat[7]*vec[3];
	result[2] = mat[8]*vec[0] + mat[9]*vec[1] + mat[10]*vec[2] + mat[11]*vec[3];
	result[3] = mat[12]*vec[0] + mat[13]*vec[1] + mat[14]*vec[2] + mat[15]*vec[3];

	return result;
}

function addVectors(vec1,vec2)
{
	var result = [0.0,0.0,0.0,0.0];
	result[0] = vec1[0] + vec2[0];
	result[1] = vec1[1] + vec2[1];
	result[2] = vec1[2] + vec2[2];
	result[3] = vec1[3] + vec2[3];
	return result;
}

function rotationMatrix(angle, x, y, z)
{
	var mat = Array(16);

	var sinAngle = Math.sin(angle);
	var cosAngle = Math.cos(angle);

	mat[0] = x*x + (1 - x*x)*cosAngle;
	mat[1] = x*y*(1- cosAngle) - z*sinAngle;
	mat[2] = x*z*(1 - cosAngle) + y*sinAngle;
	mat[3] = 0;

	mat[4] = x*y*(1 - cosAngle) + z*sinAngle;
	mat[5] = y*y + (1 - y*y)*cosAngle;
	mat[6] = y*z*(1 - cosAngle) - x*sinAngle;
	mat[7] = 0;

	mat[8] = z*x*(1 - cosAngle) - y*sinAngle;
	mat[9] = z*y*(1 - cosAngle) + x*sinAngle;
	mat[10] = z*z + (1 - z*z)*cosAngle;
	mat[11] = 0;

	mat[12] = 0;
	mat[13] = 0;
	mat[14] = 0;
	mat[15] = 1;

	return mat;
}

function rotate(mat, angle, x, y, z)
{
	copyMatrix(mat, multMatrix(mat, rotationMatrix(angle,x,y,z)));
}
*/

function multMatrix(A,B,result)
{
	var sum;
	if(A.m != B.n)
		return;

	for(i = 0; i<A.n; i++)
	{
		for(j=0; j<B.m; j++)
		{
			sum = 0;

			for(k = 0; k<B.n; k++)
			{
				sum = sum + A.get(i,j)*B.get(k,j);
			}
			result.set(i,j,sum);
		}
	}
}

function addMatrix(A,B,result)
{
	for(i=0; i<A.n; i++)
	{
		for(j = 0; j<A.m; j++)
		{
			result.set(i,j, A.get(i,j) + B.get(i,j));
		}
	}
}

function subMatrix(A,B,result)
{
	for(i=0; i<A.n; i++)
	{
		for(j = 0; j<A.m; j++)
		{
			result.set(i,j, A.get(i,j) - B.get(i,j));
		}
	}
}

function transpose(A)
{
	var tempMat = new Matrix(A.n,A.m);
	for(i=0; i<A.n; i++)
	{
		for(j=0; j<A.m; j++)
		{
			tempMat.set(i,j,A.get(i,j));
		}
	}

	var matIndex = 0;
	for(i=0; i<A.m; i++)
	{
		for(j=0;j<A.n;j++)
		{
			A.data[matIndex] = tempMat.get(j,i);
			matIndex++;
		}
	}
	var temp = A.n;
	A.n = A.m;
	A.m = temp;
}

function copy(A,B)
{
	B.n = A.n;
	B.m = A.m;
	for(i=0; i<A.n; i++)
	{
		for(j=0; j<A.m; j++)
		{
			B.set(i,j,A.get(i,j));
		}
	}
}


function Matrix(n,m)
{
	this.data = new Array(n*m);
	this.n = n;
	this.m = m;
	this.get = function(i,j)
	{
		var f = this.data[m*i + j];
		return f;
	};
	this.set = function(i,j,val)
	{
		this.data[m*i + j] = val;
	};

	this.zeros = function()
	{
		for(i = 0; i<n; i++)
		{
			for(j = 0; j<m; j++)
			{
				this.set(i,j,0);
			}
		}
	};
}

function Matrix4x4()
{
	this.data = new Array(16);
	this.n = 4;
	this.m = 4;
	this.rMatrix = new Matrix(4,4);
	this.tempMat = new Matrix(4,4);
	this.get = function(i,j)
	{
		var f = this.data[m*i + j];
		return f;
	};
	this.set = function(i,j,val)
	{
		this.data[m*i + j] = val;
	};
	this.zeros = function()
	{
		for(i = 0; i<n; i++)
		{
			for(j = 0; j<m; j++)
			{
				this.set(i,j,0);
			}
		}
	};
	this.loadIdentity = function()
	{
		this.zeros();
		this.set(0,0,1);
		this.set(1,1,1);
		this.set(2,2,1);
		this.set(3,3,1);
	};
	this.inverse = function(result)
	{
		//write LU decomposition + inverse ...... later
	};

	this.rotate = function(angle,x,y,z)
	{
		rotationMatrix(angle,x,y,z,this.rMatrix);
		multMatrix(this,this.rMatrix,this.tempMat);
		copyMatrix(this.tempMat,this);
	};
	this.rotationMatrix = function(angle,x,y,z,result)
	{
		var sinAngle = Math.sin(angle);
		var cosAngle = Math.cos(angle);

		result.set(0,0, x*x + (1 - x*x)*cosAngle);
		result.set(0,1,x*y*(1- cosAngle) - z*sinAngle);
		result.set(0,2,x*z*(1 - cosAngle) + y*sinAngle);
		result.set(0,3,0);

		result.set(1,0,x*y*(1 - cosAngle) + z*sinAngle);
		result.set(1,1,y*y + (1 - y*y)*cosAngle);
		result.set(1,2,y*z*(1 - cosAngle) - x*sinAngle);
		result.set(1,3,0);

		result.set(2,0,z*x*(1 - cosAngle) - y*sinAngle);
		result.set(2,1,z*y*(1 - cosAngle) + x*sinAngle);
		result.set(2,2,z*z + (1 - z*z)*cosAngle);
		result.set(2,3,0);

		result.set(3,0,0);
		result.set(3,1,0);
		result.set(3,2,0);
		result.set(3,3,1);
	};
	this.scale = function(x,y,z)
	{
		this.rMatrix.zeros();
		this.rMatrix.set(1,1,x);
		this.rMatrix.set(2,2,y);
		this.rMatrix.set(3,3,z);
		multMatrix(this,this.rMatirx,this.tempMat);
		copyMatrix(this.tempMat,this);
	};
	this.translate = function(x,y,z)
	{
		this.rMatrix.zeros();
		this.rMatrix.set(0,0,1);
		this.rMatrix.set(1,1,1);
		this.rMatrix.set(2,2,1);
		this.rMatrix.set(3,3,1);
		
		this.rMatrix.set(0,3,x);
		this.rMatrix.set(1,3,y);
		this.rMatrix.set(2,3,z);

		multMatrix(this,this.rMatrix,this.tempMat);
		copyMatrix(this.tempMat,this);
	};
	this.perspective = function(fov,screenWidth,screenHeight,nearPlane,farPlane)
	{
		var e;
		if(fov == 180.0)
			e = 0;
		else
			e = 1/Math.tan( (fov*(3.141592654/180.0))/2.0 );

		var aspectRatio = screenWidth/screenHeight;
		this.set(0,0,aspectRatio);
		this.set(0,1,0);
		this.set(0,2,0);
		this.set(0,3,0);

		this.set(1,0,0);
		this.set(1,1,1);
		this.set(1,2,0);
		this.set(1,3,0);

		this.set(2,0,0);
		this.set(2,1,0);
		this.set(2, 2, (farPlane + nearPlane) / (farPlane - nearPlane));
		this.set(2, 3, (-2*farPlane*nearPlane) / (farPlane - nearPlane));

		this.set(3,0,0);
		this.set(3,1,0);
		this.set(3,2, -1);
		this.set(3,3,0);
	};

}