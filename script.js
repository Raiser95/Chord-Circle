// As 12 notas do Círculo de Quintas
const notes = [
    { major: 'C', minor: 'Am', dim: 'B°' },
    { major: 'G', minor: 'Em', dim: 'F#°' },
    { major: 'D', minor: 'Bm', dim: 'C#°' },
    { major: 'A', minor: 'F#m', dim: 'G#°' },
    { major: 'E', minor: 'C#m', dim: 'D#°' },
    { major: 'B', minor: 'G#m', dim: 'A#°' },
    { major: 'Gb', minor: 'Ebm', dim: 'F°' },
    { major: 'Db', minor: 'Bbm', dim: 'C°' },
    { major: 'Ab', minor: 'Fm', dim: 'G°' },
    { major: 'Eb', minor: 'Cm', dim: 'D°' },
    { major: 'Bb', minor: 'Gm', dim: 'A°' },
    { major: 'F', minor: 'Dm', dim: 'E°' }
];

const wheel = document.getElementById('wheel');
let currentRotation = 0; // Começa em Dó (C)

// Monta as fatias da roda automaticamente
notes.forEach((note, index) => {
    const slice = document.createElement('div');
    slice.className = 'slice';
    // Cada nota fica a 30 graus de distância da outra (360 / 12)
    slice.style.transform = `rotate(${index * 30}deg)`;

    slice.innerHTML = `
        <div class="note-content">
            <span class="major">${note.major}</span>
            <span class="minor">${note.minor}</span>
            <span class="dim">${note.dim}</span>
        </div>
    `;
    wheel.appendChild(slice);
});

// Fica "escutando" o teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        currentRotation -= 30; // Gira para a direita (avança no ciclo)
        updateWheel();
    } else if (event.key === 'ArrowLeft') {
        currentRotation += 30; // Gira para a esquerda (volta no ciclo)
        updateWheel();
    }
});

function updateWheel() {
    wheel.style.transform = `rotate(${currentRotation}deg)`;
}
