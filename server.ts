import net from "node:net";
import { checkout } from "./server.commands.checkout";
import getMessageFor from "./server.getMessage";
import Response from "./protocol.Response";

const server = net.createServer(function (client) {
    const { remoteAddress, remotePort } = client;

    const message = `Client connected ${remoteAddress} ${remotePort}`;
    const header = { code: 200, time: Date.now() };
    const body = { data: message };
    const response = new Response(header, body);

    console.log(message);
    client.write(JSON.stringify(response));

    client.on("data", getMessageFor(client));

    client.on("end", function () {
        //checkOut(loggedIn, client);
        console.log("Client disconnected");
    });
});

server.listen(2024, function () {
    console.log("Server listening for connection");
});
