import * as http from "http";
import * as service from "../../services/creatorService";
import { sendJSON } from "../../utils/sendJson";
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";
import { NotFoundException } from "../../exceptions/notFoundException";

export async function creatorRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string) {
    if (url === "/api/creators") {
        if (method === "GET") {
            sendJSON(res, 200, await service.getAllCreators());
            return;
        }
        if (method === "POST") {
            const creator = await readBody(req);
            sendJSON(res, 201, await service.createCreator(creator as any));
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }

    const id = matchIdRoute(url, "/api/creators");
    if (id !== null) {
        if (method === "GET") {
            sendJSON(res, 200, await service.getCreatorById(id));
            return;
        }
        if (method === "PUT") {
            const creator = await readBody(req);
            sendJSON(res, 200, await service.editCreator(id, creator as any));
            return;
        }
        if (method === "DELETE") {
            await service.deleteCreator(id);
            sendJSON(res, 200, { message: `Creador con id ${id} eliminado!` });
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }
    throw new NotFoundException(`Ruta "${url}" invalida`);
}