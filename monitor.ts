import { set_size as _set_size } from "./type_manager";
import { locate as _locate, step as _step, pc } from "./Text";
import { heapdump } from "./Heap";
import { reset as _reset, usage } from "./util";
import { dump as call_stack } from "./Stack";

function sleep(milliseconds: number): void {
    const start = Date.now();
    while (Date.now() - start < milliseconds) {}
}

function monitor(func: Function) {
    return function (...args: any): Function {
        console.clear();
        console.log(func.name.replace("bound ", ""), ...args);
        console.log("----------------------------");
        console.log("Program Counter", pc());
        console.log("Memory usage", usage());
        console.log("Stack Dump", call_stack().map(JSON.stringify).toString());
        console.log("Heap Dump", heapdump());
        sleep(1000);
        return func.apply(this, args);
    };
}

export const set_size = monitor(_set_size);
export const locate = monitor(_locate);
export const step = monitor(_step);
export const reset = monitor(_reset);
