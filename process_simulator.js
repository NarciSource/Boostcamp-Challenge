import { malloc, free, heapdump } from "./HeapSegment.js";
import Pointer from "./Pointer.js";
import { locate, step } from "./TextSegment.js";
import { set_size } from "./type_manager.js";
import { garbage_collector, usage, reset } from "./util.js";

function process_simulator() {
    set_size("INT", 4);
    set_size("BOOL", 1);
    malloc("INT", 4);
    console.log("Heap Dump", heapdump());
    console.log("Memory usage", usage());
    free(new Pointer(0));
    garbage_collector();
    console.log("Memory usage", usage());
    locate("main", ["VAR A: BOOL[4]", "VAR B: INT", "CALL foo()", "SET B=$RETURN"]);
    locate("foo", ["VAR K: INT", "RETURN 10"]);
    step();
    step();
    step();
    step();
    step();
    step();
    reset();
}
process_simulator();
