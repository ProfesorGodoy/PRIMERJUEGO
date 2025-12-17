body {
    background: #222;
    color: white;
    text-align: center;
    font-family: Arial;
}

#juego {
    position: relative;
    width: 300px;
    height: 500px;
    background: gray;
    margin: auto;
    overflow: hidden;
}

#auto {
    position: absolute;
    width: 50px;
    height: 80px;
    background: red;
    bottom: 20px;
    left: 125px;
}

.obstaculo {
    position: absolute;
    width: 50px;
    height: 80px;
    background: black;
    top: -100px;
}

#gameOver {
    display: none;
    margin-top: 20px;
}

#gameOver button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}

/* CONTROLES CELULAR */
#controles {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 20px;
}

#controles button {
    flex: 1;
    max-width: 150px;
    padding: 30px 0;
    font-size: 40px;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    background-color: #ff5722;
    color: white;
    user-select: none;
}
