import { ProductionFavorite } from "../models/ProductionFavorite";
import { validateRequiredFields } from "./validators";
import { getUserById } from "../services/userService";
import { getProductionById } from "../services/productionService";

const requiredProductionFavoriteFields: (keyof ProductionFavorite)[] = [
    "FK_user_id", "FK_production_id"
];

export function validateProductionFavorite(productionFavorite: ProductionFavorite): void {
    validateRequiredFields(productionFavorite, requiredProductionFavoriteFields);

    // FKs EXISTENTES
    getUserById(productionFavorite.FK_user_id);
    getProductionById(productionFavorite.FK_production_id);

    // validación pendiente: unicidad compuesta (FK_user_id + FK_production_id), error DB
}