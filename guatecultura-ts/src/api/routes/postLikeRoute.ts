import * as http from "http";
import * as service from "../../services/postLikeService";
import { sendJSON } from "../../utils/sendJson";
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";
import { NotFoundException } from "../../exceptions/notFoundException";

export async function postLikeRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string) {
    if (url === "/api/postLikes") {
        if (method === "GET") {
            sendJSON(res, 200, await service.getAllPostLikes());
            return;
        }
        if (method === "POST") {
            const postLike = await readBody(req);
            sendJSON(res, 201, await service.createPostLike(postLike as any));
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }

    const id = matchIdRoute(url, "/api/postLikes");
    if (id !== null) {
        if (method === "GET") {
            sendJSON(res, 200, await service.getPostLikeById(id));
            return;
        }
        if (method === "PUT") {
            const postLike = await readBody(req);
            sendJSON(res, 200, await service.editPostLike(id, postLike as any));
            return;
        }
        if (method === "DELETE") {
            await service.deletePostLike(id);
            sendJSON(res, 200, { message: `Like de post con id ${id} eliminado!` });
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }
    throw new NotFoundException(`Ruta "${url}" invalida`);
}