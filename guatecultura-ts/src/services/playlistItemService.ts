import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { PlaylistItem } from "../models/PlaylistItem";
import { NotFoundException } from "../exceptions/notFoundException";
import { validatePlaylistItem } from "../validators/playlistItemValidator";

export async function getAllPlaylistItems(): Promise<PlaylistItem[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from PlaylistItems");
    return rows as PlaylistItem[];
}

export async function getPlaylistItemById(id: number): Promise<PlaylistItem> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from PlaylistItems where item_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Item de playlist con id ${id} no encontrado`);
    }

    return rows[0] as PlaylistItem;
}

export async function createPlaylistItem(playlistItem: PlaylistItem): Promise<PlaylistItem> {
    await validatePlaylistItem(playlistItem);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into PlaylistItems (FK_playlist_id, FK_production_id)
            VALUES (?, ?)`,
        [
            playlistItem.FK_playlist_id,
            playlistItem.FK_production_id
        ]
    );

    return await getPlaylistItemById(result.insertId);
}

export async function editPlaylistItem(id: number, playlistItem: PlaylistItem): Promise<PlaylistItem> {
    await getPlaylistItemById(id);
    await validatePlaylistItem(playlistItem);

    await pool.query(
        `update PlaylistItems
            set FK_playlist_id = ?, FK_production_id = ?
        where item_id = ?`,
        [
            playlistItem.FK_playlist_id,
            playlistItem.FK_production_id,
            id
        ]
    );

    return await getPlaylistItemById(id);
}

export async function deletePlaylistItem(id: number): Promise<void> {
    await getPlaylistItemById(id);

    await pool.query("delete from PlaylistItems where item_id = ?", [id]);
}