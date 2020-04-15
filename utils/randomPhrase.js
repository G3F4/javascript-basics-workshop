import { phrases } from '../constants.js';

export default function randomPhrase() {
  const phraseIndex = Math.floor(Math.random() * phrases.length);

  return phrases[phraseIndex];
}
