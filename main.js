import EventManager from "./EventManager.js";
import Subscriber from "./Subscriber.js";
import Publisher from "./Publisher.js";
import Event from "./event.js";
import { Worker } from "worker_threads";

const eventManager = EventManager.sharedInstance();
const loginComponent = new Publisher("loginComponent");

const subscriberA = new Subscriber("subscriberA");
eventManager.add({
    subscriber: subscriberA,
    eventName: "click",
    publisher: loginComponent,
    handler: new Event("click-A", loginComponent),
});

const subscriberB = new Subscriber("subscriberB");
eventManager.add({
    subscriber: subscriberB,
    eventName: "click",
    publisher: loginComponent,
    handler: new Event("click-B", loginComponent),
});

const worker = new Worker("./worker.js");
worker.on("message", ({ eventName, publisher, userInfo }) => {
    eventManager.postEvent({ eventName, publisher, userInfo });
    worker.terminate();
});

worker.postMessage({
    eventName: "click",
    publisher: loginComponent,
    userInfo: "userInfo",
});

console.log(eventManager.stringify());
