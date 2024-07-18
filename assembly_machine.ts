import { get_size, type } from "./type_manager";
import Pointer, { ReturnPointer } from "./Pointer";
import heap, { malloc } from "./Heap";
import stack from "./Stack";
import { TextPointer } from "./Text";

const address_manager: { [key: string]: Pointer } = {};

export const commands = {
    VAR(var_name: string, type: type, count = 1) {
        const heap_pointer = malloc(type, count);

        address_manager[var_name] = heap_pointer;
    },
    RETURN(value: string): Pointer {
        let pointer: Pointer;
        while (!((pointer = stack.pop()) instanceof TextPointer)) {}
        stack.push(new ReturnPointer(4, value));
        return pointer;
    },
    SET(var_name: string, value: string, index = 0) {
        const heap_pointer = address_manager[var_name];
        const { type, address } = heap.get(heap_pointer);
        const indexed_address = address + index * get_size(type);

        if (value == "$RETURN") {
            value = (stack.pop() as ReturnPointer).value;
        }

        const pointer = new Pointer(indexed_address);
        heap.save(pointer, value, type);
    },
};
