console.log('game script loaded');

const gameContent = document.getElementById('gameContent');

gameContent.textContent = '';

const viewTitle = document.createElement('h1');
viewTitle.textContent = `Welcome to Hangman!`;

gameContent.appendChild(viewTitle);
