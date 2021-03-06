
class Player {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
    }
    get type() {
        return "player";
    }
    static create(pos) {
        return new Player(pos.plus(new Vec(0, 0.2)),
                            new Vec(0, 0));
    }
}

Player.prototype.size = new Vec(1.5, 0.8);

const playerXSpeed = 9;
const playerYSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

Player.prototype.update = function(time, state, keys) {
    let xSpeed = 0;
    if (keys.ArrowLeft) xSpeed -= playerXSpeed;
    if (keys.ArrowRight) xSpeed += playerXSpeed;
    let pos = this.pos;
    let movedX = pos.plus(new Vec(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, "wall")) {
        pos = movedX;
    }

    let ySpeed = 0;
    if (keys.ArrowUp) ySpeed -= playerYSpeed;
    if (keys.ArrowDown) ySpeed += playerYSpeed;
    //pos = this.pos;
    let movedY = pos.plus(new Vec(0, ySpeed * time));
    if (!state.level.touches(movedX, this.size, "wall")) {
        pos = movedY;
    }
    return new Player(pos, new Vec(xSpeed, ySpeed));
}