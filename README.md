## Gallows Humor

Hangman game backend

### Local Import

`import { Game } from "./mod.ts";`

### Create Hangman Game

```
// if no guess word is provided at time of instantiation, a random word is selected

const guessWord = "meow";
const hangmanGame = new Game(guessWord);
```

### Process user guess

```
hangmanGame.process("m");
hangmanGame.process("o");
```

### Get game progress

```
hangmanGame.dashes();
returns: m_o_
```

Possible process statuses

```
ProcessStatus {
  SUCCESS = "success",
  INVALID_INPUT = "error:invalid_input",
  ALREADY_GUESSED = "warning:already_guessed",
  EXCEEDED_GUESS_LIMIT = "error:exceeded_guess_limit",
}
```

### Determine Win

`hangman.isWin();`

### Use `guesses` method to keep score of failed guesses

```
hangmanGame.process("z");
hangmanGame.guesses(); // ["z"]
```

### Determine Loss

```
hangmanGame.process("x"); // error:exceeded_guess_limit
```
