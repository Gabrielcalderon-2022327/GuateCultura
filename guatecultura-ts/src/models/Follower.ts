export interface Follower {
    follower_id: number;
    FK_user_id: number;
    FK_creator_id: number;
    created_at?: Date;
}