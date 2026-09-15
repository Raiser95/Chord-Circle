// Lista completa dos 12 tons seguindo o Ciclo de Quintas
const harmonicFields = [
    { key: 'C',  iv: 'F',  i: 'C',  v: 'G',  ii: 'Dm',  vi: 'Am',  iii: 'Em',  vii: 'B°' },
    { key: 'G',  iv: 'C',  i: 'G',  v: 'D',  ii: 'Am',  vi: 'Em',  iii: 'Bm',  vii: 'F#°' },
    { key: 'D',  iv: 'G',  i: 'D',  v: 'A',  ii: 'Em',  vi: 'Bm',  iii: 'F#m', vii: 'C#°' },
    { key: 'A',  iv: 'D',  i: 'A',  v: 'E',  ii: 'Bm',  vi: 'F#m', iii: 'C#m', vii: 'G#°' },
    { key: 'E',  iv: 'A',  i: 'E',  v: 'B',  ii: 'F#m', vi: 'C#m', iii: 'G#m', vii: 'D#°' },
    { key: 'B',  iv: 'E',  i: 'B',  v: 'F#', ii: 'C#m', vi: 'G#m', iii: 'D#m', vii: 'A#°' },
    { key: 'F#', iv: 'B',  i: 'F#', v: 'C#', ii: 'G#m', vi: 'D#m', iii: 'A#m', vii: 'E#°' },
    { key: 'Db', iv: 'Gb', i: 'Db', v: 'Ab', ii: 'Ebm', vi: 'Bbm', iii: 'Fm',  vii: 'C°' },
    { key: 'Ab', iv: 'Db', i: 'Ab', v: 'Eb', ii: 'Bbm', vi: 'Fm',  iii: 'Cm',  vii: 'G°' },
    { key: 'Eb', iv: 'Ab', i: 'Eb', v: 'Bb', ii: 'Fm',  vi: 'Cm',  iii: 'Gm',  vii: 'D°' },
    { key: 'Bb', iv: 'Eb', i: 'Bb', v: 'F',  ii: 'Cm',  vi: 'Gm',  iii: 'Dm',  vii: 'A°' },
    { key: 'F',  iv: 'Bb', i: 'F',  v: 'C',  ii: 'Gm',  vi: 'Dm',  iii: 'Am',  vii: 'E°' }
];

let currentIndex = 0; // Começa em C (Dó)

// Função que pega os dados da lista e joga na tela
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
}

// Troca de tom com as setas do teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % harmonicFields.length;
        updateUI();
    } else if (event.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + harmonicFields.length) % harmonicFields.length;
        updateUI();
    }
});

// Carrega a primeira tela
updateUI();
