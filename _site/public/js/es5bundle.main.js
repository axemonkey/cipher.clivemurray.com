(function () {
	'use strict';

	const isLetter = character => {
	  return character.toUpperCase() !== character.toLowerCase();
	};
	const getKeyModifier = letter => {
	  const letterCode = letter.toUpperCase().charCodeAt(0) - 64;
	  let modifier = 1 - letterCode;
	  if (modifier < 0) {
	    modifier += 26;
	  }
	  return modifier;
	};
	const stripSpaces = string => {
	  const newString = [];
	  for (const character of string) {
	    if (character !== ' ') {
	      newString.push(character);
	    }
	  }
	  return newString.join('');
	};
	const getValidLetterCode = (currentCharacterCode, newCharacterCode) => {
	  // UPPERCASE = 65–90
	  // lowercase = 97–122

	  if (currentCharacterCode <= 90 && newCharacterCode > 90) {
	    return newCharacterCode - 26;
	  }
	  if (currentCharacterCode <= 122 && currentCharacterCode >= 97 && newCharacterCode > 122) {
	    return newCharacterCode - 26;
	  }
	  return newCharacterCode;
	};
	const decodeCharacter = (encodedCharacter, keyCharacter) => {
	  const keyModifier = getKeyModifier(keyCharacter);
	  const currentCharacterCode = encodedCharacter.charCodeAt(0);
	  const newCharacterCode = getValidLetterCode(currentCharacterCode, currentCharacterCode + keyModifier);
	  const newCharacter = String.fromCharCode(newCharacterCode);
	  return newCharacter;
	};
	const getDecodedText = (encodedText, key) => {
	  if (key.length === 0) {
	    return encodedText;
	  }
	  let output = [];
	  let keyIndex = 0;
	  for (let index = 0; index < encodedText.length; index++) {
	    const encodedCharacter = encodedText.charAt(index);
	    if (isLetter(encodedCharacter)) {
	      const keyCharacter = key[keyIndex];
	      const newCharacter = decodeCharacter(encodedCharacter, keyCharacter);
	      keyIndex++;
	      if (keyIndex === key.length) {
	        keyIndex = 0;
	      }
	      output.push(newCharacter);
	    } else if (encodedCharacter === '\n') {
	      output.push('<br>');
	    } else {
	      output.push(encodedCharacter);
	    }
	  }
	  return output.join('');
	};
	const decodeText = () => {
	  const theForm = document.querySelector('form');
	  const encodedText = theForm.querySelector('#encoded').value.trim();
	  const key = stripSpaces(theForm.querySelector('#key').value.trim());
	  const decodedText = getDecodedText(encodedText, key);
	  return decodedText;
	};
	const createOutputFromForm = () => {
	  const dText = decodeText();
	  const outputDiv = document.createElement('div');
	  outputDiv.id = 'generated-output';
	  const htmlStr = `<p>${dText}</p>`;
	  outputDiv.innerHTML = htmlStr;
	  document.querySelector('#output').replaceChildren(outputDiv);
	};
	const init = () => {
	  const theForm = document.querySelector('form');
	  console.log('load');
	  createOutputFromForm();
	  const eventList = ['change', 'keyup', 'paste', 'input', 'propertychange', 'click'];
	  const formInputs = theForm.querySelectorAll('input[type="text"], textarea');
	  for (const formInput of formInputs) {
	    for (const event of eventList) {
	      formInput.addEventListener(event, createOutputFromForm);
	    }
	  }
	};
	window.addEventListener('load', init);

})();
