function endGameView(state, stateUpdate) {
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

  const viewContent = document.createElement('div');

  const title = renderTitle();
  const score = renderScore(state, stateUpdate);
  const actions = renderActions(state, stateUpdate);

  viewContent.appendChild(title);
  viewContent.appendChild(score);
  viewContent.appendChild(actions);
  
  return viewContent;
}
