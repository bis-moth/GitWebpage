export const pi = Math.PI;
export const pi2 = 2*pi;
export const pi05 = pi/2;

//---------------------------------------------------
// RANDOM NUMBERS
//---------------------------------------------------

export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export function getRandomBoolean() {
  return Math.sign(getRandomArbitrary(-1,1));
}


//---------------------------------------------------
// PERMUTATIONS & COMBINATIONS
//---------------------------------------------------

export function getCombinations(array) {
  let results = [];

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      results.push([array[i], array[j]]);
    }
  }

  return results;
}

export function getCombinationsWithID(array) {
  let results = [];

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      results.push([i, array[i], j, array[j]]);
    }
  }

  return results;
}


//---------------------------------------------------
// ELEMENTWISE && ARRAY OPERATIONS
//---------------------------------------------------

var operations = {
  '+': function(a, b) { return a + b },
  '-': function(a, b) { return a - b },
  '*': function(a, b) { return a * b },
  '/': function(a, b) { return a / b },
  '&&': function(a, b) { return a && b },
  '||': function(a, b) { return a || b },
  '<': function(a, b) { return a < b },
  '<=': function(a, b) { return a <= b },
  '>': function(a, b) { return a > b },
  '>=': function(a, b) { return a >= b }
};

export function elementWiseOp(a,b,op) {
  var result = [];

  for (let i = 0; i < a.length; i++){
    //console.log('a '+ a[i])
    //console.log(op)
    //console.log('b ' + b[i])
    result.push(operations[op](a[i],b[i]));
    //console.log('c ' + result[i])
  }

  return result;
}

export function operateOnColumns(array, op){
  var result = array[0];
  //console.log(result)

  for (let i = 1; i < array.length; i++){
    var temp = array[i];
    //console.log('input1 ' + result)
    //console.log('input2 ' + temp)
    result = elementWiseOp(result, temp, op);
    //console.log('output ' + result)
  }

  return result;
}


//---------------------------------------------------
// CARTESIAN COORDINATE OPERATIONS
//---------------------------------------------------

export function distanceBetweenPoints(point1, point2 = [0,0]){

  var aSquared = Math.pow((point1[0]-point2[0]),2);
  var bSquared = Math.pow((point1[1]-point2[1]),2);
  var c = Math.sqrt(aSquared + bSquared);

  return c;

}

export function rotateCartesianCoordinateCCW(coordinate, angle, centerOfRotation = [0,0]){
  //Rotating Points around an Arbitrary Center
  //x1 = (x0 – xc)cos(θ) – (y0 – yc)sin(θ) + xc
  //y1 = (x0 – xc)sin(θ) + (y0 – yc)cos(θ) + yc

  var result = [];

  var x = (coordinate[0]-centerOfRotation[0])*Math.cos(angle)
        - (coordinate[1]-centerOfRotation[1])*Math.sin(angle)
        + (coordinate[0]);

  var y = (coordinate[0]-centerOfRotation[0])*Math.cos(angle)
        + (coordinate[1]-centerOfRotation[1])*Math.sin(angle)
        + (coordinate[0]);

  result = [x,y];

  return result;
}

