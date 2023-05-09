export type CharMapArray = Array<{ letter: string; guess: string }>;

export enum ProcessStatus {
  SUCCESS = "success",
  INVALID_INPUT = "error:invalid_input",
  ALREADY_GUESSED = "warning:already_guessed",
  EXCEEDED_GUESS_LIMIT = "error:exceeded_guess_limit",
}

export class Game {
  static readonly #words = [
    "rocky",
    "known",
    "art",
    "minute",
    "characteristic",
    "wire",
    "science",
    "blank",
    "therefore",
    "corner",
  ];
  #word: CharMapArray;
  #guesses: Array<string> = [];
  constructor(word?: string) {
    if (word) {
      this.#word = Game.charMap(word);
    } else {
      this.#word = Game.charMap(Game.randomWord(Game.#words));
    }
  }
  private static randomWord(words: Array<string>): string {
    const rnd = Math.random() * words.length;
    return words[Math.floor(rnd)];
  }

  private get word(): CharMapArray {
    return this.#word;
  }
  private set word(cm: CharMapArray) {
    this.#word = cm;
  }

  private static charMap(
    str: string
  ): Array<{ letter: string; guess: string }> {
    return str.split("").map(($ch) => ({ letter: $ch, guess: "_" }));
  }
  dashes() {
    return this.word.map(($cm) => $cm.guess).join("");
  }
  guesses() {
    return this.#guesses;
  }
  private printWordLength() {
    console.log("Word length: ", this.dashes());
  }

  isWin(): boolean {
    return this.word.every(($cm) => $cm.letter === $cm.guess);
  }

  greet() {
    console.log("Welcome to Gallows Humor");
    this.printWordLength();
  }
  // Method that takes a single character as input and updates the word and guesses properties
  process(char: string): ProcessStatus {
    // Check if the input is a single character
    if (char.length > 1) {
      // Return an error status code if input is not a single character
      return ProcessStatus.INVALID_INPUT;
    }

    // Update the word property by replacing letters that match the input character
    this.word = this.word.map(($cm) =>
      $cm.letter === char ? { ...$cm, guess: char } : $cm
    );

    // If the input character is not found in the word property, add it to the guesses property
    if (this.#guesses.length < this.word.length + 2) {
      if (!this.#guesses.includes(char)) {
        if (!this.word.find(($w) => $w.letter === char)) {
          this.#guesses.push(char);
        }
      } else {
        // Return a status code indicating that the character has already been guessed
        return ProcessStatus.ALREADY_GUESSED;
      }
    } else {
      // Return a status code indicating that the limit of guesses has been exceeded
      return ProcessStatus.EXCEEDED_GUESS_LIMIT;
    }

    // Return a success status code
    return ProcessStatus.SUCCESS;
  }
}
