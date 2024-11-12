import { MAX_CHALLENGES } from '../../constants/settings'
import { CharStatus } from '../../lib/statuses'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  statuses: Map<string, CharStatus[]>
  currentGuess: string
  isRevealing?: boolean
  currentRowClassName: string
  guessesProven: Map<string, boolean>
}

export const Grid = ({
  guesses,
  statuses,
  currentGuess,
  isRevealing,
  currentRowClassName,
  guessesProven,
}: Props) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(
          Array(MAX_CHALLENGES - (!isRevealing ? 1 : 0) - guesses.length)
        )
      : []

  return (
    <>
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          guess={guess}
          status={statuses.size > 0 ? statuses.get(guess) ?? [] : []}
          isRevealing={isRevealing && guesses.length - 1 === i}
          guessProven={guessesProven.get(guess) ?? false}
        />
      ))}
      {!isRevealing && guesses.length < MAX_CHALLENGES && (
        <CurrentRow guess={currentGuess} className={currentRowClassName} />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </>
  )
}
