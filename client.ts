import Vorpal, { Args } from "vorpal";
import { sendMessage } from "./client.connect";

const cli = new Vorpal();

cli.command("checkin <camperId>", "Check in to the server.").action(async function ({
    camperId,
}: Args) {
    sendMessage("checkin", { camperId });
});

cli.command("checkout", "Check out to the server.").action(async function () {
    sendMessage("checkout");
});

cli.command("chat", "Enable the chat.").action(async function () {
    sendMessage("chat");
});

cli.command("finish", "Disable the chat.").action(async function () {
    sendMessage("finish");
});

cli.command(`broadcast "[message]"`, "Send a message to my group.").action(async function ({
    message,
}: Args) {
    sendMessage("broadcast", { message });
});

cli.command(
    `direct to <targetId> "[message]"`,
    "Send a direct message to a specific member",
).action(async function ({ targetId, message }: Args) {
    sendMessage("direct", { targetId, message });
});

cli.command("summary <day>", "Obtain a keyword summary of the day.").action(async function ({
    day,
}: Args) {
    sendMessage("summary", { day });
});

cli.command("clap", "Ask for the total request count from all clients.").action(async function () {
    sendMessage("clap");
});

cli.delimiter("$").show();
