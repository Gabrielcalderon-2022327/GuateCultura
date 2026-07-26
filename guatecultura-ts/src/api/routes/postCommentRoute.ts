import * as http from "http";
import * as service from "../../services/postCommentService";
import { sendJSON } from "../../utils/sendJson";
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";
import { NotFoundException } from "../../exceptions/notFoundException";

export async function postCommentRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string) {
    if (url === "/api/postComments") {
        if (method === "GET") {
            sendJSON(res, 200, await service.getAllPostComments());
            return;
        }
        if (method === "POST") {
            const postComment = await readBody(req);
            sendJSON(res, 201, await service.createPostComment(postComment as any));
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }

    const id = matchIdRoute(url, "/api/postComments");
    if (id !== null) {
        if (method === "GET") {
            sendJSON(res, 200, await service.getPostCommentById(id));
            return;
        }
        if (method === "PUT") {
            const postComment = await readBody(req);
            sendJSON(res, 200, await service.editPostComment(id, postComment as any));
            return;
        }
        if (method === "DELETE") {
            await service.deletePostComment(id);
            sendJSON(res, 200, { message: `Comentario de post con id ${id} eliminado!` });
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }
    throw new NotFoundException(`Ruta "${url}" invalida`);
}