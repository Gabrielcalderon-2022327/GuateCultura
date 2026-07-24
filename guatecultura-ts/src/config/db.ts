import { createPool, Pool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool: Pool = createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
});

export default pool;