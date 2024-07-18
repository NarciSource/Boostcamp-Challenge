import { set_size as _set_size } from "./type_manager.js";
import { locate as _locate, step as _step, pc } from "./TextSegment.js";
import { reset as _reset, usage } from "./util.js";
import { heapdump } from "./HeapSegment.js";

function sleep(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds) {}
}

function monitor(func) {
    return function (...args) {
        console.clear();
        console.log(func.name.replace("bound ", ""), ...args);
        console.log("----------------------------");
        console.log("Program Counter", pc())
        console.log("Memory usage", usage());
        console.log("Heap Dump", heapdump());
        sleep(1000);
        return func.apply(this, args);
    };
}

export const set_size = monitor(_set_size);
export const locate = monitor(_locate);
export const step = monitor(_step);
export const reset = monitor(_reset);
