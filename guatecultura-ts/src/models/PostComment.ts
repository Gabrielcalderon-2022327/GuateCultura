export interface PostComment {
    post_comment_id: number;
    content: string;
    FK_user_id: number;
    FK_post_id: number;
    created_at?: Date;
}