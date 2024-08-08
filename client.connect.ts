import net from "node:net";
import getMessage from "./client.getMessage";
import Request, { Header } from "./protocol.Request";

const connectionInformation = { host: "localhost", port: 2024 };

const client = net.createConnection(connectionInformation, () => {});

client.on("data", getMessage);

client.on("error", (error) => {
    console.error(error);
    process.exit();
});

client.on("end", () => {
    console.log("Done.");
    process.exit();
});

export function sendMessage(command: string, data?: any) {
    const header: Header = {
        command,
    };
    const body = {
        data,
    };
    const request = new Request(header, body);
    client.write(JSON.stringify(request));
}

export default client;
