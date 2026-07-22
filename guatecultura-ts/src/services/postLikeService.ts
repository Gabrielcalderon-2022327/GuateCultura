import { PostLike } from "../models/PostLike";

const postLikes: PostLike[] = [];

export function getAllPostLikes(): PostLike[] {
    return postLikes;
}

export function getPostLikeById(id: number): PostLike | undefined {
    return postLikes.find(pl => pl.post_like_id === id);
}

export function createPostLike(postLike: PostLike): void {
    postLikes.push(postLike);
}

export function editPostLike(id: number, postLike: PostLike): boolean {
    const postLikeIndex = postLikes.findIndex(pl => pl.post_like_id === id);
    if (postLikeIndex === -1) {
        return false;
    }
    postLikes[postLikeIndex] = { ...postLike, post_like_id: id };
    return true;
}

export function deletePostLike(id: number): boolean {
    const postLikeIndex = postLikes.findIndex(pl => pl.post_like_id === id);
    if (postLikeIndex === -1) {
        return false;
    }
    postLikes.splice(postLikeIndex, 1);
    return true;
}