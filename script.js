document.addEventListener("DOMContentLoaded", () => {
    const objetivo = document.getElementById("objetivo");
    const juego = document.getElementById("juego");
    const puntajeDiv = document.getElementById("puntaje");
    const gameOverPantalla = document.getElementById("gameOver");
    const finalPuntaje = document.getElementById("finalPuntaje");

    let puntaje = 0;
    let jugando = true;
    let tiempoJuego = 30; // segundos
    let timer;

    // FUNCION QUE MUEVE EL OBJETIVO
    function moverObjetivo() {
        if (!jugando) return;

        const maxX = juego.clientWidth - 50;
        const maxY = juego.clientHeight - 50;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        objetivo.style.left = randomX + "px";
        objetivo.style.top = randomY + "px";

        // Animación de “pop”
        objetivo.style.transform = "scale(1.2)";
        setTimeout(() => { objetivo.style.transform = "scale(1)"; }, 100);
    }

    // CUANDO SE CLICKEA EL OBJETIVO
    objetivo.addEventListener("click", () => {
        if (!jugando) return;

        puntaje++;
        puntajeDiv.textContent = "Puntaje: " + puntaje;
        moverObjetivo();
    });

    // INICIAR TEMPORIZADOR
    function iniciarJuego() {
        puntaje = 0;
        jugando = true;
        puntajeDiv.textContent = "Puntaje: 0";
        gameOverPantalla.style.display = "none";
        moverObjetivo();

        let tiempoRestante = tiempoJuego;
        timer = setInterval(() => {
            tiempoRestante--;
            if (tiempoRestante <= 0) {
                terminarJuego();
            }
        }, 1000);
    }

    // TERMINAR JUEGO
    function terminarJuego() {
        jugando = false;
        clearInterval(timer);
        finalPuntaje.textContent = puntaje;
        gameOverPantalla.style.display = "block";
    }

    // REINICIAR JUEGO
    window.reiniciarJuego = function() {
        iniciarJuego();
    }

    // INICIAR AUTOMÁTICAMENTE
    iniciarJuego();
});
