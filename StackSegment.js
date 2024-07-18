import Pointer from "./Pointer.js";
const ALLOCATED_STACK_SIZE = 512 * 1024;

class StackSegment {
    #size = 0;
    #stack = [];
    #sp = 0;

    push(value) {
        if (value.size + this.#size > ALLOCATED_STACK_SIZE) {
            throw "Stack Overflow";
        }
        this.#stack.push(value);
        this.#size += value.size;
        this.#sp++;

        return new Pointer(this.#sp);
    }
    pop() {
        if (this.#sp) {
            return this.#stack.pop();
        } else {
            throw "Stack is empty";
        }
    }
    get(pointer) {
        if (pointer.address > ALLOCATED_STACK_SIZE) {
            throw "Address out of stack range";
        }
        return this.#stack[pointer.address];
    }
    usage() {
        return [ALLOCATED_STACK_SIZE, this.#size, ALLOCATED_STACK_SIZE - this.#size];
    }
    dump() {
        return this.#stack;
    }
}
const stack_segment = new StackSegment();
export default stack_segment;
export const dump = stack_segment.dump.bind(stack_segment);
