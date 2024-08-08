import readline from "readline";
import client from "./client";

export default function cli() {
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let cmdHistory = [];

  r1.on("line", async (input) => {
    if (input === "!history") {
      cmdHistory.forEach((cmd, idx) => {
        console.log(`${idx + 1} ${cmd}`);
      });
    } else {
      cmdHistory.push(input);
      client.write(input);
    }
  });
}
