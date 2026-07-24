import { PostLike } from "../models/PostLike";
import { validateRequiredFields } from "./validators";
import { getUserById } from "../services/userService";
import { getPostById } from "../services/postService";

const requiredPostLikeFields: (keyof PostLike)[] = [
    "FK_user_id", "FK_post_id"
];

export function validatePostLike(postLike: PostLike): void {
    validateRequiredFields(postLike, requiredPostLikeFields);

    // FKs EXISTENTES
    getUserById(postLike.FK_user_id);
    getPostById(postLike.FK_post_id);

    // validación pendiente: unicidad compuesta (FK_user_id + FK_post_id), error DB
}