import net from "node:net";
import { checkIn } from "./checkIn";

const clients = [];
const groups = {};
let groupId = 1;
let checkedIn = [];


const server = net.createServer(function (client) {
  clients.push(client);

  if (!groups[groupId]) {
    groups[groupId] = [];
  }

  groups[groupId].push(client);
  console.log(groups[groupId]);

  if (groups[groupId].length >= 4) {
    groupId++;
  }

  const { remoteAddress, remotePort } = client;

  console.log("Client connected", remoteAddress, remotePort);
  client.write("Client connected " + remotePort);

  let buffer = "";
  const encoder = new TextEncoder();

  client.on("data", function (data) {
    const message = data.toString();
    const view = encoder.encode(message);
    buffer += message;

    // windows 줄넘김 = \r\n
    if ((message == "\r\n" || message == "\n") && view.length <= 1024 && buffer.length >= 4) {
      let [cmd, camperId] = buffer.split(" ");
      
      if (checkedIn.includes(camperId)) {
        console.log('already checked in. try another camperId');
        return;  
      } else {
        checkedIn.push(camperId);
      }

      switch (cmd) {
        case "checkin":
          checkIn(camperId, client, groupId);
          break;
      }

      client.write(buffer);
      buffer = "";
    }
  });

  client.on("end", function () {
    console.log("Client disconnected");
  });
});

server.listen(2024, function () {
  console.log("Server listening for connection");
});
