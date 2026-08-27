export interface Playlist {
    playlist_id: number;
    FK_user_id: number;
    title: string;
    created_at?: Date;
    updated_at?: Date;
}