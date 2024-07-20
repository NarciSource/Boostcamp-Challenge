import Pointer from "./Pointer";
import { commands } from "./assembly_machine";
import stack from "./Stack";
const COMMAND_SIZE = 4;
const START_POINT = 0x100000;

export class TextPointer extends Pointer {
    func_name: string;

    constructor(address: number, name: string) {
        super(address);
        this.func_name = name;
    }
}

class Text {
    #instructions: string[] = [];
    #pc = 0; // program counter

    func_address: { [key: string]: number } = {};
    #final_position = 0;

    locate(func_name: string, codes: string[]) {
        this.func_address[func_name] = this.#final_position;
        this.#instructions = [...this.#instructions, ...codes];
        this.#final_position = this.#instructions.length;
    }

    step() {
        const instruction = this.#instructions[this.#pc];
        const split_regex = /^(\w+) (.*)/;
        const [, opcode, operand] = split_regex.exec(instruction);

        switch (opcode) {
            case "VAR": {
                const var_regex = /(\w+)\s*:\s*(\w+)(?:\[(\d+)\])?/;
                const [, var_name, type, count] = var_regex.exec(operand);

                commands[opcode](var_name, type, parseInt(count) || 1);

                this.#pc++;
                break;
            }
            case "CALL": {
                const func_regex = /(\w+)\(([^)]*)\)/;
                const [, func_name, func_args] = func_regex.exec(operand);

                const pointer = new TextPointer(this.#pc + 1, func_name);

                stack.push(pointer);

                this.#pc = this.func_address[func_name];
                break;
            }
            case "RETURN": {
                const pointer = commands[opcode](operand);

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

                commands[opcode](var_name, value, parseInt(index) || 0);

                this.#pc++;
                break;
            }
        }
    }
    pc(): Number {
        return this.#pc;
    }
}

const text = new Text();
export const locate = text.locate.bind(text);
export const step = text.step.bind(text);
export const pc = text.pc.bind(text);
