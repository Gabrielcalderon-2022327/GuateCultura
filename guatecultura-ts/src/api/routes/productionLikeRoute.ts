import * as http from "http";
import * as service from "../../services/productionLikeService";
import { sendJSON } from "../../utils/sendJson";
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";
import { NotFoundException } from "../../exceptions/notFoundException";

export async function productionLikeRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string) {
    if (url === "/api/productionLikes") {
        if (method === "GET") {
            sendJSON(res, 200, await service.getAllProductionLikes());
            return;
        }
        if (method === "POST") {
            const productionLike = await readBody(req);
            sendJSON(res, 201, await service.createProductionLike(productionLike as any));
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }

    const id = matchIdRoute(url, "/api/productionLikes");
    if (id !== null) {
        if (method === "GET") {
            sendJSON(res, 200, await service.getProductionLikeById(id));
            return;
        }
        if (method === "PUT") {
            const productionLike = await readBody(req);
            sendJSON(res, 200, await service.editProductionLike(id, productionLike as any));
            return;
        }
        if (method === "DELETE") {
            await service.deleteProductionLike(id);
            sendJSON(res, 200, { message: `Like de producción con id ${id} eliminado!` });
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }
    throw new NotFoundException(`Ruta "${url}" invalida`);
}