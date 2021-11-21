function endGameView(content, state, stateUpdate) {
    const endGameHeader = document.createElement('h1');
    endGameHeader.textContent = 'Game finished!';

    const gameScore = document.createElement('h3');
    gameScore.textContent = `You made ${state.mistakes} mistakes`;

    const playAgain = document.createElement('button');
    playAgain.textContent = `Play again`;
    playAgain.addEventListener('click', () => {
        stateUpdate({ activeView: 'welcome' });
    });

    content.appendChild(endGameHeader);
    content.appendChild(gameScore);
    content.appendChild(playAgain);
}
