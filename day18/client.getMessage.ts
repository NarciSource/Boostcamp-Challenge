import { NestedMessage } from "./client.type";
import client from "./client.connect";
import Response from "./protocol.Response";

let checkedInTime: number;

export default function getMessage(data: Buffer) {
    const { header, body }: Response = JSON.parse(data.toString());
    const message: string | NestedMessage = body?.data;

    if (header.code === 200) {
        if (typeof message !== "string") {
            if (message?.extra === "checkin") {
                checkedInTime = header.time;
            } else if (message?.extra === "checkout") {
                const coreTime = header.time - checkedInTime;

                const differenceInSeconds = Math.floor(coreTime / 1000);
                const differenceInMinutes = Math.floor(differenceInSeconds / 60);

                console.log(`Core time = ${differenceInMinutes}min ${differenceInSeconds}sec`);

                client.end();
            }
            console.log(message.message);
        } else {
            console.log(message);
        }
    } else {
        console.log(header.code, header.errorMessage);
    }
}
