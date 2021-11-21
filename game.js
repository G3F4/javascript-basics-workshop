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
    nameInput.addEventListener('blur', event => {
        name = event.target.value;
        console.log(name);
    });

    gameContent.appendChild(viewTitle);
    gameContent.appendChild(nameInputLabel);
    gameContent.appendChild(nameInput);
}

welcomeView();
