import Pointer from "./Pointer.js";
import stack_segment from "./StackSegment.js";
const COMMAND_SIZE = 4;
const START_POINT = 0x100000;

class TextSegment {
    #instructions = [];
    #pc = 0; // program counter

    func_address = {};
    #final_position = 0;

    locate(func_name, codes) {
        this.func_address[func_name] = this.#final_position;
        this.#instructions = [...this.#instructions, ...codes];
        this.#final_position = this.#instructions.length;
    }

    parse(instruction) {
        const [opcode, operand] = instruction.split(" ");

        if (opcode == "CALL") {
            const func_regex = /(\w+)\(([^)]*)\)/;
            const [, func_name, func_args] = func_regex.exec(operand);

            const args = func_args.split(/,\s*/);

            return { opcode, operand: { func_name, args } };
        }
        return { opcode, operand };
    }

    step() {
        const instruction = this.#instructions[this.#pc];
        const { opcode, operand } = this.parse(instruction);

        console.log(this.#pc, opcode, operand);

        if (opcode == "CALL") {
            const { func_name, args } = operand;
            const pointer = new Pointer(this.#pc + 1);

            stack_segment.push(pointer);

            this.#pc = this.func_address[func_name];
        } else if (opcode == "RETURN") {
            const pointer = stack_segment.pop();

            this.#pc = pointer.address;
        } else {
            this.#pc++;
        }
    }
}

const text_segment = new TextSegment();
export const locate = text_segment.locate.bind(text_segment);
export const step = text_segment.step.bind(text_segment);
