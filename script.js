document.addEventListener("DOMContentLoaded", () => {
    const objetivo = document.getElementById("objetivo");
    const juego = document.getElementById("juego");
    const puntajeDiv = document.getElementById("puntaje");
    const cronometroDiv = document.getElementById("cronometro");
    const gameOverPantalla = document.getElementById("gameOver");
    const finalPuntaje = document.getElementById("finalPuntaje");

    const sonidoGlobo = document.getElementById("sonidoGlobo");
    const sonidoCombo = document.getElementById("sonidoCombo");
    const sonidoNivel = document.getElementById("sonidoNivel");

    const confetiCanvas = document.getElementById("confetiCanvas");
    const ctx = confetiCanvas.getContext("2d");

    let puntaje = 0;
    let jugando = true;
    let tiempoJuego = 30;
    let timer;
    let velocidad = 500; // ms entre movimientos
    let moverInterval;
    let particulas = [];

    // Ajustar canvas
    confetiCanvas.width = juego.clientWidth;
    confetiCanvas.height = juego.clientHeight;

    // ---------------- Partículas Confeti ----------------
    function crearConfeti(x, y) {
        for (let i = 0; i < 25; i++) {
            particulas.push({
                x: x,
                y: y,
                r: Math.random() * 4 + 2,
                dx: (Math.random() - 0.5) * 6,
                dy: (Math.random() - 3) * 6,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                life: 60
            });
        }
    }

    function dibujarConfeti() {
        ctx.clearRect(0, 0, confetiCanvas.width, confetiCanvas.height);
        for (let i = particulas.length - 1; i >= 0; i--) {
            const p = particulas[i];
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            p.dy += 0.2; // gravedad
            p.life--;
            if (p.life <= 0) particulas.splice(i, 1);
        }
        requestAnimationFrame(dibujarConfeti);
    }
    dibujarConfeti();

    // ---------------- Puntaje flotante ----------------
    function crearPuntajeFlotante(x, y, texto) {
        const span = document.createElement("div");
        span.className = "puntajeFlotante";
        span.style.left = x + "px";
        span.style.top = y + "px";
        span.textContent = texto;
        juego.appendChild(span);
        let opacidad = 1;
        let arriba = 0;
        const anim = setInterval(() => {
            arriba -= 1;
            opacidad -= 0.03;
            span.style.top = y + arriba + "px";
            span.style.opacity = opacidad;
            if (opacidad <= 0) {
                clearInterval(anim);
                span.remove();
            }
        }, 16);
    }

    // ---------------- Mover objetivo ----------------
    function moverObjetivo() {
        if (!jugando) return;
        const maxX = juego.clientWidth - 50;
        const maxY = juego.clientHeight - 50;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        objetivo.style.left = randomX + "px";
        objetivo.style.top = randomY + "px";
        objetivo.style.backgroundColor = `hsl(${Math.random()*360}, 80%, 60%)`;
        const size = Math.floor(Math.random()*30) + 40;
        objetivo.style.width = size + "px";
        objetivo.style.height = size + "px";
        objetivo.style.transform = "scale(1.2)";
        setTimeout(()=>{ objetivo.style.transform = "scale(1)"; }, 100);
    }

    // ---------------- Click en globo ----------------
    objetivo.addEventListener("click", () => {
        if (!jugando) return;
        puntaje++;
        puntajeDiv.textContent = "Puntaje: " + puntaje;

        // Sonidos
        sonidoGlobo.currentTime = 0; sonidoGlobo.play().catch(()=>{});
        if (puntaje % 5 === 0) { sonidoCombo.currentTime = 0; sonidoCombo.play().catch(()=>{});}
        if (puntaje % 15 === 0) { sonidoNivel.currentTime = 0; sonidoNivel.play().catch(()=>{});}

        // Confeti
        const x = objetivo.offsetLeft + objetivo.offsetWidth/2;
        const y = objetivo.offsetTop + objetivo.offsetHeight/2;
        crearConfeti(x, y);

        // Puntaje flotante
        crearPuntajeFlotante(x, y, "+1");

        // Velocidad progresiva
        if (velocidad > 200 && puntaje % 5 === 0) {
            velocidad -= 40;
            clearInterval(moverInterval);
            iniciarMovimiento();
        }

        moverObjetivo();
    });

    function iniciarMovimiento() {
        moverInterval = setInterval(moverObjetivo, velocidad);
    }

    // ---------------- Iniciar juego ----------------
    function iniciarJuego() {
        puntaje = 0;
        velocidad = 500;
        jugando = true;
        puntajeDiv.textContent = "Puntaje: 0";
        gameOverPantalla.style.display = "none";

        let tiempoRestante = tiempoJuego;
        cronometroDiv.textContent = `Tiempo: ${tiempoRestante}s`;

        clearInterval(timer);
        clearInterval(moverInterval);

        timer = setInterval(() => {
            tiempoRestante--;
            cronometroDiv.textContent = `Tiempo: ${tiempoRestante}s`;
            if (tiempoRestante <= 0) terminarJuego();
        }, 1000);

        iniciarMovimiento();
    }

    function terminarJuego() {
        jugando = false;
        clearInterval(timer);
        clearInterval(moverInterval);
        finalPuntaje.textContent = puntaje;
        gameOverPantalla.style.display = "block";
    }

    window.reiniciarJuego = function() { iniciarJuego(); }

    iniciarJuego();
});
