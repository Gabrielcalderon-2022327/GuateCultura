import { ProductionFavorite } from "../models/ProductionFavorite";
import { validateRequiredFields } from "./validators";
import { getUserById } from "../services/userService";
import { getProductionById } from "../services/productionService";

const requiredProductionFavoriteFields: (keyof ProductionFavorite)[] = [
    "FK_user_id", "FK_production_id"
];

export async function validateProductionFavorite(productionFavorite: ProductionFavorite): Promise<void> {
    validateRequiredFields(productionFavorite, requiredProductionFavoriteFields);

    // FKs EXISTENTES
    await getUserById(productionFavorite.FK_user_id);
    await getProductionById(productionFavorite.FK_production_id);
}