console.log(['game script loaded.']);

const persistedGameState = localStorage.getItem('gameState');

const gameContent = document.getElementById('gameContent');

const gameState = persistedGameState ? JSON.parse(persistedGameState) : {
  name: '',
  activeView: 'welcome',
  selectedLetters: [],
  secretPhrase: '',
  mistakes: 0,
};

function stateUpdate(newGameState) {
  Object.assign(gameState, newGameState);
  localStorage.setItem('gameState', JSON.stringify(gameState));
  render();
}

function render() {
  gameContent.textContent = '';
  
  if (gameState.activeView === 'play') {
    gameContent.appendChild(playView(gameState, stateUpdate));
  } else if (gameState.activeView === 'endGame') {
    gameContent.appendChild(endGameView(gameState, stateUpdate));
  } else {
    gameContent.appendChild(welcomeView(gameState, stateUpdate));
  }
}

render();

