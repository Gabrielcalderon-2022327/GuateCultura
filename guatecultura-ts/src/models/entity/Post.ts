export interface Post {
    post_id: number;
    FK_creator_id: number;
    title: string;
    description?: string | null;
    created_at?: Date;
    updated_at?: Date;
}