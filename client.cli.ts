import readline from "readline";
import client from "./client";
import Request, { Header } from "./protocol.Request";
import { sliceUnderBytes } from "./utils";

export default function cli() {
    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    let cmdHistory = [];

    r1.on("line", async (input) => {
        input = sliceUnderBytes(input, 1024);

        if (input === "!history") {
            cmdHistory.forEach((cmd, idx) => {
                console.log(`${idx + 1} ${cmd}`);
            });
        } else {
            cmdHistory.push(input);

            const header: Header = {
                query_type: "",
                "Content-Type": "application/json",
            };
            const body = {
                data: input,
            };

            const request = new Request(header, body);
            client.write(JSON.stringify(request));
        }
    });
}
