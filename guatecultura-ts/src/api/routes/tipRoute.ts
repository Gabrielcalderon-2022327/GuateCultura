import * as http from "http";
import * as service from "../../services/tipService";
import { sendJSON } from "../../utils/sendJson";
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";
import { NotFoundException } from "../../exceptions/notFoundException";

export async function tipRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string) {
    if (url === "/api/tips") {
        if (method === "GET") {
            sendJSON(res, 200, await service.getAllTips());
            return;
        }
        if (method === "POST") {
            const tip = await readBody(req);
            sendJSON(res, 201, await service.createTip(tip as any));
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }

    const id = matchIdRoute(url, "/api/tips");
    if (id !== null) {
        if (method === "GET") {
            sendJSON(res, 200, await service.getTipById(id));
            return;
        }
        if (method === "PUT") {
            const tip = await readBody(req);
            sendJSON(res, 200, await service.editTip(id, tip as any));
            return;
        }
        if (method === "DELETE") {
            await service.deleteTip(id);
            sendJSON(res, 200, { message: `Tip con id ${id} eliminado!` });
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }
    throw new NotFoundException(`Ruta "${url}" invalida`);
}