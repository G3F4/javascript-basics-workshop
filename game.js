console.log('game script loaded');

const gameState = {
  name: '',
  activeView: 'welcome',
};

const gameContent = document.getElementById('gameContent');

function welcomeView() {
  const viewTitle = document.createElement('h1');
  viewTitle.textContent = `Welcome to Hangman!`;
  
  const nameInputLabel = document.createElement('div');
  nameInputLabel.textContent = 'Enter your name';
  
  
  const nameInput = document.createElement('input');
  nameInput.addEventListener('input', event => {
    gameState.name = event.target.value;
  });
  
  const playButton = document.createElement('button');
  playButton.textContent = 'Play game!';
  playButton.addEventListener('click', () => {
    gameState.activeView = 'play';
    render();
  });
  
  gameContent.appendChild(viewTitle);
  gameContent.appendChild(nameInputLabel);
  gameContent.appendChild(nameInput);
  gameContent.appendChild(playButton);
}

function playView() {
  const hiMessage = document.createElement('h1');
  hiMessage.textContent = `Hi, ${gameState.name}`;
  
  const giveUpButton = document.createElement('button');
  giveUpButton.textContent = `Give up`;
  giveUpButton.addEventListener('click', () => {
    gameState.activeView = 'endGame';
    render();
  });
  
  gameContent.appendChild(hiMessage);
  gameContent.appendChild(giveUpButton);
}

function endGameView() {
  const endGameHeader = document.createElement('h1');
  endGameHeader.textContent = 'Game finished!';
  
  const playAgain = document.createElement('button');
  playAgain.textContent = `Play again`;
  playAgain.addEventListener('click', () => {
    gameState.activeView = 'welcome';
    render();
  });
  
  gameContent.appendChild(endGameHeader);
  gameContent.appendChild(playAgain);
}

function render() {
  gameContent.textContent = '';
  
  if (gameState.activeView === 'welcome') {
    welcomeView();
  } else if (gameState.activeView === 'play') {
    playView();
  } else {
    endGameView();
  }
}

render();
