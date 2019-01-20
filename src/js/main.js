let SNAKE = null;
let ENVIRONMENT = null;
let MAP = null;

let canvas = null;

let screenHeight = window.innerHeight*0.8;
let screenWidth = window.innerWidth*0.95;

function setup() {
    canvas = createCanvas(screenWidth,screenHeight);
    canvas.parent("myGameArea");
    ENVIRONMENT = new Environment(screenWidth,screenHeight);
    SNAKE = new SnakeDNA();
    MAP = new Map(ENVIRONMENT,SNAKE);
    SNAKE.setEnvironment(ENVIRONMENT);
    restart();
    frameRate(30);
    window.location.href="#";

    //Swipe configuration
    let hammer = new Hammer(__("myGameArea").children[0], {
        preventDefault: true
    });
    hammer.get('swipe').set({
        direction: Hammer.DIRECTION_ALL
    });

    hammer.on("swipe", swiped);
}

//For key press
function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            SNAKE.switchDirection(0,-1);
            break;
        case DOWN_ARROW:
            SNAKE.switchDirection(0,1);
            break;
        case LEFT_ARROW:
            SNAKE.switchDirection(-1,0);
            break;
        case RIGHT_ARROW:
            SNAKE.switchDirection(1,0);
            break;
    }
}

//For swipe
function swiped(event) {
    switch(event.direction){
        case 8: //UP
            SNAKE.switchDirection(0,-1);
            break;
        case 16: //DOWN
            SNAKE.switchDirection(0,1);
            break;
        case 2: //LEFT
            SNAKE.switchDirection(-1,0);
            break;
        case 4: //RIGHT
            SNAKE.switchDirection(1,0);
            break;
    }
}

function draw() {
    noStroke();
    background(51);
    fill(219,125,138);
    MAP.show();
    fill(215,26,33);
    stroke(255);
    ENVIRONMENT.showFood(MAP.safePlaceForFood);
    noStroke();
    fill(255);
    SNAKE.gameLoop();
    if(ENVIRONMENT.isFoodConsumed(SNAKE)){
        ENVIRONMENT.changeFoodLocation(MAP.safePlaceForFood);
        SNAKE.addTail();
        SNAKE.addScore(ENVIRONMENT.foodCost);
    }
    if(ENVIRONMENT.isSnakeHitted(SNAKE) || MAP.isSnakeHittedOnWall || ENVIRONMENT.isTimeUp){
        if(SNAKE.lives>0)
            SNAKE.addLife(-1);
        if(SNAKE.lives === 0){
            window.location.href = "#gameOver";
            ENVIRONMENT.stopTimer();
            noLoop();
        }else{
            MAP.resetLevel(MAP.level);
        }
    }

    if(MAP.levelConfig.maxScore<=SNAKE.score){
        if(!MAP.setLevel(MAP.level+1) && !SNAKE.isWon){
            window.location.href = "#youWon";
            ENVIRONMENT.stopTimer();
            SNAKE.isWon = true;
            noLoop();
        }
    }
}


function restart() {
    SNAKE.reset();
    SNAKE.addTail(10);
    ENVIRONMENT.reset();
    MAP.setLevel(1);
    loop();
}