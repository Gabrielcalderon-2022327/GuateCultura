import { Playlist } from "../models/Playlist";

const playlists: Playlist[] = [];

export function getAllPlaylists(): Playlist[] {
    return playlists;
}

export function getPlaylistById(id: number): Playlist | undefined {
    return playlists.find(p => p.playlist_id === id);
}

export function createPlaylist(playlist: Playlist): void {
    playlists.push(playlist);
}

export function editPlaylist(id: number, playlist: Playlist): boolean {
    const playlistIndex = playlists.findIndex(p => p.playlist_id === id);
    if (playlistIndex === -1) {
        return false;
    }
    playlists[playlistIndex] = { ...playlist, playlist_id: id };
    return true;
}

export function deletePlaylist(id: number): boolean {
    const playlistIndex = playlists.findIndex(p => p.playlist_id === id);
    if (playlistIndex === -1) {
        return false;
    }
    playlists.splice(playlistIndex, 1);
    return true;
}