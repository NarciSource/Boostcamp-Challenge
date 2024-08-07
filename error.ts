export function sendError(error, client) {
  switch (error) {
    case "ID_LARGER_THAN_256": {
      const message = "camperId is larger than 0 and smaller than 256.\n";
      client.write(JSON.stringify({ message, time: Date.now(), length: message.length }));
      break;
    }
    case "ID_ALREADY": {
      const message = "already checked in. try another camperId.\n";
      client.write(JSON.stringify({ message, time: Date.now(), length: message.length }));
      break;
    }
    case "maxCountOver": {
      const message = "maxCount is over. please reset Count";
      client.write(JSON.stringify({ message, time: Date.now(), length: message.length }));
      break;
    }
    case "notIsChat": {
      const message = "you did not opened chat.";
      client.write(JSON.stringify({ message, time: Date.now(), length: message.length }));
      break;
    }
  }
}
