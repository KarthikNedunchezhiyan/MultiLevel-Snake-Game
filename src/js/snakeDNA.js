class SnakeDNA {
    constructor(speed=10, xPos = 0, yPos = 0, xDir = 1, yDir = 0, scale = 10) {
        this.speed = new Vector(speed, speed);
        this.position = [new Vector(xPos, yPos)];
        this.direction = new Vector(xDir, yDir);
        this.velocity = new Vector(0, 0);
        this.scale = scale;
        this.environment = null;
        this.score = 0;
        this.lives = 0;
        this.reset();
    }

    reset(){
        this.isWon = false;
        this.addScore(-this.score);
        this.addLife(-this.lives);
        this.tailCount = 1;
        this.position.splice(1,this.position.length);
    }

    addScore(count){
        this.score+=count;
        __("__score").innerText = this.score;
    }

    addLife(count){
        this.lives+=count;
        __("__lives").innerText = this.lives;
    }

    addTail(tailCount=1){
        for(let i=0;i<tailCount;i++){
            this.position.push(new Vector(-this.scale,-this.scale));
            this.tailCount++;
        }
    }

    setEnvironment(environment) {
        this.environment = environment;
    }

    switchDirection(xDir, yDir) {
        if((this.direction.x + xDir) === 0 && (this.direction.y + yDir) === 0)
            return;
        this.direction = new Vector(xDir, yDir);
    }

    render() {
        this.velocity = Vector.multiply(this.speed, this.direction);
    }

    update() {
        let pos = this.position[this.tailCount-1];
        pos.copy(this.position[0]);
        pos.add(this.velocity);
        let envS = this.environment.size;

        pos.x = (pos.x > envS.x) ? 0 : ((pos.x + this.scale) < 0) ? envS.x : pos.x;
        pos.y = (pos.y > envS.y) ? 0 : ((pos.y + this.scale) < 0) ? envS.y : pos.y;
        this.position.unshift(this.position.splice(this.tailCount-1,1)[0]);
    }

    show() {
        for(let i=0;i<this.tailCount;i++){
            let pos = this.position[i];
            if(i===0){
                fill(255,255,0);
            }
            rect(pos.x, pos.y, this.scale, this.scale);
            fill(255);
        }
    }

    gameLoop() {
        this.render();
        this.update();
        this.show();
    }
}