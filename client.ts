import net from "node:net";
import cli from "./client.cli";
import getMessage from "./client.getMessage";

const connectionInformation = { host: "localhost", port: 2024 };

const client = net.createConnection(connectionInformation, () => {
  console.log("Connected");
});

client.on("data", getMessage);

client.on("error", (error) => {
  console.error(error);
});

client.on("end", () => {});

cli();

export default client;
