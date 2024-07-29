import manager from "./Manager";

class DashBoard {
    display() {
        setInterval(() => {
            console.log("물류 분류 전", manager.logistic_queue);
            console.log("배달 전", manager.logistic_queue);
        }, 3000);
    }
}

export default new DashBoard();
