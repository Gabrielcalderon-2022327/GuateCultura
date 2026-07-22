import { Post } from "../models/Post";

const posts: Post[] = [];

export function getAllPosts(): Post[] {
    return posts;
}

export function getPostById(id: number): Post | undefined {
    return posts.find(p => p.post_id === id);
}

export function createPost(post: Post): void {
    posts.push(post);
}

export function editPost(id: number, post: Post): boolean {
    const postIndex = posts.findIndex(p => p.post_id === id);
    if (postIndex === -1) {
        return false;
    }
    posts[postIndex] = { ...post, post_id: id };
    return true;
}

export function deletePost(id: number): boolean {
    const postIndex = posts.findIndex(p => p.post_id === id);
    if (postIndex === -1) {
        return false;
    }
    posts.splice(postIndex, 1);
    return true;
}