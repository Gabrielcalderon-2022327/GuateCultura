import { PostFavorite } from "../models/PostFavorite";
import { validateRequiredFields } from "./validators";
import { getUserById } from "../services/userService";
import { getPostById } from "../services/postService";

const requiredPostFavoriteFields: (keyof PostFavorite)[] = [
    "FK_user_id", "FK_post_id"
];

export function validatePostFavorite(postFavorite: PostFavorite): void {
    validateRequiredFields(postFavorite, requiredPostFavoriteFields);

    // FKs EXISTENTES
    getUserById(postFavorite.FK_user_id);
    getPostById(postFavorite.FK_post_id);

    // validación pendiente: unicidad compuesta (FK_user_id + FK_post_id), error DB
}