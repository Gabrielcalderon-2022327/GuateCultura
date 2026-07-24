import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { PostComment } from "../models/PostComment";
import { NotFoundException } from "../exceptions/notFoundException";
import { validatePostComment } from "../validators/postCommentValidator";

export async function getAllPostComments(): Promise<PostComment[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from PostComments");
    return rows as PostComment[];
}

export async function getPostCommentById(id: number): Promise<PostComment> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from PostComments where post_comment_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Comentario de post con id ${id} no encontrado`);
    }

    return rows[0] as PostComment;
}

export async function createPostComment(postComment: PostComment): Promise<PostComment> {
    await validatePostComment(postComment);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into PostComments (content, FK_user_id, FK_post_id)
            VALUES (?, ?, ?)`,
        [
            postComment.content,
            postComment.FK_user_id,
            postComment.FK_post_id
        ]
    );

    return await getPostCommentById(result.insertId);
}

export async function editPostComment(id: number, postComment: PostComment): Promise<PostComment> {
    await getPostCommentById(id);
    await validatePostComment(postComment);

    await pool.query(
        `update PostComments
            set content = ?, FK_user_id = ?, FK_post_id = ?
        where post_comment_id = ?`,
        [
            postComment.content,
            postComment.FK_user_id,
            postComment.FK_post_id,
            id
        ]
    );

    return await getPostCommentById(id);
}

export async function deletePostComment(id: number): Promise<void> {
    await getPostCommentById(id);

    await pool.query("delete from PostComments where post_comment_id = ?", [id]);
}