import { BufReader } from "https://deno.land/std@0.170.0/io/mod.ts";

async function main() {
  const reader = new BufReader(Deno.stdin);
  while (true) {
    const $line = await reader.readString("\n");
    const line = $line?.trim();
    if (!line) {
      console.log("Goodbye!");
      Deno.exit(0);
    }

    console.log(`You entered: ${line}`);
  }
}

main();
