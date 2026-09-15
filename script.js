body {
    background-color: #e5e5e5;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    overflow: hidden;
}

.app-container {
    text-align: center;
}

.wheel-container {
    position: relative;
    width: 350px;
    height: 350px;
    margin: 0 auto 30px;
    border-radius: 50%;
    background-color: #333;
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
}

.wheel {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.slice {
    position: absolute;
    top: 0;
    left: 50%;
    width: 80px;
    height: 50%;
    margin-left: -40px; /* Metade da largura para centralizar perfeitamente */
    transform-origin: bottom center;
}

/* Posicionamento exato para criar anéis perfeitos */
.major, .minor, .dim {
    position: absolute;
    width: 100%;
    text-align: center;
    color: white;
}

.major { top: 20px; font-size: 24px; font-weight: bold; }
.minor { top: 75px; font-size: 16px; color: #ccc; }
.dim { top: 120px; font-size: 13px; color: #999; }

.mask {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    border-radius: 50%;
    pointer-events: none;
    background: conic-gradient(from -45deg, transparent 0deg, transparent 90deg, #84939f 90deg, #84939f 360deg);
    z-index: 10;
}

.labels {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none;
    z-index: 15;
    font-family: 'Georgia', serif; /* Dá um toque clássico parecido com a impressão da foto */
    font-weight: bold;
    color: #1a1a1a;
}

/* Alinhamento dos graus em volta da janela transparente */
.deg-iv { position: absolute; top: 40px; left: 45px; font-size: 18px; }
.deg-v { position: absolute; top: 40px; right: 45px; font-size: 18px; }
.deg-ii { position: absolute; top: 90px; left: 95px; font-size: 15px; }
.deg-iii { position: absolute; top: 90px; right: 95px; font-size: 15px; }
.deg-vi-vii { position: absolute; top: 135px; left: 50%; transform: translateX(-50%); font-size: 16px; }

.instruction {
    color: #555;
    font-size: 14px;
    letter-spacing: 0.5px;
}
