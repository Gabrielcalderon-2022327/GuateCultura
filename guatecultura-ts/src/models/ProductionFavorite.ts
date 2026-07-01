export interface ProductionFavorite{
    production_favorite_id: number;
    FK_user_id: number;
    FK_production_id: number;
    created_at?: Date;
}