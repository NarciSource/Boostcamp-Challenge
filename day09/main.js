import EventManager from "./EventManager.js";
import Publisher from "./Publisher.js";
import Subscriber from "./Subscriber.js";

const loginComponent = new Publisher("loginComponent");
const searchComponent = new Publisher("searchComponent");
const widgetComponent = new Publisher("widgetComponent");

const subscriberA = new Subscriber("subscriberA");
const subscriberB = new Subscriber("subscriberB");
const subscriberC = new Subscriber("subscriberC");

const handler = (result, managersGuide) => {
    const { subscriber, emitter_type, delay } = managersGuide;
    const time = new Date().toLocaleTimeString();

    console.log(
        `${subscriber.name}: ${result} ${time} ${emitter_type} ${delay || ""}`,
    );
};

// subscribe
const subscribe_commands = [
    [searchComponent, ["click", subscriberA, "sync"]],
    [widgetComponent, ["focus", subscriberA, "delay", 7000]],
    [widgetComponent, ["focus", subscriberB, "sync"]],
    [widgetComponent, ["hover", subscriberA, "delay", 3000]],
    [loginComponent, ["click", subscriberA, "sync"]],
    [loginComponent, ["click", subscriberB, "sync"]],
    [loginComponent, ["click", subscriberC, "sync"]],
    [loginComponent, ["click", subscriberA, "async"]],
    [loginComponent, ["click", subscriberB, "async"]],
    [loginComponent, ["click", subscriberC, "async"]],
    [loginComponent, ["hover", subscriberB, "async"]],
];

for (const [
    publisher,
    [eventName, subscriber, emitter_type, delay],
] of subscribe_commands) {
    publisher.on(eventName, { subscriber, handler, emitter_type, delay });
}

// stringify
const eventManager = EventManager.sharedInstance();
console.log(eventManager.stringify());
console.log();

// event trigger
loginComponent.trigger("click", "right");
loginComponent.trigger("hover", "smooth");
searchComponent.trigger("click", "right");
widgetComponent.trigger("", "monkey");

setTimeout(() => eventManager.offAll(), 20000);
