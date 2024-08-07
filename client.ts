import net from "node:net";
import readline from "readline";

const client = net.createConnection({ host: "localhost", port: 2024 }, () => {
  console.log("Connected");
});

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let cmdHistory = [];

r1.on("line", async (input) => {
  if (input === "!history") {
    cmdHistory.forEach((cmd, idx) => {
      console.log(`${idx + 1} ${cmd}`);
    });
  } else {
    cmdHistory.push(input);
    client.write(input);
  }
});

let checkedInTime: number;

client.on("data", (data) => {
  console.log(data.toString());
  const { message, time, length } = JSON.parse(data.toString());

  console.log(message);

  if (message.includes("Client connected")) {
    checkedInTime = new Date().getTime();
  } else if (message.includes("CheckOut")) {
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
