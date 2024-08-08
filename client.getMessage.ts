import client from "./client";

let checkedInTime: number;

export default function getMessage(data: Buffer) {
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
}
