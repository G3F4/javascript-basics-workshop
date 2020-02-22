console.log('game script loaded');

const allLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const phrases = ['test it like it is hot', 'super duper test'];

function randomPhrase() {
  const phraseIndex = Math.floor(Math.random() * phrases.length);
  
  return phrases[phraseIndex];
}

const gameState = {
  name: '',
  activeView: 'welcome',
  selectedLetters: [],
  secretPhrase: '',
  mistakes: 0,
};

function stateUpdate(newGameState) {
  Object.assign(gameState, newGameState);
  render();
}

const gameContent = document.getElementById('gameContent');

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
    stateUpdate({ activeView: 'play', secretPhrase: randomPhrase(), mistakes: 0, selectedLetters: [] });
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
  
  const phraseLettersContainer = document.createElement('div');
  const phraseLetters = state.secretPhrase.split('');
  let phraseLettersVisibleCount = 0;
  phraseLetters.forEach(phraseLetter => {
    const phraseLetterSpan = document.createElement('span');
    const phraseLetterVisible = phraseLetter === ' ' || state.selectedLetters.includes(phraseLetter);
    
    if (phraseLetterVisible) {
      phraseLettersVisibleCount++;
    }
    
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
  
      stateUpdate({
        selectedLetters: state.selectedLetters.concat(letter),
        mistakes: mistake ? state.mistakes + 1 : state.mistakes,
      });
    });
  
    buttonsContainer.appendChild(letterButton);
  }
  
  if (phraseLettersVisibleCount === state.secretPhrase.length) {
    stateUpdate({ activeView: 'endGame', selectedLetters: [] });
    
    return viewContent;
  }
  
  const giveUpButton = document.createElement('button');
  giveUpButton.textContent = `Give up`;
  giveUpButton.addEventListener('click', () => {
    stateUpdate({ activeView: 'endGame' });
  });
  
  viewContent.appendChild(hiMessage);
  viewContent.appendChild(phraseLettersContainer);
  viewContent.appendChild(buttonsContainer);
  viewContent.appendChild(giveUpButton);
  
  return viewContent;
}

function endGameView(state, stateUpdate) {
  const viewContent = document.createElement('div');
  const endGameHeader = document.createElement('h1');
  endGameHeader.textContent = 'Game finished!';
  
  const gameScore = document.createElement('h3');
  gameScore.textContent = `You made ${state.mistakes} mistakes`;
  
  const playAgain = document.createElement('button');
  playAgain.textContent = `Play again`;
  playAgain.addEventListener('click', () => {
    stateUpdate({ activeView: 'welcome' });
  });
  
  viewContent.appendChild(endGameHeader);
  viewContent.appendChild(gameScore);
  viewContent.appendChild(playAgain);
  
  return viewContent;
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
