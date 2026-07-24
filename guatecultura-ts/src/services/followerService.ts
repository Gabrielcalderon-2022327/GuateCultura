import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { Follower } from "../models/Follower";
import { NotFoundException } from "../exceptions/notFoundException";
import { validateFollower } from "../validators/followerValidator";

export async function getAllFollowers(): Promise<Follower[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from Followers");
    return rows as Follower[];
}

export async function getFollowerById(id: number): Promise<Follower> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from Followers where follower_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Seguidor con id ${id} no encontrado`);
    }

    return rows[0] as Follower;
}

export async function createFollower(follower: Follower): Promise<Follower> {
    await validateFollower(follower);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into Followers (FK_user_id, FK_creator_id)
            VALUES (?, ?)`,
        [
            follower.FK_user_id,
            follower.FK_creator_id
        ]
    );

    return await getFollowerById(result.insertId);
}

export async function editFollower(id: number, follower: Follower): Promise<Follower> {
    await getFollowerById(id);
    await validateFollower(follower);

    await pool.query(
        `update Followers
            set FK_user_id = ?, FK_creator_id = ?
        where follower_id = ?`,
        [
            follower.FK_user_id,
            follower.FK_creator_id,
            id
        ]
    );

    return await getFollowerById(id);
}

export async function deleteFollower(id: number): Promise<void> {
    await getFollowerById(id);

    await pool.query("delete from Followers where follower_id = ?", [id]);
}