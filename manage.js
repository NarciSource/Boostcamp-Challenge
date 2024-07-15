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

function output(timetable, waiting) {
    const maximum_time = 4;
    const progress_bar = (time) => "|🁢🁢".repeat(time) + "|  ".repeat(maximum_time - time);
    const rooms = ["A", "B", "C"];

    console.log(`        |오|전|시|간||오|후|시|간|`);
    for (const room of rooms) {
        console.log(`----------------------------------`);
        const occupied_am = timetable["AM"][room] || 0;
        const occupied_pm = timetable["PM"][room] || 0;
        const waiting_am = waiting["AM"][room] || 0;
        const waiting_pm = waiting["PM"][room] || 0;

        console.log(`회의실 ${room}${progress_bar(occupied_am)}|${progress_bar(occupied_pm)}`);
        if (waiting_am || waiting_pm) {
            console.log(`예약대기${progress_bar(waiting_am)}${progress_bar(waiting_pm)}`);
        }
    }
    console.log();
}

function process(tickets) {
    let timetable = {
        AM: {},
        PM: {},
    };
    let waiting = {
        AM: {},
        PM: {},
    };

    const regex_restrictions = /^(AM|PM)-(0[2-9]|1[0-9]|20)-([1-4])$/;

    const reservations = tickets
        .filter((ticket) => regex_restrictions.test(ticket))
        .map((ticket) => regex_restrictions.exec(ticket).splice(1, 4))
        .map(([time_period, participants, meeting_time]) => ({
            time_period,
            participants: Number(participants),
            meeting_time: Number(meeting_time),
        }))
        .map(allocated_room)
        .filter((i) => i);

    for (const { time_period, room_name, meeting_time } of reservations) {
        if (!timetable[time_period][room_name]) {
            timetable[time_period][room_name] = meeting_time;
        } else {
            waiting[time_period][room_name] = meeting_time;
        }
    }

    output(timetable, waiting);
}

process(["AM-03-2"]);
process(["AM-02-3", "PM-06-2", "AM-10-2", "PM-15-1", "PM-05-1"]);
process(["AM-02-3", "PM-06-2", "AM-04-2", "AM-10-2", "PM-15-1", "PM-05-1", "PM-08-3"]);
