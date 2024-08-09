import Vorpal, { Args } from "vorpal";
import client, { sendMessage } from "./client.connect";

const cli = new Vorpal();

cli.command("checkin <camperId>", "Check in to the server.").action(async function ({
    camperId,
}: Args) {
    sendMessage("checkin", { camperId });
});

cli.command("checkout", "Check out to the server.").action(async function () {
    sendMessage("checkout");
    client.end();
});

cli.command("chat maxCount=<maxCount>", "Enable the chat.").action(async function ({
    maxCount,
}): Args {
    sendMessage("chat", { maxCount });
});

cli.command("finish", "Disable the chat.").action(async function () {
    sendMessage("finish");
});

cli.command(`broadcast [message]`, "Send a message to my group.").action(async function ({
    message,
}: Args) {
    sendMessage("broadcast", { message });
});

cli.command(`direct to <targetId> [message]`, "Send a direct message to a specific member").action(
    async function ({ targetId, message }: Args) {
        sendMessage("direct", { targetId, message });
    },
);

cli.command("summary <day>", "Obtain a keyword summary of the day.").action(async function ({
    day,
}: Args) {
    sendMessage("summary", { day });
});

cli.command("clap", "Ask for the total request count from all clients.").action(async function () {
    sendMessage("clap");
});

cli.command("!history").action(async function () {
    for (const [idx, command] of Object.entries(cli.cmdHistory._hist)) {
        console.log(`${Number(idx) + 1} ${command}`);
    }
});

cli.delimiter("$").show();
