export class Game {
  #words = [
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
  #word;
  constructor() {
    this.#word = this.generateWord();
  }
  generateWord() {
    const rnd = Math.random() * this.#words.length;
    return this.#words[Math.floor(rnd)];
  }

  private get word(): string {
    return this.#word;
  }
  private underscores() {
    const str = this.word;
    return str.replace(/./g, "_ ");
  }
  private printWordLength() {
    console.log("Word length: ", this.underscores());
  }

  greet() {
    console.log("Welcome to Gallows Humor");
    this.printWordLength();
  }
  process(line: string) {
    console.log(`You entered: ${line}`);
  }
}
