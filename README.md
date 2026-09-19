# 🎸 Chord Circle

> **Painel Interativo de Teoria Musical, Campo Harmônico e Pentatônicas para Violão e Guitarra.**

Um visualizador moderno e dinâmico desenvolvido para auxiliar músicos, estudantes e compositores no estudo das tonalidades, funções harmônicas, diagramas de acordes e escalas pentatônicas com reprodução sonora sintetizada em tempo real.

---

## ✨ Recursos Principais

- 🔄 **Círculo de Quintas & 12 Tonalidades**: Navegação rápida através de botões pílula, setas ou atalhos de teclado entre todos os 12 tons maiores e seus relativos menores.
- 🎼 **Campo Harmônico Completo (7 Graus)**:
  - **Funções Harmônicas Identificadas**: Tônica, Subdominante, Dominante e Sensível destacadas por código de cores intuitivo.
  - **Graus Romanos**: Identificação dos graus Maiores ($I, IV, V$), Menores ($ii, vi, iii$) e Meio-diminutos/Diminutos ($vii^\circ$).
- 🔍 **Diagrama de Acordes Inteligente (Tooltip)**:
  - Passe o mouse sobre qualquer acorde para ver o posicionamento das casas, cordas tocadas, soltas ($\bigcirc$), abafadas ($\times$) e pestanas.
  - Posicionamento inteligente (*boundary detection*) para não cortar nas bordas da tela.
- 🎸 **Braço de Instrumento Hiper-Realista (Fretboard)**:
  - Visualização da **Pentatônica Maior** e **Pentatônica Menor Relativa** (Shape 1 - Tônica na 6ª corda).
  - Cordas com espessuras e calibres reais (da 6ª bordão à 1ª aguda).
  - Numeração dinâmica de casas e efeito de pulso na nota tônica.
- 🔊 **Síntese de Áudio em Tempo Real (Web Audio API)**:
  - Dedilhado acústico sintetizado nativamente ao clicar em qualquer acorde ou pressionar espaço.
  - Toque notas individuais clicando nas bolinhas do braço da guitarra.
  - Sem necessidade de arquivos de áudio pesados ou bibliotecas externas.
- 🌓 **Modos Claro & Escuro (Light/Dark Mode)**:
  - Interface baseada em *Glassmorphism*, paleta de cores harmoniosa, *mesh gradient* de fundo e suporte a preferências do sistema.
- 📱 **Totalmente Responsivo**:
  - Layout otimizado para celulares, tablets e desktops com suporte a gestos de arrasto (*touch swipe*).

---

## ⌨️ Atalhos e Controles

| Atalho / Ação | Função |
| :--- | :--- |
| <kbd>←</kbd> / <kbd>→</kbd> | Alternar para a tonalidade anterior / próxima |
| <kbd>Espaço</kbd> | Tocar o acorde da Tônica ($I$) atual |
| <kbd>M</kbd> | Ativar / Desativar áudio (Mute) |
| **Clique no Card de Acorde** | Toca o dedilhado do acorde selecionado |
| **Clique na Nota do Braço** | Toca a nota correspondente na escala |
| **Swipe (Arrastar no Mobile)** | Deslize para a esquerda/direita para trocar de tom |

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica, acessibilidade e tags meta para SEO.
- **CSS3 Puro (Vanilla CSS)**:
  - *CSS Custom Properties* (variáveis de design token).
  - *Glassmorphism* (`backdrop-filter: blur`).
  - *CSS Grid* & *Flexbox* para layouts responsivos.
  - Animações escalonadas via `@keyframes`.
- **JavaScript Moderno (ES6+)**:
  - **Web Audio API**: Síntese de áudio por osciladores harmônicos e envelopes com filtros passa-baixas.
  - Manipulação eficiente do DOM e listeners de eventos (teclado, toque e mouse).

---

## 🚀 Como Executar o Projeto

Como o projeto é construído em tecnologias nativas da web (sem necessidade de bundlers ou frameworks pesados), você pode executá-lo imediatamente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Raiser95/Chord-Circle.git
   ```
2. **Abra o arquivo principal:**
   - Dê um duplo clique no arquivo `index.html` para abrir diretamente em qualquer navegador (Chrome, Edge, Firefox, Safari);
   - Ou utilize uma extensão como o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code.

---

## 📂 Estrutura de Arquivos

```text
Chord-Circle/
│
├── index.html      # Estrutura semântica e marcação dos componentes
├── style.css       # Design system, temas, fretboards e animações
├── script.js       # Dicionário musical, motor de áudio Web Audio API e interações
└── README.md       # Documentação do projeto
```

---

Feito com 🎶 para facilitar o estudo da harmonia musical e da guitarra/violão.