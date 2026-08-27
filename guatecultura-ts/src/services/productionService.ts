import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { Production } from "../models/Production";
import { NotFoundException } from "../exceptions/notFoundException";
import { validateProduction } from "../validators/productionValidator";

export async function getAllProductions(): Promise<Production[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from Productions");
    return rows as Production[];
}

export async function getProductionById(id: number): Promise<Production> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from Productions where production_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Producción con id ${id} no encontrada`);
    }

    return rows[0] as Production;
}

export async function createProduction(production: Production): Promise<Production> {
    await validateProduction(production);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into Productions (FK_creator_id, title, description, category, visibility)
            VALUES (?, ?, ?, ?, ?)`,
        [
            production.FK_creator_id,
            production.title,
            production.description ?? null,
            production.category ?? null,
            production.visibility
        ]
    );

    return await getProductionById(result.insertId);
}

export async function editProduction(id: number, production: Production): Promise<Production> {
    await getProductionById(id);
    await validateProduction(production);

    await pool.query(
        `update Productions
            set FK_creator_id = ?, title = ?, description = ?, category = ?, visibility = ?
        where production_id = ?`,
        [
            production.FK_creator_id,
            production.title,
            production.description ?? null,
            production.category ?? null,
            production.visibility,
            id
        ]
    );

    return await getProductionById(id);
}

export async function deleteProduction(id: number): Promise<void> {
    await getProductionById(id);

    await pool.query("delete from Productions where production_id = ?", [id]);
}