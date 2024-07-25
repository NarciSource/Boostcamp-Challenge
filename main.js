import EventManager from "./EventManager.js";
import Subscriber from "./Subscriber.js";
import Publisher from "./Publisher.js";
import Event from "./event.js";
import { Worker } from "worker_threads";

const eventManager = EventManager.sharedInstance();
const loginComponent = new Publisher("loginComponent");

const subscriberA = new Subscriber("subscriberA");
eventManager.add(
    subscriberA,
    "click",
    loginComponent,
    new Event("click-A", loginComponent),
);

const subscriberB = new Subscriber("subscriberB");
eventManager.add(
    subscriberB,
    "click",
    loginComponent,
    new Event("click-B", loginComponent),
);

const worker = new Worker("./worker.js");
worker.postMessage({});
worker.on("message", (message) => {
    eventManager.postEvent("click", loginComponent, "userInfo");

    if (message === "done") {
        worker.terminate();
    }
});

console.log(eventManager.stringify());
