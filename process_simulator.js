import { set_size, locate, step, reset } from "./monitor.js";

function process_simulator() {
    set_size("INT", 4);
    set_size("BOOL", 1);
    locate("main", ["VAR A: BOOL[4]", "VAR B: INT", "CALL foo()", "SET B=$RETURN"]);
    locate("foo", ["VAR K: INT", "RETURN 10"]);
    step();
    step();
    step();
    step();
    step();
    reset();
}
process_simulator();
