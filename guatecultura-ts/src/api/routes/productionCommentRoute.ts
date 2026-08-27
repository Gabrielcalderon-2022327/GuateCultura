import * as http from "http";
import * as service from "../../services/productionCommentService";
import { sendJSON } from "../../utils/sendJson";
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";
import { NotFoundException } from "../../exceptions/notFoundException";

export async function productionCommentRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string) {
    if (url === "/api/productionComments") {
        if (method === "GET") {
            sendJSON(res, 200, await service.getAllProductionComments());
            return;
        }
        if (method === "POST") {
            const productionComment = await readBody(req);
            sendJSON(res, 201, await service.createProductionComment(productionComment as any));
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }

    const id = matchIdRoute(url, "/api/productionComments");
    if (id !== null) {
        if (method === "GET") {
            sendJSON(res, 200, await service.getProductionCommentById(id));
            return;
        }
        if (method === "PUT") {
            const productionComment = await readBody(req);
            sendJSON(res, 200, await service.editProductionComment(id, productionComment as any));
            return;
        }
        if (method === "DELETE") {
            await service.deleteProductionComment(id);
            sendJSON(res, 200, { message: `Comentario de producción con id ${id} eliminado!` });
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }
    throw new NotFoundException(`Ruta "${url}" invalida`);
}