export interface PostLike {
    post_like_id: number;
    FK_user_id: number;
    FK_post_id: number;
    created_at?: Date;
}