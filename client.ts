import net from "node:net";
import readline from "readline";

const client = net.createConnection({ host: "localhost", port: 2024 }, () => {
  console.log("Connected");
});

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

r1.on("line", async (input) => {
  client.write(input);
});

client.on("data", (data) => {
  console.log(data.toString());
});

client.on("error", (error) => {
  console.error(error);
});
