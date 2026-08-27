import { MediaType } from "./enums/MediaType";

export interface PostMedia {
    media_id: number;
    FK_post_id: number;
    media_url: string;
    media_type: MediaType;
}