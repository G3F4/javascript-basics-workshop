function renderTitle() {
  const endGameHeader = document.createElement('h1');

  endGameHeader.textContent = 'Game finished!';

  return endGameHeader;
}

function renderScore(state) {
  const gameScore = document.createElement('h3');

  gameScore.textContent = `You made ${state.mistakes} mistakes`;

  return gameScore;
}

function renderActions(state, stateUpdate) {
  const container = document.createElement('div');
  const playAgain = document.createElement('button');

  playAgain.textContent = `Play again`;
  playAgain.addEventListener('click', () => {
    stateUpdate({ activeView: 'welcome' });
  });

  container.append(playAgain);

  return container;
}

export default function endGameView(state, stateUpdate) {
  const view = document.createElement('div');

  const title = renderTitle();
  const score = renderScore(state, stateUpdate);
  const actions = renderActions(state, stateUpdate);

  view.appendChild(title);
  view.appendChild(score);
  view.appendChild(actions);
  
  return view;
}
