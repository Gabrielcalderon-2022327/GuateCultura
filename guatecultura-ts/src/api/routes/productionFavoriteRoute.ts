import * as http from "http";
import * as service from "../../services/productionFavoriteService";
import { sendJSON } from "../../utils/sendJson";
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";
import { NotFoundException } from "../../exceptions/notFoundException";

export async function productionFavoriteRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string) {
    if (url === "/api/productionFavorites") {
        if (method === "GET") {
            sendJSON(res, 200, await service.getAllProductionFavorites());
            return;
        }
        if (method === "POST") {
            const productionFavorite = await readBody(req);
            sendJSON(res, 201, await service.createProductionFavorite(productionFavorite as any));
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }

    const id = matchIdRoute(url, "/api/productionFavorites");
    if (id !== null) {
        if (method === "GET") {
            sendJSON(res, 200, await service.getProductionFavoriteById(id));
            return;
        }
        if (method === "PUT") {
            const productionFavorite = await readBody(req);
            sendJSON(res, 200, await service.editProductionFavorite(id, productionFavorite as any));
            return;
        }
        if (method === "DELETE") {
            await service.deleteProductionFavorite(id);
            sendJSON(res, 200, { message: `Favorito de producción con id ${id} eliminado!` });
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }
    throw new NotFoundException(`Ruta "${url}" invalida`);
}