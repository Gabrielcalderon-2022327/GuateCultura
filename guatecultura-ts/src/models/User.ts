import { UserRole } from "./enums/UserRole";

export interface User {
    user_id: number;
    nombre_usuario: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    rol: UserRole;
    created_at?: Date;
    updated_at?: Date;
}