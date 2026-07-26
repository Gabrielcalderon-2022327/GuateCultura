import * as http from "http";
import * as service from "../../services/productionService";
import { sendJSON } from "../../utils/sendJson";
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";
import { NotFoundException } from "../../exceptions/notFoundException";

export async function productionRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string) {
    if (url === "/api/productions") {
        if (method === "GET") {
            sendJSON(res, 200, await service.getAllProductions());
            return;
        }
        if (method === "POST") {
            const production = await readBody(req);
            sendJSON(res, 201, await service.createProduction(production as any));
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }

    const id = matchIdRoute(url, "/api/productions");
    if (id !== null) {
        if (method === "GET") {
            sendJSON(res, 200, await service.getProductionById(id));
            return;
        }
        if (method === "PUT") {
            const production = await readBody(req);
            sendJSON(res, 200, await service.editProduction(id, production as any));
            return;
        }
        if (method === "DELETE") {
            await service.deleteProduction(id);
            sendJSON(res, 200, { message: `Producción con id ${id} eliminada!` });
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }
    throw new NotFoundException(`Ruta "${url}" invalida`);
}