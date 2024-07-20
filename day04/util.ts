import Pointer from "./Pointer";
import heap, { free, heapdump } from "./Heap";
import stack from "./Stack";

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
