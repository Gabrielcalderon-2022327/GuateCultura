export interface PlaylistItem {
    item_id: number;
    FK_playlist_id: number;
    FK_production_id: number;
    created_at?: Date;
}