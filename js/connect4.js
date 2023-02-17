import {Box, Circle} from './shapes.js';
import drawBox from './shapes.js'

const canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


class Connect4Game {
    constructor(){
        this.rows = 6;
        this.cols = 7;

        this.gameState = 0;
        this.currentPlayer = 1;
        this.history = [];

        this.chipSize = 100;
        this.boardSpacing = 10;
        this.boardHeight = ((this.chipSize + this.boardSpacing) * this.rows) + this.boardSpacing;
        this.boardWidth = ((this.chipSize + this.boardSpacing) * this.cols) + this.boardSpacing;
        
        this.playerColors = [[200,0,0],[200,200,200],[0,0,200]];
        this.boardColor = [50,50,50];

        this.boardBox = new Box(this.boardColor,this.boardHeight, this.boardWidth);
    }

    move(col){
        this.history.push(col+1);
        this.board[col].push(this.currentPlayer);
        this.drawBoard(this.board);
        this.currentPlayer = (this.currentPlayer * -1);
    }   

    checkForWinner(){
        
    }
    
}

var game = new Connect4Game();
var chips = [];
for(let col = 0; col < game.cols; col++){
    for(let row = 0; row < game.rows; row++){
        chips.push(new Circle())
    }
    this.board.push([]);
}

function drawBoard(){
    var w_window = window.innerWidth;
    var h_window = window.innerHeight;
    var boardPosition = [w_window/2, h_window/2];

    game.boardBox.setPosition(boardPosition);
    drawBox(ctx, game.boardBox);
}


function drawChips(size, pos, color){
    for(let i = 0; i < game.history.length(); i++){
        
    }
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], size, 0, 2*Math.PI)
    ctx.fill();
}


function updateWindow(){
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    //drawBoard(game);
    //drawChips(game);
}

export default function startGame(){

    //updateWindow();
    //setInterval(updateWindow, 16);
    
};

