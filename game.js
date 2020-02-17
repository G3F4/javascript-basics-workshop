console.log(['game script loaded.']);

const gameContent = document.getElementById('gameContent');

let name = '';
let activeView = 'welcome';

function welcomeView() {
  const viewTitle = document.createElement('h1');
  viewTitle.textContent = `Welcome to Hangman!`;

  const nameInputLabel = document.createElement('div');
  nameInputLabel.textContent = 'Enter your name';

  const nameInput = document.createElement('input');
  nameInput.addEventListener('input', event => {
    name = event.target.value;
  });

  const playButton = document.createElement('button');
  playButton.textContent = 'Play game!';
  playButton.addEventListener('click', () => {
    activeView = 'play';
    render();
  });

  gameContent.appendChild(viewTitle);
  gameContent.appendChild(nameInputLabel);
  gameContent.appendChild(nameInput);
  gameContent.appendChild(playButton);
}

function playView() {
  const hiMessage = document.createElement('h1');
  hiMessage.textContent = `Hi, ${name}`;

  const giveUpButton = document.createElement('button');
  giveUpButton.textContent = `Give up`;
  giveUpButton.addEventListener('click', () => {
    activeView = 'endGame';
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
    activeView = 'welcome';
    render();
  });

  gameContent.appendChild(endGameHeader);
  gameContent.appendChild(playAgain);
}

function render() {
  gameContent.textContent = '';

  switch (activeView) {
    case 'welcome': {
      welcomeView();
      break;
    }
    case 'play': {
      playView();
      break;
    }
    case 'endGame': {
      endGameView();
      break;
    }
    default: {
      welcomeView();
    }
  }
}

render(activeView);

