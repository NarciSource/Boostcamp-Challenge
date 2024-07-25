import { parentPort } from "worker_threads";

parentPort.on("message", ({ handler }) => {
    console.log("Event 실행", handler);
    parentPort.postMessage("done");
});
