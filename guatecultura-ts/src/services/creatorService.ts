import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { Creator } from "../models/Creator";
import { NotFoundException } from "../exceptions/notFoundException";
import { validateCreator } from "../validators/creatorValidator";

export async function getAllCreators(): Promise<Creator[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from Creators");
    return rows as Creator[];
}

export async function getCreatorById(id: number): Promise<Creator> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from Creators where creator_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Creador con id ${id} no encontrado`);
    }

    return rows[0] as Creator;
}

export async function createCreator(creator: Creator): Promise<Creator> {
    await validateCreator(creator);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into Creators (FK_user_id, bio, profile_img)
            VALUES (?, ?, ?)`,
        [
            creator.FK_user_id,
            creator.bio ?? null,
            creator.profile_img ?? null
        ]
    );

    return await getCreatorById(result.insertId);
}

export async function editCreator(id: number, creator: Creator): Promise<Creator> {
    await getCreatorById(id);
    await validateCreator(creator, id);

    await pool.query(
        `update Creators
            set FK_user_id = ?, bio = ?, profile_img = ?
        where creator_id = ?`,
        [
            creator.FK_user_id,
            creator.bio ?? null,
            creator.profile_img ?? null,
            id
        ]
    );

    return await getCreatorById(id);
}

export async function deleteCreator(id: number): Promise<void> {
    await getCreatorById(id);

    await pool.query("delete from Creators where creator_id = ?", [id]);
}