import { PostFavorite } from "../models/PostFavorite";
import { validateRequiredFields } from "./validators";
import { getUserById } from "../services/userService";
import { getPostById } from "../services/postService";

const requiredPostFavoriteFields: (keyof PostFavorite)[] = [
    "FK_user_id", "FK_post_id"
];

export async function validatePostFavorite(postFavorite: PostFavorite): Promise<void> {
    validateRequiredFields(postFavorite, requiredPostFavoriteFields);

    // FKs EXISTENTES
    await getUserById(postFavorite.FK_user_id);
    await getPostById(postFavorite.FK_post_id);

    // validación pendiente: unicidad compuesta (FK_user_id + FK_post_id), error DB
}