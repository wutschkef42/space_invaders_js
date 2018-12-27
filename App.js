
function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
        if (keys.includes(event.key)) {
            down[event.key] = event.type == "keydown";
            event.preventDefault();
        }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    return down;
}

function shootMissile() {
    
    let shoot = Object.create(null);
    function track(event) {
        if (event.key == "x") {
            shoot[event.key] = true;
            event.preventDefault(); 
        }
    }
    window.addEventListener("keypress", track);
    return shoot;
    
}

var arrowKeys =
trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);

var shootKey = shootMissile();

function runAnimation(frameFunc) {
    let lastTime = null;
    function frame(time) {
        if (lastTime != null) {
        let timeStep = Math.min(time - lastTime, 100) / 1000;
        if (frameFunc(timeStep) === false) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}



function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    setInterval(() => state = state.spawnAsteroid(), 500);
    return new Promise(resolve => {
        runAnimation(time => {
            state = state.update(time, arrowKeys, shootKey);
            display.syncState(state);
            if (state.status == "playing") {
                return true;
            } else if (ending > 0) {
                ending -= time;
                return true;
            } else {
                display.clear();
                resolve(state.status);
                return false;
            }
        });
    });
}
  
async function runGame(Display) {
    while (1) {
    let status = await runLevel(simpleLevel,
                                Display);
    }
}