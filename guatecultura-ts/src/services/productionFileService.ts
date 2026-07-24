import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { ProductionFile } from "../models/ProductionFile";
import { NotFoundException } from "../exceptions/notFoundException";
import { validateProductionFile } from "../validators/productionFileValidator";

export async function getAllProductionFiles(): Promise<ProductionFile[]> {
    const [rows] = await pool.query<RowDataPacket[]>("select * from ProductionFiles");
    return rows as ProductionFile[];
}

export async function getProductionFileById(id: number): Promise<ProductionFile> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "select * from ProductionFiles where file_id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new NotFoundException(`Archivo de producción con id ${id} no encontrado`);
    }

    return rows[0] as ProductionFile;
}

export async function createProductionFile(productionFile: ProductionFile): Promise<ProductionFile> {
    await validateProductionFile(productionFile);

    const [result] = await pool.query<ResultSetHeader>(
        `insert into ProductionFiles (FK_production_id, file_url, file_type)
            VALUES (?, ?, ?)`,
        [
            productionFile.FK_production_id,
            productionFile.file_url,
            productionFile.file_type
        ]
    );

    return await getProductionFileById(result.insertId);
}

export async function editProductionFile(id: number, productionFile: ProductionFile): Promise<ProductionFile> {
    await getProductionFileById(id);
    await validateProductionFile(productionFile);

    await pool.query(
        `update ProductionFiles
            set FK_production_id = ?, file_url = ?, file_type = ?
        where file_id = ?`,
        [
            productionFile.FK_production_id,
            productionFile.file_url,
            productionFile.file_type,
            id
        ]
    );

    return await getProductionFileById(id);
}

export async function deleteProductionFile(id: number): Promise<void> {
    await getProductionFileById(id);

    await pool.query("delete from ProductionFiles where file_id = ?", [id]);
}