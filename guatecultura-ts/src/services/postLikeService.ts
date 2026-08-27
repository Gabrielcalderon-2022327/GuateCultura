import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { PostLike } from "../models/PostLike";
import { NotFoundException } from "../exceptions/notFoundException";
import { validatePostLike } from "../validators/postLikeValidator";

export async function getAllPostLikes(): Promise<PostLike[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from PostLikes");
    return rows as PostLike[];
}

export async function getPostLikeById(id: number): Promise<PostLike> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from PostLikes where post_like_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Like de post con id ${id} no encontrado`);
    }

    return rows[0] as PostLike;
}

export async function createPostLike(postLike: PostLike): Promise<PostLike> {
    await validatePostLike(postLike);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into PostLikes (FK_user_id, FK_post_id)
            VALUES (?, ?)`,
        [
            postLike.FK_user_id,
            postLike.FK_post_id
        ]
    );

    return await getPostLikeById(result.insertId);
}

export async function editPostLike(id: number, postLike: PostLike): Promise<PostLike> {
    await getPostLikeById(id);
    await validatePostLike(postLike);

    await pool.query(
        `update PostLikes
            set FK_user_id = ?, FK_post_id = ?
        where post_like_id = ?`,
        [
            postLike.FK_user_id,
            postLike.FK_post_id,
            id
        ]
    );

    return await getPostLikeById(id);
}

export async function deletePostLike(id: number): Promise<void> {
    await getPostLikeById(id);

    await pool.query("delete from PostLikes where post_like_id = ?", [id]);
}