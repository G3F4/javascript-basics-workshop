console.log('game script loaded');

const allLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const gameState = {
    name: '',
    activeView: 'welcome',
    selectedLetters: [],
    secretPhrase: '',
};

const phrases = ['test it like it is hot', 'super duper test'];

function randomPhrase() {
    const phraseIndex = Math.floor(Math.random() * phrases.length);

    return phrases[phraseIndex];
}

function gameStateUpdate(newGameState) {
    Object.assign(gameState, newGameState);
    render();
}

const gameContent = document.getElementById('gameContent');

function welcomeView(content, state, stateUpdate) {
    const viewTitle = document.createElement('h1');
    viewTitle.textContent = `Welcome to Hangman!`;

    const nameInputLabel = document.createElement('div');
    nameInputLabel.textContent = 'Enter your name';

    const nameInput = document.createElement('input');
    nameInput.value = state.name;
    nameInput.addEventListener('blur', event => {
        stateUpdate({ name: event.target.value });
    });

    const playButton = document.createElement('button');
    playButton.textContent = 'Play game!';
    playButton.addEventListener('click', () => {
        stateUpdate({ activeView: 'play', secretPhrase: randomPhrase(), selectedLetters: [] });
    });

    content.appendChild(viewTitle);
    content.appendChild(nameInputLabel);
    content.appendChild(nameInput);
    content.appendChild(playButton);
}

function playView(content, state, stateUpdate) {
    const hiMessage = document.createElement('h1');
    hiMessage.textContent = `Hi, ${state.name}`;

    const phraseLettersContainer = document.createElement('div');
    const phraseLetters = state.secretPhrase.split('');
    phraseLetters.forEach(phraseLetter => {
        const phraseLetterSpan = document.createElement('span');
        const phraseLetterVisible = phraseLetter === ' ' || state.selectedLetters.includes(phraseLetter);

        phraseLetterSpan.textContent = phraseLetterVisible ? phraseLetter : '*';
        phraseLettersContainer.appendChild(phraseLetterSpan);
    });

    const buttonsContainer = document.createElement('div');

    for (let i = 0; i < allLetters.length; i++) {
        const letter = allLetters[i];
        const letterButton = document.createElement('button');
        const letterSelected = state.selectedLetters.includes(letter);
        letterButton.disabled = letterSelected;
        letterButton.textContent = letter;
        letterButton.addEventListener('click', () => {
            stateUpdate({
                selectedLetters: state.selectedLetters.concat(letter),
            });
        });

        buttonsContainer.appendChild(letterButton);
    }

    const giveUpButton = document.createElement('button');
    giveUpButton.textContent = `Give up`;
    giveUpButton.addEventListener('click', () => {
        stateUpdate({ activeView: 'endGame' });
    });

    content.appendChild(hiMessage);
    content.appendChild(phraseLettersContainer);
    content.appendChild(buttonsContainer);
    content.appendChild(giveUpButton);
}

function endGameView(content, state, stateUpdate) {
    const endGameHeader = document.createElement('h1');
    endGameHeader.textContent = 'Game finished!';

    const playAgain = document.createElement('button');
    playAgain.textContent = `Play again`;
    playAgain.addEventListener('click', () => {
        stateUpdate({ activeView: 'welcome' });
    });

    content.appendChild(endGameHeader);
    content.appendChild(playAgain);
}

function render() {
    gameContent.textContent = '';

    if (gameState.activeView === 'welcome') {
        welcomeView(gameContent, gameState, gameStateUpdate);
    } else if (gameState.activeView === 'play') {
        playView(gameContent, gameState, gameStateUpdate);
    } else {
        endGameView(gameContent, gameState, gameStateUpdate);
    }
}

render();
