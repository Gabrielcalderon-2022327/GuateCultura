import { Creator } from "../models/Creator";
import { UserRole } from "../models/enums/UserRole";
import { ValidationException } from "../exceptions/validationException";
import { validateRequiredFields } from "./validators";
import { getUserById } from "../services/userService";
import { getAllCreators } from "../services/creatorService";

const requiredCreatorFields: (keyof Creator)[] = [
    "FK_user_id"
];

export async function validateCreator(creator: Creator, id?: number): Promise<void> {
    validateRequiredFields(creator, requiredCreatorFields);

    const user = await getUserById(creator.FK_user_id);
    if (user.rol !== UserRole.CREATOR) {
        throw new ValidationException(`El usuario asociado debe tener rol CREATOR`);
    }
    const creators = await getAllCreators();
    const usuarioYaEsCreator = creators.some(c => c.FK_user_id === creator.FK_user_id && c.creator_id !== id);
    if (usuarioYaEsCreator) {
        throw new ValidationException(`El usuario con id ${creator.FK_user_id} ya está registrado como creador`);
    }

    // validación pendiente: URL válida de profile_img
}