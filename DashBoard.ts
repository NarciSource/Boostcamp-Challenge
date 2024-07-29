import manager from "./Manager";

class DashBoard {
    display() {
        setInterval(() => {
            console.log("물류 분류 전", manager.event_looper.ready_queue.map(each=> each.constructor.name));
            console.log("문류 분류 중", manager.event_looper.active_queue.map(each=> each.constructor.name));
            console.log("배달 대기", manager.event_looper.completed_queue.map(each=> each.constructor.name));
        }, 3000);
    }
}

export default new DashBoard();
