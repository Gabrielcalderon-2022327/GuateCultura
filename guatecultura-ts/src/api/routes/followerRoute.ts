import * as http from "http";
import * as service from "../../services/followerService";
import { sendJSON } from "../../utils/sendJson";
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";
import { NotFoundException } from "../../exceptions/notFoundException";

export async function followerRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string) {
    if (url === "/api/followers") {
        if (method === "GET") {
            sendJSON(res, 200, await service.getAllFollowers());
            return;
        }
        if (method === "POST") {
            const follower = await readBody(req);
            sendJSON(res, 201, await service.createFollower(follower as any));
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }

    const id = matchIdRoute(url, "/api/followers");
    if (id !== null) {
        if (method === "GET") {
            sendJSON(res, 200, await service.getFollowerById(id));
            return;
        }
        if (method === "PUT") {
            const follower = await readBody(req);
            sendJSON(res, 200, await service.editFollower(id, follower as any));
            return;
        }
        if (method === "DELETE") {
            await service.deleteFollower(id);
            sendJSON(res, 200, { message: `Seguidor con id ${id} eliminado!` });
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }
    throw new NotFoundException(`Ruta "${url}" invalida`);
}