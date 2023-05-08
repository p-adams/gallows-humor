import { BufReader } from "https://deno.land/std@0.170.0/io/mod.ts";
import { Game } from "./game.ts";

async function main() {
  const reader = new BufReader(Deno.stdin);
  const game = new Game();
  game.greet();
  while (true) {
    const $line = await reader.readString("\n");
    const line = $line?.trim();
    if (!line) {
      console.log("Goodbye!");
      Deno.exit(0);
    }
    game.process(line);
  }
}

main();
