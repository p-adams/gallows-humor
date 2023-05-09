import { BufReader } from "https://deno.land/std@0.170.0/io/mod.ts";
import { Game } from "./game.ts";

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
    if (processed === "You have exceeded the limit of guesses") {
      console.log("You lose!");
      Deno.exit(0);
    }

    console.log(game.dashes());
  }
}

main();
