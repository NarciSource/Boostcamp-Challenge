import net from "node:net";

const clients = [];

const server = net.createServer(function (client) {
  clients.push(client);

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
      for (const client of clients) {
        client.write(buffer);
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
