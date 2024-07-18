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

        // stack push
        const stack_pointer = stack_segment.push(new Pointer(this.#hp));

        // heap push
        const data = {
            type,
            address: this.#hp,
            size,
            stack_pointer,
        };
        this.#allocated[this.#hp] = data;
        this.#hp += size;
        this.#size += size;
    }

    free(stack_address) {
        const heap_pointer = stack_segment.get(stack_address);

        if (heap_pointer.address < ALLOCATED_HEAP_SIZE) {
            try {
                const address = heap_pointer.address;
                const size = this.#allocated[address].size;

                delete this.#allocated[address];
                this.#size -= size;
            } catch {
                throw "No found address";
            }
        } else {
            throw "Address out of heap range";
        }
    }
    usage() {
        return [ALLOCATED_HEAP_SIZE, this.#size, ALLOCATED_HEAP_SIZE - this.#size];
    }
    heapdump() {
        return Object.values(this.#allocated);
    }
}

const heap_segment = new HeapSegment();
export default heap_segment;
export const malloc = heap_segment.malloc.bind(heap_segment);
export const free = heap_segment.free.bind(heap_segment);
export const heapdump = heap_segment.heapdump.bind(heap_segment);
