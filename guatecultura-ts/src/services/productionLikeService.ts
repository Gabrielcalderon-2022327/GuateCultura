import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { ProductionLike } from "../models/ProductionLike";
import { NotFoundException } from "../exceptions/notFoundException";
import { validateProductionLike } from "../validators/productionLikeValidator";

export async function getAllProductionLikes(): Promise<ProductionLike[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from ProductionLikes");
    return rows as ProductionLike[];
}

export async function getProductionLikeById(id: number): Promise<ProductionLike> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from ProductionLikes where production_like_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Like de producción con id ${id} no encontrado`);
    }

    return rows[0] as ProductionLike;
}

export async function createProductionLike(productionLike: ProductionLike): Promise<ProductionLike> {
    await validateProductionLike(productionLike);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into ProductionLikes (FK_user_id, FK_production_id)
            VALUES (?, ?)`,
        [
            productionLike.FK_user_id,
            productionLike.FK_production_id
        ]
    );

    return await getProductionLikeById(result.insertId);
}

export async function editProductionLike(id: number, productionLike: ProductionLike): Promise<ProductionLike> {
    await getProductionLikeById(id);
    await validateProductionLike(productionLike);

    await pool.query(
        `update ProductionLikes
            set FK_user_id = ?, FK_production_id = ?
        where production_like_id = ?`,
        [
            productionLike.FK_user_id,
            productionLike.FK_production_id,
            id
        ]
    );

    return await getProductionLikeById(id);
}

export async function deleteProductionLike(id: number): Promise<void> {
    await getProductionLikeById(id);

    await pool.query("delete from ProductionLikes where production_like_id = ?", [id]);
}