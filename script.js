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

#controles {
    margin-top: 10px;
}

#controles button {
    padding: 15px 30px;
    font-size: 20px;
    margin: 5px;
    cursor: pointer;
}
