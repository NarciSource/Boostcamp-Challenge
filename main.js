import Publisher from "./Publisher.js";
import Subscriber from "./Subscriber.js";

const loginComponent = new Publisher("loginComponent");
const searchComponent = new Publisher("searchComponent");
const widgetComponent = new Publisher("widgetComponent");

const subscriberA = new Subscriber("subscriberA");
const subscriberB = new Subscriber("subscriberB");

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
loginComponent.on("click", {
    subscriber: subscriberA,
    handler,
    emitter_type: "sync",
});

searchComponent.on("click", {
    subscriber: subscriberB,
    handler,
    emitter_type: "sync",
});

widgetComponent.on("click", {
    subscriber: subscriberB,
    handler,
    emitter_type: "sync",
});

loginComponent.on("hover", {
    subscriber: subscriberB,
    handler,
    emitter_type: "delay",
    delay: 5000,
});

loginComponent.on("keyboard", {
    subscriber: subscriberA,
    handler,
    emitter_type: "sync",
});

loginComponent.on("keyboard", {
    subscriber: subscriberB,
    handler,
    emitter_type: "sync",
});

loginComponent.on("focus", {
    subscriber: subscriberA,
    handler,
    emitter_type: "sync",
});

loginComponent.on("click", {
    subscriber: subscriberA,
    handler,
    emitter_type: "async",
});

loginComponent.on("hover", {
    subscriber: subscriberB,
    handler,
    emitter_type: "async",
});

loginComponent.trigger("click", "right");
searchComponent.trigger("click", "right");
widgetComponent.trigger("click", "right");
