// O "Cérebro" dos acordes. 'x' = não toca, 0 = corda solta, número = casa
// Ordem das cordas: [E grave, A, D, G, B, e agudo]
const shapesDicionario = {
    'C': ['x', 3, 2, 0, 1, 0], 'G': [3, 2, 0, 0, 0, 3], 'D': ['x', 'x', 0, 2, 3, 2],
    'A': ['x', 0, 2, 2, 2, 0], 'E': [0, 2, 2, 1, 0, 0], 'B': ['x', 2, 4, 4, 4, 2],
    'F#': [2, 4, 4, 3, 2, 2], 'Gb': [2, 4, 4, 3, 2, 2], 'Db': ['x', 4, 6, 6, 6, 4],
    'Ab': [4, 6, 6, 5, 4, 4], 'Eb': ['x', 6, 8, 8, 8, 6], 'Bb': ['x', 1, 3, 3, 3, 1], 'F': [1, 3, 3, 2, 1, 1],
    'Dm': ['x', 'x', 0, 2, 3, 1], 'Am': ['x', 0, 2, 2, 1, 0], 'Em': [0, 2, 2, 0, 0, 0],
    'Bm': ['x', 2, 4, 4, 3, 2], 'F#m': [2, 4, 4, 2, 2, 2], 'C#m': ['x', 4, 6, 6, 5, 4],
    'G#m': [4, 6, 6, 4, 4, 4], 'Ebm': ['x', 6, 8, 8, 7, 6], 'Bbm': ['x', 1, 3, 3, 2, 1],
    'Fm': [1, 3, 3, 1, 1, 1], 'Cm': ['x', 3, 5, 5, 4, 3], 'Gm': [3, 5, 5, 3, 3, 3],
    'D#m': ['x', 6, 8, 8, 7, 6], 'A#m': ['x', 1, 3, 3, 2, 1],
    // Diminutos (usando shape m7b5 - Diatônico e altamente usável)
    'B°': ['x', 2, 3, 2, 3, 'x'], 'F#°': [2, 'x', 2, 2, 1, 'x'], 'C#°': ['x', 4, 5, 4, 5, 'x'],
    'G#°': [4, 'x', 4, 4, 3, 'x'], 'D#°': ['x', 6, 7, 6, 7, 'x'], 'A#°': [6, 'x', 6, 6, 5, 'x'],
    'E#°': ['x', 8, 9, 8, 9, 'x'], 'C°': ['x', 3, 4, 3, 4, 'x'], 'G°': [3, 'x', 3, 3, 2, 'x'],
    'D°': ['x', 5, 6, 5, 6, 'x'], 'A°': [5, 'x', 5, 5, 4, 'x'], 'E°': ['x', 7, 8, 7, 8, 'x']
};

const harmonicFields = [
    { key: 'C', iv: 'F', i: 'C', v: 'G', ii: 'Dm', vi: 'Am', iii: 'Em', vii: 'B°', pentaMaior: 8, pentaMenor: 5 },
    { key: 'G', iv: 'C', i: 'G', v: 'D', ii: 'Am', vi: 'Em', iii: 'Bm', vii: 'F#°', pentaMaior: 3, pentaMenor: 12 },
    { key: 'D', iv: 'G', i: 'D', v: 'A', ii: 'Em', vi: 'Bm', iii: 'F#m', vii: 'C#°', pentaMaior: 10, pentaMenor: 7 },
    { key: 'A', iv: 'D', i: 'A', v: 'E', ii: 'Bm', vi: 'F#m', iii: 'C#m', vii: 'G#°', pentaMaior: 5, pentaMenor: 2 },
    { key: 'E', iv: 'A', i: 'E', v: 'B', ii: 'F#m', vi: 'C#m', iii: 'G#m', vii: 'D#°', pentaMaior: 12, pentaMenor: 9 },
    { key: 'B', iv: 'E', i: 'B', v: 'F#', ii: 'C#m', vi: 'G#m', iii: 'D#m', vii: 'A#°', pentaMaior: 7, pentaMenor: 4 },
    { key: 'F#', iv: 'B', i: 'F#', v: 'C#', ii: 'G#m', vi: 'D#m', iii: 'A#m', vii: 'E#°', pentaMaior: 2, pentaMenor: 11 },
    { key: 'Db', iv: 'Gb', i: 'Db', v: 'Ab', ii: 'Ebm', vi: 'Bbm', iii: 'Fm', vii: 'C°', pentaMaior: 9, pentaMenor: 6 },
    { key: 'Ab', iv: 'Db', i: 'Ab', v: 'Eb', ii: 'Bbm', vi: 'Fm', iii: 'Cm', vii: 'G°', pentaMaior: 4, pentaMenor: 1 },
    { key: 'Eb', iv: 'Ab', i: 'Eb', v: 'Bb', ii: 'Fm', vi: 'Cm', iii: 'Gm', vii: 'D°', pentaMaior: 11, pentaMenor: 8 },
    { key: 'Bb', iv: 'Eb', i: 'Bb', v: 'F', ii: 'Cm', vi: 'Gm', iii: 'Dm', vii: 'A°', pentaMaior: 6, pentaMenor: 3 },
    { key: 'F', iv: 'Bb', i: 'F', v: 'C', ii: 'Gm', vi: 'Dm', iii: 'Am', vii: 'E°', pentaMaior: 1, pentaMenor: 10 }
];

let currentIndex = 0; 
const tooltip = document.getElementById('chord-tooltip');

function updateUI() {
    const field = harmonicFields[currentIndex];
    document.getElementById('current-key').textContent = `Tom: ${field.key}`;
    document.querySelector('#box-iv .chord').textContent = field.iv;
    document.querySelector('#box-i .chord').textContent = field.i;
    document.querySelector('#box-v .chord').textContent = field.v;
    document.querySelector('#box-ii .chord').textContent = field.ii;
    document.querySelector('#box-vi .chord').textContent = field.vi;
    document.querySelector('#box-iii .chord').textContent = field.iii;
    document.querySelector('#box-vii .chord').textContent = field.vii;
    document.getElementById('penta-major-title').textContent = `Maior (${field.i}) - Casa ${field.pentaMaior}`;
    document.getElementById('penta-minor-title').textContent = `Menor (${field.vi}) - Casa ${field.pentaMenor}`;
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % harmonicFields.length; updateUI(); } 
    else if (event.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + harmonicFields.length) % harmonicFields.length; updateUI(); }
});

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️ Modo Claro' : '🌙 Modo Escuro';
});

// === LÓGICA DO BALÃOZINHO ===
document.querySelectorAll('.chord-box').forEach(box => {
    box.addEventListener('mouseenter', (e) => {
        const chordName = box.querySelector('.chord').textContent;
        const shape = shapesDicionario[chordName];
        if(!shape) return;

        document.getElementById('tt-name').textContent = chordName;
        
        // Define qual casa mostrar
        const frets = shape.filter(s => s !== 'x' && s !== 0);
        const minFret = frets.length > 0 ? Math.min(...frets) : 1;
        const maxFret = frets.length > 0 ? Math.max(...frets) : 4;
        const startFret = maxFret > 4 ? minFret : 1;

        document.getElementById('tt-fret').textContent = startFret > 1 ? `${startFret}ª Casa` : '';

        // Limpa desenhos antigos
        const markers = document.getElementById('tt-markers');
        const dotsContainer = document.getElementById('tt-dots');
        markers.innerHTML = ''; dotsContainer.innerHTML = '';

        // Desenha corda por corda
        shape.forEach((fret, index) => {
            const leftPos = index * 20; // 0, 20, 40, 60, 80, 100%
            const markerSpan = document.createElement('span');
            markerSpan.style.width = '14px'; markerSpan.style.textAlign = 'center';

            if (fret === 'x') {
                markerSpan.textContent = 'X';
            } else if (fret === 0) {
                markerSpan.textContent = 'O';
            } else {
                // Posiciona a bolinha no espaço correto
                const dot = document.createElement('div');
                dot.className = 'chord-dot';
                dot.style.left = `${leftPos}%`;
                // Cálculo para centralizar a bolinha entre os trastes (cada traste tem 25% de altura)
                const relativeFret = fret - startFret;
                dot.style.top = `${(relativeFret * 25) + 12.5}%`; 
                dotsContainer.appendChild(dot);
            }
            markers.appendChild(markerSpan);
        });

        tooltip.classList.remove('hidden');
    });

    box.addEventListener('mousemove', (e) => {
        // O balão segue o mouse. Os +15 dão um pequeno espaço para não cobrir a seta
        tooltip.style.left = `${e.pageX + 15}px`;
        tooltip.style.top = `${e.pageY + 15}px`;
    });

    box.addEventListener('mouseleave', () => {
        tooltip.classList.add('hidden');
    });
});

updateUI();
