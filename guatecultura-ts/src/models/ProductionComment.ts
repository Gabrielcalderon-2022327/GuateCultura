export interface ProductionComment {
    production_comment_id: number;
    content: string;
    FK_user_id: number;
    FK_production_id: number;
    created_at?: Date;
}