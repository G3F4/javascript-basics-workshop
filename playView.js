const allLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const phrases = ['test it like it is hot', 'super duper test'];

function randomPhrase() {
  const phraseIndex = Math.floor(Math.random() * phrases.length);
  
  return phrases[phraseIndex];
}

function playView(state, stateUpdate) {
  function renderTitle(state) {
    const hiMessage = document.createElement('h1');
    hiMessage.textContent = `Hi, ${state.name}`;

    return hiMessage;
  }

  function renderHangman(state) {
    const template = document.querySelector('#hangman');
    const node = template.content.cloneNode(true);

    const head = node.querySelector('.hangmanHead');
    const body = node.querySelector('.hangmanBody');
    const leftHand = node.querySelector('.hangmanLeftHand');
    const rightHand = node.querySelector('.hangmanRightHand');
    const leftLeg = node.querySelector('.hangmanLeftLeg');
    const rightLeg = node.querySelector('.hangmanRightLeg');

    head.style.opacity = state.mistakes > 0 ? '1' : '0';
    body.style.opacity = state.mistakes > 1 ? '1' : '0';
    leftHand.style.opacity = state.mistakes > 2 ? '1' : '0';
    rightHand.style.opacity = state.mistakes > 3 ? '1' : '0';
    leftLeg.style.opacity = state.mistakes > 4 ? '1' : '0';
    rightLeg.style.opacity = state.mistakes > 5 ? '1' : '0';

    return node;
  }

  function renderPhrase(state, stateUpdate) {
    const phraseLettersContainer = document.createElement('div');
    const phraseLetters = state.secretPhrase.split('');
    let phraseLettersVisibleCount = 0;
    phraseLetters.forEach(phraseLetter => {
      const phraseLetterSpan = document.createElement('span');
      const phraseLetterVisible = phraseLetter === ' ' || state.selectedLetters.includes(phraseLetter);

      if (phraseLetterVisible) {
        phraseLettersVisibleCount++;
      }

      phraseLetterSpan.textContent = phraseLetterVisible ? phraseLetter : '*';
      phraseLettersContainer.appendChild(phraseLetterSpan);
    });

    if (phraseLettersVisibleCount === state.secretPhrase.length) {
      stateUpdate({ activeView: 'endGame', selectedLetters: [] });
    }

    return phraseLettersContainer;
  }

  function renderLetterButtons(state, stateUpdate) {
    const buttonsContainer = document.createElement('div');

    for (let i = 0; i < allLetters.length; i++) {
      const letter = allLetters[i];
      const letterButton = document.createElement('button');
      letterButton.disabled = state.selectedLetters.includes(letter);
      letterButton.textContent = letter;
      letterButton.addEventListener('click', () => {
        const mistake = !state.secretPhrase.includes(letter);

        stateUpdate({
          selectedLetters: state.selectedLetters.concat(letter),
          mistakes: mistake ? state.mistakes + 1 : state.mistakes,
        });
      });

      buttonsContainer.appendChild(letterButton);
    }

    return buttonsContainer;
  }

  function renderActions(state, stateUpdate) {
    const container = document.createElement('div');
    const giveUpButton = document.createElement('button');

    giveUpButton.textContent = `Give up`;
    giveUpButton.addEventListener('click', () => {
      stateUpdate({ activeView: 'endGame' });
    });

    container.append(giveUpButton);

    return container;
  }

  const viewContent = document.createElement('div');

  const title = renderTitle(state);
  const hangman = renderHangman(state);
  const phrase = renderPhrase(state, stateUpdate);
  const letterButtons = renderLetterButtons(state, stateUpdate);
  const actions = renderActions(state, stateUpdate);
  
  viewContent.appendChild(title);
  viewContent.appendChild(hangman);
  viewContent.appendChild(phrase);
  viewContent.appendChild(letterButtons);
  viewContent.appendChild(actions);
  
  return viewContent;
}
