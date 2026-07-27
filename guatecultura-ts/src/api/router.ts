import * as http from "http";
import { sendJSON } from "../utils/sendJson";
import { NotFoundException } from "../exceptions/notFoundException";
import { ValidationException } from "../exceptions/validationException";
import { userRouter } from "./routes/userRoute";
import { creatorRouter } from "./routes/creatorRoute";
import { productionRouter } from "./routes/productionRoute";
import { productionFileRouter } from "./routes/productionFileRoute";
import { followerRouter } from "./routes/followerRoute";
import { playlistRouter } from "./routes/playlistRoute";
import { playlistItemRouter } from "./routes/playlistItemRoute";
import { postRouter } from "./routes/postRoute";
import { postMediaRouter } from "./routes/postMediaRoute";
import { productionLikeRouter } from "./routes/productionLikeRoute";
import { postLikeRouter } from "./routes/postLikeRoute";
import { productionCommentRouter } from "./routes/productionCommentRoute";
import { postCommentRouter } from "./routes/postCommentRoute";
import { productionFavoriteRouter } from "./routes/productionFavoriteRoute";
import { postFavoriteRouter } from "./routes/postFavoriteRoute";
import { paymentRouter } from "./routes/paymentRoute";
import { tipRouter } from "./routes/tipRoute";
import { handleSqlError } from "../utils/sqlErrorHandler";

function handleException(res: http.ServerResponse, error: unknown): void {
    if (error instanceof ValidationException) {
        sendJSON(res, 400, { error: error.message });
        return;
    }

    if (error instanceof SyntaxError) {
        sendJSON(res, 400, { error: "El body no es JSON válido" });
        return;
    }

    if (error instanceof NotFoundException) {
        sendJSON(res, 404, { error: error.message });
        return;
    }

    if (handleSqlError(res, error)) {
        return;
    }

    throw error;
}

export async function router(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    const init = performance.now();
    const method = req.method ?? '';
    const url = new URL(req.url ?? '/', 'http://localhost').pathname;
    try {
        // El orden importa: rutas más específicas primero
        if (url.startsWith("/api/productionFiles")) return await productionFileRouter(req, res, method, url);
        if (url.startsWith("/api/productionLikes")) return await productionLikeRouter(req, res, method, url);
        if (url.startsWith("/api/productionComments")) return await productionCommentRouter(req, res, method, url);
        if (url.startsWith("/api/productionFavorites")) return await productionFavoriteRouter(req, res, method, url);
        if (url.startsWith("/api/productions")) return await productionRouter(req, res, method, url);

        if (url.startsWith("/api/postMedia")) return await postMediaRouter(req, res, method, url);
        if (url.startsWith("/api/postLikes")) return await postLikeRouter(req, res, method, url);
        if (url.startsWith("/api/postComments")) return await postCommentRouter(req, res, method, url);
        if (url.startsWith("/api/postFavorites")) return await postFavoriteRouter(req, res, method, url);
        if (url.startsWith("/api/posts")) return await postRouter(req, res, method, url);

        if (url.startsWith("/api/playlistItems")) return await playlistItemRouter(req, res, method, url);
        if (url.startsWith("/api/playlists")) return await playlistRouter(req, res, method, url);

        if (url.startsWith("/api/users")) return await userRouter(req, res, method, url);
        if (url.startsWith("/api/creators")) return await creatorRouter(req, res, method, url);
        if (url.startsWith("/api/followers")) return await followerRouter(req, res, method, url);
        if (url.startsWith("/api/payments")) return await paymentRouter(req, res, method, url);
        if (url.startsWith("/api/tips")) return await tipRouter(req, res, method, url);

        throw new NotFoundException(`Ruta "${url}" invalida`);
    } catch (error) {
        handleException(res, error);
    } finally {
        const time = Math.round(performance.now() - init);
        console.log(`URL: ${url} METODO: ${method} TIEMPO:${time}ms CODE: ${res.statusCode}`);
    }
}