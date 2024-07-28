import Publisher from "./Publisher.js";
import Subscriber from "./Subscriber.js";

const loginComponent = new Publisher("loginComponent");
const searchComponent = new Publisher("searchComponent");
const widgetComponent = new Publisher("widgetComponent");

const subscriberA = new Subscriber("subscriberA");
const subscriberB = new Subscriber("subscriberB");
const subscriberC = new Subscriber("subscriberC");

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
searchComponent.on("click", {
    subscriber: subscriberA,
    handler,
    emitter_type: "sync",
});

loginComponent.on("click", {
    subscriber: subscriberA,
    handler,
    emitter_type: "sync",
});

loginComponent.on("click", {
    subscriber: subscriberB,
    handler,
    emitter_type: "sync",
});

loginComponent.on("click", {
    subscriber: subscriberC,
    handler,
    emitter_type: "sync",
});

loginComponent.on("click", {
    subscriber: subscriberA,
    handler,
    emitter_type: "async",
});

loginComponent.on("click", {
    subscriber: subscriberB,
    handler,
    emitter_type: "async",
});

loginComponent.on("click", {
    subscriber: subscriberC,
    handler,
    emitter_type: "async",
});

widgetComponent.on("focus", {
    subscriber: subscriberA,
    handler,
    emitter_type: "delay",
    delay: 7000,
});

widgetComponent.on("focus", {
    subscriber: subscriberA,
    handler,
    emitter_type: "sync",
});

widgetComponent.on("hover", {
    subscriber: subscriberA,
    handler,
    emitter_type: "delay",
    delay: 3000,
});

loginComponent.on("hover", {
    subscriber: subscriberB,
    handler,
    emitter_type: "async",
});

// event trigger
loginComponent.trigger("click", "right");
loginComponent.trigger("hover", "smooth");
searchComponent.trigger("click", "right");
widgetComponent.trigger("", "monkey");

// exit
setTimeout(() => {
    loginComponent.destroy();
    searchComponent.destroy();
    widgetComponent.destroy();
}, 200000);
