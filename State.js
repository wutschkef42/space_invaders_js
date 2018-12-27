
class State {
    constructor (level, actors, score, status) {
        this.level = level;
        this.actors = actors;
        this.score = score;
        this.status = status;
    }

    static start(level) {
        return new State(level, level.startActors, 0, "playing");
    }

    get player() {
        return this.actors.find(a => a.type == "player");
    }
}

State.prototype.update = function(time, keys, shootKey) {
    let actors = this.actors
        .map(actor => actor.update(time, this, keys)).filter(a => a);
    let newState = new State(this.level, actors, 0, this.status);

    if (newState.status != "playing") return newState;

    let player = newState.player;
    if (this.level.touches(player.pos, player.size, "wall")) {
        return new State(this.level, actors, 0, "lost");
    }
    for (let actor1 of actors) {
        for (let actor2 of actors) {
            if (actor1.type == "asteroid" && actor2.type == "missile" && overlap(actor1, actor2)) {
                let filtered = actors.filter(a => a != actor1 && a != actor2);
                  console.log(filtered);
                return (new State(this.level, filtered, 0, this.status));
            }
        }
    }
    for (let actor of actors) {
        if (actor != player && overlap(actor, player)) {
            newState = actor.collide(newState);
        }
    }
    if (shootKey.x) {
        console.log("fzefzef")
        console.log(player)
        actors = immutablePush(this.actors, new Missile(player.pos.plus(new Vec(2, 0)), new Vec(5, 0)));
        newState = new State(this.level, actors, 0, this.status);
        shootKey.x = false;
    }
    return newState;
}

State.prototype.spawnAsteroid = function() {
    console.log(this.level.width);
    console.log(this.level.height);
    let pos = new Vec(this.level.width - 1, 
                        1 + Math.floor(Math.random() * this.level.height));
    let speed =  new Vec(-5, 0);
    let size = new Vec(Math.ceil(Math.random() * 2),
                            Math.ceil(Math.random() * 2));
    let actors = immutablePush(this.actors,
                                new Asteroid(pos, speed, size));
    let newState = new State(this.level, actors, 0, this.status);
    return newState;
}   

function overlap(actor1, actor2) {
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
           actor1.pos.x < actor2.pos.x + actor2.size.x &&
           actor1.pos.y + actor1.size.y > actor2.pos.y &&
           actor1.pos.y < actor2.pos.y + actor2.size.y;
}

function immutablePush(arr, newEntry) {
    return [ ...arr, newEntry ];      
}