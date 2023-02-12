import {getRandomArbitrary, getRandomBoolean, pi, pi2,pi05} from './myMathTools.js';
import {Shape, Box} from './shapes.js';
import drawBox from './shapes.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const color_min = 20;
const color_max = 200;
const min_size = 10;
const max_size = 100;
const max_linear_velocity = 10;
const min_linear_velocity = 1;
const max_angular_velocity = 0.1


const number_of_boxes = 50;
var boxes = [];

function initializeBoxes() {
    var initial_boxes = []
    var i = 0;
    while (i < number_of_boxes){
        initial_boxes.push(spawnBox());
        i++;
    }
    return initial_boxes;
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

function detectCollision(box1,box2){
    var collision = 0;

    var line1_1 = 0;

}


function drawScene() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var i = 0;
    while (i < number_of_boxes){
        if(isBoxOutOfBounds(boxes[i])){
            boxes[i] = spawnBox();
        }
        drawBox(ctx, boxes[i]);
        boxes[i].updateLocation();
        i++;
    }
}

export default function animateBoxes(){
    boxes = initializeBoxes();
    drawScene();
    setInterval(drawScene, 16);
}
