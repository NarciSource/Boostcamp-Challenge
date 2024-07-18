import { commands } from "./assembly_machine.js";
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

    step() {
        const instruction = this.#instructions[this.#pc];
        const split_regex = /^(\w+) (.*)/;
        const [, opcode, operand] = split_regex.exec(instruction);

        console.log(this.#pc, opcode, operand);

        switch (opcode) {
            case "VAR": {
                const var_regex = /(\w+)\s*:\s*(\w+)(?:\[(\d+)\])?/;
                const [, var_name, type, count] = var_regex.exec(operand);

                commands[opcode](var_name, type, count);

                this.#pc++;
                break;
            }
            case "CALL": {
                const func_regex = /(\w+)\(([^)]*)\)/;
                const [, func_name, func_args] = func_regex.exec(operand);

                const pointer = new Pointer(this.#pc + 1);

                stack_segment.push(pointer);

                this.#pc = this.func_address[func_name];
                break;
            }
            case "RETURN": {
                const pointer = stack_segment.pop();

                this.#pc = pointer.address;
                break;
            }
            case "RELEASE": {
                commands[opcode]();
                this.#pc++;
                break;
            }
            case "SET": {
                const set_regex = /(\w+)(?:\[(\d+)\])?\s*=\s*([$\w]+)/;
                const [, var_name, index, value] = set_regex.exec(operand);

                commands[opcode](var_name, value, index);

                this.#pc++;
                break;
            }
        }
    }
}

const text_segment = new TextSegment();
export const locate = text_segment.locate.bind(text_segment);
export const step = text_segment.step.bind(text_segment);
