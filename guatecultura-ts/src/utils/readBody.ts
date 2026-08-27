import * as http from "http";

export async function readBody(req: http.IncomingMessage): Promise<unknown> {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
        chunks.push(chunk);
    }
    if (chunks.length === 0) return null;
    return JSON.parse(Buffer.concat(chunks).toString('utf-8'));
}
