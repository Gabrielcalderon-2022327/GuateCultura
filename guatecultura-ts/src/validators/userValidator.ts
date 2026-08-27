import { User } from "../models/User";
import { UserRole } from "../models/enums/UserRole";
import { ValidationException } from "../exceptions/validationException";
import {validateRequiredFields,validateEmail,validateMinLength,validateMaxLength,validateEnum} from "./validators";
import { getAllUsers } from "../services/userService";

const requiredUserFields: (keyof User)[] = [
    "username", "email", "password", "first_name", "last_name", "rol"
];

export async function validateUser(user: User, id?: number): Promise<void> {
    validateRequiredFields(user, requiredUserFields);
    validateEmail(user.email);
    validateMinLength(user.password, 8, "password");
    validateMaxLength(user.username, 100, "nombre_usuario");
    validateMaxLength(user.email, 100, "email");
    validateMaxLength(user.first_name, 100, "first_name");
    validateMaxLength(user.last_name, 100, "last_name");
    validateEnum(user.rol, UserRole, "rol");

    const users = await getAllUsers();
    const nombreDuplicado = users.some(u => u.username === user.username && u.user_id !== id);
    if (nombreDuplicado) {
        throw new ValidationException(`El nombre de usuario '${user.username}' ya está registrado`);
    }
    const emailDuplicado = users.some( u => u.email === user.email && u.user_id !== id);
    if (emailDuplicado) {
        throw new ValidationException(`El email '${user.email}' ya está registrado`);
    }
}