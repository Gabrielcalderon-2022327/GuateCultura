import { PostComment } from "../models/PostComment";

const postComments: PostComment[] = [];

export function getAllPostComments(): PostComment[] {
    return postComments;
}

export function getPostCommentById(id: number): PostComment | undefined {
    return postComments.find(pc => pc.post_comment_id === id);
}

export function createPostComment(postComment: PostComment): void {
    postComments.push(postComment);
}

export function editPostComment(id: number, postComment: PostComment): boolean {
    const postCommentIndex = postComments.findIndex(pc => pc.post_comment_id === id);
    if (postCommentIndex === -1) {
        return false;
    }
    postComments[postCommentIndex] = { ...postComment, post_comment_id: id };
    return true;
}

export function deletePostComment(id: number): boolean {
    const postCommentIndex = postComments.findIndex(pc => pc.post_comment_id === id);
    if (postCommentIndex === -1) {
        return false;
    }
    postComments.splice(postCommentIndex, 1);
    return true;
}