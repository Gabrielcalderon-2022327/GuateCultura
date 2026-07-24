import { PostMedia } from "../models/PostMedia";
import { MediaType } from "../models/enums/MediaType";
import { validateRequiredFields, validateEnum } from "./validators";
import { getPostById } from "../services/postService";

const requiredPostMediaFields: (keyof PostMedia)[] = [
    "FK_post_id", "media_type", "media_url"
];

export function validatePostMedia(postMedia: PostMedia): void {
    validateRequiredFields(postMedia, requiredPostMediaFields);
    validateEnum(postMedia.media_type, MediaType, "media_type");
    getPostById(postMedia.FK_post_id);// FK existente

    // validación pendiente: URL válida de media_url
}