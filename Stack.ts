import Pointer from "./Pointer";
import Scalar from "./Scalar";
const ALLOCATED_STACK_SIZE = 512 * 1024;

export type StackPointer = Pointer;

class Stack {
    #size = 0;
    #stack: (Pointer | Scalar)[] = [];
    #sp = 0;

    push(value: Pointer | Scalar) {
        if (value.size + this.#size > ALLOCATED_STACK_SIZE) {
            throw "Stack Overflow";
        }
        this.#stack.push(value);
        this.#size += value.size;
        this.#sp++;

        return new Pointer(this.#sp);
    }
    pop(): Pointer | Scalar {
        if (this.#sp) {
            return this.#stack.pop();
        } else {
            throw "Stack is empty";
        }
    }
    get(pointer: StackPointer): Pointer | Scalar {
        if (pointer.address > ALLOCATED_STACK_SIZE) {
            throw "Address out of stack range";
        }
        return this.#stack[pointer.address];
    }
    usage(): [Number, Number, Number] {
        return [ALLOCATED_STACK_SIZE, this.#size, ALLOCATED_STACK_SIZE - this.#size];
    }
    dump(): (Pointer | Scalar)[] {
        return this.#stack;
    }
    reset() {
        this.#size = 0;
        this.#stack = [];
        this.#sp = 0;
    }
}

const stack = new Stack();
export default stack;
export const dump = stack.dump.bind(stack);
