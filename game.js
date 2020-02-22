console.log('game script loaded');

let name = '';

const gameContent = document.getElementById('gameContent');

gameContent.textContent = '';

function welcomeView() {
  const viewTitle = document.createElement('h1');
  viewTitle.textContent = `Welcome to Hangman!`;
  
  const nameInputLabel = document.createElement('div');
  nameInputLabel.textContent = 'Enter your name';
  
  
  const nameInput = document.createElement('input');
  nameInput.addEventListener('input', event => {
    name = event.target.value;
    console.log(name);
  });
  
  gameContent.appendChild(viewTitle);
  gameContent.appendChild(nameInputLabel);
  gameContent.appendChild(nameInput);
}

welcomeView();

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
