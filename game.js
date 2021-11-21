console.log('game script loaded');

const allLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const persistedGameState = localStorage.getItem('gameState');

const gameState = persistedGameState ? JSON.parse(persistedGameState) : {
    name: '',
    activeView: 'welcome',
    selectedLetters: [],
    secretPhrase: '',
    mistakes: 0,
};

const phrases = ['test it like it is hot', 'super duper test'];

function randomPhrase() {
    const phraseIndex = Math.floor(Math.random() * phrases.length);

    return phrases[phraseIndex];
}

function gameStateUpdate(newGameState) {
    Object.assign(gameState, newGameState);
    localStorage.setItem('gameState', JSON.stringify(gameState));
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
        stateUpdate({ activeView: 'play', secretPhrase: randomPhrase(), selectedLetters: [], mistakes: 0 });
    });

    content.appendChild(viewTitle);
    content.appendChild(nameInputLabel);
    content.appendChild(nameInput);
    content.appendChild(playButton);
}

function playView(content, state, stateUpdate) {
    const hiMessage = document.createElement('h1');
    hiMessage.textContent = `Hi, ${state.name}`;

    const hangmanTemplate = document.querySelector('#hangman');
    const hangmanClone = hangmanTemplate.content.cloneNode(true);

    const hangmanHead = hangmanClone.querySelector('.hangmanHead');
    const hangmanBody = hangmanClone.querySelector('.hangmanBody');
    const hangmanLeftHand = hangmanClone.querySelector('.hangmanLeftHand');
    const hangmanRightHand = hangmanClone.querySelector('.hangmanRightHand');
    const hangmanLeftLeg = hangmanClone.querySelector('.hangmanLeftLeg');
    const hangmanRightLeg = hangmanClone.querySelector('.hangmanRightLeg');

    hangmanHead.style.opacity = state.mistakes > 0 ? '1' : '0';
    hangmanBody.style.opacity = state.mistakes > 1 ? '1' : '0';
    hangmanLeftHand.style.opacity = state.mistakes > 2 ? '1' : '0';
    hangmanRightHand.style.opacity = state.mistakes > 3 ? '1' : '0';
    hangmanLeftLeg.style.opacity = state.mistakes > 4 ? '1' : '0';
    hangmanRightLeg.style.opacity = state.mistakes > 5 ? '1' : '0';

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
            const mistake = !state.secretPhrase.includes(letter);
            const selectedLetters = state.selectedLetters.concat(letter);
            const allLettersVisible = state.secretPhrase.split('').every(letter => {
                if (letter === ' ') {
                    return true;
                }

                return selectedLetters.includes(letter);
            });

            stateUpdate({
                selectedLetters,
                mistakes: mistake ? state.mistakes + 1 : state.mistakes,
                activeView: allLettersVisible ? 'end' : 'play',
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
    content.appendChild(hangmanClone);
    content.appendChild(phraseLettersContainer);
    content.appendChild(buttonsContainer);
    content.appendChild(giveUpButton);
}

function endGameView(content, state, stateUpdate) {
    const endGameHeader = document.createElement('h1');
    endGameHeader.textContent = 'Game finished!';

    const gameScore = document.createElement('h3');
    gameScore.textContent = `You made ${state.mistakes} mistakes`;

    const playAgain = document.createElement('button');
    playAgain.textContent = `Play again`;
    playAgain.addEventListener('click', () => {
        stateUpdate({ activeView: 'welcome' });
    });

    content.appendChild(endGameHeader);
    content.appendChild(gameScore);
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
