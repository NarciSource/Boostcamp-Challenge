import { get_size, type } from "./type_manager";
import Pointer from "./Pointer";
import stack, { StackPointer } from "./Stack";
import Scalar from "./Scalar";
const ALLOCATED_HEAP_SIZE = 512 * 1024;

export class HeapPointer extends Pointer {
    #type: string;
    #size: number;
    #stack_pointer: StackPointer;
    value: string;

    constructor(address: number, type: string, size: number, stack_pointer?: StackPointer) {
        super(address);
        this.#type = type;
        this.#size = size;
        this.#stack_pointer = stack_pointer;
    }

    get type() {
        return this.#type;
    }
    get stack_pointer() {
        return this.#stack_pointer;
    }
}

class Heap {
    #size = 0;
    #allocated: { [key: string]: HeapPointer } = {};
    #hp = 0;

    malloc(type: type, count: number = 1): HeapPointer {
        const size = Math.max(get_size(type), 8) * count;

        // stack push
        const stack_pointer = stack.push(new Pointer(this.#hp));

        // heap push
        const pointer = new HeapPointer(this.#hp, type, size, stack_pointer);
        this.#allocated[this.#hp] = pointer;
        this.#hp += size;
        this.#size += size;
        return pointer;
    }

    free(stack_pointer: StackPointer) {
        const pointer: Pointer | Scalar = stack.get(stack_pointer);

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

    get(pointer: HeapPointer): HeapPointer {
        if (pointer.address > ALLOCATED_HEAP_SIZE) {
            throw "Address out of heap range";
        }
        return this.#allocated[pointer.address];
    }

    save(pointer: Pointer, value: string, type: type) {
        const data = this.#allocated[pointer.address] || new HeapPointer(pointer.address, type, 4);
        data.value = value;

        this.#allocated[pointer.address] = data;
    }

    usage(): [Number, Number, Number] {
        return [ALLOCATED_HEAP_SIZE, this.#size, ALLOCATED_HEAP_SIZE - this.#size];
    }
    heapdump(): Object[] {
        return Object.values(this.#allocated).map(({ type, size, value }) => ({ type, size, value }));
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
