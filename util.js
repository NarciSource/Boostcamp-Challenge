import heap_segment, { free, heapdump } from "./HeapSegment.js";
import Pointer from "./Pointer.js";
import stack_segment from "./StackSegment.js";

export const usage = () => [...stack_segment.usage(), ...heap_segment.usage()];
export function garbage_collector() {
    for (const { stack_pointer } of heapdump()) {
        const stack_value = stack_segment.get(stack_pointer);

        if (!(stack_value instanceof Pointer)) {
            free(stack_pointer);
        }
    }
}
