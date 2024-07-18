import { get_size, type } from "./type_manager";
import Pointer from "./Pointer";
import stack, { StackPointer } from "./Stack";
const ALLOCATED_HEAP_SIZE = 512 * 1024;

export type HeapPointer = Pointer;

interface HeapData {
    type: type;
    address: number;
    size: number;
    stack_pointer: StackPointer;
    value?: string;
}

class Heap {
    #size = 0;
    #allocated: { [key: string]: HeapData } = {};
    #hp = 0;

    malloc(type: type, count: number = 1): Pointer {
        const size = Math.max(get_size(type), 8) * count;

        // stack push
        const stack_pointer = stack.push(new Pointer(this.#hp));

        // heap push
        const data: HeapData = {
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

    free(stack_pointer: StackPointer) {
        const pointer: HeapPointer = stack.get(stack_pointer);

        if (!(pointer instanceof Pointer)) {
            throw "No pointer on stack";
        }
        if (pointer.address > ALLOCATED_HEAP_SIZE) {
            throw "Address out of heap range";
        }
        try {
            const address = pointer.address;
            const size = this.#allocated[address].size;

            delete this.#allocated[address];
            this.#size -= size;
        } catch {
            throw "No found address";
        }
    }

    get(pointer: HeapPointer): HeapData {
        if (pointer.address > ALLOCATED_HEAP_SIZE) {
            throw "Address out of heap range";
        }
        return this.#allocated[pointer.address];
    }

    save(pointer: Pointer, value: string, type: type) {
        const data = this.#allocated[pointer.address] || ({ type, address: pointer.address, size: 4 } as HeapData);
        data.value = value;

        this.#allocated[pointer.address] = data;
    }

    usage(): [Number, Number, Number] {
        return [ALLOCATED_HEAP_SIZE, this.#size, ALLOCATED_HEAP_SIZE - this.#size];
    }
    heapdump(): HeapData[] {
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
