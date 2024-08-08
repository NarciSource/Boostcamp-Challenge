import net from "node:net";
import { CamperId } from "./server.type";
import Request from "./protocol.Request";
import runCommand from "./server.runCommand";
import checkout from "./server.commands.checkout";
import { getError } from "./server.code";
import postMessage from "./server.postMessage";
import postError from "./server.postError";

const server = net.createServer(function (client) {
    const { remoteAddress, remotePort } = client;

    const message = `Client connected ${remoteAddress} ${remotePort}`;
    postMessage(client)(message);
    console.log(message);

    let camperId: CamperId;

    client.on("data", function (buffer: Buffer) {
        const { header: requestHeader, body: requestBody }: Request = JSON.parse(buffer.toString());

        try {
            const command = requestHeader.command;
            const requestData = requestBody.data;

            const data = runCommand(command, requestData, camperId, client);

            if (command === "checkin") {
                camperId = data;
            }
        } catch (error) {
            console.error(error);
            postError(client)(getError(error));
        }
    });

    client.on("end", function () {
        checkout({ camperId, client });
        console.log("Client disconnected");
    });

    client.on("error", (error: NetworkError) => {
        if (error.code === "ECONNRESET") {
            console.error(`Connection was reset by the ${remoteAddress} ${remotePort}.`);
        } else {
            console.error("Socket error:", error);
        }
        checkout({ camperId, client });
    });
});

server.listen(2024, function () {
    console.log("Server listening for connection");
});

interface NetworkError extends Error {
    code?: string;
}
