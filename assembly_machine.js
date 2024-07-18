import Pointer, { PCPointer } from "./Pointer.js";
import heap_segment, { malloc } from "./HeapSegment.js";
import { get_size } from "./type_manager.js";
import stack_segment from "./StackSegment.js";

const address_manager = {};

export const commands = {
    VAR(var_name, type, count = 1) {
        const heap_pointer = malloc(type, count);

        address_manager[var_name] = heap_pointer;
    },
    RETURN(value) {
        let pointer;
        while (!((pointer = stack_segment.pop()) instanceof PCPointer)) {}
        stack_segment.push({ value, size: 4 });
        return pointer;
    },
    SET(var_name, value, index = 0) {
        const heap_pointer = address_manager[var_name];
        const { type, address } = heap_segment.get(heap_pointer);
        const indexed_address = address + index * get_size(type);

        if (value == "$RETURN") {
            value = stack_segment.pop().value;
        }

        const pointer = new Pointer(indexed_address);
        heap_segment.save(pointer, value);
    },
};
