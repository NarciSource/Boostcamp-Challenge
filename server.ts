import net from "node:net";
import Response, { Header } from "./protocol.Response";
import { Header as RequestHeader } from "./protocol.Request";
import runCommand from "./server.runCommand";
import getErrorMessage from "./server.getErrorMessage";
import { CamperId } from "./server.manager.camper";

const server = net.createServer(function (client) {
    const { remoteAddress, remotePort } = client;

    const message = `Client connected ${remoteAddress} ${remotePort}`;
    const header = { code: 200, time: Date.now() };
    const body = { data: message };
    const response = new Response(header, body);

    let camperId: CamperId;

    console.log(message);
    client.write(JSON.stringify(response));

    client.on("data", function (buffer: Buffer) {
        const { header: requestHeader, body: requestBody }: { header: RequestHeader; body: any } =
            JSON.parse(buffer.toString());

        let capsuledMessage: string;

        try {
            const command = requestHeader.command;
            const requestData = requestBody.data;

            const data = runCommand(command, requestData, camperId, client);

            if (command === "checkin") {
                camperId = data;
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error);

            const header: Header = {
                code: 400,
                time: Date.now(),
                errorMessage,
            };
            const response = new Response(header);
            capsuledMessage = JSON.stringify(response);

            client.write(capsuledMessage);
        }
    });

    client.on("end", function () {
        //checkOut(loggedIn, client);
        console.log("Client disconnected");
    });
});

server.listen(2024, function () {
    console.log("Server listening for connection");
});
