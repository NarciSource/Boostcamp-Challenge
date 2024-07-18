import Pointer from "./Pointer.js";
import stack_segment from "./StackSegment.js";
import { get_size } from "./type_manager.js";
const ALLOCATED_HEAP_SIZE = 512 * 1024;

class HeapSegment {
    #size = 0;
    #hp = 0;
    #allocated = {};

    malloc(type, count) {
        const size = Math.max(get_size(type), 8) * count;

        const start_point = this.#hp;
        const end_point = this.#hp + size;

        this.#allocated[start_point] = end_point;
        stack_segment.push(new Pointer(start_point));

        this.#size += size;
        this.#hp = end_point;
    }

    free(stack_address) {
        const heap_pointer = stack_segment.get(stack_address);

        if (heap_pointer.address < ALLOCATED_HEAP_SIZE) {
            const start_address = heap_pointer.heap_address;
            const end_address = this.#allocated[heap_pointer.heap_address];

            delete this.#allocated[start_address];
            this.#size -= end_address - start_address;
        } else {
            throw "Address out of heap range";
        }
    }
}

const heap_segment = new HeapSegment();
export default heap_segment;
export const malloc = heap_segment.malloc.bind(heap_segment);
export const free = heap_segment.free.bind(heap_segment);
