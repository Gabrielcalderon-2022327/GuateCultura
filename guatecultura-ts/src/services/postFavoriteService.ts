import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { PostFavorite } from "../models/PostFavorite";
import { NotFoundException } from "../exceptions/notFoundException";
import { validatePostFavorite } from "../validators/postFavoriteValidator";

export async function getAllPostFavorites(): Promise<PostFavorite[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from PostFavorites");
    return rows as PostFavorite[];
}

export async function getPostFavoriteById(id: number): Promise<PostFavorite> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from PostFavorites where post_favorite_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Favorito de post con id ${id} no encontrado`);
    }

    return rows[0] as PostFavorite;
}

export async function createPostFavorite(postFavorite: PostFavorite): Promise<PostFavorite> {
    await validatePostFavorite(postFavorite);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into PostFavorites (FK_user_id, FK_post_id)
            VALUES (?, ?)`,
        [
            postFavorite.FK_user_id,
            postFavorite.FK_post_id
        ]
    );

    return await getPostFavoriteById(result.insertId);
}

export async function editPostFavorite(id: number, postFavorite: PostFavorite): Promise<PostFavorite> {
    await getPostFavoriteById(id);
    await validatePostFavorite(postFavorite);

    await pool.query(
        `update PostFavorites
            set FK_user_id = ?, FK_post_id = ?
        where post_favorite_id = ?`,
        [
            postFavorite.FK_user_id,
            postFavorite.FK_post_id,
            id
        ]
    );

    return await getPostFavoriteById(id);
}

export async function deletePostFavorite(id: number): Promise<void> {
    await getPostFavoriteById(id);

    await pool.query("delete from PostFavorites where post_favorite_id = ?", [id]);
}