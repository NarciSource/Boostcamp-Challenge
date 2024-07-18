import { get_size } from "./type_manager.js";
import Pointer from "./Pointer.js";
import stack from "./Stack.js";
const ALLOCATED_HEAP_SIZE = 512 * 1024;

class Heap {
    #size = 0;
    #allocated = {};
    #hp = 0;

    malloc(type, count) {
        const size = Math.max(get_size(type), 8) * count;

        // stack push
        const stack_pointer = stack.push(new Pointer(this.#hp));

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
        return new Pointer(data.address);
    }

    free(stack_pointer) {
        const heap_pointer = stack.get(stack_pointer);

        if (!(heap_pointer instanceof Pointer)) {
            throw "No pointer on stack";
        }
        if (heap_pointer.address > ALLOCATED_HEAP_SIZE) {
            throw "Address out of heap range";
        }
        try {
            const address = heap_pointer.address;
            const size = this.#allocated[address].size;

            delete this.#allocated[address];
            this.#size -= size;
        } catch {
            throw "No found address";
        }
    }

    get(pointer) {
        if (pointer.address > ALLOCATED_HEAP_SIZE) {
            throw "Address out of heap range";
        }
        return this.#allocated[pointer.address];
    }

    save(pointer, value, type) {
        const data = this.#allocated[pointer.address] || { type };
        data.value = value;

        this.#allocated[pointer.address] = data;
    }

    usage() {
        return [ALLOCATED_HEAP_SIZE, this.#size, ALLOCATED_HEAP_SIZE - this.#size];
    }
    heapdump() {
        return Object.values(this.#allocated);
    }
    reset() {
        this.#size = 0;
        this.#allocated = {};
        this.#hp = 0;
    }
}

const heap = new Heap();
export default heap;
export const malloc = heap.malloc.bind(heap);
export const free = heap.free.bind(heap);
export const heapdump = heap.heapdump.bind(heap);
