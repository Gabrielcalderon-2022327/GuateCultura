import * as http from "http";
import * as service from "../../services/playlistItemService";
import { sendJSON } from "../../utils/sendJson";
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";
import { NotFoundException } from "../../exceptions/notFoundException";

export async function playlistItemRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string) {
    if (url === "/api/playlistItems") {
        if (method === "GET") {
            sendJSON(res, 200, await service.getAllPlaylistItems());
            return;
        }
        if (method === "POST") {
            const playlistItem = await readBody(req);
            sendJSON(res, 201, await service.createPlaylistItem(playlistItem as any));
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }

    const id = matchIdRoute(url, "/api/playlistItems");
    if (id !== null) {
        if (method === "GET") {
            sendJSON(res, 200, await service.getPlaylistItemById(id));
            return;
        }
        if (method === "PUT") {
            const playlistItem = await readBody(req);
            sendJSON(res, 200, await service.editPlaylistItem(id, playlistItem as any));
            return;
        }
        if (method === "DELETE") {
            await service.deletePlaylistItem(id);
            sendJSON(res, 200, { message: `Item de playlist con id ${id} eliminado!` });
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }
    throw new NotFoundException(`Ruta "${url}" invalida`);
}