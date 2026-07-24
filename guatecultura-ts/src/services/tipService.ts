import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { Tip } from "../models/Tip";
import { NotFoundException } from "../exceptions/notFoundException";
import { validateTip } from "../validators/tipValidator";

export async function getAllTips(): Promise<Tip[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from Tips");
    return rows as Tip[];
}

export async function getTipById(id: number): Promise<Tip> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from Tips where tip_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Tip con id ${id} no encontrado`);
    }

    return rows[0] as Tip;
}

export async function createTip(tip: Tip): Promise<Tip> {
    await validateTip(tip);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into Tips (amount, FK_creator_id, FK_payment_id)
            VALUES (?, ?, ?)`,
        [
            tip.amount,
            tip.FK_creator_id,
            tip.FK_payment_id
        ]
    );

    return await getTipById(result.insertId);
}

export async function editTip(id: number, tip: Tip): Promise<Tip> {
    await getTipById(id);
    await validateTip(tip);

    await pool.query(
        `update Tips
            set amount = ?, FK_creator_id = ?, FK_payment_id = ?
        where tip_id = ?`,
        [
            tip.amount,
            tip.FK_creator_id,
            tip.FK_payment_id,
            id
        ]
    );

    return await getTipById(id);
}

export async function deleteTip(id: number): Promise<void> {
    await getTipById(id);

    await pool.query("delete from Tips where tip_id = ?", [id]);
}