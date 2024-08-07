import net from "node:net";
import readline from "readline";

const client = net.createConnection({ host: "localhost", port: 2024 }, () => {
  console.log("Connected");
});

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

r1.on("line", async (input) => {
  client.write(input);
});

let checkedInTime: number;

client.on("data", (data) => {
  const output = data.toString();

  console.log(output);

  if (output.includes("Client connected")) {
    checkedInTime = new Date().getTime();
  } else if (output.includes("CheckOut")) {
    const coreTime = new Date().getTime() - checkedInTime;

    const differenceInSeconds = Math.floor(coreTime / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    console.log(
      `${differenceInDays}일 ${differenceInHours}시 ${differenceInMinutes}분 ${differenceInSeconds}초`,
    );

    client.end();
  }
});

client.on("error", (error) => {
  console.error(error);
});

client.on("end", () => {});
