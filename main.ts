import manager from "./Manager";
import dashBoard from "./DashBoard";
import POS from "./POS";
import Classify_Worker from "./Classify_Worker";
import Delivery_Worker from "./Delivery_Worker";

const get_input = (prompt: string): Promise<string> =>
    new Promise((resolve) => {
        process.stdout.write(prompt);
        process.stdin.once("data", (data) => resolve(data.toString().trim()));
    });

(async function main() {
    const pos = new POS();

    manager.hire([new Classify_Worker(), new Classify_Worker(), new Delivery_Worker()]);
    dashBoard.display();

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
