
class Missile {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
    }

    get type() {
        return "missile";
    }

    static create(pos) {
        return new Missile(pos, new Vec(5, 0));
    }
}

Missile.prototype.update = function(time, state) {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
        return new Missile(newPos, this.speed, this.size);
    }
}

Missile.prototype.collide = function(state) {
    return new State(state.level, state.actors, 0, "lost");
}

Missile.prototype.size = new Vec(0.6, 0.2);