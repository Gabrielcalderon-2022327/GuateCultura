import * as http from "http";
import { sendJSON } from "../utils/sendJson";
import { NotFoundException } from "../exceptions/notFoundException";
import { ValidationException } from "../exceptions/validationException";
import { userRouter } from "./routes/userRoute";

function handleException(res: http.ServerResponse, error: unknown): void {
    if (error instanceof ValidationException) {
        sendJSON(res, 400, { error: error.message });
    } else if (error instanceof SyntaxError) {
        sendJSON(res, 400, { error: 'El body no es JSON válido' });
    } else if (error instanceof NotFoundException) {
        sendJSON(res, 404, { error: error.message })
    } else {
        throw error;
    }
}

export async function router(res: http.ServerResponse, req: http.IncomingMessage): Promise<void> {
    const init = performance.now();
    const method = req.method ?? '';
    const url = new URL(req.url ?? '/', 'http://localhost').pathname;
    try {
        if (url.includes("/api/users")){
            await userRouter(req, res, method, url);
            return;
        }
        throw new NotFoundException("Ruta invalida");
    } catch (error) {
        handleException(res, error)
    } finally {
        const time = Math.round(performance.now() - init);
        console.log(`URL: ${url} METODO: ${method} TIEMPO:${time}ms CODE: ${res.statusCode}`);
    }
}