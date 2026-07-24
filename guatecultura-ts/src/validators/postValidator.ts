import { Post } from "../models/Post";
import { validateRequiredFields, validateMaxLength } from "./validators";
import { getCreatorById } from "../services/creatorService";

const requiredPostFields: (keyof Post)[] = [
    "FK_creator_id", "title"
];

export function validatePost(post: Post): void {
    validateRequiredFields(post, requiredPostFields);
    validateMaxLength(post.title, 100, "title");
    getCreatorById(post.FK_creator_id);// FK existente
}