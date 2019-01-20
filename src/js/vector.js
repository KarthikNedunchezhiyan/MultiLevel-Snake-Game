class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    add(vector){
        this.x+=vector.x;
        this.y+=vector.y;
    }

    copy(vector){
        this.x = vector.x;
        this.y = vector.y;
    }

    static multiply(vector1,vector2){
        return new Vector(vector1.x*vector2.x,vector1.y*vector2.y);
    }
}