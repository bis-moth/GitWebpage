import {getCombinationsWithID, getRandomArbitrary, getRandomBoolean, pi, pi2,pi05, elementWiseOp, operateOnColumns, distanceBetweenPoints} from './myMathTools.js';
import {Shape, Box} from './shapes.js';
import {detectBoxCollision, drawBox} from './shapes.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const color_min = 20;
const color_max = 200;
const min_size = 10;
const max_size = 100;
const max_linear_velocity = 10;
const min_linear_velocity = 1;
const max_angular_velocity = 0.1


const number_of_boxes = 5;
var boxes = [];
var collisionPredictionMatrix = [];

function initializeBoxes() {
    console.log('initializeBoxes');
    var initial_boxes = []
    var i = 0;
    while (i < number_of_boxes){
        initial_boxes.push(spawnBox());
        i++;
    }
    return initial_boxes;
}

function updateCollisionPredictions(boxID){
    //Negative box ID means update all boxes
    //Otherwise, only update the matrix for the box ID specified

    //Matrix stores a list of boxIDs which have a high probability of collision
    //The index of the matrix is the boxID to perform collision detection for each boxID in the list at that given index
    //Make sense?....   sure, whatever...
    collisionPredictionMatrix = getCombinationsWithID(boxes);


}

function spawnBox(){
    var h_window = window.innerHeight;
    var w_window = window.innerWidth;
    
    var r = getRandomArbitrary(color_min, color_max);
    var g = getRandomArbitrary(color_min, color_max);
    var b = getRandomArbitrary(color_min, color_max);
    var color = [r,g,b];

    var h = getRandomArbitrary(min_size, max_size);
    var w = getRandomArbitrary(min_size, max_size);
    var ang = getRandomArbitrary(0, pi2);

    var vector = [getRandomBoolean(), getRandomBoolean()]
    var lvx = vector[0] * getRandomArbitrary(min_linear_velocity, max_linear_velocity);
    var lvy = vector[1] * getRandomArbitrary(min_linear_velocity, max_linear_velocity);
    var lv = [lvx, lvy];

    var av = getRandomArbitrary((-1*max_angular_velocity),max_angular_velocity);

    var loc = getRandomArbitrary(0,(w_window + h_window));
    var pos = [0,0];

    if(loc > h_window){
        if(vector[1] > 0){
            // Spawn along top
            pos = [(loc - h_window), (-1.4 * max_size)];
        }
        else{
            // Spawn along bottom
            pos = [(loc - h_window), (h_window + (1.4*max_size))];
        }
    }
    else{
        if(vector[0] > 0){
            // Spawn on the left
            pos = [(-1.4 * max_size), loc];
        }
        else{
            // Spawn on the right
            pos = [(w_window + (1.4*max_size)), loc];
        }
    }
    
    var box = new Box(color,h,w,pos,ang,lv,av);

    return box;
}

function isBoxOutOfBounds(box){
    var h_window = window.innerHeight;
    var w_window = window.innerWidth;

    var pos = box.position;
    var isOut = 0;

    if(pos[0] < (-2*max_size)){
        isOut = 1;
    }
    else if(pos[0] > (w_window + 2*max_size)){
        isOut = 1;
    }
    else if(pos[1] < (-2*max_size)){
        isOut = 1;
    }
    else if(pos[1] > (h_window + 2*max_size)){
        isOut = 1;
    }

    return isOut;
}

function drawScene() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var i = 0;
    while (i < number_of_boxes){
        drawBox(ctx, boxes[i]);
        i++;
    }

}

function detectErroniousCollision(box1, box2){
    var collisionValid = true;
    var distance = (distanceBetweenPoints(box1.position, box2.position))
    if (distance > 1.7*max_size){
        collisionValid = false;
    }

    return collisionValid;
}

function detectCollisions() {
    var boxPairs = getCombinationsWithID(boxes);

    for (let i = 0; i < boxPairs.length; i++){
        var boxPair = boxPairs[i];
        if (detectBoxCollision(boxPair[1],boxPair[3])){
            boxes[boxPair[0]].color = [255,0,0];
            boxes[boxPair[2]].color = [255,0,0];

            if (detectErroniousCollision(boxPair[1],boxPair[3])){
                console.log('Box1: ' + boxPair[1].position + 
                          "; Box2: " + boxPair[3].position);
            }

            
        }
    }
    
}

function updateBoxPositions() {
    var i = 0;
    while (i < number_of_boxes){
        if(isBoxOutOfBounds(boxes[i])){
            boxes[i] = spawnBox();
        }
        boxes[i].updateLocation();
        i++;
    }
}

function updateScene() {
    drawScene();
    detectCollisions();
    updateBoxPositions();
}

export default function animateBoxes(){
    boxes = initializeBoxes();
    collisionPredictionMatrix = updateCollisionPredictions();
    updateScene();
    setInterval(updateScene, 16);
}
