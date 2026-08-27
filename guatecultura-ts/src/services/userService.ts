import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { User } from "../models/User";
import { NotFoundException } from "../exceptions/notFoundException";
import { validateUser } from "../validators/userValidator";

export async function getAllUsers(): Promise<User[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from Users");
    return rows as User[];
}

export async function getUserById(id: number): Promise<User> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from Users where user_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return rows[0] as User;
}

export async function createUser(user: User): Promise<User> {
    await validateUser(user);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into Users (username, email, password, first_name, last_name, rol)
            VALUES (?, ?, ?, ?, ?, ?)`,
        [
            user.username,
            user.email,
            user.password,
            user.first_name,
            user.last_name,
            user.rol
        ]
    );

    return await getUserById(result.insertId);
}

export async function editUser(id: number, user: User): Promise<User> {
    await getUserById(id);
    await validateUser(user, id);

    await pool.query(
        `update Users
            set username = ?, email = ?, password = ?, first_name = ?, last_name = ?, rol = ?
        where user_id = ?`,
        [
            user.username,
            user.email,
            user.password,
            user.first_name,
            user.last_name,
            user.rol,
            id
        ]
    );

    return await getUserById(id);
}

export async function deleteUser(id: number): Promise<void> {
    await getUserById(id);

    await pool.query("delete from Users where user_id = ?", [id]);
}