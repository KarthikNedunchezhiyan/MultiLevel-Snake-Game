class Environment{
    constructor(width,height,foodScale=7){
        this.size = new Vector(width,height);
        this.foodScale = foodScale;
        this.foodCost = 5;
        this.timer = null;
        this.reset();
    }

    reset(){
        this.foodPosition = null;
        this.isTimeUp = false;
    }

    changeFoodLocation(vector){
        this.foodPosition = (vector === undefined)?new Vector(random(this.size.x*0.95),random(this.size.y*0.95)):vector;
    }

    showFood(vector){
        if(this.foodPosition === null)
            this.changeFoodLocation(vector);

        rect(this.foodPosition.x,this.foodPosition.y,this.foodScale,this.foodScale);
    }

    isCollide(target1PositionVector,target1Scale,target2PositionVector,target2Scale){
        let x = target1PositionVector.x;
        let y = target1PositionVector.y;
        let FS = target1Scale;
        let X = target2PositionVector.x;
        let Y = target2PositionVector.y;
        let SS = target2Scale;

        return (( (x<=X && ((x+FS) >= X)) || (x>=X && ((x+FS) <= (X+SS))) || (x>=X && (x <= (X+SS))) )
             && ( (y<=Y && ((y+FS) >= Y)) || (y>=Y && ((y+FS) <= (Y+SS))) || (y>=Y && (y <= (Y+SS))) ));
    }

    isFoodConsumed(snake){
        return this.isCollide(this.foodPosition,this.foodScale,snake.position[0],snake.scale);
    }

    isSnakeHitted(snake){
        for(let i=1;i<snake.tailCount;i++){
            if(this.isCollide(snake.position[0],snake.scale-1,snake.position[i],snake.scale-1)) {
                return true;
            }
        }
        return false;
    }

    stopTimer(){
        clearInterval(this.timer);
    }

    resetTimer(id,count){
        let timer = document.getElementById(id);
        timer.innerText = count;
        this.isTimeUp = false;
        if(this.timer!==null)
            clearInterval(this.timer);
        this.timer = setInterval(()=>{
            timer.innerText = --count;
            if(count <= 0){
                this.isTimeUp = true;
                clearInterval(this.timer);
            }
        },1000);
    }
}