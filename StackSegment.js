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
    }
    pop() {
        if (this.#sp) {
            return this.#stack.pop();
        } else {
            throw "Stack is empty";
        }
    }
}
const stack_segment = new StackSegment();
export default stack_segment;
