import { PostComment } from "../models/PostComment";
import {validateRequiredFields,validateMinLength,validateMaxLength} from "./validators";
import { getUserById } from "../services/userService";
import { getPostById } from "../services/postService";

const requiredPostCommentFields: (keyof PostComment)[] = [
    "content", "FK_user_id", "FK_post_id"
];

export async function validatePostComment(postComment: PostComment): Promise<void> {
    validateRequiredFields(postComment, requiredPostCommentFields);
    validateMinLength(postComment.content, 1, "content");
    validateMaxLength(postComment.content, 1000, "content");

    // FKs EXISTENTES
    await getUserById(postComment.FK_user_id);
    await getPostById(postComment.FK_post_id);
}