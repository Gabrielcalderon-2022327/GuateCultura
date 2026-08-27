import { Post } from "../models/Post";
import { validateRequiredFields, validateMaxLength } from "./validators";
import { getCreatorById } from "../services/creatorService";

const requiredPostFields: (keyof Post)[] = [
    "FK_creator_id", "title"
];

export async function validatePost(post: Post): Promise<void> {
    validateRequiredFields(post, requiredPostFields);
    validateMaxLength(post.title, 100, "title");
    await getCreatorById(post.FK_creator_id);// FK existente
}