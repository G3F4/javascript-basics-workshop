function endGameView(state, stateUpdate) {
  const viewContent = document.createElement('div');
  const endGameHeader = document.createElement('h1');
  endGameHeader.textContent = 'Game finished!';

  const gameScore = document.createElement('h3');
  gameScore.textContent = `You made ${state.mistakes} mistakes`;

  const playAgain = document.createElement('button');
  playAgain.textContent = `Play again`;
  playAgain.addEventListener('click', () => {
    stateUpdate({ activeView: 'welcome' });
  });

  viewContent.appendChild(endGameHeader);
  viewContent.appendChild(gameScore);
  viewContent.appendChild(playAgain);

  return viewContent;
}
