import { get_size } from "./type_manager.js";
import Pointer, { PCPointer } from "./Pointer.js";
import heap, { malloc } from "./Heap.js";
import stack from "./Stack.js";

const address_manager = {};

export const commands = {
    VAR(var_name, type, count = 1) {
        const heap_pointer = malloc(type, count);

        address_manager[var_name] = heap_pointer;
    },
    RETURN(value) {
        let pointer;
        while (!((pointer = stack.pop()) instanceof PCPointer)) {}
        stack.push({ value, size: 4 });
        return pointer;
    },
    SET(var_name, value, index = 0) {
        const heap_pointer = address_manager[var_name];
        const { type, address } = heap.get(heap_pointer);
        const indexed_address = address + index * get_size(type);

        if (value == "$RETURN") {
            value = stack.pop().value;
        }

        const pointer = new Pointer(indexed_address);
        heap.save(pointer, value);
    },
};
