const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
W = window.innerWidth;
H = window.innerHeight;

let bille = {
    x: 100,
    y: 100,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    radius: 10
};

setSize();
window.addEventListener("resize", setSize);

function setSize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
}


function update() {
    draw();
    bille.vy += bille.ay;
    bille.vx += bille.ax;

    bille.vx *= 0.98;
    bille.vy *= 0.98;

    bille.y += bille.vy;
    bille.x += bille.vx;

    if (bille.x > W) { bille.x = W; }
    if (bille.x < 0) { bille.x = 0; }
    if (bille.y > H) { bille.y = H; }
    if (bille.y < 0) { bille.y = 0; }

    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath()
    ctx.arc(bille.x, bille.y, bille.radius, 0, Math.PI * 2)
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function handleClick() {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
        // The API requires permission — request it
        Promise.all([
            DeviceMotionEvent.requestPermission(),
            DeviceOrientationEvent.requestPermission(),
        ]).then(([motionPermission, orientationPermission]) => {
            if (
                motionPermission === "granted" &&
                orientationPermission === "granted"
            ) {
                window.addEventListener("devicemotion", handleMotion);
                window.addEventListener("deviceorientation", handleOrientation);
            }
        });
    } else {
        // No permission needed, add event listeners directly
        window.addEventListener("devicemotion", handleMotion);
        window.addEventListener("deviceorientation", handleOrientation);
    }
}

window.addEventListener("deviceorientation", (event) => {
    bille.ax = event.gamma * 0.1;
    bille.ay = event.beta * 0.1;
});

update();