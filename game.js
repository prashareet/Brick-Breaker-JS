const blockHeight =20;
const blockWidth =100;
const grid = document.querySelector(".grid");
//draw the blocks
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter =20;
const ballStart =[270,40];
let currentBallPosition = ballStart;
const userStart =[230,20];
let currentPosition = userStart;
let xDirection =-2;
let yDirection =2;
let timerId;
class Block{
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight =[(xAxis+ blockWidth), yAxis ];
        this.topLeft =[xAxis, (yAxis+ blockHeight)];
        this.topRight =[(xAxis+ blockWidth), (yAxis+ blockHeight)];
    }
}
console.log(Block);
const blocks=[
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),


]

function addBlock(){
    for(let i=0;i<blocks.length;i++){
        const block = document.createElement("div");
        block.classList.add("block");
        block.style.left =blocks[i].bottomLeft[0] +"px";
        block.style.bottom =blocks[i].bottomLeft[1] +"px";
        grid.appendChild(block);
    }
   
}
addBlock();
//adding the user:
const user = document.createElement("div");
user.classList.add("user");
user.style.left = currentPosition[0] + "px";
user.style.bottom = currentPosition[1]+ "px";
grid.appendChild(user);

//drawUser:
function drawUser(){
    user.style.left= currentPosition[0] +"px";
    user.style.bottom = currentPosition[1]+ "px";
}
//drawBall:
function drawBall(){
    ball.style.left=currentBallPosition[0]+ "px";
    ball.style.bottom = currentBallPosition[1]+ "px";
}
//addingTheball
const ball = document.createElement("div");
drawBall();
ball.classList.add("ball");

grid.appendChild(ball);

function moveUser(e){
    switch(e.key){
        case "ArrowLeft":
            if(currentPosition[0]>0){
                currentPosition[0]-=10;
                drawUser();
            }
            break;
        case "ArrowRight":
            if(currentPosition[0]<460){
                currentPosition[0]+=10;
                drawUser();
            }
    }
}
//movingTheBall:
function moveBall(){
    currentBallPosition[0]+=xDirection;
    currentBallPosition[1]+=yDirection;
    drawBall();
    checkForCollisions();
}
 timerId=setInterval(moveBall,30);
document.addEventListener("keydown",moveUser);

// check for collisions:
function checkForCollisions(){
    //Block Collisions:
    for(let i=0;i<blocks.length;i++){
        if(currentBallPosition[0]>blocks[i].bottomLeft[0] &&currentBallPosition[0]<blocks[i].bottomRight[0]&&
            (currentBallPosition[1] +ballDiameter)>blocks[i].bottomLeft[1] && currentBallPosition[1]<blocks[i].topLeft[1]){
                const allBlocks = Array.from(document.querySelectorAll(".block"));
                console.log(allBlocks);
                allBlocks[i].classList.remove("block");
                blocks.splice(i,1);
                changeDirection();
            }
    }
    


    //Wall Collisions:
    if(currentBallPosition[0]>=(boardWidth-ballDiameter)|| currentBallPosition[1]>=(boardHeight-ballDiameter)
    ||currentBallPosition[0]<=0){
        changeDirection();
    }
    //user Collision

    if(currentBallPosition[0]>currentPosition[0] && currentBallPosition[0]<=(currentPosition[0]+blockWidth) &&
        currentBallPosition[1]>currentPosition[1]&&currentBallPosition[1]<(currentPosition[1]+ blockHeight)){
        changeDirection();
    }
    
    
    //CheckForGameOver:
    if(currentBallPosition[1]<=0){
        clearInterval(timerId);
        document.removeEventListener("keydown",moveUser);
    }
    
}
function changeDirection(){
    if(xDirection===2 && yDirection===2){
        yDirection =-2
        return;
    }
    if(xDirection==2 && yDirection==-2){
        xDirection=-2;
        return;
    }
    if(xDirection==-2 && yDirection==-2){
        yDirection=2;
        return;
    }
    if(xDirection==-2 && yDirection==2){
        xDirection=2;
        return;
    }
        
    

}
