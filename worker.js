import { parentPort } from "worker_threads";
import EventManager from "./EventManager.js";
const eventManager = EventManager.sharedInstance();

let publisher;
parentPort.on("message", ({ command, args }) => {
    switch (command) {
        case "init":
            publisher = args;
            break;

        case "addEvent":
            eventManager.add({
                ...args,
                publisher,
                handler: new Function("return " + args.handler)(),
            });

            console.log(eventManager.stringify());
            break;
    }
});
