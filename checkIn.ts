export function checkIn(id, client, groupId) {
  const newId = parseInt(id.slice(1));

  if (newId > 256) {
    client.write("camperId is larger than 0 and smaller than 256.");
    return;
  }

  client.write(`checkin success to group#${groupId}`);
  console.log(newId);
}
