import Response from "./protocol.Response";

export default function makeMessageResponse(message: string): string {
    const header = {
        code: 200,
        time: Date.now(),
        "Content-Type": "application/json",
        "Content-Length": message.length,
    };
    const body = message ? { data: message } : null;
    const transferMessage = new Response(header, body);

    return JSON.stringify(transferMessage);
}
