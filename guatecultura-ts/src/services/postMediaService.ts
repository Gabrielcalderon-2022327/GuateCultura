import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { PostMedia } from "../models/PostMedia";
import { NotFoundException } from "../exceptions/notFoundException";
import { validatePostMedia } from "../validators/postMediaValidator";

export async function getAllPostMedias(): Promise<PostMedia[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from PostMedia");
    return rows as PostMedia[];
}

export async function getPostMediaById(id: number): Promise<PostMedia> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from PostMedia where media_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Media de post con id ${id} no encontrado`);
    }

    return rows[0] as PostMedia;
}

export async function createPostMedia(postMedia: PostMedia): Promise<PostMedia> {
    await validatePostMedia(postMedia);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into PostMedia (FK_post_id, media_url, media_type)
            VALUES (?, ?, ?)`,
        [
            postMedia.FK_post_id,
            postMedia.media_url,
            postMedia.media_type
        ]
    );

    return await getPostMediaById(result.insertId);
}

export async function editPostMedia(id: number, postMedia: PostMedia): Promise<PostMedia> {
    await getPostMediaById(id);
    await validatePostMedia(postMedia);

    await pool.query(
        `update PostMedia
            set FK_post_id = ?, media_url = ?, media_type = ?
        where media_id = ?`,
        [
            postMedia.FK_post_id,
            postMedia.media_url,
            postMedia.media_type,
            id
        ]
    );

    return await getPostMediaById(id);
}

export async function deletePostMedia(id: number): Promise<void> {
    await getPostMediaById(id);

    await pool.query("delete from PostMedia where media_id = ?", [id]);
}