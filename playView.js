const allLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const phrases = ['test it like it is hot', 'super duper test'];

function randomPhrase() {
  const phraseIndex = Math.floor(Math.random() * phrases.length);

  return phrases[phraseIndex];
}

function playView(state, stateUpdate) {
  const viewContent = document.createElement('div');
  const hiMessage = document.createElement('h1');
  hiMessage.textContent = `Hi, ${state.name}`;

  const giveUpButton = document.createElement('button');
  giveUpButton.textContent = `Finish`;
  giveUpButton.addEventListener('click', () => {
    stateUpdate({ activeView: 'endGame', selectedLetters: [] });
  });
  
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
    
    return viewContent;
  }
  
  const buttonsContainer = document.createElement('div');
  allLetters.forEach(letter => {
    const letterButton = document.createElement('button');
    const letterSelected = state.selectedLetters.includes(letter);
    letterButton.disabled = letterSelected;
    letterButton.textContent = letter;
    letterButton.addEventListener('click', () => {
      const mistake = !state.secretPhrase.includes(letter);
      
      stateUpdate({
        selectedLetters: state.selectedLetters.concat(letter),
        mistakes: mistake ? state.mistakes + 1 : state.mistakes,
      });
    });
  
    buttonsContainer.appendChild(letterButton);
  });
  
  viewContent.appendChild(hiMessage);
  viewContent.appendChild(phraseLettersContainer);
  viewContent.appendChild(buttonsContainer);
  viewContent.appendChild(giveUpButton);
  
  return viewContent;
}
