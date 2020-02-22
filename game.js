console.log('game script loaded');

let name = '';
let activeView = 'welcome';

const gameContent = document.getElementById('gameContent');

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

function render() {
  gameContent.textContent = '';
  
  if (activeView === 'welcome') {
    welcomeView();
  }
}

render();
