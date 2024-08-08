import client from "./client";
import Response from "./protocol.Response";

let checkedInTime: number;

export default function getMessage(data: Buffer) {
    const { header, body }: Response = JSON.parse(data.toString());

    const message = body.data;

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
