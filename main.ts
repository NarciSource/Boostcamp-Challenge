import manager from "./Manager";
import dashBoard from "./DashBoard";
import POS from "./POS";
import ClassifyWorker from "./ClassifyWorker";
import DeliveryWorker from "./DeliveryWorker";

const get_input = (prompt: string): Promise<string> =>
    new Promise((resolve) => {
        process.stdout.write(prompt);
        process.stdin.once("data", (data) => resolve(data.toString().trim()));
    });

(async function main() {
    const pos = new POS();

    const input = await get_input("작업자와 배달 기사 인원 수를 지정하세요(띄어서 입력). ");
    const [n, m] = input.split(" ");
    console.log("분류작업자: ", n, "배달 기사", m);

    for (const center of manager.logistics_centers) {
        const classify_newcomers = Array(parseInt(n))
            .fill(null)
            .map(() => new ClassifyWorker());
        const delivery_newcomers = Array(parseInt(m))
            .fill(null)
            .map(() => new DeliveryWorker());

        center.hire([...classify_newcomers, ...delivery_newcomers]);
    }
    dashBoard.display();

    while (true) {
        try {
            if (pos.input(await get_input("> ")) === "exit") {
                break;
            }
            dashBoard.monitor();
        } catch (e) {
            console.error(e, "올바르지 않은 입력입니다.");
        }
    }
    process.stdin.pause();
})();
