import Pointer from "./Pointer.js";
import heap_segment, { malloc } from "./HeapSegment.js";
import { get_size } from "./type_manager.js";

const address_manager = {};

export const commands = {
    VAR(var_name, type, count = 1) {
        const heap_pointer = malloc(type, count);

        address_manager[var_name] = heap_pointer;
    },
    SET(var_name, value, index = 0) {
        const heap_pointer = address_manager[var_name];
        const { type, address } = heap_segment.get(heap_pointer);

        const data = {
            type,
            address: address + index * get_size(type),
            size: get_size(type),
            value,
        };
        const pointer = new Pointer(data.address);
        heap_segment.save(pointer, data);
    },
};
