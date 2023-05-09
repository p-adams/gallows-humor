type CharMapArray = Array<{ letter: string; guess: string }>;

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
  process(char: string) {
    if (char.length > 1) {
      console.log("Please enter a single character");
      return;
    }
    console.log(`You entered: ${char}`);
    this.word = this.word.map(($cm) =>
      $cm.letter === char ? { ...$cm, guess: char } : $cm
    );
    return this.word;
  }
}
