import EventManager from "./EventManager.js";

const eventManager = EventManager.sharedInstance();

const subscriberA = {
    handler: (event) => {
        console.log(event);
    },
};

eventManager.add(subscriberA, "eventA", "albumModel", subscriberA.handler);
eventManager.add(subscriberA, "eventB", "albumModel", subscriberA.handler);

console.log(eventManager.stringify());
