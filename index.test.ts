import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Game } from "./game.ts";

Deno.test("Game: dashes should match word length", () => {
  const game = new Game("meow");
  assertEquals("____", game.dashes());
});

Deno.test("Game: process single character input", () => {
  const game = new Game("meow");
  assertEquals(
    [
      { letter: "m", guess: "_" },
      { letter: "e", guess: "e" },
      { letter: "o", guess: "_" },
      { letter: "w", guess: "_" },
    ],
    game.process("e")
  );
});

Deno.test("Game: process three character input", () => {
  const game = new Game("meow");
  game.process("e");
  game.process("w");
  game.process("m");
  assertEquals("me_w", game.dashes());
});
