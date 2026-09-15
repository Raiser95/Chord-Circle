// Lista completa com acordes e a casa exata para iniciar a pentatônica
const harmonicFields = [
    { key: 'C',  iv: 'F',  i: 'C',  v: 'G',  ii: 'Dm',  vi: 'Am',  iii: 'Em',  vii: 'B°',  pentaMaior: 8, pentaMenor: 5 },
    { key: 'G',  iv: 'C',  i: 'G',  v: 'D',  ii: 'Am',  vi: 'Em',  iii: 'Bm',  vii: 'F#°', pentaMaior: 3, pentaMenor: 12 },
    { key: 'D',  iv: 'G',  i: 'D',  v: 'A',  ii: 'Em',  vi: 'Bm',  iii: 'F#m', vii: 'C#°', pentaMaior: 10, pentaMenor: 7 },
    { key: 'A',  iv: 'D',  i: 'A',  v: 'E',  ii: 'Bm',  vi: 'F#m', iii: 'C#m', vii: 'G#°', pentaMaior: 5, pentaMenor: 2 },
    { key: 'E',  iv: 'A',  i: 'E',  v: 'B',  ii: 'F#m', vi: 'C#m', iii: 'G#m', vii: 'D#°', pentaMaior: 12, pentaMenor: 9 },
    { key: 'B',  iv: 'E',  i: 'B',  v: 'F#', ii: 'C#m', vi: 'G#m', iii: 'D#m', vii: 'A#°', pentaMaior: 7, pentaMenor: 4 },
    { key: 'F#', iv: 'B',  i: 'F#', v: 'C#', ii: 'G#m', vi: 'D#m', iii: 'A#m', vii: 'E#°', pentaMaior: 2, pentaMenor: 11 },
    { key: 'Db', iv: 'Gb', i: 'Db', v: 'Ab', ii: 'Ebm', vi: 'Bbm', iii: 'Fm',  vii: 'C°',  pentaMaior: 9, pentaMenor: 6 },
    { key: 'Ab', iv: 'Db', i: 'Ab', v: 'Eb', ii: 'Bbm', vi: 'Fm',  iii: 'Cm',  vii: 'G°',  pentaMaior: 4, pentaMenor: 1 },
    { key: 'Eb', iv: 'Ab', i: 'Eb', v: 'Bb', ii: 'Fm',  vi: 'Cm',  iii: 'Gm',  vii: 'D°',  pentaMaior: 11, pentaMenor: 8 },
    { key: 'Bb', iv: 'Eb', i: 'Bb', v: 'F',  ii: 'Cm',  vi: 'Gm',  iii: 'Dm',  vii: 'A°',  pentaMaior: 6, pentaMenor: 3 },
    { key: 'F',  iv: 'Bb', i: 'F',  v: 'C',  ii: 'Gm',  vi: 'Dm',  iii: 'Am',  vii: 'E°',  pentaMaior: 1, pentaMenor: 10 }
];

let currentIndex = 0; 

function updateUI() {
    const field = harmonicFields[currentIndex];
    
    // Atualiza Campo Harmônico
    document.getElementById('current-key').textContent = `Tom: ${field.key}`;
    document.querySelector('#box-iv .chord').textContent = field.iv;
    document.querySelector('#box-i .chord').textContent = field.i;
    document.querySelector('#box-v .chord').textContent = field.v;
    document.querySelector('#box-ii .chord').textContent = field.ii;
    document.querySelector('#box-vi .chord').textContent = field.vi;
    document.querySelector('#box-iii .chord').textContent = field.iii;
    document.querySelector('#box-vii .chord').textContent = field.vii;

    // Atualiza Casas da Pentatônica
    document.getElementById('penta-major-title').textContent = `Maior (${field.i}) - Casa ${field.pentaMaior}`;
    document.getElementById('penta-minor-title').textContent = `Menor (${field.vi}) - Casa ${field.pentaMenor}`;
}

// Troca de tom com as setas
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % harmonicFields.length;
        updateUI();
    } else if (event.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + harmonicFields.length) % harmonicFields.length;
        updateUI();
    }
});

// Lógica do Botão Modo Escuro
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if(document.body.classList.contains('dark-theme')) {
        themeToggle.textContent = '☀️ Modo Claro';
    } else {
        themeToggle.textContent = '🌙 Modo Escuro';
    }
});

updateUI();
