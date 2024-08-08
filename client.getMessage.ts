import client from "./client.connect";
import Response from "./protocol.Response";

let checkedInTime: number;

export default function getMessage(data: Buffer) {
    const { header, body }: Response = JSON.parse(data.toString());
    const message = body?.data;

    if (message?.includes("Client connected")) {
        checkedInTime = header.time;
    } else if (message?.includes("CheckOut")) {
        const coreTime = header.time - checkedInTime;

        const differenceInSeconds = Math.floor(coreTime / 1000);
        const differenceInMinutes = Math.floor(differenceInSeconds / 60);

        console.log(`Core time = ${differenceInMinutes}min ${differenceInSeconds}sec`);

        client.end();
    } else {
        console.log(message);
    }
}
