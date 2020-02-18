console.log(['game script loaded.']);

const gameContent = document.getElementById('gameContent');

const gameState = {
  name: '',
  activeView: 'welcome',
};

function welcomeView(state, stateUpdate) {
  const viewContent = document.createElement('div');
  const viewTitle = document.createElement('h1');
  viewTitle.textContent = `Welcome to Hangman!`;

  const nameInputLabel = document.createElement('div');
  nameInputLabel.textContent = 'Enter your name';

  const nameInput = document.createElement('input');
  nameInput.addEventListener('input', event => {
    stateUpdate({ name: event.target.value });
  });
  setTimeout(() => {
    nameInput.value = state.name;
    nameInput.selectionStart = state.name.length;
    nameInput.focus();
  }, 0);

  const playButton = document.createElement('button');
  playButton.textContent = 'Play game!';
  playButton.addEventListener('click', () => {
    stateUpdate({ activeView: 'play' });
  });
  
  viewContent.appendChild(viewTitle);
  viewContent.appendChild(nameInputLabel);
  viewContent.appendChild(nameInput);
  viewContent.appendChild(playButton);
  
  return viewContent;
}

function playView(state, stateUpdate) {
  const viewContent = document.createElement('div');
  const hiMessage = document.createElement('h1');
  hiMessage.textContent = `Hi, ${state.name}`;

  const giveUpButton = document.createElement('button');
  giveUpButton.textContent = `Give up`;
  giveUpButton.addEventListener('click', () => {
    stateUpdate({ activeView: 'endGame' });
  });
  
  viewContent.appendChild(hiMessage);
  viewContent.appendChild(giveUpButton);
  
  return viewContent;
}

function endGameView(state, stateUpdate) {
  const viewContent = document.createElement('div');
  const endGameHeader = document.createElement('h1');
  endGameHeader.textContent = 'Game finished!';

  const playAgain = document.createElement('button');
  playAgain.textContent = `Play again`;
  playAgain.addEventListener('click', () => {
    stateUpdate({ activeView: 'welcome' });
  });
  
  viewContent.appendChild(endGameHeader);
  viewContent.appendChild(playAgain);
  
  return viewContent;
}

function stateUpdate(newGameState) {
  Object.assign(gameState, newGameState);
  render();
}

function render() {
  gameContent.textContent = '';

  switch (gameState.activeView) {
    case 'welcome': {
      gameContent.appendChild(welcomeView(gameState, stateUpdate));
      break;
    }
    case 'play': {
      gameContent.appendChild(playView(gameState, stateUpdate));
      break;
    }
    case 'endGame': {
      gameContent.appendChild(endGameView(gameState, stateUpdate));
      break;
    }
    default: {
      gameContent.appendChild(welcomeView(gameState, stateUpdate));
    }
  }
}

render();

