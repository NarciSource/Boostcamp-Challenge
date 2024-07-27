import { parentPort } from "worker_threads";
import EventManager from "./EventManager.js";
const eventManager = EventManager.sharedInstance();

let publisher_name;
parentPort.on("message", ({ command, data }) => {
    switch (command) {
        case "init":
            publisher_name = data;
    }
});
