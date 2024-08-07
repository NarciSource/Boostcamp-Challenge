import fs from "fs";
import { Socket } from "node:net";

export function summary(day: string, client: Socket) {
  const raw = fs.readFileSync("./keywords.json", "utf-8");
  const json = JSON.parse(raw);
  const keyword = json[day];

  client.write(keyword + '\n');
}
