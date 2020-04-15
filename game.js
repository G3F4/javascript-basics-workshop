import welcomeView from './views/welcomeView.js';
import playView from './views/playView.js';
import endGameView from './views/endGameView.js';
import { viewIds } from './constants.js';

console.log('game script loaded');

const persistedGameState = localStorage.getItem('gameState');

const gameContent = document.getElementById('gameContent');

const gameState = persistedGameState ? JSON.parse(persistedGameState) : {
  name: '',
  activeView: viewIds.welcome,
  selectedLetters: [],
  secretPhrase: '',
  mistakes: 0,
};

function stateUpdate(newGameState) {
  setTimeout(() => {
    Object.assign(gameState, newGameState);
    localStorage.setItem('gameState', JSON.stringify(gameState));
    render(gameState, stateUpdate);
  });
}

function clearNode(node) {
  node.textContent = '';
}

const views = {
  [viewIds.welcome]: welcomeView,
  [viewIds.play]: playView,
  [viewIds.endGame]: endGameView,
};

function getActiveView(activeView) {
  return views[activeView];
}

function render(state, stateUpdate) {
  const view = getActiveView(state.activeView);

  clearNode(gameContent);
  
  gameContent.appendChild(view(state, stateUpdate));
}

render(gameState, stateUpdate);
