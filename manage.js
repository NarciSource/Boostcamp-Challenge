function allocated_room({ time_period, participants, meeting_time }) {
    const maximum_time = 4;
    const rooms = [
        { room_name: "A", maximum_capacity: 5, maximum_time },
        { room_name: "B", maximum_capacity: 10, maximum_time },
        { room_name: "C", maximum_capacity: 20, maximum_time },
    ];

    const selected_room = rooms.find(({ maximum_capacity }) => participants <= maximum_capacity);

    if (selected_room && meeting_time <= selected_room.maximum_time) {
        return {
            time_period,
            room_name: selected_room.room_name,
            meeting_time,
        };
    } else {
        return null;
    }
}

function output(timetable) {
    console.log("timetable", timetable);
}

function process(tickets) {
    let timetable = {
        AM: {},
        PM: {},
    };

    const reservations = tickets
        .map((ticket) => ticket.split("-"))
        .map(([time_period, participants, meeting_time]) => ({
            time_period,
            participants: Number(participants),
            meeting_time: Number(meeting_time),
        }))
        .map(allocated_room)
        .filter((i) => i);

    for (const { time_period, room_name, meeting_time } of reservations) {
        timetable[time_period][room_name] = meeting_time;
    }

    output(timetable);
}

process(["AM-03-2"]);
process(["AM-02-3", "PM-06-2", "AM-10-2", "PM-15-1", "PM-05-1"]);
process(["AM-02-3", "PM-06-2", "AM-04-2", "AM-10-2", "PM-15-1", "PM-05-1", "PM-08-3"]);
