const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let ball = { x: 100, y: 150, vx: 0, vy: 0 };
let hole = { x: 550, y: 150 };
let dragging = false;
let power = { x: 0, y: 0 };

canvas.addEventListener("mousedown", () => {
    dragging = true;
});

canvas.addEventListener("mouseup", () => {
    if (dragging) {
        ball.vx = power.x * -0.1;
        ball.vy = power.y * -0.1;
        dragging = false;
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (dragging) {
        let rect = canvas.getBoundingClientRect();
        power.x = e.clientX - rect.left - ball.x;
        power.y = e.clientY - rect.top - ball.y;
    }
});

function update() {
    ball.x += ball.vx;
    ball.y += ball.vy;

    ball.vx *= 0.98;
    ball.vy *= 0.98;

    if (Math.abs(ball.vx) < 0.01) ball.vx = 0;
    if (Math.abs(ball.vy) < 0.01) ball.vy = 0;

    if (ball.x < 0 || ball.x > canvas.width) ball.vx *= -1;
    if (ball.y < 0 || ball.y > canvas.height) ball.vy *= -1;

    let dx = ball.x - hole.x;
    let dy = ball.y - hole.y;
    if (Math.sqrt(dx*dx + dy*dy) < 10) {
        alert("🎉 Hole in one!");
        resetGame();
    }
}

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.beginPath();
    ctx.arc(hole.x, hole.y, 10, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 8, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();

    if (dragging) {
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(ball.x + power.x, ball.y + power.y);
        ctx.strokeStyle = "red";
        ctx.stroke();
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

function resetGame() {
    ball.x = 100;
    ball.y = 150;
    ball.vx = 0;
    ball.vy = 0;
}

loop();
