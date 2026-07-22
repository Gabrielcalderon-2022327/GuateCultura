import { ValidationException } from "../exceptions/validationException";
import { User } from "../models/User";
import { Creator } from "../models/Creator";
import { Production } from "../models/Production";
import { ProductionFile } from "../models/ProductionFile";
import { Follower } from "../models/Follower";
import { Playlist } from "../models/Playlist";
import { PlaylistItem } from "../models/PlaylistItem";
import { Post } from "../models/Post";
import { PostMedia } from "../models/PostMedia";
import { ProductionLike } from "../models/ProductionLike";
import { PostLike } from "../models/PostLike";
import { ProductionComment } from "../models/ProductionComment";
import { PostComment } from "../models/PostComment";
import { ProductionFavorite } from "../models/ProductionFavorite";
import { PostFavorite } from "../models/PostFavorite";
import { Payment } from "../models/Payment";
import { Tip } from "../models/Tip";

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