import net from "node:net";
import { checkIn } from "./checkIn";
import { checkOut } from "./checkout";
import { summary } from "./summary";
import { broadCast } from "./broadCast";
import { direct } from "./direct";
import { sendError } from "./error";
import { countClap, clap } from "./clap";

const server = net.createServer(function (client) {
  const { remoteAddress, remotePort } = client;

  console.log("Client connected", remoteAddress, remotePort);
  client.write("Client connected " + remotePort);

  let loggedIn;
  let maxCount;
  let currentCount;
  let isChat = false;
  let queue = [];
  const encoder = new TextEncoder();

  client.on("data", function (data: Buffer) {
    let message = data.toString();
    const view = encoder.encode(message);
    console.log(message);

    try {
      if (view.length <= 1024 && message.length >= 4) {
        countClap();
        const [cmd, ...params] = message.split(/\s/);
        console.log(cmd, ...params);
        switch (cmd) {
          case "checkin":
            checkIn(params[0], client);
            loggedIn = params[0];
            break;
          case "checkout":
            checkOut(loggedIn, client);
            break;
          case "summary":
            if (loggedIn) {
              summary(params[0], client);
            }
            break;
          case "chat":
            currentCount = 0;
            maxCount = params[0];
            isChat = true;
            break;
          case "broadcast":
            if (!maxCount || currentCount > maxCount) {
              throw "maxCountOver";
            } else if (!isChat) {
              throw "notIsChat";
            } else {
              currentCount++;
              broadCast(loggedIn, params[0]);
            }
            break;
          case "finish":
            isChat = false;
            break;
          case "direct":
            direct(params as [string, string, string]);
            break;
          case "clap":
            client.write(`clap count is ${clap}`);
            break;
        }

        client.write(message);
        message = "";
      }
    } catch (error) {
      sendError(error, client);
    }
  });
  client.on("end", function () {
    checkOut(loggedIn, client);
    console.log("Client disconnected");
  });
});

server.listen(2024, function () {
  console.log("Server listening for connection");
});
