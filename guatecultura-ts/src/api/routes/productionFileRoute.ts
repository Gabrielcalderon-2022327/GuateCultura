import * as http from "http";
import * as service from "../../services/productionFileService";
import { sendJSON } from "../../utils/sendJson";
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";
import { NotFoundException } from "../../exceptions/notFoundException";

export async function productionFileRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string) {
    if (url === "/api/productionFiles") {
        if (method === "GET") {
            sendJSON(res, 200, await service.getAllProductionFiles());
            return;
        }
        if (method === "POST") {
            const productionFile = await readBody(req);
            sendJSON(res, 201, await service.createProductionFile(productionFile as any));
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }

    const id = matchIdRoute(url, "/api/productionFiles");
    if (id !== null) {
        if (method === "GET") {
            sendJSON(res, 200, await service.getProductionFileById(id));
            return;
        }
        if (method === "PUT") {
            const productionFile = await readBody(req);
            sendJSON(res, 200, await service.editProductionFile(id, productionFile as any));
            return;
        }
        if (method === "DELETE") {
            await service.deleteProductionFile(id);
            sendJSON(res, 200, { message: `Archivo de producción con id ${id} eliminado!` });
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }
    throw new NotFoundException(`Ruta "${url}" invalida`);
}