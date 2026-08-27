import { ValidationException } from "../exceptions/validationException";

export function validateRequiredFields<T extends object>( obj: T, requiredFields: (keyof T)[]): void {
    const missingFields: string[] = [];
    
    for (const field of requiredFields) {
        const value = obj[field];

        if ( value === null || value === undefined ||(typeof value === "string" && value.trim() === "")) {
            missingFields.push(String(field));
        }
    }

    if (missingFields.length > 0) {
        throw new ValidationException(`Campos requeridos vacíos: ${missingFields.join(", ")}`);
    }
}

export function validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ValidationException(`El email '${email}' no tiene un formato válido`);
    }
}

export function validateMinLength(value: string, min: number, fieldName: string): void {
    if (value.length < min) {
        throw new ValidationException(
            `El campo '${fieldName}' debe tener al menos ${min} caracteres`
        );
    }
}

export function validateMaxLength(value: string, max: number, fieldName: string): void {
    if (value.length > max) {
        throw new ValidationException(`El campo '${fieldName}' no debe exceder ${max} caracteres`);
    }
}

export function validateEnum<T extends object>(value: unknown, enumObj: T, fieldName: string): void {
    const validValues = Object.values(enumObj);
    if (!validValues.includes(value)) {throw new ValidationException(`El campo '${fieldName}' debe ser uno de: ${validValues.join(", ")}`);
    }
}

export function validatePositiveNumber(value: number, fieldName: string): void {
    if (typeof value !== "number" || value <= 0) {
        throw new ValidationException(`El campo '${fieldName}' debe ser un número mayor a 0`);
    }
}