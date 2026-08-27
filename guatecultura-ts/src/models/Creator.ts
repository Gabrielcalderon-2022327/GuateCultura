export interface Creator {
    creator_id: number;
    FK_user_id: number;
    bio?: string | null;
    profile_img?: string | null;
    created_at?: Date;
    updated_at?: Date;
}