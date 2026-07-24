import { Playlist } from "../models/Playlist";
import { validateRequiredFields, validateMaxLength } from "./validators";
import { getUserById } from "../services/userService";

const requiredPlaylistFields: (keyof Playlist)[] = [
    "FK_user_id", "title"
];

export async function validatePlaylist(playlist: Playlist): Promise<void> {
    validateRequiredFields(playlist, requiredPlaylistFields);
    validateMaxLength(playlist.title, 100, "title");

    await getUserById(playlist.FK_user_id); // FK existente
}