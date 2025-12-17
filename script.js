document.addEventListener("DOMContentLoaded", () => {
    const objetivo = document.getElementById("objetivo");
    const juego = document.getElementById("juego");
    const puntajeDiv = document.getElementById("puntaje");
    const cronometroDiv = document.getElementById("cronometro");
    const gameOverPantalla = document.getElementById("gameOver");
    const finalPuntaje = document.getElementById("finalPuntaje");
    const sonidoGlobo = document.getElementById("sonidoGlobo");

    let puntaje = 0;
    let jugando = true;
    let tiempoJuego = 30; // segundos
    let timer;

    // FUNCION QUE MUEVE EL OBJETIVO Y CAMBIA COLOR/TAMAÑO
    function moverObjetivo() {
        if (!jugando) return;

        const maxX = juego.clientWidth - 50;
        const maxY = juego.clientHeight - 50;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        objetivo.style.left = randomX + "px";
        objetivo.style.top = randomY + "px";

        // Cambiar color aleatorio
        const randomColor = `hsl(${Math.floor(Math.random()*360)}, 80%, 60%)`;
        objetivo.style.backgroundColor = randomColor;

        // Cambiar tamaño aleatorio
        const size = Math.floor(Math.random() * 30) + 40; // entre 40 y 70px
        objetivo.style.width = size + "px";
        objetivo.style.height = size + "px";

        // Animación pop
        objetivo.style.transform = "scale(1.2)";
        setTimeout(() => { objetivo.style.transform = "scale(1)"; }, 100);
    }

    // CUANDO SE CLICKEA EL OBJETIVO
    objetivo.addEventListener("click", () => {
        if (!jugando) return;

        puntaje++;
        puntajeDiv.textContent = "Puntaje: " + puntaje;

        // reproducir sonido en click/tap
        sonidoGlobo.currentTime = 0;
        sonidoGlobo.play().catch(e => { /* evitar error si autoplay bloqueado */ });

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
        cronometroDiv.textContent = `Tiempo: ${tiempoRestante}s`;

        timer = setInterval(() => {
            tiempoRestante--;
            cronometroDiv.textContent = `Tiempo: ${tiempoRestante}s`;
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
