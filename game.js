console.log('game script loaded');

const gameContent = document.getElementById('gameContent');

gameContent.textContent = '';

const viewTitle = document.createElement('h1');
viewTitle.textContent = `Welcome to Hangman!`;

const nameInputLabel = document.createElement('div');
nameInputLabel.textContent = 'Enter your name';

let name = '';

const nameInput = document.createElement('input');
nameInput.addEventListener('input', event => {
  name = event.target.value;
  console.log(name);
});

gameContent.appendChild(viewTitle);
gameContent.appendChild(nameInputLabel);
gameContent.appendChild(nameInput);

