const ctx = document.getElementById('canva').getContext('2d');
const gameWidth = 500;
const gameHeight = 500;
const snakeColor = 'pink';
const snakeBorder = 'brown';
const foodColor = 'green';
const unit = 25;
const scoreText = document.getElementById('score')
const resetBtn = document.getElementById('btn')

var foodX ;
var foodY ;
var running = false;

var xVelocity = unit;
var yVelocity = 0;
var score = 0;
var snake = [
    {x: unit * 2, y: 0},
    {x: unit, y: 0},
    {x: 0, y: 0}
];

window.document.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);

start();

function start(){
    running = true;
    scoreText.textContent = score;
    createFood();
    next()

};
function next(){
    if(running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkOver();
            next();
        }, 150);
    }
};
function createFood(){
    function rand(){
      return Math.round((Math.random() * 475) / unit) * unit;
    }
    foodX = rand();
    foodY = rand();
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unit, unit)

};
function moveSnake(){
    var head = {x: snake[0].x + xVelocity, 
                y: snake[0].y + yVelocity };
    snake.unshift(head);

    if(snake[0].x == foodX && snake[0].y == foodY){
        score += 1;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }
};
function drawSnake(){

    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach((part) => {
        
        ctx.fillRect(part.x, part.y, unit, unit);
        ctx.strokeRect(part.x, part.y, unit, unit)

    })

};
function changeDirection(event){
    switch(true){
        case event.key == 'ArrowUp' && !(yVelocity == unit):
            yVelocity = -unit;
            xVelocity = 0;
            break;
        case event.key == 'ArrowDown' && !(yVelocity == -unit):
            yVelocity = unit;
            xVelocity = 0;
            break;
        case event.key == 'ArrowLeft' && !(xVelocity == unit):
            xVelocity = -unit;
            yVelocity = 0;
            break;
        case event.key == 'ArrowRight' && !(xVelocity == -unit):
            xVelocity = unit;
            yVelocity = 0;
            break; 
    }
   
    


};
function checkOver(){
    switch(true){
        case snake[0].x >= 500 || snake[0].y >= 500:
            displayOver();
            break;
        case snake[0].x < 0 || snake[0].y < 0:
            displayOver();
            break;
    };

    for(i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            displayOver();
        }
    }
    
};
function resetGame(){

    score = 0;
    xVelocity = unit;
    yVelocity = 0;
    snake = [
        {x: unit * 2, y: 0},
        {x: unit, y: 0},
        {x: 0, y: 0}
    ];
    start();

};
function displayOver(){
    ctx.fillStyle = 'white';
    ctx.font = '30px MV Boli';
    ctx.textAlign = 'center';
    ctx.fillText('Bro Your score : ' + score, 250, 250)
    running = false;

};
function clearBoard(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 500, 500)
};