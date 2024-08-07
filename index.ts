import net from "node:net";
import { checkIn } from "./checkIn";
import { checkOut } from "./checkout";
import { summary } from "./summary";
import { broadCast } from "./broadCast";

const server = net.createServer(function (client) {
  const { remoteAddress, remotePort } = client;

  console.log("Client connected", remoteAddress, remotePort);
  client.write("Client connected " + remotePort);

  let loggedIn;
  let buffer = "";
  let maxCount;
  let currentCount;
  let isChat = false;
  const encoder = new TextEncoder();

  client.on("data", function (data: Buffer) {
    const message = data.toString();
    const view = encoder.encode(message);
    buffer += message;

    try {
      // windows 줄넘김 = \r\n
      if ((message == "\r\n" || message == "\n") && view.length <= 1024 && buffer.length >= 4) {
        const [cmd, param] = buffer.split(/\s/);

        switch (cmd) {
          case "checkin":
            checkIn(param, client);
            loggedIn = param;
            break;
          case "checkout":
            checkOut(loggedIn, client);
            break;
          case "summary":
            if (loggedIn) {
              summary(param, client);
            }
            break;
          case "chat":
            currentCount = 0;
            maxCount = param;
            isChat = true;
            break;
          case "broadcast":
            if (!maxCount || currentCount > maxCount) {
              throw "maxCountOver";
            } else if (!isChat) {
              throw "notIsChat";
            } else {
              currentCount++;
              broadCast(loggedIn, param);
            }
            break;
          case "finish":
            isChat = false;
            break;
        }

        client.write(buffer);
        buffer = "";
      }
    } catch (error) {
      console.log(error);
      switch (error) {
        case "ID_LARGER_THAN_256":
          client.write("camperId is larger than 0 and smaller than 256.\n");
          break;
        case "ID_ALREADY":
          client.write("already checked in. try another camperId.\n");
          break;
        case "maxCountOver":
          client.write("maxCount is over. please reset Count");
          break;
        case "notIsChat":
          client.write("you did not opened chat.");
          break;
      }
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
