import { VALID_GUESSES } from '../constants/validGuesses'
import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { default as GraphemeSplitter } from 'grapheme-splitter'
import { CharStatus } from './statuses'

export const isValidGuess = (word: string) => {
  return VALID_GUESSES.includes(localeAwareLowerCase(word))
}

export const isWinningWord = (
  word: string,
  statuses: Map<string, CharStatus[]>
) => {
  let isWinning = true
  statuses.get(word)?.forEach((status) => {
    if (status !== 'correct') {
      isWinning = false
    }
  })
  return isWinning
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = async (
  word: string,
  guesses: string[],
  statuses: Map<string, CharStatus[]>
) => {
  if (guesses.length === 0) {
    return false
  }

  const lettersLeftArray = new Array<string>()
  const guess = guesses[guesses.length - 1]
  const splitWord = unicodeSplit(word)
  const splitGuess = unicodeSplit(guess)
  const status = statuses.get(guess) ?? []
  for (let i = 0; i < splitGuess.length; i++) {
    if (status[i] === 'correct' || status[i] === 'present') {
      lettersLeftArray.push(splitGuess[i])
    }
    if (status[i] === 'correct' && splitWord[i] !== splitGuess[i]) {
      return WRONG_SPOT_MESSAGE(splitGuess[i], i + 1)
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of splitWord) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) {
      lettersLeftArray.splice(n, 1)
    }
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0])
  }
  return false
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}
