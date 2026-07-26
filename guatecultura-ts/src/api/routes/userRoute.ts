import * as http from "http"
import * as service from "../../services/userService"
import { sendJSON } from "../../utils/sendJson"
import { readBody } from "../../utils/readBody";
import { matchIdRoute } from "../../utils/matchRegex";

export async function userRouter(req: http.IncomingMessage, res: http.ServerResponse, method: string, url: string){
    if (url === "/api/users"){
        if (method === "GET"){
        sendJSON(res, 200, await service.getAllUsers());
        return;
        }
        if (method === "POST"){
            const user = await readBody(req);
            sendJSON(res, 201, await service.createUser(user as any))
            return;
        }
    }

    const id = matchIdRoute(url, "/api/users");
    if (id !== null){
        if (method === "GET"){
            sendJSON(res, 200, await service.getUserById(id))
            return;
        }
        if(method==="PUT"){
            const user = await readBody(req);
            sendJSON(res, 200, await service.editUser(id, user as any))
            return;
        }
        if(method ==="DELETE"){
            await service.deleteUser(id)
            sendJSON(res, 200, {message: `Usuario con id ${id} eliminado!`});
            return;
        }
    }
    sendJSON(res, 405, { error: `Método ${method} no permitido` });
}