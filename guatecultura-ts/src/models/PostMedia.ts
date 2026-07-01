import { MediaType } from "./enums/MediaType";

export interface PostMedia {
    media_id: number;
    FK_post_id: number;
    media_url?: string | null;
    media_type?: MediaType | null;
}