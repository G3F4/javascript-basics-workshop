import welcomeView from './views/welcomeView.js';
import playView from './views/playView.js';
import endGameView from './views/endGameView.js';

console.log('game script loaded');

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
  setTimeout(() => {
    Object.assign(gameState, newGameState);
    localStorage.setItem('gameState', JSON.stringify(gameState));
    render();
  });
}

function render() {
  gameContent.textContent = '';
  let viewContent;
  
  if (gameState.activeView === 'welcome') {
    viewContent = welcomeView(gameState, stateUpdate);
  } else if (gameState.activeView === 'play') {
    viewContent = playView(gameState, stateUpdate);
  } else {
    viewContent = endGameView(gameState, stateUpdate);
  }
  
  gameContent.appendChild(viewContent);
}

render();
