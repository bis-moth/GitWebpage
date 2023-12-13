var frame = 0;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const pi = Math.PI;
const pi2 = 2*pi;
const pi05 = pi/2;

const color_min = 20;
const color_max = 200;
const min_size = 10;
const max_size = 100;
const max_linear_velocity = 10;
const min_linear_velocity = 1;
const max_angular_velocity = 0.1

const number_of_boxes = 10;
var boxes = [];

class Box {
    constructor(r,g,b,h,w,pos,ang,lv,av){
        this.color = [r,g,b];
        this.height = h;
        this.width = w;
        this.position = pos;
        this.angle = ang;
        this.linear_velocity = lv;
        this.angular_velocity = av;
    }

    nextLocation(){
        var next_position = [this.position[0]+this.linear_velocity[0], this.position[1]+this.linear_velocity[1]];
        var next_angle = (this.angle+this.angular_velocity)%(pi2);
        return {pos:next_position, 
                ang:next_angle};
    }
    
    updateLocation(){
        var next_location = this.nextLocation();
        this.position = next_location.pos;
        this.angle = next_location.ang;
    }

    getCorners(){
        var width_displacement_components = [(Math.cos(this.angle)*(this.width/2)),
                                            (Math.sin(this.angle)*(this.width/2))];
        
        var height_displacement_components = [(Math.sin(this.angle)*(this.height/2)),
                                            (Math.cos(this.angle)*(this.height/2))];
        
        var top_left =  [this.position[0]
                    - width_displacement_components[0]
                    - height_displacement_components[0],

                    this.position[1]
                    - width_displacement_components[1]
                    + height_displacement_components[1]];
        
        var top_right = [this.position[0]
                    + width_displacement_components[0]
                    - height_displacement_components[0],

                    this.position[1]
                    + width_displacement_components[1]
                    + height_displacement_components[1]];

        var bot_left =  [this.position[0]
                    - width_displacement_components[0]
                    + height_displacement_components[0],

                    this.position[1]
                    - width_displacement_components[1]
                    - height_displacement_components[1]];

        var bot_right = [this.position[0]
                    + width_displacement_components[0]
                    + height_displacement_components[0],

                    this.position[1]
                    + width_displacement_components[1]
                    - height_displacement_components[1]];

        return {tl:top_left,
                tr:top_right,
                bl:bot_left,
                br:bot_right};
    }
    
};

function standardizeRectanglePoints(point1, point2) {
    const x1 = Math.min(point1[0], point2[0]);
    const y1 = Math.min(point1[1], point2[1]);
    const x2 = Math.max(point1[0], point2[0]);
    const y2 = Math.max(point1[1], point2[1]);

    return [x1, y1, x2, y2];
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

function getRandomBoolean() {
    return Math.sign(getRandomArbitrary(-1,1));
}

function randomBoxes() {
    initial_boxes = []
    for (let i = 0; i < number_of_boxes; i++) {
        initial_boxes.push(spawnBox());
    }
    return initial_boxes;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function spawnBox(){
    var h_window = window.innerHeight;
    var w_window = window.innerWidth;
    
    var r = getRandomArbitrary(color_min, color_max);
    var g = getRandomArbitrary(color_min, color_max);
    var b = getRandomArbitrary(color_min, color_max);

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
    
    box = new Box(r,g,b,h,w,pos,ang,lv,av);

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

function drawBox(box){
    corners = box.getCorners();
    
    ctx.fillStyle = "rgb("+box.color[0]+","+box.color[1]+","+box.color[2]+")";
    ctx.beginPath();
    ctx.moveTo(corners.tl[0],corners.tl[1]);
    ctx.lineTo(corners.tr[0],corners.tr[1]);
    ctx.lineTo(corners.br[0],corners.br[1]);
    ctx.lineTo(corners.bl[0],corners.bl[1]);
    ctx.fill();
}

function boxesOverlap(corners1, corners2){
    rect1 = standardizeRectanglePoints(corners1.tr, corners1.bl)
    rect2 = standardizeRectanglePoints(corners2.tr, corners2.bl)

    const [x1A, y1A, x2A, y2A] = rect1;
    const [x1B, y1B, x2B, y2B] = rect2;

    if (x2A < x1B || x2B < x1A || y2A < y1B || y2B < y1A) {
        return false; // Rectangles do not overlap
    } else {
        return true; // Rectangles overlap
    }
}

function handleCollisionPhysics(i, j){
    console.debug("handleCollisionPhysics")
    removeBox(j);
    removeBox(i);
}

function checkForCollisions(){
    console.debug("updateBoxes");
    for (let i = 0; i < boxes.length; i++) {
        corners1 = boxes[i].getCorners();
        for (let j = i + 1; j < boxes.length; j++) {
            corners2 = boxes[j].getCorners();
            if(boxesOverlap(corners1, corners2)){
                handleCollisionPhysics(i, j);
            }
        }
    }
}

function addBox(i){
    boxes.push(spawnBox());
}

function removeBox(i){
    boxes.splice(i, 1);
}

function updateBoxes() {
    console.debug("updateBoxes");

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    checkForCollisions();

    i = 0;
    while (i < boxes.length){
        if(isBoxOutOfBounds(boxes[i])){
            boxes[i] = spawnBox();
        }
        drawBox(boxes[i]);
        boxes[i].updateLocation();
        i++;
    }

}

testBox1 = new Box(color_max,color_max,color_max,max_size,min_size,[window.innerWidth*0.333, window.innerHeight/2],0,[min_linear_velocity,0],2*max_angular_velocity);
testBox2 = new Box(color_max,color_max,color_max,min_size,max_size,[window.innerWidth*0.667, window.innerHeight/2],0,[-1*min_linear_velocity,0],0);
testBoxes = [testBox1, testBox2]

function animateBoxes(){
    boxes = randomBoxes();
    //boxes = testBoxes;
    updateBoxes();
    setInterval(updateBoxes, 16);
}
