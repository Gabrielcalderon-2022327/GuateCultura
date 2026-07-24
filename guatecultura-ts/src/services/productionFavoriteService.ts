import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { ProductionFavorite } from "../models/ProductionFavorite";
import { NotFoundException } from "../exceptions/notFoundException";
import { validateProductionFavorite } from "../validators/productionFavoriteValidator";

export async function getAllProductionFavorites(): Promise<ProductionFavorite[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from ProductionFavorites");
    return rows as ProductionFavorite[];
}

export async function getProductionFavoriteById(id: number): Promise<ProductionFavorite> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from ProductionFavorites where production_favorite_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Favorito de producción con id ${id} no encontrado`);
    }

    return rows[0] as ProductionFavorite;
}

export async function createProductionFavorite(productionFavorite: ProductionFavorite): Promise<ProductionFavorite> {
    await validateProductionFavorite(productionFavorite);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into ProductionFavorites (FK_user_id, FK_production_id)
            VALUES (?, ?)`,
        [
            productionFavorite.FK_user_id,
            productionFavorite.FK_production_id
        ]
    );

    return await getProductionFavoriteById(result.insertId);
}

export async function editProductionFavorite(id: number, productionFavorite: ProductionFavorite): Promise<ProductionFavorite> {
    await getProductionFavoriteById(id);
    await validateProductionFavorite(productionFavorite);

    await pool.query(
        `update ProductionFavorites
            set FK_user_id = ?, FK_production_id = ?
        where production_favorite_id = ?`,
        [
            productionFavorite.FK_user_id,
            productionFavorite.FK_production_id,
            id
        ]
    );

    return await getProductionFavoriteById(id);
}

export async function deleteProductionFavorite(id: number): Promise<void> {
    await getProductionFavoriteById(id);

    await pool.query("delete from ProductionFavorites where production_favorite_id = ?", [id]);
}