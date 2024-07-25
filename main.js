import EventManager from "./EventManager.js";
import Subscriber from "./Subscriber.js";
import Publisher from "./Publisher.js";
import { Worker } from "worker_threads";

const eventManager = EventManager.sharedInstance();
const loginComponent = new Publisher("loginComponent");
const subscriberA = new Subscriber("subscriberA");
const subscriberB = new Subscriber("subscriberB");

const triggerHandler = ({ eventName, publisher }) => {
    console.log(
        `----${eventName} event trigger from ${publisher.name}:`,
        new Date().toLocaleTimeString(),
    );
};
const handler = (event, userInfo, managersGuide) => {
    const { subscriber, emitter_type, delay } = managersGuide;

    console.log(
        `${subscriber.name}: ${event.run(
            userInfo,
        )} ${new Date().toLocaleTimeString()} ${emitter_type} ${delay || ""}`,
    );

    event.completed = true;
};

// subscribe
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
        delay: 100,
    });
})();

(function sync_test() {
    eventManager.add({
        subscriber: subscriberA,
        eventName: "keyboard",
        publisher: loginComponent,
        handler,
        emitter_type: "sync",
    });
    eventManager.add({
        subscriber: subscriberB,
        eventName: "keyboard",
        publisher: loginComponent,
        handler,
        emitter_type: "sync",
    });
})();

(function sync2_test() {
    eventManager.add({
        subscriber: subscriberA,
        eventName: "focus",
        publisher: loginComponent,
        handler,
        emitter_type: "sync",
    });
    eventManager.add({
        subscriber: subscriberB,
        eventName: "focus",
        publisher: loginComponent,
        handler,
        emitter_type: "sync",
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
})();

// trigger
const click_worker = new Worker("./worker.js");
const keyboard_worker = new Worker("./worker.js");
const focus_worker = new Worker("./worker.js");
const hover_worker = new Worker("./worker.js");

const workers = [keyboard_worker, focus_worker, click_worker, hover_worker];

for (const worker of workers) {
    worker.on("message", (args) => {
        triggerHandler(args);
        eventManager.postEvent(args);
        worker.terminate();
    });
}

click_worker.postMessage({
    eventName: "click",
    publisher: loginComponent,
    userInfo: "right",
});

hover_worker.postMessage({
    eventName: "hover",
    publisher: loginComponent,
    userInfo: "smooth",
});

keyboard_worker.postMessage({
    eventName: "keyboard",
    publisher: loginComponent,
    userInfo: "left",
});

focus_worker.postMessage({
    eventName: "focus",
    publisher: loginComponent,
    userInfo: "one",
});

// stringify
console.log("모든 Subscriber 조건");
console.log(eventManager.stringify());
console.log();
