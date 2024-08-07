import net from "node:net"

const server = net.createServer(function (client) {
  console.log("Client connected");
  client.on("data", function (data) {
    console.log("Client sent " + data.toString());
  });
  client.on("end", function () {
    console.log("Client disconnected");
  });
  client.write("Hello");
});

server.listen(2024, function () {
  console.log("Server listening for connection");
});
