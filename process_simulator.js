import { locate, step } from "./TextSegment.js";

function process_simulator() {
    locate("main", ["VAR A: BOOL[4]", "VAR B: INT", "CALL foo()", "SET B=$RETURN"]);
    locate("foo", ["VAR K: INT", "RETURN 10"]);
    step();
    step();
    step();
    step();
    step();
    step();
}
process_simulator();
