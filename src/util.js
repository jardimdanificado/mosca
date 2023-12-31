import * as text from "./text.js"

export function cloneMatrix(matrix) {
    // Check if the input is a valid matrix (2D array)
    if (!Array.isArray(matrix) || matrix.length === 0 || !Array.isArray(matrix[0])) {
        throw new Error('Invalid matrix input');
    }

    // Get the dimensions of the original matrix
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    // Create a new matrix with the same dimensions
    const clonedMatrix = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
        clonedMatrix[i] = new Array(numCols);
    }

    // Copy the elements from the original matrix to the new one
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            clonedMatrix[row][col] = matrix[row][col];
        }
    }

    return clonedMatrix;
}


export function matrixReplace(matrix, oldPattern, newPattern) {
    const numRows = matrix.length;
    if (numRows === 0) return matrix; // Empty matrix, nothing to replace

    const numCols = matrix[0].length;

    // Clone the original matrix
    const clonedMatrix = matrix.map((row) => [...row]);

    // Iterate through the matrix and check for the old pattern
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (clonedMatrix[row][col] === oldPattern[0][0] || oldPattern[0][0] === undefined) {
                // Check if the old pattern matches in this position or if it's undefined in the old pattern
                let matches = true;
                for (let i = 0; i < oldPattern.length; i++) {
                    for (let j = 0; j < oldPattern[i].length; j++) {
                        if (
                            row + i >= numRows ||
                            col + j >= numCols ||
                            (oldPattern[i][j] !== undefined && clonedMatrix[row + i][col + j] !== oldPattern[i][j])
                        ) {
                            matches = false;
                            break;
                        }
                    }
                    if (!matches) break;
                }

                // If the old pattern matches or is undefined, replace it with the new pattern
                if (matches) {
                    for (let i = 0; i < oldPattern.length; i++) {
                        for (let j = 0; j < oldPattern[i].length; j++) {
                            if (oldPattern[i][j] !== undefined) {
                                clonedMatrix[row + i][col + j] = newPattern[i][j];
                            }
                        }
                    }
                }
            }
        }
    }

    return clonedMatrix;
}

export function Vector3Subtract(vec0,vec1)
{
	return {x:vec0.x - vec1.x,y:vec0.y - vec1.y,z:vec0.z - vec1.z};
}

export function Vector3Add(vec0,vec1)
{
	return {x:vec0.x + vec1.x,y:vec0.y + vec1.y,z:vec0.z + vec1.z};
}

export function Vector2Subtract(vec0,vec1)
{
	return {x:vec0.x - vec1.x,y:vec0.y - vec1.y};
}

export function Vector2Add(vec0,vec1)
{
	return {x:vec0.x + vec1.x,y:vec0.y + vec1.y};
}

export function HSL2RGB(h, s, l) 
{
	var r, g, b;
	if (s == 0) 
	{
		r = g = b = l; // achromatic
	}
	else 
	{
		var hue2rgb = function hue2rgb(p, q, t) 
		{
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		}

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return (RGB(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)));
}

export function HSL2RGBA(h, s, l) 
{
	let temp = HSL2RGB(h, s, l);
	temp.a = 255;
	return (temp);
}

export async function organizeArray(arr, parts) 
{
	let matrix = [];
	let chunkSize = Math.ceil(arr.length / parts);
	for (let i = 0; i < parts; i++) 
	{
		matrix.push(arr.slice(i * chunkSize, (i + 1) * chunkSize));
	}
	return matrix;
}

export async function autoOrganizeArray(arr) 
{
	let matrix = [];
	let parts = Math.ceil(Math.sqrt(arr.length));
	let chunkSize = Math.ceil(arr.length / parts);
	for (let i = 0; i < arr.length; i += chunkSize) 
	{
		matrix.push(arr.slice(i, i + chunkSize));
	}
	return matrix;
}

export function recursiveMap(arr, callback) 
{
	return arr.map(function(element) 
	{
	  if (Array.isArray(element)) 
	  {
		return recursiveMap(element, callback);
	  } 
	  else 
	  {
		return callback(element);
	  }
	});
} 

export function flattenMatrix(matrix) 
{
	return matrix.reduce((flatArray, currentRow) => flatArray.concat(currentRow), []);
}

export function shuffleArray(arr) 
{
	for (let i = arr.length - 1; i > 0; i--) 
	{
	  const j = Math.floor(Math.random() * (i + 1));
	  [arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

export function Size(w, h) 
{
	var temp = { w: w, h: h }; temp.height = temp.h; temp.width = temp.w; return temp; 
}

export function randomIntArray(start, end, size) 
{
	const result = [];
	const range = end - start + 1;
	for (let i = 0; i < size; i++) {
	  const randomInt = Math.floor(Math.random() * range) + start;
	  result.push(randomInt);
	}
	return result;
  }

export function getSizeInBytes(input) 
{
	if (typeof input == 'function') 
		return (input.toString().length); 
	else 
		return (JSON.stringify(input).length); 
}

//-----------------------------------
//UTILS
//-----------------------------------

export function roleta(...odds) 
{
	var roleta = []; 
	for(let i = 0; i<odds.length;i++)
		roleta = roleta.concat(Array(odds[i]).fill(i));
	return(shuffleArray(shuffleArray(shuffleArray(roleta)))[randomInRange(0, roleta.length - 1)]);
}

export function repeatWithInterval(func, args, delay) 
{
	function runFunc() 
	{
	  // Call the function with the provided arguments
	  func.apply(null, args);
	}
  
	// Start the initial execution of the function with setInterval
	var intervalHandle = setInterval(runFunc, delay);
  
	// Return the handle to the current setInterval call
	return intervalHandle;
}

export function repeatWithAnimationFrame(func, args) 
{
	function runFunc() 
	{
	  // Call the function with the provided arguments
	  func.apply(null, args);
  
	  // Set up the next execution of the function with requestAnimationFrame
	  animationFrameHandle = requestAnimationFrame(runFunc);
	}
  
	// Start the initial execution of the function with requestAnimationFrame
	var animationFrameHandle = requestAnimationFrame(runFunc);
  
	// Return the handle to the current requestAnimationFrame call
	return animationFrameHandle;
}

export async function expandMatrix(matrix) 
{
	let finalMatrix = [];
	let currentRow = 0;
	//console.log(matrix)
	for (let i = 0; i < matrix.length; i++) 
	{
		for (let j = 0; j < matrix[i].length; j++) 
		{
			for (let x = 0; x < matrix[i][j].length; x++) 
			{
				for (let y = 0; y < matrix[i][j][x].length; y++) 
				{
					if (!finalMatrix[currentRow + x]) 
					{
						finalMatrix[currentRow + x] = [];
					}
					finalMatrix[currentRow + x][y + matrix[i][j][x].length * j] = matrix[i][j][x][y];
				}
			}
		}
		currentRow += matrix[i][0].length;
	}
	return finalMatrix;
}

export async function splitMatrix(matrix) 
{
	let subMatrixSize = Math.ceil(matrix.length / 2);
	let subMatrix1 = matrix.slice(0, subMatrixSize).map(x => x.slice(0, subMatrixSize));
	let subMatrix2 = matrix.slice(0, subMatrixSize).map(x => x.slice(subMatrixSize));
	let subMatrix3 = matrix.slice(subMatrixSize).map(x => x.slice(0, subMatrixSize));
	let subMatrix4 = matrix.slice(subMatrixSize).map(x => x.slice(subMatrixSize));
	return [[subMatrix1, subMatrix2], [subMatrix3, subMatrix4]];
}

export async function customSplitMatrix(matrix, slices) 
{
	let subMatrixSize = Math.ceil(matrix.length / slices);
	let subMatrices = [];
	for (let i = 0; i < slices; i++) 
	{
		for (let j = 0; j < slices; j++) 
		{
			let subMatrix = matrix.slice(i * subMatrixSize, (i + 1) * subMatrixSize).map(x => x.slice(j * subMatrixSize, (j + 1) * subMatrixSize));
			subMatrices.push(subMatrix);
		}
	}
	return subMatrices;
}

export async function customMarginalSplitMatrix(matrix, slices = 2, margin = 0) 
{
	let subMatrixSize = Math.ceil(matrix.length / slices);
	let subMatrix1 = matrix.slice(0, subMatrixSize + margin).map(x => x.slice(0, subMatrixSize + margin));
	let subMatrix2 = matrix.slice(0, subMatrixSize + margin).map(x => x.slice(subMatrixSize - margin));
	let subMatrix3 = matrix.slice(subMatrixSize - margin).map(x => x.slice(0, subMatrixSize + margin));
	let subMatrix4 = matrix.slice(subMatrixSize - margin).map(x => x.slice(subMatrixSize - margin));
	return [[subMatrix1, subMatrix2], [subMatrix3, subMatrix4]];
}

export async function marginalSplitMatrix(matrix, margin = 8) 
{
	let subMatrixSize = Math.ceil(matrix.length / 2);
	let subMatrix1 = matrix.slice(0, subMatrixSize + margin).map(x => x.slice(0, subMatrixSize + margin));
	let subMatrix2 = matrix.slice(0, subMatrixSize + margin).map(x => x.slice(subMatrixSize - margin));
	let subMatrix3 = matrix.slice(subMatrixSize - margin).map(x => x.slice(0, subMatrixSize + margin));
	let subMatrix4 = matrix.slice(subMatrixSize - margin).map(x => x.slice(subMatrixSize - margin));
	return [[subMatrix1, subMatrix2], [subMatrix3, subMatrix4]];
}

export async function divideMatrix(largeMatrix, slices) 
{
	let dividedMatrix = [];
	let sliceSize = Math.floor(largeMatrix.length / slices);
	for (let i = 0; i < largeMatrix.length; i += sliceSize) 
	{
		let row = largeMatrix.slice(i, i + sliceSize);
		let dividedRow = [];
		for (let j = 0; j < row[0].length; j += sliceSize) 
		{
			let subMatrix = row.map(x => x.slice(j, j + sliceSize));
			dividedRow.push(subMatrix);
		}
		dividedMatrix.push(dividedRow);
	}
	return dividedMatrix;
}

export function create3DArray(dimX, dimY, dimZ, input) 
{
	const arr3D = [];

	for (let i = 0; i < dimX; i++) 
	{
		const arr2D = [];
		for (let j = 0; j < dimY; j++) 
		{
			const arr1D = [];
			for (let k = 0; k < dimZ; k++) 
			{
				if (typeof input === 'function') 
				{
					arr1D.push(input());
				}
				else if (typeof input === 'object' || typeof input === 'number' || typeof input === 'string') 
				{
					arr1D.push(input);
				}
				else if (typeof input === 'function' && input.prototype.constructor) 
				{
					arr1D.push(new input());
				}
				else 
				{
					arr1D.push({});
				}
			}
			arr2D.push(arr1D);
		}
		arr3D.push(arr2D);
	}
	return arr3D;
}

export function regraDeTres(a, b, d) 
{
	const c = (a * d) / b;
	return c;
}
export const regrad3 = regraDeTres

export function findMinMax(arr) 
{
	let min = Infinity;
	let max = -Infinity;
  
	if (Array.isArray(arr[0])) 
	{
	  // Recursive case: array contains arrays
	  for (let i = 0; i < arr.length; i++) 
	  {
		const subArrayMinMax = findMinMax(arr[i]);
		min = Math.min(min, subArrayMinMax.min);
		max = Math.max(max, subArrayMinMax.max);
	  }
	} 
	else 
	{
	  // Base case: array contains values
	  for (let i = 0; i < arr.length; i++) 
	  {
		min = Math.min(min, arr[i]);
		max = Math.max(max, arr[i]);
	  }
	}
  
	return { min, max };
  }
  
export function getUniqueValues(arr) 
{
	// flatten the input array
	const flatArr = arr.flat(Infinity);
	// create a Set to store unique values
	const uniqueSet = new Set(flatArr);
	// convert Set to array and return
	return Array.from(uniqueSet);
  }

export function manualLength(arr) 
{
	var count = 0;
	while (true) 
	{
		if (typeof arr[count] != 'undefined')
			count++;
		else
			return count;
	}
}

export function customFilter(array,property,value)
{
	return(array.filter((element) => 
	{
 		return element[property] === value;
	}))
}

export function LimitTo(value, min, max) 
{
	if (value > max) {
		while (value > max)
			value -= max - min;
	}
	if (value < min) {
		while (value < min)
			value += max - min;
	}
	return value;
}

export function ScaleTo(value, min, max) 
{
	if (value > max) {
		while (value > max)
			value -= max - min;
	}
	if (value < min) {
		while (value < min)
			value += max - min;
	}
	value = regraDeTres(max-min,100,value-min);
	return value;
}

export function Pending(pendingList,frames, func, args) 
{
	if (typeof frames != 'undefined' && typeof func != 'undefined') 
	{
		let temp = {};
		temp.frames = frames;
		temp.func = func;
		if (typeof args != 'undefined')
			temp.args = args;
		pendingList.push(temp);
	}
	else {
		for (let i = 0; i < pendingList.length; i++) 
		{
			if (pendingList[i].frames > 0)
				pendingList[i].frames--;
			else 
			{
				if (typeof pendingList[i].args == 'undefined')
					pendingList[i].func();
				else
					pendingList[i].func.apply(null, pendingList[i].args);
				pendingList.splice(i, 1);
			}
		}
	}
}

export function randomInRange(min, max) 
{ 
	return Math.floor(Math.random() * (max - min + 1) + min); 
}
export const randi = randomInRange

//-----------------------------------
//CALCULATE
//-----------------------------------

export function FloatDifference(a, b) 
{ 
	return ((a + b + Math.abs(a - b)) / 2); 
}

export function Vector3Difference(vec1, vec2) 
{ 
	return (new Vector3(FloatDifference(vec1.x, vec2.x), FloatDifference(vec1.y, vec2.y), FloatDifference(vec1.z, vec2.z))); 
}

export function RotateAroundPivot(point, pivot, angle) 
{
	angle = (angle) * (Math.PI / 180); // Convert to radians
	var rotatedX = Math.cos(angle) * (point.x - pivot.x) - Math.sin(angle) * (point.z - pivot.z) + pivot.x;
	var rotatedZ = Math.sin(angle) * (point.x - pivot.x) + Math.cos(angle) * (point.z - pivot.z) + pivot.z;
	return (new Vector3(rotatedX, point.y, rotatedZ));
}

//-----------------------------------
//DEBUG
//-----------------------------------

export function benchy(callback, args, optName = "unamed") 
{
	callback.name ??= optName;
	console.time(callback.name);
	const result = callback.apply(this, args);
	console.timeEnd(callback.name);
	if(typeof result == 'undefined')
		return null;
	return (result);
}

export async function abenchy(callback, args, optName = "unamed") 
{
	if (optName == "unamed" && callback.name.length > 0)
		optName = callback.name;
	console.time(optName);
	const result = await callback.apply(this, args);
	console.timeEnd(optName);
	if(typeof result == 'undefined')
		return null;
	return (result)
}

export function loadjs(scriptUrl, callback) {
    // Create a new script element
    const script = document.createElement('script');

    // Set the 'src' attribute to the URL of the external JavaScript file
    script.src = scriptUrl;

    // Define a callback function to execute when the script has loaded
    script.onload = function () {
        // Call the callback function if provided
        if (typeof callback === 'function') {
            callback();
        }
    };

    // Append the script element to the HTML document's <head>
    document.head.appendChild(script);
}

export function multiloadjs(scriptUrls, callback) {
    const loadedScripts = [];
    let scriptsToLoad = scriptUrls.length;

    function scriptLoaded(scriptUrl) 
	{
        loadedScripts.push(scriptUrl);
        if (loadedScripts.length === scriptsToLoad) {
            // All scripts have loaded
            if (typeof callback === 'function') {
                callback();
            }
        }
    }

    scriptUrls.forEach((scriptUrl) => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = () => scriptLoaded(scriptUrl);
        document.head.appendChild(script);
    });
}

export function multif(func,times)
{
	let result = []
	for (let index = 0; index < times; index++) 
	{
		result.push(func())
	}
	return result
}

export function multifa(func,args)
{
	let result = []
	for (let index = 0; index < args.length; index++) 
	{
		result.push(func(...args[index]))
	}
	return result
}

export function multifat(func,arg,times)
{
	let result = []
	for (let index = 0; index < times; index++) 
	{
		result.push(func(arg))
	}
	return result
}

export function multic(_class,times)
{
	let result = []
	for (let index = 0; index < times; index++) 
	{
		result.push(new _class())
	}
	return result
}

export function multica(_class,args)
{
	let result = []
	for (let index = 0; index < args.length; index++) 
	{
		result.push(new _class(...args[index]))
	}
	return result
}

export function multicat(_class,arg,times)
{
	let result = []
	for (let index = 0; index < times; index++) 
	{
		result.push(new _class(arg))
	}
	return result
}

export function newMatrix(x,y,value = 0) 
{
	let matrix = []
	for (let xx = 0; xx < x; xx++) 
	{
		matrix.push(Array(y).fill(value))
	}
	return matrix	
}

export function clearDocumentListeners()
{
	const eventTypes = getEventListeners(document);
	for (const eventType in eventTypes) {
		if (eventTypes.hasOwnProperty(eventType)) {
			eventTypes[eventType].forEach(listener => {
				document.removeEventListener(eventType, listener.listener);
			});
		}
	}
}

export function recurse(object,subname) 
{
	return(object[subname])
}

export function splitSpriteSheet(spritesheet, largura, altura, corTransparente) {
    const partes = [];
    for (let y = 0; y < spritesheet.height; y += altura) {
        for (let x = 0; x < spritesheet.width; x += largura) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = largura;
            canvas.height = altura;

            ctx.clearRect(0, 0, largura, altura);
            ctx.drawImage(spritesheet, x, y, largura, altura, 0, 0, largura, altura);

            if (corTransparente) {
                const imageData = ctx.getImageData(0, 0, largura, altura);
                for (let i = 0; i < imageData.data.length; i += 4) {
                    const red = imageData.data[i];
                    const green = imageData.data[i + 1];
                    const blue = imageData.data[i + 2];
                    if (
                        red === corTransparente[0] &&
                        green === corTransparente[1] &&
                        blue === corTransparente[2]
                    ) {
                        imageData.data[i + 3] = 0; // Define o canal alfa como zero (transparente)
                    }
                }
                ctx.putImageData(imageData, 0, 0);
            }

            const image = new Image();
            image.src = canvas.toDataURL();

            partes.push(image);
        }
    }

    return partes;
}

// Function to load an image as a Promise
export function loadImage(src) 
{
    return new Promise((resolve, reject) => 
    {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

// Load all images and return a Promise that resolves when all images are loaded
export function loadImages(session,tilesetnames) 
{
    const imagePromises = tilesetnames.map((src) => {
        return loadImage('./data/img/' + src + '.png').then((image) => {
            session.tileset[src] = splitSpriteSheet(image,16,16)
        });
    });
    text.loadAlphabet(session,imagePromises,loadImage)
    return Promise.all(imagePromises);
}

export function emptyfunc() {}