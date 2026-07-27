import * as http from "http";
import { sendJSON } from "./sendJson";

type MySqlError = Error & {
    code?: string;
    sqlMessage?: string;
    sql?: string;
};

function isMySqlError(error: unknown): error is MySqlError {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error
    );
}

function getDuplicateEntryMessage(error: MySqlError): string {
    const sql = error.sql?.toLowerCase() ?? "";

    if (sql.includes("followers")) {
        return "El usuario ya sigue a este creador";
    }

    if (sql.includes("playlistitems")) {
        return "Esta producción ya está agregada en la playlist";
    }

    if (sql.includes("productionlikes")) {
        return "El usuario ya dio like a esta producción";
    }

    if (sql.includes("postlikes")) {
        return "El usuario ya dio like a este post";
    }

    if (sql.includes("productionfavorites")) {
        return "La producción ya está en favoritos del usuario";
    }

    if (sql.includes("postfavorites")) {
        return "El post ya está en favoritos del usuario";
    }

    return "El registro ya existe";
}

export function handleSqlError(res: http.ServerResponse, error: unknown): boolean {
    if (!isMySqlError(error)) {
        return false;
    }

    if (error.code === "ER_DUP_ENTRY") {
        sendJSON(res, 409, {
            error: getDuplicateEntryMessage(error)
        });
        return true;
    }

    return false;
}