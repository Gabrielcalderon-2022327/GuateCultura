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

// CAMPOS REQUERIDOS
export const requiredUserFields: (keyof User)[] = [
    "username", "email", "password", "first_name", "last_name", "rol"
];

export const requiredCreatorFields: (keyof Creator)[] = [
    "FK_user_id"
];

export const requiredProductionFields: (keyof Production)[] = [
    "FK_creator_id", "title", "visibility"
];

export const requiredProductionFileFields: (keyof ProductionFile)[] = [
    "FK_production_id", "file_url"
];

export const requiredFollowerFields: (keyof Follower)[] = [
    "FK_user_id", "FK_creator_id"
];

export const requiredPlaylistFields: (keyof Playlist)[] = [
    "FK_user_id", "title"
];

export const requiredPlaylistItemFields: (keyof PlaylistItem)[] = [
    "FK_playlist_id", "FK_production_id"
];

export const requiredPostFields: (keyof Post)[] = [
    "FK_creator_id", "title"
];

export const requiredPostMediaFields: (keyof PostMedia)[] = [
    "FK_post_id"
];

export const requiredProductionLikeFields: (keyof ProductionLike)[] = [
    "FK_user_id", "FK_production_id"
];

export const requiredPostLikeFields: (keyof PostLike)[] = [
    "FK_user_id", "FK_post_id"
];

export const requiredProductionCommentFields: (keyof ProductionComment)[] = [
    "content", "FK_user_id", "FK_production_id"
];

export const requiredPostCommentFields: (keyof PostComment)[] = [
    "content", "FK_user_id", "FK_post_id"
];

export const requiredProductionFavoriteFields: (keyof ProductionFavorite)[] = [
    "FK_user_id", "FK_production_id"
];

export const requiredPostFavoriteFields: (keyof PostFavorite)[] = [
    "FK_user_id", "FK_post_id"
];

export const requiredPaymentFields: (keyof Payment)[] = [
    "amount", "status"
];

export const requiredTipFields: (keyof Tip)[] = [
    "amount", "FK_creator_id", "FK_payment_id"
];