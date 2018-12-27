
class Asteroid {
    constructor(pos, speed, size) {
        this.pos = pos;
        this.speed = speed;
        this.size = size; 
    }

    get type() {
        return "asteroid";
    }

    static create(pos) {
        let size = new Vec(Math.ceil(Math.random() * 2),
                            Math.ceil(Math.random() * 2));
        return new Asteroid(pos, new Vec(-2, 0), size);
    }
}

Asteroid.prototype.update = function(time, state) {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
        return new Asteroid(newPos, this.speed, this.size);
    }
}

Asteroid.prototype.collide = function(state) {
    return new State(state.level, state.actors, 0, "lost");
}