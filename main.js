import EventManager from "./EventManager.js";
import Subscriber from "./Subscriber.js";
import Publisher from "./Publisher.js";
import Event from "./event.js";
import { Worker } from "worker_threads";

const eventManager = EventManager.sharedInstance();
const loginComponent = new Publisher("loginComponent");

const worker = new Worker("./worker.js");
worker.on("message", (args) => {
    eventManager.postEvent(args);
    worker.terminate();
});

const subscriberA = new Subscriber("subscriberA");
const subscriberB = new Subscriber("subscriberB");

(function sync_test() {
    eventManager.add({
        subscriber: subscriberA,
        eventName: "click",
        publisher: loginComponent,
        handler: new Event("click-A", loginComponent),
        emitter_type: "sync",
    });
    eventManager.add({
        subscriber: subscriberB,
        eventName: "click",
        publisher: loginComponent,
        handler: new Event("click-B", loginComponent),
        emitter_type: "sync",
    });

    console.log(
        `click event from loginComponent:`,
        new Date().toLocaleTimeString(),
    );
    worker.postMessage({
        eventName: "click",
        publisher: loginComponent,
        userInfo: "userInfo",
    });
})();

(function async_test() {
    eventManager.add({
        subscriber: subscriberA,
        eventName: "click",
        publisher: loginComponent,
        handler: new Event("click-C", loginComponent),
        emitter_type: "async",
    });

    eventManager.add({
        subscriber: subscriberB,
        eventName: "hover",
        publisher: loginComponent,
        handler: new Event("hover-D", loginComponent),
        emitter_type: "async",
    });

    console.log(
        `click event from loginComponent:`,
        new Date().toLocaleTimeString(),
    );
    worker.postMessage({
        eventName: "click",
        publisher: loginComponent,
        userInfo: "userInfo",
    });
})();

(function delay_test() {
    eventManager.add({
        subscriber: subscriberA,
        eventName: "hover",
        publisher: loginComponent,
        handler: new Event("hover-E", loginComponent),
        emitter_type: "delay",
        delay: 5000,
    });

    eventManager.add({
        subscriber: subscriberB,
        eventName: "click",
        publisher: loginComponent,
        handler: new Event("click-F", loginComponent),
        emitter_type: "delay",
        delay: 2000,
    });

    console.log(
        `hover event from loginComponent:`,
        new Date().toLocaleTimeString(),
    );
    worker.postMessage({
        eventName: "hover",
        publisher: loginComponent,
        userInfo: "userInfo",
    });
})();

console.log(eventManager.stringify());
