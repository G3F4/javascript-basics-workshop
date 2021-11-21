console.log('game script loaded');

const gameState = {
    name: '',
    activeView: 'welcome',
};

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
        stateUpdate({ activeView: 'play' });
    });

    content.appendChild(viewTitle);
    content.appendChild(nameInputLabel);
    content.appendChild(nameInput);
    content.appendChild(playButton);
}

function playView(content, state, stateUpdate) {
    const hiMessage = document.createElement('h1');
    hiMessage.textContent = `Hi, ${state.name}`;

    const giveUpButton = document.createElement('button');
    giveUpButton.textContent = `Give up`;
    giveUpButton.addEventListener('click', () => {
        stateUpdate({ activeView: 'endGame' });
    });

    content.appendChild(hiMessage);
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
