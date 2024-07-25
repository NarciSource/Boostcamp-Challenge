import EventManager from "./EventManager.js";
import Subscriber from "./Subscriber.js";
import Publisher from "./Publisher.js";
import Event from "./event.js";
import { Worker } from "worker_threads";

const eventManager = EventManager.sharedInstance();
const publisherA = new Publisher("albumModel");
const subscriberA = new Subscriber("subscriberA");
eventManager.add(
    subscriberA,
    "eventA",
    publisherA,
    new Event("eventA", publisherA),
);
eventManager.add(
    subscriberA,
    "eventB",
    publisherA,
    new Event("eventB", publisherA),
);

const subscriberB = new Subscriber("subscriberB");
eventManager.add(
    subscriberB,
    "eventA",
    publisherA,
    new Event("eventA", publisherA),
);
eventManager.add(
    subscriberB,
    "eventB",
    publisherA,
    new Event("eventB", publisherA),
);

const subscribers = [subscriberA, subscriberB];

for (const subscriber of subscribers) {
    const worker = new Worker("./worker.js");

    worker.postMessage({ subscriber, eventName: "" });
    worker.on("message", (message) => {
        if (message === "done") worker.terminate();
    });
}

console.log(eventManager.stringify());
