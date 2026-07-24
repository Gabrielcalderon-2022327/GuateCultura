import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { ProductionComment } from "../models/ProductionComment";
import { NotFoundException } from "../exceptions/notFoundException";
import { validateProductionComment } from "../validators/productionCommentValidator";

export async function getAllProductionComments(): Promise<ProductionComment[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from ProductionComments");
    return rows as ProductionComment[];
}

export async function getProductionCommentById(id: number): Promise<ProductionComment> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from ProductionComments where production_comment_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Comentario de producción con id ${id} no encontrado`);
    }

    return rows[0] as ProductionComment;
}

export async function createProductionComment(productionComment: ProductionComment): Promise<ProductionComment> {
    await validateProductionComment(productionComment);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into ProductionComments (content, FK_user_id, FK_production_id)
            VALUES (?, ?, ?)`,
        [
            productionComment.content,
            productionComment.FK_user_id,
            productionComment.FK_production_id
        ]
    );

    return await getProductionCommentById(result.insertId);
}

export async function editProductionComment(id: number, productionComment: ProductionComment): Promise<ProductionComment> {
    await getProductionCommentById(id);
    await validateProductionComment(productionComment);

    await pool.query(
        `update ProductionComments
            set content = ?, FK_user_id = ?, FK_production_id = ?
        where production_comment_id = ?`,
        [
            productionComment.content,
            productionComment.FK_user_id,
            productionComment.FK_production_id,
            id
        ]
    );

    return await getProductionCommentById(id);
}

export async function deleteProductionComment(id: number): Promise<void> {
    await getProductionCommentById(id);

    await pool.query("delete from ProductionComments where production_comment_id = ?", [id]);
}