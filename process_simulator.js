import { malloc, free } from "./HeapSegment.js";
import Pointer from "./Pointer.js";
import { locate, step } from "./TextSegment.js";
import { set_size } from "./type_manager.js";

function process_simulator() {
    set_size("INT", 4);
    set_size("BOOL", 1);
    malloc("INT", 4);
    free(new Pointer(0));
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
