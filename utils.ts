const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const getBytes = (message: any): number => encoder.encode(JSON.stringify(message)).length;

export function sliceUnderBytes(message: string, maxByte: number) {
    const byteArray = encoder.encode(message);
    const slicedByteArray = byteArray.slice(0, maxByte);

    const slicedMessage = decoder.decode(slicedByteArray);
    return slicedMessage;
}
