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
  
  const hangmanTemplate = document.querySelector('#hangman');
  const hangmanClone = hangmanTemplate.content.cloneNode(true);
  
  const hangmanHead = hangmanClone.querySelector('.hangmanHead');
  const hangmanBody = hangmanClone.querySelector('.hangmanBody');
  const hangmanLeftHand = hangmanClone.querySelector('.hangmanLeftHand');
  const hangmanRightHand = hangmanClone.querySelector('.hangmanRightHand');
  const hangmanLeftLeg = hangmanClone.querySelector('.hangmanLeftLeg');
  const hangmanRightLeg = hangmanClone.querySelector('.hangmanRightLeg');
  
  hangmanHead.style.opacity = state.mistakes > 0 ? '1' : '0';
  hangmanBody.style.opacity = state.mistakes > 1 ? '1' : '0';
  hangmanLeftHand.style.opacity = state.mistakes > 2 ? '1' : '0';
  hangmanRightHand.style.opacity = state.mistakes > 3 ? '1' : '0';
  hangmanLeftLeg.style.opacity = state.mistakes > 4 ? '1' : '0';
  hangmanRightLeg.style.opacity = state.mistakes > 5 ? '1' : '0';
  
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
  viewContent.appendChild(hangmanClone);
  viewContent.appendChild(phraseLettersContainer);
  viewContent.appendChild(buttonsContainer);
  viewContent.appendChild(giveUpButton);
  
  return viewContent;
}
