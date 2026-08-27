import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { Playlist } from "../models/Playlist";
import { NotFoundException } from "../exceptions/notFoundException";
import { validatePlaylist } from "../validators/playlistValidator";

export async function getAllPlaylists(): Promise<Playlist[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from Playlists");
    return rows as Playlist[];
}

export async function getPlaylistById(id: number): Promise<Playlist> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from Playlists where playlist_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Playlist con id ${id} no encontrada`);
    }

    return rows[0] as Playlist;
}

export async function createPlaylist(playlist: Playlist): Promise<Playlist> {
    await validatePlaylist(playlist);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into Playlists (FK_user_id, title)
            VALUES (?, ?)`,
        [
            playlist.FK_user_id,
            playlist.title
        ]
    );

    return await getPlaylistById(result.insertId);
}

export async function editPlaylist(id: number, playlist: Playlist): Promise<Playlist> {
    await getPlaylistById(id);
    await validatePlaylist(playlist);

    await pool.query(
        `update Playlists
            set FK_user_id = ?, title = ?
        where playlist_id = ?`,
        [
            playlist.FK_user_id,
            playlist.title,
            id
        ]
    );

    return await getPlaylistById(id);
}

export async function deletePlaylist(id: number): Promise<void> {
    await getPlaylistById(id);

    await pool.query("delete from Playlists where playlist_id = ?", [id]);
}