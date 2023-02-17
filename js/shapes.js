import {rotateCartesianCoordinateCCW, 
        elementWiseOp, operateOnColumns,
        pi,pi2,pi05} from './myMathTools.js';

export class Shape {
    constructor(color=[200,200,200],
                pos=[100,100], ang=0,
                lv=[0,0], av=0){

        this.color = color;
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
        this.corners = this.getCorners();
    } 

}

export class Box extends Shape{
    constructor(color=[200,200,200],
                h=100, w=100,
                pos=[100,100], ang=0,
                lv=[0,0], av=0){
        
        super(color,pos,ang,lv,av);
        this.height = h;
        this.width = w;
        this.corners = this.getCorners();
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

        return [top_left,
                top_right,
                bot_right,
                bot_left];
    }

}

export class Circle extends Shape{
    constructor(color=[200,200,200],
                r=50,
                pos=[100,100], ang=0,
                lv=[0,0], av=0){
        
        super(color,pos,ang,lv,av);
        this.radius = r;
    }

    getCircumference(){
        return (2*r*pi);
    }
}

export function drawBox(ctx, box){
    var corners = box.getCorners();
    
    ctx.fillStyle = "rgb("+box.color[0]+","+box.color[1]+","+box.color[2]+")";
    ctx.beginPath();
    ctx.moveTo(corners[0][0],corners[0][1]);
    ctx.lineTo(corners[1][0],corners[1][1]);
    ctx.lineTo(corners[2][0],corners[2][1]);
    ctx.lineTo(corners[3][0],corners[3][1]);
    ctx.fill();
}

export function drawCircle(ctx, circle){

}

export function detectBoxCollision(box1,box2){
    var collision = true;
    if(halfBoxCollisionDetection(box1,box2)){
        collision = halfBoxCollisionDetection(box2,box1);
    }
    else {collision = false};

    return collision;
}

function halfBoxCollisionDetection(box1, box2){
    var collision = false;
    var corners = box2.corners;
    var collisionComponents = [];

    for (let i = 0; i < corners.length; i++){
        var corner = elementWiseOp(corners[i], box1.position, '-')
        corner = rotateCartesianCoordinateCCW(corner, box1.angle)
        corner[0] = Math.abs(corner[0]) - 0.5*box1.width;
        corner[1] = Math.abs(corner[1]) - 0.5*box1.height;
        var collisionComponent = [];

        for (var component in corner) {
            if (corner[component] > 0){
                collisionComponent.push(false);
            }
            else {
                collisionComponent.push(true);
            }
            
        }

        collisionComponents.push(collisionComponent)
    }

    collisionComponents = operateOnColumns(collisionComponents, '||');
    collision = collisionComponents[0] && collisionComponents[1];
    return collision;
}

