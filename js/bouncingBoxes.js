var frame = 0;
var boxes = {};
boxes.r=[0,0,50,50];
boxes.b=[30,30,50,75];
boxes.g=[30,30,75,50];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


function displace(box, speed) {
    
    var x = Math.abs(((speed*frame+canvas.width-box[2])%((canvas.width*2)-(2*box[2]))-canvas.width+box[2]));
    var y = Math.abs(((speed*frame)%((canvas.height*2)-(2*box[3]))-canvas.height+box[3]));

    box[0] = x;
    box[1] = y;

    return box;
}

function draw() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    frame++
    if(frame > 999999999){
        frame = 0;
    }
    boxes.r = displace(boxes.r, 4);
    boxes.b = displace(boxes.b, 2);
    boxes.g = displace(boxes.g, 3);

    document.getElementById("RedBox").innerHTML =  "Red box - X:" + boxes.r[0] + " Y:" + (canvas.height - boxes.r[1]);
    document.getElementById("BlueBox").innerHTML =  "Blue box - X:" + boxes.b[0] + " Y:" + (canvas.height - boxes.b[1]);
    document.getElementById("GreenBox").innerHTML =  "Green box - X:" + boxes.g[0] + " Y:" + (canvas.height - boxes.g[1]);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fillRect(boxes.r[0], boxes.r[1], boxes.r[2], boxes.r[3]);

    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect(boxes.b[0], boxes.b[1], boxes.b[2], boxes.b[3]);

    ctx.fillStyle = "rgba(0, 200, 0, 0.5)";
    ctx.fillRect(boxes.g[0], boxes.g[1], boxes.g[2], boxes.g[3]);

}

function animateBoxes(){
    draw();
    setInterval(draw, 16);
}