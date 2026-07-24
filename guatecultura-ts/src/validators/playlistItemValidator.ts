import { PlaylistItem } from "../models/PlaylistItem";
import { ProductionVisibility } from "../models/enums/ProductionVisibility";
import { ValidationException } from "../exceptions/validationException";
import { validateRequiredFields } from "./validators";
import { getPlaylistById } from "../services/playlistService";
import { getProductionById } from "../services/productionService";

const requiredPlaylistItemFields: (keyof PlaylistItem)[] = [
    "FK_playlist_id", "FK_production_id"
];

export function validatePlaylistItem(playlistItem: PlaylistItem): void {
    validateRequiredFields(playlistItem, requiredPlaylistItemFields);

    // FKs EXISTENTES
    getPlaylistById(playlistItem.FK_playlist_id);
    const production = getProductionById(playlistItem.FK_production_id);
    if (production.visibility === ProductionVisibility.DRAFT) {
        throw new ValidationException(`No se puede agregar una producción en estado DRAFT a una playlist`);
    }

    // validación pendiente: unicidad compuesta (FK_playlist_id + FK_production_id), error de DB
}