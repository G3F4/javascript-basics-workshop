console.log('game script loaded');

const persistedGameState = localStorage.getItem('gameState');

const gameState = persistedGameState ? JSON.parse(persistedGameState) : {
    name: '',
    activeView: 'welcome',
    selectedLetters: [],
    secretPhrase: '',
    mistakes: 0,
};

function gameStateUpdate(newGameState) {
    Object.assign(gameState, newGameState);
    localStorage.setItem('gameState', JSON.stringify(gameState));
    render();
}

const gameContent = document.getElementById('gameContent');

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
