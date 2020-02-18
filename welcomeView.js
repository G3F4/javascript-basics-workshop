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
    stateUpdate({ activeView: 'play', secretPhrase: randomPhrase(), mistakes: 0 });
  });
  
  viewContent.appendChild(viewTitle);
  viewContent.appendChild(nameInputLabel);
  viewContent.appendChild(nameInput);
  viewContent.appendChild(playButton);
  
  return viewContent;
}
