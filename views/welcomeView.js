import { viewIds } from '../constants.js';
import randomPhrase from '../utils/randomPhrase.js';

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
      activeView: viewIds.play,
      secretPhrase: randomPhrase(),
      mistakes: 0, selectedLetters: [],
    });
  });

  container.append(playButton);

  return container;
}

export default function welcomeView(state, stateUpdate) {
  const view = document.createElement('div');

  const title = renderTitle();
  const nameForm = renderNameForm(state, stateUpdate);
  const actions = renderActions(state, stateUpdate);
  
  view.appendChild(title);
  view.appendChild(nameForm);
  view.appendChild(actions);
  
  return view;
}
