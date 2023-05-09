import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";
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

Deno.test("Game: lose", () => {
  const game = new Game("meow");
  game.process("e");
  game.process("w");
  game.process("m");
  assertEquals(false, game.isWin());
});

Deno.test("Game: win", () => {
  const game = new Game("meow");
  game.process("e");
  game.process("w");
  game.process("o");
  game.process("m");
  assertEquals(true, game.isWin());
});

Deno.test("Game: single incorrect character guess", () => {
  const game = new Game("meow");
  game.process("e");
  game.process("w");
  game.process("o");
  assertEquals("_eow", game.dashes());
  game.process("x");
  assertEquals("_eow", game.dashes());
  assertEquals(["x"], game.guesses());
  game.process("y");
  assertEquals(["x", "y"], game.guesses());
});

Deno.test("Game: duplicate guess", () => {
  const game = new Game("meow");
  game.process("a");
  assertEquals("You already guessed that character", game.process("a"));
  assertEquals(["a"], game.guesses());
});
