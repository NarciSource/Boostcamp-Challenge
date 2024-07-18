import Pointer from "./Pointer.js";
import heap, { free, heapdump } from "./Heap.js";
import stack from "./Stack.js";

export const usage = () => [...stack.usage(), ...heap.usage()];
export function garbage_collector() {
    for (const { stack_pointer } of heapdump()) {
        const stack_value = stack.get(stack_pointer);

        if (!(stack_value instanceof Pointer)) {
            free(stack_pointer);
        }
    }
}
export function reset() {
    stack.reset();
    heap.reset();
}
