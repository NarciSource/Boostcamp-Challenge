export function sendError(error, client) {
  switch (error) {
    case "ID_LARGER_THAN_256":
      client.write("camperId is larger than 0 and smaller than 256.\n");
      break;
    case "ID_ALREADY":
      client.write("already checked in. try another camperId.\n");
      break;
    case "maxCountOver":
      client.write("maxCount is over. please reset Count");
      break;
    case "notIsChat":
      client.write("you did not opened chat.");
      break;
  }
}
