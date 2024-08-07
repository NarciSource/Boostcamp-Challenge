import net from "node:net";

const server = net.createServer(function (client) {
  const { remoteAddress, remotePort } = client;

  console.log("Client connected", remoteAddress, remotePort);

  let buffer = "";
  const encoder = new TextEncoder();

  client.on("data", function (data) {
    const message = data.toString();
    const view = encoder.encode(message);
    buffer += message;

    // window 줄넘김 = \r\n
    if ((message == "\r\n" || message == "\n") && view.length <= 1024 && buffer.length >= 4) {
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
