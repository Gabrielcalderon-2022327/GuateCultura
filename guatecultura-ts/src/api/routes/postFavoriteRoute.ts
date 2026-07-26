import * as http from "http";
import * as service from "../../services/postFavoriteService";
import { sendJSON } from "../../utils/sendJson";
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";
import { NotFoundException } from "../../exceptions/notFoundException";

export async function postFavoriteRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string) {
    if (url === "/api/postFavorites") {
        if (method === "GET") {
            sendJSON(res, 200, await service.getAllPostFavorites());
            return;
        }
        if (method === "POST") {
            const postFavorite = await readBody(req);
            sendJSON(res, 201, await service.createPostFavorite(postFavorite as any));
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }

    const id = matchIdRoute(url, "/api/postFavorites");
    if (id !== null) {
        if (method === "GET") {
            sendJSON(res, 200, await service.getPostFavoriteById(id));
            return;
        }
        if (method === "PUT") {
            const postFavorite = await readBody(req);
            sendJSON(res, 200, await service.editPostFavorite(id, postFavorite as any));
            return;
        }
        if (method === "DELETE") {
            await service.deletePostFavorite(id);
            sendJSON(res, 200, { message: `Favorito de post con id ${id} eliminado!` });
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }
    throw new NotFoundException(`Ruta "${url}" invalida`);
}