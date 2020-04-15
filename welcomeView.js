function welcomeView(state, stateUpdate) {
  function renderTitle() {
    const viewTitle = document.createElement('h1');

    viewTitle.textContent = `Welcome to Hangman!`;

    return viewTitle
  }

  function renderNameForm(state, stateUpdate) {
    const container = document.createElement('div');
    const nameInputLabel = document.createElement('div');
    const nameInput = document.createElement('input');

    nameInputLabel.textContent = 'Enter your name';
    nameInput.addEventListener('input', event => {
      stateUpdate({ name: event.target.value });
    });
    setTimeout(() => {
      nameInput.value = state.name;
      nameInput.selectionStart = state.name.length;
      nameInput.focus();
    }, 0);

    container.append(nameInputLabel);
    container.append(nameInput);

    return container;
  }

  function renderActions(state, stateUpdate) {
    const container = document.createElement('div');
    const playButton = document.createElement('button');

    playButton.textContent = 'Play game!';
    playButton.addEventListener('click', () => {
      stateUpdate({
        activeView: 'play',
        secretPhrase: randomPhrase(),
        mistakes: 0, selectedLetters: [],
      });
    });

    container.append(playButton);

    return container;
  }

  const viewContent = document.createElement('div');

  const title = renderTitle();
  const nameForm = renderNameForm(state, stateUpdate);
  const actions = renderActions(state, stateUpdate);
  
  viewContent.appendChild(title);
  viewContent.appendChild(nameForm);
  viewContent.appendChild(actions);
  
  return viewContent;
}
