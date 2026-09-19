/**
 * Chord Circle - Motor de Harmonia, Pentatônicas e Síntese de Áudio
 */

// ==========================================================================
// 1. DICIONÁRIO DE ACORDES & CAMPOS HARMÔNICOS
// 'x' = corda muda, 0 = corda solta, número = casa
// Ordem das cordas: [6ª (E grave), 5ª (A), 4ª (D), 3ª (G), 2ª (B), 1ª (e agudo)]
// ==========================================================================
const shapesDicionario = {
    // Acordes Maiores
    'C': ['x', 3, 2, 0, 1, 0],
    'G': [3, 2, 0, 0, 0, 3],
    'D': ['x', 'x', 0, 2, 3, 2],
    'A': ['x', 0, 2, 2, 2, 0],
    'E': [0, 2, 2, 1, 0, 0],
    'B': ['x', 2, 4, 4, 4, 2],
    'F#': [2, 4, 4, 3, 2, 2],
    'Gb': [2, 4, 4, 3, 2, 2],
    'Db': ['x', 4, 6, 6, 6, 4],
    'Ab': [4, 6, 6, 5, 4, 4],
    'Eb': ['x', 6, 8, 8, 8, 6],
    'Bb': ['x', 1, 3, 3, 3, 1],
    'F': [1, 3, 3, 2, 1, 1],

    // Acordes Menores
    'Dm': ['x', 'x', 0, 2, 3, 1],
    'Am': ['x', 0, 2, 2, 1, 0],
    'Em': [0, 2, 2, 0, 0, 0],
    'Bm': ['x', 2, 4, 4, 3, 2],
    'F#m': [2, 4, 4, 2, 2, 2],
    'C#m': ['x', 4, 6, 6, 5, 4],
    'G#m': [4, 6, 6, 4, 4, 4],
    'Ebm': ['x', 6, 8, 8, 7, 6],
    'Bbm': ['x', 1, 3, 3, 2, 1],
    'Fm': [1, 3, 3, 1, 1, 1],
    'Cm': ['x', 3, 5, 5, 4, 3],
    'Gm': [3, 5, 5, 3, 3, 3],
    'D#m': ['x', 6, 8, 8, 7, 6],
    'A#m': ['x', 1, 3, 3, 2, 1],

    // Diminutos / Meio-diminutos (m7b5)
    'B°': ['x', 2, 3, 2, 3, 'x'],
    'F#°': [2, 'x', 2, 2, 1, 'x'],
    'C#°': ['x', 4, 5, 4, 5, 'x'],
    'G#°': [4, 'x', 4, 4, 3, 'x'],
    'D#°': ['x', 6, 7, 6, 7, 'x'],
    'A#°': [6, 'x', 6, 6, 5, 'x'],
    'E#°': ['x', 8, 9, 8, 9, 'x'],
    'C°': ['x', 3, 4, 3, 4, 'x'],
    'G°': [3, 'x', 3, 3, 2, 'x'],
    'D°': ['x', 5, 6, 5, 6, 'x'],
    'A°': [5, 'x', 5, 5, 4, 'x'],
    'E°': ['x', 7, 8, 7, 8, 'x']
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
let soundEnabled = true;

// ==========================================================================
// 2. MOTOR DE SÍNTESE DE ÁUDIO (WEB AUDIO API)
// Plucked acoustic string synthesis
// ==========================================================================
const openStringFrequencies = [
    82.41,  // E2 (6ª corda)
    110.00, // A2 (5ª corda)
    146.83, // D3 (4ª corda)
    196.00, // G3 (3ª corda)
    246.94, // B3 (2ª corda)
    329.63  // E4 (1ª corda)
];

let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

/**
 * Toca uma nota dedilhada de corda com envelope e filtro harmônico
 */
function playGuitarString(stringIndex, fret, delayTime = 0) {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    if (fret === 'x') return; // Corda abafada não toca som

    const baseFreq = openStringFrequencies[stringIndex];
    const fretNum = typeof fret === 'number' ? fret : 0;
    const noteFreq = baseFreq * Math.pow(2, fretNum / 12);

    const now = ctx.currentTime + delayTime;

    // Osciladores combinados para timbre de corda rica
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc2.type = 'sawtooth';
    osc1.frequency.setValueAtTime(noteFreq, now);
    osc2.frequency.setValueAtTime(noteFreq * 2, now); // Harmônico superior sutil

    // Filtro Passa-Baixas para simular o corpo de madeira
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(noteFreq * 4.5, now);
    filter.frequency.exponentialRampToValueAtTime(noteFreq * 1.2, now + 1.2);

    // Ganho e Envelope de ataque percussivo e decaimento
    const gainNode = ctx.createGain();
    const gainOsc2 = ctx.createGain();
    gainOsc2.gain.value = 0.15; // Volume mais baixo para o harmônico agudo

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.22, now + 0.008); // Ataque rápido do toque
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.8); // Sustentação e decaimento suave

    // Conexões
    osc1.connect(filter);
    osc2.connect(gainOsc2);
    gainOsc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Início e término
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 2.0);
    osc2.stop(now + 2.0);
}

/**
 * Toca o acorde completo dedilhado (strum)
 */
function strumChord(chordName) {
    const shape = shapesDicionario[chordName];
    if (!shape) return;

    getAudioContext();

    // Dedilha corda por corda com pequeno intervalo realista (~32ms)
    let strumDelay = 0;
    shape.forEach((fret, stringIdx) => {
        if (fret !== 'x') {
            playGuitarString(stringIdx, fret, strumDelay);
            strumDelay += 0.032;
        }
    });
}

// ==========================================================================
// 3. SELETOR RÁPIDO DE TONS (PILLS NAVIGATION)
// ==========================================================================
const keyPillsContainer = document.getElementById('key-pills-container');

function initKeyPills() {
    keyPillsContainer.innerHTML = '';
    harmonicFields.forEach((field, index) => {
        const pill = document.createElement('button');
        pill.className = `key-pill ${index === currentIndex ? 'active' : ''}`;
        pill.textContent = field.key;
        pill.setAttribute('aria-label', `Tom de ${field.key}`);
        pill.addEventListener('click', () => {
            if (currentIndex !== index) {
                setKey(index);
            }
        });
        keyPillsContainer.appendChild(pill);
    });
}

function updateKeyPills() {
    const pills = keyPillsContainer.querySelectorAll('.key-pill');
    pills.forEach((pill, idx) => {
        if (idx === currentIndex) {
            pill.classList.add('active');
            pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            pill.classList.remove('active');
        }
    });
}

// ==========================================================================
// 4. ATUALIZAÇÃO DA INTERFACE & ANIMAÇÕES
// ==========================================================================
const currentKeyEl = document.getElementById('current-key');
const relativeBadgeEl = document.getElementById('relative-key-badge');
const pentaMajorTitleEl = document.getElementById('penta-major-title');
const pentaMajorFretEl = document.getElementById('penta-major-fret-badge');
const pentaMinorTitleEl = document.getElementById('penta-minor-title');
const pentaMinorFretEl = document.getElementById('penta-minor-fret-badge');
const harmonicGridEl = document.getElementById('harmonic-grid');

function setKey(index) {
    currentIndex = index;
    updateUI(true);
    updateKeyPills();
}

function updateUI(animate = false) {
    const field = harmonicFields[currentIndex];

    // Atualiza cabeçalho
    currentKeyEl.textContent = `Tom: ${field.key}`;
    relativeBadgeEl.textContent = `Relativo: ${field.vi}`;

    // Atualiza os nomes dos 7 acordes
    const chordMap = {
        '#box-iv .chord': field.iv,
        '#box-i .chord': field.i,
        '#box-v .chord': field.v,
        '#box-ii .chord': field.ii,
        '#box-vi .chord': field.vi,
        '#box-iii .chord': field.iii,
        '#box-vii .chord': field.vii
    };

    for (const [selector, chordName] of Object.entries(chordMap)) {
        const el = document.querySelector(selector);
        if (el) el.textContent = chordName;
    }

    // Atualiza títulos e badges das pentatônicas
    pentaMajorTitleEl.textContent = `${field.i} Maior`;
    pentaMajorFretEl.textContent = `Casa ${field.pentaMaior}`;
    pentaMinorTitleEl.textContent = `${field.vi} Menor`;
    pentaMinorFretEl.textContent = `Casa ${field.pentaMenor}`;

    // Atualiza os marcadores de casas nos gráficos de pentatônica
    updateFretboardMarkers('fretboard-major', field.pentaMaior);
    updateFretboardMarkers('fretboard-minor', field.pentaMenor);

    // Efeito de animação escalonada
    if (animate) {
        harmonicGridEl.classList.remove('chord-swap-anim');
        void harmonicGridEl.offsetWidth; // Trigger reflow
        harmonicGridEl.classList.add('chord-swap-anim');
    }
}

function updateFretboardMarkers(containerId, startFret) {
    const parentCard = document.getElementById(containerId)?.closest('.penta-card');
    if (!parentCard) return;
    const markersHeader = parentCard.querySelector('.fretboard-markers-top');
    if (markersHeader) {
        markersHeader.innerHTML = `
            <span>Casa ${startFret}</span>
            <span>Casa ${startFret + 1}</span>
            <span>Casa ${startFret + 2}</span>
            <span>Casa ${startFret + 3}</span>
        `;
    }
}

// ==========================================================================
// 5. CONTROLES DE NAVEGAÇÃO
// ==========================================================================
document.getElementById('prev-key-btn').addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + harmonicFields.length) % harmonicFields.length;
    setKey(newIndex);
});

document.getElementById('next-key-btn').addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % harmonicFields.length;
    setKey(newIndex);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        const newIndex = (currentIndex + 1) % harmonicFields.length;
        setKey(newIndex);
    } else if (event.key === 'ArrowLeft') {
        const newIndex = (currentIndex - 1 + harmonicFields.length) % harmonicFields.length;
        setKey(newIndex);
    } else if (event.code === 'Space') {
        event.preventDefault();
        const tonicChord = harmonicFields[currentIndex].i;
        strumChord(tonicChord);
    } else if (event.key.toLowerCase() === 'm') {
        toggleSound();
    }
});

// Suporte a gestos touch swipe em telas móveis
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe esquerda -> Próximo tom
        setKey((currentIndex + 1) % harmonicFields.length);
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe direita -> Tom anterior
        setKey((currentIndex - 1 + harmonicFields.length) % harmonicFields.length);
    }
}

// ==========================================================================
// 6. TOGGLE DE TEMA & SOM
// ==========================================================================
const themeToggle = document.getElementById('theme-toggle');
const iconMoon = themeToggle.querySelector('.icon-moon');
const iconSun = themeToggle.querySelector('.icon-sun');

// Carrega tema salvo se existir
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-theme');
    iconMoon.classList.add('hidden');
    iconSun.classList.remove('hidden');
}

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    if (isDark) {
        iconMoon.classList.add('hidden');
        iconSun.classList.remove('hidden');
    } else {
        iconMoon.classList.remove('hidden');
        iconSun.classList.add('hidden');
    }
});

const soundToggle = document.getElementById('sound-toggle');
const iconSoundOn = soundToggle.querySelector('.icon-sound-on');
const iconSoundOff = soundToggle.querySelector('.icon-sound-off');

function toggleSound() {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
        iconSoundOn.classList.remove('hidden');
        iconSoundOff.classList.add('hidden');
    } else {
        iconSoundOn.classList.add('hidden');
        iconSoundOff.classList.remove('hidden');
    }
}

soundToggle.addEventListener('click', toggleSound);

// ==========================================================================
// 7. BALÃOZINHO / TOOLTIP DE DIAGRAMA DO ACORDE (COM BOUNDARY DETECTION)
// ==========================================================================
const tooltip = document.getElementById('chord-tooltip');
const ttName = document.getElementById('tt-name');
const ttRole = document.getElementById('tt-role');
const ttFret = document.getElementById('tt-fret');
const ttMarkers = document.getElementById('tt-markers');
const ttDots = document.getElementById('tt-dots');

document.querySelectorAll('.chord-box').forEach(box => {
    // Clique toca o acorde
    box.addEventListener('click', () => {
        const chordName = box.querySelector('.chord').textContent.trim();
        strumChord(chordName);
    });

    // Hover mostra diagrama detalhado
    box.addEventListener('mouseenter', (e) => {
        const chordName = box.querySelector('.chord').textContent.trim();
        const roleName = box.getAttribute('data-role') || '';
        const shape = shapesDicionario[chordName];
        if (!shape) return;

        ttName.textContent = chordName;
        ttRole.textContent = roleName;

        // Determina a casa inicial do diagrama
        const numericFrets = shape.filter(s => typeof s === 'number' && s > 0);
        const minFret = numericFrets.length > 0 ? Math.min(...numericFrets) : 1;
        const maxFret = numericFrets.length > 0 ? Math.max(...numericFrets) : 4;
        const startFret = maxFret > 4 ? minFret : 1;

        ttFret.textContent = startFret > 1 ? `${startFret}ª Casa` : 'Pestana/Soltas';

        // Limpa desenhos anteriores
        ttMarkers.innerHTML = '';
        ttDots.innerHTML = '';

        // Renderiza cada corda no diagrama
        shape.forEach((fret, index) => {
            const leftPos = (index / 5) * 100; // 0% a 100%

            // Marcador superior (X, O ou vazio)
            const markerSpan = document.createElement('span');
            markerSpan.style.width = '14px';
            markerSpan.style.textAlign = 'center';

            if (fret === 'x') {
                markerSpan.textContent = '✕';
                markerSpan.style.color = '#ef4444';
            } else if (fret === 0) {
                markerSpan.textContent = '○';
                markerSpan.style.color = '#38bdf8';
            } else {
                markerSpan.textContent = '';
                // Adiciona a bolinha na casa correspondente
                const dot = document.createElement('div');
                dot.className = 'chord-dot';
                dot.style.left = `${leftPos}%`;
                
                const relativeFret = fret - startFret;
                // Centraliza no traste (4 casas = 25% cada)
                dot.style.top = `${(relativeFret * 25) + 12.5}%`;
                ttDots.appendChild(dot);
            }
            ttMarkers.appendChild(markerSpan);
        });

        tooltip.classList.remove('hidden');
        positionTooltip(e);
    });

    box.addEventListener('mousemove', (e) => {
        positionTooltip(e);
    });

    box.addEventListener('mouseleave', () => {
        tooltip.classList.add('hidden');
    });
});

function positionTooltip(e) {
    const tooltipWidth = 160;
    const tooltipHeight = 220;
    const padding = 15;

    let left = e.pageX + padding;
    let top = e.pageY + padding;

    // Se estiver muito perto da borda direita da janela, reposiciona à esquerda do cursor
    if (left + tooltipWidth > window.innerWidth + window.scrollX - 10) {
        left = e.pageX - tooltipWidth - padding;
    }

    // Se estiver muito perto do final da tela, sobe o balão
    if (top + tooltipHeight > window.innerHeight + window.scrollY - 10) {
        top = e.pageY - tooltipHeight - padding;
    }

    tooltip.style.left = `${Math.max(10, left)}px`;
    tooltip.style.top = `${Math.max(10, top)}px`;
}

// Interatividade com as bolinhas da escala pentatônica
document.querySelectorAll('.fretboard .dot').forEach((dot) => {
    dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const stringEl = dot.closest('.string');
        if (!stringEl) return;

        const isMajor = dot.closest('#fretboard-major') !== null;
        const currentField = harmonicFields[currentIndex];
        const startFret = isMajor ? currentField.pentaMaior : currentField.pentaMenor;

        // Determina a corda (6ª a 1ª)
        // string-1 = 1ª corda (e agudo -> openStringFrequencies[5] = 329.63 Hz)
        // string-2 = 2ª corda (B -> openStringFrequencies[4] = 246.94 Hz)
        // string-3 = 3ª corda (G -> openStringFrequencies[3] = 196.00 Hz)
        // string-4 = 4ª corda (D -> openStringFrequencies[2] = 146.83 Hz)
        // string-5 = 5ª corda (A -> openStringFrequencies[1] = 110.00 Hz)
        // string-6 = 6ª corda (E grave -> openStringFrequencies[0] = 82.41 Hz)
        let stringIndex = 0;
        if (stringEl.classList.contains('string-1')) stringIndex = 5;
        else if (stringEl.classList.contains('string-2')) stringIndex = 4;
        else if (stringEl.classList.contains('string-3')) stringIndex = 3;
        else if (stringEl.classList.contains('string-4')) stringIndex = 2;
        else if (stringEl.classList.contains('string-5')) stringIndex = 1;
        else if (stringEl.classList.contains('string-6')) stringIndex = 0;

        // Identifica em qual casa/coluna (0, 1, 2, 3) a bolinha se encontra
        const fretOffset = Array.from(stringEl.children).indexOf(dot);
        const actualFret = startFret + (fretOffset >= 0 ? fretOffset : 0);

        // Feedback de animação ao clicar
        dot.style.transform = 'scale(1.4)';
        setTimeout(() => {
            dot.style.transform = '';
        }, 180);

        // Toca a frequência exata da casa e corda
        playGuitarString(stringIndex, actualFret);
    });
});

// ==========================================================================
// 8. INICIALIZAÇÃO
// ==========================================================================
initKeyPills();
updateUI();

