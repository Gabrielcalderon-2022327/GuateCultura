import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { Post } from "../models/Post";
import { NotFoundException } from "../exceptions/notFoundException";
import { validatePost } from "../validators/postValidator";

export async function getAllPosts(): Promise<Post[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from Posts");
    return rows as Post[];
}

export async function getPostById(id: number): Promise<Post> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from Posts where post_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Post con id ${id} no encontrado`);
    }

    return rows[0] as Post;
}

export async function createPost(post: Post): Promise<Post> {
    await validatePost(post);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into Posts (FK_creator_id, title, description)
            VALUES (?, ?, ?)`,
        [
            post.FK_creator_id,
            post.title,
            post.description ?? null
        ]
    );

    return await getPostById(result.insertId);
}

export async function editPost(id: number, post: Post): Promise<Post> {
    await getPostById(id);
    await validatePost(post);

    await pool.query(
        `update Posts
            set FK_creator_id = ?, title = ?, description = ?
        where post_id = ?`,
        [
            post.FK_creator_id,
            post.title,
            post.description ?? null,
            id
        ]
    );

    return await getPostById(id);
}

export async function deletePost(id: number): Promise<void> {
    await getPostById(id);

    await pool.query("delete from Posts where post_id = ?", [id]);
}