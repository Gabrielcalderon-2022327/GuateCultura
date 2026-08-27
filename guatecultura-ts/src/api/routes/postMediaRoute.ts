import * as http from "http";
import * as service from "../../services/postMediaService";
import { sendJSON } from "../../utils/sendJson";
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";
import { NotFoundException } from "../../exceptions/notFoundException";

export async function postMediaRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string) {
    if (url === "/api/postMedia") {
        if (method === "GET") {
            sendJSON(res, 200, await service.getAllPostMedias());
            return;
        }
        if (method === "POST") {
            const postMedia = await readBody(req);
            sendJSON(res, 201, await service.createPostMedia(postMedia as any));
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }

    const id = matchIdRoute(url, "/api/postMedia");
    if (id !== null) {
        if (method === "GET") {
            sendJSON(res, 200, await service.getPostMediaById(id));
            return;
        }
        if (method === "PUT") {
            const postMedia = await readBody(req);
            sendJSON(res, 200, await service.editPostMedia(id, postMedia as any));
            return;
        }
        if (method === "DELETE") {
            await service.deletePostMedia(id);
            sendJSON(res, 200, { message: `Media de post con id ${id} eliminado!` });
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }
    throw new NotFoundException(`Ruta "${url}" invalida`);
}