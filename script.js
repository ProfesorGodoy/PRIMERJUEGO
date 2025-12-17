const auto = document.getElementById("auto");
const juego = document.getElementById("juego");
const gameOverPantalla = document.getElementById("gameOver");

let jugando = true;
let intervalObstaculos;

// mover auto
document.addEventListener("keydown", (e) => {
    if (!jugando) return;

    const autoLeft = auto.offsetLeft;

    if (e.key === "ArrowLeft" && autoLeft > 0) {
        auto.style.left = autoLeft - 50 + "px";
    }

    if (e.key === "ArrowRight" && autoLeft < 250) {
        auto.style.left = autoLeft + 50 + "px";
    }
});

// crear obstáculo
function crearObstaculo() {
    if (!jugando) return;

    const obs = document.createElement("div");
    obs.classList.add("obstaculo");
    obs.style.left = Math.floor(Math.random() * 6) * 50 + "px";
    obs.style.top = "-100px";
    juego.appendChild(obs);

    const mover = setInterval(() => {
        if (!jugando) {
            clearInterval(mover);
            return;
        }

        obs.style.top = obs.offsetTop + 5 + "px";

        // 🟥 COLISIÓN REAL (RECTÁNGULOS)
        const autoRect = auto.getBoundingClientRect();
        const obsRect = obs.getBoundingClientRect();

        if (
            autoRect.left < obsRect.right &&
            autoRect.right > obsRect.left &&
            autoRect.top < obsRect.bottom &&
            autoRect.bottom > obsRect.top
        ) {
            terminarJuego();
        }

        if (obs.offsetTop > 500) {
            clearInterval(mover);
            obs.remove();
        }
    }, 30);
}

function terminarJuego() {
    if (!jugando) return;

    jugando = false;
    clearInterval(intervalObstaculos);
    gameOverPantalla.style.display = "block";
}

function reiniciarJuego() {
    document.querySelectorAll(".obstaculo").forEach(o => o.remove());

    auto.style.left = "125px";
    jugando = true;
    gameOverPantalla.style.display = "none";

    intervalObstaculos = setInterval(crearObstaculo, 1500);
}

// iniciar juego
intervalObstaculos = setInterval(crearObstaculo, 1500);
