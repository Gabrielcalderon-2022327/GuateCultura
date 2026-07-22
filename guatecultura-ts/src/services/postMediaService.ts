import { PostMedia } from "../models/PostMedia";

const postMedias: PostMedia[] = [];

export function getAllPostMedias(): PostMedia[] {
    return postMedias;
}

export function getPostMediaById(id: number): PostMedia | undefined {
    return postMedias.find(pm => pm.media_id === id);
}

export function createPostMedia(postMedia: PostMedia): void {
    postMedias.push(postMedia);
}

export function editPostMedia(id: number, postMedia: PostMedia): boolean {
    const postMediaIndex = postMedias.findIndex(pm => pm.media_id === id);
    if (postMediaIndex === -1) {
        return false;
    }
    postMedias[postMediaIndex] = { ...postMedia, media_id: id };
    return true;
}

export function deletePostMedia(id: number): boolean {
    const postMediaIndex = postMedias.findIndex(pm => pm.media_id === id);
    if (postMediaIndex === -1) {
        return false;
    }
    postMedias.splice(postMediaIndex, 1);
    return true;
}