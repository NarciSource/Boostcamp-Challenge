import manager from "./Manager.js";

export default class POS {
    regex = /^(1|2|3):(\d)$/;

    input(input) {
        switch (input) {
            case "":
                return;
            case "exit":
                return "exit";
            default:
                const [, type, num] = this.regex.exec(input);

                const parcels = new Array(parseInt(num)).fill(
                    { 1: "small", 2: "medium", 3: "large" }[type],
                );

                manager.reception(parcels);
        }
    }
}
