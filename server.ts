import net from "node:net";
import { checkOut } from "./server.commands.checkout";
import getMessageFor from "./server.getMessage";

const server = net.createServer(function (client) {
    const { remoteAddress, remotePort } = client;

    let message = "Client connected" + remoteAddress + remotePort;
    console.log("Client connected", remoteAddress, remotePort);
    client.write(JSON.stringify({ message, time: Date.now(), length: message.length }));

    const getMessage = getMessageFor(client);

    client.on("data", getMessage);

    client.on("end", function () {
        //checkOut(loggedIn, client);
        console.log("Client disconnected");
    });
});

server.listen(2024, function () {
    console.log("Server listening for connection");
});
