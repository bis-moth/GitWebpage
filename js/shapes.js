import {pi,pi2,pi05} from './myMathTools.js';

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

export default function drawBox(ctx, box){
    var corners = box.getCorners();
    
    ctx.fillStyle = "rgb("+box.color[0]+","+box.color[1]+","+box.color[2]+")";
    ctx.beginPath();
    ctx.moveTo(corners.tl[0],corners.tl[1]);
    ctx.lineTo(corners.tr[0],corners.tr[1]);
    ctx.lineTo(corners.br[0],corners.br[1]);
    ctx.lineTo(corners.bl[0],corners.bl[1]);
    ctx.fill();
}

export function drawCircle(ctx, circle){

}

