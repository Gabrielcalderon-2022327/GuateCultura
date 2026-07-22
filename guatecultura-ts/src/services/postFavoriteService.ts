import { PostFavorite } from "../models/PostFavorite";

const postFavorites: PostFavorite[] = [];

export function getAllPostFavorites(): PostFavorite[] {
    return postFavorites;
}

export function getPostFavoriteById(id: number): PostFavorite | undefined {
    return postFavorites.find(pf => pf.post_favorite_id === id);
}

export function createPostFavorite(postFavorite: PostFavorite): void {
    postFavorites.push(postFavorite);
}

export function editPostFavorite(id: number, postFavorite: PostFavorite): boolean {
    const postFavoriteIndex = postFavorites.findIndex(pf => pf.post_favorite_id === id);
    if (postFavoriteIndex === -1) {
        return false;
    }
    postFavorites[postFavoriteIndex] = { ...postFavorite, post_favorite_id: id };
    return true;
}

export function deletePostFavorite(id: number): boolean {
    const postFavoriteIndex = postFavorites.findIndex(pf => pf.post_favorite_id === id);
    if (postFavoriteIndex === -1) {
        return false;
    }
    postFavorites.splice(postFavoriteIndex, 1);
    return true;
}