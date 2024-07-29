import manager from "./Manager.js";
import POS from "./POS.js";
import Sorting_Worker from "./Sorting_Worker.js";

const get_input = (prompt) =>
    new Promise((resolve) => {
        process.stdout.write(prompt);
        process.stdin.once("data", (data) => resolve(data.toString().trim()));
    });

(async function main() {
    const pos = new POS();
    manager.hire([new Sorting_Worker()]);

    while (true) {
        try {
            if (pos.input(await get_input("> ")) === "exit") {
                break;
            }
        } catch (e) {
            console.error(e, "올바르지 않은 입력입니다.");
        }
    }
    process.stdin.pause();
})();
