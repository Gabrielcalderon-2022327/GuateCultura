import * as http from "http";
import * as service from "../../services/playlistService";
import { sendJSON } from "../../utils/sendJson";
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";
import { NotFoundException } from "../../exceptions/notFoundException";

export async function playlistRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string) {
    if (url === "/api/playlists") {
        if (method === "GET") {
            sendJSON(res, 200, await service.getAllPlaylists());
            return;
        }
        if (method === "POST") {
            const playlist = await readBody(req);
            sendJSON(res, 201, await service.createPlaylist(playlist as any));
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }

    const id = matchIdRoute(url, "/api/playlists");
    if (id !== null) {
        if (method === "GET") {
            sendJSON(res, 200, await service.getPlaylistById(id));
            return;
        }
        if (method === "PUT") {
            const playlist = await readBody(req);
            sendJSON(res, 200, await service.editPlaylist(id, playlist as any));
            return;
        }
        if (method === "DELETE") {
            await service.deletePlaylist(id);
            sendJSON(res, 200, { message: `Playlist con id ${id} eliminada!` });
            return;
        }
        sendJSON(res, 405, { error: `Método ${method} no permitido` });
        return;
    }
    throw new NotFoundException(`Ruta "${url}" invalida`);
}