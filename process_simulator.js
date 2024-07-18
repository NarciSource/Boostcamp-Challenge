const { TextSegment } = require("./TextSegment");

const text_segment = new TextSegment();

function process_simulator() {
    text_segment.locate("main", ["VAR A: BOOL[4]", "VAR B: INT", "CALL foo()", "SET B=$RETURN"]);
    text_segment.locate("foo", ["VAR K: INT", "RETURN 10"]);
    text_segment.step();
    text_segment.step();
    text_segment.step();
    text_segment.step();
    text_segment.step();
    text_segment.step();
}
process_simulator();
