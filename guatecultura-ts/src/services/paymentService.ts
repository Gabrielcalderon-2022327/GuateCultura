import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { Payment } from "../models/Payment";
import { NotFoundException } from "../exceptions/notFoundException";
import { validatePayment } from "../validators/paymentValidator";

export async function getAllPayments(): Promise<Payment[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from Payments");
    return rows as Payment[];
}

export async function getPaymentById(id: number): Promise<Payment> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from Payments where payment_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Pago con id ${id} no encontrado`);
    }

    return rows[0] as Payment;
}

export async function createPayment(payment: Payment): Promise<Payment> {
    await validatePayment(payment);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into Payments (amount, FK_user_id, status)
            VALUES (?, ?, ?)`,
        [
            payment.amount,
            payment.FK_user_id ?? null,
            payment.status
        ]
    );

    return await getPaymentById(result.insertId);
}

export async function editPayment(id: number, payment: Payment): Promise<Payment> {
    await getPaymentById(id);
    await validatePayment(payment);

    await pool.query(
        `update Payments
            set amount = ?, FK_user_id = ?, status = ?
        where payment_id = ?`,
        [
            payment.amount,
            payment.FK_user_id ?? null,
            payment.status,
            id
        ]
    );

    return await getPaymentById(id);
}

export async function deletePayment(id: number): Promise<void> {
    await getPaymentById(id);

    await pool.query("delete from Payments where payment_id = ?", [id]);
}