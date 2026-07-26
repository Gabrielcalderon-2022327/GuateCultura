import * as http from "http";
import * as service from "../../services/paymentService";
import { sendJSON } from "../../utils/sendJson";
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";
import { NotFoundException } from "../../exceptions/notFoundException";

export async function paymentRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string) {
    if (url === "/api/payments") {
        if (method === "GET") {
            sendJSON(res, 200, await service.getAllPayments());
            return;
        }
        if (method === "POST") {
            const payment = await readBody(req);
            sendJSON(res, 201, await service.createPayment(payment as any));
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }

    const id = matchIdRoute(url, "/api/payments");
    if (id !== null) {
        if (method === "GET") {
            sendJSON(res, 200, await service.getPaymentById(id));
            return;
        }
        if (method === "PUT") {
            const payment = await readBody(req);
            sendJSON(res, 200, await service.editPayment(id, payment as any));
            return;
        }
        if (method === "DELETE") {
            await service.deletePayment(id);
            sendJSON(res, 200, { message: `Pago con id ${id} eliminado!` });
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }
    throw new NotFoundException(`Ruta "${url}" invalida`);
}