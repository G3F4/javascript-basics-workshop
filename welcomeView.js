function welcomeView(content, state, stateUpdate) {
    const viewTitle = document.createElement('h1');
    viewTitle.textContent = `Welcome to Hangman!`;

    const nameInputLabel = document.createElement('div');
    nameInputLabel.textContent = 'Enter your name';

    const nameInput = document.createElement('input');
    nameInput.value = state.name;
    nameInput.addEventListener('blur', event => {
        stateUpdate({ name: event.target.value });
    });

    const playButton = document.createElement('button');
    playButton.textContent = 'Play game!';
    playButton.addEventListener('click', () => {
        stateUpdate({ activeView: 'play', secretPhrase: randomPhrase(), selectedLetters: [], mistakes: 0 });
    });

    content.appendChild(viewTitle);
    content.appendChild(nameInputLabel);
    content.appendChild(nameInput);
    content.appendChild(playButton);
}
