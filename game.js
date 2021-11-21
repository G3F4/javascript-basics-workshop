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
    nameInput.addEventListener('blur', event => {
        name = event.target.value;
        console.log(name);
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

    gameContent.appendChild(hiMessage);
}

function render() {
    gameContent.textContent = '';

    if (activeView === 'welcome') {
        welcomeView();
    } else if (activeView === 'play') {
        playView();
    }
}

render();
