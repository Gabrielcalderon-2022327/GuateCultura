import * as http from "http";
import * as service from "../../services/postService";
import { sendJSON } from "../../utils/sendJson";
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";
import { NotFoundException } from "../../exceptions/notFoundException";

export async function postRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string) {
    if (url === "/api/posts") {
        if (method === "GET") {
            sendJSON(res, 200, await service.getAllPosts());
            return;
        }
        if (method === "POST") {
            const post = await readBody(req);
            sendJSON(res, 201, await service.createPost(post as any));
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }

    const id = matchIdRoute(url, "/api/posts");
    if (id !== null) {
        if (method === "GET") {
            sendJSON(res, 200, await service.getPostById(id));
            return;
        }
        if (method === "PUT") {
            const post = await readBody(req);
            sendJSON(res, 200, await service.editPost(id, post as any));
            return;
        }
        if (method === "DELETE") {
            await service.deletePost(id);
            sendJSON(res, 200, { message: `Post con id ${id} eliminado!` });
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }
    throw new NotFoundException(`Ruta "${url}" invalida`);
}