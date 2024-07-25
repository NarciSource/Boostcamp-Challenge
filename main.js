import EventManager from "./EventManager.js";
import Subscriber from "./Subscriber.js";
import Publisher from "./Publisher.js";
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

const handler = (event, subscriber, emitter_type, delay, userInfo) => {
    console.log(
        `${subscriber.name}: ${event.run(userInfo)} ${emitter_type} ${
            delay || ""
        } ${new Date().toLocaleTimeString()}`,
    );
};

(function sync_test() {
    eventManager.add({
        subscriber: subscriberA,
        eventName: "click",
        publisher: loginComponent,
        handler,
        emitter_type: "sync",
    });
    eventManager.add({
        subscriber: subscriberB,
        eventName: "click",
        publisher: loginComponent,
        handler,
        emitter_type: "sync",
    });

    console.log(
        `click event from loginComponent:`,
        new Date().toLocaleTimeString(),
    );
    worker.postMessage({
        eventName: "click",
        publisher: loginComponent,
        userInfo: "left",
    });
})();

(function async_test() {
    eventManager.add({
        subscriber: subscriberA,
        eventName: "click",
        publisher: loginComponent,
        handler,
        emitter_type: "async",
    });

    eventManager.add({
        subscriber: subscriberB,
        eventName: "hover",
        publisher: loginComponent,
        handler,
        emitter_type: "async",
    });

    console.log(
        `click event from loginComponent:`,
        new Date().toLocaleTimeString(),
    );
    worker.postMessage({
        eventName: "click",
        publisher: loginComponent,
        userInfo: "right",
    });
})();

(function delay_test() {
    eventManager.add({
        subscriber: subscriberA,
        eventName: "hover",
        publisher: loginComponent,
        handler,
        emitter_type: "delay",
        delay: 5000,
    });

    eventManager.add({
        subscriber: subscriberB,
        eventName: "click",
        publisher: loginComponent,
        handler,
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
        userInfo: "smooth",
    });
})();

console.log(eventManager.stringify());
