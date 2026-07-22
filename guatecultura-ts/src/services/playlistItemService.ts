import { PlaylistItem } from "../models/PlaylistItem";

const playlistItems: PlaylistItem[] = [];

export function getAllPlaylistItems(): PlaylistItem[] {
    return playlistItems;
}

export function getPlaylistItemById(id: number): PlaylistItem | undefined {
    return playlistItems.find(pi => pi.item_id === id);
}

export function createPlaylistItem(playlistItem: PlaylistItem): void {
    playlistItems.push(playlistItem);
}

export function editPlaylistItem(id: number, playlistItem: PlaylistItem): boolean {
    const playlistItemIndex = playlistItems.findIndex(pi => pi.item_id === id);
    if (playlistItemIndex === -1) {
        return false;
    }
    playlistItems[playlistItemIndex] = { ...playlistItem, item_id: id };
    return true;
}

export function deletePlaylistItem(id: number): boolean {
    const playlistItemIndex = playlistItems.findIndex(pi => pi.item_id === id);
    if (playlistItemIndex === -1) {
        return false;
    }
    playlistItems.splice(playlistItemIndex, 1);
    return true;
}