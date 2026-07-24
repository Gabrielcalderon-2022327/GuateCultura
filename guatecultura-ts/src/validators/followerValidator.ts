import { Follower } from "../models/Follower";
import { ValidationException } from "../exceptions/validationException";
import { validateRequiredFields } from "./validators";
import { getUserById } from "../services/userService";
import { getCreatorById } from "../services/creatorService";

const requiredFollowerFields: (keyof Follower)[] = [
    "FK_user_id", "FK_creator_id"
];

export function validateFollower(follower: Follower): void {
    validateRequiredFields(follower, requiredFollowerFields);

    // FKs EXISTENTES
    getUserById(follower.FK_user_id); 
    const creator = getCreatorById(follower.FK_creator_id);

    if (creator.FK_user_id === follower.FK_user_id) {
        throw new ValidationException(`Un usuario no puede seguirse a sí mismo`);
    }

    // validación pendiente: unicidad compuesta (FK_user_id + FK_creator_id), error mediante DB
}