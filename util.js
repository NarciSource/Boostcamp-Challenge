import heap_segment from "./HeapSegment.js";
import stack_segment from "./StackSegment.js";

export function usage() {
    return [...stack_segment.usage(), ...heap_segment.usage()];
}
