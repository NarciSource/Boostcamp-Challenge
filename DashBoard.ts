import manager from "./Manager";

class DashBoard {
    display() {
        setInterval(() => {
            console.log("물류 분류 전", manager.event_looper.ready_queue);
            console.log("배달 전", manager.event_looper.active_queue);
        }, 3000);
    }
}

export default new DashBoard();
