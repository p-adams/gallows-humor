import { BufReader } from "https://deno.land/std@0.170.0/io/mod.ts";
import { Game, ProcessStatus } from "./lib/game.ts";

// example CLI program
async function main() {
  const reader = new BufReader(Deno.stdin);
  const game = new Game("foo");
  game.greet();
  while (true) {
    if (game.isWin()) {
      console.log("You win!");
      Deno.exit(0);
    }
    const $line = await reader.readString("\n");
    const line = $line?.trim();

    if (!line) {
      console.log("Goodbye!");
      Deno.exit(0);
    }
    const processed = game.process(line);
    if (processed === ProcessStatus.EXCEEDED_GUESS_LIMIT) {
      console.log("You lose!");
      Deno.exit(0);
    }

    console.log(game.dashes());
  }
}

main();
