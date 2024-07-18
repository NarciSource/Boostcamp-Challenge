const type_manager = {};

export function set_size(type, byte) {
    if (type_manager[type] || ![1, 2, 4, 8, 16, 31].includes(byte)) {
        throw "Failure set type";
    } else {
        type_manager[type] = byte;
    }
}
export function get_size(type) {
    if (type_manager[type]) {
        return type_manager[type];
    } else {
        throw "Not exist";
    }
}
