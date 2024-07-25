import EventManager from "./EventManager.js";
import Subscriber from "./Subscriber.js";
import Publisher from "./Publisher.js";
import Event from "./event.js";

const eventManager = EventManager.sharedInstance();
const publisherA = new Publisher("albumModel");
const subscriberA = new Subscriber("subscriberA");

eventManager.add(subscriberA, "eventA", publisherA, new Event("eventA", publisherA));
eventManager.add(subscriberA, "eventB", publisherA, new Event("eventB", publisherA));

 console.log(eventManager.stringify());

eventManager.postEvent("eventA", undefined);
